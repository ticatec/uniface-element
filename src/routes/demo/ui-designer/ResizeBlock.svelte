<script>
    import { onMount, createEventDispatcher } from 'svelte';

    // 组件属性
    export let x = 0;
    export let y = 0;
    export let width = 200;
    export let height = 150;
    export let minWidth = 50;
    export let minHeight = 50;
    export let resizeMode = 'both'; // 'horizontal', 'vertical', 'both'
    export let boundaryWidth = 800;
    export let boundaryHeight = 600;
    export let zIndex = 1;

    // 内部状态
    let isDragging = false;
    let isResizing = false;
    let resizeHandle = null;
    let startX = 0;
    let startY = 0;
    let startWidth = 0;
    let startHeight = 0;
    let startPosX = 0;
    let startPosY = 0;
    let element;

    const dispatch = createEventDispatcher();

    // 计算拖动手柄的可见性
    $: showLeftRight = resizeMode === 'horizontal' || resizeMode === 'both';
    $: showTopBottom = resizeMode === 'vertical' || resizeMode === 'both';
    $: showCorners = resizeMode === 'both';

    // 开始拖动组件
    function startDrag(e) {
        if (isResizing) return;

        isDragging = true;
        startX = e.clientX || (e.touches && e.touches[0].clientX);
        startY = e.clientY || (e.touches && e.touches[0].clientY);
        startPosX = x;
        startPosY = y;

        dispatch('dragstart', { x, y, width, height });
        e.stopPropagation();
    }

    // 开始调整大小
    function startResize(e, handle) {
        isResizing = true;
        resizeHandle = handle;
        startX = e.clientX || (e.touches && e.touches[0].clientX);
        startY = e.clientY || (e.touches && e.touches[0].clientY);
        startWidth = width;
        startHeight = height;
        startPosX = x;
        startPosY = y;

        dispatch('resizestart', { x, y, width, height, handle });
        e.stopPropagation();
        e.preventDefault();
    }

    // 处理鼠标移动事件
    function handleMouseMove(e) {
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);

        if (isDragging) {
            const deltaX = clientX - startX;
            const deltaY = clientY - startY;

            // 确保不超出边界
            let newX = startPosX + deltaX;
            let newY = startPosY + deltaY;

            // 应用边界限制
            newX = Math.max(0, Math.min(newX, boundaryWidth - width));
            newY = Math.max(0, Math.min(newY, boundaryHeight - height));

            x = newX;
            y = newY;

            dispatch('drag', { x, y, width, height });
        } else if (isResizing) {
            const deltaX = clientX - startX;
            const deltaY = clientY - startY;

            let newWidth = startWidth;
            let newHeight = startHeight;
            let newX = startPosX;
            let newY = startPosY;

            // 根据调整手柄来计算新尺寸和位置
            switch (resizeHandle) {
                case 'left':
                    newWidth = startWidth - deltaX;
                    newX = startPosX + deltaX;
                    break;
                case 'right':
                    newWidth = startWidth + deltaX;
                    break;
                case 'top':
                    newHeight = startHeight - deltaY;
                    newY = startPosY + deltaY;
                    break;
                case 'bottom':
                    newHeight = startHeight + deltaY;
                    break;
                case 'top-left':
                    newWidth = startWidth - deltaX;
                    newHeight = startHeight - deltaY;
                    newX = startPosX + deltaX;
                    newY = startPosY + deltaY;
                    break;
                case 'top-right':
                    newWidth = startWidth + deltaX;
                    newHeight = startHeight - deltaY;
                    newY = startPosY + deltaY;
                    break;
                case 'bottom-left':
                    newWidth = startWidth - deltaX;
                    newHeight = startHeight + deltaY;
                    newX = startPosX + deltaX;
                    break;
                case 'bottom-right':
                    newWidth = startWidth + deltaX;
                    newHeight = startHeight + deltaY;
                    break;
            }

            // 应用最小尺寸限制
            if (newWidth >= minWidth) {
                // 确保不超过右边界
                if (newX + newWidth <= boundaryWidth) {
                    width = newWidth;
                    x = newX;
                } else {
                    // 如果超过右边界，尺寸只能扩展到边界
                    if (['left', 'top-left', 'bottom-left'].includes(resizeHandle)) {
                        // 如果是左侧调整，需要重新计算x和width
                        const maxX = boundaryWidth - minWidth;
                        x = Math.min(maxX, newX);
                        width = boundaryWidth - x;
                    } else {
                        width = boundaryWidth - x;
                    }
                }
            } else {
                // 如果低于最小宽度，那么固定到最小宽度
                width = minWidth;
                if (['left', 'top-left', 'bottom-left'].includes(resizeHandle)) {
                    x = startPosX + startWidth - minWidth;
                }
            }

            // 应用高度限制
            if (newHeight >= minHeight) {
                // 确保不超过底部边界
                if (newY + newHeight <= boundaryHeight) {
                    height = newHeight;
                    y = newY;
                } else {
                    // 如果超过底部边界，尺寸只能扩展到边界
                    if (['top', 'top-left', 'top-right'].includes(resizeHandle)) {
                        // 如果是顶部调整，需要重新计算y和height
                        const maxY = boundaryHeight - minHeight;
                        y = Math.min(maxY, newY);
                        height = boundaryHeight - y;
                    } else {
                        height = boundaryHeight - y;
                    }
                }
            } else {
                // 如果低于最小高度，那么固定到最小高度
                height = minHeight;
                if (['top', 'top-left', 'top-right'].includes(resizeHandle)) {
                    y = startPosY + startHeight - minHeight;
                }
            }

            dispatch('resize', { x, y, width, height, handle: resizeHandle });
        }
    }

    // 结束拖动或调整大小
    function handleMouseUp(e) {
        if (isDragging) {
            dispatch('dragend', { x, y, width, height });
            isDragging = false;
        }

        if (isResizing) {
            dispatch('resizeend', { x, y, width, height, handle: resizeHandle });
            isResizing = false;
            resizeHandle = null;
        }
    }

    // 阻止默认选择行为
    function preventSelection(e) {
        if (isDragging || isResizing) {
            e.preventDefault();
        }
    }

    // 组件挂载时添加全局事件监听器
    onMount(() => {
        // 添加鼠标和触摸事件监听器
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('touchmove', handleMouseMove, { passive: false });
        window.addEventListener('touchend', handleMouseUp);
        window.addEventListener('selectstart', preventSelection);

        return () => {
            // 组件卸载时移除事件监听器
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleMouseMove);
            window.removeEventListener('touchend', handleMouseUp);
            window.removeEventListener('selectstart', preventSelection);
        };
    });
</script>

<div
        bind:this={element}
        class="resizable-component"
        style="
    left: {x}px;
    top: {y}px;
    width: {width}px;
    height: {height}px;
    z-index: {zIndex};
  "
        on:mousedown={startDrag}
        on:touchstart={startDrag}
>
    <div class="content">
        <slot></slot>
    </div>

    <!-- 调整大小的手柄 -->
    <!-- 水平调整手柄 -->
    {#if showLeftRight}
        <div
                class="resize-handle left"
                on:mousedown={(e) => startResize(e, 'left')}
                on:touchstart={(e) => startResize(e, 'left')}
        ></div>

        <div
                class="resize-handle right"
                on:mousedown={(e) => startResize(e, 'right')}
                on:touchstart={(e) => startResize(e, 'right')}
        ></div>
    {/if}

    <!-- 垂直调整手柄 -->
    {#if showTopBottom}
        <div
                class="resize-handle top"
                on:mousedown={(e) => startResize(e, 'top')}
                on:touchstart={(e) => startResize(e, 'top')}
        ></div>

        <div
                class="resize-handle bottom"
                on:mousedown={(e) => startResize(e, 'bottom')}
                on:touchstart={(e) => startResize(e, 'bottom')}
        ></div>
    {/if}

    <!-- 角落调整手柄 -->
    {#if showCorners}
        <div
                class="resize-handle top-left"
                on:mousedown={(e) => startResize(e, 'top-left')}
                on:touchstart={(e) => startResize(e, 'top-left')}
        ></div>

        <div
                class="resize-handle top-right"
                on:mousedown={(e) => startResize(e, 'top-right')}
                on:touchstart={(e) => startResize(e, 'top-right')}
        ></div>

        <div
                class="resize-handle bottom-left"
                on:mousedown={(e) => startResize(e, 'bottom-left')}
                on:touchstart={(e) => startResize(e, 'bottom-left')}
        ></div>

        <div
                class="resize-handle bottom-right"
                on:mousedown={(e) => startResize(e, 'bottom-right')}
                on:touchstart={(e) => startResize(e, 'bottom-right')}
        ></div>
    {/if}
</div>

<style>
    .resizable-component {
        position: absolute;
        background-color: #ffffff;
        border: 1px solid #cccccc;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        box-sizing: border-box;
        touch-action: none;
        user-select: none;
        overflow: hidden;
    }

    .content {
        width: 100%;
        height: 100%;
        overflow: auto;
        box-sizing: border-box;
        cursor: move;
        padding: 8px;
    }

    .resize-handle {
        position: absolute;
        background-color: #4299e1;
        border-radius: 50%;
        width: 8px;
        height: 8px;
        z-index: 2;
    }

    /* 水平方向的手柄 */
    .resize-handle.left {
        left: -4px;
        top: 50%;
        transform: translateY(-50%);
        cursor: ew-resize;
    }

    .resize-handle.right {
        right: -4px;
        top: 50%;
        transform: translateY(-50%);
        cursor: ew-resize;
    }

    /* 垂直方向的手柄 */
    .resize-handle.top {
        top: -4px;
        left: 50%;
        transform: translateX(-50%);
        cursor: ns-resize;
    }

    .resize-handle.bottom {
        bottom: -4px;
        left: 50%;
        transform: translateX(-50%);
        cursor: ns-resize;
    }

    /* 角落手柄 */
    .resize-handle.top-left {
        top: -4px;
        left: -4px;
        cursor: nwse-resize;
    }

    .resize-handle.top-right {
        top: -4px;
        right: -4px;
        cursor: nesw-resize;
    }

    .resize-handle.bottom-left {
        bottom: -4px;
        left: -4px;
        cursor: nesw-resize;
    }

    .resize-handle.bottom-right {
        bottom: -4px;
        right: -4px;
        cursor: nwse-resize;
    }
</style>