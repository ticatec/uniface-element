<script lang="ts">
    import {onMount} from "svelte";
    import type {OnPageChange} from "$lib/pagination/OnPageChange";

    export let pageCount: number = 0;
    export let pageNo: number = 1;
    export let type: 'plain' | 'round' | 'circle' = "round"
    export let style: string = '';
    export let big: boolean = false;
    export let onPageChange: OnPageChange;



    let pagination: Array<number | null> = [];

    const buildPagination = () => {
        if (pageNo < 1) {
            pageNo = 1;
        } else if (pageNo > pageCount) {
            pageNo = pageCount;
        }
        let arr:Array<number | null> = [1];
        if (pageCount < 6) {
            for (let i=2; i<=pageCount; i++) {
                arr.push(i);
            }
        } else {
            if (pageNo == 1 || pageNo == 2) {
                arr = arr.concat([2, 3, null, pageCount]);
            } else if (pageNo == pageCount || pageNo == pageCount - 1) {
                arr = arr.concat([null, pageCount - 2, pageCount - 1, pageCount])
            } else if (pageNo == 3) {
                arr = arr.concat([2, 3, 4, null, pageCount]);
            } else if (pageNo == pageCount - 2) {
                arr = arr.concat([null, pageCount - 3,pageCount - 2, pageCount - 1, pageCount])
            } else {
                arr.push(null);
                for (let i=pageNo-1; i<=pageNo+1; i++) {
                    arr.push(i);
                }
                arr.push(null);
                arr.push(pageCount);
            }
        }
        pagination = arr;
    }

    const selectPage = (value: number) => (e: MouseEvent) => {
        if (pageNo != value) {
            onPageChange?.(value)
        }
    }

    const showPagination = (_pageNo: number, _pageCount: number):void => {
        buildPagination();
    }

    $: showPagination(pageNo, pageCount);


    onMount(()=>{
        buildPagination();
    })
</script>

<div class="uniface-pagination-panel {type}" class:big  {style}>
    {#each pagination as page}
        {#if page}
            <div class="uniface-page-no" on:click={selectPage(page)} aria-hidden="true" class:selected={page===pageNo}>
                <span tabindex="-1" >
                    {page}
                </span>
            </div>
        {:else}
            <div class="uniface-page-gap">
                <span>...</span>
            </div>
        {/if}
    {/each}
</div>