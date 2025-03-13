export type ActionCallback = () => void;

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
     *
     */
    disabled?: boolean;

    /**
     *
     */
    callback: ActionCallback;
}