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
    export let textValue: string = '';
    export const focus = () => {
        editor.focus();
    }

    let regex: RegExp;

    let editor: any;

    const handleBlurEvent = (e: FocusEvent) => {
        isFocused = false;
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


    let composing: boolean = false;
    let currentText: string;
    let isFocused = false;

    const handlePaste = (event: ClipboardEvent) => {
        const pasteData = event.clipboardData?.getData('text') || '';
        if (!checkNewInputText(pasteData)) {
            event.preventDefault();
        }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
        // 检查是否是全角字符或中文等（非 ASCII）
        if (/[^\x00-\x7F]/.test(event.key)) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        // 保留 ctrl 等特殊键
        const allowKeys = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
        if (allowKeys.includes(event.key)) return;

        // 如果是数字或小数点、负号等，可允许（你可根据 precision 精度自定义更严格规则）
        if (/[\d\.\-]/.test(event.key)) return;

        // 拦截其他非法字符
        event.preventDefault();
        event.stopPropagation();
    };
    const handleInput = () => {
        if (composing) return; // 正在输入拼音等，忽略

        // 校验是否为合法数字字符串
        const raw = editor.value;
        if (/[^\x00-\x7F]/.test(raw)) {
            // 包含中文、日文、韩文、全角字符、表情等
            editor.value = textValue; // 恢复输入前状态
            return;
        }
        if (regex.test(raw)) {
            const parsed = parseFloat(raw);
            if (!isNaN(parsed) && utils.isValidNumber(parsed, precision, allowNegative, max, min)) {
                value = parsed;
            }
        }

        // 不合法时可以不更新 value，只更新 textValue（允许用户继续输）
        textValue = raw;
    }


    const handleCompositionStart = (event: CompositionEvent) => {
        currentText = editor.value;
        composing = true;
    };

    const handleCompositionEnd = (event: CompositionEvent) => {
        composing = false;
        if (/[^\x00-\x7F]/.test(editor.value)) {
            editor.value = currentText; // 恢复输入前内容
            textValue = currentText;
        } else {
            handleInput(); // 正常输入
        }
    };


    $: if (!isFocused) {
        textValue = value == null ? '' : utils.formatNumber(value, precision);
    }

    $: regex = new RegExp(utils.getNumberRegex(precision, allowNegative));

</script>
<input class="number-editor" bind:this={editor} type="text" {readonly} {style} {disabled} placeholder={readonly || disabled ? '' : placeholder}
       bind:value={textValue}
       on:focus={() => isFocused = true}
       on:blur={handleBlurEvent}
       on:compositionstart={handleCompositionStart}
       on:input={handleInput}
       on:keydown={handleKeyDown}
       on:compositionend={handleCompositionEnd} on:paste={handlePaste}/>