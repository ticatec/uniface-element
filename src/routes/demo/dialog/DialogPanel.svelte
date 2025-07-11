<script lang="ts">

    import type {ButtonActions} from "$lib/action-bar";
    import type ButtonAction from "$lib/action-bar/ButtonAction";
    import TextEditor from "$lib/text-editor";
    import FormField from "$lib/form-field";
    import {ModalResult} from "$lib";
    import {onMount} from "svelte";
    import LookupEditor from "$lib/lookup-editor";
    import DialogDeptPickupPanel from "./DialogDeptPickupPanel.svelte";
    import Dialog from "$lib/dialog";
    import FormContainer, {Row} from "$lib/form-panel/flex-row-form";
    import {CellField} from "$lib/form-panel/flex-form";

    export let closeHandler: any;
    export let saveAction: any;
    export let submitAction: any;

    export let dialog;

    export let data: any;

    export let title: string = '新增申请';

    let btnSave: ButtonAction = {
        label: '保存', type: 'primary', disabled: true, handler: async () => {
            await saveData()
        }
    };
    let btnSubmit: ButtonAction = {
        label: '提交', type: 'primary', disabled: true, handler: async () => {
            await submitData()
        }
    };
    export let actions: ButtonActions;

    const closeAction : ButtonAction = {
        label: '关闭', type: "secondary"
    }

    export const closeConfirm = async (): Promise<boolean> => {
        if (JSON.stringify(data) != oldData) {
            return await window.MessageBox.showConfirm('数据尚未保存，确定要关闭吗？', '关闭窗口') == ModalResult.MR_OK;
        } else {
            return true
        }
    }

    let oldData: string;

    onMount(async () => {
        oldData = JSON.stringify(data);
        actions = [btnSave, btnSubmit];
    })

    const saveData = async () => {
        title = '修改申请'
        saveAction?.(data);
        btnSubmit.disabled = false;
        oldData = JSON.stringify(data);
        actions = [btnSave, btnSubmit]

    }

    const submitData = async () => {
        submitAction?.(data);
        dialog?.close();
    }

    $: if (oldData && data) {
        btnSave.disabled = oldData == JSON.stringify(data);
        actions = [btnSave, btnSubmit];
    }

    const setUserDepartment = (value: any) => {
        console.log('选中的单位：', value);
        data.deptName = value?.name;
        data.dept = value?.code;
        //data = {...data}
    }

    const showDeptDialog = () => {
        window.Dialog.showModal(DialogDeptPickupPanel, {confirmCallback: setUserDepartment})
    }
</script>


<Dialog {title} {actions} {closeConfirm} {closeHandler} {closeAction} width="80%">
    <FormContainer style="width: auto; height: 600px; padding: 12px; ">
        <Row>
            <CellField span={4} label="姓名" required={true}>
                <TextEditor variant="filled" bind:value={data.name}/>
            </CellField>
            <CellField span={4}  style="width: 160px" label="部门" required={true}>
                <LookupEditor variant="filled" text={data.deptName} value={data.dept} onAction={showDeptDialog}/>
            </CellField>
        </Row>

    </FormContainer>
</Dialog>