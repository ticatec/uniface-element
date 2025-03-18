<script lang="ts">
    import type CardAction from "./CardAction";
    import utils from "$lib/common/utils";

    export let actions: Array<CardAction>;
    export let color: string | null = null;

    let clickEnable = true;

    const handleActionClick = (action: CardAction) => async (e: MouseEvent) => {
        if (clickEnable && !action.disabled) {
            clickEnable = false;
            action.callback?.();
            await utils.sleep(0.5);
            clickEnable = true;
        }
    }

    $: fontColor = color ? `color: ${color}` : '';

</script>

<div class="card-action-bar simple" style="{fontColor}">
    {#each actions as action}
        <div class:disabled={action.disabled} class="action-item">
            {#if action.icon}
                <i class={action.icon} aria-hidden="true" on:click={handleActionClick(action)}></i>
            {:else if action.img}
                <img class="card-action-img" alt="" src={action.img} aria-hidden="true" on:click={handleActionClick(action)}/>
            {/if}
        </div>
    {/each}
</div>