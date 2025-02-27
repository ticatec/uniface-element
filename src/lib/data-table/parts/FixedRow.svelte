<script lang="ts">

    import type TableRow from "$lib/data-table/parts/TableRow";
    import type {RowEventHandler} from "$lib/data-table/UniDataTable";
    import DataCell from "$lib/data-table/parts/DataCell.svelte";
    import type DataColumn from "$lib/data-table/lib/DataColumn";

    export let selectable: boolean = false;
    export let rowNo: number;
    export let cols: Array<DataColumn> = [];
    export let expandable: boolean;
    export let row: TableRow;
    export let alternative: boolean;
    export let handleRowExpand: RowEventHandler;
    export let handleRowSelectChange: RowEventHandler;
    export let selected: boolean = row.selected;

    export let rowHeight: number;

    let style: string;

    const showInlineData = (e: MouseEvent) => {
        handleRowExpand?.(row);
        e.preventDefault();
        e.stopPropagation();
    }

    $: if (row.selected != selected) {
        row.selected = selected;
        handleRowSelectChange(row.selected);
    }

    $: style = rowHeight== null ? '' : `height: ${rowHeight}px`

</script>
<div class="table-row" class:alternative {style}>
    <div class="indicator-cell">
        {#if selectable}
            <input type="checkbox" bind:checked={selected}/>
        {/if}
        <span>{rowNo}</span>
        {#if expandable}
            <i class={row.expand ? 'uniface-icon-folder' : "uniface-icon-folder-plus"} aria-hidden="true" on:click={showInlineData}></i>
        {/if}
    </div>
    {#each cols as column, colIdx}
        <DataCell frozen={true} {colIdx} {column} data={row.data}/>
    {/each}
</div>