<script lang="ts">

    export let rowSpan: number = 1;
    export let colSpan: number = 1;
    export let row: number = null;
    export let col: number = null;

    let style: string;

    $: {
        style = rowSpan > 1 ? `grid-row-end: span ${rowSpan};` : '';
        style += colSpan > 1 ? `grid-column-end: span ${colSpan};` : '';
        style += row != null ? `grid-row-start: span ${row};` : '';
        style += col != null ? `grid-column-start: span ${col};` : '';
    }


</script>
<div class="cell-field" {style}>
</div>