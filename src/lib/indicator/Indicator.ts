

type ShowIndicator = (msg: string) => void;
type HideIndicator = () => void;

export default interface Indicator {
    show: ShowIndicator;
    hide: HideIndicator;
}


const initialize = (show: ShowIndicator, hide: HideIndicator): void=> {
    window.Indicator = {
        show,
        hide
    }
};

export {initialize}