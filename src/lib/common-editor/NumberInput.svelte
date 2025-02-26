<script lang="ts">

    import type {OnChangeHandler} from "$lib/common/OnChangeHandler";
    import utils from "$lib/common/utils";
    import {tick} from "svelte";

    export let disabled: boolean = false;
    export let readonly: boolean = false;
    export let style: string = '';
    export let value: number | null;
    export let precision: number | null = null;
    export let placeholder: string;
    export let allowNegative: boolean = false;
    export let max: number | null = null;
    export let min: number | null = null;
    export let onChange: OnChangeHandler<number | null> = null as unknown as OnChangeHandler<number | null>;

    export const setFocus = () => {
        editor.focus();
    }

    const ctrlKeys: Array<string> = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

    let regex: RegExp;

    let editor: any;

    const handleBlurEvent = (e: FocusEvent) => {
        if (!readonly) {
            value = parseFloat(textValue);
            if (isNaN(value)) {
                value = null;
            }
            if (value != null) {
                if (min != null && value != null && value < min) {
                    value = min;
                }
                if (max != null && value != null && value > max) {
                    value = max;
                }
                textValue = utils.formatNumber(value, precision);
            }
            onChange?.(value);
        } else {
            e.stopPropagation();
        }
    }

    const checkNewInputText = (s: string): boolean => {
        const currentValue = editor.value;
        const cursorStart = editor.selectionStart; // 光标起始位置
        const cursorEnd = editor.selectionEnd; // 光标结束位置
        let resultingString = currentValue.slice(0, cursorStart) + s + currentValue.slice(cursorEnd);
        if (/[^0-9.\-]/.test(resultingString)) {
            return false;
        } else {
            return regex.test(resultingString) && utils.isValidNumber(parseFloat(resultingString), precision, allowNegative, max, min);
        }
    }

    const handleKeyDown = async (event: KeyboardEvent) => {
        let accept = (ctrlKeys.indexOf(event.key) > -1 && !composing) || checkNewInputText(event.key);
        // if (!accept) {
        //     accept = checkNewInputText(event.key)
        // }
        if (!accept) {
            event.stopPropagation();
            event.preventDefault();
        } else {
            await tick();
        }
    }

    let composing: boolean = false;
    let currentText: string;

    const handlePaste = (event: ClipboardEvent) => {
        const pasteData = event.clipboardData?.getData('text') || '';
        if (!checkNewInputText(pasteData)) {
            event.preventDefault();
        }
    }


    const handleCompositionStart = (event: CompositionEvent) => {
        currentText = editor.value;
        composing = true;
    };

    const handleCompositionEnd = (event: CompositionEvent) => {
        composing = false;
        editor.value = currentText;
    };


    let textValue: string = utils.formatNumber(value, precision);

    $: textValue = value == null ? '' : utils.formatNumber(value, precision);
    $: regex = new RegExp(utils.getNumberRegex(precision, allowNegative));

</script>
<input bind:this={editor} type="text" {readonly} {style} {disabled} placeholder={readonly || disabled ? '' : placeholder} bind:value={textValue}
       on:keydown={handleKeyDown} on:focus on:blur={handleBlurEvent} on:compositionstart={handleCompositionStart}
       on:compositionend={handleCompositionEnd} on:paste={handlePaste}/>