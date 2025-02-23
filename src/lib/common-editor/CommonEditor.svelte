<script lang="ts">

    import {DisplayMode} from "../common/DisplayMode";
    import prefixFilter from "../utils/prefixFilter";
    import utils from "../common/utils";
    import Icon from "$lib/icon";



    export let disabled: boolean = false;
    export let readonly: boolean = false;
    export let variant: '' | 'plain' | 'outlined' | 'filled' = '';
    export let compact: boolean = false;
    export {className as class};
    export let style: string = '';
    export let value: any = null;
    export let suffix: string = '';
    export let prefix: string = '';
    export let displayMode: DisplayMode = DisplayMode.Edit;
    export let showActionIcon: boolean = false;
    export let clean: () => void;

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
        {#if $$slots['leading-icon']}
            <slot name="leading-icon"/>
        {/if}
        {#if !utils.isEmpty(prefix)}
            <div class="editor-prefix" tabindex="-1" style="flex: 0 0 auto;">
                <span>{prefix}</span>
            </div>
        {/if}
        <slot/>
        <Icon name="uniface-icon-x" clickable class="uniface-editor-clean-icon {showActionIcon ? '' : 'hidden'}" onClick={clean}/>
        {#if !utils.isEmpty(suffix)}
            <div class="editor-suffix" style="flex: 0 0 auto;">
                <span>{suffix}</span>
            </div>
        {/if}
        {#if $$slots['trailing-icon']}
            <slot name="trailing-icon"/>
        {/if}
    </div>
{/if}