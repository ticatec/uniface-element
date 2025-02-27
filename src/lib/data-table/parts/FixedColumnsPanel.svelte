<script lang="ts">

    import FixedRow from "$lib/data-table/parts/FixedRow.svelte";
    import type TableRow from "$lib/data-table/parts/TableRow";
    import type {IndicatorColumn} from "$lib/data-table";
    import type {RowEventHandler, TableEventHandler} from "$lib/data-table/UniDataTable";
    import type DataColumn from "$lib/data-table/lib/DataColumn";


    export let fixedCols: Array<DataColumn>;
    export let indicatorColumn: IndicatorColumn;
    export let scrollTop: number = 0;
    export let rows: Array<TableRow>;
    export let handleRowExpand: RowEventHandler;
    export let handleRowSelectChange: TableEventHandler;

    export let expandRow: TableRow;

    export let rowHeight: number;

    let width: number = indicatorColumn.width;

    export let inlineRowHeight: number = 0;


    let selectable: boolean = false;
    let expandable: boolean = false;

    $: selectable = indicatorColumn.selectable == true;
    $: expandable = indicatorColumn.buildInlineComponent != null;

</script>

<div class="fixed-panel" style="width: {width}px">
    <div class="scroll-panel" style="overflow-y: hidden">
        <div style="top: {-scrollTop}px">
            {#each rows ?? [] as row, idx}
                <FixedRow rowNo={idx+1} {row} selected={row.selected} alternative={idx % 2 == 1} {selectable} cols={fixedCols}
                          {rowHeight} {expandable} {handleRowExpand} {handleRowSelectChange}/>
                {#if row == expandRow}
                    <div class="inline-panel" style="height: {inlineRowHeight}px">

                    </div>
                {/if}
            {/each}
        </div>
    </div>
    <div class="bottom-mask-overlay">
        <!-- 用于匹配中间数据区域的滚动条 -->
    </div>
</div>