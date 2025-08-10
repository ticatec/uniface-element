# Button Component System

The Uniface Element Button system provides a comprehensive set of interactive button components for Svelte applications. It includes standard buttons, text buttons, icon buttons, and a flexible action bar component for organizing multiple actions.

## Component Overview

The button system consists of four main components, each with specific purposes and design goals:

### [Button Component](./Button.md)
Full-featured button component with icon and label support, suitable for most interaction scenarios.

**Features:**
- Supports icon + text labels
- Multiple size and style variants
- Complete theme support
- Async operation handling

**Use Cases:** Primary actions, form submissions, dialog confirmations

### [TextButton Component](./TextButton.md)
Lightweight component optimized for text-only buttons with minimal styling.

**Features:**
- Text-only display
- Minimal visual styling
- Fast loading and rendering
- Support for custom content slots

**Use Cases:** Navigation links, inline actions, dialog cancel buttons

### [IconButton Component](./IconButton.md)
Icon-only button component designed for compact interfaces.

**Features:**
- Icon-only display
- Compact space usage
- Multiple icon library support
- Adaptive sizing

**Use Cases:** Toolbars, data table actions, card actions

### [ActionBar Component](./ActionBar.md)
Container component for organizing and managing multiple button actions.

**Features:**
- Unified button layout management
- Automatic spacing and alignment
- Separator support
- Responsive layout

**Use Cases:** Form action bars, dialog footers, toolbar layouts

## Architecture Diagram

```mermaid
graph TD
    A[ActionBar Container] --> B[Button Components]
    B --> C[Button Standard]
    B --> D[TextButton Text-only]
    B --> E[IconButton Icon-only]
    F[ButtonAction Config] --> A
    G[ButtonType Styling] --> B
    H[MouseClickHandler Events] --> B
```

## Quick Start

### Installation and Import

```typescript
// Import required components
import Button from '@ticatec/uniface-element/Button';
import TextButton from '@ticatec/uniface-element/TextButton';
import IconButton from '@ticatec/uniface-element/IconButton';
import ActionBar from '@ticatec/uniface-element/ActionBar';
import type { ButtonActions } from '@ticatec/uniface-element';
```

### Basic Examples

```svelte
<script lang="ts">
  import Button from '@ticatec/uniface-element/Button';
  import TextButton from '@ticatec/uniface-element/TextButton';
  import IconButton from '@ticatec/uniface-element/IconButton';
  import ActionBar from '@ticatec/uniface-element/ActionBar';
  import type { ButtonActions } from '@ticatec/uniface-element';
  
  const handleSave = async () => {
    // Save operation
  };
  
  const actions: ButtonActions = [
    { label: "Cancel", type: "secondary", handler: async () => {} },
    { label: "Save", type: "primary", handler: handleSave }
  ];
</script>

<!-- Standard button -->
<Button label="Save" type="primary" icon="icon_google_save" onClick={handleSave} />

<!-- Text button -->
<TextButton label="Cancel" type="secondary" onClick={async () => {}} />

<!-- Icon button -->
<IconButton icon="icon_google_edit" type="primary" onClick={async () => {}} />

<!-- Action bar -->
<ActionBar buttons={actions} />
```

## Button Types & Styling

### ButtonType Options

```typescript
type ButtonType = 'default' | 'primary' | 'secondary' | 'third' | 'forth';
```

### Visual Appearance

- **default**: Standard neutral button appearance
- **primary**: Emphasizes primary actions (typically blue)
- **secondary**: Secondary actions button (typically gray)
- **third**: Alternative style (typically for warnings/caution)
- **forth**: Additional style variant

### Size Variants

- **big**: Large button size for prominent actions
- **medium**: Standard button size for most use cases
- **mini**: Small button size for compact interfaces

### Style Variants (Button only)

- **plain**: Minimalist style variant
- **round**: Rounded corner variant
- **'' (empty string)**: Standard styling

## API Reference

### ButtonAction Interface

```typescript
interface ButtonAction {
  /** Button label text */
  label: string;
  
  /** Whether button is disabled */
  disabled?: boolean;
  
  /** Icon class (e.g., Google Material Icons) */
  icon?: string;
  
  /** Button type for styling */
  type?: ButtonType;
  
  /** Click event handler */
  handler?: MouseClickHandler;
}

type ButtonActions = Array<ButtonAction | null>;
```

### MouseClickHandler Type

```typescript
type MouseClickHandler = (event: MouseEvent) => Promise<void>;
```

### Click Throttling

All button components implement automatic click throttling with a 500ms cooldown to prevent accidental double-clicks and ensure proper async operation handling.

### Icon Usage

Components use `@ticatec/uniface-google-material-icons` as the icon library. Simply pass the icon class name:

```svelte
<!-- Common Material Icons -->
<Button icon="icon_google_save" label="Save" />
<Button icon="icon_google_edit" label="Edit" />
<Button icon="icon_google_delete" label="Delete" />
<Button icon="icon_google_add" label="Add" />
<Button icon="icon_google_remove" label="Remove" />
<Button icon="icon_google_search" label="Search" />
<Button icon="icon_google_settings" label="Settings" />
<Button icon="icon_google_home" label="Home" />
<Button icon="icon_google_check" label="Confirm" />
<Button icon="icon_google_arrow_back" label="Back" />
```

## Usage Examples

### Dialog Actions

```svelte
<script lang="ts">
  import ActionBar from '@ticatec/uniface-element/ActionBar';
  import type { ButtonActions } from '@ticatec/uniface-element';
  
  export let onSave: () => Promise<void>;
  export let onCancel: () => void;
  
  const dialogActions: ButtonActions = [
    {
      label: "Cancel",
      type: "secondary",
      handler: async () => {
        onCancel();
      }
    },
    {
      label: "Save Changes",
      type: "primary",
      icon: "icon_google_save",
      handler: async () => {
        await onSave();
      }
    }
  ];
</script>

<div class="dialog-footer">
  <ActionBar buttons={dialogActions} style="justify-content: flex-end;" />
</div>
```

### Data Table Actions

```svelte
<script lang="ts">
  import IconButton from '@ticatec/uniface-element/IconButton';
  
  export let item: any;
  export let onEdit: (item: any) => Promise<void>;
  export let onDelete: (item: any) => Promise<void>;
  export let onView: (item: any) => Promise<void>;
</script>

<div class="table-actions">
  <IconButton 
    icon="icon_google_visibility" 
    type="default" 
    onClick={async () => await onView(item)} 
  />
  <IconButton 
    icon="icon_google_edit" 
    type="primary" 
    onClick={async () => await onEdit(item)} 
  />
  <IconButton 
    icon="icon_google_delete" 
    type="third" 
    onClick={async () => await onDelete(item)} 
  />
</div>

<style>
  .table-actions {
    display: flex;
    gap: 4px;
  }
</style>
```

### Form Buttons

```svelte
<script lang="ts">
  import Button from '@ticatec/uniface-element/Button';
  import TextButton from '@ticatec/uniface-element/TextButton';
  
  let formData = {};
  let isSubmitting = false;
  let isDraft = false;
  
  const handleSubmit = async () => {
    isSubmitting = true;
    try {
      await submitForm(formData);
    } finally {
      isSubmitting = false;
    }
  };
  
  const handleSaveDraft = async () => {
    isDraft = true;
    try {
      await saveDraft(formData);
    } finally {
      isDraft = false;
    }
  };
  
  const handleReset = async () => {
    formData = {};
  };
</script>

<form>
  <!-- Form fields here -->
  
  <div class="form-actions">
    <TextButton 
      label="Reset" 
      type="default" 
      onClick={handleReset} 
    />
    
    <Button 
      label={isDraft ? "Saving..." : "Save Draft"}
      type="secondary"
      icon="icon_google_save"
      disabled={isDraft}
      onClick={handleSaveDraft}
    />
    
    <Button 
      label={isSubmitting ? "Submitting..." : "Submit"}
      type="primary"
      icon="icon_google_send"
      disabled={isSubmitting}
      onClick={handleSubmit}
    />
  </div>
</form>

<style>
  .form-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    margin-top: 24px;
  }
</style>
```

### Toolbar Implementation

```svelte
<script lang="ts">
  import ActionBar from '@ticatec/uniface-element/ActionBar';
  import type { ButtonActions } from '@ticatec/uniface-element';
  
  let selectedItems = [];
  
  const toolbarActions: ButtonActions = [
    {
      label: "Select All",
      icon: "icon_google_check_box",
      type: "default",
      handler: async () => {
        selectAll();
      }
    },
    null, // Separator
    {
      label: "Export",
      icon: "icon_google_download",
      type: "secondary",
      disabled: selectedItems.length === 0,
      handler: async () => {
        await exportItems(selectedItems);
      }
    },
    {
      label: "Delete Selected",
      icon: "icon_google_delete",
      type: "third",
      disabled: selectedItems.length === 0,
      handler: async () => {
        if (confirm(`Delete ${selectedItems.length} items?`)) {
          await deleteItems(selectedItems);
        }
      }
    }
  ];
</script>

<div class="toolbar">
  <div class="toolbar-info">
    {selectedItems.length} items selected
  </div>
  <ActionBar buttons={toolbarActions} />
</div>

<style>
  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    border-bottom: 1px solid #eee;
  }
  
  .toolbar-info {
    color: #666;
    font-size: 14px;
  }
</style>
```

## Best Practices

### 1. Use Appropriate Button Types

Choose the correct button type based on action importance:

```svelte
<!-- Primary actions -->
<Button label="Save" type="primary" />
<Button label="Submit" type="primary" />

<!-- Secondary actions -->
<Button label="Cancel" type="secondary" />
<Button label="Preview" type="secondary" />

<!-- Dangerous actions -->
<Button label="Delete" type="third" />
<Button label="Remove" type="third" />
```

### 2. Handle Async Operations Properly

Always handle loading states and errors:

```svelte
<script lang="ts">
  let isLoading = false;
  let error = null;
  
  const handleAction = async () => {
    isLoading = true;
    error = null;
    
    try {
      await performAction();
    } catch (err) {
      error = err.message;
    } finally {
      isLoading = false;
    }
  };
</script>

<Button 
  label={isLoading ? "Processing..." : "Start Process"}
  type="primary"
  disabled={isLoading}
  onClick={handleAction}
/>

{#if error}
  <div class="error">{error}</div>
{/if}
```

### 3. Use ActionBar to Group Related Actions

Group related actions together:

```svelte
<script lang="ts">
  const dialogActions = [
    { label: "Cancel", type: "secondary", handler: cancel },
    { label: "Apply", type: "primary", handler: apply }
  ];
  
  const editActions = [
    { label: "Undo", icon: "icon_google_undo", handler: undo },
    { label: "Redo", icon: "icon_google_redo", handler: redo },
    null, // Separator
    { label: "Save", type: "primary", handler: save }
  ];
</script>
```

### 4. Provide Visual Feedback

Use icons and appropriate styling:

```svelte
<!-- Success actions -->
<Button label="Save" icon="icon_google_save" type="primary" />

<!-- Dangerous actions -->
<Button label="Delete" icon="icon_google_delete" type="third" />

<!-- Navigation actions -->
<Button label="Back" icon="icon_google_arrow_back" type="secondary" />
```

### 5. Consider Mobile Responsiveness

Use appropriate sizes for different screen sizes:

```svelte
<div class="responsive-buttons">
  <!-- Desktop: normal size, Mobile: larger for touch -->
  <Button label="Action" size="big" class="mobile-friendly" />
</div>

<style>
  .responsive-buttons .mobile-friendly {
    /* Responsive styles */
  }
  
  @media (max-width: 768px) {
    .responsive-buttons .mobile-friendly {
      min-height: 44px; /* iOS recommended touch target size */
    }
  }
</style>
```

## Accessibility

### Current Limitations

**⚠️ Important Note**: The current button components have the following accessibility limitations:

- **Non-semantic elements**: All buttons use `<div>` elements instead of `<button>`
- **Hidden from screen readers**: All buttons have `aria-hidden="true"` by default
- **No keyboard navigation**: Components don't support Tab navigation or Enter/Space activation
- **No focus management**: Components don't provide focus method or support `bind:this`
- **No ARIA attribute support**: Custom aria-* attributes cannot be passed

### Better Accessibility Suggestions

For production applications requiring full accessibility compliance, consider:

1. **Wrap components in proper button elements**:
```svelte
<button 
  class="custom-button-wrapper"
  disabled={disabled}
  aria-label="Edit user profile"
  on:click={handleClick}
>
  <IconButton 
    icon="icon_google_edit"
    onClick={() => {}} // Handle through external button
  />
</button>
```

2. **Add keyboard event handlers**:
```svelte
<script>
  const handleKeydown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e);
    }
  };
</script>

<div 
  class="accessible-button" 
  role="button" 
  tabindex="0"
  aria-label="Action description"
  on:click={handleClick}
  on:keydown={handleKeydown}
>
  <Button onClick={() => {}} label="Action" />
</div>
```

3. **Programmatically manage focus**:
```svelte
<script>
  let buttonElement;
  
  const focusButton = () => {
    buttonElement?.focus();
  };
</script>

<div 
  bind:this={buttonElement}
  class="focusable-wrapper"
  tabindex="0"
  role="button"
  on:click={handleAction}
>
  <Button onClick={() => {}} label="Focusable Action" />
</div>
```

### Future Improvements Needed

To make these components fully accessible, the following changes are recommended:

- Replace `<div>` with `<button>` elements
- Remove `aria-hidden="true"` and allow ARIA attribute customization
- Add keyboard event handling
- Support focus management with `bind:this`
- Add proper semantic roles and states