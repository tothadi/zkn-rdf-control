import { DataSource } from 'typeorm';
import createUsersRepo from '../models/repositories/UserRepository';

function configureModels({ dataSource }: { dataSource: DataSource }) {
    const Users = createUsersRepo(dataSource);

    return {
        Users,
        dataSource,
    };
}

export type Models = ReturnType<typeof configureModels>;
export default configureModels;
