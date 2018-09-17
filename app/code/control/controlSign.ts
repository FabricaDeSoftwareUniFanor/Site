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
        _self.socketIo.on('sign', (data) => { _self.publish({ sign: data }); });
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
        console.log(callback.name, 'has been subscribed to Sign');
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
        console.log(callback.name, 'has been subscribed to Sign');
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
        console.log('data:', data);
        if (this !== undefined) {
            controlSign = this;
        } else {
            controlSign = ControlSign.getInstance();
        }
        if (data.sign !== undefined) {
            if (data.sign.user !== undefined) {
                Util.getInstance().notificationNone();
                Util.getInstance().goTo('signed');
                Util.getInstance().refreshHeader();
                Util.getInstance().getInfo(data.sign.user);
            } else if (data.sign.error !== undefined) {
                Util.getInstance().notificationCustom(data.sign.error);
            }

            controlSign.logged = data.sign.user;
            controlSign.publishSign(data.sign.user !== undefined);
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