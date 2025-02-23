export default interface UnitOption {

    /**
     * 单位编码
     */
    code: string;

    /**
     * 单位文字
     */
    text?: string;

    /**
     * 标准比例
     */
    ratio?: number;

    /**
     * 小数位
     */
    precision?: number | null;

    /**
     * 最大值
     */
    max?: number | null;

    /**
     * 最小值
     */
    min?: number | null;
}