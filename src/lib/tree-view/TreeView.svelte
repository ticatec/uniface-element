<script lang="ts">

    import type TreeNode from "./TreeNode";
    import type {LazyLoader, NodeVisibleFun, OnNodeSelectionChange} from "./TreeNode";
    import TreeNodeView from "./TreeNodeView.svelte";
    import type {OnContextMenu} from "$lib/context-menu/ContextMenuItem";


    export let nodes: Array<TreeNode>;
    export let style: string = "";
    export let lazyLoader: LazyLoader;
    export let activeNode: any = null;
    export {className as class};
    export let isVisible: NodeVisibleFun = null as unknown as NodeVisibleFun;
    export let onSelectionChange: OnNodeSelectionChange = null as unknown as OnNodeSelectionChange;
    export let onContextMenu: OnContextMenu = null as unknown as OnContextMenu;

    let className: string = "";

    const onNodeSelectionChange = async (node: TreeNode): Promise<boolean> => {
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
            <TreeNodeView {activeNode} {node} {lazyLoader} {isVisible} {onNodeSelectionChange} {onContextMenu}/>
        {/each}
    </div>
</div>