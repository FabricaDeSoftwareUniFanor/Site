import { AppObject, Component, ComponentPageBody } from 'backappjh';
import { ControlLogin } from '../control/controlLogin';

export class Login extends AppObject {

    

    constructor(father?: Component) {
        super(father);
        this.init();
    }

    private init() {
        let _self = this;
    }

    public signIn(component) {
        console.log('signIn');
        let divisor: Component = <Component>(<ComponentPageBody>component.getFather().getFather().getFather());
        let arrayField: Array<HTMLInputElement> = new Array<HTMLInputElement>();
        arrayField.push(<HTMLInputElement>(<Component>divisor.arrayAppObject[0].arrayAppObject[0].arrayAppObject[0]).getElement());
        arrayField.push(<HTMLInputElement>(<Component>divisor.arrayAppObject[1].arrayAppObject[0].arrayAppObject[0]).getElement());
        console.log(divisor, arrayField[0].value, arrayField[1].value);
        if (!this.checkArrayEmpty(arrayField)) {
            ControlLogin.getInstance().signIn({ username: arrayField[0].value, password: arrayField[1].value });
        } else {
            ControlLogin.getInstance().notificationMissingFields();
        }
    }

    public checkArrayEmpty(arrayField: Array<HTMLInputElement>) {
        let empty = false;
        arrayField.forEach(field => {
            if (this.checkEmpty(field)) {
                empty = true;
            }
        });
        return empty;
    }

    public checkEmpty(field: HTMLInputElement) {
        if (field.value === '') {
            this.errorField(field);
            return true;
        }
        this.okField(field);
        return false;
    }

    public errorField(field: HTMLInputElement) {
        field.setAttribute('style', 'border-bottom-color: red');
    }

    public okField(field: HTMLInputElement) {
        field.setAttribute('style', 'border-bottom-color: white');
    }

    public goToLogin(){
        console.log('goToLogin');
    }

    public logout(){
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