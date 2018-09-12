import { AppObject, Component, ComponentPageBody } from 'backappjh';
import { ControlLogin } from '../control/controlLogin';

export class Login extends AppObject {

    private static instance: Login;

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
}