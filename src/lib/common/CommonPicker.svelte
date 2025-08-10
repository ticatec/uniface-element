<script lang="ts">

    import {DisplayMode} from "../common/DisplayMode";
    import Popover from "../common/Popover.svelte";
    import Icon from "$lib/icon";
    import type {MouseClickHandler} from "../common/MouseClickHandler";

    export let variant: '' | 'plain' | 'outlined' | 'filled';
    export let disabled: boolean;
    export let readonly: boolean;
    export let compact: boolean;
    export let style: string = '';
    export let className: string = '';
    export let displayMode: DisplayMode;
    export let autoFit: boolean = true;
    export let canClean: boolean;
    export let textValue: string;
    export let dropDownIcon: string = null as unknown as string;
    export let clean: () => void;
    export let iconClickHandler: MouseClickHandler = null as unknown as MouseClickHandler;
    export let showPopup: boolean = false;

    const openPopup = () => {
        showPopup = true;
    }

    let editorElement;

</script>
{#if displayMode === DisplayMode.View}
    <div class="uniface-display-field">
        <div class="content">
            <span>{textValue}</span>
        </div>

    </div>
{:else}
    <div bind:this={editorElement} class="uniface-common-editor {variant} uniface-common-picker {className}" tabindex="-1" class:compact
         {style}>
        {#if readonly || disabled}
            <input style="width: 100%" class="readonly" class:disabled readonly {disabled} value={textValue}/>
        {:else}
            <div style="flex: 1 1 auto; position: relative; overflow: hidden; height: 100%">
                <slot></slot>
                {#if canClean && textValue && textValue.length > 0}
                    <div class="uniface-editor-clean-icon">
                        <i class="icon_google_clear clickable " aria-hidden="true" on:click={clean}></i>
                    </div>
                {/if}
            </div>
            {#if $$slots['dropdown-icon'] || dropDownIcon}
                <div style="flex: 0 0 auto">
                    <slot name="dropdown-icon">
                        <Icon name={dropDownIcon} class="action-icon" onClick={iconClickHandler??openPopup}/>
                    </slot>
                </div>
            {/if}
        {/if}
    </div>
    {#if showPopup}
        <Popover target={editorElement} onClose={()=>{showPopup=false}} {autoFit}>
            <slot name="popup-panel"></slot>
        </Popover>
    {/if}
{/if}