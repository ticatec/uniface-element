<script lang="ts">

    import AppTopBar from "$lib/app-top-bar";
    import dayjs from "dayjs";
    import {onMount} from "svelte";
    import userAvatar from "./img.png";
    import {clickOutside} from "./app-top-bar/clickOutside";
    import Drawer from "$lib/drawer";

    export let drawVisible: boolean = false;

    let time: string = dayjs().format('YYYY-MM-DD HH:mm');

    onMount(() => {
        let interval = setInterval(() => {
            time = dayjs().format('YYYY-MM-DD HH:mm');
        }, 1000);
        return () => {
            clearInterval(interval)
        }
    })

    let showPopup: boolean = false;


</script>

<div style="width: 100%; height: 100%; box-sizing: border-box; overflow: hidden; display: flex; flex-direction: column">
    <AppTopBar style="float:0 0 auto;" title="My Business dashboard">
        <div slot="home">
            <i class="icon_google_menu" on:click={()=>{drawVisible = !drawVisible}}></i>
        </div>
        <svelte:fragment slot="right">
            <div style="font-size: 15px; margin-top: 12px">
                <span>{time}</span>
            </div>
            <div class="avatar">
                <img src={userAvatar} aria-hidden="true" on:click={()=>{showPopup=true}}/>
                {#if showPopup}
                    <div use:clickOutside={()=>{showPopup=false}} class="popover-panel" on:click|stopPropagation></div>
                {/if}
            </div>
        </svelte:fragment>
    </AppTopBar>
    <div style="flex: 1 1 auto; overflow: hidden">
        <slot>

        </slot>
    </div>
</div>

<Drawer bind:visible={drawVisible}>
    <slot name="menu"></slot>
</Drawer>

<style>
    .popover-panel {
        position: absolute;
        top: var(--uniface-top-bar-height);
        right: 6px;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
        width: 240px;
        height: 320px;
        border-right: 1px solid #f0f0f0;
        border-left: 1px solid #f0f0f0;
        border-bottom: 1px solid #f0f0f0;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    }
</style>