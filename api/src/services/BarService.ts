import { barrier } from '../config';
import { Direction, Toggle } from '../types';
import { logger } from '../utils';

export default function BarService() {
    /**
     * Triggers one of the bars to open or close
     * @param sw the switch to trigger on RelayDroid
     * @returns status
     */
    return async function toggleBar(bar: Direction, toggle: Toggle): Promise<string> {
        try {
            const { host, port, password } = barrier;
            const sw = barrier.switches[bar][toggle];
            const url = `${host}:${port}/api2.cgi?p=${password}&t0=1&sw=${sw}&v=1`;

            const fetchOptions: RequestInit = {
                method: 'GET',
                headers: {},
            };

            const response = await fetch(url, fetchOptions);

            return await response.text();
        } catch (err) {
            logger('BAR-SERVICE', err as Error);
            return '';
        }
    };
}
