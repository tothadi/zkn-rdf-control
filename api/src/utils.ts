/**
 * Adds a new entry in the log with source and timestamp
 *
 * @param mod the module the log entry came from
 * @param line the log entry text
 */
export function logger(mod: string, line: string | Error, error = false) {
    const base = `${new Date().toLocaleDateString()} - ${mod} -${error ? ' ERROR:' : ''}`;

    if (error) {
        console.error(base, line);
        return;
    }
    console.log(base, line);
}

export function requiredEnvValue(key: string): string {
    const raw = process.env[key];

    if (typeof raw === 'undefined') {
        throw new Error(
            `${key} environment variable is not set.\nCopy the ".env.example" file to ".env" and set the variables.`
        );
    }

    return raw;
}

export function parseEnvNumber(key: string, defaultValue = 0): number {
    const raw = process.env[key];

    if (typeof raw === 'undefined') {
        return defaultValue;
    }

    const parsed = parseInt(raw, 10);

    if (Number.isNaN(parsed)) {
        return defaultValue;
    }

    return parsed;
}
