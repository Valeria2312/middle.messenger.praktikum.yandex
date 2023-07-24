import Block from "../../utilities/block";
import template from "./link.hbs";

interface LinkProps {
    title?: string;
    href?: string;
    classLink?: string;
    classDiv?: string;
}

export class Link extends Block {
    constructor(props: LinkProps) {
        super('div',props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
