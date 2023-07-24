import Block from "../../utilities/block";
import template from "./messageFrom.hbs";

interface messageFromProps {
    text: string,
    time: string,
}

export class messageFrom extends Block {
    constructor(props: messageFromProps) {
        super('div',props);
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}
