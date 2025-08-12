# Uniface Element

[![npm version](https://badge.fury.io/js/%40ticatec%2Funiface-element.svg)](https://badge.fury.io/js/%40ticatec%2Funiface-element)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive enterprise-grade UI component library built with Svelte 5, designed for modern web applications.

[中文文档](./README_CN.md)

## Features

✨ **Enterprise-Grade Components** - Complete set of components for business applications  
🎨 **Theme System** - CSS variables-based theming with customizable design tokens  
📱 **Responsive Design** - Mobile-first responsive components  
🌍 **Internationalization** - Built-in i18n support with English and Chinese resources  
🎯 **TypeScript Support** - Full TypeScript definitions for better development experience  
🔧 **Modular Architecture** - Tree-shakable imports for optimal bundle size  
⚡ **High Performance** - Built with Svelte 5 for maximum performance  

## Installation

```bash
npm install @ticatec/uniface-element
```

## Quick Start

### 1. Import Styles

```typescript
// Import the main CSS file
import '@ticatec/uniface-element/ticatec-uniface-web.css';
```

### 2. Use Components

```svelte
<script lang="ts">
  import Button, DataTable, Dialog from '@ticatec/uniface-element/Button, DataTable, Dialog';
  import type { DataColumn } from '@ticatec/uniface-element';
  
  let columns: DataColumn[] = [
    { field: 'name', title: 'Name', width: 150 },
    { field: 'email', title: 'Email', width: 200 }
  ];
  
  let data = [
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Smith', email: 'jane@example.com' }
  ];
</script>

<Button type="primary" on:click={() => console.log('Clicked!')}>
  Click Me
</Button>

<DataTable {columns} list={data} />
```

## Component Categories

### Layout Components
- **App Layouts**: `SidebarLayout`, `HeaderLayout`, `ClassicLayout`, `ColumnsLayout`, `RowsLayout`
- **Containers**: `Box`, `Card`, `Page`, `Accordion`
- **Form Layouts**: `FlexForm`, `GridForm`, `FormField`
- **Utilities**: `Split`, `Separator`

### Data Display
- **Tables**: `DataTable`, `ConciseDataTable`
- **Lists**: `ListBox`, `TreeView`
- **Navigation**: `Breadcrumbs`, `Tabs`, `NavigatorMenu` | [Navigation Components Docs](./docs/navigation/)
- **Indicators**: `ProgressBar`, `ProgressStepBar`, `Tag`

### Form Controls
- **Input**: `TextEditor`, `NumberEditor`, [`MemoEditor`](./docs/form-components/en/memoeditor.md), [`PasswordEditor`](./docs/form-components/en/passwordeditor.md)
- **Selection**: `OptionsSelect`, `OptionsMultiSelect`, `CascadeOptionsSelect`
- **Date/Time**: `DatePicker`, `DateTimePicker`, `TimeEditor`
- **Search/Filter**: [`SearchBox`, `NumberRange`, `DateRange`](./docs/search-filters/) - Advanced search and filtering components
- **Others**: `CheckBox`, `RadioButton`, `Switch`, `ColorPicker`

### Feedback Components
- **Dialogs**: `Dialog`, `MessageBox`, `Drawer`
- **Notifications**: `Toast`, `PopupHint`
- **Overlays**: `FullScreenOverlay`

### Advanced Components
- **Editors**: `InlineCellEditor`, `PropertyEditor`, `PromptsTextEditor`
- **File Upload**: `AttachmentFiles`, `ImageFiles`
- **Data Transfer**: `Transfer`
- **Search**: `SearchBox`, `CriteriaField`

## Usage Examples

### Data Table with Selection

```svelte
<script lang="ts">
  import DataTable from '@ticatec/uniface-element/DataTable';
  import type { DataColumn } from '@ticatec/uniface-element';
  
  let columns: DataColumn[] = [
    {
      field: 'name',
      title: 'Name',
      width: 200
    },
    {
      field: 'email',
      title: 'Email',
      width: 250
    },
    {
      field: 'status',
      title: 'Status',
      width: 120
    }
  ];
  
  let data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Active' }
  ];
  
  let selectedRows = [];
</script>

<DataTable {columns} list={data} bind:selectedRows />
```

### Dialog with Form

```svelte
<script lang="ts">
  import Dialog, Button, TextEditor, FormField from '@ticatec/uniface-element/Dialog, Button, TextEditor, FormField';
  
  let showDialog = false;
  let formData = { name: '', email: '' };
</script>

<Button on:click={() => showDialog = true}>Open Dialog</Button>

<Dialog bind:visible={showDialog} title="Edit User">
  <FormField label="Name">
    <TextEditor bind:value={formData.name} />
  </FormField>
  
  <FormField label="Email">
    <TextEditor bind:value={formData.email} type="email" />
  </FormField>
  
  <svelte:fragment slot="actions">
    <Button on:click={() => showDialog = false}>Cancel</Button>
    <Button type="primary" on:click={() => showDialog = false}>Save</Button>
  </svelte:fragment>
</Dialog>
```

## Theme Customization

The library uses CSS custom properties for theming. You can customize the appearance by overriding these variables:

```css
:root {
  --uniface-primary-color: #0061FF;
  --uniface-secondary-color: #22BDFF;
  --uniface-primary-text-color: #374151;
  --uniface-button-common-bg: #f0f0f0;
  --uniface-hover-item-background: #f7f7f7;
  /* ... more variables */
}
```

## Internationalization

The library includes built-in internationalization support:

default language is english. to load other languages:

create a language resource json file in the static web directory, example: `/assets/uniface_zh-CN.json`
```json
{
  "uniface": {
    "common": {
      "btnClose": "关闭",
      "btnCancel": "取消",
      "btnConfirm": "确定",
      "textMore": "加载更多"
    },
    "colorPicker": "选择颜色",
    "calendar": {
      "months": [
        "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"
      ],
      "monthsAbbr": [
        "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"
      ],
      "weekTitle": [
        "周日", "周一", "周二", "周三", "周四", "周五", "周六"
      ],
      "weekTitleAbbr": [
        "日", "一", "二", "三", "四", "五", "六"
      ],
      "confirmText": "确定"
    },
    "upload": {
      "btnRetry": "重试",
      "btnRemove": "删除",
      "btnPickup": "选择文件"
    },
    "propertyEditor": {
      "colName": "属性",
      "colValue": "值"
    },
    "dataTable": {
      "rowNo": "#",
      "actions": "操作",
      "emptyDataSet": "暂无数据"
    },
    "transfer": {
      "selectIndicator": "已选择: {{selected}}/{{total}}"
    }
  }
}
```

You can load the resource file in the `+page.svelte` or other startup page.

```typescript
import i18n, {i18nUtils} from "@ticatec/i18n";

// 设置语言
i18n.setLanguage('zh-CN'); // 或 'en'
i18nUtils.loadResources('/assets/uniface.json'); //the language code will insert before .json
```

## Available Imports

### Modular Imports
```typescript
// Individual component imports
import  Button from '@ticatec/uniface-element/Button';
import DataTable from '@ticatec/uniface-element/DataTable';
import SidebarLayout from '@ticatec/uniface-element/app-layout/SidebarLayout';
import AttachmentFilesField from '@ticatec/uniface-element/AttachmentFiles';
import ImageFilesField from '@ticatec/uniface-element/ImageFiles';
import MemoEditor from '@ticatec/uniface-element/MemoEditor';

// Utility imports
import { utils } from '@ticatec/uniface-element/utils';
import type { DataColumn } from '@ticatec/uniface-element/DataTable';
```


## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build the library
npm run build

# Run type checking
npm run check
```

## Browser Support

- Chrome ≥ 88
- Firefox ≥ 85
- Safari ≥ 14
- Edge ≥ 88

## Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](./LICENSE) file for details.

## Author

**Henry Feng** - [Ticatec](https://github.com/ticatec-auckland)

## Documentation

Comprehensive component documentation is available in the `/docs` directory:

### Layout Components
- [SidebarLayout](./docs/layout/en/sidebarlayout.md) | [中文](./docs/layout/cn/sidebarlayout.md) - Left sidebar with resizable main content area
- [HeaderLayout](./docs/layout/en/headerlayout.md) | [中文](./docs/layout/cn/headerlayout.md) - Top header with content area and optional sidebar
- [ClassicLayout](./docs/layout/en/classiclayout.md) | [中文](./docs/layout/cn/classiclayout.md) - Full-screen layout with header, footer, sidebar, and content areas

### Button Components
- [Button System](./docs/buttons/en/README.md) | [中文](./docs/buttons/cn/README.md) - Complete button components including Button, TextButton, IconButton, and ActionBar

### Dialog Components
- [Dialog System](./docs/dialog/en/README.md) | [中文](./docs/dialog/cn/README.md) - Modal dialog system with DialogBoard, Dialog, and CommonDialog components

### Form Components
- [Form Controls](./docs/form/en/README.md) | [中文](./docs/form/cn/README.md) - Comprehensive form input components including TextEditor, NumberEditor, CheckBox, OptionsSelect, and more

### Global Components
- [Global Components](./docs/global/en/README.md) | [中文](./docs/global/cn/README.md) - Application-wide components including ToastBoard, DialogBoard, IndicatorBoard, and MessageBoxBoard

### Miscellaneous Components
- [Utility Components](./docs/misc/en/README.md) | [中文](./docs/misc/cn/README.md) - Additional components including Split, Drawer, Tag, and Card

Each component documentation includes:
- API reference with all props and methods
- Advanced usage examples and patterns
- Best practices and styling guides
- Accessibility considerations
- Integration tips

---

For more detailed documentation and examples, please visit our [documentation site](#) or check out the demo components in the `/src/routes/demo` directory.