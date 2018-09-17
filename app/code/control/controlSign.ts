import { AppObject, Component, ComponentItem, ComponentDataInput, ComponentOption, ComponentPageBody, ComponentView, ComponentComboBox, ComponentInformation, AppObjectEvent/*, ComponentNotification*/ } from 'backappjh';
import { BasicSocket, UniqueSocket } from 'basicsocket';
import { User } from '../user/user';
import { Util } from '../view/util';

export class ControlSign extends AppObject {
    private static instance: ControlSign;
    private socketIo: BasicSocket;
    // private headerView;
    private subscribers: Array<any>;
    private subscribersSign: Array<any>;
    private tempUser: User;

    public static getInstance(father?: Component): ControlSign {
        if (!ControlSign.instance) {
            ControlSign.instance = new ControlSign(father);
        }
        return ControlSign.instance;
    }

    constructor(father?: Component) {
        super(father);
        this.init();
    }

    private init() {
        let _self = this;
        // _self.tempObjectArray = new Array<any>();
        _self.subscribers = new Array<any>();
        _self.subscribersSign = new Array<any>();
        _self.socketIo = UniqueSocket.getInstance().getBasicSocket();
        _self.subscribe((data) => { _self.sign(data); });
        // _self.headerView = divisor.getHeader();
    }

    public getTempUser() {
        return this.tempUser;
    }

    public setTempUser(user: User) {
        this.tempUser = user;
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

    public subscribe(callback) {
        // we could check to see if it is already subscribed
        this.subscribers.push(callback);
        console.log(callback.name, 'has been subscribed to UserManegement');
    }

    public unsubscribe(callback) {
        this.subscribers = this.subscribers.filter((element) => {
            return element !== callback;
        });
    }

    public publish(data) {
        this.subscribers.forEach((subscriber) => {
            subscriber(data);
        });
    }

    public sign(data) {
        let controlSign;
        if (this !== undefined) {
            controlSign = this;
        } else {
            controlSign = ControlSign.getInstance();
        }
        if (data.userManegement !== undefined) {
            if (data.userManegement.user !== undefined) {
                controlSign.notificationNone();
                controlSign.goTo('home');
                controlSign.refreshHeader();
                controlSign.getInfo(data.userManegement.user);
            } else if (data.userManegement.error !== undefined) {
                controlSign.notificationCustom(data.userManegement.error);
            }

            controlSign.logged = data.userManegement.user;
            controlSign.publishSign(data.userManegement.user !== undefined);
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
            pageBody = (<ComponentView>header.getFather()).pageBody;
            // console.log('pageBody H', pageBody);
            pageBody.goToPage(page);
        }
    }

    public signIn(log) {
        Util.getInstance().notificationNone();
        this.socketIo.emit('signIn', log);
    }

    public signUp(log) {
        Util.getInstance().notificationNone();
        this.socketIo.emit('signUp', log);
    }

    public isSigned(){
        console.log('isSigned');
        return false;
    }

    public signOut(){
        console.log('signOut');
    }
}