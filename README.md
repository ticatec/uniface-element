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
  import { Button, DataTable, Dialog } from '@ticatec/uniface-element';
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

### Data Table with Inline Editing

```svelte
<script lang="ts">
  import { DataTable, InlineCellEditor } from '@ticatec/uniface-element';
  import type { DataColumn } from '@ticatec/uniface-element';
  
  let columns: DataColumn[] = [
    {
      field: 'name',
      title: 'Name',
      width: 200,
      editable: true,
      editor: 'text'
    },
    {
      field: 'status',
      title: 'Status',
      width: 120,
      editable: true,
      editor: 'select',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' }
      ]
    }
  ];
</script>

<DataTable {columns} {list} bind:selectedRows />
```

### Dialog with Form

```svelte
<script lang="ts">
  import { Dialog, Button, TextEditor, FormField } from '@ticatec/uniface-element';
  
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

```typescript
import { i18n } from '@ticatec/uniface-element/i18n_resources';

// Set language
i18n.setLanguage('en'); // or 'zh-CN'
```

## Available Imports

### Modular Imports
```typescript
// Individual component imports
import Button from '@ticatec/uniface-element/Button';
import { DataTable } from '@ticatec/uniface-element/DataTable';
import { SidebarLayout } from '@ticatec/uniface-element/app-layout/SidebarLayout';

// Utility imports
import { utils } from '@ticatec/uniface-element/utils';
import type { DataColumn } from '@ticatec/uniface-element/types';
```

### Barrel Imports
```typescript
// Import multiple components
import { Button, DataTable, Dialog, Card } from '@ticatec/uniface-element';
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

### Form Components
- [MemoEditor](./docs/form-components/en/memoeditor.md) | [中文](./docs/form-components/cn/memoeditor.md) - Multi-line text editor with character counting and resize options
- [PasswordEditor](./docs/form-components/en/passwordeditor.md) | [中文](./docs/form-components/cn/passwordeditor.md) - Secure password input with visibility toggle

### Navigation Components
- [ProgressBar](./docs/navigation/en/progressbar.md) | [中文](./docs/navigation/cn/progressbar.md) - Circular and linear progress indicators
- [ProgressStepBar](./docs/navigation/en/progressstepbar.md) | [中文](./docs/navigation/cn/progressstepbar.md) - Multi-step process visualization
- [Navigator](./docs/navigation/en/navigator.md) | [中文](./docs/navigation/cn/navigator.md) - Interactive navigation lists
- [Breadcrumb](./docs/navigation/en/breadcrumb.md) | [中文](./docs/navigation/cn/breadcrumb.md) - Hierarchical navigation
- [NavigatorMenu](./docs/navigation/en/navigatormenu.md) | [中文](./docs/navigation/cn/navigatormenu.md) - Tree-like hierarchical menu

### Search and Filter Components
- [SearchBox](./docs/search-filters/en/searchbox.md) | [中文](./docs/search-filters/cn/searchbox.md) - Quick search input
- [NumberRange](./docs/search-filters/en/numberrange.md) | [中文](./docs/search-filters/cn/numberrange.md) - Numeric range filter
- [DateRange](./docs/search-filters/en/daterange.md) | [中文](./docs/search-filters/cn/daterange.md) - Date range picker

Each component documentation includes:
- API reference with all props and methods
- Advanced usage examples and patterns
- Best practices and styling guides
- Accessibility considerations
- Integration tips

---

For more detailed documentation and examples, please visit our [documentation site](#) or check out the demo components in the `/src/routes/demo` directory.