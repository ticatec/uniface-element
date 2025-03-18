<script lang="ts">


    import FormField from "$lib/form-field";
    import UnitNumberEditor from "$lib/unit-number-editor";
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

    let lengthUnits:Array<UnitOption> = [
        {
            code: "M",
            text: "M",
            precision: 3,
            ratio: 1
        },
        {
            code: "CM",
            text: "CM",
            precision: 1,
            ratio: 100
        },
        {
            code: "MM",
            text: "MM",
            precision: 0,
            ratio: 1000
        }
    ]

    let length1Units:Array<UnitOption> = [
        {
            code: "KM",
            text: "KM",
            precision: 6,
            ratio: 0.001
        },
        {
            code: "M",
            text: "M",
            precision: 3,
            ratio: 1,
            max: 5,
            min: 1
        },
        {
            code: "CM",
            text: "CM",
            precision: 1,
            ratio: 100,
            max: 500,
            min: 100
        },
        {
            code: "MM",
            text: "MM",
            precision: 0,
            ratio: 1000,
            max: 5000,
            min: 1000
        }
    ]

</script>


<div style="width: 100%; height: 100%; padding: 15px; box-sizing: border-box; overflow: auto">
    <div style="padding-top: 30px; background-color: #FFFFFF;">
        <div class="example-description">
            <h1>没有自动转换</h1>
            <div>
                <span>Input: {JSON.stringify(data)}</span>
            </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px">
            <FormField label="Amount">
                <UnitNumberEditor variant="outlined" bind:value={data.amount} units={currencyUnits} bind:unitCode={data.currency}/>
            </FormField>
        </div>
    </div>
    <div style="padding-top: 30px; background-color: #FFFFFF;">
        <div class="example-description">
            <h1>可以自动转换</h1>
            <div>
                <span>Input: {JSON.stringify(data)}</span>
            </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px">
            <FormField label="Length">
                <UnitNumberEditor variant="outlined" bind:value={data.length} units={lengthUnits} bind:unitCode={data.heightDisplayUnit}/>
            </FormField>
        </div>
    </div>
    <div style="padding-top: 30px; background-color: #FFFFFF;">
        <div class="example-description">
            <h1>可以自动转换带最大最小值</h1>
            <div>
                <span>Input: {JSON.stringify(data)}</span>
            </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px">
            <FormField label="Length">
                <UnitNumberEditor variant="outlined" bind:value={data.length1} units={length1Units} bind:unitCode={data.height1DisplayUnit}/>
            </FormField>
        </div>
    </div>
</div>