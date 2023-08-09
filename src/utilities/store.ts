import Block from './block';
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
}

class Store extends EventBus {
    private state: State = {};

    getState() {
        console.log(this.state);
        return this.state;
    }
    //мой костыль
    // public getState(path?: string) {
    //     const savedState = localStorage.getItem(path!);
    //     this.state = savedState ? JSON.parse(savedState) : {};
    //     // console.log(this.state);
    //     return this.state;
    // }

    set(path: string, value: unknown) {
        set(this.state, path, value);
        console.log(this.state);
        this.emit('update', this.state);
    }
}

const store = new Store();

export function connect(mapStateToProps: any) {
    return function (Component: any) {
        return class extends Component {
            constructor(tag: string, props: any) {
                // сохраняем начальное состояние
                let state = mapStateToProps(store.getState());

                super(tag,{ ...props, ...state });

                // подписываемся на событие
                store.on(StoreEvents.Updated, () => {
                    // при обновлении получаем новое состояние
                    const newState = mapStateToProps(store.getState());
                    // если что-то из используемых данных поменялось, обновляем компонент
                    if (!isEqual(state, newState)) {
                        this.setProps({ ...newState });
                    }
                    // не забываем сохранить новое состояние
                    state = newState;
                });
            }
        };
    };
}

export default store;

// export class Store extends EventBus {
//     private state: Indexed = {};
//
//     // public getState(path?: string) {
//     //     const savedState = localStorage.getItem(path!);
//     //     this.state = savedState ? JSON.parse(savedState) : {};
//     //     // console.log(this.state);
//     //     return this.state;
//     // }
//     public getState() {
//         console.log(this.state);
//         return this.state;
//     }
//
//     public set(path: string, value: unknown) {
//         // console.log(path);
//         // localStorage.setItem(path, JSON.stringify(value));
//         set(this.state, path, value);
//         // console.log(this.state);
//         // метод EventBus
//         this.emit('updated', { state: this.state, path, value });
//     }
// }
//
// const store = new Store();
// console.log(store);
//
// // создана что бы обновлять пропсы
// // export function connect(Component: typeof Block, mapStateToProps:any) {
// //     // используем class expression
// //     return class extends Component {
// //         constructor(tag: string,props: any) {
// //             // не забываем передать все аргументы конструктора
// //             let state = mapStateToProps(store.getState());
// //
// //             super(tag,{ ...props, ...state });
// //             // console.log("показываю пропсы",props);
// //             // console.log("показываю mapStateToProps",mapStateToProps(store.getState()));
// //             // console.log("показываю стейт",store.getState());
// //             // подписываемся на событие
// //             store.on(StoreEvents.Updated, () => {
// //                 // вызываем обновление компонента, передав данные из хранилища
// //                 const newState = mapStateToProps(store.getState());
// //                 // console.log("показываю новый стейт",newState);
// //                 // this.setProps({...newState});
// //                 // если что-то из используемых данных поменялось, обновляем компонент
// //                 // console.log(!isEqual(store.getState(), newState))
// //                 console.log("это newState",newState);
// //                 console.log("это store.getState()",store.getState());
// //                 const equal = isEqual(store.getState(), newState);
// //                 console.log(equal);
// //                 if (!isEqual(store.getState(), newState)) {
// //                     console.log('я в условии');
// //                     console.log(newState);
// //                     this.setProps({...newState});
// //                 }
// //                 state = newState;
// //             });
// //         }
// //     };
// // }
// //
//
// export function connect(mapStateToProps: any) {
//     return function (Component: any) {
//         return class extends Component {
//             constructor(tag: string, props: any) {
//                 // сохраняем начальное состояние
//                 let state = mapStateToProps(store.getState());
//                 super(tag,{ ...props, ...state });
//                 // подписываемся на событие
//                 store.on(StoreEvents.Updated, () => {
//                     // при обновлении получаем новое состояние
//                     const newState = mapStateToProps(store.getState());
//                     // если что-то из используемых данных поменялось, обновляем компонент
//                     if (!isEqual(state, newState)) {
//                         this.setProps({ ...newState });
//                     }
//                     // не забываем сохранить новое состояние
//                     state = newState;
//                     console.log(state);
//                 });
//             }
//         };
//     };
// }
// // export function connect(mapStateToProps:any) {
// //
// // }
//
//
// export default store;
