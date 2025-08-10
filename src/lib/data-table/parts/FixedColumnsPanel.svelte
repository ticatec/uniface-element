<script lang="ts">

    import FixedRow from "$lib/data-table/parts/FixedRow.svelte";
    import type TableRow from "$lib/data-table/parts/TableRow";
    import type {IndicatorColumn} from "$lib/data-table";
    import UniDataTable, {type RowEventHandler, SelectionMode, type TableEventHandler} from "$lib/data-table/UniDataTable";
    import type DataColumn from "$lib/data-table/lib/DataColumn";
    import FixedHeaderPanel from "$lib/data-table/parts/FixedHeaderPanel.svelte";
    import {tick} from "svelte";
    import {OrderDirection} from "$lib/data-table/lib/OrderDirection";


    export let fixedCols: Array<DataColumn> = [];
    export let indicatorColumn: IndicatorColumn | null;
    export let width: number;
    export let scrollTop: number = 0;
    export let rows: Array<TableRow>;
    export let handleWidthChange: TableEventHandler;
    export let handleRowExpand: RowEventHandler;

    export let handleCellClick: (col: DataColumn) => any;
    export let orderColumn: DataColumn;
    export let orderDirection: OrderDirection;

    let selectionMode: SelectionMode = SelectionMode.None;

    export let selectedRows: Array<any> = [];

    export let expandRow: TableRow | null;

    export let rowHeight: number;

    export let inlineRowHeight: number = 0;


    let selectable: boolean = false;
    let expandable: boolean = false;

    $: selectable = indicatorColumn?.selectable == true;
    $: expandable = indicatorColumn?.buildInlineComponent != null;

    const handleToggleSelectAll = async (value: boolean) => {
        selectedRows = value ? rows.map(item => item.data) : [];
        await tick();
        selectionMode = value ? SelectionMode.All : SelectionMode.None;
        rows = [...rows];
        console.log('选中行', selectionMode)
    }

    const handleRowSelectChange = async (row: TableRow, value: boolean) => {
        if (value) {
            if (selectedRows.indexOf(row.data) < 0) {
                selectedRows = [...selectedRows, row.data];
            }
        } else {
            let pos = selectedRows.indexOf(row.data);
            if (pos > -1) {
                selectedRows.splice(pos, 1);
                selectedRows = [...selectedRows];
            }
        }
        selectionMode = selectedRows.length == rows.length ? SelectionMode.All : selectedRows.length == 0 ? SelectionMode.None : SelectionMode.Partial;
    }

    let viewPanel: any;

    const handleWheelEvent = (e: WheelEvent) => {
        let maxSh = viewPanel.scrollHeight - viewPanel.clientHeight;
        if (maxSh > 0) {
            if (e.deltaY != 0) {
                scrollTop = scrollTop + e.deltaY;
                if (scrollTop < 0) {
                    scrollTop = 0;
                }
                if (scrollTop > maxSh) {
                    scrollTop = maxSh;
                }
                setTimeout(() => {
                    scrollTop = viewPanel.scrollTop;
                }, 200);
            }
        }
    }

    $: if (viewPanel && scrollTop > -1) {
        viewPanel.scrollTop = scrollTop;
    }

</script>

<div class="left-fixed-panel" style="width: {width}px">
    <FixedHeaderPanel {selectionMode} {orderColumn} {orderDirection} {handleCellClick} {handleWidthChange} columns={fixedCols} {indicatorColumn}
                      {handleToggleSelectAll} {rowHeight}/>
    <div class="rows-container" bind:this={viewPanel} on:wheel|passive={handleWheelEvent}>
        <div>
            {#each rows ?? [] as row, idx}
                <FixedRow rowNo={idx+1} {row} selected={selectedRows.indexOf(row.data) > -1} alternative={idx % 2 == 1} {selectable}
                          cols={fixedCols} {expandRow} {rowHeight} {expandable} {handleRowExpand} {handleRowSelectChange} {indicatorColumn}/>
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