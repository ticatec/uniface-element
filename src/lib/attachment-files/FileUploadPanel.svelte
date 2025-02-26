<script lang="ts">

    import Button from "$lib/button";
    import FileUploadBar from "$lib/attachment-files/FileUploadBar.svelte";
    import UploadFile from "$lib/attachment-files/UploadFile";
    import {ProgressStatus} from "$lib/progress-bar/ProgressStatus";
    import {onDestroy, onMount} from "svelte";
    import type {FileUpload} from "$lib/attachment-files/FileUpload";
    import utils from "$lib/common/utils";
    import ModalPopover from "$lib/common/ModalPopover.svelte";
    import i18n from "$lib/i18nContext";

    export let accept: string = "*/*";
    export let maxSize: number = 1024 * 1024 * 10;
    export let maxFiles: number = 1;
    export let onFileUploaded: (file: UploadFile) => void;
    export let uploadFile: FileUpload;

    export let canClose: boolean = false;
    export let visible: boolean = false;

    let btnPickup: string = i18n.getText('uniface.upload.btnPickup', "Pickup files");

    let files: Array<UploadFile> = [];
    let dropZone: any;
    let fileInput: any;
    let interval: any;
    let busy: boolean = false;

    onMount(async () => {
        let checkAutoClose:any = null;
        interval = setInterval(() => {
            canClose = files.every(item => item.status != ProgressStatus.progressing);
            if (canClose) {
                if (files.length == maxFiles) {
                    visible = !canClose;
                } else if (files.length > 0 && checkAutoClose == null) {
                    checkAutoClose = setTimeout(()=> {
                        visible = !canClose || busy;
                        files = [];
                        checkAutoClose = null;
                    }, 1000);
                }
            }
        }, 100);
    })

    onDestroy(async () => {
        clearInterval(interval);
    })

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        busy = true;
        dropZone.classList.add("highlight");
    }

    const handleDragLeave = (e: DragEvent) => {
        e.preventDefault();
        busy = false;
        dropZone.classList.remove("highlight");
    }

    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        dropZone.classList.remove("highlight");

        handleFiles(e.dataTransfer?.files);
    }

    const handleFiles = (uploadFiles: FileList | undefined) => {
        if (uploadFiles && uploadFiles.length > 0) {
            let list = utils.filterFiles(Array.from(uploadFiles), accept);
            list.forEach(file => {
                if (file.size <= maxSize && files.length < maxFiles) {
                    let uf = new UploadFile(file, uploadFile, ()=> {
                        onFileUploaded?.(uf);
                    });
                    files = [...files, uf];
                }
            });
        }
        busy = false;
    }

    const showFileDialog = () => {
        busy = true;
        fileInput.click();
    }

    const handleMouseClick = (e: MouseEvent) => {
        e.stopPropagation();
    }

    const handleFilePickup = (event: any) => {
        handleFiles(event.target.files);
    }

    const removeFile = (file: any) => {
        let pos = files.findIndex(item => item == file);
        if (pos > -1) {
            files.splice(pos, 1);
            files = [...files];
        }
    }


    $: canClose = files.length == 0;


</script>
<ModalPopover {canClose} bind:visible>
    <div class="uniface-file-upload-panel" bind:this={dropZone} on:dragover={handleDragOver} on:dragleave={handleDragLeave}
         on:drop={handleDrop} on:click={handleMouseClick} aria-hidden="true">
        <div class="file-upload-contents">
            <div style="position: absolute; top: 0; width: 0; overflow: hidden">
                <input bind:this={fileInput} type="file" {accept} multiple={maxFiles > 1} on:change={handleFilePickup}/>
            </div>
            <div style="margin-bottom: 8px; flex: 0 0 auto; text-align: center">
                <Button type="primary" disabled={files.length >= maxFiles} icon="uniface-icon-upload" label={btnPickup}
                        onClick={showFileDialog}></Button>
            </div>
            <div style="flex: 1 1 auto; overflow: auto; padding: 0 24px">
                {#each files as file}
                    <FileUploadBar {file} removeFile={removeFile}/>
                {/each}
            </div>
        </div>
    </div>
</ModalPopover>