<script lang="ts">

    export let span: number = 1;

    let style: string;

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
<div class="cell-field" style={cellCss}>
</div>