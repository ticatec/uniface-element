<script lang="ts">

    import {DisplayMode} from "../common/DisplayMode";
    import iconLoading from "$lib/assets/loading.gif";
    import OptionsBox from "./OptionsBox.svelte";
    import {tick} from "svelte";
    import CommonPicker from "$lib/common/CommonPicker.svelte";
    import type {OnChangeHandler} from "$lib/common/OnChangeHandler";

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
    export let text: string = '';
    export let nodes: Array<Array<any>> = [];
    export let menu$height: number = 150;
    export let onSelect: OnSelectOption;
    export let box$style: string = "";
    export let onChange: OnChangeHandler<any> = null as unknown as OnChangeHandler<any>;

    let oldValue = value;
    let selectedItems: Array<any> = [];
    let busy: boolean = false;

    const selectOption = (level: number) => async (item: any) => {
        value = item?.[keyField];
        let newArr = nodes.slice(0, level + 1)
        if (level == 0) {
            selectedItems = [item];
        } else {
            selectedItems = [...selectedItems.slice(0, level), item];
        }
        busy = true;
        let list = await (onSelect?.(item));
        busy = false;
        if (list && list.length > 0) {
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

    const openPopup = () => {
        showPopup = true;
    }

    $: if (oldValue != value) {
        oldValue = value;
        onChange?.(value)
    }

    $: mh = `height: ${menu$height}px`;

    $: text = selectedItems && selectedItems.length > 0 ? selectedItems[selectedItems.length - 1][textField] : emptyText ?? '';

    const cleanData = () => {
        value = null;
        text = '';
        onChange?.(null)
    }

    let editor: any;

    $: if (showPopup) {
        editor.focus();
    }
</script>


<CommonPicker {displayMode} {variant} {style} {compact} className="multiple" dropDownIcon="uniface-icon-chevron-down"
              bind:showPopup canClean={!mandatory && text!=null} autoFit clean={cleanData} textValue={text??''} {readonly} {disabled}>
    <input style="width: 100%" bind:this={editor} on:click={openPopup} {placeholder}
           class="text-editor" bind:value={text} on:blur on:focus/>
    <div class="cascade-options-popover" style={mh} slot="popup-panel">
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
</CommonPicker>

<!--{/if}-->