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
    type?: 'primary' | 'secondary' | 'third' | 'forth';

    /**
     *
     */
    icon?: string;

    /**
     *
     */
    callback: ActionFunction;
}

/**
 *
 */
export type GetRowActions = (item: any) => Array<RowAction>;

