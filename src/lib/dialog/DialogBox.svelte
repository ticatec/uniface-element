<script lang="ts">

    import Dialog from "./Dialog.svelte";
    import type {ButtonActions} from "$lib/action-bar";
    import type {DialogCloseConfirm} from "$lib";

    export let dialog: any;
    export let params: any;
    export let closeHandler: () => void;
    let actions: ButtonActions = null as unknown as ButtonActions;

    let title: string;

    let instance: any;

    let closeConfirm: DialogCloseConfirm;
    let closeAction: any;


</script>

<Dialog bind:this={instance} {title} {closeHandler} {closeConfirm} {actions} {closeAction}>
    <svelte:component this={dialog} dialog={instance} bind:title bind:actions bind:closeConfirm bind:closeAction
                      {...params}></svelte:component>
</Dialog>