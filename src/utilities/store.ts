import set from './helpers/set';
import EventBus from './eventBus';
import isEqual from './helpers/isEpual';

export enum StoreEvents {
  Updated = 'updated',
}

export interface State {
  user?: any
  chats?: any
  activeChat?: any,
  lastMessage?: any
}

export class Store extends EventBus {

    static EVENT_UPDATE = 1;
    static _instance: Store;
    static STORE_NAME = 'myAppStore';

    _state = { };

    // constructor() {
    //     super();
    //     if(Store._instance)
    //         return Store._instance;
    //
    //     const savedState = localStorage.getItem(Store.STORE_NAME);
    //
    //     this._state = savedState ? (JSON.parse(savedState) ?? {}) : {};
    //
    //     Store._instance = this;
    //
    //     // this.attach(
    //     //     Store.EVENT_UPDATE,
    //     //     () => { localStorage.setItem(Store.STORE_NAME, JSON.stringify(this._state)); }
    //     // );
    // }
    public getState() {
        return this._state;
    }

    public set(path: string, value: unknown) {
        set(this._state, path, value);
        this.emit('updated', { state: this._state, path, value });
    }
}

const store = new Store();
console.log(store.getState());

export function connect(mapStateToProps: any) {
    return function (Component: any) {
        return class extends Component {
            constructor(tag: string, props: any) {
                // сохраняем начальное состояние
                let state = mapStateToProps(store.getState());
                super(tag,{ ...props, ...state });
                // подписываемся на событие
                store.on('updated', () => {
                    // при обновлении получаем новое состояние
                    const newState = mapStateToProps(store.getState());
                    // если что-то из используемых данных поменялось, обновляем компонент
                    if (!isEqual(state, newState)) {
                        this.setProps(store.getState());
                    }
                    // не забываем сохранить новое состояние
                    state = newState;
                });
            }
        };
    };
}
export default store;


