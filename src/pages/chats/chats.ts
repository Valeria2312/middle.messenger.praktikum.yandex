import './chats.scss';
import template from "./chats.hbs";
import Block from '../../utilities/block';
import {ChatItem} from "../../partials/chatItem/chatItem";
import {Chat} from "../../partials/chat/chat";

export class ChatsPage extends Block {
    constructor() {
        super();
    }
    init() {
        this.children.chatItem = new ChatItem({
            name: 'Андрей',
            content: 'Изображение',
            time: '10:49',
            count: '2',
        });
        this.children.chat = new Chat({
        });
    }
    render() {
        return this.compile(template, this.props );
    }
}
