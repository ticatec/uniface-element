import utils from "./common/utils";

export default class I18nContext {

    private resource: any = {};

    private static instance: I18nContext;

    static getInstance() {
        if (I18nContext.instance == null) {
            I18nContext.instance = new I18nContext();
        }
        return I18nContext.instance;
    }

    private constructor() {

    }

    /**
     * 设置语言包
     * @param languagePackage
     */
    setResource(languagePackage: any) {
        this.resource = languagePackage;
    }

    /**
     * 根据key值获取相应的文本值
     * @param key
     * @param defaultText
     */
    getText(key: string, defaultText?: string): string {
        let text = utils.getNestedValue(this.resource, key) ?? defaultText ?? `Invalid key: ${key}`;
        return typeof text == "string" ? text : `Invalid key: ${key}`;
    }

    /**
     * 根据key获取一个节点
     * @param key
     */
    get(key: string): any {
        return utils.getNestedValue(this.resource, key);
    }

}