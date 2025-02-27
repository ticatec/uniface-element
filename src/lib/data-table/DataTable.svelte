<script lang="ts">


    import TableHeaderPanel from "./parts/TableHeaderPanel.svelte";
    import ContentPanel from "./parts/ContentPanel.svelte";
    import type DataColumn from "./lib/DataColumn";
    import type ActionsColumn from "./lib/ActionsColumn";
    import type IndicatorColumn from "./lib/IndicatorColumn";
    import type TableRow from "./parts/TableRow";
    import type {CompareFunction} from "./lib/CompareFunction";
    import UniDataTable, {SelectionMode} from "./UniDataTable";
    import {onMount, tick} from "svelte";

    export let columns: Array<DataColumn>;
    export let actionsColumn: ActionsColumn | null;
    export let indicatorColumn: IndicatorColumn;
    export let rowHeight: number = null as unknown as number;  //{ rowHeight}
    export let list;
    export let selectedRows: Array<any> = [];

    let dataColumns: Array<DataColumn> = [];

    let colStyle: string = '';
    let scrollLeft: number = 0;
    let rows: Array<TableRow>;
    let table: UniDataTable = null as unknown as UniDataTable;
    export let selectionMode: SelectionMode = SelectionMode.None;

    let id: string = `${(new Date()).getTime().toString(16)}-${(Math.round(1000 * Math.random()) + 10000).toString(16)}`;

    onMount(() => {
        table = new UniDataTable(id, indicatorColumn.width);
    })
    const sortRows = (compareFun: CompareFunction, descending: boolean) => {
        let oList = list.sort(compareFun);
        displayList = descending ? oList.reverse() : oList;
        rows = table.rows;
    }

    const handleDataSelected = async (value: boolean) => {
        rows.forEach(row => row.selected = value);
        selectedRows = rows.filter(item => item.selected).map(item => item.data);
        await tick();
        selectionMode = value ? SelectionMode.All : SelectionMode.None;
        rows = [...rows];
    }

    $: selectedRows = selectedRows ?? [];

    $: displayList = [...list];

    $: {
        if (table && columns) {
            table.setColumns(columns)
            table.data = displayList;
            rows = table.rows;
            dataColumns = table.columns;
            colStyle = table.generateTemplateStyle();
            tabWidth = table.width;
        }
    }

    let tabWidth: number;

    const handleWidthChange = () => {
        colStyle = table.generateTemplateStyle();
        tabWidth = table.width;
    }


    const handleRowSelectChange = async () => {
        selectedRows = rows.filter(item => item.selected).map(item => item.data);
        selectionMode = selectedRows.length == rows.length ? SelectionMode.All : selectedRows.length == 0 ? SelectionMode.None : SelectionMode.Partial;
    }

</script>

<div id="tab-{id}" class="uniface-data-table">
    {@html colStyle}
    {#if table}
        <div>
            <TableHeaderPanel sortData={sortRows} {selectionMode} frozenCols={[]} dataCols={dataColumns}
                              {scrollLeft} width={tabWidth}
                              {indicatorColumn} {actionsColumn} handleToggleSelectAll={handleDataSelected} {handleWidthChange}/>
            {#if colStyle.length > 0 && list}
                <ContentPanel columns={dataColumns} {rows} {indicatorColumn} {actionsColumn}
                              bind:scrollLeft {rowHeight} width={tabWidth} {handleRowSelectChange}/>
            {/if}
        </div>
    {/if}
</div>
