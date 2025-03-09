<script lang="ts">

    import {onMount, onDestroy, tick} from 'svelte';
    import DataRow from "$lib/concise-data-table/DataRow.svelte";
    import {type RowClickHandler, type TableOptions} from "$lib/concise-data-table/TableOptions";
    import utils from "./utils";

    // list array to display
    export let list: Array<any>;
    // Column definitions with configuration
    export let columns: Array<Column>;
    // Enable auto-scroll feature
    export let autoScroll: boolean = false;
    // Milliseconds between each scroll step
    export let scrollInterval: number = 2000;
    export let rowClickHandler: RowClickHandler | null = null;
    //行高

    // Height of the component in pixels
    //table background color
    export let options: TableOptions;

    let tabOptions: TableOptions;

    $: tabOptions = {headerHeight: 36, rowHeight: 32, ...options}


    let id = (new Date().getTime() * 1000 + Math.floor(Math.random() * 1000)).toString(36);
    let tableStyle: string = '';
    let tableContainer: any;
    let viewPanel: any;
    let headerRow: any;
    let scrollTimer: any;
    let currentScrollIndex: number = 0;
    let visibleRowCount: number = 0;

    $: totalWeight = columns.reduce((sum, col) => sum + (col.weight || 0), 0);

    let rowHeight: number;


    let clonedRows: Array<any> = []; // 用于无缝滚动的克隆行
    let viewWidth = 0;
    let viewHeight = 0;
    let resizeObserver: any;

    onMount(async () => {
        resizeObserver = new ResizeObserver(() => {
            viewWidth = Math.round(viewPanel?.clientWidth) - 1;
            viewHeight = Math.round(viewPanel?.clientHeight) - 1;
        });
        resizeObserver.observe(viewPanel);
    });

    onDestroy(() => {
        resizeObserver.disconnect();
    })


    const setupAutoScroll = async () => {
        if (autoScroll && tableContainer && list.length > 0) {
            await tick();
            const tableBody = tableContainer.querySelector('.table-body');
            if (tableBody && tableBody.children.length > 0) {
                rowHeight = tableBody.children[0].offsetHeight;
                visibleRowCount = Math.floor((tableContainer.offsetHeight - headerRow.offsetHeight) / rowHeight);
                if (list.length <= visibleRowCount) return;
                clonedRows = [...list];
                startAutoScroll();
            }
        }
    }

    const startAutoScroll = () => {
        // Clear any existing timer
        if (scrollTimer) clearInterval(scrollTimer);

        currentScrollIndex = 0;

        scrollTimer = setInterval(() => {
            currentScrollIndex++;
            const tableBody = tableContainer.querySelector('.table-body');
            if (tableBody) {
                tableBody.style.transform = `translateY(-${currentScrollIndex * rowHeight}px)`;
                if (currentScrollIndex >= list.length) {
                    setTimeout(() => {
                        tableBody.style.transition = 'none';
                        tableBody.style.transform = `translateY(0)`;
                        currentScrollIndex = 0;

                        // 恢复过渡效果
                        setTimeout(() => {
                            tableBody.style.transition = 'transform 2s ease';
                        }, 50);
                    }, 50);
                }
            }
        }, scrollInterval);
    }

    const stopAutoScroll = () => {
        if (scrollTimer) {
            clearInterval(scrollTimer);
            scrollTimer = null;
        }
    }

    onMount(async () => {
        await setupAutoScroll();
    });

    onDestroy(() => {
        stopAutoScroll();
    });

    $: if (list || autoScroll || scrollInterval) {
        stopAutoScroll();
        setupAutoScroll();
    }

    $: tableStyle = utils.generateTableStyle(id, columns, tabOptions, viewWidth);


</script>

<div id="tab_{id}" class="uniface-concise-datatable">
    {@html tableStyle}
    <div class="table-container" bind:this={tableContainer}>
        <!-- Fixed header -->
        <div class="table-header">
            <div class="table-row" bind:this={headerRow}>
                {#each columns as column, idx}
                    <div class="data-cell col_{idx}">
                        {column.title ?? ''}
                    </div>
                {/each}
            </div>
        </div>

        <!-- Scrollable body -->
        <div class="table-body-container" bind:this={viewPanel} class:auto-scroll={autoScroll}>
            <div class="table-body" style="transition: transform {autoScroll ? '2s' : '0s'} ease;">
                {#each list as row, rowIndex}
                    <DataRow data={row} {columns} showAlternative={rowIndex % 2 == 1} on:click={rowClickHandler?.(row)}/>
                {/each}
                {#if autoScroll && list.length > visibleRowCount}
                    {#each list.slice(0, visibleRowCount) as row, rowIndex}
                        <DataRow data={row} {columns} showAlternative={rowIndex % 2 == 1} on:click={rowClickHandler?.(row)}/>
                    {/each}
                {/if}
            </div>
        </div>
    </div>
</div>