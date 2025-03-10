<script lang="ts">

    import type {ButtonActions} from "./ButtonAction";
    import Button from "$lib/button/Button.svelte";
    import Separator from "$lib/separator/Separator.svelte";

    export let buttons: ButtonActions = [];
    export let style: string = '';
    export let gap: number = 8;


</script>

<div class="uniface-action-bar" style="gap: {gap}px; {style}">
    {#each (buttons ?? []) as button}
        {#if button}
            <Button label={button.label} icon={button.icon} disabled={button.disabled===true} type={button.type} onClick={button.handler}/>
        {:else }
            <Separator height="24px"/>
        {/if}
    {:else }
        <slot></slot>
    {/each}
</div>
