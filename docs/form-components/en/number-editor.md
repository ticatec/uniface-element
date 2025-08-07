# NumberEditor Component

Specialized component for numeric input, supporting integers and floating-point numbers.

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | Appearance variant |
| `disabled` | `boolean` | `false` | Whether disabled |
| `readonly` | `boolean` | `false` | Whether read-only |
| `compact` | `boolean` | `false` | Whether compact mode |
| `value` | `number \| null` | `null` | Numeric value |
| `placeholder` | `string` | `''` | Placeholder text |
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | Display mode |
| `min` | `number \| null` | `null` | Minimum value |
| `max` | `number \| null` | `null` | Maximum value |
| `step` | `number` | `1` | Step size |
| `precision` | `number \| null` | `null` | Number of decimal places |
| `style` | `string` | `''` | Custom styles |
| `onChange` | `OnChangeHandler<number>` | - | Value change callback |

## Usage Examples

```svelte
<script lang="ts">
  import { NumberEditor } from '@ticatec/uniface-element';
  
  let price = 0;
  let quantity = 1;
  let rating: number | null = null;
  
  const handlePriceChange = (value: number) => {
    price = value;
    console.log('Price:', value);
  };
  
  const handleQuantityChange = (value: number) => {
    quantity = value;
    console.log('Quantity:', value);
  };
  
  const handleRatingChange = (value: number) => {
    rating = value;
    console.log('Rating:', value);
  };
</script>

<!-- Price input (supports decimals) -->
<NumberEditor 
  placeholder="Enter price"
  min={0}
  precision={2}
  step={0.01}
  onChange={handlePriceChange}
  bind:value={price}
/>

<!-- Quantity input (integers) -->
<NumberEditor 
  placeholder="Enter quantity"
  min={1}
  max={999}
  step={1}
  onChange={handleQuantityChange}
  bind:value={quantity}
/>

<!-- Rating input (0.5 step) -->
<NumberEditor 
  placeholder="Enter rating"
  min={0}
  max={5}
  step={0.5}
  precision={1}
  onChange={handleRatingChange}
  bind:value={rating}
/>
```

## Advanced Usage

### Currency Input
```svelte
<script lang="ts">
  let amount: number | null = null;
  let formattedAmount = '';
  
  const formatCurrency = (value: number | null): string => {
    if (value === null || value === undefined) return '';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };
  
  const handleAmountChange = (value: number) => {
    amount = value;
    formattedAmount = formatCurrency(value);
  };
</script>

<div class="currency-input">
  <NumberEditor 
    placeholder="Enter amount"
    min={0}
    precision={2}
    step={0.01}
    bind:value={amount}
    onChange={handleAmountChange}
  />
  {#if formattedAmount}
    <div class="currency-display">{formattedAmount}</div>
  {/if}
</div>
```

### Percentage Input
```svelte
<script lang="ts">
  let percentage: number | null = null;
  
  const handlePercentageChange = (value: number | null) => {
    // Limit to 0-100 range
    if (value !== null) {
      percentage = Math.min(Math.max(value, 0), 100);
    } else {
      percentage = value;
    }
  };
</script>

<div class="percentage-input">
  <NumberEditor 
    placeholder="Enter percentage"
    min={0}
    max={100}
    step={0.1}
    precision={1}
    bind:value={percentage}
    onChange={handlePercentageChange}
  />
  <span class="suffix">%</span>
</div>
```

### Form Validation
```svelte
<script lang="ts">
  let age: number | null = null;
  let ageError = '';
  
  const validateAge = (value: number | null) => {
    if (value === null) {
      ageError = 'Age cannot be empty';
    } else if (value < 18) {
      ageError = 'Age must be at least 18';
    } else if (value > 120) {
      ageError = 'Please enter a valid age';
    } else {
      ageError = '';
    }
  };
  
  const handleAgeChange = (value: number) => {
    age = value;
    validateAge(value);
  };
</script>

<div class="form-field">
  <NumberEditor 
    placeholder="Enter age"
    min={1}
    max={120}
    bind:value={age}
    onChange={handleAgeChange}
  />
  {#if ageError}
    <div class="error-message">{ageError}</div>
  {/if}
</div>
```

## Style Customization

```css
.currency-input {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.currency-display {
  font-size: 12px;
  color: #6c757d;
  font-weight: 500;
}

.percentage-input {
  display: flex;
  align-items: center;
  gap: 8px;
}

.suffix {
  font-weight: 500;
  color: #495057;
}

.form-field {
  margin-bottom: 16px;
}

.error-message {
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
}
```

## Best Practices

### 1. Set Appropriate Precision
```svelte
<!-- Currency: 2 decimal places -->
<NumberEditor precision={2} step={0.01} />

<!-- Percentage: 1 decimal place -->
<NumberEditor precision={1} step={0.1} max={100} />

<!-- Integer: no precision setting -->
<NumberEditor step={1} />
```

### 2. Reasonable Range Limits
```svelte
<!-- Age -->
<NumberEditor min={0} max={150} />

<!-- Rating -->
<NumberEditor min={0} max={5} step={0.1} />

<!-- Price -->
<NumberEditor min={0} step={0.01} />
```

### 3. Appropriate Step Settings
```svelte
<!-- Precise control -->
<NumberEditor step={0.01} /> <!-- Currency -->
<NumberEditor step={0.5} />  <!-- Rating -->
<NumberEditor step={5} />    <!-- Age groups -->
```