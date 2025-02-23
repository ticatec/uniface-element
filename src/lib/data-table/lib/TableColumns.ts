import type DataColumn from "./DataColumn";

export default class TableColumns {

    private _columns: Array<DataColumn>;

    constructor(columns: Array<DataColumn>) {
        this._columns = columns;
    }


    /**
     * 获取当前所有可视的列
     */
    get columns() {
        return this._columns.map(item=>item.visible == true);
    }


}