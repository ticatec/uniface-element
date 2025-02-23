<script lang="ts">

    import type DataColumn from "$lib/data-table/lib/DataColumn";
    import type {IndicatorColumn} from "$lib/data-table";
    import {type SelectionEventHandler, SelectionMode} from "$lib/data-table/UniDataTable";
    import utils from "$lib/common/utils";

    export let columns: Array<DataColumn>;
    export let indicatorColumn: IndicatorColumn;



    export let selectionMode: SelectionMode;

    export let handleToggleSelectAll: SelectionEventHandler;

    let checked: boolean = false;
    let indeterminate: boolean = false;

    const handleHeaderCheckBoxClick = async (e: MouseEvent) => {
        indeterminate = false;
        await utils.sleep(0.05);
        handleToggleSelectAll?.(checked);
    }

    $: if (selectionMode == SelectionMode.All) {
        indeterminate = false;
        checked = true;
    } else if (selectionMode == SelectionMode.None) {
        indeterminate = false;
        checked = false;
    } else {
        indeterminate = true;
    }


</script>

<div class="header-indicator" style="width: {indicatorColumn.width}px">
    <div>
        {#if indicatorColumn.selectable==true}
            <input type="checkbox" tabindex="-1" bind:checked {indeterminate} on:click={handleHeaderCheckBoxClick}/>
        {/if}
    </div>
</div>