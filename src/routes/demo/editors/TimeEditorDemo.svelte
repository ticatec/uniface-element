<script lang="ts">


    import TimeEditor from "$lib/time-editor";
    import FormField from "$lib/form-field";

    let data: any = {};
</script>

<div style="width: 100%; height: 100%; padding: 15px; box-sizing: border-box; overflow: auto">
    <div style="padding-top: 30px; background-color: #FFFFFF;">
        <div class="example-description">
            <h1>others</h1>
            <div>
                <span>Input: {JSON.stringify(data)}</span>
            </div>

        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr; gap: 8px">
            <FormField label="TextEditor placeholder">
                <TimeEditor variant="filled" input$placeholder="Please enter your name" bind:value={data.shiftStartTime}/>
            </FormField>
            <FormField label="TextEditor max length">
                <TimeEditor variant="filled"  bind:value={data.shiftEndTime} />
            </FormField>
        </div>
    </div>


</div>