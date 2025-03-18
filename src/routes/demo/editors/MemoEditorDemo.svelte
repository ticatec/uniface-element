<script lang="ts">


    import MemoEditor from "$lib/memo-editor";
    import FormField from "$lib/form-field";
    import {DisplayMode} from "$lib";

    let text: string;
</script>

<div style="width: 100%; height: 100%; padding: 15px; box-sizing: border-box; overflow: auto">
    <div style="padding-top: 30px; background-color: #FFFFFF;">
        <div class="example-description">
            <h1>variants</h1>
            <div>
                <span>Input: {text}</span>
            </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px">
            <FormField label="TextEditor - outlined">
                <MemoEditor variant="outlined" bind:value={text} input$rows={3} maxLength={300} />
            </FormField>
            <FormField label="TextEditor - filled">
                <MemoEditor variant="filled" bind:value={text} input$rows={3} maxLength={300} />
            </FormField>
            <FormField label="TextEditor - default">
                <MemoEditor bind:value={text} input$rows={3} maxLength={300} />
            </FormField>
            <FormField label="TextEditor - plain">
                <MemoEditor variant="plain" bind:value={text} input$rows={3} maxLength={300} />
            </FormField>
        </div>
    </div>
    <div style="padding-top: 30px; background-color: #FFFFFF;">
        <div class="example-description">
            <h1>Others</h1>
            <div>
                <span>Input: {text}</span>
            </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px">
            <FormField label="TextEditor - showIndicator">
                <MemoEditor variant="outlined" bind:value={text} input$rows={3} maxLength={300} showIndicator />
            </FormField>
            <FormField label="TextEditor - row = 5">
                <MemoEditor variant="filled" bind:value={text} input$rows={5} maxLength={300} />
            </FormField>
            <FormField label="TextEditor - view mode">
                <MemoEditor displayMode={DisplayMode.View} bind:value={text} input$rows={5} maxLength={300} />
            </FormField>
        </div>
    </div>

    <div style="padding-top: 30px; background-color: #FFFFFF;">
        <div class="example-description">
            <h1>Resize</h1>
            <div>
                <span>Input: {text}</span>
            </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px">
            <FormField label="TextEditor - horizontal resize">
                <MemoEditor variant="outlined" bind:value={text} input$rows={3} maxLength={300} showIndicator resize="horizontal"/>
            </FormField>
            <FormField label="TextEditor - vertical resize">
                <MemoEditor variant="filled" bind:value={text} input$rows={5} maxLength={300} showIndicator resize="vertical"/>
            </FormField>
            <FormField label="TextEditor - both resize">
                <MemoEditor variant="outlined" bind:value={text} input$rows={5} maxLength={300} resize="both"/>
            </FormField>
        </div>
    </div>

</div>