import { DataSource } from 'typeorm';
import configureMiddlewares from './configureMiddlewares';
import configureModels from './configureModels';
import configureServices from './configureServices';
import configureOperations from './configureOperations';

function dependencies(dataSource: DataSource) {
    const models = configureModels({ dataSource });
    const services = configureServices();
    const middlewares = configureMiddlewares({ models });
    const operations = configureOperations({ models, services });

    return { models, services, middlewares, operations };
}

export type Dependencies = ReturnType<typeof dependencies>;
export default dependencies;
