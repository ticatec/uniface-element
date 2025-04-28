<script lang="ts">
    import GroupCheckBox from "$lib/group-box/group-check-box";
    import {DisplayMode} from "$lib";
    import FormField from "$lib/form-field";
    import DemoBlock from "../DemoBlock.svelte";

    let airlines = [
        {code: "N/A", text: "无"},
        {code: "C", text: "南方航空"},
        {code: "A", text: "国际航空"},
        {code: "S", text: "东方航空"},
        {code: "N", text: "新西兰航空"},
        {code: "AU", text: "澳洲航空"},
        {code: "SG", text: "新加坡航空"},
    ];

    let data: any = {}

    let disabledItems:any = [];

    const handleSelectionChange = (value: string) => {
        if (value == '') {
            disabledItems = [];
        } else {
            let items = value.split(';');
            console.log(value, items);
            if (items[items.length - 1] == "N/A") {
                data.preferred = "N/A";
                disabledItems = airlines.filter(item => item.code != "N/A").map(item => (item.code));
            } else if (items[0] == "N/A") {
                items.splice(0, 1);
                data.preferred = items.join(';');
            }
        }
        console.log(data.preferred);
    }

</script>

<div style="width: 100%; padding: 12px">
    <div class="demo-blocks">
        <DemoBlock style="grid-column: 1/4" title="Common GroupCheckBox" displayText={data.preferred}>
            <div slot="description">
                <span>普通的多选框，结果为字符串，用<b>;</b>连接</span>
            </div>
            <FormField label="Select preferred airlines">
                <GroupCheckBox options={airlines} bind:value={data.preferred} disabledOptions={disabledItems} onChange={handleSelectionChange}/>
            </FormField>
        </DemoBlock>
        <DemoBlock style="grid-column: 4/7" title="Bits GroupCheckBox" displayText={`${data.preferredValue} - ${(data.preferredValue??0).toString(2)}`}>
            <div slot="description">
                <span>多选框，结果为整数，每个选项代表一个比特位</span>
            </div>
            <FormField label="Select preferred airlines">
                <GroupCheckBox options={airlines} bitBase bind:value={data.preferredValue}/>
            </FormField>
        </DemoBlock>
        <DemoBlock style="grid-column: 1/4" title="Outlined GroupCheckBox" displayText={data.preferred}>
            <div slot="description">
                <span>带外框的字段</span>
            </div>
            <FormField label="Select preferred airlines">
                <GroupCheckBox variant="outlined" options={airlines} bind:value={data.preferred}/>
            </FormField>
        </DemoBlock>
        <DemoBlock style="grid-column: 4/7" title="Filled GroupCheckBox" displayText={data.preferred}>
            <div slot="description">
                <span>带填充底色的字段</span>
            </div>
            <FormField label="Select preferred airlines">
                <GroupCheckBox variant="filled" options={airlines} bind:value={data.preferred}/>
            </FormField>
        </DemoBlock>
        <DemoBlock style="grid-column: 1/4" title="GroupCheckBox with disabled items" displayText={data.preferred}>
            <div slot="description">
                <span>可以禁选指定的项目</span>
            </div>
            <FormField label="Select preferred airlines">
                <GroupCheckBox variant="filled" disabledOptions={["AU","N"]} options={airlines} bind:value={data.preferred}/>
            </FormField>
        </DemoBlock>
        <DemoBlock style="grid-column: 4/7" title="GroupCheckBox with hidden items" displayText={`${data.preferredValue} - ${(data.preferredValue??0).toString(2)}`}>
            <div slot="description">
                <span>可以隐藏指定的项目</span>
            </div>
            <FormField label="Select preferred airlines">
                <GroupCheckBox variant="filled" bitBase hideOptions={["AU","N"]} options={airlines} bind:value={data.preferredValue}/>
            </FormField>
        </DemoBlock>
        <DemoBlock style="grid-column: 1/4" title="GroupCheckBox disabled" displayText={data.preferred}>
            <div slot="description">
                <span>禁用</span>
            </div>
            <FormField label="Your preferred airlines">
                <GroupCheckBox disabled options={airlines} bind:value={data.preferred}/>
            </FormField>
        </DemoBlock>
        <DemoBlock style="grid-column: 4/7" title="GroupCheckBox readonly" displayText={data.preferred}>
            <div slot="description">
                <span>只读展示</span>
            </div>
            <FormField label="Your preferred airlines">
                <GroupCheckBox readonly options={airlines} bind:value={data.preferred}/>
            </FormField>
        </DemoBlock>
        <DemoBlock style="grid-column: 1/4" title="GroupCheckBox display only" displayText={data.preferred}>
            <div slot="description">
                <span>只读展示</span>
            </div>
            <FormField label="Your preferred airlines">
                <GroupCheckBox displayMode={DisplayMode.View} disabledOptions={["AU","N"]} options={airlines} bind:value={data.preferred}/>
            </FormField>
        </DemoBlock>
    </div>
</div>