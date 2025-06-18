export type ShowHint = (element: Element, text: string, x: number, y: number) => void;
export default interface IHint {
    show: ShowHint;
}

const initialize = (showHint: ShowHint): void=> {
    window.Hint = {
        show: showHint
    };
};

export {initialize}