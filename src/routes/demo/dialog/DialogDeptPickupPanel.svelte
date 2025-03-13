<script lang="ts">

    import type {ButtonActions} from "$lib/action-bar";
    import type ButtonAction from "$lib/action-bar/ButtonAction";
    import {onMount} from "svelte";
    import Dialog from "$lib/dialog";
    import {CommonDialog} from "$lib/dialog";

    export let closeHandler: any;

    export let confirmCallback: any;

    export const title: string = '选择部门';

    onMount(async () => {

    })

    const confirmSelection = async () => {
        console.log('完成选择', confirmCallback)
        confirmCallback?.({code: "000001", name: "运维中心"});
        closeHandler?.();
    }


</script>
<CommonDialog {title} confirmHandler={confirmSelection} {closeHandler}>
    <div style="width: 600px; height: 300px; padding: 12px; box-sizing: border-box; display: flex; flex-direction: row; flex-wrap: wrap">
        <div>User List</div>
    </div>
</CommonDialog>
