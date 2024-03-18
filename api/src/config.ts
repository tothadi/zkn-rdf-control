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
    pattern: requiredEnvValue('SCALE_PATTERN'),
};

export const jwtSecret = requiredEnvValue('JWT_SECRET');

// In hours
export const tokenExpiration = parseEnvNumber('TOKEN_EXPIRATION', 24);

export const stream = {
    INCOMING: requiredEnvValue('STREAM_INCOMING'),
    OUTGOING: requiredEnvValue('STREAM_OUTGOING'),
};

export const barrier = {
    switches: {
        INCOMING: {
            open: 3,
            close: 4,
        },
        OUTGOING: {
            open: 1,
            close: 2,
        },
    },
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
        '-vf',
        `scale=w=1280:h=720:force_original_aspect_ratio=decrease`,
        '-threads',
        '2',
        '-an',
        '-g',
        '20',
        '-r',
        '20',
        '-f',
        'mjpeg',
        'pipe:1',
    ];
}
