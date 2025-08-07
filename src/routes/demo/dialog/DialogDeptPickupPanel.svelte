<script lang="ts">

    import {onMount} from "svelte";
    import {CommonDialog} from "$lib/dialog";



    export let confirmCallback: any;

    export const title: string = '选择部门';

    onMount(async () => {

    })

    const confirmSelection = async () => {
        console.log('完成选择', confirmCallback)
        return confirmCallback?.({code: "000001", name: "运维中心"});
    }


</script>
<CommonDialog {title} confirmHandler={confirmSelection} >
    <div style="width: 600px; height: 300px; padding: 12px; box-sizing: border-box; display: flex; flex-direction: row; flex-wrap: wrap">
        <div>User List</div>
    </div>
</CommonDialog>
