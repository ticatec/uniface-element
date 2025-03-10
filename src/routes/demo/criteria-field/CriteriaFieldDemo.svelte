<script lang="ts">

    import CriteriaField from "$lib/criteria-field";
    import TextEditor from "$lib/text-editor";
    import NumberRange from "$lib/number-range";
    import DateRange from "$lib/date-range";
    import SearchBox from "$lib/search-box";

    let criteria: any = {}

    let filterText: string;

</script>

<div style="width: 100%; padding: 12px">
    <div style="display: flex; flex-direction: row; gap: 8px; flex-wrap: wrap">
        <CriteriaField size="x15" label="Name very long label can be overflow">
            <TextEditor variant="outlined" bind:value={criteria.name} input$placeholder="* is a wild char"/>
        </CriteriaField>
        <CriteriaField size="x30" required label="Date of birth">
            <DateRange variant="outlined" bind:fromValue={criteria.dobFrom} bind:toValue={criteria.dobTo} />
        </CriteriaField>
        <CriteriaField size="x30" required label="Weight">
            <NumberRange variant="outlined" compact bind:fromValue={criteria.minWeight} bind:toValue={criteria.maxWeight} />
        </CriteriaField>
    </div>
    <div style="display: flex; flex-direction: row; gap: 8px; flex-wrap: wrap; padding-top: 8px">
        <CriteriaField arrangement="horizontal" size="x30" label="Name very long label can be overflow">
            <TextEditor variant="outlined" bind:value={criteria.name} input$placeholder="* is a wild char"/>
        </CriteriaField>
        <CriteriaField arrangement="horizontal" size="x35" required label="Date of birth">
            <DateRange variant="outlined" bind:fromValue={criteria.dobFrom} bind:toValue={criteria.dobTo} />
        </CriteriaField>
    </div>
    <div style="padding-top: 12px">
        <SearchBox style="width: 150px" placeholder="过滤条件" variant="outlined" bind:value={filterText} onChange={(v)=>{console.log(v)}}></SearchBox>
    </div>
</div>