<script lang="ts">
    import type Column from "$lib/concise-data-table/Column";
    import DataCell from "$lib/concise-data-table/DataCell.svelte";

    export let columns: Array<Column>;
    export let data: any;

    export let showAlternative: boolean;
</script>

<div class="table-row" class:alternative={showAlternative} on:click>
    {#each columns as column, idx}
        <DataCell {idx} {column} {data}/>
    {/each}
</div>