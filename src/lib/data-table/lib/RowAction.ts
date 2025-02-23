/**
 *
 */
export type ActionFunction = (item: any) => void;

/**
 *
 */
export default interface RowAction {
    /**
     *
     */
    label: string;

    /**
     *
     */
    callback: ActionFunction;
}

/**
 *
 */
export type GetRowActions = (item: any) => Array<RowAction>;

