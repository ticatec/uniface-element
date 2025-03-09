export default interface IndicatorColumn {
    /**
     *
     */
    width: number;
    /**
     *
     */
    selectable: boolean;

    /**
     *
     */
    buildInlineComponent?: (data:any) => Promise<any>;


    /**
     * 是否显示行号
     */
    displayNo?: boolean
}