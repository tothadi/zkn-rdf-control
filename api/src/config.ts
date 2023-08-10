import { config } from 'dotenv';
import { parseEnvNumber, requiredEnvValue } from './utils';
import { Direction } from './types';

config();

export const isProd = process.env.NODE_ENV === 'production';

export const port = parseEnvNumber('PORT', 6001);

export const tcpPort = parseEnvNumber('TCP_PORT', 6002);

export const db = {
    url: requiredEnvValue('MONGODB_URL'),
};

export const scale = {
    host: requiredEnvValue('SCALE_HOST'),
    port: parseEnvNumber('SCALE_PORT'),
};

export const jwtSecret = requiredEnvValue('JWT_SECRET');

// In hours
export const tokenExpiration = parseEnvNumber('TOKEN_EXPIRATION', 24);

export const stream = {
    INCOMING: requiredEnvValue('STREAM_INCOMING'),
    OUTGOING: requiredEnvValue('STREAM_OUTGOING'),
};

export const barrier = {
    host: requiredEnvValue('BARRIER_HOST'),
    port: parseEnvNumber('BARRIER_PORT'),
    password: requiredEnvValue('BARRIER_PASSWORD'),
};

export function getStreamArgs(direction: Direction) {
    return [
        '-loglevel',
        'quiet',
        '-an',
        '-rtsp_transport',
        'tcp',
        '-i',
        stream[direction],
        '-an',
        '-f',
        'mjpeg',
        'pipe:1',
    ];
}
