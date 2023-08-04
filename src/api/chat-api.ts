import HTTPTransport from '../utilities/HTTPTransport';
import { url } from '../utilities/constants';

export type Indexed<T = any> = {
  [key in string]: T;
};

class ChatsAPI {
    http: HTTPTransport;

    constructor() {
        this.http = new HTTPTransport();
    }

    getChats(data: Indexed) {
        return this.http.get(url + '/chats', { data });
    }
}
export default ChatsAPI;
