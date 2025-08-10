<script lang="ts">

    import {onMount, tick} from "svelte";
    import {DisplayMode} from "../common/DisplayMode";
    import dayjs from "dayjs";
    import Calendar from "../base-calendar";
    import type {OnChangeHandler} from "../common/OnChangeHandler";
    import type {UniDate} from "$lib/base-calendar/dateUtils";
    import CommonPicker from "$lib/common/CommonPicker.svelte";

    export let variant: '' | 'plain' | 'outlined' | 'filled' = '';
    export let disabled: boolean = false;
    export let readonly: boolean = false;
    export let compact: boolean = false;
    export let mandatory: boolean = false;
    export let value: any = null;
    export let style: string = '';
    export let placeholder: string = "";
    export let displayMode: DisplayMode = DisplayMode.Edit;
    export let min: UniDate = null;
    export let max: UniDate = null;
    export let onChange: OnChangeHandler<Date> = null as unknown as OnChangeHandler<Date>;
    export const setFocus = () => {
        setTimeout(()=> {
            editor && editor.focus();
        }, 50);
    }


    let textValue: string;
    let editor: any;
    let oldValue = value;

    onMount(() => {
    })

    const generateText = (v: string) => {
        textValue = value == null ? '' : dayjs(value).format('YYYY-MM-DD');
    }

    const openPopup = () => {
        editor.focus();
        showPopup = true;
    }

    $: generateText(value);

    $: if (oldValue != value) {
        oldValue = value;
        onChange?.(value);
    }

    const handleCalendarSelect = (d: dayjs.Dayjs) => {
        value = d.toDate();
        showPopup = false;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        if (!disabled) {
            if (e.key == 'Backspace' || e.key == 'Delete') {
                value = null;
                textValue = '';
                showPopup = false;
            } else if (e.key == 'Tab') {
                if (showPopup) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            } else if (e.key == 'Escape') {
                showPopup = false;
            } else {
                e.preventDefault();
                e.stopPropagation();
            }
        }
    }

    let showPopup: boolean = false;

    const cleanData = () => {
        value = null;
    }

</script>

<CommonPicker {displayMode} {variant} {style} className="uniface-date-time-editor" {compact} dropDownIcon="icon_google_event_available"
              bind:showPopup canClean={!mandatory && value!=null} autoFit={false} clean={cleanData} {textValue} {readonly} {disabled}>

    <input style="width: 100%" bind:this={editor} on:click={openPopup} {placeholder} on:keydown={handleKeyDown}
           class="text-editor" bind:value={textValue} on:blur on:focus/>

    <div class="date-popover" slot="popup-panel">
            <Calendar {value}  {min} {max} onSelect={handleCalendarSelect}/>
    </div>
</CommonPicker>