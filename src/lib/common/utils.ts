/**
 * 是否空
 * @param s
 */
const isEmpty = (s: any): boolean => {
    return s == null || (typeof s == "string" && s.trim().length == 0);
}


const getNumberValue = (n: any): number | null => {
    let v = typeof (n) == "number" ? n : typeof (n) == "string" ? parseFloat(n) : null;
    return v != null ? isNaN(v) ? null : v : v;
}

const getStringValue = (n: any): string | null => {
    return typeof (n) == "string" ? n : typeof (n) == "number" ? n.toString() : null;
}

/**
 * 睡眠n秒
 * @param n
 */
const sleep = (n: number): Promise<void> => {
    if (n < 0) {
        n = 1;
    }
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, n * 1000);
    })
}

/**
 *
 * @param precision
 * @param allowNegative
 */
const getNumberRegex = (precision: number | null | undefined, allowNegative: boolean): string => {
    if (precision == null) {
        return allowNegative ? `^-?\\d+(\\.\\d*)?$` : `^\\d+(\\.\\d*)?$`
    } else if (precision > 0) {
        return allowNegative ? `^-?\\d+(\\.\\d{0,${precision}})?$` : `^\\d+(\\.\\d{0,${precision}})?$`
    } else {
        return allowNegative ? `^-?\\d+$` : `^\\d+$`;
    }
}

/**
 * 检查是不是一个有效的数字
 * @param n
 * @param precision
 * @param allowNegative
 * @param max
 * @param min
 */
const isValidNumber = (n: number, precision: number | null | undefined, allowNegative: boolean,
                       max: number | null = null, min: number | null = null): boolean => {
    let valid = true;
    if (precision != null && precision > 0) {
        let base = Math.pow(10, precision);
        valid = n * base == Math.floor(n * base);
    }
    if (valid && max != null) {
        valid = n <= max;
    }
    if (valid && allowNegative && min != null) {
        valid = n >= min;
    }
    return valid;
}

const formatNumber = (n: number | null, precision: number | null | undefined): string => {
    if (n == null) {
        return '';
    } else {
        if (precision != null) {
            return n.toFixed(precision);
        } else {
            return n.toString();
        }
    }
}

/**
 * 过滤文件列表，返回符合 accept 规则的文件
 * @param {FileList | File[]} files - 用户选择或拖入的文件列表
 * @param {string} accept - 允许的文件类型，如 "image/*" 或 ".doc,.docx,.pdf"
 * @returns {File[]} - 过滤后的符合规则的文件
 */
const filterFiles = (files: Array<File>, accept: string) => {
    if (isEmpty(accept) || accept === "*/*" || !accept) return Array.from(files); // 允许所有文件

    const allowedExtensions = accept.split(",").map(ext => ext.trim().toLowerCase());

    return Array.from(files).filter(file => {
        const fileName = file.name.toLowerCase();
        const fileType = file.type.toLowerCase();

        // 如果是 image/*，则匹配所有图片类型
        if (accept.includes("image/*") && fileType.startsWith("image/")) return true;

        // 其他情况，检查扩展名是否匹配
        return allowedExtensions.some(ext => fileName.endsWith(ext));
    });
}

/**
 * 获取嵌套属性节点，如果中间为null，补空对象
 * @param obj
 * @param path
 */
const getNestedObject = (obj: any, keys: string[]) => {
    let current = obj;
    for (const property of keys) {
        // 检查当前值是否为 null 或非对象，或者当前属性在对象中不存在
        if (current === null || typeof current !== 'object' || !current.hasOwnProperty(property)) {
            return {}; // 如果中间任何值不存在，返回空对象
        }
        current = current[property]; // 访问下一层属性
    }
    return current;
}

/**
 * 获取嵌套定义key的值
 * @param data
 * @param key
 */
const getNestedValue = (data: any, key: string): any => {
    let keys = key.split('.');
    let attr: string | undefined = keys.pop();
    if (attr == null) {
        return null;
    } else {
        let obj: any = keys.length > 0 ? getNestedObject(data, keys) : data;
        return obj[attr];
    }
}


export default {
    isEmpty, getNumberValue, getStringValue, sleep, getNumberRegex, isValidNumber, formatNumber, filterFiles, getNestedObject,
    getNestedValue
}