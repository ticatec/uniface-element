<script lang="ts">

    import {DisplayMode} from "../common/DisplayMode";
    import Popover from "../common/Popover.svelte";
    import Icon from "$lib/icon";

    export let variant: '' | 'plain' | 'outlined' | 'filled';
    export let disabled: boolean;
    export let readonly: boolean;
    export let compact: boolean;
    export let style: string;
    export let className: string;
    export let displayMode: DisplayMode;
    export let autoFit: boolean;
    export let canClean: boolean;
    export let textValue: string;
    export let dropDownIcon: string = "";
    export let clean: () => void;
    export let showPopup: boolean = false;

    const openPopup = () => {
        showPopup = true;
    }

    let editorElement;

</script>
{#if displayMode === DisplayMode.View}
    <div class="uniface-display-field">
        <span>{textValue}</span>
    </div>
{:else}
    <div bind:this={editorElement} class="uniface-common-picker {className}" tabindex="-1" class:compact {style}>
        <div class="uniface-common-editor {variant}">
            {#if readonly || disabled}
                <input class="readonly" class:disabled readonly {disabled} value={textValue}/>
            {:else}
                <slot></slot>
                {#if canClean && textValue && textValue.length > 0}
                    <Icon name="uniface-icon-x" clickable class="uniface-editor-clean-icon" onClick={clean}/>
                {/if}
                <slot name="dropdown-icon">
                    <Icon name={dropDownIcon} class="editor-dropdown" clickable onClick={openPopup}/>
                </slot>
            {/if}
        </div>
    </div>
    {#if showPopup}
        <Popover target={editorElement} on:close={()=>{showPopup=false}} {autoFit}>
            <slot name="popup-panel"></slot>
        </Popover>
    {/if}
{/if}