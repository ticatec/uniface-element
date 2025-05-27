<script lang="ts">

    import type {LazyLoader, NodeVisibleFun, OnNodeSelectionChange} from "./Types";
    import iconLoading from "../assets/loading.gif"
    import utils from "$lib/common/utils";
    import type {OnContextMenu} from "$lib/context-menu/ContextMenuItem";
    import type {CheckIsDirectory, GetText, TreeNode} from "$lib/lib/TreeNodes";

    export let node: TreeNode<any>;
    export let textField: string | GetText<any>;
    export let lazyLoader: LazyLoader | null;
    export let activeNode: any;
    export let isVisible: NodeVisibleFun;
    export let onContextMenu: OnContextMenu;
    export let onNodeSelectionChange: OnNodeSelectionChange;

    export let checkIsDirectory: CheckIsDirectory<TreeNode<any>>;

    let loading: boolean = false;

    const isDirectory = () => {
        console.log('检测目录函数', checkIsDirectory);
        return lazyLoader == null ? checkIsDirectory?.(node) : lazyLoader.isBranch(node);
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
            if (isDirectory()) {
                if (!node.children) {
                    node.expand = false;
                    await loadChildren();
                }
                node.expand = !node.expand;
            }
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


    const handleContextMenu = (event: MouseEvent) => {
        onContextMenu?.(event, node);
    }

</script>


{#if isVisible == null || isVisible(node)}
    <div class="tree-node" class:expanded={node.expand}>
        <div class="node-item" class:selected={activeNode===node} on:click={handleNodeClick} aria-hidden="true"
             on:contextmenu={handleContextMenu}>
            <div class="item-icon">
                {#if isDirectory()}
                    {#if loading}
                        <img alt="" style="cursor: default" src={iconLoading}/>
                    {:else }
                        <span aria-hidden="true" on:click={handleNodeIconClick}>{node.expand ? '▼' : '▶'}</span>
                    {/if}
                {/if}
            </div>
            <span class="item-text">{typeof textField == "string" ? node.item[textField] : textField(node.item)}</span>
        </div>
        {#if node.expand && node.children}
            <div class="sub-tree">
                {#each node.children as child}
                    <svelte:self node={child} {lazyLoader} {onContextMenu} {textField} {checkIsDirectory}
                                 {isVisible} {activeNode} {onNodeSelectionChange}/>
                {/each}
            </div>
        {/if}
    </div>
{/if}