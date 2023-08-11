import { Server as SocketServer, Socket } from 'net';
import { Server as StreamServer } from 'socket.io';
import { tcpPort, scale } from '../config';
import { SocketClient } from '../types';
import { logger } from '../utils';

export default class Scale {
    scaleSocket: Socket;

    socketServer: SocketServer;

    streamServer: StreamServer;

    clients: SocketClient<Socket>[] = [];

    constructor(streamServer: StreamServer) {
        this.streamServer = streamServer;
        this.scaleSocket = new Socket();
        this.scaleSocket.setEncoding('utf8');
        this.socketServer = new SocketServer();
    }

    parseWeight(chunk: string): void {
        try {
            const match = chunk.match(new RegExp(scale.pattern, 'g'));
            if (match && match.length > 0) {
                const isNegative = chunk.includes('-');
                const dIndex = chunk.indexOf('KG');
                const absWeight = parseInt(chunk.substring(dIndex - 5, dIndex), 10);
                const weight = isNegative ? absWeight * -1 : absWeight;

                if (!Number.isNaN(weight)) {
                    this.streamServer.emit('weight', weight);
                    this.clients.forEach(({ socket }) => socket.write(chunk));
                }
            }
        } catch (err) {
            logger('SCALE', `${err}`, true);
        }
    }

    /**
     * Closes all connections, removes all listeners and destroy every socket,
     * then after 10 seconds restarts the services.
     *
     * @param reason the reason of the reconnection attempt
     * @param hadError true if the reason was an error
     */
    reconnect(reason: string, hadError = false) {
        logger('SCALE', `${reason} - Reconnecting in 10 seconds...`, hadError);

        // Removing listeners to avoid memoryleaks
        this.scaleSocket.removeAllListeners();
        this.socketServer.removeAllListeners();

        // Destroy connection to scale converter
        this.scaleSocket.destroy();

        // Close the socket server
        this.socketServer.close();

        // Destroy all remaining client connections
        this.clients.forEach(({ socket }) => socket.destroy());

        // Reinit everything in 10 seconds
        setTimeout(() => {
            this.init();
        }, 10000);
    }

    init() {
        // Subscribe to events of the scale converter socket
        this.scaleSocket.on('error', (err) => this.reconnect(err.message, true));
        this.scaleSocket.on('close', () => this.reconnect('Connection closed'));
        this.scaleSocket.on('timeout', () => this.reconnect('Timeout'));
        this.scaleSocket.on('end', () => this.reconnect('Scale socket ended'));
        this.scaleSocket.on('data', (chunk: string) => this.parseWeight(chunk));

        this.scaleSocket.connect(scale.port, scale.host, () => {
            logger('SCALE', 'Connected to scale converter.');
        });

        // Subscribe to events of the socket server
        this.socketServer.on('error', (err) => this.reconnect(err.message, true));
        this.socketServer.on('close', () => this.reconnect('Socket server closed'));
        this.socketServer.on('listening', () => logger('SCALE', `Listening on port: ${tcpPort}`));
        this.socketServer.on('connection', (socket) => {
            // Get the address of the socket client
            const address = socket.remoteAddress ?? `unknown-${this.clients.length}`;

            // Subscribe to error events of the client
            socket.on('error', (err) =>
                logger('SCALE', `error from client ${address} - ${err}.`, true)
            );

            // Add the client socket to the clients
            this.clients.push({ address, socket });

            // Subscribe to the close event of the client socket to properly destroy it
            socket.on('close', () => {
                socket.destroy();
                socket.removeAllListeners();

                // Remove the client socket from the clients list
                this.clients = this.clients.filter(
                    ({ address: clientAddress }) => clientAddress !== address
                );

                logger('SCALE', `Client disconnected from ${address}.`);
            });

            logger('SCALE', `Client connected from ${address}.`);
        });

        // Start listening
        this.socketServer.listen(tcpPort);
    }
}
