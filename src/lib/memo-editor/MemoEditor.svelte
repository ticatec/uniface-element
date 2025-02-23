<script lang="ts">

    import {DisplayMode} from "../common/DisplayMode";
    import prefixFilter from "../utils/prefixFilter";
    import {onMount} from "svelte";
    import Icon from "$lib/icon";

    const excludeAttrs = ['readonly', 'disabled', 'required', "rows", "form", "wrap"]

    export let disabled: boolean = false;
    export let readonly: boolean = false;
    export let variant: '' | 'plain' | 'outlined' | 'filled' = '';
    export {className as class};
    export let style: string = '';
    export let value: string;
    export let wrap: "hard" | "soft" = "hard";
    export let resize: 'none' | 'horizontal' | 'vertical' | 'both' = 'none';
    export let displayMode: DisplayMode = DisplayMode.Edit;
    export let input$rows: number = 3;
    export let showIndicator: boolean = false;
    export let maxLength: number = null as unknown as number;

    let input$;
    let className: string = '';
    let textValue: string;
    let len: number;


    const escapeHTML = (text: string) => {
        return text == null ? '' : text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    $: textValue = displayMode == DisplayMode.View ? escapeHTML(value).replace(/\n/g, "<br/>").replace(/ /g, '&nbsp;') : value;

    $: input$ = prefixFilter($$props, "input$", excludeAttrs);

    $: len = textValue == null ? 0 : textValue.length;

    let editor: any;
    let width: number = 0;
    onMount(() => {
        if (editor) {
            const resizeObserver = new ResizeObserver(entries => {
                for (let entry of entries) {
                    const style = getComputedStyle(editor);
                    let paddingLeft = parseFloat(style.paddingLeft);
                    let paddingRight = parseFloat(style.paddingRight);
                    width = entry.contentRect.width + paddingRight + paddingLeft;
                }
            });
            resizeObserver.observe(editor);
            return () => resizeObserver.disconnect();
        }
    });

    const clean = () => {
        value='';
    }

</script>
{#if displayMode === DisplayMode.View}
    <div class="uniface-display-field" style="width:100%; min-height: 60px; {style};">
        {@html textValue }
    </div>
{:else if readonly}
    <textarea style="width:100%; {style}; resize: {resize}" class="uniface-memo-editor {variant} {className}" {readonly} rows={input$rows??3}
              {value} {disabled} {...input$}></textarea>
{:else}
    <div class="uniface-memo-editor-wrapper" tabindex="-1" style="position: relative; {style}">
        <textarea bind:this={editor} style="width:100%; ; resize: {resize}" class="uniface-memo-editor {variant} {className}"
                  rows={input$rows??3}
                  {wrap} bind:value {disabled} {...input$} maxlength={maxLength}
                  on:blur on:focus on:keydown on:keyup on:keypress on:change on:input></textarea>
        {#if showIndicator && maxLength}
            <div class="uniface-memo-indicator" style="width: {width}px">
                <span>{len} / {maxLength}</span>
            </div>
        {/if}
        {#if !disabled && value && value.length > 0}
            <div class="action-button-wrapper" style="position: absolute; top: 0; left: 0; width: {width}px;">
                <Icon name="uniface-icon-x" clickable class="uniface-editor-clean-icon" onClick={clean}/>
            </div>
        {/if}
    </div>
{/if}