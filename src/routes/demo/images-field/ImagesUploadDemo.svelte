<script lang="ts">

    import {ModuleResult} from "$lib/message-box";
    import type {ErrorHandler, OnUploaded, ProgressUpdate, UploadProgress} from "$lib/attachment-files/FileUpload";
    import type ImageFile from "$lib/image-files/ImageFile";
    import ImageFilesField from "$lib/image-files";
    import Button from "$lib/button";
    import {DisplayMode} from "$lib/common/DisplayMode";
    import {HeaderLayout} from "$lib/app-layout";


    const confirmRemoveImageFile = async (file: ImageFile): Promise<boolean> => {
        return await window.MessageBox.showConfirm(`确定要删除已经上传的文件: <b>${file.name}</b> ?`, "删除确认", true, "warning") == ModuleResult.MR_OK;
    }


    let thumbnail = './demo.jpg';

    const uploadImage = (file: File, progressUpdate: ProgressUpdate, onUploaded: OnUploaded, errorHandler: ErrorHandler): UploadProgress => {
        let progress = 0;
        let interval = setInterval(() => {
            progress++;
            progressUpdate(Math.floor(file.size / 100 * progress));
            if (progress == 100) {
                clearInterval(interval);
                onUploaded(thumbnail, thumbnail);
            }
        }, 50)
        return {
            cancel: async (): Promise<boolean> => {
                console.log('停止上传文件', file.name);
                clearInterval(interval);
                return true;
            }
        }
    }

    let displayMode: DisplayMode = DisplayMode.Edit;
    const toggleViewMode = () => {
        displayMode = displayMode == DisplayMode.Edit ? DisplayMode.View : DisplayMode.Edit;
    }




</script>

<HeaderLayout>
    <div slot="header" style="padding: 8px 0; text-align: center">
        <Button label="Toggle" onClick={toggleViewMode}/>
    </div>


    <div style="width: 500px; margin: 0 auto">
        <ImageFilesField variant="filled" maxFiles={10} {displayMode}
                         removeFileConfirm={confirmRemoveImageFile}
                         uploadFile={uploadImage}/>
    </div>

</HeaderLayout>
