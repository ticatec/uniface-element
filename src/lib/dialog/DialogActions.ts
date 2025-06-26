import type {ButtonActions} from "$lib/action-bar";
import type ButtonAction from "$lib/action-bar/ButtonAction";
import {ModalResult} from "$lib/message-box";

export default interface DialogActions {
    /**
     * 操作类
     */
    list: ButtonActions;

    /**
     * 关闭窗口的action
     */
    close: ButtonAction;

    /**
     * 关闭问询
     */
    closeConfirm: ()=>Promise<boolean>;

}