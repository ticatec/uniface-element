<script lang="ts">

    import FormField from "../../form-field";

    export let span: number = 1;
    export let label: string = "Label:"
    export let style: string = '';
    export let label$style: string = '';
    export let required: boolean = false;
    export let error: string | null = null;
    export let labelSuffix: string = ':';

    let cellCss: string = '';

    const generateCss = (sp: number): string => {
        if (isNaN(sp) || sp < 1) {
            sp = 1;
        } else if (sp > 12) {
            sp = 12
        }
        return `width: ${sp * 100 / 12}%`
    }

    $: cellCss = generateCss(span);

</script>
<FormField class="form-cell" {label} {labelSuffix} style="{style}; {cellCss}" {label$style} {required} {error}>
    <slot/>
</FormField>
