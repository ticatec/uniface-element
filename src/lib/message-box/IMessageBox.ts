import i18n from "@ticatec/i18n";

type ShowFun = (message: string, title?: string, escapeHTML?:boolean) => Promise<void>;
type ShowConfirmFun = (message: string, title?: string | null, escapeHTML?:boolean, type?: 'info' | 'warning') => Promise<any>;;

export default interface IMessageBox {
    showInfo: ShowFun;
    showConfirm: ShowConfirmFun;
}

enum ModalResult {
    MR_OK= 1,
    MR_CANCEL= 2,
    MR_CLOSE= 3
}

const InfoButtons = [
    {label: i18n.getText('uniface.btnClose', 'Close'), type: 'primary', result: ModalResult.MR_OK}
];
const ConfirmButtons = [
    {label: i18n.getText('uniface.btnCancel', 'Cancel'), type: 'default', result: ModalResult.MR_CANCEL},
    {label: i18n.getText('uniface.btnConfirm', 'OK'), type: 'primary', result: ModalResult.MR_OK}
];


const initialize = (showInfo: any, showConfirm: any): void=> {
    window.MessageBox = {
        showInfo,
        showConfirm
    }
};


export {initialize, ModalResult, InfoButtons, ConfirmButtons}