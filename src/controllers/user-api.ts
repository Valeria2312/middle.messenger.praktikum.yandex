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
        await this.UserAPI.changeProfile(data)
            .then(() => AuthApi.getUser())
            .then(() => router.go("/profile"));
    }
    async Password(data: TUser) {
        await this.UserAPI.changePassword(data)
            .then(() => router.go("/profile"));
    }
    async changeAvatar(data: any) {
        await this.UserAPI.setAvatar(data)
            // .then((res) => console.log(res))
            .then(() => AuthApi.getUser());
    }
}
export default new UserAPI();
