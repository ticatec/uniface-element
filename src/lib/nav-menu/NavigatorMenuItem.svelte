<script lang="ts">

    import {slide} from "svelte/transition";
    import type MenuItem from "./MenuItem";
    import type {OnMenuClick} from "./MenuItem";
    import i18n from "$lib/i18n/i18nContext";

    export let item: MenuItem;
    export let expand: boolean = false;

    export let onMenuItemClick: OnMenuClick;


    let expandable: boolean;

    $: {
        expandable = item.children != null && item.children.length > 0
    }

    let respond: boolean = true;
    const handleMenuItemClick = () => {
        if (respond) {
            respond = false;
            setTimeout(() => respond = true, 200);
            if (expandable) {
                item.expand = !item.expand;
                expand = !expand;
            } else {
                onMenuItemClick?.(item);
            }
        }

    }

</script>
<li class:expandable class:fold={!expand}>
    <span on:click={handleMenuItemClick} aria-hidden="true">{item.key ? i18n.getText(item.key, item.text) : item.text}</span>
    {#if item.children}
        {#if expand}
            <ul transition:slide={{duration: 200}}>
                {#each item.children as el}
                    <svelte:self item={el} {onMenuItemClick}/>
                {/each}
            </ul>
        {/if}
    {/if}
</li>