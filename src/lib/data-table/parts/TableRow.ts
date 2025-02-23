export default class TableRow {

    private _expand: boolean = false;
    private _height: number = 0;
    readonly data: any;
    private _isBusy: boolean = false;
    selected: boolean = false;

    constructor(data: any) {
        this.data = data;
    }

    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
    }

    get expand(): boolean {
        return this._expand;
    }

    set expand(value: boolean) {
        this._expand = value;
    }

    // get selected(): boolean {
    //     return this._selected;
    // }
    //
    // set selected(value: boolean) {
    //     this._selected = value;
    // }

    get isBusy() {
        return this._isBusy;
    }

    set isBusy(value: boolean) {
        this._isBusy = value;
    }


}