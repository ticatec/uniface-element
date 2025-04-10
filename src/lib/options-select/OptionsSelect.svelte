<script lang="ts">

    import {DisplayMode} from "../common/DisplayMode";
    import type {OnChangeHandler} from "$lib/common/OnChangeHandler";
    import CommonPicker from "$lib/common/CommonPicker.svelte";

    export let variant: '' | 'plain' | 'outlined' | 'filled' = '';
    export let disabled: boolean = false;
    export let readonly: boolean = false;
    export let compact: boolean = false;
    export let mandatory: boolean = false;
    export let value: any = null;
    export let options: Array<any>;
    export let keyField: string = "code";
    export let textField: string = "text";
    export let menu$height: number = 0;
    export let style: string = '';
    export let placeholder: string = "";
    export let disableOptions: Array<string> = [];
    export let hideOptions: Array<string> = [];
    export let displayMode: DisplayMode = DisplayMode.Edit;
    export let itemRender: any = null;
    export let emptyText: string = null as unknown as string;
    export let onChange: OnChangeHandler<any> = null as unknown as OnChangeHandler<any>;


    let textValue: string;
    let editor: any;
    let oldValue = value;
    let showPopup: boolean = false;
    let mh;

    const generateText = (v: string): string => {
        let item = (options || []).find(el => el[keyField] == value);
        return item == null ? (emptyText ?? '') : item[textField];
    }

    const openPopup = () => {
        showPopup = true;
    }

    const handleItemClick = (data: any) => () => {
        if (disableOptions.indexOf(data[keyField]) < 0) {
            value = data[keyField];
            editor.focus();
            showPopup = false;
        }
    }

    const cleanData = () => {
        value = null;
    }

    $: textValue = generateText(value);

    $: mh = `height: ${menu$height > 0 ? menu$height + 'px' : 'auto'}`;

    $: if (value != oldValue) {
        onChange?.(value);
        oldValue = value;
    }

    $: if (showPopup) {
        editor.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key=='Tab') {
            showPopup = false;
        }
    }

</script>

<CommonPicker {displayMode} {variant} {style} {compact} dropDownIcon="icon_google_arrow_drop_down"
              bind:showPopup canClean={!mandatory && value!=null} autoFit clean={cleanData} {textValue} {readonly} {disabled}>

    <input style="width: 100%" bind:this={editor} on:click={openPopup} {placeholder} readonly
           class="text-editor" bind:value={textValue} on:blur on:focus on:keydown={handleKeyDown}/>

    <div class="options-popover" style={mh} slot="popup-panel">
        {#each options as op}
            {#if hideOptions.indexOf(op[keyField]) < 0}
                {#if itemRender != null}
                    <svelte:component this={itemRender.component} {...itemRender.props} item={op} disabled={disableOptions.indexOf(op[keyField])>-1}
                                      on:click={handleItemClick(op)}/>
                {:else}
                    <div class="option-item" class:disabled={disableOptions.indexOf(op[keyField])>-1} aria-hidden="true"
                         on:click={handleItemClick(op)}>
                        <span>{op[textField]}</span>
                    </div>
                {/if}
            {/if}
        {/each}
    </div>
</CommonPicker>
