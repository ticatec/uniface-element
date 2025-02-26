<script lang="ts">

    import {onMount, onDestroy} from "svelte";
    import {Tween} from 'svelte/motion';
    import {cubicOut} from 'svelte/easing';
    import type {TabActionHandler, TabCloseHandler, TabRender} from "./types";



    export {className as class};
    export let simple: boolean = false;
    export let textField: string = 'text';
    export let style: string = '';
    export let tabs: Array<any> = [];
    export let closable: boolean | TabActionHandler = false;
    export let activeTab: any = null;
    export let refreshable: boolean = false;
    export let tabRender: TabRender = null as unknown as TabRender;
    export let reloadHandler: TabActionHandler = null as unknown as TabActionHandler;
    export let closeHandler: TabCloseHandler = null as unknown as TabCloseHandler;

    let className: string = "";

    let container: any;
    let showLeft = false;
    let showRight = false;
    let scrollX = new Tween(0, {duration: 300, easing: cubicOut});
    let currentLeft = 0;

    onMount(() => {
        if (activeTab == null && tabs.length > 0) {
            activeTab = tabs[0];
        }

        checkOverflow();
        container.addEventListener('scroll', checkOverflow);
        window.addEventListener('resize', checkOverflow);
        checkOverflow();
    });

    onDestroy(() => {
        window.removeEventListener('resize', checkOverflow);
    });

    const checkOverflow = () => {
        if (container) {
            if (currentLeft + container.clientWidth > container.scrollWidth) {
                currentLeft = container.scrollWidth - container.clientWidth;
                scrollX.set(currentLeft);
            }
            if (currentLeft > 0 && container.clientWidth <= container.scrollWidth) {
                currentLeft = container.scrollWidth - container.clientWidth;
                scrollX.set(currentLeft);
            }
            showRight = currentLeft + container.clientWidth < container.scrollWidth;
            showLeft = currentLeft > 0;
        }
    };

    const scroll = (direction: any) => {
        if (container) {
            const scrollAmount = 100;
            currentLeft = currentLeft + direction * scrollAmount;
            if (currentLeft < 0) {
                currentLeft = 0;
            } else if (currentLeft + container.clientWidth > container.scrollWidth) {
                currentLeft = container.scrollWidth - container.clientWidth + 1;
            }
            scrollX.set(currentLeft);
            checkOverflow();
        }
    };


    const handleTabClick = (tab: any) => (e: MouseEvent) => {
        if (tab != activeTab) {
            activeTab = tab;
        }
    }

    const closeTab = (tab: any) => async (e: MouseEvent) => {
        let pos = tabs.indexOf(tab);
        if (pos > -1) {
            let canClose = closeHandler == null ? true : await closeHandler(tab);
            if (canClose) {
                tabs.splice(pos, 1);
                tabs = [...tabs];
                if (tab == activeTab) {
                    if (tabs.length > 0) {
                        if (pos > tabs.length) {
                            pos = tabs.length - 1;
                        }
                        if (pos == -1) {
                            pos = 0;
                        }
                        activeTab = tabs[pos];
                    } else {
                        activeTab = null;
                    }
                }
                checkOverflow();
            }
        }
        e.stopPropagation();
        e.preventDefault();
    }

    const reloadTab = (tab: any) => (e: MouseEvent) => {
        reloadHandler?.(tab);
    }


</script>
<div class="uniface-tab-panel {className}" {style}>
    <div>
        <div class="uniface-tabs-wrap" class:simple>
            <div class="scroll-left" style="visibility: {showLeft ? 'visible' : 'hidden'}">
                <i class="uniface-icon-chevron-left" aria-hidden="true" on:click={() => scroll(-1)}></i>
            </div>
            <div class="tabs-panel" style="overflow: hidden;">
                <div style="position: relative; left: {-scrollX.current}px" bind:this={container}>
                    {#each tabs as tab}
                        <div class="uniface-tab" class:active={tab===activeTab} on:click={handleTabClick(tab)} aria-hidden="true">
                            {#if tabRender != null}
                                <svelte:component this={tabRender} {tab} {refreshable} {closable} on:reload on:close={closeTab(tab)}/>
                            {:else}
                                <span>{tab[textField]}</span>
                                {#if refreshable}
                                    <i class="uniface-icon-rotate-cw tab-refresh" on:click={reloadTab(tab)} aria-hidden="true"></i>
                                {/if}
                                {#if closable === true || (typeof (closable) == "function" && closable(tab))}
                                    <i class="uniface-icon-x tab-action" on:click={closeTab(tab)} aria-hidden="true"></i>
                                {/if}
                            {/if}
                        </div>
                    {/each}
                </div>
            </div>
            <div class="scroll-right" style="visibility: {showRight ? 'visible' : 'hidden'}">
                <i class="uniface-icon-chevron-right" aria-hidden="true" on:click={() => scroll(1)}></i>
            </div>
        </div>
        <div class="tab-content" style="flex: 1 1 auto; height: 100%; overflow: hidden">
            <slot/>
        </div>
    </div>
</div>