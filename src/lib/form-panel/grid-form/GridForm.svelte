<script lang="ts">
    export let style: string = '';
    export let columns: number = 6; //默认6列


    $: gridStyle = `grid-template-columns: repeat(${columns}, 1fr)`

</script>
<div class="grid-form" {style}>
    <div style="{gridStyle}">
        <slot/>
    </div>
</div>