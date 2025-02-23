<script lang="ts">
    import {onMount} from "svelte";
    import SearchBox from "../search-box"
    import type {FunFilter} from "./types";
    import type {LazyLoader} from "./types";
    import CheckBox from "../checkbox/CheckBox.svelte";

    let className: string = '';

    type OnSelectChange = (item: any) => void;
    type OnItemDblClick = (item: any) => void;

    export let readonly:boolean = false;
    export let style: string = '';
    export let header$style: string = '';
    export let list:Array<any>;
    export let itemRender: any;
    export let selectMode: 'none' | 'single' | 'multiple' = 'none';
    export let filter: FunFilter | null;
    export let lazyLoader: LazyLoader | null = null;
    export let selectedItem: any = null;
    export let selectedList: Array<any> = [];
    export {className as class};
    export let item$props: any = null;
    export let onSelectChange: OnSelectChange= null as unknown as OnSelectChange;
    export let onItemDblClick: OnItemDblClick = null as unknown as OnItemDblClick;

    let filterText: string;
    let hasMore: boolean;
    let isBusy: boolean = false;
    let pageNo: number = 1;

    let filteredList: Array<any>;

    const handleItemClick = (item:any) => (e: MouseEvent) => {
        if (selectMode == 'single' && readonly==false) {
            if (selectedItem != item) {
                selectedItem = item;
                onSelectChange?.(item);
            }
        }
    }

    const handleItemDblClick = (item:any) => (e: MouseEvent) => {
        if (selectMode == 'single') {
            onItemDblClick?.(item);
        }
    }

    const doFilter = () => {
        const newList:Array<any> = [];
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
        isBusy = true;
        try {
            let result = await lazyLoader?.(filterText, pageNo);
            if (result) {
                if (clean) {
                    list = result.list;
                } else {
                    list = [...list, ...result.list];
                }
                filteredList = list;
                hasMore = result.hasMore;
            }
        } finally {
            isBusy = false;
        }
    }

    const handleCriteriaChange = (e) => {
        if (lazyLoader != null) {
            pageNo = 1;
            lazyLoad();
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

    const handleSelectionChanged = (item: any) => (e) => {
        let idx = selectedList.indexOf(item);
        if (e.detail) {
            if (idx < 0) {
                selectedList = [...selectedList, item];
            }
        } else {
            if (idx>-1) {
                selectedList.splice(idx, 1);
                selectedList = [...selectedList];
            }
        }
    }

    onMount(async () => {
        if (lazyLoader != null) {
            filterText = '';
            await lazyLoad();
        }
    })

    const fetchMore = async () => {
        pageNo++;
        await lazyLoad(false);
    }

    let scrollElement:any;

    const handleScroll = () => {
        const bottom = scrollElement.scrollHeight - scrollElement.scrollTop === scrollElement.clientHeight;
        if (bottom && lazyLoader && !isBusy && hasMore) {
            fetchMore();
        }
    }


</script>

<div class="uniface-listbox {className}" {style}>
    {#if $$slots.header || filter || lazyLoader}
        <div class="listbox-header" style={header$style}>
            {#if $$slots.header}
                <slot name="header"></slot>
            {/if}
            {#if readonly===false && (filter!=null || lazyLoader!=null)}
                <SearchBox loading={isBusy} variant="plain" style="width: 100%" bind:value={filterText} on:change={handleCriteriaChange}/>
            {/if}
        </div>
    {/if}
    <div class="listbox-content" class:selectable={selectMode==='single'} bind:this={scrollElement} on:scroll={handleScroll}>
        {#if filteredList && itemRender}
            {#each filteredList as item}
                {#if selectMode === "multiple"}
                    <div class="listview-item" style="display: flex; flex-direction: row; align-items: center">
                        <CheckBox style="flex: 0 0 auto; margin-left: 8px" {readonly} value={selectedList.indexOf(item) > -1} on:change={handleSelectionChanged(item)}/>
                        <svelte:component this={itemRender} {readonly} {item} {...item$props}/>
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
        <slot></slot>
        {#if hasMore}
            <slot name="loadMoreIndicator"></slot>
        {/if}
    </div>
    {#if $$slots.footer}
        <div class="listbox-footer">
            <slot name="footer"></slot>
        </div>
    {/if}
    {#if isBusy}
        <div class="uniface-mask">

        </div>
    {/if}
</div>