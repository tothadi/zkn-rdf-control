import BarService from '../services/BarService';

function configureServices() {
    const toggleBar = BarService();

    return {
        toggleBar,
    };
}

export type Services = ReturnType<typeof configureServices>;
export default configureServices;
