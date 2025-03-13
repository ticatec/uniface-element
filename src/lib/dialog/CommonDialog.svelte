<script lang="ts">

    import Dialog from "./Dialog.svelte";
    import type {ButtonAction, ButtonActions} from "$lib/action-bar";
    import type {DialogCloseConfirm, MouseClickHandler} from "$lib";
    import i18n from "@ticatec/i18n";

    export let title: string;
    export let closeConfirm: DialogCloseConfirm | null = null;
    export let content$style: string = '';
    export let closeHandler: () => void;
    export let enableConfirm: boolean = true;
    export let confirmHandler: (()=>Promise<void>) | null = null;
    export let confirmText: string | null = null;

    let confirmAction: ButtonAction = {
        label: confirmText??i18n.getText('uniface.btnConfirm', 'OK'),
        type: "primary",
        disabled: enableConfirm,
        handler: async ()=> {
            let result = await confirmHandler?.();
            if (result && result==true) { //返回true自动关闭
                closeHandler?.();
            }

        }
    }

    let actions: ButtonActions = [confirmAction];

    $: {
        confirmAction.disabled = confirmHandler==null && !enableConfirm;
        actions = [...actions];
    }

</script>

<Dialog {title} {content$style} {closeHandler} {actions} {closeConfirm}>
    <slot></slot>
</Dialog>
