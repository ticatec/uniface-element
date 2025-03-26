<script lang="ts">

    import DemoBlock from "../DemoBlock.svelte";
    import ColorPicker from "$lib/color-picker";
    import ColorPickerPanel from "$lib/color-picker/ColorPickerPanel.svelte";

    let data: any = {currency: 'CNY'}



</script>
<div style="width: 100%; padding: 12px">
    <div class="demo-blocks">
        <DemoBlock title="Simple" displayText={data.currency}>
            <div slot="description">
                <span>Simple example for options select</span>
            </div>
            <ColorPicker style="width: 200px" variant="outlined"/>
        </DemoBlock>
        <DemoBlock title="Simple" displayText={data.currency}>
            <div slot="description">
                <span>Simple example for options select</span>
            </div>
            <ColorPicker variant="filled"/>
        </DemoBlock>
        <DemoBlock title="Simple" displayText={data.currency}>
            <div slot="description">
                <span>Simple example for options select</span>
            </div>
            <ColorPicker/>
        </DemoBlock>
        <DemoBlock title="Simple" displayText={data.currency}>
            <div slot="description">
                <span>Simple example for options select</span>
            </div>
            <ColorPicker variant="plain"/>
        </DemoBlock>
    </div>
</div>