<script lang="ts">

    import type {ButtonActions} from "$lib/action-bar/ButtonAction";
    import ActionBar from "$lib/action-bar/ActionBar.svelte";

    let buttons: ButtonActions = [
        {
            label: "保存", type: "primary", handler: () => {
            }
        },
        {
            label: "提交", type: "primary", handler: () => {
            }
        },
        null,
        {
            label: "导出数据", type: "forth", icon: "uniface-icon-download-cloud", handler: () => {
            }
        },
        {
            label: "导入数据", type: "forth", icon: "uniface-icon-upload", handler: () => {
            }
        },
        null,
        {
            label: "关闭", type: "secondary", handler: () => {
            }
        }
    ]

</script>

<div style="padding: 24px">
    <ActionBar {buttons}/>
</div>