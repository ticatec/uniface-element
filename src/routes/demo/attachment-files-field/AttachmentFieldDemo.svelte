<script lang="ts">

    import AttachmentFilesField from "$lib/attachment-files/AttachmentFilesField.svelte";
    import type AttachmentFile from "$lib/attachment-files/AttachmentFile";
    import {ModuleResult} from "$lib/message-box";
    import type {ErrorHandler, OnUploaded, ProgressUpdate, UploadProgress} from "$lib/attachment-files/FileUpload";
    import Button from "$lib/button";
    import {DisplayMode} from "$lib/common/DisplayMode";
    import {HeaderLayout} from "$lib/app-layout";

    const confirmRemoveFile = async (file: AttachmentFile): Promise<boolean> => {
        return await window.MessageBox.showConfirm(`确定要删除已经上传的文件: <b>${file.name}</b> ?`, "删除确认", true, "warning") == ModuleResult.MR_OK;
    }


    const uploadFile = (file: File, progressUpdate: ProgressUpdate, onUploaded: OnUploaded, errorHandler: ErrorHandler): UploadProgress => {
        let progress = 0;
        let interval = setInterval(() => {
            progress++;
            progressUpdate(Math.floor(file.size / 100 * progress));
            if (progress == 100) {
                clearInterval(interval);
                onUploaded(file.name);
            }
        }, 50)
        return {
            cancel: async (): Promise<boolean> => {
                console.log('停止上传文件', file.name);
                clearInterval(interval);
                return true;
            }
        }
    } //


    let displayMode: DisplayMode = DisplayMode.Edit;
    const toggleViewMode = () => {
        displayMode = displayMode == DisplayMode.Edit ? DisplayMode.View : DisplayMode.Edit;
    }


    let topPanel: any;


</script>

<HeaderLayout>
    <div slot="header" style="padding: 8px 0">
        <Button label="Toggle" onClick={toggleViewMode}/>
    </div>
    <div style="flex: 1 1 auto; padding: 30px; width: 100%; height: 100%; box-sizing: border-box; overflow: auto">
        <div style="width: 500px; margin-top: 12px">
            <AttachmentFilesField variant="filled" {displayMode} removeFileConfirm={confirmRemoveFile}
                                  {uploadFile}/>
        </div>
        <div style="width: 500px; margin-top: 12px">
            <AttachmentFilesField variant="outlined" {displayMode} removeFileConfirm={confirmRemoveFile}
                                  {uploadFile}/>
        </div>


    </div>
</HeaderLayout>