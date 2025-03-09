<script lang="ts">
    import type CardAction from "./CardAction";
    import utils from "$lib/common/utils";

    export let actions: Array<CardAction>;


    let clickEnable = true;

    const handleActionClick = (action: CardAction) => async (e: MouseEvent) => {
        if (clickEnable && !action.disabled) {
            clickEnable = false;
            action.callback?.();
            await utils.sleep(0.5);
            clickEnable = true;
        }
    }

</script>

<div class="card-action-bar simple">
    {#each actions as action}
        <div class:disabled={action.disabled} class="action-item">
            <i class={action.icon} aria-hidden="true" on:click={handleActionClick(action)}></i>
        </div>
    {/each}
</div>