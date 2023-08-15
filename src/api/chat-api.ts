import HTTPTransport from '../utilities/HTTPTransport';
import { url } from '../utilities/constants';

export interface ICreateChat {
  title?: string,
  chatId?: string
}
export interface IAddUsersInChat {
  users: any[],
  chatId: number | undefined,
}

//api
class ChatsAPI {
    http: HTTPTransport;

    constructor() {
        this.http = new HTTPTransport();
    }
    getChats() {
        return this.http.get(url + '/chats');
    }
    createChat(data:ICreateChat){
        return this.http.post(url + '/chats', {data});
    }
    deleteChat(data:ICreateChat){
        return this.http.delete(url + '/chats', {data});
    }
    addUsers(data: IAddUsersInChat) {
        return this.http.put(url + '/chats/users',{data});
    }
    deleteUsers(data: IAddUsersInChat){
        return this.http.delete(url + '/chats/users', {data});
    }
    getChatToken(data: number) {
        return this.http.post(url + `/chats/token/${data}`);
    }
}
export default ChatsAPI;
