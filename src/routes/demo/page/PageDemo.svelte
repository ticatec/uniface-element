<script lang="ts">

    import Page from "$lib/page/Page.svelte";
    import Button from "$lib/button";
</script>

<Page round title="急救病人管理" comment="病人转轨数据">
    <div slot="header-ext" style="flex: 0 0 auto; display: flex;position: relative; justify-items: center; column-gap: 8px">

            <Button type="third" label="上传至国家胸痛中心" onClick={()=>{}}></Button>

            <Button type="default" label="关闭" onClick={()=>{}}></Button>
            <Button type="default" label="保存" onClick={()=>{}}></Button>

    </div>
    <div>
        页面内容
    </div>
</Page>