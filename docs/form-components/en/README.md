# Uniface Form Components Documentation

This is the English documentation for Uniface form components, covering all available form input and selection components.

## Component Overview

### Basic Input Components
- [TextEditor](text-editor.md) - Text input field
- [NumberEditor](number-editor.md) - Number input field
- [TimeEditor](time-editor.md) - Time input field
- [UnitNumberEditor](unit-number-editor.md) - Number input with units
- [PromptsTextEditor](prompts-text-editor.md) - Text input with prompts

### Selection Components
- [CheckBox](checkbox.md) - Checkbox
- [RadioButton](radiobutton.md) - Radio button
- [GroupCheckBox](group-checkbox.md) - Checkbox group
- [GroupRadioBox](group-radiobox.md) - Radio button group
- [Switch](switch.md) - Toggle switch
- [OptionsSelect](options-select.md) - Options selector
- [OptionsMultiSelect](options-multi-select.md) - Multi-select selector
- [InputOptionsSelect](input-options-select.md) - Input options selector
- [LookupEditor](lookup-editor.md) - Lookup editor
- [CascadeOptionsSelect](cascade-options-select.md) - Cascade selector

### Date/Time Components
- [DatePicker](date-picker.md) - Date picker
- [DateTimePicker](datetime-picker.md) - Date/time picker

## Architecture Overview

### Core Wrapper Components
All form components are based on two core wrapper components:
- **CommonEditor** - Provides unified styling and behavior for input components
- **CommonPicker** - Provides dropdown panel functionality for selection components

### Display Modes
All components support the `DisplayMode` enum:
```typescript
enum DisplayMode {
  Edit = 0,    // Edit mode (default)
  View = 1,    // View mode
  Display = 2  // Display mode
}
```

### Common Properties
Most components share these properties:
- `variant: '' | 'plain' | 'outlined' | 'filled'` - Appearance variant
- `disabled: boolean` - Whether disabled
- `readonly: boolean` - Whether read-only
- `compact: boolean` - Whether compact mode
- `style: string` - Custom CSS styles
- `displayMode: DisplayMode` - Display mode

## Styling and Theming

### CSS Custom Properties

All components support theme customization through CSS custom properties:

```css
:root {
  /* Colors */
  --uniface-primary-color: #007bff;
  --uniface-secondary-color: #6c757d;
  --uniface-success-color: #28a745;
  --uniface-danger-color: #dc3545;
  --uniface-warning-color: #ffc107;
  --uniface-info-color: #17a2b8;
  --uniface-light-color: #f8f9fa;
  --uniface-dark-color: #343a40;
  
  /* Borders */
  --uniface-border-color: #dee2e6;
  --uniface-border-radius: 4px;
  --uniface-border-width: 1px;
  
  /* Spacing */
  --uniface-padding-sm: 4px 8px;
  --uniface-padding-md: 8px 12px;
  --uniface-padding-lg: 12px 16px;
  
  /* Typography */
  --uniface-font-size-sm: 12px;
  --uniface-font-size-md: 14px;
  --uniface-font-size-lg: 16px;
  
  /* Shadows */
  --uniface-box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  --uniface-box-shadow-hover: 0 4px 8px rgba(0,0,0,0.15);
}
```

### Variant Styles

#### Plain Variant
```css
.uniface-editor.plain {
  border: none;
  background: transparent;
}
```

#### Outlined Variant
```css
.uniface-editor.outlined {
  border: 1px solid var(--uniface-border-color);
  background: white;
}
```

#### Filled Variant
```css
.uniface-editor.filled {
  border: none;
  background: var(--uniface-light-color);
}
```

### Compact Mode
```css
.uniface-editor.compact {
  padding: var(--uniface-padding-sm);
  font-size: var(--uniface-font-size-sm);
}
```

## Icon Usage

All components use the `@ticatec/uniface-google-material-icons` icon library, which is a wrapper for Google Material Icons.

### Common Icons

| Icon Class | Description | Usage |
|------------|-------------|-------|
| `icon_google_add` | Add | Add buttons, create operations |
| `icon_google_edit` | Edit | Edit buttons, modify operations |
| `icon_google_delete` | Delete | Delete buttons, remove operations |
| `icon_google_search` | Search | Search boxes, find functionality |
| `icon_google_clear` | Clear | Clear inputs, reset operations |
| `icon_google_arrow_drop_down` | Dropdown arrow | Dropdown select components |
| `icon_google_arrow_drop_up` | Collapse arrow | Collapse dropdown panels |
| `icon_google_check` | Check | Checkboxes, confirm operations |
| `icon_google_close` | Close | Close buttons, cancel operations |
| `icon_google_calendar_today` | Calendar | Date pickers |
| `icon_google_access_time` | Time | Time pickers |
| `icon_google_keyboard_arrow_down` | Keyboard arrow down | Cascade select components |
| `icon_google_keyboard_control` | Control key | Lookup editors |

### Icon Usage Examples

```svelte
<!-- Direct usage in HTML -->
<i class="icon_google_search"></i>

<!-- Usage in component properties -->
<Button icon="icon_google_add" label="Add User" />

<!-- Usage in CSS -->
<style>
  .custom-icon::before {
    content: '';
    @extend .icon_google_settings;
  }
</style>
```

## Internationalization Support

### Using @ticatec/i18n

```svelte
<script lang="ts">
  import i18n from '@ticatec/i18n';
  
  // Get localized text
  const getText = (key: string, defaultText: string) => {
    return i18n.getText(key, defaultText);
  };
</script>

<TextEditor 
  placeholder={getText('uniface.editor.placeholder', 'Please enter content')}
/>

<Button 
  label={getText('uniface.button.save', 'Save')}
/>
```

### Common Internationalization Keys

| Key | English | Chinese |
|-----|---------|---------|
| `uniface.button.save` | Save | 保存 |
| `uniface.button.cancel` | Cancel | 取消 |
| `uniface.button.delete` | Delete | 删除 |
| `uniface.button.edit` | Edit | 编辑 |
| `uniface.loadMore` | Load more | 加载更多 |
| `uniface.noData` | No data | 暂无数据 |
| `uniface.loading` | Loading... | 加载中... |
| `uniface.error.required` | This field is required | 此字段为必填项 |
| `uniface.error.invalid` | Invalid input format | 输入格式无效 |

## Best Practices

### 1. Responsive Design
```svelte
<style>
  .form-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;
  }
  
  @media (max-width: 768px) {
    .form-container {
      grid-template-columns: 1fr;
    }
  }
</style>
```

### 2. Accessibility
```svelte
<!-- Add labels for each form field -->
<label for="username">Username:</label>
<TextEditor id="username" placeholder="Enter username" />

<!-- Add descriptions for select components -->
<OptionsSelect 
  aria-describedby="country-description"
  placeholder="Select country"
  options={countries}
/>
<div id="country-description" class="form-help">
  Please select your country or region
</div>
```

### 3. Performance Optimization
```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  
  // Lazy load large option datasets
  onMount(async () => {
    const response = await fetch('/api/options');
    options = await response.json();
  });
  
  // Use debouncing for search
  let searchTimeout: number;
  const handleSearch = (keyword: string) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      performSearch(keyword);
    }, 300);
  };
</script>
```

### 4. Error Handling
```svelte
<script lang="ts">
  let loading = false;
  let error: string | null = null;
  
  const handleAsyncOperation = async () => {
    loading = true;
    error = null;
    
    try {
      await performOperation();
    } catch (err) {
      error = err.message;
      console.error('Operation failed:', err);
    } finally {
      loading = false;
    }
  };
</script>

{#if error}
  <div class="error-alert">
    <i class="icon_google_error"></i>
    {error}
  </div>
{/if}
```

## Form Validation Example

```svelte
<script lang="ts">
  import TextEditor from '@ticatec/uniface-element/TextEditor';
  import NumberEditor from '@ticatec/uniface-element/NumberEditor';
  import CheckBox from '@ticatec/uniface-element/Checkbox';
  
  let formData = {
    name: '',
    email: '',
    age: null as number | null,
    agreed: false
  };
  
  let errors: Record<string, string> = {};
  
  // Validation rules
  const validators = {
    name: (value: string) => {
      if (!value || value.trim().length === 0) {
        return 'Name cannot be empty';
      }
      if (value.length < 2) {
        return 'Name must be at least 2 characters';
      }
      return null;
    },
    email: (value: string) => {
      if (!value) return 'Email cannot be empty';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
      return null;
    },
    age: (value: number | null) => {
      if (value === null) return 'Age cannot be empty';
      if (value < 18) return 'Age must be at least 18';
      if (value > 120) return 'Please enter a valid age';
      return null;
    },
    agreed: (value: boolean) => {
      if (!value) return 'Please agree to the terms';
      return null;
    }
  };
  
  // Validate single field
  const validateField = (field: string, value: any) => {
    const error = validators[field]?.(value);
    if (error) {
      errors[field] = error;
    } else {
      delete errors[field];
    }
    errors = { ...errors };
  };
  
  // Validate entire form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    Object.keys(validators).forEach(field => {
      const error = validators[field](formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });
    errors = newErrors;
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form submitted successfully', formData);
    } else {
      console.log('Form validation failed', errors);
    }
  };
</script>

<form on:submit|preventDefault={handleSubmit}>
  <!-- Name input -->
  <div class="form-field">
    <TextEditor 
      placeholder="Enter your name"
      bind:value={formData.name}
      onChange={(value) => validateField('name', value)}
    />
    {#if errors.name}
      <div class="error-message">{errors.name}</div>
    {/if}
  </div>
  
  <!-- Email input -->
  <div class="form-field">
    <TextEditor 
      placeholder="Enter your email"
      bind:value={formData.email}
      onChange={(value) => validateField('email', value)}
    />
    {#if errors.email}
      <div class="error-message">{errors.email}</div>
    {/if}
  </div>
  
  <!-- Age input -->
  <div class="form-field">
    <NumberEditor 
      placeholder="Enter your age"
      min={1}
      max={120}
      bind:value={formData.age}
      onChange={(value) => validateField('age', value)}
    />
    {#if errors.age}
      <div class="error-message">{errors.age}</div>
    {/if}
  </div>
  
  <!-- Agreement checkbox -->
  <div class="form-field">
    <CheckBox 
      label="I agree to the Terms of Service and Privacy Policy"
      bind:value={formData.agreed}
      onChange={(value) => validateField('agreed', value)}
    />
    {#if errors.agreed}
      <div class="error-message">{errors.agreed}</div>
    {/if}
  </div>
  
  <button type="submit" disabled={Object.keys(errors).length > 0}>
    Submit Form
  </button>
</form>

<style>
  .form-field {
    margin-bottom: 16px;
  }
  
  .error-message {
    color: var(--uniface-danger-color);
    font-size: 12px;
    margin-top: 4px;
  }
  
  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
```

---

## Summary

This documentation covers the complete API and usage of the Uniface form component library. Each component follows unified design principles and interaction patterns, ensuring excellent user and developer experience.

Key features:
- 🎨 Unified visual design and user experience
- 🔧 TypeScript support with complete type definitions
- 🌍 Internationalization support
- ♿ Accessibility considerations
- 📱 Responsive design
- 🎯 High-performance implementation
- 🔌 Flexible extension mechanisms

For more information or if you encounter issues, please refer to the relevant component source code or contact the development team.