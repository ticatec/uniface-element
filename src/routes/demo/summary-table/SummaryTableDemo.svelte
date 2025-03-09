<script lang="ts">
    import SummaryTable, {type Column} from "../../../lib/concise-data-table";

    import list from "./students_data.json";
    import {onMount} from "svelte";
    import type {TableOptions} from "$lib/concise-data-table/TableOptions";
    import Box from "$lib/box";

    let columns: Array<Column> = [
        {
            title: 'name',
            field: 'name',
            width: 150,
            align: "center"
        },
        {
            title: 'nationality',
            field: 'nationality',
            width: 150
        },
        {
            title: 'address',
            field: 'address',
            width: 150,
            weight: 1
        },
        {
            title: 'enrollment date',
            field: 'enrollment_date',
            width: 150,
            align: "center"
        },
        {
            title: 'major',
            field: 'major',
            width: 150,
            align: "center"
        }
    ]

    let arr: Array<any> = [...list];
    onMount(() => {
        let interval = setInterval(() => {
            console.log('刷新数据。。。')
            //arr = [...list]
        }, 10000);
        return () => {
            clearInterval(interval)
        }
    })

    let options: TableOptions = {
        //rowHeight: 32,
        //headerHeight: 36,
        //headerBackgroundColor: '#81D4FA',
        //headerColor: '#374151',
        //backgroundColor: '#0061FF',
        //color: "#ffffff",
        // alternativeBackgroundColor: '#0061FF',
        // alternativeColor: "#ffffff"
    }

    const rowClickHandler = (row: any) => {
        console.log(row);
    }

</script>
<div style="padding: 12px">
    <Box style="width: 1200px; height: 400px; margin: 0 auto">
        <SummaryTable list={arr} {columns} height="400" autoScroll {options} {rowClickHandler}/>
    </Box>

    <Box style="width: 1200px; height: 400px; margin: 20px auto">
        <SummaryTable list={arr} {columns} height="400" {options} {rowClickHandler}/>
    </Box>
</div>