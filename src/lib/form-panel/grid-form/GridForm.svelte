<script lang="ts">

    export let style: string = '';
    export let columns: number = 6; //默认6列
    export let fieldLayout: 'vertical' | 'horizontal' = 'vertical';


    $: gridStyle = `grid-template-columns: repeat(${columns}, 1fr)`

</script>
<div class="grid-form field-layout-{fieldLayout}" {style}>
    <div style="{gridStyle}">
        <slot/>
    </div>
</div>