<script lang="ts">

    import Portal from "svelte-portal";
    import {onMount} from "svelte";

    export let visible: boolean = false;
    export let canClose: boolean = true;

    let hidden = true;

    onMount(() => {
        setTimeout(() => hidden = false, 100);  // 延迟显示 portal
    });

</script>

{#if visible}
    <Portal target="body">
        <div class="uniface-mask-overlay" class:hidden>
            <div style="position: relative; width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center"
                 on:click={()=>{if (canClose) {visible = false}}} aria-hidden="true">
                <div style="flex: 0 0 auto">
                    <slot></slot>
                </div>
            </div>
        </div>
    </Portal>
{/if}