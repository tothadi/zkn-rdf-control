import { logger } from './utils';
import Application from './Application';

const main = async () => {
    const app = new Application();
    app.init();
    return app;
};

main()
    .then(({ cameraServer }) => {
        process.on('exit', (data) => {
            cameraServer.children.forEach((child) => child.kill());
            logger('MAIN', `EXIT: ${data}`);
        });

        process.on('SIGINT', () => {
            cameraServer.children.forEach((child) => child.kill());
            logger('MAIN', 'Received SIGINT. Exiting.');
            process.exit(0);
        });

        process.on('unhandledRejection', (reason) => {
            logger('MAIN', `${reason}`, true);
            console.log(reason);
        });

        process.on('uncaughtException', (err) => {
            logger('MAIN', `${err}`, true);
            // process.exit(0);
        });
    })
    .catch((err) => {
        logger('MAIN', `${err}`, true);
    });
