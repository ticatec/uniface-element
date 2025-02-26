export default interface MenuItem {
    /**
     * 菜单编码
     */
    code: string;
    /**
     * 菜单文字
     */
    text: string;
    /**
     * 跳转资源
     */
    uri?: string;
    /**
     * 子菜单项
     */
    children?: Array<MenuItem>;
    /**
     * 是否打开
     */
    expand?: boolean;
}

export type OnMenuClick = (item: MenuItem) => void;