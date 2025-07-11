<script lang="ts">


    import FormField from "$lib/form-field";
    import OptionsSelect from "$lib/options-select";
    import type UnitOption from "../../../lib/unit-number-editor/UnitOption";
    import DemoBlock from "../DemoBlock.svelte";
    import DatePicker from "$lib/date-picker";
    import CountryRender from "./CountryRender.svelte";

    let data: any = {currency: 'CNY'}

    let currencyUnits: Array<UnitOption> = [
        {
            code: "USD",
            text: "USD"
        },
        {
            code: "CNY",
            text: "CNY"
        },
        {
            code: "GBP",
            text: "GBP"
        }
    ]

    let genders = [
        {
            code: "M",
            text: "Male"
        },
        {
            code: "F",
            text: "Female"
        }
    ]

    let country = [
        {
            id: "NZ",
            name: "New Zealand"
        },
        {
            id: "AU",
            name: "Australia"
        },
        {
            id: "CN",
            name: "China"
        }
    ]


</script>
<div style="width: 100%; padding: 12px">
    <div class="demo-blocks">
        <DemoBlock title="Simple" displayText={data.currency}>
            <div slot="description">
                <span>Simple example for options select</span>
            </div>
            <FormField label="Currency">
                <OptionsSelect variant="outlined" bind:value={data.currency} options={currencyUnits} onSelected={(d)=>{console.log(d)}}/>
            </FormField>
        </DemoBlock>
        <DemoBlock title="Mandatory" displayText={data.currency1}>
            <div slot="description">
                <span>Simple example for options select</span>
            </div>
            <FormField label="Currency">
                <OptionsSelect variant="outlined" mandatory bind:value={data.currency1} options={currencyUnits}/>
            </FormField>
        </DemoBlock>
        <DemoBlock title="Placeholder" displayText={data.currency2}>
            <div slot="description">
                <span>Simple example for options select</span>
            </div>
            <FormField label="Currency">
                <OptionsSelect variant="outlined" mandatory placeholder="Please select the currency" bind:value={data.currency2}
                               options={currencyUnits}/>
            </FormField>
        </DemoBlock>
        <DemoBlock title="EmptyText" displayText={data.gender}>
            <div slot="description">
                <span>Simple example for options select</span>
            </div>
            <FormField label="Gender">
                <OptionsSelect variant="outlined" mandatory emptyText="Unknown" bind:value={data.gender} options={genders}/>
            </FormField>
        </DemoBlock>
        <DemoBlock title="更改键值/显示字段的属性名" displayText={data.country}>
            <div slot="description">
                <span>Simple example for options select</span>
            </div>
            <FormField label="Country">
                <OptionsSelect variant="outlined" mandatory textField="name" keyField="id" bind:value={data.country} options={country}/>
            </FormField>
        </DemoBlock>
        <DemoBlock title="Customize item render" displayText={data.country}>
            <div slot="description">
                <span>通过自定义组件渲染下拉框中的条目</span>
            </div>
            <FormField label="Country">
                <OptionsSelect variant="outlined" mandatory textField="name" keyField="id" bind:value={data.country} options={country}
                               itemRender={{component: CountryRender, props: {onIconClick: (item) => ()=> {console.log(item)}}}}/>
            </FormField>
        </DemoBlock>
    </div>
</div>