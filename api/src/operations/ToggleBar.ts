import { Request, Response } from 'express';
import { logger } from '../utils';
import { Services } from '../dependencies/configureServices';
import { Direction, Toggle } from '../types';

export default function ToggleBar({ services }: { services: Services }) {
    return async function toggleBar(req: Request, res: Response) {
        try {
            const { bar, toggle } = req.query as { bar: Direction; toggle: Toggle };

            if (!['INCOMING', 'OUTGOING'].includes(bar)) {
                return res.status(400).json({ message: 'Bar can be "INCOMING" or "OUTGOING".' });
            }

            if (!['open', 'close'].includes(toggle)) {
                return res.status(400).json({ message: 'Toggle can be "open" or "close".' });
            }

            await services.toggleBar(bar, toggle);

            return res.status(200).json({ message: 'OK' });
        } catch (err) {
            logger('BAR', err as Error);
            return res.status(500).json({ message: 'Server error.' });
        }
    };
}
