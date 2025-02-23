<script lang="ts">
    import type MenuItem from "./MenuItem";
    import {createEventDispatcher} from "svelte";
    import NavigatorMenuItem from "./NavigatorMenuItem.svelte";

    export let menuItems:Array<MenuItem>;
    export let style:string = '';
    export let header$style: string='';

    const dispatch = createEventDispatcher();

    const handleMenuItemClick = (e) => {
        let menuItem = e.detail;
        console.log('选中菜单：', menuItem);
        dispatch('menuClick', menuItem)
    }

</script>


<div class="uniface-navigator-menu-panel"  {style}>
    {#if $$slots.header}
        <div style={header$style} class="menu-panel-header">
            <slot name="header"></slot>
        </div>
    {/if}
    <div class="menu-panel-content" style="">
        {#if menuItems && menuItems.length > 0}
            <ul>
                {#each menuItems as item}
                    <NavigatorMenuItem {item} on:menuClick={handleMenuItemClick} expand={item.expand}/>
                {/each}
            </ul>
        {/if}
    </div>
</div>
