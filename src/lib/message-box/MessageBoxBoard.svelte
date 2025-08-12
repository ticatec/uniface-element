<script lang="ts">

    import {onDestroy, onMount} from "svelte";
    import {initialize, ConfirmButtons, ModalResult} from "./IMessageBox";
    import Button from "../button";
    import {fade} from "svelte/transition";
    import utils from "$lib/common/utils";

    export let appTitle: string = null as unknown as string;

    let board: any;
    let visible: boolean = false;
    let resolve: any = null;
    let title: string;
    let message: string;
    let type: string;
    let escapeHTML: boolean = true;
    let buttons: Array<any> | null;
    let iconType: string;

    let show = (_message: string, _title: string, _escapeHTML: boolean = false): Promise<void> => {
        return showMessageBox(_message, null, _title, null, _escapeHTML)
    }

    let showConfirm = (_message: string, _title: string, _escapeHTML: boolean = false, type: 'info' | 'warning' = 'info'): Promise<any> => {
        return showMessageBox(_message, ConfirmButtons, _title, type, _escapeHTML)
    }

    let showMessageBox = (_message: string, _buttons: Array<any> | null, _title: string, _type: string | null, _escapeHTML: boolean = true): Promise<any> => {
        console.log('显示消息框')
        if (!visible) {
            top = 0;
            left = 0;
            startMove = false;
            message = _message;
            title = _title ?? appTitle;
            escapeHTML = _escapeHTML != false;
            if (_buttons) {
                _buttons.forEach(button => {
                    button.label = button.text
                });
            }
            buttons = _buttons;
            iconType = _type == null ? 'icon_google_warning' : _type == 'info' ? 'icon_google_info' : 'icon_google_help';
            type = _type ?? "info";
            visible = true;
            return new Promise<any>(r => {
                resolve = r
            });
        } else {
            return new Promise<any>((r, reject) => {
                reject(new Error('No message box slot.'))
            });
        }
    }

    onMount(() => {
        document.body.appendChild(board);
        initialize(show, showConfirm);
        return () => {
            board && board.remove();
        };
    });

    onDestroy(() => {
        board && board.remove();
    });

    let top: number = 0;
    let left: number = 0;

    let startMove: boolean = false;

    const handleMouseDown = (e: MouseEvent) => {
        startMove = true;
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (startMove) {
            top = top + e.movementY;
            left = left + e.movementX;
        }
    }

    const handleMouseUp = (e: MouseEvent) => {
        startMove = false;
    }

    const handleButtonClick = (mr: ModalResult) => (e: MouseEvent) => {
        if (resolve != null) {
            resolve(mr);
            resolve = null;
            visible = false;
        }
    }

    const handleCloseClick = (e: MouseEvent) => {
        if (resolve != null) {
            resolve(ModalResult.MR_CANCEL);
            resolve = null;
            visible = false;
        }
    }


</script>

<div bind:this={board} class="uniface-message-board" style="display: {visible ? 'block' : 'none'}">
    {#if visible}
        <div style={startMove ? 'cursor: move' : ''} on:mousemove={handleMouseMove} aria-hidden="true">
            <div class="uniface-message-box" transition:fade={{duration: 500}}>
                <div style="top: {top}px; left: {left}px">
                    <div class="title-bar" aria-hidden="true" on:mousedown={handleMouseDown} on:mouseup={handleMouseUp}>
                        <div>
                            <i class="icon_google_clear dialog-action-button" aria-hidden="true" on:click={handleCloseClick}></i>
                        </div>
                    </div>
                    <div class="box-content" style="min-height: 40px">
                        {#if iconType != null}
                            <div class="box-icon {type}">
                                <i style="font-size: 56px" class={iconType}></i>
                            </div>
                        {/if}
                        <div style="flex: 1 1 auto; display: flex; flex-direction: column; justify-content: center">
                            {#if !utils.isEmpty(title)}
                                <div class="message-topic">
                                    <span>{title}</span>
                                </div>
                            {/if}
                            <div>
                                {#if escapeHTML}
                                    <span>{@html message}</span>
                                {:else }
                                    <span>{message}</span>
                                {/if}
                            </div>
                        </div>
                    </div>
                    <div class="control-bar">
                        {#if buttons && buttons.length > 0}
                            {#each buttons as button}
                                <Button style="margin: 0 4px; width: 90px" type={button.type??''} label={button.label}
                                        onClick={handleButtonClick(button.result)}/>
                            {/each}
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>
