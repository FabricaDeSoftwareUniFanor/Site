import { AppObject, Component, ComponentPageBody } from 'backappjh';
import { ControlLogin } from '../control/controlLogin';

export class Header extends AppObject {

    constructor(father?: Component) {
        super(father);
        this.init();
    }

    private init() {

    }

    public isLogged(){
        console.log('isLogged');
        return ControlLogin.getInstance().isLogged();
    }

    public logout(element){
        console.log('logout');
    }

    public subscribeSign(callback) {
        ControlLogin.getInstance().subscribeSign(callback);
    }

    public unsubscribeSign(callback) {
        ControlLogin.getInstance().unsubscribeSign(callback);
    }

    public publishSign(data) {
        ControlLogin.getInstance().publishSign(data);
    }
}