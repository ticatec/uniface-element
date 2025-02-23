

export default interface IDialog {
    showModal: (dialog: any, params: any) => void;
}


const initialize = (showModal: any): void=> {
    window.Dialog = {
        showModal
    }
};

export {initialize}