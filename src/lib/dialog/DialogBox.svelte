<script lang="ts">

    import Dialog from "./Dialog.svelte";

    export let contentComponent:any;
    export let params:any;
    export let closeHandler: () => void;

    let title: string;
    let enableConfirm: boolean = false;

    let confirmCallback = params?.confirmCallback;
    let dialogParams = {...params};
    delete dialogParams.confirmCallback;

    let instance:any;

    const setConfirmEnable = (value: boolean) => {
        enableConfirm = value;
    }

    const setTitle = (value: string) => {
        title = value;
    }

    const closeConfirm = async (): Promise<boolean> => {
        if (instance?.closeConfirm) {
            return await instance.closeConfirm();
        }
        return true;
    }

</script>

<Dialog {title} {enableConfirm} {confirmCallback} {closeHandler} {closeConfirm}>
    <svelte:component this={contentComponent} bind:this={instance} onTitleChange={setTitle} onConfirmChange={setConfirmEnable} {...dialogParams}></svelte:component>
</Dialog>