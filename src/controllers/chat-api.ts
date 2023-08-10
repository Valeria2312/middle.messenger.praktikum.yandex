import ChatsAPI, { IAddUsersInChat, ICreateChat } from '../api/chat-api';
import store from '../utilities/store';

//controllers
class ChatAPI {
    ChatsAPI:ChatsAPI;
    constructor() {
        this.ChatsAPI = new ChatsAPI;
    }

    async getChats() {
        await this.ChatsAPI.getChats()
            // .then((res) => console.log(res));
            .then((res) => store.set('chats', res));
        store.on('updated', () => {console.log('update');});
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
    async addUsersToChat(data: IAddUsersInChat) {
        await this.ChatsAPI.addUsers(data);
        this.getChats();
    }
    async deleteUsers(data: IAddUsersInChat) {
        await this.ChatsAPI.deleteUsers(data);
    }
    async getChatToken(data: number) {
        await this.ChatsAPI.getChatToken(data);
    }

}

export default new ChatAPI();
