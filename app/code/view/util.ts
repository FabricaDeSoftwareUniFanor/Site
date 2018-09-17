import { AppObject, Component, ComponentPageBody } from 'backappjh';
import { ControlSign } from '../control/ControlSign';

export class Util extends AppObject {
    private static instance: Util;

    public static getInstance(father?: Component): Util {
        if (!Util.instance) {
            Util.instance = new Util(father);
        }
        return Util.instance;
    }

    constructor(father?: Component) {
        super(father);
        this.init();
    }

    private init() {
        let _self = this;
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

    public checkEquals(field0: HTMLInputElement, field1: HTMLInputElement) {
        if (field0.value !== field1.value) {
            this.errorField(field1);
            return false;
        }
        this.okField(field1);
        return true;
    }

    public goToSignUp(){
        console.log('goToLogin');
    }

    public goToSignIn(){
        console.log('goToLogin');
    }

    public notificationMissingFields() {
        this.notificationCustom('missingFields');
    }

    public notificationNone() {
        this.notificationCustom('none');
    }

    public notificationCustom(message) {
        // (<ComponentNotification>this.header.arrayAppObject[1]).goToNotification(message);
    }
}