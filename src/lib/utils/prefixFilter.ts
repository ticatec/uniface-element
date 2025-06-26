const prefixFilter = (attrs: any, prefix: string, excludes: Array<string> = []): any => {
    let obj = {};
    let len = prefix.length;
    for (let attr in attrs) {
        if (attr.startsWith(prefix) && attr.length > len) {
            let newAttr:string = attr.substring(len)
            if (excludes.indexOf(newAttr) < 0) {
                // @ts-ignore
                obj[newAttr] = attrs[attr];
            }
        }
    }
    return obj;
}


export default prefixFilter;