<script lang="ts">

    import {clickOutside} from "$lib/common/uniface-utils";
    import {onDestroy, onMount} from "svelte";

    export let closeCallback: ()=>void;
    export let parentRect: DOMRect;

    const close = () => {
        closeCallback?.();
    }

    let panel: any;
    let rect: DOMRect;
    let resizeObserver: ResizeObserver;
    let style: string = "top: 50%;"

    const checkPosition = () => {
        rect = panel.getBoundingClientRect();
        if (rect.y + 10 > parentRect.height) {
            style = "bottom: 50%;"
        } else {
            style = "top: 50%;"
        }
    }

    onMount(async () => {
        resizeObserver = new ResizeObserver(() => {
            checkPosition();
        });
        resizeObserver.observe(panel);
        checkPosition();
    });

    onDestroy(() => {
        resizeObserver.disconnect();
    });

</script>


<div bind:this={panel} style="position: absolute; right: 8px; {style}; background-color: #FFFFFF; border: 1px solid #e1e1e1; z-index: 5"
     use:clickOutside on:outerClick={close}>
    <slot></slot>
</div>