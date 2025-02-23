<script lang="ts">
    export {className as class };
    export let style: string = '';
    export let span: number = 1;

    let className: string = "";
    let width:string = '';

    const ONE_CELL = 100 / 12;

    $: {
        let cs = Math.round(span ? span : 1);
        if (cs < 1) {
            cs = 1;
        } else if (cs > 12) {
            cs = 12;
        }
        width = `width: ${ONE_CELL * cs}%`
    }

</script>
<div class="form-cell {className}" style="{style}; {width}">
    <slot/>
</div>