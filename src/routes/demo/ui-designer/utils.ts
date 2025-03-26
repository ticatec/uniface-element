import type GridBlock from "./GridBlock";

/**
 *
 * @param blocks
 * @param rows
 * @param cols
 */
const findEmptyCells = (blocks: GridBlock[], rows: number, cols: number): { row: number; col: number }[] => {
    // 创建一个二维数组，初始化为空（false）
    const grid: boolean[][] = Array.from({length: rows}, () => Array(rows).fill(false));

    // 标记已占用的单元格
    for (const block of blocks) {
        for (let r = block.row; r < block.row + block.rowSpan; r++) {
            for (let c = block.col; c < block.col + block.colSpan; c++) {
                if (r < rows && c < cols) {
                    grid[r][c] = true;
                }
            }
        }
    }

    // 找出所有空的单元格
    const emptyCells: { row: number; col: number }[] = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (!grid[r][c]) {
                emptyCells.push({row: r, col: c});
            }
        }
    }

    return emptyCells;
}


/**
 * 解析获取padding的值
 * @param style
 */
const parsePadding = (style: CSSStyleDeclaration) => {
    const value = style.padding.split(" ").map(value => parseInt(value, 10));

    switch (value.length) {
        case 1:
            return [value[0], value[0], value[0], value[0]];
        case 2:
            return [value[0], value[1], value[0], value[1]];
        case 3:
            return [value[0], value[1], value[2], value[1]];
        case 4:
            return value;
        default:
            return [0, 0, 0, 0];
    }
}


const parseGap = (style: CSSStyleDeclaration) => {
    const value = style.gap.split(" ").map(value => parseInt(value, 0));

    switch (value.length) {
        case 1:
            return [value[0], value[0]];
        case 2:
            return value;
        default:
            return [0, 0];
    }
}


/**
 *
 * @param blocks
 * @param rows
 * @param cols
 */
const fillGrid = (blocks: GridBlock[], rows: number, cols: number): Array<GridBlock> => {
    blocks = blocks ?? [];
    return [...blocks, ...findEmptyCells(blocks.filter((b: GridBlock): boolean => b.component == null), rows, cols).map(cell => ({
        row: cell.row,
        col: cell.col,
        rowSpan: 1,
        colSpan: 1,
        component: null
    } as GridBlock))]
}

export default {
    fillGrid,
    parsePadding,
    parseGap
}
