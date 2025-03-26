<script lang="ts">

    import Box from "$lib/box";
    import GridPanel from "./GridPanel.svelte";
    import type GridBlock from "./GridBlock";
    import TextComponent from "./TextComponent.svelte";

    let labelName: GridBlock = {
        row: 0,
        col: 0,
        colSpan: 2,
        component: TextComponent,
        props: {
            text: '姓名:'
        }
    }

</script>
<div style="width: 100%; height: 100%; padding: 12px">
    <Box style="width: fit-content; height: fit-content; margin: 0 auto">
        <GridPanel blocks={[labelName]}/>
    </Box>
</div>