import express, { Express, json, urlencoded } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dataSource from './models/dataSource';
import { isProd, port } from './config';
import { logger } from './utils';
import dependencies from './dependencies';
import StreamServer from './servers/StreamServer';
import Scale from './servers/ScaleServer';
import CameraServer from './servers/CameraServer';

export default class Application {
    app: Express;

    cameraServer: CameraServer;

    scaleServer: Scale;

    constructor() {
        this.app = express();
    }

    async init(): Promise<void> {
        this.app.disable('x-powered-by');
        this.app.use(cors());
        this.app.use(json());
        this.app.use(urlencoded({ extended: true, limit: '50mb' }));

        if (!isProd) {
            this.app.use(morgan('dev'));
        }

        this.app.get('/health', (req, res) => {
            res.status(200).end('OK');
        });

        const { middlewares, operations } = dependencies(dataSource);

        await dataSource.initialize();

        this.app.post('/api/signup', operations.registerUser);
        this.app.post('/api/signin', operations.loginUser);
        this.app.get('/api/user', middlewares.auth, operations.getUser);
        this.app.get('/api/bar', middlewares.auth, operations.toggleBar);

        this.app.use((req, res) => {
            res.status(404).send('No endpoint here.');
        });

        const httpServer = this.app.listen(port, '0.0.0.0', () => {
            logger('EXPRESS', `Listening on port: ${port}`);
        });

        const { streamServer } = new StreamServer(httpServer);
        this.scaleServer = new Scale(streamServer);
        this.cameraServer = new CameraServer(streamServer);

        this.scaleServer.init();
        this.cameraServer.init();
    }
}
