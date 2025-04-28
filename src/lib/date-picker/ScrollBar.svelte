<script lang="ts">

    import type {OnChangeHandler} from "$lib/common/OnChangeHandler";

    export let value: number;
    export let mode: 24 | 60 = 60;
    export let enable: boolean = true;
    export let onChange: OnChangeHandler<number> = null as unknown as OnChangeHandler<number>;

    let list: Array<any> = [];

    const decValue = () => {
        if (enable) {
            value = (value - 1 + mode) % mode;
            resetList();
        }
    }

    const incValue = () => {
        if (enable) {
            value = (value + 1 + mode) % mode;
            resetList();
        }
    }

    const resetList = () => {
        list = [];
        onChange?.(value);
        for (let i=0; i<7; i++) {
            list.push((value + i - 3 + mode) % mode);
        }
    }

    let amendValue = 0;

    const handleMouseWheel = (e: WheelEvent) => {
        if (enable) {
            value = (value + Math.round(e.deltaY / 5) + mode) % mode;
            resetList();
            e.stopPropagation();
            e.preventDefault();
        }
    }

    const handleMouseDown = (v: number) => (e: MouseEvent) => {
        if (enable) {
            amendValue = v;
            timer = setInterval(() => {
                if (amendValue != 0) {
                    value = (value + amendValue + mode) % mode;
                    resetList();
                }
            }, 200)
        }
    }

    const handleMouseUp = () => {
        if (timer != null) {
            clearInterval(timer);
            timer = null;
        }
    }

    const handleDigitalClick = (v: number) => {
        value = v;
        resetList();
    }

    let timer: any;

    $:resetList();

</script>
<div class="scroll-bar" tabindex="1" on:wheel={handleMouseWheel}>
    <div class="action-bar">
        <div class="arrow-up" class:disabled={!enable}>
            <i class="icon_google_keyboard_arrow_up" on:click={decValue} on:dragstart={(e)=>{e.preventDefault()}}
                 on:mousedown={handleMouseDown(-1)} on:mouseup={handleMouseUp} on:mouseleave={handleMouseUp}></i>
        </div>
    </div>
    {#each list as v}
        <div style={!enable && v!= value ? "visibility: hidden; " : ""} class="digital-block" on:click={()=>{handleDigitalClick(v)}} class:inactive={v!=value}><span>{v}</span></div>
    {/each}
    <div class="action-bar">
        <div class="arrow-down" class:disabled={!enable}>
            <i class="icon_google_keyboard_arrow_downn" on:click={incValue} on:dragstart={(e)=>{e.preventDefault()}}
                 on:mousedown={handleMouseDown(1)} on:mouseup={handleMouseUp} on:mouseleave={handleMouseUp}></i>
        </div>
    </div>
</div>

<style>
    .scroll-bar {
        width: 33%;
    }

    .top-bar {
        text-align: center;
    }

    .digital-block {
        padding: 3px 0;
        line-height: 1.2em;
        font-weight: 600;
        font-size: 13px;
    }

    .inactive {
        font-size: 1.0em;
        font-weight: 100;
        color: #7f7f7f;
    }
</style>