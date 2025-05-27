export function compareNumber(a: number, b: number) {
    return a === b ? 0 : a > b ? 1 : -1;
}



export type TreeNode<T> = {
    item: T;
    expand?: boolean;
    children?: TreeNode<T>[];
};

export type CheckIsRoot<T> = (data: T) => boolean;

export type CompareFun<T> = (o1: T, o2: T) => number | undefined;

export type GetText<T> = (data: T) => string;

export type CheckIsDirectory<T> = (node: TreeNode<T>) => boolean;

export interface TreeNodeOptions<T> {
    keyField?: keyof T;
    textField?: keyof T | GetText<T>;
    parentKeyField?: keyof T;
    checkIsRoot: CheckIsRoot<T>;
    checkIsDirectory?: CheckIsDirectory<T>
    compareFun?: CompareFun<T>;
    expendDepth?: number; //展开的深度，默认为0
}

export class CommonTreeNodes<T> {
    protected readonly checkIsRoot: CheckIsRoot<T>;
    protected readonly keyField: keyof T;
    protected readonly parentKeyField: keyof T;
    protected readonly textField: keyof T | GetText<T>;
    protected readonly checkIsDirectory: CheckIsDirectory<T> | undefined;
    protected nodeMap: Map<any, TreeNode<T>>;
    protected compareFun: any | undefined;
    protected expendDepth: number;
    protected _nodes: Array<TreeNode<T>> = [];

    constructor(options: TreeNodeOptions<T>) {
        this.checkIsRoot = options.checkIsRoot;
        this.compareFun = options.compareFun;
        this.keyField = options.keyField ?? 'id' as keyof T;
        this.textField = options.textField ?? 'text' as keyof T;
        this.parentKeyField = options.parentKeyField ?? 'parentId' as keyof T;
        this.nodeMap = new Map<any, TreeNode<T>>();
        this.expendDepth = options.expendDepth??1;
        this.checkIsDirectory = options.checkIsDirectory;
    }

    setData(list: Array<T>) {
        this.nodeMap = new Map<any, TreeNode<T>>();
        this._nodes = [];

        // 初始化每个节点
        for (const item of list) {
            const node: TreeNode<T> = {
                item,
                expand: false
            };
            const key = item[this.keyField];
            this.nodeMap.set(key, node);
        }

        for (const item of list) {
            const node = this.nodeMap.get(item[this.keyField]);
            if (node) {
                this.appendNode(node);
            }
        }

        if (this.expendDepth > 1) {
            this.setExpandForDepth(this.nodes, 0);
        }
    }


    /**
     * 获取节点
     */
    get nodes(): Array<TreeNode<T>> {
        return this._nodes;
    }



    /**
     * 设置展开层级
     * @param nodes
     * @param currentLevel
     * @protected
     */
    protected setExpandForDepth(nodes: TreeNode<T>[], currentLevel: number) {
        for (const node of nodes) {
            node.expand = currentLevel < this.expendDepth;
            if (node.children) {
                this.setExpandForDepth(node.children, currentLevel + 1);
            }
        }
    }

    /**
     * 添加一个节点
     * @param node
     * @param doSort
     * @protected
     */
    protected appendNode(node: TreeNode<T>, doSort: boolean = false) {
        let item = node.item;
        const parentKey = item[this.parentKeyField];
        if (this.checkIsRoot(item)) {  //|| !this.nodeMap.has(parentKey)
            this._nodes.push(node);
            this._nodes.sort(this.compareFun);
        } else {
            const parentNode = this.nodeMap.get(parentKey);
            if (parentNode) {
                parentNode.expand = true;
                parentNode.children = [...(parentNode.children ?? []), node];
                if (doSort && this.compareFun) {
                    parentNode.children = parentNode.children.sort(this.compareFun);
                }
            } else {
                console.warn('Ignore the isolate item:', item);
            }
        }
    }
}


export default class TreeNodes<T> extends CommonTreeNodes<T> {

    /**
     * 获取展开的展示列表
     */
    getHierarchyList(): Array<TreeNode<T>> {
        return this.collectExpandedNodes(this._nodes);
    }

    /**
     * 给treeview设定数据，根据数据构建树结构
     * @param list
     */


    /**
     * 增加一个新节点
     * @param item
     */
    append(item: T) {
        const node: TreeNode<T> = {
            item,
            expand: true
        };
        this.appendNode(node, true);
        this.nodeMap.set(item[this.keyField], node);
    }

    /**
     * 替换一个节点的数据
     * @param item
     */
    replace(item: T) {
        let node = this.nodeMap.get(item[this.keyField]);
        if (node) {
            node.item = item;
            let parent = this.nodeMap.get(item[this.parentKeyField]);
            if (parent && parent.children && parent.children.length > 0) {
                parent.children = parent.children.sort(this.compareFun);
            } else {
                this._nodes.sort(this.compareFun);
            }
        }
    }

    remove(item: T) {
        let idKey = item[this.keyField];
        let node = this.nodeMap.get(idKey);
        if (node) {
            let parent = this.nodeMap.get(node.item[this.parentKeyField]);
            this.nodeMap.delete(idKey);
            if (parent) {
                if (parent.children) {
                    let pos = parent.children.findIndex(el => el.item[this.keyField] == idKey);
                    if (pos > -1) {
                        parent.children.splice(pos, 1);
                    }
                }
            } else {
                let pos = this._nodes.findIndex(el => el.item[this.keyField] == idKey);
                if (pos > -1) {
                    this._nodes.splice(pos, 1);
                }
            }

        }
    }

    /**
     * 将一个节点移动到另外一个节点下
     * @param item
     * @param parentId
     */
    moveTo(item: T, parentId: string): void {
        let newParent = this.nodeMap.get(parentId);
        let node = this.nodeMap.get(item[this.keyField]);
        let currentParent = this.nodeMap.get(item[this.parentKeyField]);
        if (newParent && node && currentParent && currentParent.children) {
            let pos = currentParent.children.findIndex(el => el.item[this.keyField] == item[this.keyField]);
            if (pos > -1) {
                currentParent.children.splice(pos, 1);
            }
            newParent.children = [...(newParent.children ?? []), node];
            if (this.compareFun) {
                newParent.children = newParent.children.sort(this.compareFun);
            }
        }
    }

    /**
     * 获取除指定节点外的其他节点
     * @param exclusiveData
     */
    extractDirectories(exclusiveData: T) {
        const getNodes = (nodes: Array<TreeNode<T>>, item: T): Array<TreeNode<T>> => {
            let list: Array<TreeNode<T>> = [];
            for (let node of nodes) {
                if (node.item != item && this.checkIsDirectory?.(node)) {
                    list.push({
                        item: node.item,
                        expand: true,
                        children: getNodes(node.children??[], item)
                    });
                }
            }
            return list;
        }

        return getNodes(this.nodes, exclusiveData);
    }

    /**
     * 获取所有展开的节点
     * @param tree
     * @private
     */
    private collectExpandedNodes<T>(tree: TreeNode<T>[]): TreeNode<T>[] {
        const result: TreeNode<T>[] = [];

        function traverse(nodes: TreeNode<T>[]) {
            for (const node of nodes) {
                result.push(node);
                if (node.expand && node.children) {
                    traverse(node.children);
                }
            }
        }

        traverse(tree);
        return result;
    }

}