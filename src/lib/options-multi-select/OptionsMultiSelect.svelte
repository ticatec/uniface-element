<script lang="ts">

    import {DisplayMode} from "../common/DisplayMode";
    import CheckBox from "$lib/checkbox/CheckBox.svelte";
    import CommonPicker from "$lib/common/CommonPicker.svelte";
    import utils from "$lib/common/utils";
    import type {OnChangeHandler} from "$lib/common/OnChangeHandler";
    import Tag from "$lib/tag";

    export let style: string = "";
    export let variant: '' | 'plain' | 'outlined' | 'filled' = '';
    export let compact: boolean = false;
    export let disabled: boolean = false;
    export let readonly: boolean = false;
    export let menu$height: number = 0;
    export let value: string = '';
    export let delimiter: string = ';';
    export let options: Array<any> = [];
    export let keyField: string = "code";
    export let textField: string = "text";
    export let placeholder: string = '';
    export let emptyText: string = '';
    export let disableOptions: Array<string> = [];
    export let hideOptions: Array<string> = [];
    export let displayMode: DisplayMode = DisplayMode.Edit;
    export let onChange: OnChangeHandler<Array<string>> = null as unknown as OnChangeHandler<Array<string>>;
    export let tagColor: string = '';
    export let tagVariant: 'borderless' | 'border' | 'round' = 'border';


    let selectedList: Array<string> = [];

    let textValue: string;
    let mh;


    const handleChange = (key: string) => (checked: boolean) => {
        if (checked) {
            if (selectedList.indexOf(key) < 0) {
                selectedList.push(key);
                selectedList = [...selectedList];
                value = selectedList.length > 0 ? selectedList.join(delimiter) : '';
            }
        } else {
            removeSelectCode(key);
        }
        onChange?.(selectedList);
        editor.focus();

    }

    const getOptionItem = (code: string) => {
        let item = options.find(el => el[keyField] == code);
        return item == null ? '' : item[textField];
    }

    const removeSelectCode = (code: string) => {
        let pos = selectedList.findIndex(sc => sc == code);
        if (pos > -1) {
            selectedList.splice(pos, 1);
            selectedList = [...selectedList];
            value = selectedList.length > 0 ? selectedList.join(delimiter) : '';
        }
    }

    const generateTextValue = (v: Array<any>) => {
        let s = [];
        for (let item of options) {
            if (v.indexOf(item[keyField]) > -1) {
                s.push(item[textField]);
            }
        }
        return s.length == 0 ? '' : s.join(delimiter);
    }

    const removeOption = (code: string) => (e: MouseEvent) => {
        removeSelectCode(code);
        e.stopPropagation();
        e.preventDefault();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key=='Tab') {
            showPopup = false;
        }
    }

    const cleanData = () => {
        value = '';
        onChange?.([])
    }

    let showPopup: boolean = false;

    $: selectedList = utils.isEmpty(value) ? [] : ((value ?? '').toString()).split(delimiter);
    $: mh = `height: ${menu$height > 0 ? menu$height + 'px' : 'auto'}`;
    $: textValue = generateTextValue(selectedList);

    let editor: any;

    $: if (showPopup) {
        editor.focus();
    }

</script>

<CommonPicker {displayMode} {variant} {style} {compact} className="multiple" dropDownIcon="uniface-icon-chevron-down"
              bind:showPopup canClean={value!=null} autoFit clean={cleanData} {textValue} {readonly} {disabled}>

    <div class="option-field" aria-hidden="true" on:click={()=>{showPopup = true}}>
        <input bind:this={editor} style="position: absolute; left: 1px; width: 1px; visibility: hidden" on:keydown={handleKeyDown}/>
        <div style="width: 100%; overflow: hidden; display: flex; flex-direction: row; gap: 6px">
            {#if selectedList.length > 0 }
                {#each selectedList as code}
                    <Tag style="flex-shrink: 0" color={tagColor} variant={tagVariant} text={getOptionItem(code)}
                         removable={!readonly && !disabled} removeHandler={removeOption(code)}/>
                {/each}
            {:else if emptyText != null || placeholder != null}
                <div class:readonly={readonly || disabled}>
                    <span>{emptyText ?? placeholder}</span>
                </div>
            {/if}
        </div>
    </div>
    <div class="options-popover" style={mh} slot="popup-panel">
        {#each options as op}
            {#if hideOptions.indexOf(op[keyField]) < 0}
                <CheckBox style="width: 100%" label={op[textField]} onChange={handleChange(op[keyField])}
                          value={selectedList.indexOf(op[keyField])>-1}
                          disabled={disableOptions.indexOf(op[keyField])>-1}/>
            {/if}
        {/each}
    </div>
</CommonPicker>
