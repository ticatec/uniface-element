export type HrefBuilder = (item: any) => Array<HrefLink> | HrefLink;

export type HrefAction = () => void;

export default interface HrefLink {
    /**
     * 显示超链接的文字
     */
    text: string;
    /**
     * 点击的处理函数
     */
    action: HrefAction;
}