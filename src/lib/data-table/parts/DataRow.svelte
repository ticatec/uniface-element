<script lang="ts">

    import type DataColumn from "../lib/DataColumn";
    import DataCell from "./DataCell.svelte";
    import type TableRow from "$lib/data-table/parts/TableRow";

    export let columns: Array<DataColumn>;
    export let row: TableRow;
    export let alternative: boolean;
    export let rowHeight: number;  //{ rowHeight}

    let style: string = '';

    $: style = rowHeight== null ? '' : `height: ${rowHeight}px`


</script>

<div class="data-row" {style} class:alternative aria-hidden="true">
    {#each columns as col, idx}
        <DataCell colIdx={idx} data={row.data} column={col}/>
    {/each}
    <div class="data-cell" style="border-right: none; width: unset">
    </div>
</div>


