# 数据表格组件

为 Uniface 应用程序构建的功能强大且灵活的数据表格组件，使用 Svelte 和 TypeScript 开发。

## 概述

数据表格组件为显示和管理表格数据提供了全面的解决方案。它支持冻结列、行操作、排序、内联编辑和自定义单元格格式化等功能。

## 安装

```typescript
import DataTable from '@ticatec/uniface-element/DataTable';
import type { DataColumn, ActionsColumn, IndicatorColumn } from '@ticatec/uniface-element/DataTable';
```

## 基本用法

```svelte
<script lang="ts">
  import DataTable from '@ticatec/uniface-element/DataTable';
  import type { DataColumn } from '@ticatec/uniface-element/DataTable';

  let data = [
    { id: 1, name: '张三', age: 30 },
    { id: 2, name: '李四', age: 25 }
  ];

  let columns: DataColumn[] = [
    { text: 'ID', field: 'id', width: 80 },
    { text: '姓名', field: 'name', width: 200 },
    { text: '年龄', field: 'age', width: 100 }
  ];
</script>

<DataTable {columns} list={data} />
```

## 核心组件

### UniDataTable 类

主要的数据表格类 (`src/lib/data-table/UniDataTable.ts:17`)，管理表格状态和配置。

**构造函数：**
```typescript
new UniDataTable(id: string, indicatorWidth?: number)
```

**主要方法：**
- `setColumns(columns: Array<DataColumn>)` - 设置表格列
- `generateTemplateStyle(): string` - 生成列的 CSS 样式
- 获取器：`width`、`frozenWidth`、`rows`、`columns`、`frozenColumns`

### DataColumn 接口

定义列配置 (`src/lib/data-table/lib/DataColumn.ts:5`)：

```typescript
interface DataColumn {
  text: string;              // 列头文字
  field?: string;            // 对应的字段/属性名
  frozen?: boolean;          // 是否冻结列
  align?: 'left' | 'center' | 'right'; // 对齐方式
  width: number;             // 列宽（像素）
  minWidth?: number;         // 最小宽度
  warp?: boolean;           // 是否可以换行
  formatter?: FormatCell;    // 单元格转换函数
  escapeHTML?: boolean;      // 是否忽略HTML的转义符
  href?: HrefBuilder;        // 超链接设置
  hint?: CellHint;          // 是否生成提示
  render?: any;             // 渲染器
  visible?: boolean;        // 是否可见
  resizable?: boolean;      // 是否可调整大小
  compareFunction?: CompareFunction; // 排序函数
}
```

## 属性

### DataTable 组件属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `columns` | `Array<DataColumn>` | 必需 | 列定义 |
| `list` | `Array<any>` | 必需 | 数据数组 |
| `actionsColumn` | `ActionsColumn \| null` | `null` | 行操作配置 |
| `indicatorColumn` | `IndicatorColumn \| null` | `null` | 指示器列配置 |
| `rowHeight` | `number` | `42` | 行高（像素） |
| `selectedRows` | `Array<any>` | `[]` | 选中的行数组 |
| `inlineRowHeight` | `number` | `80` | 展开行的高度 |
| `rowBorder` | `boolean` | `false` | 显示行边框 |
| `colBorder` | `boolean` | `false` | 显示列边框 |
| `emptyIndicator` | `string \| undefined` | `undefined` | 空状态消息 |
| `style` | `string` | `''` | 额外的 CSS 样式 |

## 高级功能

### 冻结列

列可以冻结在表格的左侧：

```typescript
let columns: DataColumn[] = [
  { text: 'ID', field: 'id', width: 80, frozen: true },
  { text: '姓名', field: 'name', width: 200, frozen: true },
  { text: '描述', field: 'desc', width: 300 }
];
```

### 操作列

为每行添加操作按钮：

```typescript
import type { ActionsColumn, RowAction } from '@ticatec/uniface-element/DataTable';

let actionsColumn: ActionsColumn = {
  width: 120,
  align: 'center',
  getActions: (item) => [
    {
      label: '编辑',
      type: 'primary',
      icon: 'edit',
      callback: (item) => editItem(item)
    },
    {
      label: '删除',
      type: 'secondary',
      icon: 'delete',
      callback: (item) => deleteItem(item)
    }
  ]
};
```

### 指示器列

添加选择复选框、行号或可展开行：

```typescript
import type { IndicatorColumn } from '@ticatec/uniface-element/DataTable';

let indicatorColumn: IndicatorColumn = {
  width: 60,
  selectable: true,
  displayNo: true,
  buildInlineComponent: async (data) => {
    // 返回展开行内容的组件
    return SomeInlineComponent;
  }
};
```

### 单元格格式化

自定义单元格格式化器和提示：

```typescript
import type { FormatCell, CellHint } from '@ticatec/uniface-element/DataTable';

const dateFormatter: FormatCell = (value) => {
  return new Date(value).toLocaleDateString();
};

const tooltipHint: CellHint = (value) => {
  return `完整值：${value}`;
};

let columns: DataColumn[] = [
  {
    text: '创建日期',
    field: 'createdAt',
    width: 150,
    formatter: dateFormatter,
    hint: tooltipHint
  }
];
```

### 排序

为列添加排序功能：

```typescript
import type { CompareFunction } from '@ticatec/uniface-element/DataTable';

const nameCompare: CompareFunction = (a, b) => {
  return a.name.localeCompare(b.name);
};

let columns: DataColumn[] = [
  {
    text: '姓名',
    field: 'name',
    width: 200,
    compareFunction: nameCompare
  }
];
```

### 超链接

使单元格成为可点击的链接：

```typescript
import type { HrefBuilder } from '@ticatec/uniface-element/DataTable';

const profileLink: HrefBuilder = (item) => {
  return `/profile/${item.id}`;
};

let columns: DataColumn[] = [
  {
    text: '姓名',
    field: 'name',
    width: 200,
    href: profileLink
  }
];
```

## 事件处理

组件支持各种事件处理器：

```typescript
// 事件处理器类型
type RowEventHandler = (row: TableRow) => void;
type RowSelectEventHandler = (row: TableRow, value: boolean) => void;
type TableEventHandler = () => void;
type SelectionEventHandler = (value: boolean) => void;
```

### 选择模式

```typescript
enum SelectionMode {
  All = 1,      // 全选
  Partial = 0,  // 部分选择
  None = -1     // 未选择
}
```

## 样式

组件使用可自定义的 CSS 类：

```css
.uniface-data-table {
  /* 主表格容器 */
}

.uniface-data-table.row-border {
  /* 有行边框的表格 */
}

.uniface-data-table.cell-border {
  /* 有单元格边框的表格 */
}
```

列特定样式基于列配置动态生成。

## 示例

### 包含所有功能的完整示例

```svelte
<script lang="ts">
  import DataTable from '@ticatec/uniface-element/DataTable';
  import type { DataColumn, ActionsColumn, IndicatorColumn } from '@ticatec/uniface-element/DataTable';

  let employees = [
    { id: 1, name: '张三', department: 'IT', salary: 75000, startDate: '2020-01-15' },
    { id: 2, name: '李四', department: 'HR', salary: 68000, startDate: '2019-03-22' }
  ];

  let selectedRows = [];

  let columns: DataColumn[] = [
    {
      text: 'ID',
      field: 'id',
      width: 60,
      frozen: true,
      align: 'center'
    },
    {
      text: '员工姓名',
      field: 'name',
      width: 180,
      frozen: true
    },
    {
      text: '部门',
      field: 'department',
      width: 120
    },
    {
      text: '薪资',
      field: 'salary',
      width: 100,
      align: 'right',
      formatter: (value) => `¥${value.toLocaleString()}`
    },
    {
      text: '入职日期',
      field: 'startDate',
      width: 120,
      formatter: (value) => new Date(value).toLocaleDateString()
    }
  ];

  let actionsColumn: ActionsColumn = {
    width: 100,
    align: 'center',
    getActions: (employee) => [
      {
        label: '编辑',
        type: 'primary',
        callback: (emp) => console.log('编辑', emp)
      },
      {
        label: '删除',
        type: 'secondary',
        callback: (emp) => console.log('删除', emp)
      }
    ]
  };

  let indicatorColumn: IndicatorColumn = {
    width: 50,
    selectable: true,
    displayNo: true
  };
</script>

<DataTable
  {columns}
  {actionsColumn}
  {indicatorColumn}
  list={employees}
  bind:selectedRows
  rowHeight={45}
  rowBorder={true}
  colBorder={false}
/>
```

## API 参考

### 主要导出

```typescript
import DataTable from "@ticatec/uniface-element/DataTable";
import type {
  ActionsColumn, 
  IndicatorColumn, 
  FormatCell, 
  CellHint, 
  DataColumn,
  RowAction, 
  GetRowActions, 
  ActionFunction
} from "@ticatec/uniface-element/DataTable";
```

### DataColumn 接口

```typescript
interface DataColumn {
  /**
   * 列头文字
   */
  text: string;

  /**
   * 对应的字段/属性名
   */
  field?: string;

  /**
   * 是否冻结在数据表中左侧
   */
  frozen?: boolean;

  /**
   * 对齐方式
   */
  align?: 'left' | 'center' | 'right';

  /**
   * 列宽（像素）
   */
  width: number;

  /**
   * 最小宽度
   */
  minWidth?: number;

  /**
   * 是否可以换行，默认为false
   */
  warp?: boolean;

  /**
   * 单元格转换函数
   */
  formatter?: FormatCell;

  /**
   * 是否忽略html的转义符
   */
  escapeHTML?: boolean;

  /**
   * 超链接设置
   */
  href?: HrefBuilder;

  /**
   * 是否生成提示
   */
  hint?: CellHint;

  /**
   * 渲染器
   */
  render?: any;

  /**
   * 是否可见
   */
  visible?: boolean;

  /**
   * 是否可调整大小
   */
  resizable?: boolean;

  /**
   * 排序比较函数
   */
  compareFunction?: CompareFunction;
}
```

### ActionsColumn 接口

```typescript
interface ActionsColumn {
  /**
   * 宽度（像素）
   */
  width: number;

  /**
   * 获取行操作函数
   */
  getActions: GetRowActions;

  /**
   * 对齐方式，默认靠左对齐
   */
  align?: 'left' | 'center';
}
```

### IndicatorColumn 接口

```typescript
interface IndicatorColumn {
  /**
   * 宽度（像素）
   */
  width: number;

  /**
   * 是否可选择
   */
  selectable?: boolean;

  /**
   * 构建展开行内容组件的函数
   */
  buildInlineComponent?: (data: any) => Promise<any>;

  /**
   * 是否显示行号
   */
  displayNo?: boolean;
}
```

### RowAction 接口

```typescript
interface RowAction {
  /**
   * 操作按钮标签
   */
  label: string;

  /**
   * 操作按钮类型/样式
   */
  type?: 'primary' | 'secondary' | 'third' | 'forth';

  /**
   * 操作按钮图标
   */
  icon?: string;

  /**
   * 操作回调函数
   */
  callback: ActionFunction;
}
```

### 类型定义

```typescript
/**
 * 单元格值格式化函数
 */
export type FormatCell = (value: any) => string;

/**
 * 单元格提示/工具提示函数
 */
export type CellHint = (value: any) => string;

/**
 * 操作回调函数
 */
export type ActionFunction = (item: any) => void;

/**
 * 获取行操作的函数
 */
export type GetRowActions = (item: any) => Array<RowAction>;

/**
 * 超链接构建函数
 */
export type HrefBuilder = (item: any) => string;

/**
 * 排序比较函数
 */
export type CompareFunction = (a: any, b: any) => number;

/**
 * 行事件处理器
 */
export type RowEventHandler = (row: TableRow) => void;

/**
 * 行选择事件处理器
 */
export type RowSelectEventHandler = (row: TableRow, value: boolean) => void;

/**
 * 表格事件处理器
 */
export type TableEventHandler = () => void;

/**
 * 选择事件处理器
 */
export type SelectionEventHandler = (value: boolean) => void;
```

### 枚举

```typescript
/**
 * 选择模式
 */
export enum SelectionMode {
  All = 1,      // 全选
  Partial = 0,  // 部分选择
  None = -1     // 未选择
}

/**
 * 排序方向
 */
export enum OrderDirection {
  Ascending = 'asc',   // 升序
  Descending = 'desc'  // 降序
}
```