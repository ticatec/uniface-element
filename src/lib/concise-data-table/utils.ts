import type Column from "$lib/concise-data-table/Column";
import type {TableOptions} from "$lib/concise-data-table/TableOptions";

const generateBlockStyle = (prefix: string, options: any, keys: Array<any>): string => {
    let style = '';
    keys.forEach(key=> {
        if (options[key.code]) {
            style += `${key.attr}: ${options[key.code]}${key.suffix??''};\n`
        }
    });
    if (style.length > 0) {
        return `${prefix} { ${style} }`
    } else {
        return '';
    }
}

/**
 *
 * @param id
 * @param columns
 * @param options
 * @param viewWidth
 */
const generateTableStyle = (id: string, columns: Array<Column>, options: TableOptions, viewWidth: number): string => {
    let style: string = '';
    if (options && columns) {
        style += generateBlockStyle(`#tab_${id}`, options, [{code: 'backgroundColor', attr: 'background-color'}, {code: 'color', attr: 'color'}]);
        style += generateBlockStyle(`#tab_${id} .table-row.alternative `, options, [{code: 'alternativeBackgroundColor', attr: 'background-color'}, {code: 'alternativeColor', attr: 'color'}]);
        style += generateBlockStyle(`#tab_${id} .table-header .table-row `, options, [{code: 'headerBackgroundColor', attr: 'background-color'}, {code: 'headerColor', attr: 'color'}, {code: 'headerHeight', attr: 'height', suffix: 'px'}]);
        style += generateBlockStyle(`#tab_${id} .table-body .table-row`, options, [{code: 'headerHeight', attr: 'height', suffix: 'px'}])
                let totalWeight: number = columns.reduce((sum, col) => sum + (col.weight || 0), 0);
        let tabWidth = columns.reduce((sum, col) => sum + col.width, 0);
        let diff = (viewWidth - tabWidth) / totalWeight;
        columns.forEach((col: Column, idx: number) => {
            style += `#tab_${id} .col_${idx} {\n width: ${col.width + (col.weight ?? 0) * diff}px; \n text-align: ${col.align ?? 'left'};} \n`
        });
    }

    return `<style>${style}</style>`;
}

export default {generateTableStyle}