
import i18nRes from "$lib/i18nRes";

type ShowFun = (message: string, title?: string, escapeHTML?: boolean) => Promise<void>;
type ShowConfirmFun = (message: string, title?: string | null, escapeHTML?: boolean, type?: 'info' | 'warning') => Promise<any>;

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
    {text: i18nRes.common.btnClose, type: 'primary', result: ModalResult.MR_OK}
];
const ConfirmButtons = [
    {text: i18nRes.common.btnConfirm, type: 'primary', result: ModalResult.MR_OK},
    {text: i18nRes.common.btnCancel, type: 'secondary', result: ModalResult.MR_CANCEL}
];


const initialize = (showInfo: any, showConfirm: any): void => {
    window.MessageBox = {
        showInfo,
        showConfirm
    }
};


export {initialize, ModalResult, InfoButtons, ConfirmButtons}