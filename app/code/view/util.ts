import { AppObject, Component, ComponentPageBody } from 'backappjh';
// import { ControlSign } from '../control/ControlSign';

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

    private refreshHeader() {
        let header: Component;
        let pageBody;
        if (this !== undefined) {
            header = this.getHeader();
            pageBody = this.getPageBody();
        } else {
            // header = UserManegement.getInstance().getHeader();
            // pageBody = UserManegement.getInstance().getPageBody();
        }
        if (header !== undefined) {
            header.getFather();
        } else {
            header = pageBody.getFather().header;
        }

        // (<Component>header.arrayAppObject[0]).insert(header.getElement());
    }

    private goTo(page: string) {
        let header;
        let pageBody;
        if (this !== undefined) {
            header = this.getHeader();
            pageBody = this.getPageBody();
        } else {
            // header = UserManegement.getInstance().getHeader();
            // pageBody = UserManegement.getInstance().getPageBody();
        }
        if (pageBody !== undefined) {
            // console.log('pageBody', pageBody);
            pageBody.goToPage(page);
        } else if (header !== undefined) {
            // pageBody = (<ComponentView>header.getFather()).pageBody;
            // console.log('pageBody H', pageBody);
            pageBody.goToPage(page);
        }
    }

    public getInfo(user/*: User*/) {
        // let menuDivisor = this.getHeader().arrayAppObject[0].arrayAppObject[0].arrayAppObject[0].arrayAppObject[0].arrayAppObject[0].arrayAppObject[0];

        // let username = <AppObject>menuDivisor.arrayAppObject[0].arrayAppObject[1].arrayAppObject[0].arrayAppObject[0].arrayAppObject[0].arrayAppObject[0].arrayAppObject[0].arrayAppObject[0].arrayAppObject[0];
        // let information = <ComponentInformation>username.arrayAppObject[0];
        // information.getElement().innerHTML = user.authentication.username;

        // let group = <AppObject>menuDivisor.arrayAppObject[0].arrayAppObject[2].arrayAppObject[0].arrayAppObject[0].arrayAppObject[0].arrayAppObject[0].arrayAppObject[0].arrayAppObject[0].arrayAppObject[0];
        // information = <ComponentInformation>group.arrayAppObject[0];
        // let auth: Permission = user.authentication.permission;
        // information.getElement().innerHTML = Permission[auth];
        // information.information = Permission[auth];
        // information.renderAfterUpdateJSON();
    }
}