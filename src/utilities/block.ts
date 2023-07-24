import { v4 as makeID } from 'uuid';
import EventBus from './eventBus';

class Block <P extends Record<string, never> = never> {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    } as const;

    public id = makeID();

    protected props: P;

    public children: Record<string, Block>;

    private eventBus: () => EventBus;

    _element: HTMLElement | null = null;

    private readonly _meta: { tagName: string; props: P; };

    constructor(tagName = 'div', propsChildren = {}) {
        const eventBus = new EventBus();
        const { props, children } = this._getChildren(propsChildren as P);
        this._meta = {
            tagName,
            props,
        };
        this.children = children;
        this.props = this._makePropsProxy(props);
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);

        eventBus.emit(Block.EVENTS.INIT);
    }

    // получение дочерних компонентов
    _getChildren(childrenAndProps: P): { props: P, children: Record<string, Block>} {
        const props: Record<string, unknown> = {};
        const children: Record<string, Block> = {};
        if (childrenAndProps) {
            Object.entries(childrenAndProps).forEach(([key, value]) => {
                if (value instanceof Block) {
                    children[key] = value;
                } else {
                    props[key] = value;
                }
            });
        }
        return { props: props as P, children };
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _createResources() {
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
    }

    _init() {
        this._createResources();

        this.init();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    init():void {}

    _componentDidMount(): void {
        this.componentDidMount();
    }

    componentDidMount(): boolean {
        return true;
    }

    addEvents() {
        const { events = {} } = this.props;
        Object.keys(events).forEach((eventName) => {
            this._element?.addEventListener(eventName, events[eventName]);
        });
    }

    public dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);

        Object.values(this.children).forEach((child) => child.dispatchComponentDidMount());
    }

    _componentDidUpdate() {
        if (this.componentDidUpdate()) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    componentDidUpdate() {
        return true;
    }

    setProps = (nextProps: P) => {
        if (!nextProps) {
            return;
        }
        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    _render() {
        const fragment = this.render();
        this._element!.innerHTML = '';
        if (fragment) {
            this._element!.append(fragment);
            this.addEvents();
        }
    }

    // функция компиляции
    compile(template: (context:Record<string, string[] | string>) => string, context: any) {
        const contextAndTags = { ...context };

        // просматриваем объект дочерних элементов
        Object.entries(this.children).forEach(([name, component]) => {
            if (Array.isArray(component)) {
                contextAndTags[name] = component.map((componentItem) => `<div data-id="${componentItem.id}"></div>`);
            } else {
                contextAndTags[name] = `<div data-id="${component.id}"></div>`;
            }
        });
        // передача контекста в template
        const html = template(contextAndTags);
        const temp = document.createElement('template');
        temp.innerHTML = html;

        const replaceTagToComponent = (component: Block) => {
            const tag = temp.content.querySelector(`[data-id="${component.id}"]`);

            if (!tag) {
                return;
            }

            component.getContent()?.append(...Array.from(tag.childNodes));
            // заменяем комопнент
            tag.replaceWith(component.getContent()!);
        };

        Object.entries(this.children).forEach(([_, component]) => {
            if (Array.isArray(component)) {
                component.forEach((componentItem) => replaceTagToComponent(componentItem));
            } else {
                replaceTagToComponent(component);
            }
        });
        return temp.content;
    }

    render(): string | Node | undefined {
        return new DocumentFragment();
    }

    getContent() {
        return this.element;
    }

    // проверяем на доступ, функция из урока
    _makePropsProxy(props: P) {
    // Ещё один способ передачи this, но он больше не применяется с приходом ES6+
    // взято из материалов урока
        const self = this;
        return new Proxy(props, {
            get(target, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target, prop: string, value) {
                const oldTarget = { ...target };
                target[prop as keyof P] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error('Отказано в доступе');
            },
        });
    }

    _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }

    show() {
        this.getContent()!.style.display = 'block';
    }

    hide() {
        this.getContent()!.style.display = 'none';
    }
}

export default Block;
