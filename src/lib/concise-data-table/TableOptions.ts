export interface TableOptions {
    //表格的背景色
    backgroundColor?: string;
    //表格的文字颜色
    color?: string;
    //标题行高
    headerHeight?: number;
    //标题行的背景色
    headerBackgroundColor?: string;
    //标题行文字颜色
    headerColor?: string;
    //间隔行背景色
    alternativeBackgroundColor?: string;
    //间隔行颜色
    alternativeColor?: string;
    //数据行高度
    rowHeight?: number;
}

export type RowClickHandler = (row:any) => (event: MouseEvent) => void;