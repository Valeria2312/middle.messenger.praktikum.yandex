import Block from "../../utilitis/block";
import template from "./link.hbs";

interface LinkProps {
    title?: string;
    href?: string;
    class?: string;
}

export class Link extends Block {
    constructor(props: LinkProps) {
        super('div',props);
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}

export default class linkPartial {
}