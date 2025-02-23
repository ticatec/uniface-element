
export type OnNodeSelectionChange = (node: TreeNode) => Promise<boolean>;

export default interface TreeNode {
    /**
     * 节点的值
     */
    value: string;
    /**
     * 节点的文字
     */
    text: string;
    /**
     * 对应节点的数据
     */
    data?: any;
    /**
     * 子节点
     */
    children?: Array<TreeNode> | null;
    /**
     * 父节点
     */
    parent?: TreeNode | null;

    /**
     * 是否是叶节点
     */
    isLeaf?: boolean;
}


/**
 * 节点是否显示
 */
export type NodeVisibleFun = (node:TreeNode) => boolean;

/**
 * 检查当前是否是叶节点
 */
export type CheckBranchFun = (item: TreeNode) => boolean;

/**
 * 加载子节点
 */
export type LoadChildrenFun = (item: TreeNode) => Promise<Array<TreeNode>>;

/**
 * 按需数据加载器
 */
export interface LazyLoader {

    /**
     * 检查是否是枝节点
     */
    isBranch: CheckBranchFun;

    /**
     * 数据加载器
     */
    load: LoadChildrenFun;

}