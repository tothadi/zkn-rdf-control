import { spawn } from 'child_process';
import { Server as StreamServer } from 'socket.io';
import { Direction } from '../types';
import { logger } from '../utils';
import { getStreamArgs } from '../config';

export default class CameraServer {
    streamServer: StreamServer;

    constructor(streamServer: StreamServer) {
        this.streamServer = streamServer;
    }

    initCamera(direction: Direction): void {
        const stream = spawn('ffmpeg', getStreamArgs(direction));

        stream.on('error', (err) => {
            logger(`STREAMER-${direction}`, JSON.stringify(err), true);
            stream.kill();
        });

        stream.stderr.on('data', (data) => {
            logger(`STREAMER-${direction}`, `INFO: ${data}`);
        });

        stream.on('close', (code) => {
            if (code !== 0) {
                logger(
                    `STREAMER-${direction}`,
                    `CLOSE: ffmpeg closed with code ${code}. Restarting in 3 seconds...`
                );

                stream.removeAllListeners();

                setTimeout(() => {
                    this.initCamera(direction);
                }, 3000);
            }
        });

        stream.stdout.on('data', (frame) => {
            this.streamServer.emit(
                direction,
                `data:image/jpeg;base64,${Buffer.from(frame).toString('base64')}`
            );
        });
    }

    init(): void {
        this.initCamera('INCOMING');
        this.initCamera('OUTGOING');
    }
}
