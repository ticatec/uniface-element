import Dialog from "./Dialog.svelte";
import DialogBoard from "./DialogBoard.svelte";
import type IDialog from "./IDialog";
import type {DialogCloseConfirm} from "./DialogCloseConfirm";
import CommonDialog from "./CommonDialog.svelte";

declare global {
    interface Window {
        Dialog: IDialog;
    }
}

export default Dialog;
export {type IDialog};
export {type DialogCloseConfirm};
export {DialogBoard}
export {CommonDialog}