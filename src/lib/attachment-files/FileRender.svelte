<script lang="ts">
    import iconSound from "./sound.svg";
    import iconVideo from "./video.svg";
    import iconPDF from "./pdf.svg";
    import iconPPT from "./ppt.svg";
    import iconWord from "./word.svg";
    import iconExcel from "./excel.svg";
    import iconImg from "./image.svg";
    import iconFile from "./file.svg";
    import type AttachmentFile from "./AttachmentFile";
    import {FileType} from "./AttachmentFile";


    export let file: AttachmentFile;
    export let readonly: boolean = false;
    export let onRemove: (file: AttachmentFile)=> Promise<void>;

    let icon;

    const getIcon = (type: FileType) => {
        switch (type) {
            case FileType.AUDIO:
                return iconSound;
            case FileType.VIDEO:
                return iconVideo;
            case FileType.PPT:
                return iconPPT;
            case FileType.PDF:
                return iconPDF;
            case FileType.XLS:
                return iconExcel;
            case FileType.IMAGE:
                return iconImg;
            case FileType.DOC:
                return iconWord;
            default:
                return iconFile;
        }
    }

    const removeFile = () => {
        onRemove?.(file);
    }

    $: icon = getIcon(file.type);

</script>

<div style="width: 80px; height: 100%; box-sizing: border-box; padding: 6px 8px;">
    <div class="file-icon">
        <img src={icon} width="64px" height="64px"/>
        <div class="action-icon" style="top: 15px;">
            <i class="uniface-icon-download" ></i>
        </div>
        {#if !readonly}
            <div class="action-icon" style="top: 35px;">
                <i class="uniface-icon-x" aria-hidden="true" on:click={removeFile}></i>
            </div>
    {/if}
    </div>
    <div style="overflow: hidden; text-overflow: ellipsis">
        <span>{file.name}</span>
    </div>

</div>