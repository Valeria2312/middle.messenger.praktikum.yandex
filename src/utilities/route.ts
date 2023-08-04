import Block from './block';

function isEqual(lhs: string, rhs: string) {
    return lhs === rhs;
}

function render(query: string, block: Block) {
    const app = document.getElementById(query);
    app!.appendChild(block.getContent()!);
    return app;
}

class Route {
    private _pathname: string;
    private readonly _blockClass: Block;
    private _block: Block | null;
    private _props: Record<string, string>;

    constructor(pathname: string, view: Block, props: Record<string, string>) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        this._block = this._blockClass;
        render(this._props.rootQuery,this._block);
    }
}


export default Route;
