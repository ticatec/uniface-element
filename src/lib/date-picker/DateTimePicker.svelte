<script lang="ts">

    import {onMount, tick} from "svelte";
    import dayjs from "dayjs";
    import {DisplayMode} from "../common/DisplayMode";
    import dateUtils, {type UniDate} from "../base-calendar/dateUtils";
    import Calendar from "../base-calendar";
    import TimePanel from "./TimePanel.svelte";
    import {TextButton} from "../button";
    import type {OnChangeHandler} from "$lib/common/OnChangeHandler";
    import CommonPicker from "$lib/common/CommonPicker.svelte";
    import i18nRes from "$lib/i18nRes";

    export let disabled: boolean = false;
    export let readonly: boolean = false;
    export let style: string = '';
    export let value: UniDate;
    export let placeholder: string = "";
    export let min: UniDate = null;
    export let max: UniDate = null;
    export let precision: "H" | "M" | "S" = "M"; //精确到时分秒，
    export let displayMode: DisplayMode = DisplayMode.Edit;
    export let compact: boolean = false;
    export let variant: '' | 'plain' | 'outlined' | 'filled' = '';
    export let mandatory: boolean = false;
    export let onChange: OnChangeHandler<Date> = null as unknown as OnChangeHandler<Date>;
    export const setFocus = () => {
        setTimeout(()=> {
            editor && editor.focus();
        }, 50);
    }


    let confirmText = i18nRes.calendar.confirmText;
    let textValue: string;
    let editor: any;

    let currentValue: dayjs.Dayjs;

    const dateFmts = {
        "H": "YYYY-MM-DD HH:mm",
        "M": "YYYY-MM-DD HH:mm",
        "S": "YYYY-MM-DD HH:mm:ss"
    }

    let format: string;

    let btnDisabled;

    onMount(async () => {

    })

    const openPopup = () => {
        displayTime = dateUtils.formatDate(currentValue, format);
        showPopup = true;
    }

    const handleCalendarSelect = (d: dayjs.Dayjs) => {
        currentValue = currentValue.set("year", d.year()).set("month", d.month()).set("date", d.date());
        editor.focus();
        displayTime = dateUtils.formatDate(currentValue, format);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key == 'Backspace' || e.key == 'Delete') {
            value = null;
            showPopup = false;
        } else if (e.key == 'Tab') {
            if (showPopup) {
                e.preventDefault();
                e.stopPropagation();
            }
        } else if (e.key == 'Escape') {
            showPopup = false;
        }
    }

    const confirm = async () => {
        if (dateUtils.toDayjs(value)?.toDate() != currentValue.toDate()) {
            value = currentValue;
            onChange?.(currentValue.toDate());
        }
        showPopup = false;
    }

    let displayTime: string = '';

    const generateCurrentValue = (v: UniDate, p: string) => {
        if (value) {
            currentValue = dateUtils.toDayjs(v) ?? dayjs()
        } else {
            currentValue = dayjs();
        }
        currentValue = currentValue.set("milliseconds", 0);
        if (p == "H") {
            currentValue = currentValue.set("minutes", 0);
            currentValue = currentValue.set("seconds", 0);
        } else if (p == "M") {
            currentValue = currentValue.set("seconds", 0);
        }
    }


    $: generateCurrentValue(value, precision);
    $: textValue = dateUtils.formatDate(value, format);
    $: btnDisabled = currentValue == null;

    let showPopup: boolean = false;

    $: format = dateFmts[precision];

    const handleTimeChange = (t: dayjs.Dayjs) => {
        currentValue = t;
        displayTime = dateUtils.formatDate(currentValue, format);
    }

    const cleanData = () => {
        value = null;
    }

</script>

<CommonPicker {displayMode} {variant} {style} className="uniface-date-time-editor" {compact} dropDownIcon="icon_google_access_time"
              bind:showPopup canClean={!mandatory && value!=null} autoFit={false} clean={cleanData} {textValue} {readonly} {disabled}>

    <input style="width: 100%" bind:this={editor} on:click={openPopup} {placeholder} on:keydown={handleKeyDown}
           class="text-editor" bind:value={textValue} on:blur on:focus/>

    <div class="date-popover" slot="popup-panel">
        <div style="display: flex; flex-direction: row">
            <Calendar style="border-right: 1px solid var(--uniface-inside-border-color, #f0f0f0)" value={currentValue}
                      onSelect={handleCalendarSelect} {min} {max}/>
            <TimePanel style="width: 120px" value={currentValue} {precision} onChange={handleTimeChange}/>
        </div>
        <div style="border-top: 1px solid var(--uniface-inside-border-color, #f0f0f0); display: flex; flex-direction: row; box-sizing: border-box; padding: 4px 8px; text-align: left; align-items: center">
            <div style="flex: 1 1 auto">
                <span>{displayTime}</span>
            </div>
            <div style="flex: 0 0 auto;">
                <TextButton label={confirmText} type="primary" disabled={btnDisabled} onClick={confirm}/>
            </div>
        </div>
    </div>
</CommonPicker>