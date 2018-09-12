import { ExternalHandler } from '../externalHandler/externalHandler';
import { BasicHardwareHandler } from 'backapijh';
import { Handler, Event, Operation, Database } from 'flexiblepersistence';
import { User } from '../user/user';
import { Authentication } from '../user/authentication';
import { Permission } from '../user/permission';

export class HardwareHandler extends BasicHardwareHandler {
    private externalHandler: ExternalHandler;
    private persistenceHandler: Handler;

    constructor(){
        super();
    }

    public getExternalHandler(){
        return this.externalHandler;
    }

    public setExternalHandler(externalHandler: ExternalHandler){
        this.externalHandler = externalHandler;
    }

    public signUp(basicUser, socket) {
        let _self = this;
        if (socket.identification.user !== undefined) {
            if (basicUser.authentication.permission > socket.identification.user.authentication.permission) {
                basicUser.authentication.permission = socket.identification.user.authentication.permission
            }
        } else {
            basicUser.authentication.permission = Permission.User;
        }

        let newUser = new User(basicUser);
        newUser.arrayAddress = basicUser.arrayAddress;
        newUser.arrayPhone = basicUser.arrayPhone;
        this.persistenceHandler.readArray('user', { 'username': newUser.username }, (error, data) => {
            _self.signUpCheck(newUser, data, socket);
        });

    }

    public signUpCheck(user, data, socket) {
        console.log(user);
        if (data.length > 0) {
            socket.emit('userManegement', { error: 'userExists' });
        } else {
            let event = new Event(Operation.add, 'user', user);
            this.persistenceHandler.addEvent(event);
            socket.emit('userManegement', { user: user });
        }

    }

    public signIn(user, socket) {
        let _self = this;
        this.persistenceHandler.readArray('user', { 'username': user.username }, (error, data) => {
            _self.signInCheck(user, data, socket);
        });
    }

    public signInCheck(user, data, socket) {
        console.log(user);
        for (let index = 0; index < data.length; index++) {
            console.log(user);
            let element = JSON.parse(JSON.stringify(data[index])); // JSON.parse(data[index])
            let hash = Authentication.generatePasswordHashFromSalt(user.password, element.authentication.salt);
            if (element.authentication.passwordHash === hash.passwordHash) {
                let logged = element;
                delete logged.authentication.passwordHash;
                delete logged.authentication.salt;
                socket.identification.user = logged;
                socket.identification.device = user.device;
                socket.emit('userManegement', { user: logged });
                return;
            }
        }
        // console.log('ERROR')
        socket.emit('userManegement', { error: 'wrongUser' });
    }
}