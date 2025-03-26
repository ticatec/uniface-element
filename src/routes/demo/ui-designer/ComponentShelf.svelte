<script lang="ts">

    import ComponentBlock from "./ComponentBlock.svelte";
    import type VisComponent from "./VisComponent";
    export let components: Array<VisComponent>;

</script>

<div style="width: 100%; height: 100%; overflow-y: auto; overflow-x: hidden">
    {#each components as component}
        <ComponentBlock {component}/>
    {/each}
</div>