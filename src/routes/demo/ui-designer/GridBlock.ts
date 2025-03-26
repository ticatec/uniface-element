export default interface GridBlock {
    /**
     * 所在的行
     */
    row: number;
    /**
     * 所在的列
     */
    col: number;
    /**
     * 占行数量
     */
    rowSpan?: number;
    /**
     * 占列数量
     */
    colSpan?: number;
    /**
     * 组件
     */
    component?: any;
    /**
     *
     */
    props?: any;
}