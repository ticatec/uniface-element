import type TreeNode from "./TreeNode";
import type {NodeLevelCompare, RootDetermine} from "./TreeNode";


/**
 * 将一个数组转换成树状结构
 * @param list 待转换的数组
 * @param idKey 元素的主键
 * @param joinKey 父子间连接字段
 * @param valueField 取值的字段
 * @param textField 显示文字的字段
 * @param isRoot 判断是否是根节点，如果函数不存在，通过连接字段查询，无法获取到父节点就是根节点
 * @param sortFun 比较函数，用于曾经排序
 */
const buildTreeNode = (list: Array<any>, idKey: string, joinKey: string, textField: string, valueField?: string,
                       isRoot?: RootDetermine, sortFun?: NodeLevelCompare): Array<TreeNode> => {
    if (sortFun != null) {
        list = list.sort(sortFun);
    }
    let nodes: Array<TreeNode> = [];
    let map: Map<string, TreeNode> = new Map<string, TreeNode>();
    list.forEach(item => {
        let node: TreeNode = {value: item[valueField ?? idKey], text: item[textField], data: item}
        if (isRoot != null) {
            if (isRoot(item)) {
                nodes.push(node);
                map.set(item[idKey], node);
            } else {
                let parent: any = map.get(item[joinKey]);
                if (parent != null) {
                    parent.children = [...(parent.children??[]), node];
                    node.parent = parent;
                    map.set(item[idKey], node);
                } else {
                    console.warn('Isolated node：', item);
                }
            }
        } else {
            let parent: any = map.get(item[joinKey]);
            if (parent != null) {
                parent.children = [...(parent.children??[]), item];
                node.parent = parent;
                map.set(item[idKey], node);
            } else {
                nodes.push(node);
                map.set(item[idKey], node);
            }
        }
    })
    return nodes;
}


export default {
    buildTreeNode
}