# CheckBox Component

Checkbox component for boolean value input.

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | Appearance variant |
| `disabled` | `boolean` | `false` | Whether disabled |
| `readonly` | `boolean` | `false` | Whether read-only |
| `value` | `boolean` | `false` | Checked state |
| `label` | `string` | `''` | Label text |
| `indeterminate` | `boolean` | `false` | Whether in indeterminate state |
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | Display mode |
| `style` | `string` | `''` | Custom styles |
| `onChange` | `OnChangeHandler<boolean>` | - | Value change callback |

## Usage Examples

```svelte
<script lang="ts">
  import { CheckBox } from '@ticatec/uniface-element';
  
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