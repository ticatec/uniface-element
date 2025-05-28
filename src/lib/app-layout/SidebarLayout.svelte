<script lang="ts">

    import Split from "$lib/split";

    export let sidebarResize: boolean = false;
    export let headerHeight: string = "48px";
    export let sidebarWidth: string = '300px';
    export let sidebarMaxWidth: string | null = null;
    export let sidebarMinWidth: string | null = null;

    let sidebar: any;
    let maxWidth: string;
    let minWidth: string;

    $: if (sidebarResize && sidebarMaxWidth) {
        maxWidth = `max-width: ${sidebarMaxWidth};`
    }

    $: if (sidebarResize && sidebarMinWidth) {
        minWidth = `min-width: ${sidebarMinWidth};`
    }

</script>

<div style="width: 100%; height: 100%; box-sizing: border-box; display: flex; flex-direction: row">
    {#if $$slots[sidebar]}
        <div bind:this={sidebar}
             style="height: 100%; flex: 0 0 auto; overflow: auto; border-right: 1px solid var(--uniface-plain-border-color, #f0f0f0); width: {sidebarWidth}; {maxWidth} {minWidth}">
            <slot name="sidebar"></slot>
        </div>
        {#if sidebarResize}
            <Split direction="vertical" bindingPanel={sidebar}/>
        {/if}
    {/if}
    <div style="height: 100%; flex: 1 1 auto; overflow: hidden; display: flex; flex-direction: column">
        {#if $$slots['header']}
            <div style="width: 100%; flex: 0 0 auto; overflow: auto; height: {headerHeight}">
                <slot name="header"></slot>
            </div>
        {/if}
        <div style="width: 100%; flex: 1 1 auto; overflow: auto">
            <slot></slot>
        </div>
    </div>
</div>