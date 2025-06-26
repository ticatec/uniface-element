<script lang="ts">

    import {DisplayMode} from "../common/DisplayMode";
    import utils from "../common/utils";


    export let disabled: boolean = false;
    export let readonly: boolean = false;
    export let variant: '' | 'plain' | 'outlined' | 'filled' = '';
    export let compact: boolean = false;
    export {className as class};
    export let placeholder: string = '';
    export let style: string = '';
    export let value: any = null;
    export let suffix: string = '';
    export let prefix: string = '';
    export let input$class: string = null as unknown as string;
    export let displayMode: DisplayMode = DisplayMode.Edit;
    export let showActionIcon: boolean = false;
    export let clean: () => void;

    export let hasLeadingIcon: boolean = true;
    export let hasTrailingIcon: boolean = true;

    let className: string = '';

</script>
{#if displayMode === DisplayMode.View}
    <div class="uniface-display-field" style="display: flex; flex-direction: row;">
        {#if !utils.isEmpty(prefix)}
            <div style="flex: 0 0 auto;">
                <span style="padding-right: 4px">{prefix}</span>
            </div>
        {/if}
        <div style="flex: 1 1 auto; overflow: hidden">
            <span>{value ?? ''}</span>
        </div>
        {#if !utils.isEmpty(suffix)}
            <div style="flex: 0 0 auto;">
                <span style="padding-left: 4px">{suffix}</span>
            </div>
        {/if}
    </div>
{:else}
    <div class:compact class="uniface-common-editor {variant} {className}" tabindex="-1"
         style="{style}">
        {#if $$slots['leading-icon'] && hasLeadingIcon}
            <div class="editor-embed-icon" style="flex: 0 0 auto;">
                <slot name="leading-icon"/>
            </div>
        {:else if !utils.isEmpty(prefix)}
            <div class="editor-prefix" tabindex="-1" style="flex: 0 0 auto;">
                <span>{prefix}</span>
            </div>
        {/if}
        {#if disabled || readonly}
            <input class={input$class} type="text" style="flex: 1 1 auto" {value} {disabled} {readonly} {placeholder}>
        {:else}
            <div style="position: relative; flex: 1 1 auto">
                <slot/>
                <div class="uniface-editor-clean-icon {showActionIcon ? '' : 'hidden'}">
                    <i class="icon_google_clear clickable" aria-hidden="true" on:click={clean}></i>
                </div>
            </div>
        {/if}
        {#if !utils.isEmpty(suffix)}
            <div class="editor-suffix" style="flex: 0 0 auto;">
                <span>{suffix}</span>
            </div>
        {/if}
        {#if $$slots['trailing-icon'] && hasTrailingIcon}
            <div class="editor-embed-icon" style="flex: 0 0 auto;">
                <slot name="trailing-icon"/>
            </div>
        {/if}

    </div>
{/if}