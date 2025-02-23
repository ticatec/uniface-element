<script lang="ts">

    import dateUtils, {type UniDate} from "./dateUtils";
    import DateContext from "./DateContext";
    import dayjs from "dayjs";
    import {onMount} from "svelte";
    import type {CalendarDay} from "$lib/base-calendar/CalendarDay";
    import type {OnSelectHandler} from "$lib/common/OnSelectHandler";

    const dateCtx: DateContext = DateContext.getInstance();

    export let min: UniDate;
    export let max: UniDate;
    export let weekTitle: Array<string>;
    export let weekBegin: number = dateCtx.weekBegin;
    export let year: number;
    export let month: number;
    export let date: number;
    export let value;
    export let cellWidth: number;
    export let cellHeight: number;
    export let dailyContent: any;
    export let onSelect: OnSelectHandler<dayjs.Dayjs>;



    let today = dateUtils.today();
    let oldMin:any, oldMax:any;
    let selected = {year: 0, month: 0, date: 0};

    onMount(() => {
        if (value) {
            let d = dayjs(value);
            selected = {year: d.year(), month: d.month(), date: d.date()}
        }

    })

    let isWeekend = (idx: number) => {
        let dow = (idx + weekBegin) % 7;
        return dow == 6 || dow == 0;
    }

    let days:Array<CalendarDay> = [];

    const isNotAllow = (d: dayjs.Dayjs): boolean => {
        return (min != null && d.isBefore(min)) || (max != null && d.isAfter(max));
    }

    const showCalendar = (y: number, m: number, d: number) => {
        oldMin = min;
        oldMax = max;
        let beginDay = dayjs(new Date(y, m, 1));
        let od = ((beginDay.day() % 7 - weekBegin) + 7) % 7;
        if (od == 0) {
            od = 7;
        }
        let from = beginDay.add(-od, "days");
        days = [];
        for (let i = 0; i < 42; i++) {
            days.push({
                y,
                m: from.month(),
                d: from.date(),
                isToday: from.month() == month && from.isSame(today),
                disabled: from.month() != month || isNotAllow(from)
            })
            from = from.add(1, "days");
        }
    }

    let respondClick = true;

    const handleDayClick = (ad:any) => (event: MouseEvent) => {
        if (ad.disabled == false && respondClick) {
            respondClick = false;
            setTimeout(() => {
                respondClick = true
            }, 200);
            selected = {year, month, date: ad.d};
            onSelect?.(dayjs(new Date(year, month, ad.d)));
        }
    }

    $: {
        let v = value ?? dateUtils.today();
        year = v.year();
        month = v.month();
        date = v.date();
    }

    $: showCalendar(year, month, date);

    $: if (oldMax != max || oldMin != min) {
        showCalendar(year, month, date);
    }

</script>
<div class="monthly-calendar">
    {#each Array(7) as _, idx}
        <div class="cell week-title" class:weekend={isWeekend(idx)}><span>{weekTitle[(idx + weekBegin + 7) % 7] }</span></div>
    {/each}
    {#each days as day, idx}
        <div class="cell calendar-day" aria-hidden="true" style="width: {cellWidth}px; height: {cellHeight}px;" class:weekend={isWeekend(idx)}
             class:today={day.isToday}
             on:click={handleDayClick(day)}
             class:selected={(selected.year===day.y) && (selected.month===day.m) && (selected.date===day.d)}
             class:lastRow={idx>34}
             class:disabled={day.disabled}>
            <span>{day.d}</span>
            {#if dailyContent != null}
                <div>
                    <svelte:component this={dailyContent} {year} {month} date={day}/>
                </div>
            {/if}
        </div>
    {/each}
</div>