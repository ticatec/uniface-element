<script lang="ts">

    import type DataColumn from "$lib/data-table/lib/DataColumn";
    import type {IndicatorColumn} from "$lib/data-table";
    import {type SelectionEventHandler, SelectionMode, type TableEventHandler} from "$lib/data-table/UniDataTable";
    import utils from "$lib/common/utils";
    import {OrderDirection} from "$lib/data-table/lib/OrderDirection";

    export let columns: Array<DataColumn>;
    export let indicatorColumn: IndicatorColumn | null;
    export let handleWidthChange: TableEventHandler;
    export let rowHeight;
    export let handleCellClick: (col: DataColumn) => any;
    export let orderColumn: DataColumn ;
    export let orderDirection: OrderDirection;
    export let selectionMode: SelectionMode;

    export let handleToggleSelectAll: SelectionEventHandler;

    let checked: boolean = false;
    let indeterminate: boolean = false;

    const handleHeaderCheckBoxClick = async (e: MouseEvent) => {
        indeterminate = false;
        await utils.sleep(0.05);
        handleToggleSelectAll?.(checked);
    }

    $: if (selectionMode == SelectionMode.All) {
        indeterminate = false;
        checked = true;
    } else if (selectionMode == SelectionMode.None) {
        indeterminate = false;
        checked = false;
    } else {
        indeterminate = true;
    }

    let resizeCol: any;
    let startX: number = 0;
    let startWidth: number = 0;
    const handleResizeMouseDown = (col: DataColumn) => (event: MouseEvent) => {
        if (col.resizable) {
            resizeCol = col;
            startX = event.clientX;
            startWidth = resizeCol.width;

            document.body.style.cursor = 'col-resize';
            // 绑定鼠标移动和松开事件
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
        }
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
        document.body.style.cursor = 'default';
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    }

</script>

<div class="header-row" style="flex: 0 0 auto; {rowHeight}px">
    {#if indicatorColumn}
        <div class="data-cell" style="width: {indicatorColumn.width}px">
            {#if indicatorColumn?.selectable === true}
                <div style="text-align: center" class="vertical-center">
                    <input type="checkbox" tabindex="-1" bind:checked {indeterminate} on:click={handleHeaderCheckBoxClick}/>
                </div>
                <div class="header-cell-divider"></div>
            {/if}
        </div>
    {/if}
    {#each columns as column, index}
        <div class="fz_col-{index} data-cell" style="text-align: center">
            <div class:sortable={column.compareFunction != null} on:click={handleCellClick(column)} aria-hidden="true" class="vertical-center">
                <span>{column.text}</span>
                {#if column === orderColumn}
                    <i style="margin-left: 2px; font-size: 12px; position: absolute; top: 0; right: 4px"
                       class={orderDirection===OrderDirection.Ascending ? 'uniface-icon-chevron-up' : 'uniface-icon-chevron-down'}></i>
                {/if}
            </div>

            <div class="header-cell-divider" class:resizer={column.resizable} aria-hidden="true"
                 on:mousedown={handleResizeMouseDown(column)}></div>
        </div>
    {/each}
</div>