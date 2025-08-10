<script lang="ts">

    import {HeaderLayout} from "$lib/app-layout";
    import OptionsSelect from "$lib/options-select";
    import FormField from "$lib/form-field";
    import DatePicker from "$lib/date-picker";
    import {DateTimePicker} from "$lib/date-picker";
    import OptionMultiSelect from "$lib/options-multi-select";
    import regions from "./regions";
    import CascadeOptionSelect from "$lib/cascade-options-select";
    import utils from "$lib/common/utils";
    import InputOptionSelect from "$lib/input-options-select";
    import LookupEditor from "$lib/lookup-editor";
    import DateRange from "$lib/date-range";
    import UnitNumberEditor, {type UnitOption} from "$lib/unit-number-editor";

    import NumberRange from "$lib/number-range";
    import type {LoadResult} from "$lib/list-box";

    let airlines = [
        {code: "C", text: "南方航空"},
        {code: "A", text: "国际航空"},
        {code: "S", text: "东方航空"},
        {code: "N", text: "新西兰航空"},
        {code: "AU", text: "澳洲航空"},
        {code: "SG", text: "新加坡航空"},
    ];

    let selectedAirlines: any;
    let zones: Array<Array<any>> = [[...regions]];

    let selectedZones: any;
    let text1: any;
    let text2: any;


    const handleSelectRegion = async (item: any) => {
        if (item.subnode && item.subnode.length > 0) {
            await utils.sleep(1);
            return item.subnode;
        } else {
            zones = [[...regions]];
            return null;
        }
    }

    $: console.log('选中航线', selectedAirlines);
    let date: string;
    const genderList = [
        {code: 'M', text: '男'},
        {code: 'F', text: '女'}
    ]
    let gender: string;
    let filterOptions: Array<any> = [];
    const handleTextChange = (s: string) => {
        console.log(s);
        filterOptions = [...airlines]
    }

    $: console.log("性别", gender);
    $: console.log('选中日期：', date);

    let from: Date, to: Date;
    let dragUnit = 'mL';
    let cap: number;

    let units: Array<UnitOption> = [
        {code: "L", text: "升", ratio: 1, precision: 3},
        {code: "mL", text: "毫升", ratio: 1000, precision: 0}
    ]


    $: console.log('选中区间：', JSON.stringify({from, to}) );

    let minValue: number;
    let maxValue: number;

    const loadOptions = (): Promise<LoadResult> => {
        return new Promise(resolve => {
            setTimeout(()=>{
                resolve({
                    list: airlines,
                    hasMore: true
                })
            }, 5000)
        });
    }

</script>
<div style="padding: 12px; width: 100%; box-sizing: border-box; gap: 16px; display: flex; flex-direction: row; flex-wrap: wrap">
    <DatePicker style="width: 400px;" variant="filled" bind:value={date}/>
    <DatePicker style="width: 400px;" variant="outlined" bind:value={date}/>
    <DateTimePicker style="width: 400px;" variant="outlined" bind:value={date}/>

    <OptionsSelect style="width: 400px;"
                   variant="outlined" bind:value={gender} options={genderList}></OptionsSelect>
    <OptionsSelect style="width: 400px;"
                   variant="filled" bind:value={gender} options={genderList}></OptionsSelect>

    <OptionMultiSelect style="width: 800px;" options={airlines} tagColor="9" tagVariant="borderless" variant="outlined"
                       bind:value={selectedAirlines} readonly
                       onChange={(v)=>{console.log('航线变化', v)}}/>

    <OptionMultiSelect style="width: 800px;" options={airlines} tagColor="5" tagVariant="border" variant="outlined"
                       bind:value={selectedAirlines}
                       onChange={(v)=>{console.log('航线变化', v)}}/>

    <OptionMultiSelect style="width: 800px;" options={airlines} variant="filled" placeholder="请选择感兴趣的航空公司"
                       bind:value={selectedAirlines}
                       tagColor="2" tagVariant="round"
                       onChange={(v)=>{console.log('航线变化', v)}}/>
    <CascadeOptionSelect style="width: 800px;" bind:value={selectedZones} box$style="min-width: 120px" text={text1} bind:nodes={zones}
                         onSelect={handleSelectRegion}/>
    <CascadeOptionSelect style="width: 800px;" variant="outlined" bind:value={selectedZones} box$style="min-width: 120px" text={text2}
                         bind:nodes={zones} onSelect={handleSelectRegion}/>
    <InputOptionSelect style="width: 400px;" placeholder="请选择航空公司" variant="outlined" bind:value={text1} lazyLoader={loadOptions} onChange={(v)=>{console.log("选择", v)}}/>
    <LookupEditor style="width: 400px;" variant="outlined" bind:value={text1} text={text1} onAction={()=>{console.log('打开窗口')}} onChange={(v)=>{console.log("选择", v)}}/>
    <DateRange bind:fromValue={from} bind:toValue={to} variant="outlined" style="width: 300px"/>
    <UnitNumberEditor style="width: 400px" variant="outlined" bind:unitCode={dragUnit} readonly={false}  bind:value={cap} units={units} onChange={(v)=>{console.log(v)}}/>
    <NumberRange style="width: 150px" bind:fromValue={minValue} bind:toValue={maxValue} variant="outlined"/>
</div>
