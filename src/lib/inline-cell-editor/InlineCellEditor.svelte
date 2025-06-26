<script lang="ts">

    export let style: string = ""

</script>

<div class="editor-cell" {style} on:focus>
    <slot/>
</div>