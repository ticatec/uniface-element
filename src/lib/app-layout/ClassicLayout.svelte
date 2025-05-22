<script lang="ts">

    import Split from "$lib/split";

    export let headerHeight: string = "48px";
    export let sidebarWidth: string = '300px';
    export let statusHeight: string = "22px";

    export let rightBarWidth: string = '240px';

    export let sidebarResize: boolean = false;
    export let sidebarMaxWidth: string | null = null;
    export let sidebarMinWidth: string | null = null;

    export let rightBarResize: boolean = false;
    export let rightBarMaxWidth: string | null = null;
    export let rightBarMinWidth: string | null = null;

    let sidebar: any;

    let maxWidth: string;
    let minWidth: string;

    let rightBar: any;
    let rightMaxWidth: string;
    let rightMinWidth: string;

    $: if (sidebarResize && sidebarMaxWidth) {
        maxWidth = `max-width: ${sidebarMaxWidth};`
    }

    $: if (sidebarResize && sidebarMinWidth) {
        minWidth = `min-width: ${sidebarMinWidth};`
    }

    $: if (rightBarResize && rightBarMaxWidth) {
        rightMaxWidth = `max-width: ${rightBarMaxWidth};`
    }

    $: if (rightBarResize && rightBarMinWidth) {
        rightMinWidth = `min-width: ${rightBarMinWidth};`
    }


</script>

<div style="width: 100%; height: 100%; box-sizing: border-box; display: flex; flex-direction: column; position: relative">
    <div style="height: 100%; flex: 0 0 auto; position: relative; height: {headerHeight}">
        <slot name="header"></slot>
    </div>
    <div style="height: 100%; flex: 1 1 auto; overflow: hidden; display: flex; flex-direction: row; position: relative">
        {#if sidebar}
            <div bind:this={sidebar} style="width: 100%; flex: 0 0 auto; overflow: auto; width: {sidebarWidth}; {minWidth} {maxWidth}">
                <slot name="sidebar"></slot>
            </div>
        {/if}
        {#if sidebarResize}
            <Split direction="vertical" bindingPanel={sidebar}/>
        {/if}
        <div style="width: 100%; flex: 1 1 auto; overflow: auto">
            <slot></slot>
        </div>
        {#if $$slots['right-sidebar']}
            {#if sidebarResize}
                <Split direction="vertical" bindingPanel={rightBar} reverse/>
            {/if}
            <div bind:this={rightBar}
                 style="width: 100%; flex: 0 0 auto; overflow: auto; width: {rightBarWidth}; {rightMinWidth} {rightMaxWidth}">
                <slot name="right-sidebar"></slot>
            </div>
        {/if}
    </div>
    {#if $$slots['bottom']}
        <div style="height: 100%; flex: 0 0 auto; position:relative; height: {statusHeight}">
            <slot name="bottom"></slot>
        </div>
    {/if}
</div>