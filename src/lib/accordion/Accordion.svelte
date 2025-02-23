<script lang="ts">
    import type {MouseClickHandler} from "$lib/common/MouseClickHandler";

    export let title: string = "";
    export let isOpen = false;
    export let onClick: MouseClickHandler = null as unknown as MouseClickHandler;
    export let header: any = null;

</script>

<style>


</style>

<div class="accordion">
    <div class="header" aria-hidden="true" on:click={onClick}>
        {#if header}
            <svelte:component this={header} {title} {isOpen}/>
        {:else}
            <div style="flex: 0 0 auto; padding-right: 8px">
                <i class="{isOpen ? 'uniface-icon-chevron-down' : 'uniface-icon-chevron-right'}"></i>
            </div>
            <div style="flex: 1 1 auto; overflow: hidden; white-space: nowrap; text-overflow: ellipsis">
                <span>{title}</span>
            </div>
        {/if}
    </div>
    {#if isOpen}
        <div class="content">
            <slot></slot>
        </div>
    {/if}
</div>