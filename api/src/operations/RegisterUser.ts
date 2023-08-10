import { Request, Response } from 'express';
import { Models } from '../dependencies/configureModels';
import { RegUser } from '../types';
import { logger } from '../utils';

export default function RegisterUser({ models }: { models: Models }) {
    return async function registerUser(req: Request, res: Response) {
        try {
            const { fullname, username, email, password } = req.body as RegUser;

            if (
                typeof username === 'undefined' ||
                typeof fullname === 'undefined' ||
                typeof email === 'undefined' ||
                typeof password === 'undefined'
            ) {
                return res.status(400).json({
                    message: 'All fields required',
                });
            }

            const existing = await models.Users.findOne({ where: { username, email } });

            if (existing) {
                return res.status(400).json({ message: 'User Already exists.' });
            }

            const user = await models.Users.createUserWithPassword({
                username,
                fullname,
                email,
                password,
            });

            return res.status(200).json({ token: models.Users.generateToken(user) });
        } catch (err) {
            logger('REGISTER', `${err}`, true);
            return res.status(500).json({ message: 'Server error.' });
        }
    };
}
