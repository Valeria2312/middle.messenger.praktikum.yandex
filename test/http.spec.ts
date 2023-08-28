import { expect } from 'chai';
import HTTPTransport from '../src/utilities/HTTPTransport';
import sinon, { } from 'sinon';
import { url } from '../src/utilities/constants';
let open: any;
let send: any;
let setRequestHeader: any;

const data = { login: 'john_doe', password: 'Mysecurepassword1' };
describe('HTTPTransport test', () => {
    beforeEach(() => {
        open = sinon.fake();
        send = sinon.fake();
        setRequestHeader = sinon.fake();
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.XMLHttpRequest = function () {
        return {
            open,
            send,
            setRequestHeader,
        } as any;
    };

    it('Get method', () => {
        const http = new HTTPTransport();

        http.get(url + '/auth/user');

        expect(open.callCount).to.eq(1);
        expect(send.callCount).to.eq(1);

        expect(open.firstArg).to.eq('GET');
        expect(open.lastArg).to.eq('https://ya-praktikum.tech/api/v2/auth/user');
    });

    it('Post method with query params', () => {
        const http = new HTTPTransport();

        http.post(url + '/auth/signup', { data });

        expect(open.callCount).to.eq(1);
        expect(send.callCount).to.eq(1);

        expect(open.firstArg).to.eq('POST');
        expect(open.lastArg).to.eq('https://ya-praktikum.tech/api/v2/auth/signup');
        expect(send.firstArg).to.eq('{"login":"john_doe","password":"Mysecurepassword1"}');
    });

    it('Delete method', () => {
        const http = new HTTPTransport();

        http.delete(url + '/test');

        expect(open.callCount).to.eq(1);
        expect(send.callCount).to.eq(1);

        expect(open.firstArg).to.eq('DELETE');
        expect(open.lastArg).to.eq('https://ya-praktikum.tech/api/v2/test');
    });

    it('Send FormData', () => {
        const http = new HTTPTransport();
        const data = new FormData();
        http.post(url + '/test', { data });

        expect(open.callCount).to.eq(1);
        expect(send.callCount).to.eq(1);

        expect(open.firstArg).to.eq('POST');
        expect(open.lastArg).to.eq('https://ya-praktikum.tech/api/v2/test');
        expect(send.firstArg).to.eq(data);
    });
});
