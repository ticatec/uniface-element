<script lang="ts">

    export {className as class };
    export let style: string = '';
    export let fieldLayout: 'vertical' | 'horizontal' = 'vertical';

    let className: string = "";

</script>
<div class="flex-row-form field-layout-{fieldLayout}" {style}>
    <div>
        <slot/>
    </div>
</div>