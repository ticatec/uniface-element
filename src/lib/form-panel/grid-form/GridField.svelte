<script lang="ts">
    import FormField from "../../form-field";

    export let label: string = "Label:"
    export let label$style: string = '';
    export let required: boolean = false;
    export let error: string = null;
    export let arrangement: 'vertical' | 'horizontal' = 'vertical' ;
    export let rowSpan: number = 1;
    export let colSpan: number = 1;
    export let row: number = null;
    export let col: number = null;

    export let labelSuffix: string = ':';

    let style: string;

    $: {
        style = rowSpan > 1 ? `grid-row-end: span ${rowSpan};` : '';
        style += colSpan > 1 ? `grid-column-end: span ${colSpan};` : '';
        style += row != null ? `grid-row-start: span ${row};` : '';
        style += col != null ? `grid-column-start: span ${col};` : '';
        console.log(style)
    }


</script>
<FormField class="cell-field" {label$style} {labelSuffix} {style} {label} {required} {error} {arrangement}>
    <slot/>
</FormField>