<script lang="ts">

    import FlexRowForm, {CellField} from "$lib/form-panel/flex-form";
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

    const countries = [
        {code: 'AU', text: 'Australia'},
        {code: 'NZ', text: 'New Zealand'},
        {code: 'US', text: 'United States'},
        {code: 'CA', text: 'Canada'},
        {code: 'UK', text: 'United Kingdom'}
    ]
</script>
<div style="width: 800px; margin: 0 auto; padding: 30px 0">
    <FlexRowForm style="width: 100%; border: 1px solid #e1e1e1">
        <CellField span="{4}" label="Name" required error={errors.name}>
            <TextEditor bind:value={data.name} input$maxLength="10" variant="filled"/>
        </CellField>
        <CellField span="{4}" label="Dob" required error={errors.dob}>
            <DatePicker bind:value={data.dob} variant="filled" mandatory max={new Date()}/>
        </CellField>
        <CellField span="{4}" label="Gender" required error={errors.gender}>
            <OptionsSelect bind:value={data.gender} variant="filled" mandatory options={genderList}/>
        </CellField>
        <CellField span="{6}" label="Nationality" required error={errors.nationality}>
            <OptionsSelect bind:value={data.countries} variant="filled" mandatory options={countries}/>
        </CellField>
        <CellField span="{12}" label="Note" error={errors.note}>
            <MemoEditor bind:value={data.note} variant="filled" input$rows="{5}" input$maxLength="{300}" showIndicator/>
        </CellField>
    </FlexRowForm>
</div>

