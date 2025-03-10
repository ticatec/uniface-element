<script lang="ts">

    import ProgressBar from "$lib/progress-bar";
    import {TextButton} from "$lib/button";
    import {ProgressStatus} from "$lib/progress-bar/ProgressStatus";
    import {onMount} from "svelte";
    import type UploadFile from "$lib/attachment-files/UploadFile";
    import i18n from "$lib/i18n/i18nContext";

    export let file: UploadFile;
    export let removeFile: (file: any) => void;

    let status: ProgressStatus;
    let progress: number = 0;

    let cancelLabel: string = i18n.getText('uniface.upload.btnCancel', 'Cancel');
    let retryLabel: string = i18n.getText('uniface.upload.btnRetry', 'Retry');
    let removeLabel: string = i18n.getText('uniface.upload.btnRemove', 'Delete');

    const cancelUpload = async () => {
        if (await file.cancel()) {
            status = file.status;
        }
    }

    const retryUpload = () => {
        file.restart();
    }

    const removeUploadFile = () => {
        removeFile?.(file);
    }


    onMount(async () => {

    });

    $: if (file) {
        status = file.status;
        progress = file.progress;
        file.setUpdateStatus(()=> {
            status = file.status;
            progress = file.progress;
        })
    }


</script>
<div style="display: flex; flex-direction: row; align-items: center; height: 24px">
    <div style="flex: 0 0 240px; text-align: right; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">
        <span>{file.file.name}</span>
    </div>
    <div style="flex: 1 1 auto; margin-left: 8px; margin-right: 8px">
        <ProgressBar {progress} {status} type="liner"/>
    </div>
    <div style="flex: 0 0 120px; text-align: left; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">
        {#if status === ProgressStatus.progressing}
            <TextButton size="mini" type="secondary" label={cancelLabel} onClick={cancelUpload}/>
        {/if}
        {#if status === ProgressStatus.canceled || status === ProgressStatus.failure}
            <TextButton size="mini" type="primary" label={retryLabel} onClick={retryUpload}/>
            <TextButton size="mini" label={removeLabel} onClick={removeUploadFile}/>
        {/if}
    </div>
</div>
