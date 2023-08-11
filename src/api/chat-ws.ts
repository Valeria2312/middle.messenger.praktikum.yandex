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
            console.log('Получены данные', event.data);
            store.set('lastMessage', event.data);
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
