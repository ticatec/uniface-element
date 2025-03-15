<script lang="ts">
    import Split from "$lib/split";
    import {onMount} from "svelte";

    export let width: string = '100%';
    export let height: string = '100%';

    export let leftWidth: string | null = null;

    export let rightWidth: string | null = null;

    export let leftMin: string | null = null;

    export let leftMax: string | null = null;

    export let rightMin: string | null = null;

    export let rightMax: string | null = null;

    export let leftResize: boolean = false;

    export let rightResize: boolean = false;

    $: colWidth = $$slots.right ? '25%' : '50%'

    let leftPanel: any;
    let rightPanel: any;

    const generateStyle = (attr: string, v: string | null): string => {
        return v ? `${attr}: ${v};` : ''
    }

    let leftStyle: string;
    let rightStyle: string;

    onMount(()=> {
        leftStyle = `${generateStyle('min-width', leftMin)} ${generateStyle('max-width', leftMax)} ${generateStyle('width', leftWidth ?? colWidth)}`;
        rightStyle = `${generateStyle('min-width', rightMin)} ${generateStyle('max-width', rightMax)} ${generateStyle('width', rightWidth ?? colWidth)}`;
    })


</script>
<div style="display: flex; flex-direction: row;  flex-wrap: nowrap; width: {width}; height: {height}">
    <div bind:this={leftPanel} style="flex: 0 0 auto; {leftStyle}">
        <slot name="left"></slot>
    </div>
    {#if leftResize}
        <Split bindingPanel={leftPanel}/>
    {/if}
    <div style="flex: 1 1 auto;">
        <slot/>
    </div>
    {#if $$slots.right}
        {#if rightResize}
            <Split bindingPanel={rightPanel} reverse/>
        {/if}
        <div bind:this={rightPanel} style="flex: 0 0 auto; {rightStyle}">
            <slot name="right"/>
        </div>
    {/if}
</div>
