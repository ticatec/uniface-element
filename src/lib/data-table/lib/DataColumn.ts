import type {CellHint, FormatCell} from "./FormatCell";
import type {HrefBuilder} from "./HrefLink";
import type {CompareFunction} from "./CompareFunction";

export default interface DataColumn {

    /**
     * 列头文字
     */
    text: string;

    /**
     * 对应的字段/属性名
     */
    field?: string;

    /**
     * 是否冻结在数据表中，如果前面的frozen是false，那么就无效
     */
    frozen?: boolean;

    /**
     * 对齐方式
     */
    align?: 'left' | 'center' | 'right';

    /**
     *
     */
    width: number;

    minWidth?: number;

    /**
     * 是否可以换行，默认为false
     */
    warp?: boolean;

    /**
     * 单元格转换函数
     */
    formatter?: FormatCell;

    /**
     * 是否忽略html的转义符
     */
    escapeHTML?: boolean;

    /**
     * 超链接设置
     */
    href?: HrefBuilder;

    /**
     * 是否生产hint
     */
    hint?: CellHint;

    /**
     * 渲染器
     */
    render?: any;

    /**
     *
     */
    visible?: boolean;

    /**
     *
     */
    resizable?: boolean;

    /**
     *
     */
    compareFunction?: CompareFunction;
}
