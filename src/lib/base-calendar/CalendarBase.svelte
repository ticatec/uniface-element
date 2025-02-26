<script lang="ts">
    import MonthlyCalendar from "./MonthlyCalendar.svelte";
    import dateUtils, {type UniDate} from "./dateUtils";
    import DateContext from "./DateContext";
    import dayjs from "dayjs";
    import {onMount} from "svelte";
    import MonthPickupPanel from "./MonthPickupPanel.svelte";
    import YearPickupPanel from "./YearPickupPanel.svelte";
    import type {OnSelectHandler} from "$lib/common/OnSelectHandler";

    const dateCtx: DateContext = DateContext.getInstance();
    export let value: UniDate;
    export let min: UniDate = null;
    export let max: UniDate = null;
    export let weekTitle: Array<string> | null = null;
    export let monthTitle: Array<string> | null = null;
    export let weekBegin: number | null = null;
    export let style: string = '';
    export let cellWidth: number = 32;
    export let cellHeight: number = 32;
    export let border: boolean = false;
    export let dailyContent: any = null;
    export let onSelect:OnSelectHandler<dayjs.Dayjs> = null as unknown as OnSelectHandler<dayjs.Dayjs>;

    let dv: dayjs.Dayjs | null;
    let year: number;
    let month: number;
    let date: number;
    let minDate: any;
    let maxDate: any;
    let showMonths: boolean = false;
    let showYears: boolean = false;
    let oldValue: any;

    const onSelectDate = (date: dayjs.Dayjs) => {
        value = date;
        onSelect(value);
    }

    const pickupMonth = () => {
        showMonths = true;
        showYears = false;
    }

    const adjustMonth = (n: number) => (e: Event) => {
        month = month + n;
        if (month > 11) {
            year = year + 1;
            month = 0;
        } else if (month < 0) {
            year = year - 1;
            month = 11;
        }
    }

    const pickupYear = () => {
        showMonths = false;
        showYears = true;
    }

    const extractYMD = (v: dayjs.Dayjs | null) => {
        if (v != null) {
            year = v.year();
            month = v.month();
            date = v.date();
        }
    }

    onMount(() => {
        if (value == null) {
            extractYMD(dayjs())
        }
    })

    $: dv = dateUtils.toDayjs(value);

    $: if (oldValue != dv) {
        oldValue = dv;
        extractYMD(dv)
    }

    $: {
        minDate = dateUtils.toDayjs(min);
        maxDate = dateUtils.toDayjs(max);
    }

</script>
<div class="uniface-calendar" class:border style="{style}; width: {cellWidth*7}px">
    <div>
        <div class="uniface-title-bar">
            <div class="action-icon" on:click={adjustMonth(-1)} aria-hidden="true">
                <i class="uniface-icon-chevron-left"></i>
            </div>
            <div style="flex: 1 1 auto; text-align: center">
                <span class="title-text" on:click={pickupYear} aria-hidden="true">{year}</span>
                <span class="title-text" on:click={pickupMonth} aria-hidden="true">{month + 1}</span>
            </div>
            <div class="action-icon" on:click={adjustMonth(1)} aria-hidden="true">
                <i class="uniface-icon-chevron-right"></i>
            </div>
        </div>
        <div style="flex: 1 1 auto; overflow: hidden">
            <MonthlyCalendar weekBegin={weekBegin??dateCtx.weekBegin} weekTitle={weekTitle??dateCtx.weekTitleAbbr}
                             {cellWidth} {cellHeight} {dailyContent} min={minDate} max={maxDate}
                             value={dv} {year} {month} {date} onSelect={onSelectDate}/>
            {#if showMonths}
                <MonthPickupPanel bind:value={month} months={monthTitle??dateCtx.monthsAbbr??dateCtx.months}
                                  onClick={()=>{showMonths=false}}/>
            {:else if showYears}
                <YearPickupPanel bind:year maxYear={maxDate==null ? null : maxDate.year()}
                                 minYear={minDate==null ? null : minDate.year()}
                                 onClick={()=>{showYears=false}}/>
            {/if}
        </div>
    </div>
</div>