import { TUser } from '../utilities/validation';
import UserApi from '../api/user-api';
import router from '../utilities/router';
import AuthApi from './auth-api';

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
                .then(() => router.go("/profile"));
        }
        catch (error) {
            console.log(error);
        }

    }
    async Password(data: TUser) {
        try {
            await this.UserAPI.changePassword(data)
                .then(() => router.go("/profile"));
        }
        catch (error) {
            console.log(error);
        }

    }
    async changeAvatar(data: any) {
        try {
            await this.UserAPI.setAvatar(data)
            // .then((res) => console.log(res))
                .then(() => AuthApi.getUser());
        }
        catch (error) {
            console.log(error);
        }
    }
}
export default new UserAPI();
