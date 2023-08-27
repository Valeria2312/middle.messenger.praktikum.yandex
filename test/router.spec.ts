import { expect } from 'chai';
import Router from '../src/utilities/router';
import { RegistrationPage } from '../src/pages/registration/registration';
import Route from '../src/utilities/route';

describe('routing testing', () => {
    before(() => {
        Router.start();
    });
    it('Получение роута', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        Router.use('/sign-up', RegistrationPage);
        const existedRoute = Router.getRoute('/sign-up');
        expect(existedRoute instanceof Route).to.eq(true);
    });
    it('Использование роута', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const result = Router.use('/sign-up', RegistrationPage);
        // console.log(result);
        expect(result).to.eq(Router);
    });

});
