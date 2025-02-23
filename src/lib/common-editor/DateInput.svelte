<script lang="ts">

    import type {OnChangeHandler} from "$lib/common/OnChangeHandler";
    import type {UniDate} from "$lib/base-calendar/dateUtils";
    import {DateFormats} from "$lib/common/DateFormats";
    import dateUtils from "$lib/common/date-utils";

    export let disabled: boolean = false;
    export let readonly: boolean = false;
    export let value: UniDate = null;
    export let style: string = '';
    export let placeholder: string = "";
    export let format: DateFormats = DateFormats.ISO8601;
    export let onChange: OnChangeHandler<Date> = null as unknown as OnChangeHandler<Date>;

    const ctrlKeys: Array<string> = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

    let regex: RegExp;

    let textValue: string;

    let editor: any;

    $: textValue = dateUtils.formatDate(value, format);

</script>
<input bind:this={editor} type="text" {readonly} {placeholder} {style} {disabled} bind:value={textValue}/>