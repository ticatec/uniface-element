<script lang="ts">
    import ListBox from "$lib/list-box";
    import IconButton from "$lib/button";
    import {onMount, SvelteComponent} from "svelte";
    import type {FunFilter} from "./types";

    export let height: string = '';
    export let width: string = '';
    export let style: string = '';
    export let sourceList = [];
    export let disabled: boolean = false;
    export let itemRender: SvelteComponent = null;
    export let filter: FunFilter = null;
    export let sourceSelectedList = [];
    export let header$style: string = '';
    export let footer$style: string = 'width: 100%; background-color: #f0f0f0; padding: 2px 6px; text-align: right; box-sizing: border-box';
    export let echoValue = [];
    export let echoData: () => void;

    let targetList = [];
    let targetSelectedList = [];
    let sourceSelectedItem = null;
    let targetSelectedItem = null;

    const moveToTarget = () => {
        if (sourceSelectedList.length > 0) {
            targetList = [...targetList, ...sourceSelectedList];
            sourceList = sourceList.filter(item => sourceSelectedList.indexOf(item) === -1);
            sourceSelectedList = [];
        } else if (sourceSelectedItem) {
            targetList = [...targetList, sourceSelectedItem];
            sourceList = sourceList.filter(item => item !== sourceSelectedItem);
            sourceSelectedItem = null;
        }
    }

    const moveToSource = () => {
        if (targetSelectedList.length > 0) {
            sourceList = [...sourceList, ...targetSelectedList];
            targetList = targetList.filter(item => targetSelectedList.indexOf(item) === -1);
            targetSelectedList = [];
        } else if (targetSelectedItem) {
            sourceList = [...sourceList, targetSelectedItem];
            targetList = targetList.filter(item => item !== targetSelectedItem);
            targetSelectedItem = null;
        }
    }

    onMount(() => {
        if (echoValue.length > 0) {
            targetList = [...targetList, ...echoValue];
            sourceList = sourceList.filter(item => echoValue.indexOf(item) === -1);
        }
    })

    $: {
        if (echoData) {
            echoData();
        }
    }

</script>

<div class="container" style="height: {height}px; width: {width}px">
    <ListBox class="list-container" {filter} {style} list={sourceList} selectMode="multiple" bind:selectedList={sourceSelectedList}
             {itemRender} bind:selectedItem={sourceSelectedItem}>
        <div slot="header" style={header$style}>
            <slot name="sourceHeader"></slot>
        </div>
        <div slot="footer" style={footer$style}>
            <span>选中：{sourceSelectedList.length}/{sourceList.length}</span>
        </div>
    </ListBox>
    <div class="icon-button-container">
        <IconButton on:click={moveToSource} type="primary" disabled={targetSelectedList.length === 0}>
            <i class="uniface-icon-chevron-left"></i>
        </IconButton>
        <IconButton on:click={moveToTarget} type="primary" disabled={sourceSelectedList.length === 0}>
            <i class="uniface-icon-chevron-right"></i>
        </IconButton>
    </div>
    <ListBox class="list-container" {style} {filter} list={targetList} selectMode="multiple" bind:selectedList={targetSelectedList}
             {itemRender} bind:selectedItem={targetSelectedItem}>
        <div slot="header" style={header$style}>
            <slot name="targetHeader"></slot>
        </div>
        <div slot="footer" style={footer$style}>
            <span>选中：{targetSelectedList.length}/{targetList.length}</span>
        </div>
    </ListBox>
</div>
