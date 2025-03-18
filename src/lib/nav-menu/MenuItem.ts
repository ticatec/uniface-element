export default interface MenuItem {
    /**
     * 菜单编码
     */
    code?: string;
    /**
     * 菜单文字
     */
    text: string;

    /**
     * 用于i18n的key
     */
    key?: string;
    /**
     * 绑定数据，用户处理，通常为uri的跳转地址
     */
    data?: any;
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