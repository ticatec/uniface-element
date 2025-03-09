<script lang="ts">

    import DataRow from "./DataRow.svelte";
    import type DataColumn from "../lib/DataColumn";
    import type TableRow from "./TableRow";
    import {onDestroy, onMount} from "svelte";
    import TableHeaderPanel from "$lib/data-table/parts/TableHeaderPanel.svelte";
    import UniDataTable, {type TableEventHandler} from "$lib/data-table/UniDataTable";
    import {OrderDirection} from "$lib/data-table/lib/OrderDirection";


    export let columns: Array<DataColumn>;
    export let rows: Array<TableRow>;
    export let orderColumn: DataColumn ;
    export let orderDirection: OrderDirection;

    export let emptyIndicator: string | null = null;

    export let list: Array<any>;

    export let expandRow: TableRow | null;

    let width: number = 0;

    export let scrollTop: number = 0;
    export let rowHeight: number;
    export let inlineRowHeight: number = 80;

    export let inlineComponent: any = null;

    export let table: UniDataTable;

    export let showVerticalScroll: boolean = false;
    export let displayHorizontalScroll: boolean = true;

    export let handleWidthChange: TableEventHandler;

    export let  handleCellClick: (col: DataColumn) => any;

    export let tabWidth: number;

    let scrollLeft: number = 0;

    let resizeObserver: ResizeObserver;
    let viewPanel: any;

    onMount(async () => {
        resizeObserver = new ResizeObserver(() => {
            // 每次 div 尺寸变化时，更新 clientWidth
            viewWidth = Math.round(viewPanel?.clientWidth)-1;
        });
        resizeObserver.observe(viewPanel);
    });

    onDestroy(()=>{
        resizeObserver.disconnect();
    })

    const handleDataTableScroll = (e: Event) => {
        if (showVerticalScroll) {
            scrollTop = e.target?.scrollTop;
        }
        scrollLeft = e.target?.scrollLeft;
    }


    const handleWheelEvent = (e: WheelEvent) => {
        let maxSh = dataPanel.scrollHeight - dataPanel.clientHeight;
        if (!showVerticalScroll && maxSh > 0) {
            if (e.deltaY != 0) {
                scrollTop = scrollTop + e.deltaY;
                if (scrollTop < 0) {
                    scrollTop = 0;
                }
                if (scrollTop > maxSh) {
                    scrollTop = maxSh;
                }
                setTimeout(() => {
                    scrollTop = dataPanel.scrollTop;
                }, 200);
            }
        }
    }

    $: if (dataPanel && scrollTop > -1 && !showVerticalScroll) {
        console.log('移动', scrollTop)
        dataPanel.scrollTop = scrollTop;
    }


    $: {
        if (table) {
            table.data = [...list];
            rows = table.rows;
        }
    }


    let viewWidth: number;
    $: rowWidth = Math.max(viewWidth, tabWidth);

    $: if (columns) {
        tabWidth = table.width;
    }

    let hasWhitespace: boolean = true;
    $: hasWhitespace = viewWidth > tabWidth;


    let top: string = "0px";
    let dataPanel: any;


</script>
<div class="data-content-panel" bind:this={viewPanel}>

    <TableHeaderPanel {handleCellClick} {orderColumn} {orderDirection} dataCols={columns} {scrollLeft} width={tabWidth} {hasWhitespace} {handleWidthChange}/>
    <div class="data-view-panel" bind:this={dataPanel} on:scroll|passive={handleDataTableScroll} on:wheel|passive={handleWheelEvent}
         style="overflow-x: {displayHorizontalScroll ? 'scroll' : 'auto'}; overflow-y: {showVerticalScroll ?'auto': 'hidden' };">
        {#if rows && rows.length > 0}
            <div style="box-sizing: border-box; width: {rowWidth}px; top: {top}">
                {#each rows as row, idx}
                    <DataRow {rowHeight} {row} {columns} alternative={idx % 2 == 1}/>
                    {#if row == expandRow && inlineComponent}
                        <div class="expand-data-row" bind:clientHeight={inlineRowHeight}
                             style="position: relative; box-sizing: content-box; width: 100%; height: auto">
                            <div class="inline-panel">
                                <svelte:component this={inlineComponent} data={row.data}/>
                            </div>
                        </div>
                    {/if}
                {/each}
            </div>
        {:else}
            <div class="empty-content-board" style="width: 100%">
                <div>{emptyIndicator ?? "Empty dataset."}</div>
            </div>
        {/if}
    </div>
</div>