<script lang="ts">

    import CommonEditor from "../common-editor/CommonEditor.svelte";
    import type {OnChangeHandler} from "$lib/common/OnChangeHandler";

    export let variant: '' | 'plain' | 'outlined' | 'filled' = '';
    export let compact: boolean = false;
    export let style: string = '';
    export let value: string = '';
    export let disabled: boolean = false;
    export let onChange: OnChangeHandler<string> = null as unknown as OnChangeHandler<string>;

    export let placeholder: string | null = null;

    export const focus = () => {
        console.log('查询框获取焦点')
        editor.focus();
    }

    let editor: any;

    let composing: boolean = false;
    let inputText: string;

    $: inputText = value;

    const handleInput = () => {
        if (composing == false) {
            value = inputText;
            onChange?.(value);
        }
    };
    const handleCompositionStart = (event: CompositionEvent) => {
        composing = true;
    };

    const handleCompositionEnd = (event: CompositionEvent) => {
        composing = false;
        value = inputText;
        onChange?.(value);
    };

    const clean = () => {
        value = null;
        onChange?.(value);
    }

</script>

<CommonEditor {variant} {compact} {style} showActionIcon={value != null && value.length > 0} {clean}>
    <div slot='leading-icon'>
        <i class="uniface-icon-search"></i>
    </div>
    <input bind:this={editor} style="width: 100%" bind:value={inputText} {disabled}  on:input={handleInput} on:compositionstart={handleCompositionStart}
           on:compositionend={handleCompositionEnd} {placeholder}/>
</CommonEditor>