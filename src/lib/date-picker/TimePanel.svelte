<script lang="ts">

    import ScrollBar from "./ScrollBar.svelte";
    import dayjs from "dayjs";
    import type {OnChangeHandler} from "$lib/common/OnChangeHandler";
    import type {UniDate} from "$lib/base-calendar/dateUtils";
    import dateUtils from "../base-calendar/dateUtils";

    export let value: UniDate;
    export let style: string = '';
    export let precision: "H" | "M" | "S" = "M";
    export let onChange: OnChangeHandler<dayjs.Dayjs> = null as unknown as OnChangeHandler<dayjs.Dayjs>;

    let hour: number, minute: number, second: number;
    let time: dayjs.Dayjs = dateUtils.toDayjs(value);

    $: {
        hour = time == null ? 0 : time.hour();
        minute = precision == "H" ? 0 : time == null ? 0 : time.minute();
        second = precision == "S" ? time == null ? 0 : time.second() : 0;
    }

    const resetTime = (unit: dayjs.UnitType) => (v: number) => {
        time = time.set(unit, v);
        onChange(time);
    }

</script>
<div class="time-picker-panel" {style}>
    <div class="scroll-panel" style="flex: 1 1 auto">
        <ScrollBar bind:value={hour} mode={24} onChange={resetTime('hour')}/>
        {#if precision === "M" || precision === "S"}
            <ScrollBar bind:value={minute} onChange={resetTime('minute')}/>
            {#if precision === "S"}
                <ScrollBar bind:value={second} onChange={resetTime('second')}/>
            {/if}
        {/if}
    </div>
</div>
