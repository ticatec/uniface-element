import type {IndicatorColumn} from "$lib/data-table";
import type DataColumn from "$lib/data-table/lib/DataColumn";

/**
 * 数据表左边的固定栏
 */
export default interface FixedColumns {

    /**
     * 指示栏，用于选中器，行号，展开图标
     */
    indicator: IndicatorColumn;

    /**
     * 固定的数据列
     */
    columns: Array<DataColumn>;

}