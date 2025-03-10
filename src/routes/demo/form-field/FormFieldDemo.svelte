<script lang="ts">

    import FormField from "$lib/form-field";
    import TextEditor from "$lib/text-editor";
    import DatePicker from "$lib/date-picker";
    import NumberEditor from "$lib/number-editor";
    import MemoEditor from "$lib/memo-editor";

    let data = {}

    let errors = {name: 'Name is required.', height: 'Height is not a valid value.'}

</script>

<div style="width: 100%; padding: 12px">
    <div style="display: flex; flex-direction: row; gap: 8px; flex-wrap: wrap">
        <FormField style="width: 150px" required label="Name very long label can be overflow" error={errors.name}>
            <TextEditor variant="filled" bind:value={data.name} input$placeholder="Please enter the name"/>
        </FormField>
        <FormField style="width: 150px" required label="Date of birth" error={errors.dob}>
            <DatePicker variant="filled" bind:value={data.dob} mandatory input$placeholder="Please enter the name"/>
        </FormField>
        <FormField style="width: 150px" required label="Height" error={errors.height}>
            <NumberEditor variant="filled" suffix="CM" bind:value={data.height} precision={0} input$placeholder="Please enter the name"/>
        </FormField>
    </div>
    <div style="display: flex; flex-direction: row; gap: 8px; flex-wrap: wrap">
        <FormField style="width: 350px" arrangement="horizontal" required label="Name very long label can be overflow" error={errors.name}>
            <TextEditor variant="filled" bind:value={data.name} input$placeholder="Please enter the name"/>
        </FormField>
        <FormField style="width: 350px" arrangement="horizontal" required label="Date of birth">
            <DatePicker variant="filled" bind:value={data.dob} mandatory input$placeholder="Please enter the name"/>
        </FormField>
        <FormField style="width: 350px" arrangement="horizontal" required label="Height">
            <NumberEditor variant="filled" suffix="CM" bind:value={data.height} precision={0} input$placeholder="Please enter the name"/>
        </FormField>
        <FormField style="width: 350px" label$alignment="top" label$style="width: 150px"  arrangement="horizontal" required label="Note very long label can be wrap line" error={errors.name}>
            <MemoEditor variant="filled"  bind:value={data.note}  input$placeholder="Please enter the note"/>
        </FormField>
    </div>
</div>