import type {ButtonType} from "$lib/button/ButtonType";
import type {MouseClickHandler} from "$lib";

export default interface ButtonAction {

    /**
     * 按钮的文字
     */
    label: string;

    /**
     * 是否禁用
     */
    disabled?: boolean;

    /**
     * 前缀图标
     */
    icon?: string;

    /**
     * 按钮的类型
     */
    type?: ButtonType;

    /**
     * click处理函数
     */
    handler?: MouseClickHandler
}

export type ButtonActions = Array<ButtonAction | null>;