import type TreeNode from "./TreeNode";

/**
 *
 * @param data
 * @param keyField
 * @param textField
 * @param parentField
 * @param parentCode
 * @param parent
 */

const convertArrayToTree = (data: Array<any>, keyField: string, textField: string, parentField: string,
                            parentCode: string | null = null, parent: TreeNode | null = null) : Array<TreeNode> => {
    let nodes:Array<TreeNode> = [];
    for (let i = 0; i < data.length; i++) {
        let pCode = data[i][parentField];
        if ((parentCode == null && pCode == null) || ( pCode == parentCode)) {
            let code:string = data[i][keyField];
            let node:TreeNode = {value:code, text: data[i][textField], data:data[i], parent}
            let children = convertArrayToTree(data, keyField, textField, parentField, code, node);
            if (children.length > 0) {
                node.children = children;
            }
            nodes.push(node);
        }
    }
    return nodes;
}

/**
 * 把数组构建成一棵树
 * @param arr
 * @param keyField
 * @param textField
 * @param parentField
 * @param rootParentCode
 */
export const buildTree = (arr: Array<any>, keyField: string, textField: string, parentField: string,
                          rootParentCode: string | null = null): Array<TreeNode> => {
    return convertArrayToTree(arr, keyField, textField, parentField, rootParentCode);
}