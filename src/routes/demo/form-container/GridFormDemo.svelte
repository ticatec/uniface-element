<script lang="ts">

    import GridForm, {GridField} from "$lib/form-panel/grid-form";
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
    <GridForm columns={3} style="width: 100%; border: 1px solid #e1e1e1">
        <GridField colSpan="{2}" rowSpan={4} row={1} col={1}  label="ID Image" required error={errors.cardImage}>
            <div style="width: 100%; height: 180px">
                <img style="width: 100%; height: 100%" alt="none" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOx3a94bQ2G-iEAd6VQGYZLzYdJE3kUFW1TQ&s"/>
            </div>
        </GridField>
        <GridField row={1} col={3} label="Name" required error={errors.name}>
            <TextEditor bind:value={data.name} input$maxLength="10" variant="filled"/>
        </GridField>
        <GridField row={2} col={3} label="Dob" required error={errors.dob}>
            <DatePicker bind:value={data.dob} variant="filled" mandatory max={new Date()}/>
        </GridField>
        <GridField row={3} col={3} label="Gender" required error={errors.gender}>
            <OptionsSelect bind:value={data.gender} variant="filled" mandatory options={genderList}/>
        </GridField>
        <GridField row={4} col={3} label="Nationality" required error={errors.nationality}>
            <OptionsSelect bind:value={data.countries} variant="filled" mandatory options={countries}/>
        </GridField>
        <GridField colSpan="{12}" label="Note" error={errors.note}>
            <MemoEditor bind:value={data.note} variant="filled" input$rows="{5}" input$maxLength="{300}" showIndicator/>
        </GridField>
    </GridForm>

    <GridForm columns={3} style="width: 100%; margin-top: 20px; border: 1px solid #e1e1e1">
        <GridField row={1} col={1} label="Name" required error={errors.name}>
            <TextEditor bind:value={data.name} input$maxLength="10" variant="filled"/>
        </GridField>
        <GridField row={1} col={2} label="Dob" required error={errors.dob}>
            <DatePicker bind:value={data.dob} variant="filled" mandatory max={new Date()}/>
        </GridField>
        <GridField row={1} col={3} label="Gender" required error={errors.gender}>
            <OptionsSelect bind:value={data.gender} variant="filled" mandatory options={genderList}/>
        </GridField>
        <GridField row={2} col={3} label="Nationality" required error={errors.nationality}>
            <OptionsSelect bind:value={data.countries} variant="filled" mandatory options={countries}/>
        </GridField>
        <GridField colSpan="{12}" label="Note" error={errors.note}>
            <MemoEditor bind:value={data.note} variant="filled" input$rows="{5}" input$maxLength="{300}" showIndicator/>
        </GridField>
    </GridForm>
</div>

