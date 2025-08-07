# TextEditor Component

Basic text input component supporting single-line and multi-line text input.

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | Appearance variant |
| `disabled` | `boolean` | `false` | Whether disabled |
| `readonly` | `boolean` | `false` | Whether read-only |
| `compact` | `boolean` | `false` | Whether compact mode |
| `value` | `string` | `''` | Input value |
| `placeholder` | `string` | `''` | Placeholder text |
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | Display mode |
| `multiline` | `boolean` | `false` | Whether multiline input |
| `rows` | `number` | `3` | Number of rows in multiline mode |
| `maxLength` | `number \| null` | `null` | Maximum character length |
| `style` | `string` | `''` | Custom styles |
| `onChange` | `OnChangeHandler<string>` | - | Value change callback |

## Events

- `onChange(value: string)` - Triggered when input value changes

## Usage Examples

```svelte
<script lang="ts">
  import { TextEditor } from '@ticatec/uniface-element';
  
  let inputValue = '';
  
  const handleChange = (value: string) => {
    console.log('Input value:', value);
    inputValue = value;
  };
</script>

<!-- Basic single-line input -->
<TextEditor 
  placeholder="Enter text"
  {onChange}
  bind:value={inputValue}
/>

<!-- Multi-line text input -->
<TextEditor 
  multiline={true}
  rows={5}
  placeholder="Enter multi-line text"
  {onChange}
  bind:value={inputValue}
/>

<!-- Input with character limit -->
<TextEditor 
  maxLength={100}
  placeholder="Maximum 100 characters"
  {onChange}
  bind:value={inputValue}
/>
```

## Best Practices

### Form Validation
```svelte
<script lang="ts">
  let value = '';
  let error = '';
  
  const validate = (inputValue: string) => {
    if (!inputValue || inputValue.trim().length === 0) {
      error = 'This field cannot be empty';
    } else if (inputValue.length < 3) {
      error = 'At least 3 characters required';
    } else {
      error = '';
    }
  };
  
  const handleChange = (newValue: string) => {
    value = newValue;
    validate(newValue);
  };
</script>

<TextEditor 
  placeholder="Enter content"
  bind:value={value}
  onChange={handleChange}
/>
{#if error}
  <div class="error-message">{error}</div>
{/if}
```

### Multi-line Text Editor
```svelte
<script lang="ts">
  let description = '';
</script>

<TextEditor 
  multiline={true}
  rows={6}
  placeholder="Enter description..."
  bind:value={description}
  maxLength={500}
/>
<div class="char-count">{description.length}/500</div>
```

## Style Customization

```css
/* Custom styles */
.custom-text-editor {
  border-radius: 8px;
  border: 2px solid #e1e5e9;
  font-family: 'Inter', sans-serif;
}

.custom-text-editor:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}
```

## Accessibility

```svelte
<label for="user-name">User Name:</label>
<TextEditor 
  id="user-name"
  placeholder="Enter user name"
  aria-describedby="name-help"
  bind:value={userName}
/>
<div id="name-help" class="form-help">
  User name will be displayed in the system, real name recommended
</div>
```