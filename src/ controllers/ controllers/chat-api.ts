import ChatsAPI from '../../api/chat-api';


export type Indexed<T = any> = {
  [key in string]: T;
};
class ChatAPI {
    ChatsAPI:ChatsAPI;
    constructor() {
        this.ChatsAPI = new ChatsAPI;
    }

    async getChats(data: Indexed) {
        try {
            await this.ChatsAPI.getChats(data);
            // await this.getUser();
        } catch (e) {
            // showNotification(e.reason, NotificationTypes.Warning);
        }
    }

}
export default ChatAPI;
