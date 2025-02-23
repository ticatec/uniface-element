<script lang="ts">

    import {fade} from "svelte/transition";
    import Button from "../button";
    import type {DialogCloseConfirm} from "$lib/dialog/DialogCloseConfirm";



    export let title: string = null as unknown as string;
    export let confirmCallback: any = null;
    export let closeConfirm: DialogCloseConfirm;
    export let content$style: string = '';
    export let enableConfirm: boolean = true;
    export let canClose: boolean = true;
    export let closeHandler: () => void;


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

    const handleDblClick = (e: MouseEvent) => {
        left = 0;
        top = 0;
        e.stopPropagation();
        e.preventDefault();
    }

    const doConfirm = async () => {
        if (await confirmCallback()) {
            closeHandler?.();
        }
    }

    const handleCloseClick = async (e: MouseEvent) => {
        let confirm = closeConfirm ? await closeConfirm() : true;
        if (confirm) {
            closeHandler?.();
        }
    }


    //$:dialogCss = '';//`width: ${width}; height: ${height ?? "unset"}; max-width: ${maxWidth ?? 'unset'}; max-height: ${maxHeight ?? 'unset'}`;

</script>

<div class="uniface-dialog" style="{startMove ? 'cursor: move' : ''}" transition:fade={{duration: 500}} aria-hidden="true"
     on:mouseleave={handleMouseUp} on:mousemove={handleMouseMove}>
    <div>
        <div class="uniface-dialog-box" style="top: {top}px; left: {left}px">
            <div class="title-bar" on:mousedown={handleMouseDown} on:mouseup={handleMouseUp} aria-hidden="true" on:dblclick={handleDblClick}>
                <div style="flex: 1 1 auto"><span>{title ?? 'New window'}</span></div>
                <div style="flex: 0 0 auto; padding-left: 12px">
                    <i class="uniface-icon-x dialog-action-button" aria-hidden="true" on:click={handleCloseClick}></i>
                </div>
            </div>
            <div class="dialog-content" style={content$style}>
                <slot></slot>
            </div>
            <div class="control-bar">
                <slot name="control-bar">
                    {#if confirmCallback}
                        <div style="flex: 0 0 auto">
                        <Button type="primary" disabled={!enableConfirm} size="mini" label="确认" onClick={doConfirm}/>
                        </div>
                    {/if}
                    {#if canClose}
                        <div style="flex: 0 0 auto; margin-left: 8px">
                            <Button type="default" size="mini" label="关闭" onClick={handleCloseClick}></Button>
                        </div>
                    {/if}
                </slot>
            </div>
        </div>
    </div>
</div>
