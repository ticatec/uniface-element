<script lang="ts">

    import Pagination from "$lib/pagination";
    import type {OnPageChange} from "$lib/pagination/OnPageChange";
    import PaginationPanel from "$lib/pagination-panel";


    export let onPageChange: OnPageChange;

    let pageCount = 10;
    let pageNo = 4;

    const handlePageChange = (p: number) => {
        pageNo = p;
    }

    const handleRowsCountChange = (rows: number) => {
        console.log('每页数量', rows)
    }

    let total: number = 30;

    const generateInfo = () => {
        return `<b style="color: #007bff">${pageCount}</b> 页合计 <b style="color: #007bff">${total}</b> 条记录`
    }

    let rowsSet;
    let rowCountLabel;

</script>

<div style="width: 100%; padding: 20px 10%; box-sizing: border-box">

    <div style="width: 100%">
        <Pagination {pageCount} {pageNo} onPageChange={handlePageChange}/>
    </div>


    <div style="width: 100%; border: 1px solid #8AA7FF">
        <PaginationPanel {total} {pageCount} {pageNo} {rowsSet} {rowCountLabel} onPageChange={handlePageChange}
                         onRowCountChanged={handleRowsCountChange} {generateInfo}/>
    </div>

</div>