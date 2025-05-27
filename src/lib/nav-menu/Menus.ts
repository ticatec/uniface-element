import {CommonTreeNodes, type TreeNode} from "$lib/lib/TreeNodes";
import type MenuItem from "$lib/nav-menu/MenuItem";


export default class Menus extends CommonTreeNodes<MenuItem> {

    /**
     * 删除所有没有子节点的目录类型节点
     */
    removeEmptyDirectory(){
        const removeRecursive = (nodes: TreeNode<MenuItem>[]) => {
            for (let i = nodes.length - 1; i >= 0; i--) {
                const node = nodes[i];
                if (node.children && node.children.length > 0) {
                    removeRecursive(node.children); // 先处理子节点
                } else {
                    if (this.checkIsDirectory?.(node)) {
                        nodes.splice(i, 1); // 从父节点的 children 中移除
                        this.nodeMap.delete(node.item[this.keyField]); // 从 nodeMap 中移除
                    }
                }
            }
        };
        removeRecursive(this._nodes);
    }

}

