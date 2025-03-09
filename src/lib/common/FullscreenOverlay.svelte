<script lang="ts">

    import Portal from "svelte-portal";

    export let visible: boolean = false;

</script>

{#if visible}
    <Portal target="body">
        <div class="uniface-mask-overlay">
            <div style="position: relative; width: 100%; height: 100%; overflow: hidden"
                 on:click={()=>{visible = false}} aria-hidden="true">
                <slot></slot>
            </div>
        </div>
    </Portal>
{/if}