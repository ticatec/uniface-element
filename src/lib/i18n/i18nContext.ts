import utils from "../common/utils";
import unifaceEnUS from "./uniface-en-US";

class I18nContext {

    private resource: any = {};

    constructor() {
        this.resource = JSON.parse(JSON.stringify(unifaceEnUS));
    }

    private deepMerge(target: any, source: any) {
        if (source === null || source === undefined) {
            return target;
        }
        if (target === null || target === undefined) {
            return source;
        }

        if (Array.isArray(target) && Array.isArray(source)) {
            const result = [...target];
            for (let i = 0; i < source.length; i++) {
                if (i < result.length) {
                    if (typeof result[i] === 'object' && typeof source[i] === 'object' &&
                        !Array.isArray(result[i]) !== Array.isArray(source[i])) {
                        result[i] = this.deepMerge(result[i], source[i]);
                    } else {
                        result[i] = source[i];
                    }
                } else {
                    result.push(source[i]);
                }
            }
            return result;
        }

        if (typeof target === 'object' && typeof source === 'object' &&
            !Array.isArray(target) && !Array.isArray(source)) {
            const result = { ...target }; // Create a copy of the target object

            // Iterate through source object properties
            for (const key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    // If both target and source have this property and both are objects, recursively merge
                    if (key in target &&
                        typeof target[key] === 'object' &&
                        typeof source[key] === 'object' &&
                        target[key] !== null &&
                        source[key] !== null &&
                        !Array.isArray(target[key]) !== Array.isArray(source[key])) {
                        result[key] = this.deepMerge(target[key], source[key]);
                    } else {
                        // Otherwise, overwrite target property with source property
                        result[key] = source[key];
                    }
                }
            }

            return result;
        }

        // For non-object, non-array values, just return the source
        return source;
    }

    /**
     * 设置语言包
     * @param languagePackage
     */
    setResource(languagePackage: any) {
        console.log("当前语言包：", this.resource, languagePackage)
        this.resource = this.deepMerge(this.resource, languagePackage);
        console.log("更新后的语言包：", this.resource)
    }

    /**
     * 根据key值获取相应的文本值
     * @param key
     * @param defaultText
     */
    getText(key:string, defaultText ?: string): string {
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

const i18n = new I18nContext();

export default i18n;