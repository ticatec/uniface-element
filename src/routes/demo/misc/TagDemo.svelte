<script lang="ts">

    import Tag from "$lib/tag";
    import DemoBlock from "../DemoBlock.svelte";
</script>
<div style="width: 100%; padding: 12px">
    <div class="demo-blocks">
        <DemoBlock style="grid-column: 1/7" title="简单类型">
            <Tag text="标签"/>
            <Tag text="标签1" color="1"/>
            <Tag text="标签2" color="2"/>
            <Tag text="标签3" color="3"/>
            <Tag text="标签4" color="4"/>
            <Tag text="标签5" color="5"/>
            <Tag text="标签6" color="6"/>
            <Tag text="标签7" color="7"/>
            <Tag text="标签8" color="8"/>
            <Tag text="标签9" color="9"/>
            <Tag text="标签10" color="10"/>
            <Tag text="标签11" color="11"/>
            <Tag text="标签12" color="12"/>
        </DemoBlock>
        <DemoBlock style="grid-column: 1/7" title="简单类型">
            <Tag text="标签" variant="round"/>
            <Tag text="标签1" variant="round" color="1"/>
            <Tag text="标签2" variant="round" color="2"/>
            <Tag text="标签3" variant="round" color="3"/>
            <Tag text="标签4" variant="round" color="4"/>
            <Tag text="标签5" variant="round" color="5"/>
            <Tag text="标签6" variant="round" color="6"/>
            <Tag text="标签7" variant="round" color="7"/>
            <Tag text="标签8" variant="round" color="8"/>
            <Tag text="标签9" variant="round" color="9"/>
            <Tag text="标签10" variant="round" color="10"/>
            <Tag text="标签11" variant="round" color="11"/>
            <Tag text="标签12" variant="round" color="12"/>
        </DemoBlock>
        <DemoBlock style="grid-column: 1/7" title="无边框">
            <Tag text="标签1" variant="borderless"/>
            <Tag text="标签1" variant="borderless" color="1"/>
            <Tag text="标签2" variant="borderless" color="2"/>
            <Tag text="标签3" variant="borderless" color="3"/>
            <Tag text="标签4" variant="borderless" color="4"/>
            <Tag text="标签5" variant="borderless" color="5"/>
            <Tag text="标签6" variant="borderless" color="6"/>
            <Tag text="标签7" variant="borderless" color="7"/>
            <Tag text="标签8" variant="borderless" color="8"/>
            <Tag text="标签9" variant="borderless" color="9"/>
            <Tag text="标签10" variant="borderless" color="10"/>
            <Tag text="标签11" variant="borderless" color="11"/>
            <Tag text="标签12" variant="borderless" color="12"/>
        </DemoBlock>
    </div>
</div>