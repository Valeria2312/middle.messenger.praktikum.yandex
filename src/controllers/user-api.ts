import { TUser } from '../utilities/validation';
import UserApi from '../api/user-api';
import router from '../utilities/router';
import AuthApi from './auth-api';
import store from '../utilities/store';

//controllers
class UserAPI {
    UserAPI: UserAPI;
    constructor() {
        this.UserAPI = new UserApi;
    }
    async changeProfile(data: TUser) {
        try {
            await this.UserAPI.changeProfile(data)
                .then(() => AuthApi.getUser())
                .then(() => router.go("/settings"));
        }
        catch (error) {
            console.log(error);
        }

    }
    async Password(data: TUser) {
        try {
            await this.UserAPI.changePassword(data)
                .then(() => router.go("/settings"));
        }
        catch (error) {
            console.log(error);
        }

    }
    async changeAvatar(data: any) {
        try {
            await this.UserAPI.setAvatar(data)
                .then(() => AuthApi.getUser());
            console.log("аваьар сменился");
            store.on('updated', () => {console.log('update');});
        }
        catch (error) {
            console.log(error);
        }
    }
}
export default new UserAPI();
