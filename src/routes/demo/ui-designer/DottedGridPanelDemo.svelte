<script lang="ts">
    import GridWithDottedLines from './DottedGridPanel.svelte';
    import GridPropertiesPanel from "./GridPropertiesPanel.svelte";
    import type GridBlock from './GridBlock';

    // 示例项目数据
    const items: Array<GridBlock> = [

    ];
    // { id: 1, title: '项目一', color: '#ffecb3' },
    // { id: 2, title: '项目二', color: '#b3e5fc' },
    // { id: 3, title: '项目三', color: '#c8e6c9' },
    // { id: 4, title: '项目四', color: '#f8bbd0' },
    // { id: 6, title: '项目六', color: '#ffe0b2' },
    // { id: 7, title: '项目七', color: '#b2dfdb' },
    // { id: 8, title: '项目八', color: '#f5f5f5' },
    // { id: 9, title: '项目九', color: '#e1bee7' }
    let gridStyle={
        width: '100%',
        height: '500px',
        colCount: 3,
        rowCount: 4,
        padding: '8px 12px',
        defaultColWidth: "1fr",
        defaultRowHeight: "40px",
        gap: "8px"
    }

</script>

<div class="example-container" style="width: 100%">
    <GridPropertiesPanel bind:gridStyle/>
    <h1>Grid with Dotted Lines Example</h1>

    <GridWithDottedLines style="width: 100%; height: 500px; padding: 12px 16px; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(3, 1fr); gap: 12px; border: 1px solid #e1e1e1"
            lineColor="#aaa"
            lineStyle="dotted"
    >
        {#each items as item}
<!--            <div class="grid-item" style="background-color: {item.color}; {item.id==4? 'grid-row:  2 / 4' : ''}" >-->
<!--                <h3>{item.title}</h3>-->
<!--                <p>Grid Item #{item.id}</p>-->
<!--            </div>-->
        {/each}
    </GridWithDottedLines>

    <div style="width: 100px; height: 120px; margin: 0 auto; border: 1px solid #E0E0E0; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 8px">
        <div style="background-color: #22BDFF; width: 60px; height: 30px">

        </div>
        <div>
            <span>Text</span>
        </div>
    </div>

    <div class="controls">
        <h2>更改网格属性</h2>
        <p>修改上面的 Grid 属性来查看虚线分隔线的变化</p>
    </div>
</div>

<style>
    .example-container {
        margin: 0 auto;
        padding: 20px;
        font-family: Arial, sans-serif;
    }

    h1 {
        text-align: center;
        color: #333;
        margin-bottom: 20px;
    }

    .grid-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        text-align: center;
    }

    .grid-item h3 {
        margin: 0 0 10px 0;
    }

    .grid-item p {
        margin: 0;
        font-size: 0.9em;
        opacity: 0.7;
    }

    .controls {
        margin-top: 30px;
        padding: 20px;
        background-color: #f5f5f5;
        border-radius: 5px;
        text-align: center;
    }

    .controls h2 {
        margin-top: 0;
    }
</style>