<script lang="ts">

    import {DisplayMode} from "../common/DisplayMode";
    import prefixFilter from "../utils/prefixFilter";
    import CommonEditor from "../common-editor/CommonEditor.svelte";

    const excludeAttrs = ['type', 'readonly', 'disabled', 'required', "form", "wrap"]

    export let disabled: boolean = false;
    export let readonly: boolean = false;
    export let variant: '' | 'plain' | 'outlined' | 'filled' = '';
    export let compact: boolean = false;
    export {className as class};
    export let style: string = '';
    export let value: string = '';
    export let suffix: string = '';
    export let prefix: string = '';
    export let removable: boolean = true;
    export let displayMode: DisplayMode = DisplayMode.Edit;
    export let onChange: ((value: string) => void) | undefined = undefined;

    let className: string = '';
    let input$: any;
    let editor: any;

    $: variant = variant ?? '';

    $: input$ = prefixFilter($$props, "input$", excludeAttrs);

    let oldValue = value;

    const clean = () => {
        value = '';
        editor.setFocus();
    }

    $: if (oldValue != value) {
        onChange?.(value);
        oldValue = value;
    }

</script>
<CommonEditor {displayMode} {style} {value} {suffix} {prefix} {readonly} {disabled} {variant} {compact}
              showActionIcon={!readonly && !disabled && removable && value?.length > 0}
              class={className} clean={clean}>
    <svelte:fragment slot="leading-icon">
        {#if $$slots['leading-icon']}
            <div class="editor-embed-icon">
                <slot name="leading-icon"/>
            </div>
        {/if}
    </svelte:fragment>
    <input bind:this={editor} type="text" style="flex: 1 1 auto" bind:value={value} {...input$}
           on:blur on:focus on:keydown on:keyup on:keypress on:input on:compositionstart
           on:compositionend on:compositionupdate/>
    <svelte:fragment slot="trailing-icon">
        {#if $$slots['trailing-icon']}
            <div class="editor-embed-icon">
                <slot name="trailing-icon"/>
            </div>
        {/if}
    </svelte:fragment>
</CommonEditor>