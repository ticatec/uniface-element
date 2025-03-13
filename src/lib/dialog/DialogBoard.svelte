<script lang="ts">


    import {onDestroy, onMount} from "svelte";
    import {initialize} from "./IDialog";

    import {dialogs} from "$lib/dialog/Dialogs";

    export const open = (component: any, params: any) => {
        let dialog = {id: (new Date().getTime()).toString(36) ,component, params};
        params.closeHandler = () => {
            dialogs.removeDialog(dialog.id);
        }
        dialogs.showDialog(dialog);
    }

    let board: any;

    onMount(() => {
        document.body.appendChild(board);
        initialize(open);
        return () => {
            board && board.remove();
        };
    });

    onDestroy(() => {
        board && board.remove();
    });


</script>

<div bind:this={board} class="uniface-dialog-board" style="display: {$dialogs.length > 0 ? 'block' : 'none'}">
    {#each $dialogs as dialog}
        <svelte:component this={dialog.component} {...dialog.params}></svelte:component>
    {/each}
</div>
