<script lang="ts">


    import {onMount} from "svelte";
    import i18n from "@ticatec/i18n";
    import componentsList from "./ComponentsList";
    import IndicatorBoard from "$lib/indicator";
    import {DialogBoard} from "$lib/dialog";
    import ToastBoard from "$lib/toast";
    import MessageBoxBoard from "$lib/message-box";

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
</script>
<div style="width: 100%; height: 100%; box-sizing: border-box; display: flex; flex-direction: row">
    <div class="content-index">
        {#if initialized}
            {#each componentsList as cmp}
                <div class="section" on:click={handleItemClick(cmp)}>
                    <span>{cmp.name}</span>
                </div>
            {/each}
        {/if}
    </div>
    <div style="flex: 1 1 auto; overflow: hidden; position: relative">
        <svelte:component this={demoComponent}/>
    </div>
</div>

<IndicatorBoard/>
<DialogBoard/>
<ToastBoard/>
<MessageBoxBoard/>
<style>

    .content-index {
        width: 300px;
        height: 100%;
        flex: 0 0 auto;
        box-sizing: border-box;
        border-right: 1px solid #e1e1e1;
        position: relative;
        padding: 8px 12px;
        font-size: 15px;
        user-select: none;
    }


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