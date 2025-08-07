<script lang="ts">

    import {onDestroy, onMount} from "svelte";
    import {initialize} from "./IDialog";

    import {dialogs} from "$lib/dialog/Dialogs";
    import DialogWrapper from "$lib/dialog/DialogWrapper.svelte";

    export const open = (component: any, params: any) => {
        let dialog = {component, params, id: crypto.randomUUID()};
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
    <div style="width: 100%; height: 100%; position: relative">
        <!--{#each $dialogs as dialog (dialog)}-->
        <!--    <svelte:component bind:this={dialog.instance} this={dialog.component} {...dialog.params}></svelte:component>-->
        <!--{/each}-->
        {#each $dialogs as dialog (dialog.id)}
            <DialogWrapper
                    component={dialog.component}
                    params={dialog.params}
                    closeDialog={() => dialogs.removeDialog(dialog.id)}
            />
        {/each}
    </div>
</div>
