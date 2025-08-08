# PromptsTextEditor Component

Text input component with auto-complete suggestions.

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
| `prompts` | `Array<string>` | `[]` | Array of suggestion options |
| `maxPrompts` | `number` | `10` | Maximum number of suggestions to display |
| `minChars` | `number` | `1` | Minimum characters to trigger suggestions |
| `caseSensitive` | `boolean` | `false` | Whether case sensitive |
| `style` | `string` | `''` | Custom styles |
| `onChange` | `OnChangeHandler<string>` | - | Value change callback |

## Usage Examples

```svelte
<script lang="ts">
  import PromptsTextEditor from '@ticatec/uniface-element/PromptsTextEditor';
  
  // Email domain suggestions
  const emailDomains: string[] = [
    'gmail.com',
    'outlook.com',
    'yahoo.com',
    'hotmail.com',
    'icloud.com',
    'protonmail.com',
    'company.com',
    'example.org'
  ];
  
  // City name suggestions
  const cities: string[] = [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
    'Philadelphia',
    'San Antonio',
    'San Diego',
    'Dallas',
    'San Jose'
  ];
  
  let email: string = '';
  let city: string = '';
  
  const handleEmailChange = (value: string): void => {
    email = value;
    console.log('Email:', value);
  };
  
  const handleCityChange = (value: string): void => {
    city = value;
    console.log('City:', value);
  };
</script>

<!-- Email input (domain suggestions) -->
<PromptsTextEditor 
  placeholder="Enter email address"
  prompts={emailDomains}
  bind:value={email}
  onChange={handleEmailChange}
/>

<!-- City input (auto-complete) -->
<PromptsTextEditor 
  placeholder="Enter city name"
  prompts={cities}
  minChars={1}
  maxPrompts={5}
  bind:value={city}
  onChange={handleCityChange}
/>
```

## Advanced Usage

### Dynamic Suggestions
```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  
  let searchValue: string = '';
  let dynamicPrompts: string[] = [];
  let isLoading: boolean = false;
  
  // Fetch suggestions from API
  const fetchPrompts = async (query: string): Promise<string[]> => {
    if (query.length < 2) return [];
    
    isLoading = true;
    try {
      const response = await fetch(`/api/suggestions?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      return data.suggestions || [];
    } catch (error) {
      console.error('Failed to fetch suggestions:', error);
      return [];
    } finally {
      isLoading = false;
    }
  };
  
  // Debounced prompt updates
  let debounceTimeout: number;
  const updatePrompts = (value: string): void => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(async () => {
      dynamicPrompts = await fetchPrompts(value);
    }, 300);
  };
  
  const handleSearchChange = (value: string): void => {
    searchValue = value;
    updatePrompts(value);
  };
</script>

<PromptsTextEditor 
  placeholder="Search products..."
  prompts={dynamicPrompts}
  minChars={2}
  maxPrompts={8}
  bind:value={searchValue}
  onChange={handleSearchChange}
/>

{#if isLoading}
  <div class="loading-hint">Loading suggestions...</div>
{/if}
```

### Tag Input
```svelte
<script lang="ts">
  const availableTags: string[] = [
    'JavaScript',
    'TypeScript',
    'Svelte',
    'Vue.js',
    'React',
    'Node.js',
    'Python',
    'Java',
    'Go',
    'Rust'
  ];
  
  let tagInput: string = '';
  let selectedTags: string[] = [];
  
  const handleTagInput = (value: string): void => {
    tagInput = value;
    
    // Check for delimiter input
    if (value.includes(',') || value.includes(';')) {
      const newTags = value.split(/[,;]/).map(tag => tag.trim()).filter(Boolean);
      
      newTags.forEach(tag => {
        if (tag && !selectedTags.includes(tag)) {
          selectedTags = [...selectedTags, tag];
        }
      });
      
      tagInput = ''; // Clear input
    }
  };
  
  const removeTag = (tagToRemove: string): void => {
    selectedTags = selectedTags.filter(tag => tag !== tagToRemove);
  };
  
  // Filter out already selected tags
  $: filteredPrompts = availableTags.filter(tag => 
    !selectedTags.includes(tag) && 
    tag.toLowerCase().includes(tagInput.toLowerCase())
  );
</script>

<div class="tag-input-container">
  <!-- Selected tags -->
  <div class="selected-tags">
    {#each selectedTags as tag}
      <span class="tag">
        {tag}
        <button type="button" on:click={() => removeTag(tag)}>×</button>
      </span>
    {/each}
  </div>
  
  <!-- Tag input -->
  <PromptsTextEditor 
    placeholder="Enter tag name..."
    prompts={filteredPrompts}
    bind:value={tagInput}
    onChange={handleTagInput}
    minChars={1}
    maxPrompts={6}
  />
  
  <div class="tag-hint">Use comma or semicolon to separate multiple tags</div>
</div>
```

## Best Practices

### 1. Set Reasonable Trigger Conditions
```svelte
<!-- Short words: 1 character trigger -->
<PromptsTextEditor minChars={1} prompts={shortWords} />

<!-- Long words or search: 2-3 characters trigger -->
<PromptsTextEditor minChars={2} prompts={searchTerms} />
```

### 2. Limit Number of Suggestions
```svelte
<!-- Avoid showing too many suggestions -->
<PromptsTextEditor maxPrompts={6} prompts={largeDataset} />
```

### 3. Case Sensitivity Handling
```svelte
<!-- Code or technical terms: case sensitive -->
<PromptsTextEditor caseSensitive={true} prompts={codeSnippets} />

<!-- General text: case insensitive -->
<PromptsTextEditor caseSensitive={false} prompts={commonWords} />
```