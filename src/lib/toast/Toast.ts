

export type ShowToast = (msg: string, type?:  "error" | "info" | "success", duration?:number) => void;

export default interface Toast {
    show: ShowToast
}


const initialize = (show: ShowToast): void=> {
    window.Toast = {
        show
    }
};

export {initialize}