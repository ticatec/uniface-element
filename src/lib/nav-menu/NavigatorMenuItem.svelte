<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import {slide} from "svelte/transition";
    import type MenuItem from "./MenuItem";

    export let item:MenuItem;
    export let expand: boolean = false;

    let dispatch = createEventDispatcher();
    let expandable: boolean;

    $: {
        expandable = item.children != null && item.children.length > 0
    }

    let respond: boolean = true;
    const handleMenuItemClick = () => {
        if (respond) {
            respond = false;
            setTimeout(()=>respond=true, 200);
            if (expandable) {
                item.expand = !item.expand;
                expand = !expand;
            } else {
                dispatch('menuClick', item);
            }
        }

    }

</script>
<li class:expandable class:fold={!expand}>
    <span on:click={handleMenuItemClick}>{item.text}</span>
    {#if expand}
        <ul transition:slide={{duration: 200}}>
            {#each item.children as item}
                <svelte:self {item} on:menuClick/>
            {/each}
        </ul>
    {/if}
</li>