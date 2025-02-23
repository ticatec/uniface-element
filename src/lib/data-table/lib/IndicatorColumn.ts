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
     *
     * @param ex
     */
    getInlineError?: (ex:Error) => string;

    /**
     * 读取数据的指示信息
     */
    loadingIndicator?: string;

    /**
     *  空数据指示信息
     */
    emptyIndicator?: string;
}