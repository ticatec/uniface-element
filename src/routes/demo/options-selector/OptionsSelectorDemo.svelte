<script lang="ts">

    import {HeaderLayout} from "$lib/app-layout";
    import OptionsSelect from "$lib/options-select";
    import FormField from "$lib/form-field";

    const genderList = [
        {code: 'M', text: '男'},
        {code: 'F', text: '女'}
    ]

    let gender: string;
</script>
<HeaderLayout>
    <div slot="header" style="border-bottom: 1px solid #e1e1e1; height: 48px">

    </div>
    <div style="flex: 1 1 auto; height: 100%; display: flex; flex-direction: column;">
        <div style="flex: 1 1 auto; overflow: auto">

        </div>
        <div style="flex: 0 0 auto; height: 48px; border-top: 1px solid #E1E1E1; overflow: auto">
            <FormField label="性别" style="margin-left: 12px; position: relative; top: 50%; transform: translateY(-50%)" arrangement="horizontal" label$style="width: auto">
                <OptionsSelect style="width: 300px; "
                               variant="outlined" bind:value={gender} options={genderList}></OptionsSelect>
            </FormField>
        </div>
    </div>
</HeaderLayout>