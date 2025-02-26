<script lang="ts">
    import type MenuItem from "./MenuItem";
    import type {OnMenuClick} from "./MenuItem";
    import NavigatorMenuItem from "./NavigatorMenuItem.svelte";

    export let menuItems: Array<MenuItem>;
    export let style: string = '';
    export let onItemClick: OnMenuClick;


</script>


<div class="uniface-navigator-menu-panel" {style}>
    {#if menuItems && menuItems.length > 0}
        <ul>
            {#each menuItems as item}
                <NavigatorMenuItem {item} onMenuItemClick={onItemClick} expand={item.expand}/>
            {/each}
        </ul>
    {/if}
</div>
