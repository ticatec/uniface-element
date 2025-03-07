
import type {CompareFunction} from "$lib/data-table/lib/CompareFunction";
import TableRow from "$lib/data-table/parts/TableRow";

export default class TableRows {

    private _rows: Array<TableRow>;

    constructor() {
        this._rows = [];
    }

    set data(list: Array<any>) {
        this._rows = list.map(item=> {return new TableRow(item)});
    }

    get rows(): Array<TableRow> {
        return this._rows;
    }
}