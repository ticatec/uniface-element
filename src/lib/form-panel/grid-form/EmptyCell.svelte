<script lang="ts">

    export let rowSpan: number = 1;
    export let colSpan: number = 1;
    export let row: number;
    export let col: number;

    let style: string;

    $: {
        style = '';
        if (row != null) style += `grid-row-start: ${row};`;
        if (col != null) style += `grid-column-start: ${col};`;
        if (rowSpan > 1) style += `grid-row-end: span ${rowSpan};`;
        if (colSpan > 1) style += `grid-column-end: span ${colSpan};`;
    }


</script>
<div class="cell-field"  {style}>
</div>