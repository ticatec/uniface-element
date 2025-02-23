<script lang="ts">
    export {className as class };
    export let style: string = '';

    let className: string = "";
</script>
<div class="form-row {className}" {style}>
    <slot/>
</div>