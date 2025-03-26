<script lang="ts">


    import {onMount} from "svelte";
    import i18n from "@ticatec/i18n";
    import componentsList from "./ComponentsList";
    import IndicatorBoard from "$lib/indicator";
    import {DialogBoard} from "$lib/dialog";
    import ToastBoard from "$lib/toast";
    import MessageBoxBoard from "$lib/message-box";
    import AppTopBarDemo from "./misc/app-top-bar/AppTopBarDemo.svelte";
    import HomePage from "./HomePage.svelte";
    import MainMenu from "./MainMenu.svelte";
    import type MenuItem from "../../lib/nav-menu/MenuItem";

    let initialized: boolean = false;

    onMount(() => {
        i18n.setResource({
            tutorial: {
                appLayout: "应用布局",
                sidebarLayout: "左右两栏布局"
            }
        });
        initialized = true;
    });

    let demoComponent: any;

    const handleItemClick = (item: any) => (event: MouseEvent) => {
        demoComponent = item.component;
    }

    let drawVisible: boolean = false;

    const onItemClick = (item: MenuItem) => {
        demoComponent = item.data;
        drawVisible = false
    }

</script>
<HomePage bind:drawVisible>
    <div style="width: 100%; height: 100%; overflow: auto">
        <svelte:component this={demoComponent}/>
    </div>
    <svelte:fragment slot="menu">
<!--        <div style="width: 100%; height: 100%; overflow: auto; padding: 12px 8px">-->
<!--            {#if initialized}-->
<!--                {#each componentsList as cmp}-->
<!--                    <div class="section" on:click={handleItemClick(cmp)}>-->
<!--                        <span>{cmp.name}</span>-->
<!--                    </div>-->
<!--                {/each}-->
<!--            {/if}-->
<!--        </div>-->
        <MainMenu {onItemClick}/>
    </svelte:fragment>
</HomePage>


<IndicatorBoard/>
<DialogBoard/>
<ToastBoard/>
<MessageBoxBoard/>
<style>
    .section {
        width: 100%;
        color: #374151;
        padding: 6px 0;
        font-size: 12px;
    }

    .section:hover {
        cursor: pointer;
        color: #298DEF;
    }

</style>