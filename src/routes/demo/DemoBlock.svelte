<script lang="ts">

    import Box from "$lib/box"

    export let title: string;
    export let displayText: string | null = null;

    export let style: string = '';
</script>

<Box class="demo-block" {style}>
    <h3>{title}</h3>
    <div class="description">
        <slot name="description"/>
    </div>
    {#if displayText}
        <div class="demo-result">
            <span>Value:&nbsp;&nbsp;</span><span style="font-weight: 600">{displayText}</span>
        </div>
    {/if}
    <slot></slot>
</Box>

<style>
    .description {
        font-size: 12px;
        color: #1c2023;
        padding: 6px;
    }

    .demo-result {

        padding: 6px;
    }
</style>

