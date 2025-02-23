<script lang="ts">
    import {onDestroy, onMount} from "svelte";
    import {fly} from "svelte/transition";
    import {initialize, type ShowToast} from "./Toast";

    export let fromBottom: boolean = false;
    let message: string;
    let timer = 0;
    let interval:any = null;
    let infoType: string;
    let height: string = "height: 0";
    let gap: number = 0;

    export const show: ShowToast = (msg: string, type: "error" | "info" | "success" = "error", duration: number = 3) => {
        message = msg;
        infoType = type;
        visible = true;
        timer = duration * 1000;
        if (interval == null) {
            height = "height: 48px";
            interval = setInterval(()=>{
                timer -= 100;
                if (timer <= 0) {
                    visible = false;
                    clearInterval(interval);
                    interval = null;
                }
            }, 100);
        }

    }


    let board:any;
    let visible: boolean = false;
    let style: string = "";

    $: style = fromBottom ? `bottom: ${gap}px` : `top: ${gap}px`;

    onMount(() => {
        document.body.appendChild(board);
        initialize(show)
        return () => {
            board && board.remove();
        };
    });

    onDestroy(() => {
        board && board.remove();
    });

//

</script>
<div bind:this={board} class="uniface-toast-board" style="{height}; {style}">
    {#if visible}
        <div transition:fly={{duration: 300, y: fromBottom ? "100%" : "-100%"}} on:outroend={() => {height="height: 0"}} class={infoType}  style="padding: 0 18px">
            <span>{message}</span>
        </div>
    {/if}
</div>