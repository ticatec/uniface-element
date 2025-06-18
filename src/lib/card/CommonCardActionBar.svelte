<script lang="ts">
    import type CardAction from "./CardAction";
    import utils from "$lib/common/utils";

    export let actions: Array<CardAction>;
    export let color: string | null = null;
    export let data: any;

    let clickEnable = true;

    const handleActionClick = (action: CardAction) => async (e: MouseEvent) => {
        if (clickEnable && !action.disabled) {
            clickEnable = false;
            action.callback?.(data);
            await utils.sleep(0.5);
            clickEnable = true;
        }
    }

    const showHint = (action: CardAction) => (e: MouseEvent) => {
        if (!action.disabled && action.hint) {
            window.Hint.show(e.target as Element, action.hint, e.x, e.y);
        }
    }

    $: fontColor = color ? `color: ${color}` : '';

</script>

<div class="card-action-bar simple" style="{fontColor}">
    {#each actions as action}
        <div class:disabled={action.disabled} class="action-item">
            {#if action.icon}
                <i class={action.icon} aria-hidden="true" on:click={handleActionClick(action)} on:mouseenter={showHint(action)}></i>
            {:else if action.img}
                <img class="card-action-img" alt="" src={action.img} aria-hidden="true" on:click={handleActionClick(action)}
                     on:mouseenter={showHint(action)}/>
            {/if}
        </div>
    {/each}
</div>