<script lang="ts">
    import CommonRangeEditor from "../common-range-editor";
    import {dateUtils} from "../calendar";
    import Calendar from "../calendar";
    import Popover from "../common/Popover.svelte";
    import Icon from "$lib/icon";
    import type {UniDate} from "$lib/calendar/dateUtils";

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
    let editorFrom: any;
    let editorTo: any;
    let popover;
    let maxFrom;
    let minTo;


    const cleanValue = (e: any) => {
        fromValue = null;
        toValue = null;
    }

    const toTextValue = (v: any) => {
        return dateUtils.formatDate(v, format);
    }

    const handleFormCalendarSelect = (e: any) => {
        fromValue = e.detail;

    }


    const handleToCalendarSelect = (e: any) => {
        toValue = e.detail;
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
            <input style="width: 100%;" bind:this={editorFrom} readonly on:click={showPopover} value={textFrom}/>
        </svelte:fragment>
        <svelte:fragment slot="to">
            <input style="width: 100%" bind:this={editorTo} readonly on:click={showPopover} value={textTo}/>
        </svelte:fragment>
        <svelte:fragment slot="trailing-icon">
            <Icon name="uniface-icon-calendar" clickable class="uniface-editor-action-icon" onClick={showPopover}/>
        </svelte:fragment>
    </CommonRangeEditor>

    {#if showPopup}
        <Popover target={rootElement} on:close={()=>{showPopup=false}} style="width: 452px" autoFit={false}>
            <div style="white-space: nowrap">
                <Calendar style="border-right: 1px solid #f0f0f0" value={fromValue} on:select={handleFormCalendarSelect} {min} max={maxFrom}/>
                <Calendar value={toValue} on:select={handleToCalendarSelect} min={minTo} {max}/>
            </div>
        </Popover>
    {/if}
</div>

