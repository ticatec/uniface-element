<script lang="ts">

    import Pagination from "../pagination";
    import OptionSelect from "../options-select";
    import type {OnPageChange} from "$lib/pagination/OnPageChange";
    import type {OnRowCountChanged} from "$lib/pagination-panel/OnRowCountChanged";
    import type {GenerateTotalInfo} from "$lib/pagination-panel/GenerateTotalInfo";

    export let pageCount: number = 0;
    export let pageNo: number = 1;
    export let type: 'plain' | 'round' | 'circle' = "round"
    export let page$style: string = '';
    export let big: boolean = false;
    export let rowsSet: Array<number> = [25, 50, 100];
    export let total: number = null as unknown as number;
    export let generateInfo: GenerateTotalInfo;
    export let rowCount: number = 25;
    export let rowCountLabel: string = 'Rows/Page';
    export let align: 'left' | 'right' | '' = '';

    export let onRowCountChanged: OnRowCountChanged;

    export let onPageChange: OnPageChange;


    let pagesOptions: Array<any> = [];

    $: {
        pagesOptions = (rowsSet ?? [25, 50, 100]).map(v => ({code: v, text: `${v}`}));
    }

    const handlePageChange = () => {
        onRowCountChanged(rowCount);
    }

    let totalText: string;

    $: totalText = generateInfo ? generateInfo(total, pageCount, pageNo, rowCount) : `Total: <b>${total}</b> entities.`;

</script>

<div class="uniface-pagination-panel {align}">
    <div class="page-options">
        <OptionSelect compact={!big || type=="plain"} style="width: 80px" variant="outlined" mandatory options={pagesOptions}
                      bind:value={rowCount} onChange={handlePageChange}/>
        <span style="margin-left: 8px">{rowCountLabel}</span>
    </div>
    <div class="pagination">
        <Pagination {pageCount} {pageNo} {type} style={page$style} {big} {onPageChange}/>
    </div>
    <div class="pagination-info">
        {@html totalText}
    </div>
</div>
