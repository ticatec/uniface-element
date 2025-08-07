export enum ModalResult {
    Cancel = 0, //放弃操作，关闭窗口
    Ok = 1  //操作完成，正常关闭
}

export type OnClose = (result: ModalResult) => void;