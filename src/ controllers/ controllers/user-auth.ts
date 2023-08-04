import AuthAPI from '../../api/user-auth';
import { TUser } from '../../utilities/validation';

class UserAuth {
    AuthAPI: AuthAPI;
    constructor() {
        this.AuthAPI = new AuthAPI;
    }
    async singIn(data: TUser) {
        try {
            await this.AuthAPI.singIn(data);
            // await ChatAPI.getChats(store.getState().user.id);
        } catch (e) {
            // showNotification(e.reason, NotificationTypes.Warning);
        } finally {
            console.log("выполнено");
        }
    }

    async singUp(data: TUser) {
        try {
            await this.AuthAPI.singUp(data);
        } catch (e) {
            // showNotification(e.reason, NotificationTypes.Warning);
        }
    }
    async getUser() {
        const user = await this.AuthAPI.getUser();
        // store.set('user', user);
    }
    async logout() {
        try{
            await this.AuthAPI.logout();
        } catch (e) {
            // showNotification(e.reason, NotificationTypes.Warning);
        }
    }
}
export default UserAuth;
