# OptionsMultiSelect Component

Multi-selection dropdown component that allows selecting multiple values from options, displaying them as tags.

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | Appearance variant |
| `disabled` | `boolean` | `false` | Whether disabled |
| `readonly` | `boolean` | `false` | Whether read-only |
| `compact` | `boolean` | `false` | Whether compact mode |
| `value` | `string` | `''` | Selected values (joined by delimiter) |
| `delimiter` | `string` | `';'` | Value delimiter |
| `options` | `Array<any>` | `[]` | Options array |
| `keyField` | `string` | `'code'` | Value field name |
| `textField` | `string` | `'text'` | Display field name |
| `placeholder` | `string` | `''` | Placeholder text |
| `emptyText` | `string` | `''` | Empty value display text |
| `disableOptions` | `Array<string>` | `[]` | Disabled option values |
| `hideOptions` | `Array<string>` | `[]` | Hidden option values |
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | Display mode |
| `menu$height` | `number` | `0` | Dropdown menu height |
| `tagColor` | `string` | `''` | Tag color |
| `tagVariant` | `'borderless' \| 'border' \| 'round'` | `'border'` | Tag style |
| `style` | `string` | `''` | Custom styles |
| `onChange` | `OnChangeHandler<Array<string>>` | - | Value change callback |

## Usage Examples

```svelte
<script lang="ts">
  import { OptionsMultiSelect } from '@ticatec/uniface-element';
  
  interface Option {
    code: string;
    text: string;
  }
  
  // Skill options
  const skills: Option[] = [
    { code: 'js', text: 'JavaScript' },
    { code: 'ts', text: 'TypeScript' },
    { code: 'svelte', text: 'Svelte' },
    { code: 'vue', text: 'Vue.js' },
    { code: 'react', text: 'React' },
    { code: 'node', text: 'Node.js' },
    { code: 'python', text: 'Python' },
    { code: 'java', text: 'Java' }
  ];
  
  // Hobby options
  const hobbies: Option[] = [
    { code: 'reading', text: 'Reading' },
    { code: 'music', text: 'Music' },
    { code: 'sports', text: 'Sports' },
    { code: 'travel', text: 'Travel' },
    { code: 'photography', text: 'Photography' },
    { code: 'cooking', text: 'Cooking' }
  ];
  
  let selectedSkills: string = '';
  let selectedHobbies: string = '';
  
  const handleSkillsChange = (values: string[]): void => {
    console.log('Selected skills:', values);
  };
  
  const handleHobbiesChange = (values: string[]): void => {
    console.log('Selected hobbies:', values);
  };
</script>

<!-- Skills multi-select -->
<OptionsMultiSelect 
  placeholder="Please select your skills"
  options={skills}
  keyField="code"
  textField="text"
  bind:value={selectedSkills}
  onChange={handleSkillsChange}
/>

<!-- Hobbies multi-select (round tags) -->
<OptionsMultiSelect 
  placeholder="Please select your hobbies"
  options={hobbies}
  keyField="code"
  textField="text"
  tagVariant="round"
  tagColor="#007bff"
  bind:value={selectedHobbies}
  onChange={handleHobbiesChange}
/>
```

## Advanced Usage

### Dynamic Options Management
```svelte
<script lang="ts">
  interface Category {
    id: string;
    name: string;
    parent_id: string | null;
  }
  
  let selectedCategories: string = '';
  let availableCategories: Category[] = [];
  let userLevel: 'basic' | 'premium' | 'admin' = 'basic';
  
  // Filter available categories based on user level
  $: filteredCategories = availableCategories.filter(cat => {
    if (userLevel === 'basic') {
      return cat.parent_id === null; // Only show top-level categories
    } else if (userLevel === 'premium') {
      return true; // Show all categories
    } else {
      return true; // Admin sees all categories
    }
  });
  
  // Set disabled options based on user level
  $: disabledOptions = userLevel === 'basic' 
    ? availableCategories.filter(cat => cat.parent_id !== null).map(cat => cat.id)
    : [];
</script>

<OptionsMultiSelect 
  placeholder="Please select categories"
  options={filteredCategories}
  keyField="id"
  textField="name"
  {disabledOptions}
  bind:value={selectedCategories}
/>
```

## Best Practices

### 1. Limit Selection Count
```svelte
<script lang="ts">
  let selectedTags: string = '';
  let maxTags: number = 5;
  let tagError: string = '';
  
  const handleTagsChange = (values: string[]): void => {
    if (values.length > maxTags) {
      tagError = `Maximum ${maxTags} tags allowed`;
      // Keep only first maxTags items
      selectedTags = values.slice(0, maxTags).join(';');
    } else {
      tagError = '';
    }
  };
</script>

<OptionsMultiSelect 
  options={tagOptions}
  bind:value={selectedTags}
  onChange={handleTagsChange}
/>
{#if tagError}
  <div class="error-message">{tagError}</div>
{/if}
```

### 2. Custom Tag Styling
```svelte
<OptionsMultiSelect 
  options={colorOptions}
  tagVariant="round"
  tagColor="var(--primary-color)"
  bind:value={selectedColors}
/>
```