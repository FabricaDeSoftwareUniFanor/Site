import { AppObject, Component, ComponentPageBody } from 'backappjh';
import { ControlSign } from '../control/ControlSign';
import { Util } from './util';
import { Authentication } from '../user/authentication';
import { Permission } from '../user/permission';
import { User } from '../user/user';

export class SignUp extends AppObject {

    constructor(father?: Component) {
        super(father);
        this.init();
    }

    private init() {
        let _self = this;
    }

    public signUp(component) {
        // console.log('createUser!!!');
        let divisor: Component = <Component>(<ComponentPageBody>component.getFather().getFather().getFather());
        let arrayField: Array<HTMLInputElement> = new Array<HTMLInputElement>();
        arrayField.push(<HTMLInputElement>(<Component>divisor.arrayAppObject[0].arrayAppObject[0].arrayAppObject[0]).getElement());
        arrayField.push(<HTMLInputElement>(<Component>divisor.arrayAppObject[1].arrayAppObject[0].arrayAppObject[0]).getElement());
        arrayField.push(<HTMLInputElement>(<Component>divisor.arrayAppObject[1].arrayAppObject[1].arrayAppObject[0]).getElement());
        arrayField.push(<HTMLInputElement>(<Component>divisor.arrayAppObject[2].arrayAppObject[0].arrayAppObject[0]).getElement());
        arrayField.push(<HTMLInputElement>(<Component>divisor.arrayAppObject[2].arrayAppObject[1].arrayAppObject[0]).getElement());
        arrayField.push(<HTMLInputElement>(<Component>divisor.arrayAppObject[3].arrayAppObject[0].arrayAppObject[0]).getElement());
        arrayField.push(<HTMLInputElement>(<Component>divisor.arrayAppObject[4].arrayAppObject[0].arrayAppObject[0]).getElement());
        arrayField.push(<HTMLInputElement>(<Component>divisor.arrayAppObject[4].arrayAppObject[1].arrayAppObject[0]).getElement());
        arrayField.push(<HTMLInputElement>(<Component>divisor.arrayAppObject[4].arrayAppObject[2].arrayAppObject[0]).getElement());
        console.log(arrayField[0].value, arrayField[1].value, arrayField[2].value,
            arrayField[3].value, arrayField[4].value, arrayField[5].value,
            arrayField[6].value, arrayField[7].value, arrayField[8].value);

        if (Util.getInstance().checkEquals(arrayField[7], arrayField[8]) && !Util.getInstance().checkArrayEmpty(arrayField)) {
            let header = divisor.getHeader();
            // (<ComponentNotification>header.arrayAppObject[1]).goToNotification('none');
            let auth = new Authentication(arrayField[7].value, Permission.User);
            let user = new User(arrayField[6].value, arrayField[0].value, new Date(arrayField[1].value), arrayField[2].value,
                arrayField[3].value, arrayField[4].value, auth);
            // console.log(user);
            // this.socketIo.emit('signUp', user);
            ControlSign.getInstance().signUp(user);
        } else {
            let header = divisor.getHeader();
            // (<ComponentNotification>header.arrayAppObject[1]).goToNotification('missingFields');
        }
    }

    public getUsernameAndPassword(component) {
        if (ControlSign.getInstance().getTempUser() !== undefined) {
            // console.log(component);
            let divisor: Component = <Component>(<ComponentPageBody>component.getFather().getFather().getFather());
            (<HTMLInputElement>(<Component>divisor.arrayAppObject[4].arrayAppObject[0].arrayAppObject[0]).getElement()).value = ControlSign.getInstance().getTempUser().username;
            (<HTMLInputElement>(<Component>divisor.arrayAppObject[4].arrayAppObject[1].arrayAppObject[0]).getElement()).value = ControlSign.getInstance().getTempUser().authentication.password;
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