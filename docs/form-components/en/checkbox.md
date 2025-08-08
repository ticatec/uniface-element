# CheckBox Component

Checkbox component for boolean value input.

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | `string \| null` | `null` | Label text |
| `readonly` | `boolean` | `false` | Whether read-only |
| `disabled` | `boolean` | `false` | Whether disabled |
| `value` | `boolean` | `false` | Checked state |
| `indeterminate` | `boolean` | `false` | Whether in indeterminate state |
| `style` | `string` | `''` | Custom styles |
| `compact` | `boolean` | `false` | Compact layout |
| `onClick` | `(event: MouseEvent) => void \| null` | `null` | Click event handler |
| `onChange` | `OnChangeHandler<boolean>` | - | Value change callback |
| `autoFocus` | `boolean` | `false` | Auto focus on mount |

## Usage Examples

```svelte
<script lang="ts">
  import CheckBox from '@ticatec/uniface-element/Checkbox';
  
  let agreeTerms = false;
  let enableNotifications = true;
  let partialSelection = false;
  
  const handleAgreeChange = (checked: boolean) => {
    agreeTerms = checked;
  };
  
  const handleNotificationChange = (checked: boolean) => {
    enableNotifications = checked;
  };
</script>

<!-- Terms agreement -->
<CheckBox 
  label="I agree to the Terms of Service and Privacy Policy"
  bind:value={agreeTerms}
  onChange={handleAgreeChange}
/>

<!-- Notification settings -->
<CheckBox 
  label="Enable email notifications"
  bind:value={enableNotifications}
  onChange={handleNotificationChange}
/>

<!-- Indeterminate state checkbox -->
<CheckBox 
  label="Partial selection state"
  indeterminate={true}
  bind:value={partialSelection}
/>
```