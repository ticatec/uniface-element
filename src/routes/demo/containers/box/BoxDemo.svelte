<script lang="ts">

    import Box from "$lib/box";
    import DemoBlock from "../../DemoBlock.svelte";
</script>

<div style="width: 100%; padding: 12px">
    <div class="demo-blocks">
        <DemoBlock style="grid-column: 1/3" title="普通的带框盒子">
            <Box style="width: 240px; height: 400px; margin: 0 auto">

            </Box>
        </DemoBlock>
        <DemoBlock style="grid-column: 3/5" title="带标题的盒子">
            <Box style="width: 240px; height: 400px; margin: 0 auto" title="标题">

            </Box>
        </DemoBlock>

        <DemoBlock style="grid-column: 5/7" title="圆角标题盒子">
            <Box style="width: 240px; height: 400px; margin: 0 auto" title="标题" round>

            </Box>
        </DemoBlock>

        <DemoBlock style="grid-column: 1/3" title="带脚注盒子">
            <Box style="width: 240px; height: 400px; margin: 0 auto" title="标题" round>
                <div slot="footer" style="padding: 0 12px">脚注</div>
            </Box>
        </DemoBlock>

        <DemoBlock style="grid-column: 3/5" title="定制标题的盒子">
            <Box style="width: 240px; height: 400px; margin: 0 auto" title="标题" round>
                <div slot="header" style="padding: 0 12px; width: 100%; display: flex; flex-direction: row; gap: 8px">
                    <div style="flex: 1 1 auto">自定义标题</div>
                    <div style="flex: 0 0 auto">
                        <i class="icon_google_add_link"></i>
                    </div>
                </div>
            </Box>
        </DemoBlock>
    </div>
</div>