<script lang="ts">


    import {DisplayMode} from "../common/DisplayMode";
    import type {OnChangeHandler} from "$lib/common/OnChangeHandler";
    import CommonPicker from "$lib/common/CommonPicker.svelte";

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

    const clean = () => {
        value = null;
        text = '';
        onChange?.(value)
    }

    const handleActionIconClick = () => {
        onAction?.();
    }

</script>

<CommonPicker {displayMode} {variant} {style} {compact} className="multiple" dropDownIcon="icon_google_keyboard_control"
               canClean={!mandatory && value!=null} autoFit {clean} textValue={text} {readonly} {disabled} iconClickHandler={handleActionIconClick}>
    <input style="width: 100%" {placeholder} class="text-editor" readonly value={text??''} {disabled}
           on:keydown on:focus on:click={handleActionIconClick}/>
</CommonPicker>