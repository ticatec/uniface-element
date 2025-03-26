<script lang="ts">

    import Breadcrumbs from "$lib/breadcrumbs";
    import DemoBlock from "../DemoBlock.svelte";
    import {IconButton} from "$lib/button";

    let list = [
        {
            label: "中国",
            data: {
                code: "100000"
            }
        },
        {
            label: "河北省",
            data: {code: "130000"}
        },
        {
            label: "石家庄市",
            data: {code: "130100"}
        },
        {
            label: "桥西区",
            data: {code: "130104"}
        },
        {
            label: "西里派出所",
            data: {code: "13010401"}
        }
    ]

    let selected: any;

    let displayList:Array<any> = [list[0]];

    let handleItemClick = (item: any) => (event: MouseEvent) => {
        if (item) {
            let pos = list.findIndex(e=>e.data.code==item.code);
            if (pos > -1) {
                displayList = [...list];
                displayList.splice(pos+1);
                displayList = [...displayList]
            }
        }
        selected = item;
    }

    const showNextLevel = () => {
        selected = list[displayList.length].data;
        displayList = [...displayList, list[displayList.length]];
    }

</script>
<div style="width: 100%; padding: 12px">
    <div class="demo-blocks">
        <DemoBlock style="grid-column: 1/7" title="简单类型" displayText={selected?.code??'-'}>
            <Breadcrumbs items={displayList} onItemClick={handleItemClick}/>
            <IconButton icon="icon_google_keyboard_arrow_right" onClick={showNextLevel} disabled={displayList.length == list.length}/>
        </DemoBlock>
    </div>
</div>
