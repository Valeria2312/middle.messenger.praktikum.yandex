import Block from './block';
import set from './helpers/set';
import isEqual from './helpers/isEpual';

export enum StoreEvents {
  Updated = 'updated',
}
type Indexed<T = unknown> = {
  [key in string]: T;
};

export class Store {
    private state: any = {};

    public getState() {
        return this.state;
    }

    public set(path: string, value: unknown) {
        set(this.state, path, value);

        this.emit(StoreEvents.Updated);
    }
}

const store = new Store();

function connect(mapStateToProps: (state: Indexed) => Indexed) {
    return function(Component: typeof Block) {
        return class extends Component {
            constructor(props: any) {
                // сохраняем начальное состояние
                let state = mapStateToProps(store.getState());

                super({...props, ...state});

                // подписываемся на событие
                store.on(StoreEvents.Updated, () => {
                    // при обновлении получаем новое состояние
                    const newState = mapStateToProps(store.getState());

                    // если что-то из используемых данных поменялось, обновляем компонент
                    if (!isEqual(state, newState)) {
                        this.setProps({...newState});
                    }

                    // не забываем сохранить новое состояние
                    state = newState;
                });
            }
        };
    };
}
export default store;
