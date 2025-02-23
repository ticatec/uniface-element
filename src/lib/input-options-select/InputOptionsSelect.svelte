<script lang="ts">

    import {DisplayMode} from "../common/DisplayMode";
    import Popover from "../common/Popover.svelte";
    import type {OnChangeHandler} from "$lib/common/OnChangeHandler";

    type OnInputHandler = (s: string) => void;

    export let variant: '' | 'plain' | 'outlined' | 'filled' = '';
    export let disabled: boolean = false;
    export let readonly: boolean = false;
    export let compact: boolean = false;
    export let text: string = '';
    export let value: any = null;
    export let options: Array<any> = [];
    export let keyField: string = "code";
    export let textField: string = "text";
    export let menu$height: number = 0;
    export let style: string = '';
    export let placeholder: string = "";
    export let displayMode: DisplayMode = DisplayMode.Edit;
    export let itemRender: any = null;
    export let onChange: OnChangeHandler<any> = null as unknown as OnChangeHandler<any>;
    export let onInput: OnInputHandler = null as unknown as OnInputHandler;

    let editor: any;
    let inputText: string;
    let oldValue: any = value;

    const handleItemClick = (data: any) => () => {
        value = data[keyField];
        text = data[textField];
        if (value != oldValue) {
            onChange?.(value);
        }
        editor.focus();
        showPopup = false;
    }

    let composing: boolean = false;

    const handleInput = () => {
        if (composing == false) {
            text = inputText;
            value = null;
            onInput?.(text);
        }
    };
    const handleCompositionStart = (event: CompositionEvent) => {
        composing = true;
    };

    const handleCompositionEnd = (event: CompositionEvent) => {
        composing = false;
        text = inputText;
        value = null;
        onInput?.(text);
    };

    const handleBlurEvent = (e: FocusEvent) => {
        if (value == null) {
            text = '';
        }
    }

    const clean = () => {
        value = null;
        text = '';
        onChange?.(value);
    }

    let showPopup: boolean = false;
    let divPanel;

    let mh;

    $: mh = `height: ${menu$height > 0 ? menu$height + 'px' : 'auto'}`;

    $: showPopup = options && options.length > 0;

    $: inputText = text;


</script>
<!-- 待解决浏览模式显示的问题 -->
<div class="uniface-option-select" class:compact {style} bind:this={divPanel}>
    <div class="uniface-common-editor {variant}">
        <div class="option-field">
            {#if displayMode === DisplayMode.View}
                <input style="width: 100%" class="display-only" readonly value={text}/>
            {:else if readonly}
                <input style="width: 100%" readonly value={text}/>
            {:else}
                <input style="width: 100%" bind:this={editor} {placeholder}
                       class="text-editor" bind:value={inputText} {disabled}
                       on:input={handleInput}
                       on:compositionstart={handleCompositionStart} on:compositionend={handleCompositionEnd}
                       on:blur={handleBlurEvent} on:focus/>
            {/if}
        </div>
        {#if !disabled && !readonly}
            {#if text != null && text.trim().length > 0}
                <i class="option-action uniface-icon-x-circle" aria-hidden="true" on:click={clean}></i>
            {/if}
        {/if}
    </div>
    {#if showPopup}
        <Popover target={divPanel} on:close={()=>{showPopup=false}}>
            <div class="options-popover" style={mh}>
                {#each options as op}
                    {#if itemRender != null}
                        <svelte:component this={itemRender} item={op}
                                          on:click={handleItemClick(op)}/>
                    {:else}
                        <div on:click={handleItemClick(op)} aria-hidden="true">
                            <span>{op[textField]}</span>
                        </div>
                    {/if}
                {/each}
            </div>
        </Popover>
    {/if}
</div>