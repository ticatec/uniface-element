<script lang="ts">

    import utils from "$lib/common/utils";
    import {DisplayMode} from "$lib/common/DisplayMode";
    import CheckBox from "$lib/checkbox";
    import type {OnChangeHandler} from "$lib/common/OnChangeHandler";

    export let disabled: boolean = false;
    export let readonly: boolean = false;
    export let style: string = "";
    export let value: string | number;
    export let bitBase: boolean = false;
    export let options: Array<any>;
    export let keyField: string = "code";
    export let textField: string = "text";
    export let delimiter: string = ';';
    export let displayMode: DisplayMode = DisplayMode.Edit;
    export let item$style: string = '';
    export let disabledOptions: Array<string> = [];
    export let hideOptions: Array<string> = [];
    export let variant: '' | 'plain' | 'outlined' | 'filled' = '';
    export let compact: boolean = false;
    export let onChange: OnChangeHandler<string | number> = null as unknown as OnChangeHandler<string | number>;

    let textValue: string;

    let selectedList: Array<any> = [];

    const generateText = (list: Array<string>) => {
        if (list.length > 0) {
            let arr = [];
            for (let item of options) {
                if (list.indexOf(item[keyField]) > -1) {
                    arr.push(item[textField]);
                }
            }
            textValue = arr.length == 0 ? '' : arr.join(delimiter);
        } else {
            textValue = '';
        }
    }



    const handleCheckboxChange = (key: string) => async (checked: boolean) => {
        if (checked) {
            selectedList.push(key);
        } else {
            let idx = selectedList.findIndex(el => el == key);
            if (idx > -1) {
                selectedList.splice(idx, 1);
            }
        }
        if (bitBase) {
            let v = 0;
            for (let i=0; i<options.length; i++) {
                if (selectedList.indexOf(options[i][keyField]) > -1) {
                    v += (1 << i);
                }
            }
            value = v;
        } else {
            value = selectedList.length==0 ?  '' : selectedList.join(delimiter)
        }
        onChange?.(value);
    }

    const generateSelectedListViaBits = (v: number): void => {
        value = Math.round(v??0);
        let s = [];
        let idx=0;
        while (v > 0) {
            if ((v % 2) == 1) {
                s.push(options[idx][keyField]);
            }
            idx++;
            v = v >> 1;
        }
        selectedList = s;
    }

    const generateSelectedListViaString = (v: string): void => {
        value = v;
        selectedList = (value == null || value.toString().trim() == '') ? [] : value.split(delimiter);
    }

    $: bitBase ? generateSelectedListViaBits(utils.getNumberValue(value)??0) : generateSelectedListViaString(utils.getStringValue(value)??'');
    $: generateText(selectedList);


</script>
{#if displayMode === DisplayMode.View}
    <div class="uniface-display-field">
        <span>{textValue}</span>
    </div>
{:else}
    <div class="uniface-group-box {variant}" {style} class:compact class:disabled>
        {#each options as op}
            {#if (hideOptions??[]).indexOf(op[keyField]) === -1}
                <CheckBox {compact} {readonly} disabled={disabled || disabledOptions.indexOf(op[keyField]) > -1}
                      label={op[textField]} style={item$style} value={selectedList.indexOf(op[keyField]) > -1}
                      onChange={handleCheckboxChange(op[keyField])}/>
            {/if}
        {/each}
    </div>
{/if}

