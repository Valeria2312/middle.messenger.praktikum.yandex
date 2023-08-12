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
        await this.AuthAPI.singIn(data)
            .then(() => this.getUser())
            // .then(() => this.ChatAPI.getChats())
            .finally(() => router.go("/chat"));
    }
    async singUp(data: TUser) {
        await this.AuthAPI.singUp(data);
    }
    async getUser() {
        await this.AuthAPI.getUser()
            .then((res) => store.set('user', res));
        // .then(() => ChatAPI.getChats());
        store.on('updated', () => {console.log('update');});

    }

    async logout() {
        await this.AuthAPI.logout()
            .then(() => router.go("/login"));
    }
}
export default new AuthApi();
