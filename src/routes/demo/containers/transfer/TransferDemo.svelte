<script lang="ts">

    import DemoBlock from "../../DemoBlock.svelte";

    import Transfer from "$lib/transfer";
    import ItemRender from "./ItemRender.svelte";

    let availableList = [
        "1340389949",
        "1340389950",
        "1340389951",
        "1340389952",
        "1340389953",
        "1340389954",
        "1340389955"
    ];

    let settleList = [
        "2340389949",
        "2340389950",
        "2340389951",
        "2340389952",
        "2340389953",
        "2340389954",
        "2340389955"
    ];

    const transferData = async () => {
        return true;
    }

</script>
<div style="width: 100%; padding: 12px">
    <div class="demo-blocks">
        <DemoBlock style="grid-column: 1/7" title="Transfer">
            <div style="width: 600px; height: 480px; margin: 0 auto; box-sizing: border-box">
                <Transfer sourceList={availableList} sourceTitle="备选人员" targetTitle="选中人员" targetList={settleList} itemRender={ItemRender} {transferData}/>
            </div>
        </DemoBlock>

    </div>
</div>

