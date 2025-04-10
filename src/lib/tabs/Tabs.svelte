<script lang="ts">

    import {onMount, onDestroy, tick} from "svelte";
    import {Tween} from 'svelte/motion';
    import {cubicOut} from 'svelte/easing';
    import type {TabActionHandler, TabCloseHandler, TabRender} from "./types";


    export {className as class};
    export let simple: boolean = false;
    export let textField: string = 'text';
    export let style: string = '';
    export let tabs: Array<any> = [];
    export let scrollStep = 100;
    export let closable: boolean | TabActionHandler = false;
    export let activeTab: any = null;
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
        window.addEventListener('resize', checkOverflow);
        container.addEventListener('scroll', checkOverflow);
    });

    onDestroy(() => {
        window.removeEventListener('resize', checkOverflow);
        container.removeEventListener('scroll', checkOverflow);
    });


    const checkOverflow = () => {
        if (container) {
            console.log(currentLeft, container.clientWidth, container.scrollWidth);
            if (currentLeft + container.clientWidth >= container.scrollWidth) {
                currentLeft = container.scrollWidth - container.clientWidth;
                scrollX.set(currentLeft);
            }
            if (currentLeft > 0 && container.clientWidth >= container.scrollWidth) {
                currentLeft = 0;
                scrollX.set(currentLeft);
            }
            showRight = currentLeft + container.clientWidth < container.scrollWidth;
            showLeft = currentLeft > 0;
        }
    };

    const scroll = (dir: 1 | -1) => {
        const maxScroll = container.scrollWidth - container.clientWidth;
        currentLeft += dir * scrollStep;
        if (currentLeft < 0) currentLeft = 0;
        if (currentLeft > maxScroll) currentLeft = maxScroll;
        scrollX.set(currentLeft);
        checkOverflow();
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
                    if (pos >= tabs.length) {
                        pos = tabs.length - 1;
                    }
                    activeTab = tabs[pos];
                }
                await tick();
                checkOverflow();
            }
        }
        e.stopPropagation();
        e.preventDefault();
    }

    const reloadTab = (tab: any) => (e: MouseEvent) => {
        reloadHandler?.(tab);
    }
    //

</script>
<div class="uniface-tab-panel {className}" {style}>
    <div>
        <div class="uniface-tabs-wrap" class:simple>
            <div class="scroll-left" style="visibility: {showLeft ? 'visible' : 'hidden'}">
                <i class="icon_google_arrow_left" aria-hidden="true" on:click={() => scroll(-1)}></i>
            </div>
            <div class="tabs-panel" style="overflow: hidden;">
                <div style="position: relative; left: {-scrollX.current}px" bind:this={container}>
                    {#each tabs as tab}
                        <div class="uniface-tab" class:active={tab===activeTab} on:click={handleTabClick(tab)} aria-hidden="true">
                            {#if tabRender != null}
                                <svelte:component this={tabRender} {tab} closeTab={closeHandler != null ? closeTab(tab) : null}
                                                  reloadTab={reloadHandler != null ? reloadTab(tab) : null}
                                                  closable={closable === true || (typeof (closable) == "function" && closable(tab))}/>
                            {:else}
                                <span>{tab[textField]}</span>
                                {#if reloadHandler != null}
                                    <i class="icon_google_refresh tab-refresh" on:click={reloadTab(tab)} aria-hidden="true"></i>
                                {/if}
                                {#if tabs.length > 1 && (closable === true || (typeof (closable) == "function" && closable(tab)))}
                                    <i class="icon_google_clear tab-action" on:click|stopPropagation={closeTab(tab)} aria-hidden="true"></i>
                                {/if}
                            {/if}
                        </div>
                    {/each}
                </div>
            </div>
            <div class="scroll-right" style="visibility: {showRight ? 'visible' : 'hidden'}">
                <i class="icon_google_arrow_right" aria-hidden="true" on:click={() => scroll(1)}></i>
            </div>
        </div>
        <div class="tab-content" style="flex: 1 1 auto; height: 100%; overflow: hidden">
            <slot/>
        </div>
    </div>
</div>