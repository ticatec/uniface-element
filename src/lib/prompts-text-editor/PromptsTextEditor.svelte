<script lang="ts">

    import {DisplayMode} from "../common/DisplayMode";
    import CommonEditor from "../common-editor/CommonEditor.svelte";
    import type {OnChangeHandler} from "$lib/common/OnChangeHandler";
    import Popover from "$lib/common/Popover.svelte";
    import prefixFilter from "$lib/utils/prefixFilter";
    import utils from "$lib/common/utils.js";

    export let disabled: boolean = false;
    export let readonly: boolean = false;
    export let variant: '' | 'plain' | 'outlined' | 'filled' = '';
    export let compact: boolean = false;
    export {className as class};
    export let style: string = '';
    export let value: string | null;
    export let prefix: string = '';
    export let suffix: string = '';
    export let displayMode: DisplayMode = DisplayMode.Edit;
    export let removable: boolean = true;
    export let onChange: OnChangeHandler<number | null> = null as unknown as OnChangeHandler<number | null>;
    export let words: Array<string>;
    export let menu$height: number = 0;
    export let placeholder: string = '';

    const excludeAttrs = ['type', 'readonly', 'disabled', 'required', "form", "wrap"]

    let className: string = '';
    let editor: any;


    let showPopup: boolean = false;
    let divPanel: any;
    let mh;

    $: mh = `height: ${menu$height > 0 ? menu$height + 'px' : 'auto'}`;

    const openPopup = () => {
        showPopup = true;
    }

    const handleHintClick = (item: string) => (e: MouseEvent) => {
        value = item;
        showPopup = false;
        e.stopPropagation();
        e.preventDefault();
    }

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

<div bind:this={divPanel}>
    <CommonEditor {displayMode} {style} {value} {prefix} {suffix} {readonly} {variant} {compact} class={className}
                  showActionIcon={removable && !readonly && !disabled && !utils.isEmpty(value)} {clean}
                  hasLeadingIcon={$$slots['leading-icon']!=null}>
        <svelte:fragment slot="leading-icon">
            {#if $$slots['leading-icon']}
                <slot name="leading-icon"/>
            {/if}
        </svelte:fragment>
        <input style="width: 100%" bind:this={editor} {disabled} {placeholder} bind:value={value} {readonly}/>
        <svelte:fragment slot="trailing-icon">
            {#if !disabled && !readonly}
                <i class="option-dropdown icon_google_arrow_drop_down" aria-hidden="true" on:click={openPopup}></i>
            {/if}
        </svelte:fragment>
    </CommonEditor>

    {#if showPopup}
        <Popover target={divPanel} autoFit align="right" on:close={()=>{showPopup=false}}>
            <div class="options-popover" style={mh}>
                {#each words as word}
                    <div class="option-item" style="padding-left: 12px; padding-right: 12px" on:click={handleHintClick(word)}
                         aria-hidden="true">
                        <span>{word}</span>
                    </div>
                {/each}
            </div>
        </Popover>
    {/if}
</div>