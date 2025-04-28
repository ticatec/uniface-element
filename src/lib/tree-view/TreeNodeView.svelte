<script lang="ts">
    import type TreeNode from "./TreeNode";
    import type {LazyLoader, NodeVisibleFun, OnNodeSelectionChange} from "./TreeNode";
    import iconLoading from "../assets/loading.gif"
    import utils from "$lib/common/utils";
    import type {OnContextMenu} from "$lib/context-menu/ContextMenuItem";

    export let node: TreeNode;
    export let lazyLoader: LazyLoader | null;
    export let activeNode: any;
    export let isVisible: NodeVisibleFun;
    export let level: number = 1;
    export let dispLevels: number = 1;
    export let onContextMenu: OnContextMenu;
    export let onNodeSelectionChange: OnNodeSelectionChange;


    let expanded: boolean = dispLevels <= level;
    let loading: boolean = false;

    const isBranch = () => {
        return lazyLoader == null ? (node.children && node.children.length > 0) : lazyLoader.isBranch(node);
    }

    const loadChildren = async () => {
        if (node.children == null && lazyLoader != null) {
            try {
                loading = true;
                node.children = await lazyLoader.load(node);
            } finally {
                loading = false;
            }
        }
    }

    const handleNodeIconClick = async (e: MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (respond) {
            respond = false;
            if (isBranch()) {
                expanded = !expanded;
                await loadChildren();
            }
            dispLevels = expanded ? level + 1 : level;
            await utils.sleep(0.2);
            respond = true;
        }
    }

    let respond: boolean = true;
    const handleNodeClick = async (e: MouseEvent) => {
        if (respond) {
            respond = false;
            await onNodeSelectionChange(node);
            await utils.sleep(0.2);
            respond = true;
        }
    }

    $: expanded = dispLevels > level;

    const handleContextMenu = (event: MouseEvent) => {
        onContextMenu?.(event, node);
    }

</script>


{#if isVisible == null || isVisible(node)}
    <div class="tree-node" class:expanded>
        <div class="node-item" class:selected={activeNode===node} on:click={handleNodeClick} aria-hidden="true"
             on:contextmenu={handleContextMenu}>
            <div class="item-icon">
                {#if isBranch()}
                    {#if loading}
                        <img alt="" style="cursor: default" src={iconLoading}/>
                    {:else }
                        <span aria-hidden="true" on:click={handleNodeIconClick}>{expanded ? '▼' : '▶'}</span>
                    {/if}
                {/if}
            </div>
            <span class="item-text">{node.text}</span>
        </div>
        {#if expanded && node.children}
            <div class="sub-tree">
                {#each node.children as child}
                    <svelte:self node={child} {lazyLoader} {onContextMenu}
                                 {dispLevels} {isVisible} level={level+1} {activeNode} {onNodeSelectionChange}/>
                {/each}
            </div>
        {/if}
    </div>
{/if}