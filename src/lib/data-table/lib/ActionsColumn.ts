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
}