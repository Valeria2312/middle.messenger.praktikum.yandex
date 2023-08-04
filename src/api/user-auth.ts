import HTTPTransport from '../utilities/HTTPTransport';
import { url } from '../utilities/constants';
import { TUser } from '../utilities/validation';


class AuthAPI {
    http: HTTPTransport;
    constructor() {
        this.http = new HTTPTransport();
    }

    singIn(data: TUser) {
        return this.http.post(url + '/auth/signin', { data })
            .then((res) => console.log(res));

    }
    singUp(data: TUser) {
        return this.http.post(url + '/auth/signup', { data })
            .then((res) => console.log(res));
    }
    getUser() {
        return this.http.get(url +'/auth/user')
            .then((res) => console.log(res));
    }
    logout() {
        return this.http.post(url + "auth/logout")
            .then((res) => console.log(res));
    }
}
export default AuthAPI;
