<script lang="ts">
    import columns from "./columns";
    //import type ActionsColumn from "../lib/lib/ActionsColumn";
    import InlineComponent from "./InlineComponent.svelte";
    import DataTable from "$lib/data-table";
    import Box from "$lib/box";

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

    let indicatorColumn = {
        width: 60,
        selectable: true,
        buildInlineComponent: async (data: any) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
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

    $:console.log(selectedRows)
</script>


<div style="padding: 20px; box-sizing: border-box; height: 100%; background-color: #FFFFFF">
    <Box style="width: 100%; height: 100%; border-radius: 8px; display: flex; flex-direction: column">
        <div style="height: 48px; flex: 0 0  auto">
            <span>患者数据列表</span>
        </div>
        <DataTable style="flex: 1 1 auto" bind:selectedRows {columns} {indicatorColumn} {list} {actionsColumn} emptyIndicator="没有符合条件的数据，请重新设置查询条件"
                   on:rowDblClick={(e)=>{console.log('dbl click', e.detail)}}
                   on:rowClick={(e)=>{console.debug('rowclick', e.detail)}}/>
        <div style="height: 48px; flex: 0 0  auto">
            <span>分页</span>
        </div>
    </Box>
</div>
