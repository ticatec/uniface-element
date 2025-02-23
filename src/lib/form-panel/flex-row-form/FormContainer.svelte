<script lang="ts">

    export {className as class };
    export let style: string = '';

    let className: string = "";

</script>
<div class="flex-row-form" {style}>
    <div>
        <slot/>
    </div>
</div>