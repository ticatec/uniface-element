<script lang="ts">

    import {DisplayMode} from "../common/DisplayMode";
    import Popover from "$lib/common/Popover.svelte";
    import iconLoading from "$lib/assets/loading.gif";
    import OptionsBox from "./OptionsBox.svelte";
    import {tick} from "svelte";

    type OnSelectOption = (item: any) => Promise<Array<any>>;

    export let variant: '' | 'plain' | 'outlined' | 'filled' = '';
    export let disabled: boolean = false;
    export let readonly: boolean = false;
    export let compact: boolean = false;
    export let mandatory: boolean = false;
    export let value: any = null;
    export let keyField: string = "code";
    export let textField: string = "text";
    export let abbrField: string = 'abbr';
    export let style: string = '';
    export let placeholder: string = "";
    export let displayMode: DisplayMode = DisplayMode.Edit;
    export let emptyText: string | null = null;
    export let text: string | null = null;
    export let nodes: Array<Array<any>> = [];
    export let menu$height: number = 150;
    export let onSelect: OnSelectOption;
    export let box$style: string = "";


    let oldValue = value;
    let divPanel: any;
    let selectedItems:Array<any> = [];
    let busy: boolean = false;

    const selectOption = (level: number) => async (item: any) => {
        console.log("当前选中：", level, item);
        let newArr = nodes.slice(0, level+1)
        if (level == 0) {
            selectedItems = [item];
        } else {
            selectedItems = [...selectedItems.slice(0, level), item];
        }
        busy = true;
        let list = await (onSelect?.(item));
        busy = false;
        if (list && list.length>0) {
            nodes = [...newArr, list];
            await tick();
            contentPanel.scrollLeft = contentPanel.scrollWidth;
        } else {
            showPopup = false;
        }
    }

    let showPopup = false;
    let mh;
    let contentPanel: any;


    $: if (oldValue != value) {
        oldValue = value;
    }

    $: mh = `height: ${menu$height}px`;

    $: text = selectedItems && selectedItems.length > 0 ?  selectedItems[selectedItems.length-1][textField] : emptyText??'';

</script>

{#if displayMode===DisplayMode.View}
    <div class="uniface-display-fieldt">
        <span>{text??''}</span>
    </div>
{:else }
    <div class="uniface-option-select" class:compact {style} bind:this={divPanel}>
        <div class="uniface-common-editor {variant}" >
            <div class="option-field">
                {#if readonly}
                    <input style="width: 100%" readonly value={text}/>
                {:else}
                    <input style="width: 100%" on:click={()=>{showPopup = true}} {placeholder}
                           class="text-editor" readonly value={text??emptyText} {disabled} on:blur on:focus/>
                {/if}
            </div>
            {#if !disabled && !readonly}
                {#if !mandatory && value != null}
                    <i class="option-action uniface-icon-x-circle" aria-hidden="true" on:click={()=>{value=null;text=null}}></i>
                {/if}
                <i class="option-dropdown uniface-icon-chevron-down" aria-hidden="true" on:click={()=>{showPopup = true; nodes=[nodes[0]]}}></i>
            {/if}
        </div>
    </div>
    {#if showPopup}
        <Popover target={divPanel} on:close={()=>{showPopup=false}}>
            <div class="cascade-options-popover" style={mh}>
                <div style="width: 100%; height: 100%; position: relative">
                    <div bind:this={contentPanel} style="width: 100%; height: 100%; display: flex; flex-direction: row; overflow: auto">
                        {#each nodes as node, idx}
                            <OptionsBox options={node} {keyField} textField={abbrField} {box$style} onSelect={selectOption(idx)}
                                        selectedItem={selectedItems[idx]}/>
                        {/each}
                    </div>
                    {#if busy}
                        <div style="position: absolute; top: 0; bottom: 0; left: 0; right: 0; background-color: #e1e1e110;">
                            <div style="position: relative; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center">
                                <div style="width: 100px; margin: 0 auto; text-align: center; background-color: #f0f0f0; border-radius: 4px; padding: 8px 12px; box-sizing: border-box;">
                                    <img src={iconLoading} alt="" width="32" height="32"/>
                                </div>
                            </div>
                        </div>
                    {/if}

                </div>
            </div>
        </Popover>
    {/if}
{/if}