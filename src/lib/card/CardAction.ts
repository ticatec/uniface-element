export type ActionCallback = () => void;

export default interface CardAction {

    icon?: string;

    callback: ActionCallback;
}