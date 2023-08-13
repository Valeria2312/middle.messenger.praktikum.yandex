import './modal.scss';
import template from './modal.hbs';
import Block from '../../utilities/block';
import { Button } from '../button/button';
import UserAPI from '../../controllers/user-api';
import { Close } from '../Close/Close';
import close
    from '../chatModal/image/free-icon-close-cross-in-circular-outlined-interface-button-58253.png';

interface ModalProps {
  srcImage?: string
  name?: string
  title?: string
  addChat?: boolean
  deleteChat?: boolean
  events?: {
    click?: (event: Event) => void
  }
}

export class Modal extends Block {
    constructor(props: ModalProps) {
        super("div", props);
    }
    init() {
        this.children.close = new Close({
            src: close,
            alt: "close",
            class: "close",
            events: {
                click: () => {
                    this.hide();
                }
            }
        });
        this.children.button = new Button({
            name: "Сохранить",
            events: {
                click: () => {
                    const input = document.querySelector(".modal_input");
                    console.log('сработало условие');
                    const formData = new FormData();
                    if(input) {
                        const data = input!.files[0];
                        console.log(data);
                        formData.append("avatar", data);
                        UserAPI.changeAvatar(formData);
                    }
                    this.hide();
                }
            }
        });
    }

    render() { return this.compile(template, this.props);
    }
}
