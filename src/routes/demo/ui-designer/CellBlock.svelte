<script lang="ts">
    import type GridBlock from "./GridBlock";

    export let block: GridBlock;
    export let rowCount: number;
    export let colCount: number;

    export let gap: string;

    let leftPadding: string = '';
    let topPadding: string = '';

    $: rowSpan = block.rowSpan == null ? 1 : block.rowSpan < 0 ? 1 : block.rowSpan;
    $: colSpan = block.colSpan == null ? 1 : block.colSpan < 0 ? 1 : block.colSpan;


    $: isRight = (block.col + colSpan) >= colCount;
    $: isBottom = (block.row + rowSpan) >= rowCount;

    $: console.log(block, leftPadding, topPadding, isRight, isBottom)

</script>

<div class="cell-block" class:right-col={isRight} class:bottom-row={isBottom} style="{leftPadding} {topPadding} grid-area: {block.row+1} / {block.col+1} / {block.row + rowSpan} / {block.col + colSpan}">
    <div>
        {#if block.component}
            <svelte:component this={block.component} {...block.props}/>
        {/if}
    </div>
</div>
