<script lang="ts">

    import DataRow from "./DataRow.svelte";
    import type DataColumn from "../lib/DataColumn";
    import type ActionsColumn from "../lib/ActionsColumn";
    import type IndicatorColumn from "../lib/IndicatorColumn";

    import iconLoading from "../assets/loading.gif"
    import type TableRow from "./TableRow";
    import type {TableEventHandler} from "$lib/data-table/UniDataTable";
    import ActionPanel from "./ActionsPanel.svelte";
    import FixedColumnsPanel from "./FixedColumnsPanel.svelte";
    import {onMount, tick} from "svelte";


    export let columns: Array<DataColumn>;   //columns={dataColumns}
    export let rows: Array<TableRow>; //{rows}

    export let width: number = 0; //width={tabWidth}

    export let actionsColumn: ActionsColumn | null;  //{actionsColumn}
    export let indicatorColumn: IndicatorColumn;  //{indicatorColumn}
    export let scrollLeft: number = 0; //bind:scrollLeft
    export let rowHeight: number;  //{ rowHeight}
    export let inlineRowHeight: number = 80;
    export let handleRowSelectChange: TableEventHandler; //{handleRowSelectChange}


    let hasOperation: boolean = actionsColumn != null;
    let scrollTop: number = 0;

    let resizeObserver: ResizeObserver;
    let dataPanel: any;
    let tabWidth: number;

    onMount(async () => {
        resizeObserver = new ResizeObserver(() => {
            // 每次 div 尺寸变化时，更新 clientWidth
            tabWidth = dataPanel?.clientWidth;
        });
        resizeObserver.observe(dataPanel);
    });

    const handleDataTableScroll = (e: Event) => {
        if (!hasOperation) {
            scrollTop = e.target?.scrollTop;
        }
        scrollLeft = e.target?.scrollLeft;
    }


    const handleWheelEvent = (e: WheelEvent) => {
        let maxSh = dataPanel.scrollHeight - dataPanel.clientHeight;
        if (hasOperation && maxSh > 0) {
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

    let expandRow: any = null;
    let loadingRow: any = null;
    let inlineComponent: any;
    let inlineError: string | null = null;

    let fixedCols: Array<DataColumn> = [];


    const handleRowExpand = async (row: TableRow) => {
        if (row == expandRow) {
            row.expand = false;
            expandRow = null;
        } else {
            if (expandRow != null) {
                expandRow.expand = false;
            }
            expandRow = row;
        }
        inlineComponent = null;
        await tick();
        loadingRow = true;
        try {
            inlineError = null;
            inlineComponent = await indicatorColumn?.buildInlineComponent(row.data);
        } catch (ex) {
            inlineError = indicatorColumn.getInlineError?.(ex as Error) ?? 'Unknown Error';
        }
        loadingRow = false;
    }

    let rowWidth: number;

    $: rowWidth = Math.max(width, tabWidth);

    $: if (dataPanel && scrollTop > -1) {
        dataPanel.scrollTop = scrollTop;
    }

</script>
<div class="data-content-panel">
    <FixedColumnsPanel {indicatorColumn} {expandRow} {fixedCols} {inlineRowHeight} {rows} bind:scrollTop {handleRowExpand}
                       {handleRowSelectChange}/>
    <div class="data-view-panel" bind:this={dataPanel} on:scroll|passive={handleDataTableScroll} on:wheel|passive={handleWheelEvent}
         style="{actionsColumn == null ? 'overflow-y: scroll' : ''}">
        {#if rows && rows.length > 0}
            <div style="box-sizing: border-box; width: {rowWidth}px;">
                {#each rows as row, idx}
                    <DataRow {rowHeight} {row} {columns} alternative={idx % 2 == 1} />
                    {#if row == expandRow}
                        <div class="expand-data-row" bind:clientHeight={inlineRowHeight}
                             style="position: relative; box-sizing: content-box; width: 100%; height: auto">
                            <div class="inline-panel">
                                {#if loadingRow}
                                    <div style="text-align: center; padding: 16px">
                                        <img src={iconLoading} width="32" height="32" style="vertical-align: middle"/>
                                        <span style="">{indicatorColumn.loadingIndicator ?? 'Loading data...'}</span>
                                    </div>
                                {:else if inlineError}
                                    <div style="text-align: center; padding: 16px">
                                        <span style="">{inlineError}</span>
                                    </div>
                                {:else}
                                    <svelte:component this={inlineComponent} data={row}/>
                                {/if}
                            </div>
                        </div>
                    {/if}
                {/each}
            </div>
        {:else}
            <div class="empty-content-board" style="width: {width}px;">
                <div>{indicatorColumn.emptyIndicator ?? "Empty dataset."}</div>
            </div>
        {/if}
    </div>
    {#if actionsColumn}
        <ActionPanel {expandRow} {actionsColumn} {rows} {inlineRowHeight} bind:scrollTop/>
    {/if}
</div>