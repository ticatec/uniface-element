/**
 * 拷贝属性，接收所有input$开头和预定义的属性
 * @param obj
 * @param acceptKeys
 */
export const acceptProps = (obj: any, acceptKeys: Array<string>): any => {
    if (obj == null) {
        return {}
    }
    let result: any = {};
    for (let attr in obj) {
        if (attr.startsWith('input$')) {
            result[attr]=obj[attr]
        } else if (acceptKeys.indexOf(attr) > -1) {
            result[attr]=obj[attr]
        }
    }
    return result;
}