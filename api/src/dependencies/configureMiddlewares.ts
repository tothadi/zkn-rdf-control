import Auth from '../middlewares/Auth';
import { Models } from './configureModels';
import Stream from '../middlewares/Stream';

function configureMiddleware({ models }: { models: Models }) {
    const auth = Auth({ models });
    const stream = Stream();

    return {
        auth,
        stream,
    };
}

export type Middleware = ReturnType<typeof configureMiddleware>;
export default configureMiddleware;
