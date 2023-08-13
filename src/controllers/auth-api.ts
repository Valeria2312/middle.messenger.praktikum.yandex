import AuthAPI from '../api/auth-api';
import { TUser } from '../utilities/validation';
import store from '../utilities/store';
import router from '../utilities/router';

//controllers
class AuthApi {
    AuthAPI:AuthAPI;
    constructor() {
        this.AuthAPI = new AuthAPI;
    }
    async singIn(data: TUser) {
        try {
            await this.AuthAPI.singIn(data)
                .then(() => this.getUser())
            // .then(() => this.ChatAPI.getChats())
                .finally(() => router.go("/messenger"));
        }
        catch (error) {
            console.log(error);
        }
    }
    async singUp(data: TUser) {
        try {
            await this.AuthAPI.singUp(data);
        }
        catch (error) {
            console.log(error);
        }

    }
    async getUser() {
        try {
            await this.AuthAPI.getUser()
                .then((res) => store.set('user', res));
            // .then(() => ChatAPI.getChats());
            store.on('updated', () => {console.log('update');});
        }
        catch (error) {
            console.log(error);
        }
    }

    async logout() {
        try {
            await this.AuthAPI.logout()
                .then(() => router.go("/login"));
        }
        catch (error) {
            console.log(error);
        }
    }
}
export default new AuthApi();
