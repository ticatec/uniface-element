# RadioButton Component

Radio button component for selecting one option from multiple choices.

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | Appearance variant |
| `disabled` | `boolean` | `false` | Whether disabled |
| `readonly` | `boolean` | `false` | Whether read-only |
| `value` | `any` | `null` | Selected value |
| `groupValue` | `any` | `null` | Current value of the radio group |
| `label` | `string` | `''` | Label text |
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | Display mode |
| `style` | `string` | `''` | Custom styles |
| `onChange` | `OnChangeHandler<any>` | - | Value change callback |

## Usage Examples

```svelte
<script lang="ts">
  import { RadioButton } from '@ticatec/uniface-element';
  
  let selectedPayment: string = 'credit';
  let selectedSize: string = 'M';
  
  const handlePaymentChange = (value: string): void => {
    selectedPayment = value;
    console.log('Payment method:', value);
  };
  
  const handleSizeChange = (value: string): void => {
    selectedSize = value;
    console.log('Size:', value);
  };
</script>

<!-- Payment method selection -->
<div>
  <h4>Please select payment method:</h4>
  <RadioButton 
    label="Credit Card"
    value="credit"
    groupValue={selectedPayment}
    onChange={handlePaymentChange}
  />
  <RadioButton 
    label="PayPal"
    value="paypal"
    groupValue={selectedPayment}
    onChange={handlePaymentChange}
  />
  <RadioButton 
    label="Apple Pay"
    value="applepay"
    groupValue={selectedPayment}
    onChange={handlePaymentChange}
  />
</div>

<!-- Size selection -->
<div>
  <h4>Please select size:</h4>
  <RadioButton 
    label="Small (S)"
    value="S"
    groupValue={selectedSize}
    onChange={handleSizeChange}
  />
  <RadioButton 
    label="Medium (M)"
    value="M"
    groupValue={selectedSize}
    onChange={handleSizeChange}
  />
  <RadioButton 
    label="Large (L)"
    value="L"
    groupValue={selectedSize}
    onChange={handleSizeChange}
  />
</div>
```