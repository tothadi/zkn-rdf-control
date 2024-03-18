import { ObjectId } from 'typeorm';

export type Direction = 'INCOMING' | 'OUTGOING';

export type Toggle = 'open' | 'close';

export interface SocketClient<T> {
    socket: T;
    address: string;
}

export interface SigninUser {
    username: string;
    password: string;
}

export interface RegUser {
    fullname: string;
    username: string;
    email: string;
    password: string;
}

export interface UserPayload {
    _id: ObjectId;
    fullname: string;
    email: string;
    username: string;
    exp: number;
}
