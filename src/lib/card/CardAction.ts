export type ActionCallback = () => void;

export default interface CardAction {

    icon?: string;

    disabled?: boolean;

    callback: ActionCallback;
}