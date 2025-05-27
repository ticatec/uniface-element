<script lang="ts">


    import type {LazyLoader, NodeVisibleFun, OnNodeSelectionChange} from "./Types";
    import TreeNodeView from "./TreeNodeView.svelte";
    import type {OnContextMenu} from "$lib/context-menu/ContextMenuItem";
    import type {CheckIsDirectory, GetText, TreeNode} from "$lib/lib/TreeNodes";


    export let nodes: Array<TreeNode<any>>;
    export let textField: string | GetText<any>;
    export let style: string = "";
    export let lazyLoader: LazyLoader | null = null;
    export let activeNode: any = null;
    export {className as class};
    export let isVisible: NodeVisibleFun = null as unknown as NodeVisibleFun;
    export let onSelectionChange: OnNodeSelectionChange = null as unknown as OnNodeSelectionChange;
    export let onContextMenu: OnContextMenu = null as unknown as OnContextMenu;
    export let checkIsDirectory: CheckIsDirectory<any>;
    let className: string = "";

    const onNodeSelectionChange = async (node: TreeNode<any>): Promise<boolean> => {
        let accept: boolean = (await onSelectionChange?.(node));
        accept = accept == null ? true : accept;
        if (accept == null || accept == true) {
            activeNode = node;
        }
        return accept;
    }

</script>
<div class="uniface-tree-view {className}" {style}>
    <div>
        {#each nodes as node}
            <TreeNodeView {activeNode} {node} {textField} {lazyLoader} {onNodeSelectionChange} {isVisible} {checkIsDirectory} {onContextMenu}/>
        {/each}
    </div>
</div>