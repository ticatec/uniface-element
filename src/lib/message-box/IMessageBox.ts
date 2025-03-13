import i18n from "@ticatec/i18n";
import langRes from "$lib/i18n_resources/uniface_en_resource";

type ShowFun = (message: string, title?: string, escapeHTML?: boolean) => Promise<void>;
type ShowConfirmFun = (message: string, title?: string | null, escapeHTML?: boolean, type?: 'info' | 'warning') => Promise<any>;
;

export default interface IMessageBox {
    showInfo: ShowFun;
    showConfirm: ShowConfirmFun;
}

enum ModalResult {
    MR_OK = 1,
    MR_CANCEL = 2,
    MR_CLOSE = 3
}

const InfoButtons = [
    {text: langRes.uniface.btnClose, key: 'uniface.btnClose', type: 'primary', result: ModalResult.MR_OK}
];
const ConfirmButtons = [
    {text: langRes.uniface.btnConfirm, key: 'uniface.btnConfirm', type: 'primary', result: ModalResult.MR_OK},
    {text: langRes.uniface.btnCancel, key: 'uniface.btnCancel', type: 'secondary', result: ModalResult.MR_CANCEL}
];


const initialize = (showInfo: any, showConfirm: any): void => {
    window.MessageBox = {
        showInfo,
        showConfirm
    }
};


export {initialize, ModalResult, InfoButtons, ConfirmButtons}