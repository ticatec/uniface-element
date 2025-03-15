<script lang="ts">

    import {DisplayMode} from "../common/DisplayMode";
    import CommonEditor from "../common-editor/CommonEditor.svelte";
    import type {OnChangeHandler} from "$lib/common/OnChangeHandler";
    import NumberInput from "$lib/common-editor/NumberInput.svelte";



    export let disabled: boolean = false;
    export let readonly: boolean = false;
    export let variant: '' | 'plain' | 'outlined' | 'filled' = '';
    export let compact: boolean = false;
    export {className as class};
    export let style: string = '';
    export let placeholder: string = '';
    export let value: number | null;
    export let precision: number | null = null;
    export let suffix: string = '';
    export let prefix: string = '';
    export let allowNegative: boolean = false;
    export let displayMode: DisplayMode = DisplayMode.Edit;
    export let max: number | null = null;
    export let min: number | null = null;
    export let removable: boolean = true;
    export let onChange: OnChangeHandler<number | null> = null as unknown as OnChangeHandler<number | null>;

    let className: string = '';
    let editor: NumberInput;

    const clean = () => {
        value = null;
        editor.setFocus();
    }


</script>
<CommonEditor {displayMode} {style} {value} {suffix} {prefix} {readonly} {variant} {compact} class={className}
              hasLeadingIcon={$$slots['leading-icon']!=null} hasTrailingIcon={$$slots['trailing-icon']!=null}
              showActionIcon={removable && !readonly && !disabled && value != null} {clean}>
    <svelte:fragment slot="leading-icon">
        {#if $$slots['leading-icon']}
            <div class="editor-embed-icon">
                <slot name="leading-icon"/>
            </div>
        {/if}
    </svelte:fragment>
    <NumberInput bind:this={editor} style="flex: 1 1 auto" {disabled} {placeholder} bind:value {precision} {allowNegative} {max} {min} {readonly} {onChange}/>
    <svelte:fragment slot="trailing-icon">
        {#if $$slots['trailing-icon']}
            <div class="editor-embed-icon">
                <slot name="trailing-icon"/>
            </div>
        {/if}
    </svelte:fragment>
</CommonEditor>