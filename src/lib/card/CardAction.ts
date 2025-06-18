export type ActionCallback = (data: any) => void;

export default interface CardAction {

    /**
     * 使用icon字体
     */
    icon?: string;

    /**
     * 直接嵌入图标
     */
    img?: string;

    /**
     * 鼠标停留的提示
     */
    hint?: string;

    /**
     *
     */
    disabled?: boolean;

    /**
     *
     */
    callback: ActionCallback;
}