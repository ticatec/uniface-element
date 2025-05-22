export function compareNumber(a: number, b: number) {
    return a === b ? 0 : a > b ? 1 : -1;
}

export type TreeNode<T> = {
    item: T;
    expand: boolean;
    children?: TreeNode<T>[];
};

export type CheckIsRoot<T> = (data: T) => boolean;

export type CompareFun<T> = (o1: T, o2: T) => number | undefined;

export type GetText<T> = (data: T) => string;

export interface TreeNodeOptions<T> {
    keyField?: keyof T;
    textField?: keyof T | GetText<T>;
    parentKeyField?: keyof T;
    checkIsRoot: CheckIsRoot<T>;
    compareFun: CompareFun<T>;
    expendDeep?: number; //展开的深度
}


export default class TreeNodes<T> {

    protected readonly checkIsRoot: CheckIsRoot<T>;
    protected readonly keyField: keyof T;
    protected readonly parentKeyField: keyof T;
    protected readonly textField: keyof T | GetText<T>;
    protected nodeMap: Map<any, TreeNode<T>>;
    protected compareFun: any;
    protected expendDeep: number;
    #nodes: Array<TreeNode<T>> = [];

    constructor(options: TreeNodeOptions<T>) {
        this.checkIsRoot = options.checkIsRoot;
        this.compareFun = options.compareFun;
        this.keyField = options.keyField ?? 'id' as keyof T;
        this.textField = options.textField ?? 'text' as keyof T;
        this.parentKeyField = options.parentKeyField ?? 'parentId' as keyof T;
        this.nodeMap = new Map<any, TreeNode<T>>();
        this.expendDeep = options.expendDeep??999;
    }

    setData(list: Array<T>) {
        this.nodeMap = new Map<any, TreeNode<T>>();
        this.#nodes = [];

        // 初始化每个节点
        for (const item of list) {
            const node: TreeNode<T> = {
                item,
                expand: true
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
    }


    private appendNode(node: TreeNode<T>, doSort: boolean = false) {
        let item = node.item;
        const parentKey = item[this.parentKeyField];
        if (this.checkIsRoot(item) || !this.nodeMap.has(parentKey)) {
            this.#nodes.push(node);
        } else {
            const parentNode = this.nodeMap.get(parentKey);
            if (parentNode) {
                parentNode.expand = true;
                parentNode.children = [...(parentNode.children ?? []), node];
                if (doSort && this.compareFun) {
                    parentNode.children = parentNode.children.sort(this.compareFun);
                }
            }
        }
    }

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


    /**
     * 获取展开的展示列表
     */
    getHierarchyList(): Array<TreeNode<T>> {
        return this.collectExpandedNodes(this.#nodes);
    }

    /**
     * 获取节点
     */
    get nodes(): Array<TreeNode<T>> {
        return this.#nodes;
    }


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
            }
        }
    }

    remove(item: T) {
        let idKey = item[this.keyField];
        let node = this.nodeMap.get(idKey);
        if (node) {
            let parent = this.nodeMap.get(node.item[this.parentKeyField]);
            this.nodeMap.delete(idKey);
            if (parent && parent.children) {
                let pos = parent.children.findIndex(el => el.item[this.keyField] == idKey);
                if (pos > -1) {
                    parent.children.splice(pos, 1);
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

    private extractChildrenDirectories(node: TreeNode<T>, exclusiveValue: any): TreeNode<T> | undefined {
        if (node.children && node.item[this.keyField] != exclusiveValue) {
            let newNode: TreeNode<T> = {
                item: node.item,
                expand: true,
                children: []
            }
            for (let childNode of node.children) {
                let ncNode = this.extractChildrenDirectories(childNode, exclusiveValue);
                if (ncNode) {
                    newNode.children?.push(ncNode);
                }
            }
            return newNode;
        } else {
            return;
        }
    }

    extractDirectories(exclusiveValue: any) {
        let dirNodes: Array<TreeNode<T>> = [];
        for (let node of this.nodes) {
            let newNode = this.extractChildrenDirectories(node, exclusiveValue);
            if (newNode) {
                dirNodes.push(newNode)
            }
        }
        return dirNodes;
    }
}