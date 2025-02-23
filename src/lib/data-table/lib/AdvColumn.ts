import type {HrefBuilder} from "./HrefLink";
import type {CellHint, FormatCell} from "./FormatCell";

export default interface AdvColumn {
    /**
     * 对齐方式，文本，可以取值：left, center, right
     */
    align: string;
    /**
     * 对应的字段/属性名
     */
    field?: string;
    /**
     * 超链接设置
     */
    href?: HrefBuilder | null;
    /**
     * 单元格转换函数
     */
    formatter?: FormatCell;
    /**
     * 是否忽略html的转义符
     */
    escapeHTML: boolean;
    /**
     * 待显示的提示
     */
    hint?: CellHint;
    /**
     * 渲染器
     */
    render?: any;

    /**
     * 宽度
     */
    width:number;
}