import type {GetRowActions} from "./RowAction";

export default interface ActionsColumn {
    /**
     * 宽度
     */
    width: number;
    /**
     *
     */
    getActions: GetRowActions;

    /**
     * 对齐方式，默认靠左对齐
     */
    align?: 'left' | 'center';
}