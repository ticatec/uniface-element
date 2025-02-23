<script lang="ts">

    import type ImageFile from "./ImageFile";


    export let file: ImageFile;
    export let readonly: boolean = false;
    export let onRemove: (file: ImageFile) => Promise<void>;
    export let onPreview: (file: ImageFile) => void;


    const removeFile = () => {
        onRemove?.(file);
    }

</script>

<div style="width: 80px; box-sizing: border-box; padding: 6px 8px;">
    <div class="file-icon">
        <img src={file.thumbnail??file.uri} alt="" width="40px" height="40px"/>
        <div class="img-overlay">
            <div>
                <div class="action-icon" style="top: 15px;">
                    <i class="uniface-icon-eye" aria-hidden="true" on:click={()=>{onPreview?.(file)}}></i>
                </div>
                {#if !readonly}
                    <div class="action-icon" style="top: 35px;">
                        <i class="uniface-icon-x" aria-hidden="true" on:click={removeFile}></i>
                    </div>
                {/if}
            </div>
        </div>


    </div>
</div>