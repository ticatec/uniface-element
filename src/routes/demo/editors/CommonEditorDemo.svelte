<script lang="ts">


    import TextEditor from "$lib/text-editor";
    import NumberEditor from "$lib/number-editor";
    import FormField from "$lib/form-field";
    import UnitNumberEditor, {type UnitOption} from "$lib/unit-number-editor";
    import PromptsTextEditor from "$lib/prompts-text-editor";

    let data: any = {};

    let text: string = '';

    let units: Array<UnitOption> = [
        {code: "KG", text: "KG", ratio: 1, precision: 3},
        {code: "G", text: "G", ratio: 1000, precision: 0}
    ]

    let questions: Array<string> = [
        'What is your first pet\'s name?',
        "What is your mother's middle name?",
        "What is the primary school's name in your hometown in your childhood?"
    ]


    $: text = JSON.stringify(data);
</script>

<div style="width: 100%; height: 100%; padding: 15px; box-sizing: border-box; overflow: auto">
    <div style="padding-top: 30px; background-color: #FFFFFF;">
        <div class="example-description">
            <h1>variants - default </h1>
            <div>
                <span>Input: {text}</span>
            </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr; gap: 8px">
            <FormField label="TextEditor">
                <TextEditor bind:value={data.name}/>
            </FormField>
            <FormField label="NumberEditor">
                <NumberEditor precision={0} bind:value={data.salary} prefix="US$"/>
            </FormField>
            <FormField label="UnitNumberEditor">
                <UnitNumberEditor bind:unitCode={data.unit} bind:value={data.weight} units={units}/>
            </FormField>
            <FormField label="PromptsTextEditor">
                <PromptsTextEditor bind:value={data.question} words={questions}/>
            </FormField>
        </div>
        <div class="example-description">
            <h1>variants - outlined</h1>
            <div>
                <span>Input: {text}</span>
            </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr; gap: 8px">
            <FormField label="TextEditor">
                <TextEditor variant="outlined" bind:value={data.name}/>
            </FormField>
            <FormField label="NumberEditor">
                <NumberEditor variant="outlined" precision={0} bind:value={data.salary} prefix="US$"/>
            </FormField>
            <FormField label="UnitNumberEditor">
                <UnitNumberEditor variant="outlined" bind:unitCode={data.unit} bind:value={data.weight} units={units}/>
            </FormField>
            <FormField label="PromptsTextEditor">
                <PromptsTextEditor variant="outlined" bind:value={data.question} words={questions}/>
            </FormField>
        </div>
        <div class="example-description">
            <h1>variants - filled</h1>
            <div>
                <span>Input: {text}</span>
            </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr; gap: 8px">
            <FormField label="TextEditor">
                <TextEditor variant="filled" bind:value={data.name}/>
            </FormField>
            <FormField label="NumberEditor">
                <NumberEditor variant="filled" precision={0} bind:value={data.salary} prefix="US$"/>
            </FormField>
            <FormField label="UnitNumberEditor">
                <UnitNumberEditor variant="filled" bind:unitCode={data.unit} bind:value={data.weight} units={units}/>
            </FormField>
            <FormField label="PromptsTextEditor">
                <PromptsTextEditor variant="filled" bind:value={data.question} words={questions}/>
            </FormField>
        </div>
        <div class="example-description">
            <h1>variants - plain</h1>
            <div>
                <span>Input: {text}</span>
            </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr; gap: 8px;">
            <FormField label="TextEditor">
                <TextEditor style="background-color: #ffffe0" variant="plain" bind:value={data.name}/>
            </FormField>
            <FormField label="NumberEditor">
                <NumberEditor style="background-color: #ffffe0" variant="plain" precision={0} bind:value={data.salary} prefix="US$"/>
            </FormField>
            <FormField label="UnitNumberEditor">
                <UnitNumberEditor style="background-color: #ffffe0" variant="plain" bind:unitCode={data.unit} bind:value={data.weight}
                                  units={units}/>
            </FormField>
            <FormField label="PromptsTextEditor">
                <PromptsTextEditor style="background-color: #ffffe0" variant="plain" bind:value={data.question} words={questions}/>
            </FormField>
        </div>

        <div class="example-description">
            <h1>readonly</h1>
            <div>
                <span>Input: {text}</span>
            </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr; gap: 8px">
            <FormField label="TextEditor">
                <TextEditor readonly variant="filled" bind:value={data.name}/>
            </FormField>
            <FormField label="NumberEditor">
                <NumberEditor readonly variant="filled" precision={0} bind:value={data.salary} prefix="US$"/>
            </FormField>
            <FormField label="UnitNumberEditor">
                <UnitNumberEditor readonly variant="filled" bind:unitCode={data.unit} bind:value={data.weight} units={units}/>
            </FormField>
            <FormField label="PromptsTextEditor">
                <PromptsTextEditor readonly variant="filled" bind:value={data.question} words={questions}/>
            </FormField>
        </div>

        <div class="example-description">
            <h1>disabled</h1>
            <div>
                <span>Input: {text}</span>
            </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr; gap: 8px">
            <FormField label="TextEditor">
                <TextEditor disabled bind:value={data.name}/>
            </FormField>
            <FormField label="NumberEditor">
                <NumberEditor disabled variant="outlined" precision={0} bind:value={data.salary} prefix="US$"/>
            </FormField>
            <FormField label="UnitNumberEditor">
                <UnitNumberEditor disabled variant="filled" bind:unitCode={data.unit} bind:value={data.weight} units={units}/>
            </FormField>
            <FormField label="PromptsTextEditor">
                <PromptsTextEditor disabled variant="plain" bind:value={data.question} words={questions}/>
            </FormField>
        </div>

        <div class="example-description">
            <h1>leading icon</h1>
            <div>
                <span>Input: {text}</span>
            </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr; gap: 8px">
            <FormField label="TextEditor">
                <TextEditor variant="filled" bind:value={data.name}>
                    <i class="icon_google_snooze" slot="leading-icon"></i>
                </TextEditor>
            </FormField>
            <FormField label="NumberEditor">
                <NumberEditor variant="filled" precision={0} bind:value={data.salary}>
                    <i class="icon_google_local_atm" slot="leading-icon"></i>
                </NumberEditor>
            </FormField>
            <FormField label="UnitNumberEditor">
                <UnitNumberEditor variant="filled" bind:unitCode={data.unit} bind:value={data.weight} units={units}>
                    <i class="icon_google_person" slot="leading-icon"></i>
                </UnitNumberEditor>
            </FormField>
            <FormField label="PromptsTextEditor">
                <PromptsTextEditor variant="filled" bind:value={data.question} words={questions}>
                    <i class="icon_google_assignment_turned_in" slot="leading-icon"></i>
                </PromptsTextEditor>
            </FormField>
        </div>


        <div class="example-description">
            <h1>trailing icon</h1>
            <div>
                <span>Input: {text}</span>
            </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr; gap: 8px">
            <FormField label="TextEditor">
                <TextEditor variant="filled" bind:value={data.name}>
                    <i class="icon_google_snooze" slot="trailing-icon"></i>
                </TextEditor>
            </FormField>
            <FormField label="NumberEditor">
                <NumberEditor variant="filled" precision={0} bind:value={data.salary}>
                    <i class="icon_google_local_atm" slot="trailing-icon"></i>
                </NumberEditor>
            </FormField>
            <FormField label="UnitNumberEditor (no trailing icon)">
                <UnitNumberEditor variant="filled" bind:unitCode={data.unit} bind:value={data.weight} units={units}>
                </UnitNumberEditor>
            </FormField>
            <FormField label="PromptsTextEditor (no trailing icon)">
                <PromptsTextEditor variant="filled" bind:value={data.question} words={questions}>
                </PromptsTextEditor>
            </FormField>
        </div>
    </div>


</div>