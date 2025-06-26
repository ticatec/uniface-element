/**
 * 返回嵌套对象和属性
 * @param data
 * @param key
 */
export function getNestObject(data: any, key: string): { parent: any; keyField: string  } {
    // 如果 key 为空或无效，返回默认值
    if (!key || typeof key !== 'string') {
        throw new Error('invalid key')
    }

    // 分割 key 为数组
    const keys = key.split('.'); // ["aaa", "bbb", "ccc"]
    const field = keys[keys.length - 1]; // 最后一个属性: "ccc"
    const parentPath = keys.slice(0, -1); // 倒数第二层路径: ["aaa", "bbb"]

    // 如果没有父路径（例如 key="ccc"），返回 data 和 field
    if (parentPath.length === 0) {
        return { parent: data, keyField: field };
    }

    // 遍历父路径，补全 null/undefined
    let current = data;
    for (const k of parentPath) {
        if (current[k] == null) { // 包括 null 和 undefined
            current[k] = {};
        }
        current = current[k];
    }

    return { parent: current, keyField: field };
}