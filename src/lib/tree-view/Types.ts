import type {CheckIsDirectory, TreeNode} from "$lib/lib/TreeNodes";

export type OnNodeSelectionChange = (node: TreeNode<any>) => Promise<boolean>;



/**
 * 节点是否显示
 */
export type NodeVisibleFun = (node:TreeNode<any>) => boolean;


/**
 * 加载子节点
 */
export type LoadChildrenFun = (item: TreeNode<any>) => Promise<Array<TreeNode<any>>>;

/**
 * 按需数据加载器
 */
export interface LazyLoader {

    /**
     * 检查是否是枝节点
     */
    isBranch: CheckIsDirectory<any>;

    /**
     * 数据加载器
     */
    load: LoadChildrenFun;

}

