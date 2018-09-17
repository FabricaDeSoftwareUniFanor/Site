import { AppObject, Component, ComponentPageBody } from 'backappjh';
import { ControlSign } from '../control/ControlSign';
import { Util } from './util';

export class Header extends AppObject {

    constructor(father?: Component) {
        super(father);
        this.init();
    }

    private init() {

    }

    public goToSignIn(){
        Util.getInstance().setCurrentPageBody(this.getPageBody());
        Util.getInstance().goToSignIn();
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