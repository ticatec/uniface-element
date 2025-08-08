# OptionsSelect Component

Single-selection dropdown component for selecting one value from predefined options.

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | Appearance variant |
| `disabled` | `boolean` | `false` | Whether disabled |
| `readonly` | `boolean` | `false` | Whether read-only |
| `compact` | `boolean` | `false` | Whether compact mode |
| `value` | `any` | `null` | Selected value |
| `options` | `Array<any>` | `[]` | Options array |
| `keyField` | `string` | `'code'` | Value field name |
| `textField` | `string` | `'text'` | Display field name |
| `placeholder` | `string` | `''` | Placeholder text |
| `emptyText` | `string` | `''` | Empty value display text |
| `disableOptions` | `Array<string>` | `[]` | Disabled option values |
| `hideOptions` | `Array<string>` | `[]` | Hidden option values |
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | Display mode |
| `menu$height` | `number` | `0` | Dropdown menu height |
| `style` | `string` | `''` | Custom styles |
| `onChange` | `OnChangeHandler<any>` | - | Value change callback |

## Usage Examples

```svelte
<script lang="ts">
  import OptionsSelect from '@ticatec/uniface-element/OptionsSelect';
  
  // Country options
  const countries = [
    { code: 'US', text: 'United States' },
    { code: 'GB', text: 'United Kingdom' },
    { code: 'CA', text: 'Canada' },
    { code: 'AU', text: 'Australia' },
    { code: 'DE', text: 'Germany' }
  ];
  
  // Status options
  const statuses = [
    { code: 'active', text: 'Active' },
    { code: 'inactive', text: 'Inactive' },
    { code: 'pending', text: 'Pending' },
    { code: 'suspended', text: 'Suspended' }
  ];
  
  let selectedCountry = '';
  let userStatus = 'active';
  
  const handleCountryChange = (value: string) => {
    selectedCountry = value;
    console.log('Selected country:', value);
  };
  
  const handleStatusChange = (value: string) => {
    userStatus = value;
    console.log('User status:', value);
  };
</script>

<!-- Country selection -->
<OptionsSelect 
  placeholder="Please select country"
  options={countries}
  keyField="code"
  textField="text"
  bind:value={selectedCountry}
  onChange={handleCountryChange}
/>

<!-- User status selection (with disabled options) -->
<OptionsSelect 
  placeholder="Please select status"
  options={statuses}
  keyField="code"
  textField="text"
  disableOptions={['suspended']}
  bind:value={userStatus}
  onChange={handleStatusChange}
/>
```