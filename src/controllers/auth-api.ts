import AuthAPI from '../api/auth-api';
import { TUser } from '../utilities/validation';
import ChatAPI from './chat-api';
// import router from '../utilities/router';
import store from '../utilities/store';
import router from '../utilities/router';

//controllers
class AuthApi {
    AuthAPI:AuthAPI;
    // ChatAPI:ChatAPI;
    constructor() {
        this.AuthAPI = new AuthAPI;
        // this.ChatAPI = new ChatAPI;
    }
    async singIn(data: TUser) {
        await this.AuthAPI.singIn(data)
            .then(() => this.getUser())
            .finally(() => router.go("/chat"));
    }

    async singUp(data: TUser) {
        await this.AuthAPI.singUp(data);
    }
    async getUser() {
        await this.AuthAPI.getUser()
            .then((res) => store.set('user', res));
    }

    async logout() {
        await this.AuthAPI.logout()
            .then(() => router.go("/login"));
    }
}
export default new AuthApi();