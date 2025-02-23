<script lang="ts">

    import utils from "$lib/common/utils";

    export let name: string = null as unknown as string;
    export let clickable: boolean = false;
    export let onClick: (event: MouseEvent) => void;
    export let style: string = '';
    export {className as class};

    let tabindex: string = '';
    let className: string = '';
    let respClick: boolean = true;

    const handleClickEvent = async (e: MouseEvent) => {
        if (clickable && respClick) {
            respClick = false;
            onClick?.(e);
            await utils.sleep(0.2);
            respClick = true;
        }
    }



</script>
<div class="uniface-icon {className}" class:clickable {style} aria-hidden="true" on:click={handleClickEvent}>
    {#if name}
        <i class={name}></i>
    {:else }
        <slot></slot>
    {/if}
</div>
