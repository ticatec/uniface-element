<script lang="ts">
    import {fade} from "svelte/transition";
    import type {DialogCloseConfirm} from "$lib/dialog/DialogCloseConfirm";
    import ActionBar, {type ButtonAction, type ButtonActions} from "$lib/action-bar";
    import i18n from "@ticatec/i18n";
    import {getContext, onMount} from "svelte";
    import {ModalResult, type OnClose} from "./ModalResult";

    export let title: string;
    export let width: string = 'unset';
    export let height: string = 'unset';
    export let actions: ButtonActions | null = null;
    export let closeConfirm: DialogCloseConfirm | null = null;
    export let content$style: string = '';

    export let closeAction: ButtonAction | null = null;
    export let onClose: OnClose | null = null;

    export let dialog$style: string = "";

    const closeDialog = getContext<() => void>('closeDialog');

    export const close = async (result: ModalResult) => {
        let confirm = closeConfirm && result == ModalResult.Cancel ? await closeConfirm() : true;
        if (confirm) {
            console.log('关闭窗口')
            closeDialog();
            onClose?.(result);
        }
    }

    let dialogActions: ButtonActions;

    let top: number = 0;
    let left: number = 0;

    let startMove: boolean = false;

    const handleMouseDown = () => {
        startMove = true;
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (startMove) {
            top = top + e.movementY;
            left = left + e.movementX;
        }
    }

    const handleMouseUp = () => {
        startMove = false;
    }

    onMount(async () => {
        closeAction = closeAction ?? {
            label: i18n.getText('uniface.btnClose', 'Close'),
            type: 'secondary'
        };
        closeAction.handler = () => close(ModalResult.Cancel);
    })

    const wrapActions = () => {
        let wa: ButtonActions = [];
        if (actions) {
            actions.forEach(action => {
                if (action == null) {
                    wa.push(null)
                } else {
                    wa.push({
                        ...action, handler: async (event: MouseEvent) => {
                            let result = await action.handler?.(event);
                            if (result) {
                                await close(ModalResult.Ok)
                            }
                        }
                    })
                }
            })
        }
        wa.push(closeAction);
        return wa;
    }

    $:  dialogActions = actions ? wrapActions() : [closeAction];


</script>

<div class="uniface-dialog" style="{startMove ? 'cursor: move' : ''}" transition:fade={{duration: 500}} aria-hidden="true"
     on:mouseleave={handleMouseUp} on:mousemove={handleMouseMove}>
    <div>
        <div class="uniface-dialog-box" style="{dialog$style}; top: {top}px; left: {left}px; width: {width}; height: {height}; ">
            <div class="title-bar" on:mousedown={handleMouseDown} on:mouseup={handleMouseUp} aria-hidden="true">
                <div style="flex: 1 1 auto"><span>{title ?? 'New window'}</span></div>
                <div style="flex: 0 0 auto; padding-left: 12px">
                    <i class="icon_google_clear dialog-action-button" aria-hidden="true" on:click={()=>close(ModalResult.Cancel)}></i>
                </div>
            </div>
            <div class="dialog-content" style={content$style}>
                <slot></slot>
            </div>
            <div class="control-bar">
                <ActionBar buttons={dialogActions}/>
            </div>
        </div>
    </div>
</div>
