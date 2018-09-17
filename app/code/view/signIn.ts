import { AppObject, Component, ComponentPageBody } from 'backappjh';
import { ControlSign } from '../control/ControlSign';
import { Util } from './util';

export class SignIn extends AppObject {

    constructor(father?: Component) {
        super(father);
        this.init();
    }

    private init() {
        let _self = this;
    }

    public signIn(component) {
        console.log('signIn');
        // Util.getInstance().setCurrentHeader(this.getHeader());
        Util.getInstance().setCurrentPageBody(this.getPageBody());
        let divisor: Component = <Component>(<ComponentPageBody>component.getFather().getFather().getFather());
        let arrayField: Array<HTMLInputElement> = new Array<HTMLInputElement>();
        arrayField.push(<HTMLInputElement>(<Component>divisor.arrayAppObject[0].arrayAppObject[0].arrayAppObject[0]).getElement());
        arrayField.push(<HTMLInputElement>(<Component>divisor.arrayAppObject[1].arrayAppObject[0].arrayAppObject[0]).getElement());
        console.log(divisor, arrayField[0].value, arrayField[1].value);
        if (!Util.getInstance().checkArrayEmpty(arrayField)) {
            ControlSign.getInstance().signIn({ username: arrayField[0].value, password: arrayField[1].value });
        } else {
            Util.getInstance().notificationMissingFields();
        }
    }

    public signUp(component) {//???
        console.log('signIn');
        let divisor: Component = <Component>(<ComponentPageBody>component.getFather().getFather().getFather());
        let arrayField: Array<HTMLInputElement> = new Array<HTMLInputElement>();
        arrayField.push(<HTMLInputElement>(<Component>divisor.arrayAppObject[0].arrayAppObject[0].arrayAppObject[0]).getElement());
        arrayField.push(<HTMLInputElement>(<Component>divisor.arrayAppObject[1].arrayAppObject[0].arrayAppObject[0]).getElement());
        console.log(divisor, arrayField[0].value, arrayField[1].value);
        if (!Util.getInstance().checkArrayEmpty(arrayField)) {
            ControlSign.getInstance().signIn({ username: arrayField[0].value, password: arrayField[1].value });
        } else {
            Util.getInstance().notificationMissingFields();
        }
    }

    public signOut(){
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