import Block from "../../utilities/block";
import template from "./MessageTo.hbs";

interface messageToProps {
    text: string,
    time: string,
}

export class messageTo extends Block {
    constructor(props: messageToProps) {
        super('div',props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
