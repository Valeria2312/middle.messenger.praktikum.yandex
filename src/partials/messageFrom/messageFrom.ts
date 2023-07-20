import Block from "../../utilitis/block";
import template from "./messageFrom.hbs";

interface messageFromProps {

}

export class messageFrom extends Block {
    constructor(props: messageFromProps) {
        super('div',props);
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}