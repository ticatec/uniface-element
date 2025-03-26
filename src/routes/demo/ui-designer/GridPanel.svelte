<script lang="ts">


    import {onMount} from "svelte";
    import type GridBlock from "./GridBlock";
    import utils from "./utils";
    import CellBlock from "./CellBlock.svelte";

    export let width: string = "320px";
    export let height: string = "240px";

    export let blocks: Array<GridBlock>;

    export let padding: string = '';

    export let gap: string = "8px"


    export let rowsHeight: Array<string | number> = [50, 30, 50, '1fr', '1fr'];
    export let columnsWidth: Array<string | number> = [100, '1fr', '1fr', '1fr'];


    const generateTemplate = (attr: string, arr: Array<string | number>) => {
        let sizes = arr.map(cw => (typeof cw == 'number' ? `${cw}px` : cw));
        return `${attr}: ${sizes.join(' ')}`;
    }


    let style = '';

    $: colsTemplate = generateTemplate('grid-template-columns', columnsWidth);
    $: rowsTemplate = generateTemplate('grid-template-rows', rowsHeight);

    let baseLayer: any;

    $: rowCount = rowsHeight.length;
    $: colCount = columnsWidth.length;
    $: cellBlocks = utils.fillGrid(blocks, rowCount, colCount);

    onMount(async () => {
        let blocks = baseLayer.children;
        for (let i = 0; i < colCount; i++) {
            const rect = blocks[i].getBoundingClientRect();
            console.log(`列${i}宽度: ${rect.width}px`);
        }
        for (let i = 0; i < rowCount; i++) {
            const rect = blocks[i * columnsWidth.length].getBoundingClientRect();
            console.log(`行${i}高度: ${rect.height}px`);
        }
    })

</script>

<div class="white-board" style="width: {width}; height: {height}">
    <div class="grid-panel" bind:this={baseLayer} style="width: 100%; height: 100%; {colsTemplate}; {rowsTemplate}">
        {#each cellBlocks as block}
            <CellBlock {block} {rowCount} {colCount} {gap}/>
        {/each}
    </div>
</div>

<style>

    .white-board {
        position: relative;
        overflow: hidden;
    }

    .grid-panel {
        position: relative;
        width: 100%;
        height: 50px;
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        overflow: hidden;
        gap: 8px;
        z-index: 5;
        align-items: center;
    }

    .grid-panel .field-cell {
        width: 100%;
        overflow: hidden;
        position: relative;
    }

    .grid-panel .field-cell > div {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .grid-panel .field-cell > div > div {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }


</style>

