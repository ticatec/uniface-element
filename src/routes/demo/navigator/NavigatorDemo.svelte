<script lang="ts">
    import Navigator, {NavItemStatus} from "$lib/navigator";
    import Box from "$lib/box";
    import PropertyEditor from "$lib/property-editor/PropertyEditor.svelte";
    import type PropertyField from "$lib/property-editor/MetaEditorType";
    import { MetaEditorType } from "\$lib/property-editor/MetaEditorType";
    import {onMount} from "svelte";


    onMount(async() => {

    })
    const itemClickHandler = (item: any) => {

    }

    const retrieveStatus = (item: any): NavItemStatus => {
        return item.status;
    }

    let items: Array<any> = [
        {text: '人员信息', status: NavItemStatus.Completed},
        {text: '基本信息', status: NavItemStatus.Completed},
        {text: '性征评估', status: NavItemStatus.Completed},
        {text: '病情评估', status: NavItemStatus.Completed},
        {text: '来院方式', status: NavItemStatus.NotStart},
        {text: '基本生命特征', status: NavItemStatus.NotStart},
        {text: '院前溶栓治疗', status: NavItemStatus.NotStart},
        {text: '院内溶栓治疗', status: NavItemStatus.NotStart},
        {text: '心电图', status: NavItemStatus.NotStart},
        {text: '实验室检查', status: NavItemStatus.NotStart},
        {text: '心内科会诊', status: NavItemStatus.NotStart},
        {text: '基本信息', status: NavItemStatus.NotStart},
        {text: '性征评估', status: NavItemStatus.Warning},
        {text: '病情评估', status: NavItemStatus.Warning},
        {text: '来院方式', status: NavItemStatus.Warning},
        {text: '基本生命特征', status: NavItemStatus.Warning},
        {text: '院前溶栓治疗', status: NavItemStatus.Warning},
        {text: '院内溶栓治疗', status: NavItemStatus.Warning},
        {text: '心电图', status: NavItemStatus.Warning},
        {text: '实验室检查', status: NavItemStatus.Warning},
        {text: '心内科会诊'},
        {text: '基本信息'},
        {text: '性征评估'},
        {text: '病情评估'},
        {text: '来院方式'},
        {text: '基本生命特征'},
        {text: '院前溶栓治疗'},
        {text: '院内溶栓治疗'},
        {text: '心电图'},
        {text: '实验室检查'},
        {text: '心内科会诊'},
        {text: '基本信息'},
        {text: '性征评估'},
        {text: '病情评估'},
        {text: '来院方式'},
        {text: '基本生命特征'},
        {text: '院前溶栓治疗'},
        {text: '院内溶栓治疗'},
        {text: '心电图'},
        {text: '实验室检查'},
        {text: '心内科会诊'},
    ]


</script>

<div style="padding: 30px; height: 100%; overflow: hidden; box-sizing: border-box; display: flex; flex-direction: row; gap: 10px">
    <div style="width: 280px; height: 100%; box-sizing: border-box">
        <Navigator {items} {retrieveStatus} {itemClickHandler}/>
    </div>

</div>