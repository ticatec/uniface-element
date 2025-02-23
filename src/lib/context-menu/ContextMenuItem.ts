export type ActionCallback = () => void;

export interface ContextMenuItem {
    /**
     *
     */
    text: string;

    /**
     *
     */
    action: ActionCallback;
}

/**
 *
 */
export type OnContextMenu = (event: MouseEvent, data: any) => void;