# Data Table Component

A powerful and flexible data table component for Uniface applications, built with Svelte and TypeScript.

## Overview

The Data Table component provides a comprehensive solution for displaying and managing tabular data. It supports features like frozen columns, row actions, sorting, inline editing, and custom cell formatting.

## Installation

```typescript
import DataTable from '@ticatec/uniface-element/DataTable';
import type { DataColumn, ActionsColumn, IndicatorColumn } from '@ticatec/uniface-element/DataTable';
```

## Basic Usage

```svelte
<script lang="ts">
  import DataTable from '@ticatec/uniface-element/DataTable';
  import type { DataColumn } from '@ticatec/uniface-element/DataTable';

  let data = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Smith', age: 25 }
  ];

  let columns: DataColumn[] = [
    { text: 'ID', field: 'id', width: 80 },
    { text: 'Name', field: 'name', width: 200 },
    { text: 'Age', field: 'age', width: 100 }
  ];
</script>

<DataTable {columns} list={data} />
```

## Core Components

### UniDataTable Class

The main data table class (`src/lib/data-table/UniDataTable.ts:17`) that manages table state and configuration.

**Constructor:**
```typescript
new UniDataTable(id: string, indicatorWidth?: number)
```

**Key Methods:**
- `setColumns(columns: Array<DataColumn>)` - Set table columns
- `generateTemplateStyle(): string` - Generate CSS styles for columns
- Getters: `width`, `frozenWidth`, `rows`, `columns`, `frozenColumns`

### DataColumn Interface

Defines column configuration (`src/lib/data-table/lib/DataColumn.ts:5`):

```typescript
interface DataColumn {
  text: string;              // Column header text
  field?: string;            // Data field name
  frozen?: boolean;          // Whether column is frozen
  align?: 'left' | 'center' | 'right';
  width: number;             // Column width in pixels
  minWidth?: number;         // Minimum width
  warp?: boolean;           // Allow text wrapping
  formatter?: FormatCell;    // Cell value formatter
  escapeHTML?: boolean;      // Escape HTML in cell content
  href?: HrefBuilder;        // Hyperlink configuration
  hint?: CellHint;          // Cell tooltip function
  render?: any;             // Custom cell renderer
  visible?: boolean;        // Column visibility
  resizable?: boolean;      // Column is resizable
  compareFunction?: CompareFunction; // Sorting function
}
```

## Properties

### DataTable Component Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `columns` | `Array<DataColumn>` | required | Column definitions |
| `list` | `Array<any>` | required | Data array |
| `actionsColumn` | `ActionsColumn \| null` | `null` | Row actions configuration |
| `indicatorColumn` | `IndicatorColumn \| null` | `null` | Indicator column configuration |
| `rowHeight` | `number` | `42` | Row height in pixels |
| `selectedRows` | `Array<any>` | `[]` | Selected rows array |
| `inlineRowHeight` | `number` | `80` | Height for expanded inline rows |
| `rowBorder` | `boolean` | `false` | Show row borders |
| `colBorder` | `boolean` | `false` | Show column borders |
| `emptyIndicator` | `string \| undefined` | `undefined` | Empty state message |
| `style` | `string` | `''` | Additional CSS styles |

## Advanced Features

### Frozen Columns

Columns can be frozen to the left side of the table:

```typescript
let columns: DataColumn[] = [
  { text: 'ID', field: 'id', width: 80, frozen: true },
  { text: 'Name', field: 'name', width: 200, frozen: true },
  { text: 'Description', field: 'desc', width: 300 }
];
```

### Actions Column

Add action buttons to each row:

```typescript
import type { ActionsColumn, RowAction } from '@ticatec/uniface-element/DataTable';

let actionsColumn: ActionsColumn = {
  width: 120,
  align: 'center',
  getActions: (item) => [
    {
      label: 'Edit',
      type: 'primary',
      icon: 'edit',
      callback: (item) => editItem(item)
    },
    {
      label: 'Delete',
      type: 'secondary',
      icon: 'delete',
      callback: (item) => deleteItem(item)
    }
  ]
};
```

### Indicator Column

Add selection checkboxes, row numbers, or expandable rows:

```typescript
import type { IndicatorColumn } from '@ticatec/uniface-element/DataTable';

let indicatorColumn: IndicatorColumn = {
  width: 60,
  selectable: true,
  displayNo: true,
  buildInlineComponent: async (data) => {
    // Return component for expanded row content
    return SomeInlineComponent;
  }
};
```

### Cell Formatting

Custom cell formatters and hints:

```typescript
import type { FormatCell, CellHint } from '@ticatec/uniface-element/DataTable';

const dateFormatter: FormatCell = (value) => {
  return new Date(value).toLocaleDateString();
};

const tooltipHint: CellHint = (value) => {
  return `Full value: ${value}`;
};

let columns: DataColumn[] = [
  {
    text: 'Created Date',
    field: 'createdAt',
    width: 150,
    formatter: dateFormatter,
    hint: tooltipHint
  }
];
```

### Sorting

Add sorting capability to columns:

```typescript
import type { CompareFunction } from '@ticatec/uniface-element/DataTable';

const nameCompare: CompareFunction = (a, b) => {
  return a.name.localeCompare(b.name);
};

let columns: DataColumn[] = [
  {
    text: 'Name',
    field: 'name',
    width: 200,
    compareFunction: nameCompare
  }
];
```

### Hyperlinks

Make cells clickable links:

```typescript
import type { HrefBuilder } from '@ticatec/uniface-element/DataTable';

const profileLink: HrefBuilder = (item) => {
  return `/profile/${item.id}`;
};

let columns: DataColumn[] = [
  {
    text: 'Name',
    field: 'name',
    width: 200,
    href: profileLink
  }
];
```

## Event Handling

The component supports various event handlers:

```typescript
// Event handler types
type RowEventHandler = (row: TableRow) => void;
type RowSelectEventHandler = (row: TableRow, value: boolean) => void;
type TableEventHandler = () => void;
type SelectionEventHandler = (value: boolean) => void;
```

### Selection Modes

```typescript
enum SelectionMode {
  All = 1,
  Partial = 0,
  None = -1
}
```

## Styling

The component uses CSS classes that can be customized:

```css
.uniface-data-table {
  /* Main table container */
}

.uniface-data-table.row-border {
  /* Table with row borders */
}

.uniface-data-table.cell-border {
  /* Table with cell borders */
}
```

Column-specific styles are generated dynamically based on column configuration.

## Examples

### Complete Example with All Features

```svelte
<script lang="ts">
  import DataTable from '@ticatec/uniface-element/DataTable';
  import type { DataColumn, ActionsColumn, IndicatorColumn } from '@ticatec/uniface-element/DataTable';

  let employees = [
    { id: 1, name: 'John Doe', department: 'IT', salary: 75000, startDate: '2020-01-15' },
    { id: 2, name: 'Jane Smith', department: 'HR', salary: 68000, startDate: '2019-03-22' }
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
      text: 'Employee Name',
      field: 'name',
      width: 180,
      frozen: true
    },
    {
      text: 'Department',
      field: 'department',
      width: 120
    },
    {
      text: 'Salary',
      field: 'salary',
      width: 100,
      align: 'right',
      formatter: (value) => `$${value.toLocaleString()}`
    },
    {
      text: 'Start Date',
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
        label: 'Edit',
        type: 'primary',
        callback: (emp) => console.log('Edit', emp)
      },
      {
        label: 'Delete',
        type: 'secondary',
        callback: (emp) => console.log('Delete', emp)
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

## API Reference

### Main Exports

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

### DataColumn Interface

```typescript
interface DataColumn {
  /**
   * Column header text
   */
  text: string;

  /**
   * Data field/property name
   */
  field?: string;

  /**
   * Whether column is frozen to left side
   */
  frozen?: boolean;

  /**
   * Text alignment
   */
  align?: 'left' | 'center' | 'right';

  /**
   * Column width in pixels
   */
  width: number;

  /**
   * Minimum width
   */
  minWidth?: number;

  /**
   * Allow text wrapping (default: false)
   */
  warp?: boolean;

  /**
   * Cell value formatter function
   */
  formatter?: FormatCell;

  /**
   * Whether to escape HTML characters
   */
  escapeHTML?: boolean;

  /**
   * Hyperlink configuration
   */
  href?: HrefBuilder;

  /**
   * Cell hint/tooltip function
   */
  hint?: CellHint;

  /**
   * Custom cell renderer
   */
  render?: any;

  /**
   * Column visibility
   */
  visible?: boolean;

  /**
   * Whether column is resizable
   */
  resizable?: boolean;

  /**
   * Sorting comparison function
   */
  compareFunction?: CompareFunction;
}
```

### ActionsColumn Interface

```typescript
interface ActionsColumn {
  /**
   * Column width in pixels
   */
  width: number;

  /**
   * Get row actions function
   */
  getActions: GetRowActions;

  /**
   * Alignment (default: left)
   */
  align?: 'left' | 'center';
}
```

### IndicatorColumn Interface

```typescript
interface IndicatorColumn {
  /**
   * Column width in pixels
   */
  width: number;

  /**
   * Whether rows are selectable
   */
  selectable?: boolean;

  /**
   * Function to build inline component for expanded rows
   */
  buildInlineComponent?: (data: any) => Promise<any>;

  /**
   * Whether to display row numbers
   */
  displayNo?: boolean;
}
```

### RowAction Interface

```typescript
interface RowAction {
  /**
   * Action button label
   */
  label: string;

  /**
   * Action button type/style
   */
  type?: 'primary' | 'secondary' | 'third' | 'forth';

  /**
   * Action button icon
   */
  icon?: string;

  /**
   * Action callback function
   */
  callback: ActionFunction;
}
```

### Type Definitions

```typescript
/**
 * Cell value formatter function
 */
export type FormatCell = (value: any) => string;

/**
 * Cell hint/tooltip function
 */
export type CellHint = (value: any) => string;

/**
 * Action callback function
 */
export type ActionFunction = (item: any) => void;

/**
 * Function to get row actions
 */
export type GetRowActions = (item: any) => Array<RowAction>;

/**
 * Hyperlink builder function
 */
export type HrefBuilder = (item: any) => string;

/**
 * Comparison function for sorting
 */
export type CompareFunction = (a: any, b: any) => number;

/**
 * Row event handler
 */
export type RowEventHandler = (row: TableRow) => void;

/**
 * Row selection event handler
 */
export type RowSelectEventHandler = (row: TableRow, value: boolean) => void;

/**
 * Table event handler
 */
export type TableEventHandler = () => void;

/**
 * Selection event handler
 */
export type SelectionEventHandler = (value: boolean) => void;
```

### Enums

```typescript
/**
 * Selection modes
 */
export enum SelectionMode {
  All = 1,      // All rows selected
  Partial = 0,  // Some rows selected
  None = -1     // No rows selected
}

/**
 * Sort order directions
 */
export enum OrderDirection {
  Ascending = 'asc',
  Descending = 'desc'
}
```