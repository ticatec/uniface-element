<script lang="ts">

    import AppTopBar from "$lib/app-top-bar";
    import dayjs from "dayjs";
    import {onMount} from "svelte";
    import userAvatar from "../../img.png";
    import {clickOutside} from "./clickOutside";
    import DemoBlock from "../../DemoBlock.svelte";
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


<div style="width: 100%; padding: 12px">
    <div class="demo-blocks">
        <DemoBlock style="grid-column: 1/7" title="Common App Header Bar">
            <AppTopBar title="Header">
                <div slot="home">
                    <i class="icon_google_menu" aria-hidden="true" on:click={()=>{drawVisible = !drawVisible}}></i>
                </div>
                <svelte:fragment slot="right">
                    <div style="font-size: 15px; margin-top: 12px">
                        <span>{time}</span>
                    </div>
                    <div class="avatar">
                        <img src={userAvatar} alt="none" aria-hidden="true" on:click={()=>{showPopup=true}}/>
                        {#if showPopup}
                            <div use:clickOutside={()=>{showPopup=false}} aria-hidden="true" class="popover-panel" on:click|stopPropagation></div>
                        {/if}
                    </div>
                </svelte:fragment>
            </AppTopBar>
        </DemoBlock>
    </div>
</div>


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