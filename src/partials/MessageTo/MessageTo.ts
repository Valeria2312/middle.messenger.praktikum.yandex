import Block from "../../utilitis/block";
import template from "./MessageTo.hbs";

interface messageToProps {

}

export class messageTo extends Block {
    constructor(props: messageToProps) {
        super('div',props);
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}