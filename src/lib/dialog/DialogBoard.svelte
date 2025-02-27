<script lang="ts">


    import {onDestroy, onMount} from "svelte";
    import {initialize} from "./IDialog";
    import DialogBox from "$lib/dialog/DialogBox.svelte";

    export const open = (component: any, params: any) => {
        let dialog = {component, params}
        params.closeHandler = remove(dialog);
        dialogs = [...dialogs, dialog];
    }

    let dialogs:Array<any> = [];
    let board:any;

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

    const remove = (dialog:any) => () => {
        let pos = dialogs.indexOf(dialog);
        if (pos > -1) {
            dialogs.splice(pos, 1);
            dialogs = [...dialogs];
        }
    }


</script>

<div bind:this={board} class="uniface-dialog-board" style="display: {dialogs.length > 0 ? 'block' : 'none'}">
    {#each dialogs as dialog}
        <DialogBox closeHandler={remove(dialog)} dialog={dialog.component} params={dialog.params} >
        </DialogBox>
    {/each}
</div>
