<script lang="ts">

    import {DisplayMode} from "../common/DisplayMode";
    import CommonEditor from "../common-editor/CommonEditor.svelte";
    import type {OnChangeHandler} from "$lib/common/OnChangeHandler";
    import {tick} from "svelte";

    const excludeAttrs = ['readonly', 'disabled', 'required', "form", "wrap", "type"]

    export let disabled: boolean = false;
    export let readonly: boolean = false;
    export let mandatory: boolean = false;
    export let precision: 'M' | 'S' = 'M';
    export let variant: '' | 'plain' | 'outlined' | 'filled' = '';
    export let compact: boolean = false;
    export {className as class};
    export let style: string = '';
    export let value: number = null as unknown as number;
    export let suffix: string = '';
    export let prefix: string = '';
    export let displayMode: DisplayMode = DisplayMode.Edit;
    export let onChange: OnChangeHandler<number> = null as unknown as OnChangeHandler<number>;

    let className: string = '';
    let editor: any;
    let textValue: string;
    let oldValue: any = value;

    let cursorIndex = 0; // 当前光标位置

    let lastPos = precision == "M" ? 4 : 7;

    let emptyStr: string;

    $: emptyStr = precision == 'M' ? '__:__' : '__:__:__';

    const handleFocusEvent = (e: FocusEvent) => {
        if (!readonly) {
            editor.setSelectionRange(cursorIndex, cursorIndex + 1);
        }
    }

    const toTimeText = (v: number): string => {
        if (v == null) {
            let s = emptyStr;
            return mandatory ? s.replaceAll('_', '0') : s;
        } else {
            let mins = Math.floor(value);
            let hh = Math.floor(mins / 60);
            let mm = mins % 60;
            let ss = Math.floor((value - mins) * 100) % 60;
            let time = String(hh).padStart(2, "0") + ":" + String(mm).padStart(2, "0");
            if (precision == "S") {
                time += ":" + String(ss).padStart(2, "0");
            }
            return time;
        }
    }


    const handleBlurEvent = (e: FocusEvent) => {
        if (!readonly) {
            if (/^[_:]*$/.test(textValue)) {
                value = null as unknown as number;
            } else {
                value = toTimeValue();
            }
            if (oldValue != value) {
                onChange?.(value);
            }

        }
    }

    const moveCursor = (direction: number) => {
        cursorIndex = cursorIndex + direction;
        if (cursorIndex > lastPos) {
            cursorIndex = 0;
        } else if (cursorIndex < 0) {
            cursorIndex = lastPos;
        }
        if (cursorIndex == 2 || cursorIndex == 5) {
            cursorIndex += direction;
        }
        editor.setSelectionRange(cursorIndex, cursorIndex + 1);
    }

    const handleMouseDown = (e: MouseEvent) => {
        editor.focus();
        e.stopPropagation();
        e.preventDefault();
    }

    const replaceChar = (position: number, newChar: string): string => {
        const arr = textValue.split('');
        arr[position] = newChar;
        return arr.join('');
    }

    const toTimeValue = (): number => {
        let tt = textValue.replaceAll('_', '0').split(':');
        let h = parseInt(tt[0]);
        let m = parseInt(tt[1]);
        let ss = tt.length == 3 ? parseInt(tt[2]) : 0;
        return h * 60 + m + ss / 100;
    }

    const isValidTime = (s: string) => {
        let tt = s.replaceAll('_', '0').split(':');
        let h = parseInt(tt[0]);
        let m = parseInt(tt[1]);
        let ss = tt.length == 3 ? parseInt(tt[2]) : 0;
        return m < 60 && h * 60 + m < 1440 && ss < 60;
    }


    const handleKeyDown = async (e: KeyboardEvent) => {
        if (e.key != 'Tab') {
            switch (e.key) {
                case 'ArrowLeft':
                case 'ArrowUp':
                    moveCursor(-1);
                    break;
                case 'ArrowRight':
                case 'ArrowDown':
                    moveCursor(1);
                    break;
                case 'Delete':
                    textValue = replaceChar(cursorIndex, mandatory ? '0' : '_');
                    break
                case 'Backspace':
                    textValue = replaceChar(cursorIndex, mandatory ? '0' : '_');
                    await tick();
                    moveCursor(cursorIndex > 0 ? -1 : 0);
                    break;
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    let s = replaceChar(cursorIndex, e.key);
                    if (isValidTime(s)) {
                        textValue = s;
                        await tick();
                        moveCursor(1);
                    }
                    break;
                default:
                    break
            }
            e.stopPropagation();
            e.preventDefault();
        }
    }

    const handleDeleteButton = async () => {
        value = null as unknown as number;
        textValue = emptyStr;
        await tick();
        cursorIndex = 0;
        editor.setSelectionRange(cursorIndex, cursorIndex + 1);
        editor.focus();
    }

    $: textValue = toTimeText(value);

</script>
<CommonEditor {displayMode} {style} value={toTimeText(value)} {suffix} {prefix} {disabled} {readonly} {variant} {compact} class={className}
              hasLeadingIcon={$$slots['leading-icon']} hasTrailingIcon={$$slots['trailing-icon']}
              showActionIcon={textValue!=emptyStr} clean={handleDeleteButton}>
    <svelte:fragment slot="leading-icon">
        {#if $$slots['leading-icon']}
            <div class="editor-embed-icon">
                <slot name="leading-icon"/>
            </div>
        {/if}
    </svelte:fragment>
    <input bind:this={editor} type="text" style="flex: 1 1 auto" bind:value={textValue} {disabled}
           on:keydown={handleKeyDown} on:focus={handleFocusEvent} on:blur={handleBlurEvent}
           on:mousedown={handleMouseDown}/>
    <svelte:fragment slot="trailing-icon">
        {#if $$slots['trailing-icon']}
            <div class="editor-embed-icon">
                <slot name="trailing-icon"/>
            </div>
        {/if}
    </svelte:fragment>
</CommonEditor>