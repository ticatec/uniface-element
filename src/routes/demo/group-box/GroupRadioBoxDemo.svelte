<script lang="ts">
    import GroupCheckBox from "$lib/group-box/group-check-box";
    import {DisplayMode} from "$lib";
    import FormField from "$lib/form-field";
    import DemoBlock from "../DemoBlock.svelte";
    import GroupRadioBox from "$lib/group-box/group-radio-box";

    let airlines = [
        {code: "C", text: "南方航空"},
        {code: "A", text: "国际航空"},
        {code: "S", text: "东方航空"},
        {code: "N", text: "新西兰航空"},
        {code: "AU", text: "澳洲航空"},
        {code: "SG", text: "新加坡航空"},
    ];

    let data: any = {}
</script>

<div style="width: 100%; padding: 12px">
    <div class="demo-blocks">
        <DemoBlock style="grid-column: 1/4" title="Common GroupRadioBox" displayText={data.preferred}>
            <div slot="description">
                <span>普通的多选框，结果为字符串，用<b>;</b>连接</span>
            </div>
            <FormField label="Select preferred airlines">
                <GroupRadioBox options={airlines} bind:value={data.preferred}/>
            </FormField>
        </DemoBlock>
        <DemoBlock style="grid-column: 1/4" title="Outlined GroupCheckBox" displayText={data.preferred}>
            <div slot="description">
                <span>带外框的字段</span>
            </div>
            <FormField label="Select preferred airlines">
                <GroupRadioBox compact variant="outlined" options={airlines} bind:value={data.preferred}/>
            </FormField>
        </DemoBlock>
    </div>
</div>