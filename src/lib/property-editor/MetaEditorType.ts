export enum MetaEditorType {

    /**
     * 文字类型
     */
    Text = 'Text',
    /**
     * 数字类型
     */
    Number = 'Number',
    /**
     * 日期类型
     */
    Date = 'Date',
    /**
     * 日期时间类型
     */
    DateTime = 'DateTime',
    /**
     * 下拉框类型
     */
    Options = 'Options',

    /**
     * 布尔型
     */
    Boolean = 'Boolean'

}

export default interface PropertyField {

    /**
     * 字段名称
     */
    name: string;

    /**
     * 文字
     */
    label: string;

    /**
     * 类型
     */
    type: MetaEditorType;

    /**
     * 属性
     */
    attrs?: any;

}

export interface PropertyEditor extends PropertyField {

    component: any;

}