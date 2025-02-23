/**
 * 根据字段名获取对于的值，支持"."嵌套获取
 * @param data
 * @param field
 */
const extractFieldValue = (data: any, field?: string): any => {
    let v = data;
    if (field != null) {
        let attrs = field.split(".");
        for (let attr of attrs) {
            v = v == null ? null : v[attr]
        }
    }
    return v;

}
export default {
    extractFieldValue
}