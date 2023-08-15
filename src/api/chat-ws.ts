import store from '../utilities/store';
import { urlWS } from '../utilities/constants';

class chatWS {
    private socket: WebSocket;
    constructor(endpoint: string) {
        this.socket = new WebSocket(`${urlWS}${endpoint}`);
        this.addListeners();
    }

    addListeners() {
        this.socket.addEventListener('open', () => {
            this.GetOldMessages();

        });
        this.socket.addEventListener('close', event => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
            }
            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });

        this.socket.addEventListener('message', event => {
            try {
                const data = JSON.parse(event.data);

                if (data && data.type !== "error" && data.type !== "pong" && data.type !== "user connected") {
                    const oldArr = store.getState().lastMessage ?? [];
                    store.set('lastMessage', [...oldArr, data]);
                }
            } catch (error) {
                console.log(error);
            }
        });

        this.socket.addEventListener('error', event => {
            console.log('Ошибка', event);
        });
    }
    sendMessage(message: string) {
        this.socket.send(
            JSON.stringify({
                content: message,
                type: "message",
            })
        );
    }
    GetOldMessages() {
        this.socket.send(
            JSON.stringify({
                content: '0',
                type: "message",
            })
        );
    }
    public closeConnection() {
        console.log("соединение закрылось");
        this.socket.close();
    }

}
export default chatWS;
