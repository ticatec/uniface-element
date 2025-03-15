<script lang="ts">
    import Split from "$lib/split";
    import {onMount} from "svelte";

    export let width: string = '100%';
    export let height: string = '100%';

    export let topHeight: string | null = null;

    export let bottomHeight: string | null = null;

    export let topMin: string | null = null;

    export let topMax: string | null = null;

    export let bottomMin: string | null = null;

    export let bottomMax: string | null = null;

    export let topResize: boolean = false;

    export let bottomResize: boolean = false;

    $: rowHeight = $$slots.bottom ? '25%' : '50%'

    let topPanel: any;
    let bottomPanel: any;

    const generateStyle = (attr: string, v: string | null): string => {
        return v ? `${attr}: ${v};` : ''
    }

    let topStyle: string = '';
    let bottomStyle: string = '';

    onMount(() => {
        topStyle = `${generateStyle('min-height', topMin)} ${generateStyle('max-height', topMax)} ${generateStyle('height', topHeight ?? rowHeight)}`;
        bottomStyle = `${generateStyle('min-height', bottomMin)} ${generateStyle('max-height', bottomMax)} ${generateStyle('height', bottomHeight ?? rowHeight)}`;
    })


</script>
<div style="display: flex; flex-direction: column;  flex-wrap: nowrap; width: {width}; height: {height}">
    <div bind:this={topPanel} style="flex: 0 0 auto; {topStyle}">
        <slot name="top"></slot>
    </div>
    {#if topResize}
        <Split bindingPanel={topPanel} direction="horizontal"/>
    {/if}
    <div style="flex: 1 1 auto;">
        <slot/>
    </div>
    {#if $$slots.bottom}
        {#if bottomResize}
            <Split bindingPanel={bottomPanel} reverse direction="horizontal"/>
        {/if}
        <div bind:this={bottomPanel} style="flex: 0 0 auto; {bottomStyle}">
            <slot name="bottom"/>
        </div>
    {/if}
</div>
