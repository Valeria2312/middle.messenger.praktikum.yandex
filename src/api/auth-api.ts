import HTTPTransport from '../utilities/HTTPTransport';
import { url } from '../utilities/constants';
import { TUser } from '../utilities/validation';

//api
class AuthAPI {
    http: HTTPTransport;
    constructor() {
        this.http = new HTTPTransport();
    }

    singIn(data: TUser) {
        return this.http.post(url + '/auth/signin', { data });
    }
    singUp(data: TUser) {
        return this.http.post(url + '/auth/signup', { data });
    }
    getUser() {
        return this.http.get(url +'/auth/user');
    }
    logout() {
        return this.http.post(url + "/auth/logout");
    }
}
export default AuthAPI;
