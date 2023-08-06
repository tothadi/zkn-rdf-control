import { Request, Response } from 'express';
import { Models } from '../dependencies/configureModels';
import { SigninUser } from '../types';
import { logger } from '../utils';

export default function LoginUser({ models }: { models: Models }) {
    return async function loginUser(req: Request, res: Response) {
        try {
            const { username, password } = req.body as SigninUser;
            if (typeof username === 'undefined' || typeof password === 'undefined') {
                return res.status(400).json({
                    message: 'All fields required',
                });
            }

            const user = await models.Users.findOne({ where: { username } });

            if (!user || !models.Users.validatePassword(user, password)) {
                return res.status(401).json({ message: 'Username or password is incorrect.' });
            }

            return res.status(200).json({ token: models.Users.generateToken(user) });
        } catch (err) {
            logger('LOGIN', `${err}`, true);
            return res.status(500).json({ message: 'Server error.' });
        }
    };
}
