<script lang="ts">

    import {HeaderLayout} from "$lib/app-layout";
    import OptionsSelect from "$lib/options-select";
    import FormField from "$lib/form-field";
    import DatePicker from "$lib/date-picker";


    let date: string;

    $: console.log('选中日期：', date)
</script>
<HeaderLayout>
    <div style="flex: 1 1 auto; height: 100%;">
        <div style="width: 400px; margin: 0 auto">

            <DatePicker variant="filled" bind:value={date} />
        </div>

    </div>
</HeaderLayout>