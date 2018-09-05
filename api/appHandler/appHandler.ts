import { BasicAppHandler, BasicSocket, BasicHardwareHandler } from 'backapijh';
import { HardwareHandler } from '../hardwareHandler/hardwareHandler';

export class AppHandler extends BasicAppHandler {
    constructor(hardwareHandler: HardwareHandler){
        super(hardwareHandler);
    }

    public configSocket(basicSocket: BasicSocket){
        let _self = this;
    }
}