import { Server as HttpServer } from 'http';
import { Socket, Server as SocketServer } from 'socket.io';
import { SocketClient } from '../types';
import { logger } from '../utils';

export default class StreamServer {
    streamServer: SocketServer;

    clients: SocketClient<Socket>[] = [];

    constructor(httpServer: HttpServer) {
        this.streamServer = new SocketServer(httpServer, {
            path: `/stream`,
            cors: { origin: true },
        });
        this.init();
    }

    init() {
        this.streamServer.on('connection', (socket) => {
            const { remoteAddress: address } = socket.conn;

            // Add the client socket to the clients
            this.clients.push({ address, socket });

            // Subscribe to error events of the client
            socket.on('error', (err) =>
                logger('STREAM-SERVER', `Error from client ${address} - ${err as Error}.`)
            );

            socket.on('close', () => {
                socket.removeAllListeners();

                // Remove the client socket from the clients list
                this.clients = this.clients.filter(
                    ({ address: clientAddress }) => clientAddress !== address
                );

                logger('STREAM-SERVER', `Client disconnected from ${address}.`);
            });

            logger('STREAM-SERVER', `Client connected from ${address}.`);
        });

        logger('STREAM-SERVER', `Waiting for clients.`);
    }
}
