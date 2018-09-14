import { AppObject, Component, ComponentPageBody } from 'backappjh';
import { ControlLogin } from '../control/controlLogin';

export class Login extends AppObject {

    private static instance: Login;
    private subscribersSign: Array<any>;

    public static getInstance(father?: Component): Login {
        if (!Login.instance) {
            Login.instance = new Login(father);
        }
        return Login.instance;
    }

    constructor(father?: Component) {
        super(father);
        this.init();
    }

    private init() {
        let _self = this;
        _self.subscribersSign = new Array<any>();
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

    public isLogged(element){
        console.log('isLogged');
        return ControlLogin.getInstance().isLogged(element);
    }

    public logout(){
        console.log('logout');
    }

    public subscribeSign(callback) {
        // we could check to see if it is already subscribed
        this.subscribersSign.push(callback);
        console.log(callback.name, 'has been subscribed to UserManegement Sign');
    }

    public unsubscribeSign(callback) {
        this.subscribersSign = this.subscribersSign.filter((element) => {
            return element !== callback;
        });
    }

    public publishSign(data) {
        this.subscribersSign.forEach((subscriber) => {
            subscriber(data);
        });
    }
}