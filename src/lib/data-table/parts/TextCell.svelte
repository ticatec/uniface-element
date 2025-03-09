<script lang="ts">

    import type DataColumn from "$lib/data-table/lib/DataColumn";
    import tableUtils from "$lib/data-table/lib/TableUtils";

    export let column: DataColumn;
    export let data: any;

    let text: string;
    let escapeHTML: boolean = false;


    $: {
        let value = tableUtils.extractFieldValue(data, column.field);
        if (column.formatter) {
            escapeHTML = column.escapeHTML == true;
            text = column.formatter(value);
        } else {
            escapeHTML = false;
            text = value ?? '';
        }
    }


</script>


{#if escapeHTML == true}
    {@html text}
{:else}
    <span>{text}</span>
{/if}