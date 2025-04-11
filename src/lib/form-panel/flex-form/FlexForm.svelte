<script lang="ts">
    export let style: string = '';
    export let fieldLayout: 'vertical' | 'horizontal' = 'vertical';

</script>
<div class="flex-form" class:field-layout-horizontal={fieldLayout=='horizontal'}  {style}>
    <div>
        <slot/>
    </div>
</div>