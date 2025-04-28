<script lang="ts">

    import type TableRow from "$lib/data-table/parts/TableRow";
    import type {RowEventHandler, RowSelectEventHandler} from "$lib/data-table/UniDataTable";
    import DataCell from "$lib/data-table/parts/DataCell.svelte";
    import type DataColumn from "$lib/data-table/lib/DataColumn";
    import type {IndicatorColumn} from "$lib";

    export let selectable: boolean = false;
    export let rowNo: number;
    export let cols: Array<DataColumn> = [];
    export let expandable: boolean;
    export let row: TableRow;
    export let alternative: boolean;
    export let handleRowExpand: RowEventHandler;
    export let handleRowSelectChange: RowSelectEventHandler;
    export let selected: boolean;

    export let expandRow: any = null;

    export let rowHeight: number;

    export let indicatorColumn: IndicatorColumn | null;

    let style: string;

    const showInlineData = (e: MouseEvent) => {
        handleRowExpand?.(row);
        e.preventDefault();
        e.stopPropagation();
    }

    $: {
        handleRowSelectChange(row, selected);
    }

    $: style = rowHeight == null ? '' : `height: ${rowHeight}px`

</script>
<div class="data-row" class:alternative style="width: 100%; {style}">
    {#if indicatorColumn}
        <div class="data-cell indicator-cell" style="width: {indicatorColumn.width}px">
            {#if selectable}
                <input type="checkbox" bind:checked={selected}/>
            {/if}

            {#if expandable}
                <div class="expand-icon" style="">
                    <i class={row == expandRow ? 'icon_google_folder' : "icon_google_folder_open"} aria-hidden="true" on:click={showInlineData}></i>
                </div>
            {/if}
            {#if indicatorColumn.displayNo}
                <div style="margin-left: 4px; width: 20px; text-align: left">
                    <span>{rowNo}</span>
                </div>
            {/if}
        </div>
    {/if}
    {#each cols as column, colIdx}
        <DataCell frozen={true} {colIdx} {column} data={row.data}/>
    {/each}
</div>