<script lang="ts">


    import {onDestroy, onMount} from "svelte";
    import {initialize} from "./Indicator";
    import iconLoading from "../assets/loading.gif";

    let indicator: string;

    export const show = (msg: string) => {
        indicator = msg;
        visible = true;
    }

    export let hide = () => {
        visible = false;
    }


    let board: any;
    let visible: boolean = false;

    onMount(() => {
        document.body.appendChild(board);
        initialize(show, hide)
        return () => {
            board && board.remove();
        };
    });

    onDestroy(() => {
        board && board.remove();
    });



</script>

<div bind:this={board} class="uniface-indicator-board" style="display: {visible ? 'flex' : 'none'}">
    <div style="display: flex; flex-direction: row; justify-items: center">
        <img src={iconLoading} alt="loading" width="32px" height="32px"/>
        <span style="padding-left: 12px">{indicator}</span>
    </div>
</div>
