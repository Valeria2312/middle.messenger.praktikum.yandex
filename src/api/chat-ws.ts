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
            console.log('Соединение установлено');
            //
            // this.socket.send(JSON.stringify({
            //     content: 'Моё первое сообщение миру!',
            //     type: 'message',
            // }));
        });
        this.socket.addEventListener('close', event => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
            }
            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
            console.log(event);
        });

        this.socket.addEventListener('message', event => {
            const data = JSON.parse(event.data);
            console.log(store.getState().lastMessage);
            if (data && data.type !== "error" && data.type !== "pong" && data.type !== "user connected") {

                if (Array.isArray(data)) {
                    data.sort((a, b) => {
                        return Date.parse(a.time) - Date.parse(b.time);
                    });
                }

                if (Array.isArray(data)) {
                    store.set('lastMessage', data);
                } else {
                    store.set('lastMessage', data);
                }
            }
            // console.log('Получены данные', event.data);
            // store.set('lastMessage', event.data);
            // console.log('стор',store.getState());
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
        this.socket.send(JSON.stringify({
            content: '0',
            type: 'get old',
        }));

    }

}
export default chatWS;
