import * as loader from './../onLoad/loader';
try { require('./../../style/app.css'); } catch (e) { console.log('Error CSS'); };

let w: any = window;
w.FontAwesomeConfig = {
    searchPseudoElements: true
}

export {
    loader
};
