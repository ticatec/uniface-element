<script lang="ts">
    import type {MouseClickHandler} from "$lib/common/MouseClickHandler";

    export let title: string = "";
    export let isOpen = false;
    export let onClick: MouseClickHandler = null as unknown as MouseClickHandler;
    export let header: any = null;

    export let exclusive: boolean;

</script>

<style>


</style>

<div class="accordion">
    <div class="header" aria-hidden="true" on:click={onClick}>
        {#if header}
            <svelte:component this={header} {title} {isOpen}/>  <!-- TODO 自定义每个条目的标题 -->
        {:else}
            <div style="flex: 1 1 auto; overflow: hidden; white-space: nowrap; text-overflow: ellipsis">
                <span>{title}</span>
            </div>
            {#if exclusive}
                {#if isOpen}
                    <div style="flex: 0 0 auto;">
                        <i class="icon_google_folder_open"></i>
                    </div>
                {/if}
            {:else}
                <div style="flex: 0 0 auto;">
                    <i class="{isOpen ? 'icon_google_keyboard_arrow_up' : 'icon_google_keyboard_arrow_down'}"></i>
                </div>
            {/if}
        {/if}
    </div>
    {#if isOpen}
        <div class="content">
            <slot></slot>
        </div>
    {/if}
</div>