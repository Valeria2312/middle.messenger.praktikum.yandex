import {expect, assert} from 'chai';
import Block from '../src/utilities/block';

class testBlock extends Block {
    render(): string {
        return 'test block';
    }
}
const block = new testBlock('div', {class: 'test-class'});


describe('Block', () => {
    it('Создание и инициализация', () => {
        const block = new Block();
        expect(block).to.exist;
    });
    it('render возвращает правильный tagname', () => {
        assert.equal(block.element!.tagName, 'DIV');
    });

    it('render возвращает правильное содержимое', () => {
        assert.equal(block.element!.innerHTML, 'test block');
    });

    it('меняет props при вызове setProps', () => {
        block.setProps({id:'test'});
        assert.deepEqual(block.props, { class: 'test-class', id: 'test' });
    });

    it('Скрытие блока', () => {
        const block = new Block();
        const content = document.createElement('div');
        block.getContent = () => content;
        block.hide();
        expect(content.style.display).to.equal('none');
    });
});
