<script lang="ts">


    import TextEditor from "$lib/text-editor";
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
                <TextEditor variant="filled" input$placeholder="Please enter your name" bind:value={data.name}/>
            </FormField>
            <FormField label="TextEditor max length">
                <TextEditor variant="filled"  input$maxLength="5" bind:value={data.title} />
            </FormField>
        </div>
    </div>


    <div style="padding-top: 30px; background-color: #FFFFFF;">
        <div class="example-description">
            <h1>Leading icon is high priority then prefix</h1>
            <div>
                <span>Input: {JSON.stringify(data)}</span>
            </div>

        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr; gap: 8px">
            <FormField label="TextEditor placeholder">
                <TextEditor variant="filled" input$placeholder="Please enter your mail address" prefix="Mail to://" bind:value={data.email}>
                </TextEditor>
            </FormField>
            <FormField label="TextEditor placeholder">
                <TextEditor variant="filled" input$placeholder="Please enter your mail address" prefix="Mail to://" bind:value={data.email}>
                    <i class="icon_google_mark_as_unread" slot="leading-icon"></i>
                </TextEditor>
            </FormField>
        </div>
    </div>

    <div style="padding-top: 30px; background-color: #FFFFFF;">
        <div class="example-description">
            <h1>Trailing icon and suffix can coexist</h1>
            <div>
                <span>Input: {JSON.stringify(data)}</span>
            </div>

        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr; gap: 8px">
            <FormField label="TextEditor placeholder">
                <TextEditor variant="filled" input$placeholder="Please enter your domain" suffix=".com" bind:value={data.domain}>
                </TextEditor>
            </FormField>
            <FormField label="TextEditor placeholder">
                <TextEditor variant="filled" input$placeholder="Please enter your address" suffix=".com" bind:value={data.domain}>
                    <i class="icon_google_track_changes" slot="trailing-icon"></i>
                </TextEditor>
            </FormField>
        </div>
    </div>

</div>