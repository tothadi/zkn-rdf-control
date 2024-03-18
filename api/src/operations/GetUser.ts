/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import { Request, Response } from 'express';
import { Models } from '../dependencies/configureModels';
import { logger } from '../utils';

export default function GetUser({ models }: { models: Models }) {
    return async function getUser(req: Request, res: Response) {
        try {
            const { _id } = res.locals.user;
            if (_id) {
                return res.status(401).json({
                    message: 'UnauthorizedError: private profile',
                });
            }
            const user = await models.Users.findOne({ where: { _id } });

            if (!user) {
                return res
                    .status(404)
                    .json({ message: `NotFoundError: user with id ${_id} not found.` });
            }

            return res.status(200).json(user);
        } catch (err) {
            logger('GETUSER', err as Error);
            return res.status(500).json({ message: 'Server error.' });
        }
    };
}
