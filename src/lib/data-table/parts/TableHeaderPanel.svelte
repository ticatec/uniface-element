<script lang="ts">

    import {OrderDirection} from "../lib/OrderDirection";
    import {type TableEventHandler} from "../UniDataTable";
    import type DataColumn from "$lib/data-table/lib/DataColumn";

    export let scrollLeft: number = 0;
    export let handleWidthChange: TableEventHandler;
    export let dataCols: Array<any>;
    export let width: number = 0;
    export let hasWhitespace: boolean = false;
    export let  handleCellClick: (col: DataColumn) => any;
    export let orderColumn: DataColumn ;
    export let orderDirection: OrderDirection;

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
<div class="header-row">
    <div style="left: {-scrollLeft}px; width: {width}px">
        {#each dataCols ?? [] as col, index}
            <div class="col-{index} data-cell" class:sortable={col.compareFunction!=null} class:whitespace={hasWhitespace}>
                <div class:sortable={col.compareFunction != null} on:click={handleCellClick(col)} aria-hidden="true" class="vertical-center">
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
    </div>
</div>
