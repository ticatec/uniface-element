import type DataColumn from "$lib/data-table/lib/DataColumn";
import TableRows from "$lib/data-table/parts/TableRows";
import type TableRow from "$lib/data-table/parts/TableRow";


export type RowEventHandler = (row: TableRow) => void;
export type RowSelectEventHandler = (row: TableRow, value: boolean) => void;
export type TableEventHandler = () => void;
export type SelectionEventHandler = (value: boolean) => void;

export enum SelectionMode {
    All = 1,
    Partial = 0,
    None = -1
}

export default class UniDataTable {

    private _frozenColumns: Array<DataColumn> = [];
    private _columns: Array<DataColumn> = [];
    private tableRows: TableRows;
    private indicatorWidth: number;
    readonly id: string;
    private _width: number = 0;
    private _frozenWidth: number = 0;

    constructor(id: string, indicatorWidth?: number) {
        this.id = id;
        this.indicatorWidth = indicatorWidth ?? 0;
        this.tableRows = new TableRows();
    }

    set data(value: Array<any>) {
        this.tableRows.data = value;
    }

    get data() {
        return this.tableRows.data;
    }

    setColumns(columns: Array<DataColumn>) {
        this._frozenColumns = [];
        this._columns = [];
        (columns ?? []).forEach(col => {
            if (col.visible!=false) {
                if (col.frozen) {
                    this._frozenColumns.push(col);
                } else {
                    this._columns.push(col);
                }
            }
        });
    }

    generateTemplateStyle(): string {
        this._width = 0;
        this._frozenWidth = 0;
        let colStyle = '';
        let inv = 0;
        this._frozenColumns.forEach((col, idx) => {
            if (col.visible != false) {
                this._frozenWidth += col.width;
                colStyle += `#tab-${this.id} .fz_col-${idx - inv} {width: ${col.width}px; text-align: ${col.align ?? 'left'}}\n`;
            } else {
                inv++;
            }
        });
        inv = 0;
        this._columns.forEach((col, idx) => {
            if (col.visible != false) {
                this._width += col.width;
                colStyle += `#tab-${this.id} .col-${idx - inv} { width: ${col.width}px ; text-align: ${col.align ?? 'left'} }\n`;
            } else {
                inv++;
            }
        })
        return `<style>${colStyle}</style>`;
    }

    get width() {
        return this._width;
    }

    get frozenWidth() {
        return this._frozenWidth + this.indicatorWidth;
    }

    get rows(): Array<TableRow> {
        return [...this.tableRows.rows];
    }

    get columns(): Array<DataColumn> {
        return this._columns;
    }

    get frozenColumns(): Array<DataColumn> {
        return this._frozenColumns;
    }
}
