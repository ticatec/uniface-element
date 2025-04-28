<script lang="ts">
    import {onMount} from "svelte";
    import Portal from "svelte-portal";
    import Button, {IconButton} from "$lib/button";

    export let src = ""; // 传入图片地址
    export let visible: boolean = false;


    let scale = 1; // 当前缩放比例
    let imgWidth = 0, imgHeight = 0; // 原始图片尺寸
    let containerWidth = 0, containerHeight = 0; // 窗口尺寸
    let imgRef; // 图片引用
    let imgPanelWidth = 0, imgPanelHeight = 0;


    // 计算窗口大小
    const updateContainerSize = () => {

        containerWidth = window.innerWidth;
        containerHeight = window.innerHeight;

        updateScale();
    }

    // 计算适合的缩放比例
    const updateScale = () => {
        if (!imgWidth || !imgHeight) return;
        const widthRatio = containerWidth / imgWidth * 0.9;
        const heightRatio = containerHeight / imgHeight * 0.9;
        scale = Math.min(widthRatio, heightRatio, 1); // 不超过原尺寸
        imgPanelWidth = imgWidth * scale;
        imgPanelHeight = imgHeight * scale;
    }

    // 图片加载完成后获取尺寸
    const handleImageLoad = (event: any) => {
        imgWidth = event.target.naturalWidth;
        imgHeight = event.target.naturalHeight;
        scale = 1;
        updateContainerSize();
    }

    // 放大
    function zoomIn() {
        scale *= 1.2;
    }

    // 缩小
    function zoomOut() {
        scale /= 1.2;
    }

    // 监听窗口变化
    onMount(() => {
        window.addEventListener("resize", updateContainerSize);
        updateContainerSize();

        return () => {
            window.removeEventListener("resize", updateContainerSize);
        };
    });

    let imgStyle = ""

    $: imgPanelHeight = Math.floor(imgHeight * scale);
    $: imgPanelWidth = Math.floor(imgWidth * scale);

    $: imgStyle = imgPanelHeight > containerHeight ? "" : "display: flex; justify-content: center; align-items: center;"

</script>

{#if visible}
    <Portal target="body">
        <div class="uniface-image-preview-overlay" on:click={()=>{visible = false}} aria-hidden="true">
            <div>
                <div style="width: 100%; height: 100%; overflow: auto">
                    <!-- 图片容器 -->
                    <div class="image-container"
                         style="width: {containerWidth}px; height: {containerHeight}px;  {imgStyle}">
                        <img on:click|stopPropagation aria-hidden="true"
                                bind:this={imgRef}
                                src={src}
                                alt="Preview"
                                on:load={handleImageLoad}
                                style="width: {imgPanelWidth}px; height: {imgPanelHeight}px;"
                        />
                    </div>
                </div>
                <!-- 顶部工具栏 -->
                <div class="toolbar" on:click|stopPropagation aria-hidden="true">
                    <IconButton icon="icon_google_zoom_in" type="default" onClick={zoomIn}></IconButton>
                    <IconButton icon="icon_google_zoom_out" type="default" onClick={zoomOut}></IconButton>
                    <IconButton icon="icon_google_cancel" type="default" onClick={()=>{visible = false}}></IconButton>
                </div>
            </div>
        </div>
    </Portal>
{/if}
