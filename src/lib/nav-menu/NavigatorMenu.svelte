<script lang="ts">
    import type MenuItem from "./MenuItem";
    import type {OnMenuClick} from "./MenuItem";
    import NavigatorMenuItem from "./NavigatorMenuItem.svelte";
    import type {GetText} from "$lib/lib/TreeNodes";

    export let menuItems: Array<MenuItem>;
    export let style: string = '';

    export let textField: string | GetText<MenuItem>;

    export let onItemClick: OnMenuClick;



</script>


<div class="uniface-navigator-menu-panel" {style}>
    {#if menuItems && menuItems.length > 0}
        <ul>
            {#each menuItems as menu}
                <NavigatorMenuItem {menu} onMenuItemClick={onItemClick} {textField}/>
            {/each}
        </ul>
    {/if}
</div>
