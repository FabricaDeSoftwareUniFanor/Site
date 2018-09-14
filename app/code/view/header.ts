import { AppObject, Component, ComponentPageBody } from 'backappjh';
import { ControlLogin } from '../control/controlLogin';

export class Header extends AppObject {

    constructor(father?: Component) {
        super(father);
        this.init();
    }

    private init() {

    }

    public isLogged(element){
        console.log('isLogged');
        return ControlLogin.getInstance().isLogged(element);
    }

    public logout(element){
        console.log('logout');
    }
}