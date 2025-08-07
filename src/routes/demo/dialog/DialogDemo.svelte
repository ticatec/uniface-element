<script lang="ts">

    import Button from "$lib/button";
    import DialogPanel from "./DialogPanel.svelte";

    let saveAction = async (data: any, isNew: boolean) => {
        console.log('回调保存');
        return false;
    }

    let submitAction =  async (data: any, isNew: boolean) => {
        console.log('回调提交');
        return true;
    }
    const handleButtonClick = () => {
        let data = {}
        window.Dialog.showModal(DialogPanel, {data, saveAction, submitAction});
    }


</script>
<div style="padding: 12px">
    <Button label="测试" onClick={handleButtonClick}/>
</div>