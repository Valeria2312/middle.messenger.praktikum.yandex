import ChatsAPI, { IAddUsersInChat, ICreateChat } from '../api/chat-api';
import store from '../utilities/store';
import UserAPI from '../api/user-api';
import chatWS from '../api/chat-ws';

//controllers
class ChatAPI {
    ChatsAPI:ChatsAPI;
    UserAPI:UserAPI;
    private socket: chatWS;
    constructor() {
        this.ChatsAPI = new ChatsAPI;
        this.UserAPI = new UserAPI;
    }

    async getChats() {
        await this.ChatsAPI.getChats()
            .then((res) => store.set('chats', res));
        store.on('updated', () => {console.log('updated');});
    }
    async createChat(data: ICreateChat) {
        await this.ChatsAPI.createChat(data)
            .then((res) => console.log(res))
            .then(() => this.getChats());
    }
    async deleteChat(data: ICreateChat) {
        await this.ChatsAPI.deleteChat(data)
            .then((res) => console.log(res))
            .then(() => this.getChats());
    }
    async addUsersToChat(data: any) {
        const { login, chatId } = data;
        const dataUser = await this.UserAPI.searchUser({login: login});
        const requestDataUser = {
            "users": [
                dataUser[0].id
            ],
            chatId
        };
        await this.ChatsAPI.addUsers(requestDataUser)
            .then((res) => console.log(res));
        this.getChats();
    }
    async deleteUsers(data: IAddUsersInChat) {
        const { login, chatId } = data;
        const dataUser = await this.UserAPI.searchUser({login: login});
        const requestDataUser = {
            "users": [
                dataUser[0].id
            ],
            chatId
        };
        await this.ChatsAPI.deleteUsers(requestDataUser)
            .then((res) => console.log(res));
        this.getChats();
    }

    socketConnection(data: number) {
        this.getChatToken(data);
        const chatId = data;
        const userId = store.getState().user.id;
        const token = localStorage.getItem("token");
        console.log(userId);
        console.log(chatId);
        console.log(token);

        const endpoint = `${userId}/${chatId}/${token}`;
        this.socket = new chatWS(endpoint);

    }
    async getChatToken(data: number) {
        await this.ChatsAPI.getChatToken(data)
        // .then((res) => console.log(res));
            .then((res) => localStorage.setItem("token", res["token"]));
    }
    sendMessage(data: string) {
        this.socket.sendMessage(data);
    }

}

export default new ChatAPI();
