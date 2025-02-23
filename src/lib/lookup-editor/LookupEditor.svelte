<script lang="ts">


    import {DisplayMode} from "../common/DisplayMode";
    import type {OnChangeHandler} from "$lib/common/OnChangeHandler";

    type OnActionHandler = () => void;

    export let variant: '' | 'plain' | 'outlined' | 'filled' = '';
    export let disabled: boolean = false;
    export let readonly: boolean = false;
    export let compact: boolean = false;
    export let mandatory: boolean = false;
    export let value: any = null;
    export let style: string = '';
    export let placeholder: string = "";
    export let displayMode: DisplayMode = DisplayMode.Edit;
    export let text: string;
    export let onChange: OnChangeHandler<any> = null as unknown as OnChangeHandler<any>;
    export let onAction: OnActionHandler = null as unknown as OnActionHandler;

    let oldValue = value;

    $: if (oldValue != value) {
        oldValue = value;
    }

    const cleanHandler = () => {
        value = null;
        text = '';
        onChange?.(value)
    }

    const handleActionIconClick = () => {
        onAction?.();
    }

</script>

<div class="uniface-lookup-editor" class:compact {style}>
    <div class="uniface-common-editor {variant}" >
        <div class="option-field">
            {#if displayMode==DisplayMode.View}
                <input style="width: 100%" class="display-only" readonly value={text??''}/>
            {:else if readonly}
                <input style="width: 100%" readonly value={text??''}/>
            {:else}
                <input style="width: 100%" {placeholder} class="text-editor" readonly value={text??''} {disabled}
                       on:keydown on:focus/>
            {/if}
        </div>
        {#if !disabled && !readonly && displayMode === DisplayMode.Edit}
            {#if !mandatory && value != null}
                <i tabindex="-1" class="option-action uniface-icon-x-circle" on:click={cleanHandler}/>
            {/if}
            <i tabindex="-1" class="option-dropdown uniface-icon-more-horizontal" on:click={handleActionIconClick}/>
        {/if}
    </div>


</div>