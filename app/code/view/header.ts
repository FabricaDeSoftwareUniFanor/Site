import { AppObject, Component, ComponentPageBody } from 'backappjh';
import { ControlSign } from '../control/ControlSign';

export class Header extends AppObject {

    constructor(father?: Component) {
        super(father);
        this.init();
    }

    private init() {

    }

    public isSigned(){
        console.log('isLogged');
        return ControlSign.getInstance().isSigned();
    }

    public isSignedOut(){
        return !ControlSign.getInstance().isSigned();
    }

    public signOut(element){
        ControlSign.getInstance().signOut();
    }

    public subscribeSign(callback) {
        ControlSign.getInstance().subscribeSign(callback);
    }

    public unsubscribeSign(callback) {
        ControlSign.getInstance().unsubscribeSign(callback);
    }

    public publishSign(data) {
        ControlSign.getInstance().publishSign(data);
    }
}