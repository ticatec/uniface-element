<script lang="ts">
    import GroupCheckBox from "$lib/group-box/group-check-box";
    import {DisplayMode} from "$lib";
    import FormField from "$lib/form-field";
    import DemoBlock from "../DemoBlock.svelte";
    import DatePicker from "$lib/date-picker";


    let data: any = {}
</script>

<div style="width: 100%; padding: 12px">
    <div class="demo-blocks">
        <DemoBlock style="" title="Common Date Picker" displayText={data.enrolmentDate?.toISOString()}>
            <div slot="description">
                <span>普通的日期选择框</span>
            </div>
            <FormField label="Enrolment Date:">
                <DatePicker bind:value={data.enrolmentDate}/>
            </FormField>
        </DemoBlock>
        <DemoBlock title="Date Picker mandatory" displayText={data.birthday?.toISOString()}>
            <div slot="description">
                <span>Outlined 必填日期，没有删除图标</span>
            </div>
            <FormField label="DOB">
                <DatePicker variant="outlined" mandatory bind:value={data.birthday}/>
            </FormField>
        </DemoBlock>
        <DemoBlock title="Filled Date Picker" displayText={data.admissionDate?.toISOString()}>
            <div slot="description">
                <span>带填充的字段</span>
            </div>
            <FormField label="Admission Date">
                <DatePicker variant="filled" bind:value={data.admissionDate}/>
            </FormField>
        </DemoBlock>
        <DemoBlock title="Date Picker disabled" displayText={data.admissionDate?.toISOString()}>
            <div slot="description">
                <span>禁用</span>
            </div>

            <FormField label="Admission Date">
                <DatePicker variant="filled" disabled bind:value={data.admissionDate}/>
            </FormField>
        </DemoBlock>
        <DemoBlock title="Date Picker readonly" displayText={data.admissionDate?.toISOString()}>
            <div slot="description">
                <span>只读展示</span>
            </div>
            <FormField label="Admission Date">
                <DatePicker variant="filled" readonly bind:value={data.admissionDate}/>
            </FormField>
        </DemoBlock>
        <DemoBlock title="Date Picker display only" displayText={data.admissionDate?.toISOString()}>
            <div slot="description">
                <span>只读展示</span>
            </div>
            <FormField label="Admission Date">
                <DatePicker displayMode={DisplayMode.View} variant="filled" readonly bind:value={data.admissionDate}/>
            </FormField>
        </DemoBlock>
        <DemoBlock title="Date Picker with last date" displayText={data.completedDate?.toISOString()}>
            <div slot="description">
                <span>截止到当天</span>
            </div>
            <FormField label="Admission Date">
                <DatePicker variant="filled" max={new Date()} bind:value={data.completedDate}/>
            </FormField>
        </DemoBlock>
        <DemoBlock title="Date Picker with last date" displayText={data.bookFrom?.toISOString()}>
            <div slot="description">
                <span>从明天开始</span>
            </div>
            <FormField label="Admission Date">
                <DatePicker variant="filled" min={new Date()} bind:value={data.bookFrom}/>
            </FormField>
        </DemoBlock>
    </div>
</div>