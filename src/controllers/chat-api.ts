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
        const chats = await this.ChatsAPI.getChats();
        chats.sort();
        store.set('chats', chats);
        // .then((res) => store.set('chats', res));
        store.on('updated', () => {console.log('updated');});
    }
    async createChat(data: ICreateChat) {
        await this.ChatsAPI.createChat(data)
            .then((res) => console.log(res))
            .then(() => this.getChats());
    }
    async deleteChat(data: ICreateChat) {
        data = {'chatId': data};
        await this.ChatsAPI.deleteChat(data)
        //     .then((res) => console.log(res))
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

    async socketConnection(data: number) {
        try {
            if (this.socket) {
                this.socket.closeConnection();
            }
            const token = await this.ChatsAPI.getChatToken(data);
            const chatId = data;
            store.set("chatId", chatId);

            if (store.getState().chats) {
                const currentChat = store.getState().chats.find((chat: any) => chat.id === chatId);
                store.set("currentChat", currentChat);
            }
            const userId = store.getState().user.id;

            const endpoint = `${userId}/${chatId}/${token.token}`;
            this.socket = new chatWS(endpoint);
        }
        catch (error) {
            console.log(error);
        }
    }
    sendMessage(data: string) {
        this.socket.sendMessage(data);
    }

}

export default new ChatAPI();
