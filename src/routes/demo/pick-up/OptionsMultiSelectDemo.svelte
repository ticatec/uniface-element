<script lang="ts">


    import OptionMultiSelect from "$lib/options-multi-select";


    let airlines = [
        {code: "C", text: "南方航空"},
        {code: "A", text: "国际航空"},
        {code: "S", text: "东方航空"},
        {code: "N", text: "新西兰航空"},
        {code: "AU", text: "澳洲航空"},
        {code: "SG", text: "新加坡航空"},
    ];

    let selectedAirlines: any;






    $: console.log('选中航线', selectedAirlines);








</script>
<div style="padding: 12px; width: 100%; box-sizing: border-box; gap: 16px; display: flex; flex-direction: row; flex-wrap: wrap">


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

</div>
