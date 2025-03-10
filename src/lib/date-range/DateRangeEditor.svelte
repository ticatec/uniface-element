<script lang="ts">
    import CommonRangeEditor from "../common-range-editor";
    import {dateUtils} from "../base-calendar";
    import Calendar from "../base-calendar";
    import Popover from "../common/Popover.svelte";
    import Icon from "$lib/icon";
    import type {UniDate} from "$lib/base-calendar/dateUtils";
    import dayjs from "dayjs";

    export let variant: '' | 'plain' | 'outlined' | 'filled' = '';
    export let compact: boolean = false;
    export {className as class};
    export let style: string = '';
    export let fromValue: UniDate = null;
    export let toValue: UniDate = null;
    export let format: string = "YYYY-MM-DD";
    export let min: string | Date | null = null;
    export let max: string | Date | null = null;

    let className: string = '';
    let maxFrom;
    let minTo;


    const cleanValue = () => {
        fromValue = null;
        toValue = null;
    }

    const toTextValue = (v: any) => {
        return dateUtils.formatDate(v, format);
    }

    const handleFormCalendarSelect = (value: dayjs.Dayjs) => {
        fromValue = value.toDate();
    }


    const handleToCalendarSelect = (value: dayjs.Dayjs) => {
        toValue = value.toDate();
        showPopup = false;
    }

    const showPopover = () => {
        showPopup = true;
    }

    $: textFrom = toTextValue(fromValue);
    $: textTo = toTextValue(toValue);
    $: maxFrom = toValue ?? max;
    $: minTo = fromValue ?? min;

    let showPopup = false;
    let rootElement: any;

    $: showActionIcon = fromValue != null || toValue != null;

</script>

<div bind:this={rootElement}>
    <CommonRangeEditor {compact} {showActionIcon} class="{className}" {variant} {style} clean={cleanValue}>
        <svelte:fragment slot="from">
            <input style="width: 100%; text-align: center" readonly on:click={showPopover} value={textFrom}/>
        </svelte:fragment>
        <svelte:fragment slot="to">
            <input style="width: 100%; text-align: center" readonly on:click={showPopover} value={textTo}/>
        </svelte:fragment>
        <svelte:fragment>
            <i class="uniface-icon-calendar action-icon" aria-hidden="true" on:click={showPopover}></i>
        </svelte:fragment>
    </CommonRangeEditor>

    {#if showPopup}
        <Popover target={rootElement} on:close={()=>{showPopup=false}} style="width: 452px" autoFit={false}>
            <div style="white-space: nowrap">
                <Calendar style="border-right: 1px solid #f0f0f0" value={fromValue} onSelect={handleFormCalendarSelect} {min} max={maxFrom}/>
                <Calendar value={toValue} onSelect={handleToCalendarSelect} min={minTo} {max}/>
            </div>
        </Popover>
    {/if}
</div>

