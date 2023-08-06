import { barrier } from '../config';
import { logger } from '../utils';

export default function BarService() {
    /**
     * Triggers one of the bars to open or close
     * @param sw the switch to trigger on RelayDroid
     * @returns status
     */
    return async function toggleBar(sw: number): Promise<string> {
        try {
            const url = `${barrier.host}:${barrier.port}/api2.cgi?p=${barrier.password}&t0=1&sw=${sw}&v=1`;

            const fetchOptions: RequestInit = {
                method: 'GET',
                headers: {},
            };

            return await (await fetch(url, fetchOptions)).json();
        } catch (err) {
            logger('BAR-SERVICE', `${err}`, true);
            return '';
        }
    };
}
