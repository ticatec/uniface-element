<script lang="ts">

    import FormField from "$lib/form-field";
    import TextEditor from "$lib/text-editor";
    import DatePicker from "$lib/date-picker";
    import MemoEditor from "$lib/memo-editor";
    import DemoBlock from "../../DemoBlock.svelte";

    let data:any = {}

    let errors = {name: 'Name is required.', height: 'Height is not a valid value.'}

</script>

<div style="width: 100%; padding: 12px">
    <div class="demo-blocks">
        <DemoBlock title="Common FormField">
            <FormField required label="Name">
                <TextEditor variant="filled" bind:value={data.name} input$placeholder="Please enter the name"/>
            </FormField>
        </DemoBlock>
        <DemoBlock title="Label ellipsis">
            <FormField label="This is a very long label will be ellipsis the overflow text.">
                <TextEditor variant="filled" bind:value={data.name} input$placeholder="Please enter the name"/>
            </FormField>
        </DemoBlock>
        <DemoBlock title="Label with customize style">
            <FormField label$style="color: #2F54EB" label="Name">
                <TextEditor variant="filled" bind:value={data.name} input$placeholder="Please enter the name"/>
            </FormField>
        </DemoBlock>

        <DemoBlock title="Required filed">
            <FormField required label="Name">
                <TextEditor variant="filled" bind:value={data.name} input$placeholder="Please enter the name"/>
            </FormField>
        </DemoBlock>

        <DemoBlock title="Field has error message">
            <FormField required label="Name" error={errors.name}>
                <TextEditor variant="filled" bind:value={data.name} input$placeholder="Please enter the name"/>
            </FormField>
        </DemoBlock>

        <DemoBlock style="grid-column: 1/3" title="Horizontal arrangement">
            <FormField arrangement="horizontal" required label="Date of birth">
                <DatePicker variant="filled" bind:value={data.dob}/>
            </FormField>
        </DemoBlock>
        <DemoBlock style="grid-column: 3/5" title="Horizontal arrangement with customize label">
            <FormField arrangement="horizontal" label$style="text-align: left; color: #3367f0" required label="Name" error={errors.name}>
                <TextEditor variant="filled" bind:value={data.name} input$placeholder="Please enter the name"/>
            </FormField>
        </DemoBlock>
        <DemoBlock style="grid-column: 5/7" title="Horizontal align to the top">
            <FormField arrangement="horizontal" label$alignment="top"  label="note" error={errors.note}>
                <MemoEditor variant="filled" bind:value={data.note} resize="vertical" showIndicator maxLength="300"/>
            </FormField>
        </DemoBlock>
    </div>
</div>