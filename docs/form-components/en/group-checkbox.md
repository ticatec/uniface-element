# GroupCheckBox Component

Checkbox group component that organizes multiple checkbox options together, supporting both bitwise operations and string delimiter value storage modes. Usually used for multi-selection scenarios, more convenient than using multiple individual CheckBox components.

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | Appearance variant |
| `disabled` | `boolean` | `false` | Whether disabled |
| `readonly` | `boolean` | `false` | Whether read-only |
| `compact` | `boolean` | `false` | Whether compact mode |
| `value` | `string \| number` | - | Selected value (string or bit value) |
| `bitBase` | `boolean` | `false` | Whether to use bitwise operation mode |
| `options` | `Array<any>` | - | Options array |
| `keyField` | `string` | `'code'` | Value field name |
| `textField` | `string` | `'text'` | Display field name |
| `delimiter` | `string` | `';'` | Delimiter for string mode |
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | Display mode |
| `item$style` | `string` | `''` | Style for individual checkbox |
| `disabledOptions` | `Array<string>` | `[]` | Disabled option values |
| `hideOptions` | `Array<string>` | `[]` | Hidden option values |
| `style` | `string` | `''` | Custom styles |
| `onChange` | `OnChangeHandler<string \| number>` | - | Value change callback |

## Usage Examples

```svelte
<script lang="ts">
  import GroupCheckBox from '@ticatec/uniface-element/GroupCheckBox';
  
  // Permission options
  const permissions = [
    { code: 'read', text: 'Read Permission' },
    { code: 'write', text: 'Write Permission' },
    { code: 'delete', text: 'Delete Permission' },
    { code: 'admin', text: 'Admin Permission' }
  ];
  
  // Hobby options
  const hobbies = [
    { code: 'sports', text: 'Sports' },
    { code: 'music', text: 'Music' },
    { code: 'reading', text: 'Reading' },
    { code: 'travel', text: 'Travel' },
    { code: 'cooking', text: 'Cooking' }
  ];
  
  let userPermissions = 0; // Using bitwise operations
  let userHobbies = ''; // Using string delimiter
  let userSkills = '';
  
  const handlePermissionChange = (value: number) => {
    userPermissions = value;
    console.log('User permissions (bit value):', value);
    
    // Parse bit value to see specific permissions
    const selectedPermissions = [];
    let bitValue = value;
    let index = 0;
    while (bitValue > 0) {
      if (bitValue & 1) {
        selectedPermissions.push(permissions[index].text);
      }
      bitValue >>= 1;
      index++;
    }
    console.log('Selected permissions:', selectedPermissions);
  };
  
  const handleHobbiesChange = (value: string) => {
    userHobbies = value;
    console.log('User hobbies:', value);
  };
</script>

<!-- Permission selection (bitwise mode) -->
<div class="form-group">
  <label>User Permissions:</label>
  <GroupCheckBox 
    options={permissions}
    keyField="code"
    textField="text"
    bitBase={true}
    bind:value={userPermissions}
    onChange={handlePermissionChange}
  />
</div>

<!-- Hobby selection (string delimiter mode) -->
<div class="form-group">
  <label>Interests:</label>
  <GroupCheckBox 
    options={hobbies}
    keyField="code"
    textField="text"
    delimiter=";"
    bind:value={userHobbies}
    onChange={handleHobbiesChange}
  />
</div>

<!-- Compact mode checkbox group -->
<div class="form-group">
  <label>Skill Tags:</label>
  <GroupCheckBox 
    options={[
      { code: 'js', text: 'JavaScript' },
      { code: 'ts', text: 'TypeScript' },
      { code: 'svelte', text: 'Svelte' },
      { code: 'vue', text: 'Vue.js' }
    ]}
    keyField="code"
    textField="text"
    compact={true}
    item$style="margin-right: 12px;"
    bind:value={userSkills}
  />
</div>
```

## Bitwise Mode Explanation

When `bitBase` is `true`, the component uses bitwise operations to store selection state:
- 1st option: bit value 1 (binary 0001)
- 2nd option: bit value 2 (binary 0010)  
- 3rd option: bit value 4 (binary 0100)
- 4th option: bit value 8 (binary 1000)

When multiple options are selected, bit values are added together. For example, selecting the 1st and 3rd options gives value 1 + 4 = 5.

### Bitwise Utility Functions

```typescript
// Check if contains a specific permission
const hasPermission = (permissions: number, permission: string): boolean => {
  const permissionIndex = permissionList.findIndex(p => p.code === permission);
  return (permissions & (1 << permissionIndex)) !== 0;
};

// Add permission
const addPermission = (permissions: number, permission: string): number => {
  const permissionIndex = permissionList.findIndex(p => p.code === permission);
  return permissions | (1 << permissionIndex);
};

// Remove permission
const removePermission = (permissions: number, permission: string): number => {
  const permissionIndex = permissionList.findIndex(p => p.code === permission);
  return permissions & ~(1 << permissionIndex);
};

// Parse permission list
const parsePermissions = (permissions: number): string[] => {
  const result = [];
  let bitValue = permissions;
  let index = 0;
  while (bitValue > 0) {
    if (bitValue & 1) {
      result.push(permissionList[index].code);
    }
    bitValue >>= 1;
    index++;
  }
  return result;
};
```

## Advanced Usage

### Dynamic Option Loading
```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  
  let options = [];
  let selectedValues = '';
  let loading = true;
  
  onMount(async () => {
    try {
      const response = await fetch('/api/categories');
      options = await response.json();
    } catch (error) {
      console.error('Failed to load options:', error);
    } finally {
      loading = false;
    }
  });
  
  const handleChange = (value: string) => {
    selectedValues = value;
    // Sync to server
    saveUserPreferences(value);
  };
</script>

{#if loading}
  <div class="loading">Loading options...</div>
{:else}
  <GroupCheckBox 
    {options}
    keyField="id"
    textField="name"
    bind:value={selectedValues}
    onChange={handleChange}
  />
{/if}
```

### Conditional Disable and Hide
```svelte
<script lang="ts">
  const features = [
    { code: 'basic', text: 'Basic Features' },
    { code: 'advanced', text: 'Advanced Features' },
    { code: 'premium', text: 'Premium Features' },
    { code: 'enterprise', text: 'Enterprise Features' }
  ];
  
  let userLevel = 'basic'; // basic, premium, enterprise
  let selectedFeatures = '';
  
  // Dynamically set disabled options based on user level
  $: disabledOptions = (() => {
    switch (userLevel) {
      case 'basic':
        return ['advanced', 'premium', 'enterprise'];
      case 'premium':
        return ['enterprise'];
      case 'enterprise':
        return [];
      default:
        return ['advanced', 'premium', 'enterprise'];
    }
  })();
  
  // Hide enterprise features (if not enterprise user)
  $: hideOptions = userLevel !== 'enterprise' ? ['enterprise'] : [];
</script>

<div class="form-group">
  <label>User Level:</label>
  <select bind:value={userLevel}>
    <option value="basic">Basic User</option>
    <option value="premium">Premium User</option>
    <option value="enterprise">Enterprise User</option>
  </select>
</div>

<div class="form-group">
  <label>Available Features:</label>
  <GroupCheckBox 
    options={features}
    keyField="code"
    textField="text"
    {disabledOptions}
    hideOptions={hideOptions}
    bind:value={selectedFeatures}
  />
</div>
```

### Select All/None Functionality
```svelte
<script lang="ts">
  import CheckBox from '@ticatec/uniface-element/Checkbox';
  
  const allOptions = [
    { code: 'option1', text: 'Option 1' },
    { code: 'option2', text: 'Option 2' },
    { code: 'option3', text: 'Option 3' },
    { code: 'option4', text: 'Option 4' }
  ];
  
  let selectedValues = '';
  
  // Check if all selected
  $: isAllSelected = (() => {
    if (!selectedValues) return false;
    const selected = selectedValues.split(';');
    return allOptions.every(option => selected.includes(option.code));
  })();
  
  // Check if partially selected
  $: isIndeterminate = (() => {
    if (!selectedValues) return false;
    const selected = selectedValues.split(';');
    return selected.length > 0 && selected.length < allOptions.length;
  })();
  
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      selectedValues = allOptions.map(opt => opt.code).join(';');
    } else {
      selectedValues = '';
    }
  };
  
  const handleChange = (value: string) => {
    selectedValues = value;
  };
</script>

<div class="select-all-container">
  <CheckBox 
    label="Select All"
    value={isAllSelected}
    indeterminate={isIndeterminate}
    onChange={handleSelectAll}
  />
</div>

<GroupCheckBox 
  options={allOptions}
  keyField="code"
  textField="text"
  bind:value={selectedValues}
  onChange={handleChange}
/>
```

## Style Customization

```css
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

.select-all-container {
  padding: 8px 0;
  border-bottom: 1px solid #e1e5e9;
  margin-bottom: 12px;
}

.loading {
  padding: 20px;
  text-align: center;
  color: #6c757d;
}

/* Custom checkbox group styles */
.custom-checkbox-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
}
```

## Component Advantages

**Advantages over using individual CheckBox components:**

1. **Unified Management**: All related options managed in a single component
2. **Simplified Data Binding**: Only need to bind one value instead of multiple independent values
3. **Style Consistency**: All options have unified styling and spacing
4. **Dynamic Option Management**: Easy to show/hide, enable/disable specific options
5. **Bitwise Support**: Suitable for scenarios requiring bitwise operations like permission systems
6. **Better Semantics**: Clearly expresses the relationship between options

## Best Practices

### 1. Choose Appropriate Storage Mode
```svelte
<!-- Permission system: use bitwise operations -->
<GroupCheckBox bitBase={true} />

<!-- General multi-select: use string delimiter -->
<GroupCheckBox delimiter="," />
```

### 2. Provide Clear Labels
```svelte
<label>Please select your technology interests:</label>
<GroupCheckBox 
  options={techStack}
  placeholder="Select tech stack"
/>
```

### 3. Use Compact Mode Appropriately
```svelte
<!-- Use compact mode when there are many options -->
<GroupCheckBox compact={true} />
```