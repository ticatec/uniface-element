<script lang="ts">

    import ContentPanel from "./parts/ContentPanel.svelte";
    import type DataColumn from "./lib/DataColumn";
    import type ActionsColumn from "./lib/ActionsColumn";
    import type IndicatorColumn from "./lib/IndicatorColumn";
    import type TableRow from "./parts/TableRow";
    import UniDataTable from "./UniDataTable";
    import {onMount} from "svelte";
    import FixedColumnsPanel from "$lib/data-table/parts/FixedColumnsPanel.svelte";
    import ActionPanel from "$lib/data-table/parts/ActionsPanel.svelte";
    import {OrderDirection} from "$lib/data-table/lib/OrderDirection";
    import type {CompareFunction} from "$lib/data-table/lib/CompareFunction";

    export let columns: Array<DataColumn>;
    export let actionsColumn: ActionsColumn | null = null;
    export let indicatorColumn: IndicatorColumn | null = null;
    export let rowHeight: number = 42;  //{ rowHeight}
    export let list: Array<any>;
    export let selectedRows: Array<any> = [];
    export let inlineRowHeight: number = 80;
    export let rowBorder: boolean = false;
    export let colBorder: boolean = false;
    export let emptyIndicator: string | undefined = undefined;

    export let style: string = '';

    let dataColumns: Array<DataColumn>;

    let rows: Array<TableRow>;
    let table: UniDataTable = null as unknown as UniDataTable;
    let tabStyle: string = '';

    let id: string = (new Date()).getTime().toString(36);

    onMount(() => {
        table = new UniDataTable(id, indicatorColumn?.width);
        selectedRows = selectedRows ?? [];
        initializeTable();
    })

    let expandRow: TableRow | null = null;
    let fixedCols: Array<DataColumn>;
    let scrollTop: number;

    const initializeTable = () => {
        table.setColumns(columns);
        rows = table.rows;
        dataColumns = table.columns;
        fixedCols = table.frozenColumns;
        tabStyle = table.generateTemplateStyle();
        tabWidth = table.width;
        frozenWidth = table.frozenWidth;
    }


    $: if (table && columns) {
        initializeTable();
    }

    let tabWidth: number;
    let frozenWidth: number;
    const handleWidthChange = () => {
        tabStyle = table.generateTemplateStyle();
        tabWidth = table.width;
        frozenWidth = table.frozenWidth;
    }

    let orderColumn: DataColumn = null as unknown as DataColumn;
    let orderDirection: OrderDirection = OrderDirection.Ascending;
    const sortRows = (compareFun: CompareFunction, descending: boolean) => {
        expandRow = null;
        let oList = list.sort(compareFun);
        table.data = descending ? oList.reverse() : oList;
        rows = table.rows;
    }
    const handleCellClick = (col: DataColumn) => (e: MouseEvent) => {
        if (col.compareFunction != null) {
            if (col == orderColumn) {
                orderDirection = orderDirection == OrderDirection.Ascending ? OrderDirection.Descending : OrderDirection.Ascending;
            } else {
                orderColumn = col;
                orderDirection = OrderDirection.Ascending;
            }
            sortRows(col.compareFunction, orderDirection == OrderDirection.Descending);
        }
    }

    let inlineComponent: any;
    const handleRowExpand = async (row: TableRow) => {
        if (row == expandRow) {
            expandRow = null;
            inlineComponent = null;
        } else {
            inlineComponent = await indicatorColumn?.buildInlineComponent?.(row.data);
            expandRow = row;
        }
    }

    $: rowHeight = rowHeight ?? 42;

</script>

<div id="tab-{id}" {style} class="uniface-data-table" class:cell-border={colBorder} class:row-border={rowBorder}>
    {@html tabStyle}
    {#if table && dataColumns && fixedCols}
        {#if indicatorColumn || fixedCols.length > 0}
            <FixedColumnsPanel {handleRowExpand} bind:selectedRows {orderDirection} {orderColumn} {handleCellClick} {indicatorColumn}
                               bind:expandRow {table}
                               {rowHeight} {fixedCols} {inlineRowHeight} {rows} {handleWidthChange} width={frozenWidth}
                               bind:scrollTop/>
        {/if}

        <ContentPanel columns={dataColumns} {orderDirection} {orderColumn} {handleWidthChange} {handleCellClick} {tabWidth} bind:rows
                      bind:scrollTop {expandRow} {rowHeight} {list} {table} {inlineComponent} bind:inlineRowHeight {emptyIndicator}
                      displayHorizontalScroll={actionsColumn!=null || indicatorColumn != null || fixedCols.length > 0}
                      showVerticalScroll={actionsColumn == null}/>
    {/if}

    {#if actionsColumn}
        <ActionPanel {expandRow} {rowHeight} {actionsColumn} {rows} {inlineRowHeight} bind:scrollTop/>
    {/if}
</div>
