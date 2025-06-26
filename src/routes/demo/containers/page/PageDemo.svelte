<script lang="ts">

    import Page from "$lib/page";
    import Button from "$lib/button";
    import DemoBlock from "../../DemoBlock.svelte";
</script>


<div style="width: 100%; padding: 12px">
    <div class="demo-blocks">
        <DemoBlock style="grid-column: 1/7" title="普通页面">
            <Page goBack={()=>{console.log('go back')}} style="height: 300px" title="页面标题" comment="简单描述">

                <div style="padding: 12px">
                    页面内容
                </div>
            </Page>
        </DemoBlock>

        <DemoBlock style="grid-column: 1/7" title="圆角页面">
            <Page reload={()=>{console.log('reload')}} style="height: 300px" round title="页面标题" comment="简单描述">

                <div style="padding: 12px">
                    页面内容
                </div>
            </Page>
        </DemoBlock>

        <DemoBlock style="grid-column: 1/7" title="没有shadow的页面">
            <Page style="height: 300px" shadow={false} round title="页面标题" comment="简单描述">

                <div style="padding: 12px">
                    页面内容
                </div>
            </Page>
        </DemoBlock>

        <DemoBlock style="grid-column: 1/7" title="自定义页面样式">
            <Page style="height: 300px; padding: 0;" shadow={false} title="页面标题" comment="简单描述">

                <div style="padding: 12px">
                    页面内容
                </div>
            </Page>
        </DemoBlock>

        <DemoBlock style="grid-column: 1/7" title="可定义标题扩展栏的页面">
            <Page style="height: 300px" round title="急救病人管理" comment="病人转轨数据">
                <div slot="header-ext" style="flex: 0 0 auto; display: flex;position: relative; justify-items: center; column-gap: 8px">
                    <Button type="third" label="上传至国家胸痛中心" onClick={()=>{}}></Button>
                    <Button type="default" label="关闭" onClick={()=>{}}></Button>
                    <Button type="default" label="保存" onClick={()=>{}}></Button>
                </div>
                <div style="padding: 12px">
                    页面内容
                </div>
            </Page>
        </DemoBlock>
    </div>
</div>

