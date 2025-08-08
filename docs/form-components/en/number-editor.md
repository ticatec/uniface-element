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
| `precision` | `number \| null` | `null` | Number of decimal places |
| `suffix` | `string` | `''` | Text suffix |
| `prefix` | `string` | `''` | Text prefix |
| `allowNegative` | `boolean` | `false` | Allow negative numbers |
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | Display mode |
| `max` | `number \| null` | `null` | Maximum value |
| `min` | `number \| null` | `null` | Minimum value |
| `removable` | `boolean` | `true` | Show clear button |
| `style` | `string` | `''` | Custom styles |
| `onChange` | `OnChangeHandler<number \| null>` | - | Value change callback |

## Usage Examples

```svelte
<script lang="ts">
  import NumberEditor from '@ticatec/uniface-element/NumberEditor';
  
  let price: number | null = null;
  let quantity: number | null = 1;
  let rating: number | null = null;
  
  const handlePriceChange = (value: number | null) => {
    price = value;
    console.log('Price:', value);
  };
  
  const handleQuantityChange = (value: number | null) => {
    quantity = value;
    console.log('Quantity:', value);
  };
  
  const handleRatingChange = (value: number | null) => {
    rating = value;
    console.log('Rating:', value);
  };
</script>

<!-- Price input with prefix -->
<NumberEditor 
  placeholder="Enter price"
  min={0}
  precision={2}
  prefix="$"
  onChange={handlePriceChange}
  bind:value={price}
/>

<!-- Quantity input with limits -->
<NumberEditor 
  placeholder="Enter quantity"
  min={1}
  max={999}
  precision={0}
  onChange={handleQuantityChange}
  bind:value={quantity}
/>

<!-- Rating input with suffix -->
<NumberEditor 
  placeholder="Enter rating"
  min={0}
  max={5}
  precision={1}
  suffix="/5"
  onChange={handleRatingChange}
  bind:value={rating}
/>
```

## Advanced Usage

### Currency Input
```svelte
<script lang="ts">
  let amount: number | null = null;
  
  const handleAmountChange = (value: number | null) => {
    amount = value;
    console.log('Amount:', value);
  };
</script>

<div class="currency-input">
  <NumberEditor 
    placeholder="Enter amount"
    min={0}
    precision={2}
    prefix="$"
    bind:value={amount}
    onChange={handleAmountChange}
  />
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
    precision={1}
    suffix="%"
    bind:value={percentage}
    onChange={handlePercentageChange}
  />
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
<NumberEditor precision={2} prefix="$" />

<!-- Percentage: 1 decimal place -->
<NumberEditor precision={1} suffix="%" max={100} />

<!-- Integer: no precision setting -->
<NumberEditor precision={0} />
```

### 2. Use Prefixes and Suffixes
```svelte
<!-- Currency -->
<NumberEditor prefix="$" precision={2} />

<!-- Percentage -->
<NumberEditor suffix="%" precision={1} />

<!-- Units -->
<NumberEditor suffix="kg" precision={2} />
```

### 3. Set Reasonable Range Limits
```svelte
<!-- Age -->
<NumberEditor min={0} max={150} precision={0} />

<!-- Rating -->
<NumberEditor min={0} max={5} precision={1} />

<!-- Price -->
<NumberEditor min={0} precision={2} allowNegative={false} />
```