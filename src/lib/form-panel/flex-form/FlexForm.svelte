<script lang="ts">
    export let style: string = '';
    export let fieldLayout: 'vertical' | 'horizontal' = 'vertical';

</script>
<div class="flex-form field-layout-{fieldLayout}"  {style}>
    <div>
        <slot/>
    </div>
</div>