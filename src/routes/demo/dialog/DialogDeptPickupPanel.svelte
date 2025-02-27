<script lang="ts">

    import type {ButtonActions} from "$lib/action-bar";
    import type ButtonAction from "$lib/action-bar/ButtonAction";
    import {onMount} from "svelte";

    export let confirmCallback: any;

    export let dialog;

    export const title: string = '选择部门';

    onMount(async () => {
        actions = [btnConfirm];
    })

    const confirmSelection = async () => {
        console.log('完成选择', confirmCallback)
        confirmCallback?.({code: "000001", name: "运维中心"});
        dialog?.close();
    }

    let btnConfirm: ButtonAction = {
        label: '确认', type: 'primary', disabled: false, handler: confirmSelection
    };
    export let actions: ButtonActions;

</script>

<div style="width: 600px; height: 300px; padding: 12px; box-sizing: border-box; display: flex; flex-direction: row; flex-wrap: wrap">
    <div>User List</div>
</div>
