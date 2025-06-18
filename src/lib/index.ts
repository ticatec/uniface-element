import {DateContext} from "./base-calendar";

import type {IDialog} from './dialog'
import {type IMessageBox, ModalResult} from "./message-box";
import type {Toast} from "./toast";
import type {Indicator} from "./indicator"
import {DisplayMode} from "./common/DisplayMode.js";
import type IHint from "$lib/popup-hint/IHint";

export {
    DateContext,
    ModalResult,
    DisplayMode
};


declare global {
    interface Window {
        Indicator: Indicator;
        Toast: Toast;
        MessageBox: IMessageBox;
        Dialog: IDialog;
        Hint: IHint;
    }
}