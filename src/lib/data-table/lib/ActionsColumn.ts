import type {GetRowActions} from "./RowAction";

export default interface ActionsColumn {
    /**
     * 栏标题
     */
    title: string;
    /**
     * 宽度
     */
    width: number;
    /**
     *
     */
    getActions: GetRowActions;
}