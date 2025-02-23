import type {CompareFunction} from "./CompareFunction";

export default interface CommonHeaderCell {

    /**
     * 栏目的标题
     */
    text: string;
    /**
     * 合并的行数
     */
    rowSpan: number;
    /**
     * 所做的列
     */
    col: number;
    /**
     * 所在的行
     */
    row: number;
}

export interface DataHeaderCell extends CommonHeaderCell {
    /**
     * 宽度
     */
    width: number;

    /**
     *
     */
    field?: string;

    /**
     * 是否可以更改大小
     */
    resizable?: boolean;

    /**
     * 排序的比较函数
     */
    compareFunction?: CompareFunction;

}