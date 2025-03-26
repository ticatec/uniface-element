<script lang="ts">
    import {onMount, afterUpdate} from 'svelte';
    import utils from "./utils";

    // 组件属性
    export let style: string = '';
    export let lineColor = '#ccc';
    export let lineStyle = 'dotted';

    // 引用DOM元素
    let gridContainer: any;
    let gridCanvas: any;
    let ctx: any;

    // 网格数据
    let columnWidths: Array<number> = [];
    let rowHeights: Array<number> = [];
    let columnPositions: Array<number> = [];
    let rowPositions: Array<number> = [];

    // 初始化canvas
    const initCanvas = () => {
        if (!gridCanvas) return;
        const containerRect = gridContainer.getBoundingClientRect();
        gridCanvas.width = containerRect.width;
        gridCanvas.height = containerRect.height;
        ctx = gridCanvas.getContext('2d');
    }

    // 计算网格的列宽和行高
    const calculateGridDimensions = () => {
        if (!gridContainer) return;
        const containerRect = gridContainer.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const containerHeight = containerRect.height;

        const computedStyle = window.getComputedStyle(gridContainer);

        // 计算padding
        const paddingValue = utils.parsePadding(computedStyle);
        const contentWidth = containerWidth - (paddingValue[0] + paddingValue[2]);
        const contentHeight = containerHeight - (paddingValue[1] + paddingValue[3]);

        console.log("padding：", paddingValue)

        // 获取计算后的样式

        // 解析grid-template-columns和grid-template-rows
        const gridColumns = computedStyle.gridTemplateColumns.split(' ');
        const gridRows = computedStyle.gridTemplateRows.split(' ');



        // 计算列宽和行高
        columnWidths = gridColumns.map(cw=>parseFloat(cw));
        rowHeights = gridRows.map(rh=>parseFloat(rh));
        const gaps = utils.parseGap(computedStyle);
        console.log("columns：", columnWidths)
        console.log("rows：", rowHeights)
        console.log("gap：", gaps)
        columnPositions = [paddingValue[1]];
        for (let i = 1; i < columnWidths.length; i++) {
            columnPositions.push(
                columnPositions[i - 1] + columnWidths[i - 1] + gaps[0]
            );
        }
        rowPositions = [paddingValue[0]];

        for (let i = 1; i < rowHeights.length; i++) {
            rowPositions.push(
                rowPositions[i - 1] + rowHeights[i - 1] + gaps[1]
            );
        }

        console.log("column coords：", columnPositions)
        console.log("row coords：", rowPositions)
    }

    // 绘制网格线
    function drawGridLines() {
        if (!ctx || !gridContainer) return;

        // 清除画布
        ctx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);

        // 设置线条样式
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 1;

        // 设置虚线样式
        if (lineStyle === 'dotted') {
            ctx.setLineDash([2, 2]);
        } else if (lineStyle === 'dashed') {
            ctx.setLineDash([5, 5]);
        } else {
            ctx.setLineDash([]);
        }

        // 绘制水平线
        for (let i = 0; i < rowPositions.length; i++) {
            // 行的开始位置
            const y = rowPositions[i];

            // 如果是第一行，只绘制底部线
            if (i === 0) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(gridCanvas.width, y);
                ctx.stroke();
            }

            // 绘制行底部的线
            if (i < rowHeights.length) {
                const rowBottom = y + rowHeights[i]+1;
                ctx.beginPath();
                ctx.moveTo(0, rowBottom);
                ctx.lineTo(gridCanvas.width, rowBottom);
                ctx.stroke();
            }
        }

        // 绘制垂直线
        for (let i = 0; i < columnPositions.length; i++) {
            // 列的开始位置
            const x = columnPositions[i];

            // 如果是第一列，只绘制右侧线
            if (i === 0) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, gridCanvas.height);
                ctx.stroke();
            }

            // 绘制列右侧的线
            if (i < columnWidths.length) {
                const colRight = x + columnWidths[i] + 1;
                ctx.beginPath();
                ctx.moveTo(colRight, 0);
                ctx.lineTo(colRight, gridCanvas.height);
                ctx.stroke();
            }
        }
    }

    // 初始化和更新
    function updateGrid() {
        initCanvas();
        calculateGridDimensions();
        drawGridLines();
    }

    // 监听窗口大小变化
    function handleResize() {
        updateGrid();
    }

    onMount(() => {
        // 初始设置
        updateGrid();

        // 添加窗口大小变化监听器
        window.addEventListener('resize', handleResize);

        // 组件卸载时移除监听器
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

    // 当依赖的属性变化时更新网格
    afterUpdate(() => {
        updateGrid();
    });


</script>

<div bind:this={gridContainer} class="grid-container" style="box-sizing: border-box; {style};">
    <canvas bind:this={gridCanvas} class="grid-canvas"></canvas>
    <slot></slot>
</div>

<style>
    .grid-container {
        display: grid;
        position: relative;
        box-sizing: border-box;
    }

    .grid-canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    }

    :global(.grid-container > *:not(.grid-canvas)) {
        position: relative;
        z-index: 1;
    }
</style>