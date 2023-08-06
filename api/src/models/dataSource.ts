import path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { db } from '../config';

const options: DataSourceOptions = {
    type: 'mongodb',
    url: db.url,
    logging: false,
    entities: [path.join(__dirname, '/entities/*.{js,ts}')],
    migrations: [path.join(__dirname, '/migrations/*.{js,ts}')],
    extra: {
        decimalNumbers: true,
    },
    synchronize: false,
};

const dataSource = new DataSource(options);
export default dataSource;
