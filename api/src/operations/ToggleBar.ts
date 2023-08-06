import { Request, Response } from 'express';
import { logger } from '../utils';
import { Services } from '../dependencies/configureServices';

export default function ToggleBar({ services }: { services: Services }) {
    return async function toggleBar(req: Request, res: Response) {
        try {
            const sw = parseInt(req.query.sw as string, 10);

            if (Number.isNaN(sw) || ![1, 2, 3, 4].includes(sw)) {
                return res.status(400).json({ message: 'Switch must be one of 1, 2, 3, 4' });
            }

            await services.toggleBar(sw);

            return res.status(200).json({ message: 'OK' });
        } catch (err) {
            logger('BAR', `${err}`, true);
            return res.status(500).json({ message: 'Server error.' });
        }
    };
}
