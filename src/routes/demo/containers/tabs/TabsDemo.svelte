<script lang="ts">


    import Tabs from "$lib/tabs";
    import DemoBlock from "../../DemoBlock.svelte";

    let tabs = [
        {text: "基本信息"},
        {text: "亲属关系"},
        {text: "教育背景"},
        {text: "工作背景"},
        {text: "兴趣爱好"},
        {text: "弱点"},
    ]

    let activeTab = tabs[0];

    $:console.log(activeTab);

    const removeTab = (tab: any) => {
        console.log(tab);
    }

    const refreshTab = (tab: any) => {
        console.log(tab);
    }

</script>
<div style="width: 100%; padding: 12px">
    <div class="demo-blocks">
        <DemoBlock style="grid-column: 1/7" title="Tabs">
            <Tabs {tabs} bind:activeTab closable={false} style="width: 100%; height: 200px; overflow: hidden">
                <div style="width: 100%; padding: 8px; box-sizing: border-box">
                    <span>{activeTab?.text}</span>
                </div>
            </Tabs>
        </DemoBlock>

        <DemoBlock style="grid-column: 1/7" title="Simple Tabs">
            <Tabs {tabs} bind:activeTab simple closable={false} style="width: 100%; height: 200px; overflow: hidden">
                <div style="width: 100%; padding: 8px; box-sizing: border-box">
                    <span>{activeTab?.text}</span>
                </div>
            </Tabs>
        </DemoBlock>

        <DemoBlock style="grid-column: 1/7" title="Tabs can be removed">
            <Tabs {tabs} bind:activeTab closable style="width: 100%; height: 200px; overflow: hidden" closeHandler={removeTab}>
                <div style="width: 100%; padding: 8px; box-sizing: border-box">
                    <span>{activeTab?.text}</span>
                </div>
            </Tabs>
        </DemoBlock>

        <DemoBlock style="grid-column: 1/7" title="Tab can be reload">
            <Tabs {tabs} bind:activeTab refreshable style="width: 100%; height: 200px; overflow: hidden" refreshHandle={refreshTab}>
                <div style="width: 100%; padding: 8px; box-sizing: border-box">
                    <span>{activeTab?.text}</span>
                </div>
            </Tabs>
        </DemoBlock>
    </div>
</div>

