<script lang="ts">

    import {OrderDirection} from "../lib/OrderDirection";
    import type IndicatorColumn from "../lib/IndicatorColumn";
    import type ActionsColumn from "../lib/ActionsColumn";
    import type {CompareFunction} from "../lib/CompareFunction";
    import {type SelectionEventHandler, SelectionMode, type TableEventHandler} from "../UniDataTable";
    import FixedHeaderPanel from "$lib/data-table/parts/FixedHeaderPanel.svelte";
    import type DataColumn from "$lib/data-table/lib/DataColumn";

    export let actionsColumn: ActionsColumn | null;
    export let indicatorColumn: IndicatorColumn;
    export let scrollLeft: number = 0;
    export let handleToggleSelectAll: SelectionEventHandler;
    export let handleWidthChange: TableEventHandler;
    export let sortData: (compareFun: CompareFunction, descending: boolean) => void;
    export let dataCols: Array<any>;
    export let frozenCols: Array<DataColumn> = [];
    export let selectionMode: SelectionMode;

    export let width: number = 0;

    let resizeCol: any;
    let orderColumn: DataColumn | null = null;
    let orderDirection: OrderDirection = OrderDirection.Ascending;

    let startX: number = 0;
    let startWidth: number = 0;


    const handleResizeMouseDown = (col: DataColumn) => (event: MouseEvent) => {
        resizeCol = col;
        startX = event.clientX;
        startWidth = resizeCol.width;

        // 绑定鼠标移动和松开事件
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    }

    const onMouseMove = (event: MouseEvent) => {
        if (resizeCol !== null) {
            const diff = event.clientX - startX;
            let w = startWidth + diff;
            if (w > (resizeCol.minWidth ?? 50)) {
                resizeCol.width = startWidth + diff;
            }

        }
        handleWidthChange?.();
    }

    // 结束拖动
    function onMouseUp() {
        resizeCol = null;
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    }


    const handleCellClick = (col: DataColumn) => (e: MouseEvent) => {
        if (col.compareFunction != null) {
            if (col == orderColumn) {
                orderDirection = orderDirection == OrderDirection.Ascending ? OrderDirection.Descending : OrderDirection.Ascending;
            } else {
                orderColumn = col;
                orderDirection = OrderDirection.Ascending;
            }
            sortData?.(col.compareFunction, orderDirection == OrderDirection.Descending);
        }
    }


</script>
<div class="table-header-panel">
    <FixedHeaderPanel {selectionMode} columns={frozenCols} {indicatorColumn} {handleToggleSelectAll}/>
    <div style="width: 100%; overflow: hidden">
        <div class="header-row-panel" style="left: {-scrollLeft}px; width: {width}px">
            {#each dataCols ?? [] as col, index}
                <div class="table-cell col-{index}">
                    <div class:sortable={col.compareFunction != null} on:click={handleCellClick(col)} aria-hidden="true">
                        <span>{col.text}</span>
                        {#if col === orderColumn}
                            <i style="margin-left: 2px; font-size: 12px; position: absolute; top: 0; right: 4px"
                               class={orderDirection===OrderDirection.Ascending ? 'uniface-icon-chevron-up' : 'uniface-icon-chevron-down'}></i>
                        {/if}
                    </div>
                    <div class="header-cell-divider" class:resizer={col.resizable} aria-hidden="true"
                         on:mousedown={handleResizeMouseDown(col)}></div>
                </div>
            {/each}
            <div class="header-cell" style="border-right: unset;">
            </div>
        </div>
    </div>
    {#if actionsColumn}
        <div class="header-actions" style="width: {actionsColumn.width}px">
            <div>
                <span>{actionsColumn.title ?? ''}</span>
            </div>

        </div>
    {/if}
</div>

<style>


</style>