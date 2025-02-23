<script lang="ts">

    import {DisplayMode} from "$lib/common/DisplayMode";
    import RadioButton from "$lib/radio-button";
    import type {OnChangeHandler} from "$lib/common/OnChangeHandler";

    export let disabled: boolean = false;
    export let readonly: boolean = false;
    export let value: any;
    export let options: Array<any>;
    export let keyField: string = "code";
    export let textField: string = "text";
    export let displayMode: DisplayMode = DisplayMode.Edit;
    export let item$style: string = '';
    export let disabledOptions: Array<string> = [];
    export let variant: '' | 'plain' | 'outlined' | 'filled' = '';
    export let compact: boolean = false;
    export let onChange: OnChangeHandler<any> = null as unknown as OnChangeHandler<any>;

    let textValue: string;
    let oldValue = value;

    $: if (oldValue != value) {
        oldValue = value;
        onChange?.(value);
    }

    $: {
        let item = options.find(el=>el[keyField]==value);
        textValue = item == null ? '' : item[textField];
    }

</script>

{#if displayMode === DisplayMode.View}
    <div class="uniface-display-field">
        <span>{textValue}</span>
    </div>
{:else}
    <div style="width: 100%;" class="uniface-group-box {variant}" class:compact >
        {#each options as op}
            <RadioButton {readonly} {compact} disabled={disabled || disabledOptions.indexOf(op[keyField]) > -1}
                         bind:group={value} label={op[textField]} style={item$style} value={op[keyField]}/>
        {/each}
    </div>
{/if}

