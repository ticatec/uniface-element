<script lang="ts">


    import HrefCell from "./HrefCell.svelte";
    import type DataColumn from "$lib/data-table/lib/DataColumn";
    import TextCell from "$lib/data-table/parts/TextCell.svelte";

    export let frozen: boolean = false;
    export let colIdx: number;
    export let column: DataColumn;
    export let data: any;

    let hint: any;
    let cell: any;
    let col$class: string ='';

    $: {
        hint = column.hint?.(data);
    }

    $: col$class = frozen ? `fz-col-${colIdx}` : `col-${colIdx}`;

</script>
<div class="table-data-cell {col$class}">
    <div>
        {#if column.render}
            <svelte:component this={column.render.component} {...column.render.props} {data}/>
        {:else if column.href}
            <HrefCell {data} href={column.href}/>
        {:else}
            <TextCell {data} {column}/>
        {/if}
    </div>
    {#if hint && cell && cell.offsetWidth < cell.scrollWidth}
        <div class="cell-hint">
            <div>
                <span>{hint}</span>
            </div>
        </div>
    {/if}
</div>