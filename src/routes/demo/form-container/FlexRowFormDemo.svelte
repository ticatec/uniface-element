<script lang="ts">


    import {FlexRowForm} from "$lib/form-panel";
    import {Cell, Row} from "$lib/form-panel/flex-row-form";
    import FormField from "$lib/form-field";
    import TextEditor from "$lib/text-editor";
    import DatePicker from "$lib/date-picker";
    import OptionsSelect from "$lib/options-select";
    import MemoEditor from "$lib/memo-editor";

    let data: any = {};
    let errors: any = {};

    const genderList = [
        {code: 'F', text: 'Female'},
        {code: 'M', text: 'Male'}
    ]
</script>
<div style="width: 800px; margin: 0 auto; padding: 30px 0">
    <FlexRowForm style="width: 100%; border: 1px solid #e1e1e1">
        <Row>
            <Cell span="{4}">
                <FormField label="Name" required error={errors.name}>
                    <TextEditor bind:value={data.name} input$maxLength="10" variant="filled"/>
                </FormField>
            </Cell>
            <Cell span="{4}">
                <FormField label="Dob" required error={errors.dob}>
                    <DatePicker bind:value={data.dob} variant="filled" mandatory max={new Date()}/>
                </FormField>
            </Cell>
            <Cell span="{4}">
                <FormField label="Gender" required error={errors.gender}>
                    <OptionsSelect bind:value={data.gender} variant="filled" mandatory options={genderList}/>
                </FormField>
            </Cell>
        </Row>
        <Row>
            <Cell span="{12}">
                <FormField label="Note" error={errors.note}>
                    <MemoEditor bind:value={data.note} variant="filled" input$rows="{5}" input$maxLength="{300}" showIndicator/>
                </FormField>
            </Cell>
        </Row>
    </FlexRowForm>

    <FlexRowForm style="width: 100%; margin: 10px auto; border: 1px solid #e1e1e1">
        <Row>
            <Cell span="{6}">
                <FormField label="Name" arrangement="horizontal" required error={errors.name}>
                    <TextEditor bind:value={data.name} input$maxLength="10" variant="filled"/>
                </FormField>
            </Cell>
            <Cell span="{6}">
                <FormField label="Dob" arrangement="horizontal" required error={errors.dob}>
                    <DatePicker bind:value={data.dob} variant="filled" mandatory max={new Date()}/>
                </FormField>
            </Cell>
        </Row>
        <Row>
            <Cell span="{6}">
                <FormField label="Gender" arrangement="horizontal" required error={errors.gender}>
                    <OptionsSelect bind:value={data.gender} variant="filled" mandatory options={genderList}/>
                </FormField>
            </Cell>
        </Row>
        <Row>
            <Cell span="{12}">
                <FormField label="Note" arrangement="horizontal" label$alignment="top" error={errors.note}>
                    <MemoEditor bind:value={data.note} variant="filled" input$rows="{5}" input$maxLength="{300}" showIndicator/>
                </FormField>
            </Cell>
        </Row>
    </FlexRowForm>
</div>
