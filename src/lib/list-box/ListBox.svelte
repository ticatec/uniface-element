<script lang="ts">
    import {onMount, tick} from "svelte";
    import SearchBox from "../search-box"
    import type {FunFilter} from "./types";
    import type {LazyLoader} from "./types";
    import CheckBox from "../checkbox/CheckBox.svelte";
    import Box from "$lib/box";
    import loading from "../assets/loading.gif"

    let className: string = '';

    type OnSelectChange = (item: any) => void;
    type OnItemDblClick = (item: any) => void;

    export let readonly: boolean = false;
    export let style: string | null = null;
    export let header$style: string | null = null;
    export let list: Array<any>;
    export let itemRender: any;
    export let selectMode: 'none' | 'single' | 'multiple' = 'none';
    export let filter: FunFilter | null = null;
    export let lazyLoader: LazyLoader | null = null;
    export let selectedItem: any = null;
    export let selectedList: Array<any> = [];
    export {className as class};
    export let item$props: any = null;
    export let onSelectChange: OnSelectChange = null as unknown as OnSelectChange;
    export let onItemDblClick: OnItemDblClick = null as unknown as OnItemDblClick;

    export let title: string = null as unknown as string;
    export let round: boolean = false;
    export let footer$style: string | null = null;

    let filterText: string;
    let hasMore: boolean;
    let isBusy: boolean = false;
    let pageNo: number = 1;

    let filteredList: Array<any>;

    const handleItemClick = (item: any) => (e: MouseEvent) => {
        if (selectMode == 'single' && readonly == false) {
            if (selectedItem != item) {
                selectedItem = item;
                onSelectChange?.(item);
            }
        }
    }

    const handleItemDblClick = (item: any) => (e: MouseEvent) => {
        if (selectMode == 'single') {
            onItemDblClick?.(item);
        }
    }

    const doFilter = () => {
        const newList: Array<any> = [];
        list.forEach(item => {
            if (filter?.(item, filterText)) {
                newList.push(item)
            }
            filteredList = newList;
        });
        if (selectMode == 'single') {
            selectedItem = null;
            onSelectChange?.(null);
        }
    }

    const lazyLoad = async (clean: boolean = true) => {
        console.log('加载数据...')
        isBusy = true;
        try {
            let result = await lazyLoader?.(filterText, pageNo);
            if (result) {
                if (clean) {
                    list = result.list;
                } else {
                    list = [...list, ...result.list];
                }
                selectedItem = null;
                filteredList = list;
                hasMore = result.hasMore;
                console.log('加载数据完成')
            }
        } finally {
            isBusy = false;
        }
    }

    let idleTime = 0;
    const delayReload = async () => {
        idleTime++;
        if (idleTime > 10) {
            clearInterval(interval);
            interval = null;
            pageNo = 1;
            scrollElement.scrollTop = 0;
            await lazyLoad();
            await tick();
            searchBox.focus();
        }
    }

    let interval: any;
    const handleCriteriaChange = () => {
        if (lazyLoader != null) {
            if (interval == null) {
                idleTime = 0;
                interval = setInterval(delayReload, 50)
            } else {
                idleTime = 0;
            }

        } else {
            if (filterText.length > 0) {
                doFilter();
            } else {
                filteredList = [...(list ?? [])]
            }
        }
    }

    $: if (list && lazyLoader == null) {
        if (filter != null && filterText && filterText.length > 0) {
            doFilter();
        } else {
            filteredList = list;
        }
    }

    const handleSelectionChanged = (item: any) => () => {
        console.log('选择项目', item);
        let idx = selectedList.indexOf(item);
        if (idx < 0) {
            selectedList = [...selectedList, item];
        } else {
            selectedList.splice(idx, 1);
            selectedList = [...selectedList];
        }
    }

    onMount(async () => {
        if (lazyLoader != null) {
            console.log('加载数据...')
            filterText = '';
            await lazyLoad();
        }
    })

    const fetchMore = async () => {
        pageNo++;
        await lazyLoad(false);
    }

    let scrollElement: any;
    let searchBox: any;

    const handleScroll = () => {
        const bottom = scrollElement.scrollHeight - scrollElement.scrollTop === scrollElement.clientHeight;
        if (bottom && lazyLoader && !isBusy && hasMore) {
            fetchMore();
        }
    }

    $: boxHeaderStyle = `${header$style ?? ''}; height: auto; ${($$slots.header || filter || lazyLoader || title) ? '' : 'display: none'}`

</script>

<div {style} class="uniface-box {className}" class:round>
    {#if title || $$slots['header']}
        <slot name="header">
            <div class="title" style={boxHeaderStyle}>
                <span>{title}</span>
            </div>
        </slot>
    {/if}
    {#if readonly === false && (filter || lazyLoader)}
        <div class="header-search">
            <SearchBox bind:this={searchBox} compact variant="plain" disabled={isBusy} style="width: 100%" bind:value={filterText}
                       onChange={handleCriteriaChange}/>
        </div>
    {/if}
    <div class="listbox-content" class:selectable={selectMode==='single'} bind:this={scrollElement} on:scroll={handleScroll}>
        {#if filteredList && itemRender}
            {#each filteredList as item}
                {#if selectMode === "multiple"}
                    <div class="listview-item" style="display: flex; flex-direction: row; align-items: center; gap: 8px">
                        <CheckBox style="flex: 0 0 auto" {readonly} value={selectedList.indexOf(item) > -1}
                                  onChange={handleSelectionChanged(item)}/>
                        <div style="flex: 1 1 auto; cursor: pointer" aria-hidden="true" on:click={handleSelectionChanged(item)}>
                            <svelte:component this={itemRender} {readonly} {item} {...item$props}/>
                        </div>
                    </div>
                {:else }
                    <div class="listview-item" class:selected={item===selectedItem} aria-hidden="true"
                         on:dblclick={handleItemDblClick(item)} on:click={handleItemClick(item)}>
                        <svelte:component this={itemRender} {item} {readonly} selected={item===selectedItem}
                                          {...item$props}/>
                    </div>
                {/if}
            {/each}
        {/if}
        {#if hasMore}
            <slot name="loadMoreIndicator"></slot>
        {/if}
    </div>
    {#if $$slots['footer']}
        <div class="box-footer flex-container" style="{footer$style};">
            <slot name="footer">
            </slot>
        </div>
    {/if}
    {#if isBusy}
        <div class="list-view-mask">
            <div style="height: 100%; height: 100%; text-align: center">
                <img width="48" height="48" style="position: relative; top: 50%; transform: translateY(-50%)" src={loading} alt="nothing">
            </div>
        </div>
    {/if}
</div>