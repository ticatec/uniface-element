import ConcatPerson from "./ConcatPerson.svelte";
import type DataColumn from "$lib/data-table/lib/DataColumn";


const compareObjects = (v1: any, v2: any): number => {
    if (v1 == null) {
        return v2 == null ? 0 : -1
    } else if (v2 == null) {
        return 1
    } else {
        return v1 == v2 ? 0 : v1 < v2 ? -1 : 1;
    }
}

const columns: Array<DataColumn> =
    [
        {
            "text": "姓名",
            "field": "name",
            "width": 130,
            "frozen": false,
            "resizable": true,
            compareFunction: (o1: any, o2: any) => compareObjects(o1?.address, o2?.address),
        },
        {
            "text": "性别",
            "width": 60,
            "field": "gender",
            "align": "center",
            formatter: (value: any) => value == null ? '' : value == 'M' ? '<span style="color: red">男</span>' : '<span>女</span>',
            escapeHTML: true
        },

        {
            "text": "家庭地址",
            "width": 360,
            "field": "address",
            hint: (item: any) => item.address,
            "resizable": true,
            "visible": true,
            compareFunction: (o1: any, o2: any) => compareObjects(o1?.address, o2?.address),
        },
        {
            "text": "联系电话",
            "width": 150,
            "field": "phone",
            align: "center",
            "href": (item: any) => {
                return [{
                    text: "查看详情",
                    action: () => {
                        window.Toast.show(`查看详情-${item.name ?? '无'}`);
                    }
                }, {
                    text: "申请加急",
                    action: () => {
                        window.Toast.show(`申请加急-${item.name ?? '无'}`);
                    }
                }]
            }
        },
        {
            "text": "联系人",
            "width": 90,
            "field": "concat",
            "visible": true,
            "align": "right",
            "render": ConcatPerson
        },

        {
            "text": "疾病",
            field: "disease",
            "width": 120,
            "resizable": true,
            "visible": true,
            compareFunction: (o1: any, o2: any) => compareObjects(o1?.disease, o2?.disease),
        },
        {
            "text": "费用",
            "width": 120,
            "resizable": true,
            "visible": true
        },
        {
            "text": "入院日期",
            "width": 120,
            "resizable": true,
            "visible": true
        },
        {
            "text": "出院日期",
            "width": 120,
            "resizable": true,
            "visible": true
        },
        {
            "text": "备注",
            "width": 230
        }
    ]

export default columns;