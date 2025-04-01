<script lang="ts">
    import columns from "./columns";
    import type ActionsColumn from "$lib/data-table/lib/ActionsColumn";
    import InlineComponent from "./InlineComponent.svelte";
    import DataTable from "$lib/data-table";
    import Box from "$lib/box";
    import type {IndicatorColumn, RowAction} from "$lib";
    import {onMount} from "svelte";

    let actionsColumn: ActionsColumn = {
        width: 110,
        align: 'left',
        getActions: (item: any) => {
            let actions:Array<RowAction> = [
                {
                    label: '查看',
                    icon: 'icon_google_list_alt',
                    callback: () => {
                        console.log(item)
                    }
                },
                {
                    label: '修改',
                    icon: 'icon_google_create',
                    type: "secondary",
                    callback: () => {
                        console.log(item)
                    }
                }
            ]
            let m = Math.random();
            if (m > 0.25) {
                actions.push({
                    label: '锁定',
                    callback: () => {
                        console.log(item)
                    }
                });
            }
            if (m > 0.5) {
                actions.push({
                    label: '解锁',
                    callback: () => {
                        console.log(item)
                    }
                });
            }
            if (m > 0.6) {
                actions.push({
                    label: '删除',
                    type: "secondary",
                    icon: 'icon_google_delete',
                    callback: () => {
                        console.log(item)
                    }
                })
            }
            return actions;
        }
    }
    let list:Array<any> = [];
    let list2 = [
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

    onMount(()=> {
        setTimeout(()=>{list=list2}, 5000);
    })
</script>


<div style="padding: 20px; box-sizing: border-box; height: 100%; background-color: #FFFFFF">
    <Box style="width: 100%; height: 100%; border-radius: 8px; " content$style="width: 100%;  height: 100%;  padding: 12px" title="患者数据列表">
        <DataTable style="width: 100%; height: 100%" {indicatorColumn} bind:selectedRows {columns} emptyIndicator="当前没有复合条件的数据，请更改查询参数"
                   {list} {actionsColumn}/>
        <div slot="footer" style="height: 48px;">
            <div style="position: relative; top: 50%; transform: translateY(-50%)">
                <span>分页</span>
            </div>
        </div>
    </Box>
</div>
