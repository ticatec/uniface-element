<script lang="ts">

    import {DisplayMode} from "$lib";
    import FormField from "$lib/form-field";
    import DemoBlock from "../DemoBlock.svelte";
    import {DateTimePicker} from "$lib/date-picker";


    let data: any = {}
</script>

<div style="width: 100%; padding: 12px">
    <div class="demo-blocks">
        <DemoBlock style="" title="Common Date Picker" displayText={data.cutoffOn?.toISOString()}>
            <div slot="description">
                <span>普通的日期选择框</span>
            </div>
            <FormField label="Cut off time:">
                <DateTimePicker bind:value={data.cutoffOn}/>
            </FormField>
        </DemoBlock>
        <DemoBlock title="Date time Picker mandatory" displayText={data.releaseDate?.toISOString()}>
            <div slot="description">
                <span>Outlined 必填到秒，没有删除图标</span>
            </div>
            <FormField label="DOB">
                <DateTimePicker variant="outlined" precision="S" mandatory bind:value={data.releaseDate}/>
            </FormField>
        </DemoBlock>
        <DemoBlock title="Filled Date Picker" displayText={data.admissionDate?.toISOString()}>
            <div slot="description">
                <span>带填充的字段</span>
            </div>
            <FormField label="Admission Date">
                <DateTimePicker variant="filled" bind:value={data.admissionDate}/>
            </FormField>
        </DemoBlock>
        <DemoBlock title="Date Picker disabled" displayText={data.admissionDate?.toISOString()}>
            <div slot="description">
                <span>禁用</span>
            </div>

            <FormField label="Admission Date">
                <DateTimePicker variant="filled" disabled bind:value={data.admissionDate}/>
            </FormField>
        </DemoBlock>
        <DemoBlock title="Date Picker readonly" displayText={data.admissionDate?.toISOString()}>
            <div slot="description">
                <span>只读展示</span>
            </div>
            <FormField label="Admission Date">
                <DateTimePicker variant="filled" readonly bind:value={data.admissionDate}/>
            </FormField>
        </DemoBlock>
        <DemoBlock title="Date Picker display only" displayText={data.preferred}>
            <div slot="description">
                <span>只读展示</span>
            </div>
            <FormField label="Admission Date">
                <DateTimePicker displayMode={DisplayMode.View} variant="filled" readonly bind:value={data.admissionDate}/>
            </FormField>
        </DemoBlock>
    </div>
</div>