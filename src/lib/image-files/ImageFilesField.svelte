<script lang="ts">

    import {onMount} from "svelte";
    import {DisplayMode} from "../common/DisplayMode";
    import type ImageFile from "./ImageFile";
    import {type RemoveConfirm} from "./ImageFile";
    import type UploadFile from "../attachment-files/UploadFile";
    import type {FileUpload} from "$lib/attachment-files/FileUpload";
    import FileUploadPanel from "$lib/attachment-files/FileUploadPanel.svelte";
    import ImageRender from "$lib/image-files/ImageRender.svelte";
    import ImagePreview from "$lib/image-files/ImagePreview.svelte";

    export let variant: '' | 'plain' | 'outlined' | 'filled' = '';
    export let disabled: boolean = false;
    export let readonly: boolean = false;
    export let files: Array<ImageFile> = [];
    export let style: string = '';
    export let displayMode: DisplayMode = DisplayMode.Edit;
    export let removeFileConfirm: RemoveConfirm = null as unknown as RemoveConfirm;
    export let uploadFile: FileUpload;
    export let maxFiles: number = 1;

    export let text: string | null = null;

    let showUpload: boolean = false;
    let showPreview: boolean = false;
    let previewImgSrc: string = null as unknown as string;

    let canClose: boolean = true;

    onMount(() => {

    })

    const showDialog = () => {
        showUpload = true;
    }
    const appendNewFile = (file: UploadFile) => {
        files = [...files, {
            name: file.file.name,
            uri: file.url ?? '',
            thumbnail: file.thumbnail
        }]
    }

    const removeFile = async (file: ImageFile) => {
        let confirmed = removeFileConfirm == null ? true : await removeFileConfirm(file);
        if (confirmed) {
            let pos = files.findIndex(item => item == file);
            if (pos > -1) {
                files.splice(pos, 1);
                files = [...files];
            }
        }
    }

    $: text = '<div>' + files.map(item => (item.name)).join("</div><div>") + '</div>'

</script>

{#if displayMode === DisplayMode.View}
    <div class="uniface-display-field images-field">
        {#each files as file}
            <div>
                <img width="40" height="40" src={file.thumbnail??file.uri}/>
                <div class="img-file-name">
                    <span>{file.name}</span>
                </div>
            </div>
        {/each}
    </div>
{:else }
    <div class="uniface-images-field" {style}>
        <div class="uniface-common-editor {variant}" tabindex="-1">
            <div class="files-field">
                {#each files as file}
                    <ImageRender {file} {readonly} onRemove={removeFile}
                                 onPreview={(file: ImageFile) => {showPreview = true; previewImgSrc = file.uri}}/>
                {/each}
            </div>
            {#if !disabled && !readonly}
                <div class="editor-action-icon ">
                    <i class="icon_google_file_upload" aria-hidden="true" on:click={showDialog}></i>
                </div>
            {/if}
        </div>
    </div>
    {#if showUpload}
        <FileUploadPanel bind:visible={showUpload} accept="image/*" {maxFiles} onFileUploaded={appendNewFile} {uploadFile}/>
    {/if}
    <ImagePreview bind:visible={showPreview} src={previewImgSrc}/>
{/if}