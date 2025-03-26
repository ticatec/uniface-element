<script>
    import ResizableDraggable from './ResizeBlock.svelte';

    // 边界尺寸
    let boundaryWidth = 800;
    let boundaryHeight = 600;

    // 示例组件的属性
    let components = [
        {
            id: 1,
            x: 50,
            y: 50,
            width: 200,
            height: 150,
            content: '水平调整组件',
            resizeMode: 'horizontal',
            color: '#ffeeba'
        },
        {
            id: 2,
            x: 300,
            y: 100,
            width: 200,
            height: 150,
            content: '垂直调整组件',
            resizeMode: 'vertical',
            color: '#d6d8ff'
        },
        {
            id: 3,
            x: 100,
            y: 300,
            width: 250,
            height: 180,
            content: '全方向调整组件',
            resizeMode: 'both',
            color: '#d6f5d6'
        }
    ];

    // 处理拖动和调整大小事件
    function handleUpdate(event, id) {
        const { x, y, width, height } = event.detail;
        const index = components.findIndex(comp => comp.id === id);

        components[index] = {
            ...components[index],
            x, y, width, height
        };

        components = [...components]; // 触发Svelte的响应式更新
    }
</script>

<div class="container" style="width: {boundaryWidth}px; height: {boundaryHeight}px;">
    <h1>可拖动和调整大小的组件示例</h1>

    {#each components as component (component.id)}
        <ResizableDraggable
                x={component.x}
                y={component.y}
                width={component.width}
                height={component.height}
                resizeMode={component.resizeMode}
                boundaryWidth={boundaryWidth}
                boundaryHeight={boundaryHeight}
                minWidth={100}
                minHeight={80}
                on:drag={(e) => handleUpdate(e, component.id)}
                on:dragend={(e) => handleUpdate(e, component.id)}
                on:resize={(e) => handleUpdate(e, component.id)}
                on:resizeend={(e) => handleUpdate(e, component.id)}
        >
            <div class="component-content" style="background-color: {component.color};">
                <h3>{component.content}</h3>
                <p>位置: {component.x}, {component.y}</p>
                <p>尺寸: {component.width} x {component.height}</p>
                <p>调整模式: {component.resizeMode}</p>
            </div>
        </ResizableDraggable>
    {/each}
</div>

<style>
    .container {
        position: relative;
        border: 2px dashed #ccc;
        margin: 20px auto;
        box-sizing: border-box;
        overflow: hidden;
    }

    h1 {
        text-align: center;
        color: #333;
        margin-bottom: 20px;
    }

    .component-content {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 10px;
        box-sizing: border-box;
    }

    h3 {
        margin: 0 0 10px 0;
    }

    p {
        margin: 3px 0;
        font-size: 14px;
    }
</style>