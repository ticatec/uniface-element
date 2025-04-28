<script lang="ts">

    import {onMount} from "svelte";
    import {DisplayMode} from "../common/DisplayMode";
    import ModalPopover from "$lib/common/ModalPopover.svelte";
    import FileUploadPanel from "./FileUploadPanel.svelte";
    import FileRender from "./FileRender.svelte";
    import type AttachmentFile from "./AttachmentFile";
    import {getFileType, type RemoveConfirm} from "./AttachmentFile";
    import type UploadFile from "./UploadFile";
    import type {FileUpload} from "$lib/attachment-files/FileUpload";

    export let variant: '' | 'plain' | 'outlined' | 'filled' = '';
    export let disabled: boolean = false;
    export let readonly: boolean = false;
    export let files: Array<AttachmentFile> = [];
    export let style: string = '';
    export let displayMode: DisplayMode = DisplayMode.Edit;
    export let removeFileConfirm: RemoveConfirm = null as unknown as RemoveConfirm;
    export let uploadFile: FileUpload;

    export let text: string | null = null;

    let showUpload: boolean = false;

    onMount(() => {

    })

    const showDialog = () => {
        showUpload = true;
    }
    const appendNewFile = (file: UploadFile) => {
        files = [...files, {
            name: file.file.name,
            uri: file.url ?? '',
            type: getFileType(file.file.name)
        }]
    }

    const removeFile = async (file: AttachmentFile) => {
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
    <div class="uniface-attachment-display uniface-display-field">
        {@html text ?? ''}
    </div>
{:else }
    <div class="uniface-attachment-field" {style}>
        <div class="uniface-common-editor {variant}" tabindex="-1">
            <div class="files-field">
                {#each files as file}
                    <FileRender {file} {readonly} onRemove={removeFile}/>
                {/each}
            </div>
            {#if !disabled && !readonly}
                <div class="editor-action-icon">
                    <i class="icon_google_file_upload" aria-hidden="true" on:click={showDialog}></i>
                </div>
            {/if}
        </div>
    </div>

    <FileUploadPanel bind:visible={showUpload} maxFiles={10} onFileUploaded={appendNewFile} {uploadFile}/>
{/if}