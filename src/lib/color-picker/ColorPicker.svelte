<script lang="ts">


    import {DisplayMode} from "../common/DisplayMode";
    import type {OnChangeHandler} from "$lib/common/OnChangeHandler";
    import CommonPicker from "$lib/common/CommonPicker.svelte";

    type OnActionHandler = () => void;

    export let showHex = true;
    export let showRgb = false;

    export let variant: '' | 'plain' | 'outlined' | 'filled' = '';
    export let disabled: boolean = false;
    export let readonly: boolean = false;
    export let compact: boolean = false;
    export let value: any = "#ff3e00";
    export let style: string = '';
    export let onChange: OnChangeHandler<any> = null as unknown as OnChangeHandler<any>;


    let oldValue = value;

    $: if (oldValue != value) {
        oldValue = value;
    }

    let editor: any;

    const clean = () => {

    }

    const handleActionIconClick = () => {
        editor.click();
    }

    function handleColorChange(event) {
        selectedColor = event.target.value;
        rgbValues = hexToRgb(selectedColor);
        console.log(selectedColor, rgbValues);
        // dispatch('change', {
        //     hex: selectedColor,
        //     rgb: rgbValues
        // });
    }

</script>

<CommonPicker displayMode={DisplayMode.Edit} {variant} {style} {compact} className="multiple" dropDownIcon="icon_google_color_lens"
              canClean={false} autoFit {clean} textValue={value} {readonly} {disabled} iconClickHandler={handleActionIconClick}>
<!--    <div style="flex: 1 1 auto; width: 50%; height: 60%; border-radius: 4px; background-color: {value}"></div>-->
    <div style="width: 100%; display: flex; overflow: hidden; flex-direction: row; align-items: center; height: 100%; gap: 8px">
        <input bind:this={editor} style="flex: 0 0 auto; width: 40%; height: 80%; border-radius: 8px;" type="color"  bind:value on:change={handleColorChange}/>
        <input style="flex: 0 0 auto; width: 50%; text-align: center" class="text-editor" readonly value={value??''} {disabled}/>
    </div>


</CommonPicker>