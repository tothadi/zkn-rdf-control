import { NextFunction, Request, Response } from 'express';
import { Models } from '../dependencies/configureModels';

/**
 * Authenticate, authorize and mount the user on the request based on the standard JWT token.
 */
const ApiKeyAuth = ({ models }: { models: Models }) => {
    return async function apiKeyAuth(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(400).json({ message: 'No authorization header found' });
        }
        const [format, token] = authHeader.split(' ');
        if (!format || format !== 'Bearer' || !token) {
            return res
                .status(400)
                .json({ message: 'Authorization header should be in Bearer format' });
        }

        // Unwrap id from token and find user with it
        const user = await models.Users.fromToken(token);
        if (!user) {
            return res.status(401).json({ message: 'Authentication token is invalid.' });
        }
        res.locals.user = user;

        return next();
    };
};

export default ApiKeyAuth;
