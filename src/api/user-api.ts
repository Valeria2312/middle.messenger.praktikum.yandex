import HTTPTransport from '../utilities/HTTPTransport';
import { url } from '../utilities/constants';
import { TUser } from '../utilities/validation';
// import store from '../utilities/store';

//api
class UserAPI {
    http: HTTPTransport;
    constructor() {
        this.http = new HTTPTransport();
    }

    changeProfile(data: TUser) {
        return this.http.put(url + '/user/profile', { data });
    }
    changePassword(data: TUser) {
        return this.http.put(url + '/user/password', { data });
    }
    setAvatar(data: any) {
        return this.http.put(url + '/user/profile/avatar',{data});
    }

}
export default UserAPI;
