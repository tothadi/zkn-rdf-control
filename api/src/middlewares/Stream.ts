import { NextFunction, Request, Response } from 'express';

export default function Stream() {
    return function setStreamHeaders(req: Request, res: Response, next: NextFunction) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('Transfer-Encoding', 'chunked');
        next();
    };
}
