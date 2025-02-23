import Dialog from "./Dialog.svelte";
import DialogBoard from "./DialogBoard.svelte";
import type IDialog from "./IDialog";
import type {DialogCloseConfirm} from "./DialogCloseConfirm";

declare global {
    interface Window {
        Dialog: IDialog;
    }
}

export {type IDialog};

export {type DialogCloseConfirm};

export {DialogBoard}

export default Dialog;