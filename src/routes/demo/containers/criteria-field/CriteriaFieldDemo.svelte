<script lang="ts">

    import CriteriaField from "$lib/criteria-field";
    import TextEditor from "$lib/text-editor";
    import NumberRange from "$lib/number-range";
    import DateRange from "$lib/date-range";
    import SearchBox from "$lib/search-box";
    import MemoEditor from "$lib/memo-editor";
    import FormField from "$lib/form-field";
    import DemoBlock from "../../DemoBlock.svelte";
    import DatePicker from "$lib/date-picker";

    let criteria: any = {}

    let filterText: string;

</script>



<div style="width: 100%; padding: 12px">
    <div class="demo-blocks">
        <DemoBlock title="Common Criteria Field">
            <CriteriaField style="margin: 0 auto" size="x20" label="Basic field">
                <TextEditor variant="outlined" bind:value={criteria.name} input$placeholder="* is a wild char"/>
            </CriteriaField>
        </DemoBlock>
        <DemoBlock style="grid-column: 2/4" title="Label ellipsis">
            <CriteriaField size="x25" label="Date of birth with very long label, it should be ellipsis.">
                <DateRange variant="outlined" bind:fromValue={criteria.dobFrom} bind:toValue={criteria.dobTo}/>
            </CriteriaField>
        </DemoBlock>
        <DemoBlock style="grid-column: 4/6" title="Label with customize style">
            <CriteriaField size="x25" label$style="color: #34906f; font-weight: 600" label="Date of birth">
                <DateRange variant="outlined" bind:fromValue={criteria.dobFrom} bind:toValue={criteria.dobTo}/>
            </CriteriaField>
        </DemoBlock>

        <DemoBlock class="field-layout-horizontal" style="grid-column: 1/3" title="Horizontal arrangement">
            <CriteriaField size="x40" label="Name">
                <TextEditor variant="outlined" bind:value={criteria.name} input$placeholder="* is a wild char"/>
            </CriteriaField>
        </DemoBlock>

        <DemoBlock class="field-layout-horizontal" style="grid-column: 3/5" title="Horizontal arrangement">
            <CriteriaField size="x40" label="Name very long label can be wrapped">
                <TextEditor variant="outlined" bind:value={criteria.name} input$placeholder="* is a wild char"/>
            </CriteriaField>
        </DemoBlock>
    </div>
</div>