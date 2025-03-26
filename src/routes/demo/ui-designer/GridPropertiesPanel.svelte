<script lang="ts">

    import TextEditor from "$lib/text-editor";
    import NumberEditor from "$lib/number-editor";


    export let gridStyle: any = {}


</script>
<div class="grid-properties-panel">
    <div>
        <span>Size</span>
    </div>
    <div style="width: 80px">
        <TextEditor variant="outlined" bind:value={gridStyle.width}/>
    </div>
    <div>
        <span>X</span>
    </div>
    <div style="width: 80px">
        <TextEditor variant="outlined" bind:value={gridStyle.height}/>
    </div>
    <div>
        <span>Columns</span>
    </div>
    <div style="width: 50px">
        <NumberEditor variant="outlined" bind:value={gridStyle.colCount}/>
    </div>
    <div>
        <span>Rows</span>
    </div>
    <div style="width: 50px">
        <NumberEditor variant="outlined" bind:value={gridStyle.rowCount}/>
    </div>
    <div>
        <span>Padding</span>
    </div>
    <div style="width: 150px">
        <TextEditor variant="outlined" bind:value={gridStyle.padding}/>
    </div>
    <div>
        <span>gap:</span>
    </div>
    <div style="width: 150px">
        <TextEditor variant="outlined" bind:value={gridStyle.gap}/>
    </div>
</div>
<style>
    .grid-properties-panel {
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: 8px;
        align-items: center;
    }
</style>