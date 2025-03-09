<script lang="ts">
    import columns from "./columns";
    //import type ActionsColumn from "../lib/lib/ActionsColumn";
    import InlineComponent from "./InlineComponent.svelte";
    import DataTable from "$lib/data-table";
    import Box from "$lib/box";
    import type {IndicatorColumn} from "$lib";

    let actionsColumn = {
        title: "动作",
        width: 130,
        vacancy: 3,
        getActions: (item: any) => {
            return [
                {
                    label: '查看',
                    callback: () => {
                        console.log(item)
                    }
                },
                {
                    label: '修改',
                    callback: () => {
                        console.log(item)
                    }
                },
                {
                    label: '锁定',
                    callback: () => {
                        console.log(item)
                    }
                },
                {
                    label: '解锁',
                    callback: () => {
                        console.log(item)
                    }
                },
                {
                    label: '删除',
                    callback: () => {
                        console.log(item)
                    }
                }
            ]
        }
    }
    let list2 = [];
    let list = [
        {
            name: "张三",
            gender: "M",
            address: "18 Cold Street. 18 Cold Street. 18 Cold Street. 18 Cold Street. 18 Cold Street.",
            phone: "04-35689 215",
            concat: "James",
            admissionDate: ""
        },
        {
            name: "张三",
            gender: "M",
            address: "河北省石家庄市红旗大街",
            phone: "04-35689 215",
            concat: "James",
            admissionDate: ""
        },
        {id: 5},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {}
    ]

    let indicatorColumn: IndicatorColumn = {
        width: 70,
        selectable: true,
        displayNo: true,
        buildInlineComponent: async (data: any) => {
            return new Promise((resolve, reject) => {
                window.Indicator.show('loading data...')
                setTimeout(() => {
                    window.Indicator.hide();
                    if (data.id == 5) {
                        reject(new Error('详情不存在'))
                    } else {
                        resolve(InlineComponent)
                    }
                }, 3000);
            })
        }
    }

    let selectedRows: Array<any> = [];
    let selectedRows1: Array<any> = [];

    let columns1 = JSON.parse(JSON.stringify(columns))
    //colBorder {actionsColumn}
    $:console.log(selectedRows)
</script>


<div style="padding: 20px; box-sizing: border-box; height: 100%; background-color: #FFFFFF">
    <Box style="width: 100%; height: 100%; border-radius: 8px; " content$style="width: 100%;  height: 100%; " title="患者数据列表">
        <DataTable rowBorder style="width: 100%; height:100%; border-top: 1px solid #e1e1e1" {indicatorColumn} bind:selectedRows {columns}
                   {list}
                   {actionsColumn}/>
<!--        <DataTable rowBorder style="width: 100%; height: 50%; border-top: 1px solid #e1e1e1" {indicatorColumn} bind:selectedRows={selectedRows1}-->
<!--                   columns={columns1} {list}-->
<!--                   />-->
        <div slot="footer" style="height: 48px; flex: 0 0  auto">
            <span>分页</span>
        </div>
    </Box>
</div>
