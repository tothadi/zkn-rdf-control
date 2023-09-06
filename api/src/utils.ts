/**
 * Adds a new entry in the log with source and timestamp
 *
 * @param mod the module the log entry came from
 * @param line the log entry text
 */
export function logger(mod: string, message: string | Error, error = false) {
    const base = `\x1b[32m${new Date().toLocaleString()}\x1b[0m - \x1b[36m${mod}\x1b[0m -`;
    const line = message instanceof Error ? `${message.message} - ${message.stack}` : message;

    if (error) {
        console.error(base, `\x1b[31m${line} \x1b[0m`);
        return;
    }
    console.log(base, `\x1b[33m${line} \x1b[0m`);
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
