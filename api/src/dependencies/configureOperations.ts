import GetUser from '../operations/GetUser';
import LoginUser from '../operations/LoginUser';
import RegisterUser from '../operations/RegisterUser';
import ToggleBar from '../operations/ToggleBar';
import { Models } from './configureModels';
import { Services } from './configureServices';

function configureOperations({ models, services }: { models: Models; services: Services }) {
    const getUser = GetUser({ models });
    const loginUser = LoginUser({ models });
    const registerUser = RegisterUser({ models });
    const toggleBar = ToggleBar({ services });

    return {
        getUser,
        loginUser,
        registerUser,
        toggleBar,
    };
}

export type Operations = ReturnType<typeof configureOperations>;
export default configureOperations;
