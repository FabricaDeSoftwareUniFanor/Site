import * as loader from './../onLoad/loader';
import { LanguageSettings } from '../view/languageSettings';
import { Login } from '../view/login';
import { Header } from '../view/header';
import { ControlLogin } from '../control/controlLogin';
try { require('./../../style/app.css'); } catch (e) { console.log('Error CSS'); };

let w: any = window;
w.FontAwesomeConfig = {
    searchPseudoElements: true
}

export {
    loader,
    LanguageSettings,
    Login,
    ControlLogin,
    Header
};
