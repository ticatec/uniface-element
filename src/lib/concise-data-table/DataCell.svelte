<script lang="ts">
    import type Column from "$lib/concise-data-table/Column";

    export let column: Column;
    export let idx: number;

    export let data: any;

    let text: string;
    let escapeHTML: boolean = false;

    $: text = column.formatter ? column.formatter(data[column.field]) : data[column.field];

</script>

<div class="data-cell col_{idx}">
    {#if escapeHTML}
        {@html text}
    {:else }
        <span>{text}</span>
    {/if}
</div>