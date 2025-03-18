<script lang="ts">


    import FormField from "$lib/form-field";
    import OptionsSelect from "$lib/options-select";
    import type UnitOption from "../../../lib/unit-number-editor/UnitOption";

    let data: any = {currency: 'CNY'}

    let currencyUnits:Array<UnitOption> = [
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
            code: "NZ",
            name: "New Zealand"
        },
        {
            code: "AU",
            name: "Australia"
        },
        {
            code: "CN",
            name: "China"
        }
    ]


</script>


<div style="width: 100%; height: 100%; padding: 15px; box-sizing: border-box; overflow: auto">
    <div style="padding-top: 30px; background-color: #FFFFFF;">
        <div class="example-description">
            <h1>普通</h1>
            <div>
                <span>Input: {JSON.stringify(data)}</span>
            </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px">
            <FormField label="Amount">
                <OptionsSelect variant="outlined" bind:value={data.currency} options={currencyUnits}/>
            </FormField>
        </div>
    </div>
    <div style="padding-top: 30px; background-color: #FFFFFF;">
        <div class="example-description">
            <h1>必填 - mandatory</h1>
            <div>
                <span>Input: {JSON.stringify(data)}</span>
            </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px">
            <FormField label="Amount" required>
                <OptionsSelect variant="outlined" mandatory bind:value={data.currency} options={currencyUnits}/>
            </FormField>
        </div>
    </div>

    <div style="padding-top: 30px; background-color: #FFFFFF;">
        <div class="example-description">
            <h1>placeholder</h1>
            <div>
                <span>Input: {JSON.stringify(data)}</span>
            </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px">
            <FormField label="Amount" required>
                <OptionsSelect variant="outlined" mandatory placeholder="Please select the currency" bind:value={data.curr} options={currencyUnits}/>
            </FormField>
        </div>
    </div>

    <div style="padding-top: 30px; background-color: #FFFFFF;">
        <div class="example-description">
            <h1>EmptyText</h1>
            <div>
                <span>Input: {JSON.stringify(data)}</span>
            </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px">
            <FormField label="Gender">
                <OptionsSelect variant="outlined" mandatory emptyText="Unknown" bind:value={data.gender} options={genders}/>
            </FormField>
        </div>
    </div>

    <div style="padding-top: 30px; background-color: #FFFFFF;">
        <div class="example-description">
            <h1>更改显示字段的属性名</h1>
            <div>
                <span>Input: {JSON.stringify(data)}</span>
            </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px">
            <FormField label="Gender">
                <OptionsSelect variant="outlined" mandatory textField="name" bind:value={data.country} options={country}/>
            </FormField>
        </div>
    </div>

</div>