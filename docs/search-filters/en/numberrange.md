# NumberRange Component

A numeric range input component that allows users to specify a range between two numbers, commonly used for filtering data by numeric criteria such as price ranges, age ranges, or quantity filters.

## Overview

The NumberRange component provides an intuitive interface for selecting numeric ranges with built-in validation, automatic range constraints, and clear functionality. It features two connected number inputs that intelligently validate against each other, ensuring the "from" value is always less than or equal to the "to" value. Perfect for search filters, data queries, and any application requiring numeric range selection.

## Installation

```typescript
import NumberRange from '@ticatec/uniface-element/NumberRange';
import type { OnChangeHandler } from '@ticatec/uniface-element/NumberRange';
```

## Basic Usage

```svelte
<script lang="ts">
  import NumberRange from '@ticatec/uniface-element/NumberRange';

  let fromValue: number = 0;
  let toValue: number = 100;
</script>

<NumberRange 
  bind:fromValue 
  bind:toValue 
  variant="outlined"
/>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | Visual styling variant |
| `compact` | `boolean` | `false` | Enable compact layout for dense forms |
| `class` | `string` | `''` | Additional CSS class names |
| `style` | `string` | `''` | Custom inline styles |
| `min` | `number \| null` | `null` | Global minimum allowed value |
| `max` | `number \| null` | `null` | Global maximum allowed value |
| `fromValue` | `number` | - | Starting value of the range (bindable) |
| `toValue` | `number` | - | Ending value of the range (bindable) |
| `allowNegative` | `boolean` | `false` | Allow negative numbers in inputs |

## Features

- **Smart Validation**: Automatically validates range constraints (from ≤ to)
- **Cross-Field Limits**: The "from" value sets the maximum for "to", and "to" value sets minimum for "from"
- **Clear Functionality**: Built-in clear button that appears when values exist
- **Auto Focus**: Focuses the first input after clearing values
- **Negative Numbers**: Optional support for negative number ranges
- **Consistent Styling**: Matches other form components with variant support

## Type Definitions

```typescript
/**
 * Change event handler type
 */
type OnChangeHandler<T> = (value: T) => void;
```

## Usage Examples

### Price Range Filter

```svelte
<script lang="ts">
  import NumberRange from '@ticatec/uniface-element/NumberRange';

  let minPrice: number = 0;
  let maxPrice: number = 1000;

  // Reactive statement to handle price range changes
  $: if (minPrice !== undefined && maxPrice !== undefined) {
    filterProductsByPrice(minPrice, maxPrice);
  }

  function filterProductsByPrice(min: number, max: number) {
    console.log(`Filtering products between $${min} and $${max}`);
    // Implement filtering logic here
  }

  function resetPriceFilter() {
    minPrice = 0;
    maxPrice = 1000;
  }
</script>

<div class="price-filter">
  <h3>Price Range</h3>
  
  <NumberRange
    bind:fromValue={minPrice}
    bind:toValue={maxPrice}
    variant="outlined"
    min={0}
    max={10000}
    style="width: 300px;"
  />
  
  <div class="price-display">
    <span class="price-label">
      ${minPrice?.toLocaleString() || 0} - ${maxPrice?.toLocaleString() || 0}
    </span>
  </div>
  
  <button class="reset-btn" on:click={resetPriceFilter}>
    Reset Filter
  </button>
</div>

<style>
  .price-filter {
    padding: 16px;
    background: #f8f9fa;
    border-radius: 8px;
    max-width: 400px;
  }
  
  .price-filter h3 {
    margin: 0 0 12px 0;
    color: #333;
    font-size: 1.1rem;
  }
  
  .price-display {
    margin: 12px 0;
    text-align: center;
  }
  
  .price-label {
    font-weight: 500;
    color: #007bff;
    font-size: 1.1rem;
  }
  
  .reset-btn {
    width: 100%;
    padding: 8px 16px;
    background: #6c757d;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 8px;
  }
  
  .reset-btn:hover {
    background: #5a6268;
  }
</style>
```

### Age Range Selector

```svelte
<script lang="ts">
  import NumberRange from '@ticatec/uniface-element/NumberRange';

  let minAge: number = 18;
  let maxAge: number = 65;
  let selectedProfiles = [];

  // Function to filter user profiles by age
  function filterProfilesByAge(min: number, max: number) {
    // Mock profiles data
    const allProfiles = [
      { id: 1, name: 'Alice Johnson', age: 25 },
      { id: 2, name: 'Bob Smith', age: 35 },
      { id: 3, name: 'Carol Davis', age: 45 },
      { id: 4, name: 'David Wilson', age: 28 },
      { id: 5, name: 'Emma Brown', age: 52 }
    ];

    selectedProfiles = allProfiles.filter(profile => 
      profile.age >= min && profile.age <= max
    );
  }

  // Filter on initial load and when values change
  $: filterProfilesByAge(minAge || 0, maxAge || 100);
</script>

<div class="age-filter-demo">
  <div class="filter-section">
    <h3>Filter by Age Range</h3>
    
    <NumberRange
      bind:fromValue={minAge}
      bind:toValue={maxAge}
      variant="filled"
      min={16}
      max={100}
      style="width: 250px;"
      compact={true}
    />
    
    <div class="age-summary">
      <p>Showing profiles aged {minAge} to {maxAge} years</p>
      <p class="result-count">{selectedProfiles.length} profiles found</p>
    </div>
  </div>
  
  <div class="results-section">
    <h4>Matching Profiles</h4>
    {#if selectedProfiles.length > 0}
      <div class="profiles-grid">
        {#each selectedProfiles as profile}
          <div class="profile-card">
            <div class="profile-name">{profile.name}</div>
            <div class="profile-age">Age: {profile.age}</div>
          </div>
        {/each}
      </div>
    {:else}
      <p class="no-results">No profiles match the selected age range</p>
    {/if}
  </div>
</div>

<style>
  .age-filter-demo {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .filter-section {
    background: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    margin-bottom: 20px;
  }
  
  .filter-section h3 {
    margin: 0 0 16px 0;
    color: #333;
  }
  
  .age-summary {
    margin-top: 12px;
    padding: 12px;
    background: #e3f2fd;
    border-radius: 4px;
    text-align: center;
  }
  
  .result-count {
    font-weight: 600;
    color: #1976d2;
    margin: 4px 0 0 0;
  }
  
  .results-section h4 {
    margin: 0 0 16px 0;
    color: #333;
  }
  
  .profiles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
  }
  
  .profile-card {
    padding: 16px;
    background: #f8f9fa;
    border-radius: 6px;
    border-left: 4px solid #007bff;
  }
  
  .profile-name {
    font-weight: 500;
    color: #333;
    margin-bottom: 4px;
  }
  
  .profile-age {
    color: #666;
    font-size: 0.9rem;
  }
  
  .no-results {
    text-align: center;
    color: #666;
    font-style: italic;
    padding: 40px 20px;
  }
</style>
```

### Inventory Range Query

```svelte
<script lang="ts">
  import NumberRange from '@ticatec/uniface-element/NumberRange';

  let minQuantity: number = 0;
  let maxQuantity: number = 500;
  
  // Mock inventory data
  let inventoryItems = [
    { id: 'A001', name: 'Widget Alpha', quantity: 45, category: 'Electronics' },
    { id: 'B002', name: 'Gadget Beta', quantity: 120, category: 'Tools' },
    { id: 'C003', name: 'Device Gamma', quantity: 8, category: 'Electronics' },
    { id: 'D004', name: 'Tool Delta', quantity: 300, category: 'Tools' },
    { id: 'E005', name: 'Part Epsilon', quantity: 750, category: 'Parts' }
  ];

  let filteredItems = [];

  function applyQuantityFilter() {
    filteredItems = inventoryItems.filter(item =>
      item.quantity >= (minQuantity || 0) && 
      item.quantity <= (maxQuantity || Infinity)
    );
  }

  // Apply filter when range changes
  $: {
    minQuantity, maxQuantity;
    applyQuantityFilter();
  }

  function exportResults() {
    const csvContent = [
      'ID,Name,Quantity,Category',
      ...filteredItems.map(item => 
        `${item.id},${item.name},${item.quantity},${item.category}`
      )
    ].join('\n');
    
    console.log('Export data:', csvContent);
    alert('Data exported to console');
  }

  // Predefined range presets
  const presets = [
    { label: 'Low Stock (0-50)', min: 0, max: 50 },
    { label: 'Medium Stock (51-200)', min: 51, max: 200 },
    { label: 'High Stock (201-500)', min: 201, max: 500 },
    { label: 'Overstocked (500+)', min: 500, max: 1000 }
  ];

  function applyPreset(preset) {
    minQuantity = preset.min;
    maxQuantity = preset.max;
  }
</script>

<div class="inventory-query">
  <header class="query-header">
    <h2>Inventory Quantity Filter</h2>
    <p>Filter inventory items by quantity range</p>
  </header>

  <div class="filter-controls">
    <div class="range-input-section">
      <label>Quantity Range:</label>
      <NumberRange
        bind:fromValue={minQuantity}
        bind:toValue={maxQuantity}
        variant="outlined"
        min={0}
        max={1000}
        style="width: 280px;"
      />
    </div>

    <div class="presets-section">
      <label>Quick Presets:</label>
      <div class="preset-buttons">
        {#each presets as preset}
          <button 
            class="preset-btn"
            on:click={() => applyPreset(preset)}
          >
            {preset.label}
          </button>
        {/each}
      </div>
    </div>
  </div>

  <div class="results-section">
    <div class="results-header">
      <h3>Results ({filteredItems.length} items)</h3>
      {#if filteredItems.length > 0}
        <button class="export-btn" on:click={exportResults}>
          Export CSV
        </button>
      {/if}
    </div>

    <div class="results-table">
      {#if filteredItems.length > 0}
        <table>
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Category</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {#each filteredItems as item}
              <tr>
                <td class="item-id">{item.id}</td>
                <td class="item-name">{item.name}</td>
                <td class="item-quantity">{item.quantity}</td>
                <td class="item-category">{item.category}</td>
                <td class="item-status">
                  <span class="status-badge status-{item.quantity < 50 ? 'low' : item.quantity < 200 ? 'medium' : 'high'}">
                    {item.quantity < 50 ? 'Low' : item.quantity < 200 ? 'Medium' : 'High'}
                  </span>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      {:else}
        <div class="no-results">
          <p>No inventory items found in the specified quantity range.</p>
          <p class="suggestion">Try adjusting the range or using a preset filter.</p>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .inventory-query {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
  }

  .query-header {
    text-align: center;
    margin-bottom: 30px;
  }

  .query-header h2 {
    color: #333;
    margin: 0 0 8px 0;
  }

  .query-header p {
    color: #666;
    margin: 0;
  }

  .filter-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    align-items: flex-end;
    margin-bottom: 30px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
  }

  .range-input-section,
  .presets-section {
    flex: 1;
    min-width: 250px;
  }

  .range-input-section label,
  .presets-section label {
    display: block;
    font-weight: 500;
    margin-bottom: 8px;
    color: #333;
  }

  .preset-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .preset-btn {
    padding: 6px 12px;
    background: #e9ecef;
    border: 1px solid #ced4da;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.2s;
  }

  .preset-btn:hover {
    background: #dee2e6;
    border-color: #adb5bd;
  }

  .results-section {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    overflow: hidden;
  }

  .results-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: #f8f9fa;
    border-bottom: 1px solid #dee2e6;
  }

  .results-header h3 {
    margin: 0;
    color: #333;
  }

  .export-btn {
    padding: 8px 16px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.875rem;
  }

  .export-btn:hover {
    background: #0056b3;
  }

  .results-table {
    padding: 20px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    text-align: left;
    padding: 12px;
    border-bottom: 1px solid #dee2e6;
  }

  th {
    font-weight: 600;
    color: #333;
    background: #f8f9fa;
  }

  .item-id {
    font-family: monospace;
    font-weight: 500;
  }

  .item-quantity {
    text-align: right;
    font-weight: 500;
  }

  .status-badge {
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .status-low {
    background: #ffebee;
    color: #c62828;
  }

  .status-medium {
    background: #fff3e0;
    color: #ef6c00;
  }

  .status-high {
    background: #e8f5e8;
    color: #2e7d32;
  }

  .no-results {
    text-align: center;
    padding: 60px 20px;
    color: #666;
  }

  .suggestion {
    font-size: 0.9rem;
    color: #888;
    margin-top: 8px;
  }

  @media (max-width: 768px) {
    .filter-controls {
      flex-direction: column;
      align-items: stretch;
    }
    
    .preset-buttons {
      justify-content: center;
    }
    
    .results-header {
      flex-direction: column;
      gap: 12px;
      align-items: stretch;
    }
    
    table {
      font-size: 0.875rem;
    }
    
    th, td {
      padding: 8px;
    }
  }
</style>
```

## Styling

The NumberRange component uses the following CSS classes:

```css
.uniface-range-editor {
  /* Main range container */
  display: flex;
  align-items: center;
  gap: 8px;
}

.uniface-range-editor .range-divider {
  /* Divider between from/to inputs */
  color: var(--uniface-editor-border-color, #dee2e6);
}

.uniface-range-editor .action-icon {
  /* Clear button styling */
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.uniface-range-editor .action-icon:hover {
  opacity: 1;
}
```

## API Reference

### NumberRange Component Props

```typescript
interface NumberRangeProps {
  variant?: '' | 'plain' | 'outlined' | 'filled';  // Visual styling variant
  compact?: boolean;                                // Compact layout mode
  class?: string;                                   // CSS class names
  style?: string;                                   // Custom inline styles
  min?: number | null;                              // Global minimum value
  max?: number | null;                              // Global maximum value
  fromValue: number;                                // Range start value
  toValue: number;                                  // Range end value
  allowNegative?: boolean;                          // Allow negative numbers
}
```

## Best Practices

1. **Validation** - Always bind both `fromValue` and `toValue` for proper range validation
2. **Limits** - Set appropriate `min` and `max` values to guide user input
3. **User Feedback** - Provide clear indication of selected range values
4. **Accessibility** - Ensure sufficient color contrast and keyboard navigation
5. **Mobile Support** - Test input behavior on touch devices
6. **Data Types** - Handle undefined/null values gracefully in reactive statements
7. **Performance** - Debounce filtering operations for large datasets
8. **Clear Functionality** - Rely on built-in clear button for consistent UX