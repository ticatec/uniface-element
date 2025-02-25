<script lang="ts">


    import Tabs from "$lib/tabs";

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

</script>
<div style="width: 100%; height: 100%; padding: 12px; box-sizing: border-box; overflow: hidden">
    <Tabs {tabs} bind:activeTab closable={false} style="width: 100%; height: 100%; overflow: hidden">
        <div style="width: 100%; padding: 8px; box-sizing: border-box">
            <span>{activeTab?.text}</span>
        </div>
    </Tabs>
</div>

