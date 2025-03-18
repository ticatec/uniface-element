<script lang="ts">

    import {DisplayMode} from "$lib";
    import FormField from "$lib/form-field";
    import NumberEditor from "$lib/number-editor";

    let data: any = {}

</script>


<div style="width: 100%; height: 100%; padding: 15px; box-sizing: border-box; overflow: auto">
    <div style="padding-top: 30px; background-color: #FFFFFF;">
        <div class="example-description">
            <h1>Precision / negative / Min / Max</h1>
            <div>
                <span>Input: {JSON.stringify(data)}</span>
            </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px">
            <FormField label="NumberEditor - integer">
                <NumberEditor variant="outlined" bind:value={data.age} precision={0}/>
            </FormField>
            <FormField label="TextEditor - precision=2, allow negative">
                <NumberEditor variant="filled" bind:value={data.balance} allowNegative precision={2} prefix="US$"/>
            </FormField>
            <FormField label="TextEditor - min[1] / max[6]">
                <NumberEditor variant="filled" bind:value={data.weight} suffix="KG" max={6} min={1} precision={3}/>
            </FormField>
        </div>
    </div>

</div>