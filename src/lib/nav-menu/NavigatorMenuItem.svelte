<script lang="ts">

    import {slide} from "svelte/transition";
    import type MenuItem from "./MenuItem";
    import type {OnMenuClick} from "./MenuItem";
    import type {GetText} from "$lib/lib/TreeNodes";

    export let menu: MenuItem;
    export let textField: string | GetText<MenuItem>;

    let expand: boolean = menu.expand == true;

    export let onMenuItemClick: OnMenuClick;

    $: expandable = menu.children != null && menu.children.length > 0
    $: menuText = typeof textField == 'string' ? menu.item?.[textField]??'Unknown item' : textField(menu.item);

    let respond: boolean = true;
    const handleMenuItemClick = () => {
        if (respond) {
            respond = false;
            setTimeout(() => respond = true, 200);
            if (expandable) {
                menu.expand = !menu.expand;
                expand = !expand;
            } else {
                onMenuItemClick?.(menu);
            }
        }

    }

</script>
<li class:expandable class:fold={!expand}>
    <span on:click={handleMenuItemClick} aria-hidden="true">{menuText}</span>
    {#if menu.children}
        {#if expand}
            <ul transition:slide={{duration: 200}}>
                {#each menu.children as el}
                    <svelte:self menu={el} {onMenuItemClick} {textField}/>
                {/each}
            </ul>
        {/if}
    {/if}
</li>