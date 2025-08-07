# GroupRadioBox Component

Radio button group component that organizes multiple radio button options together, used for selecting one value from multiple options. More convenient and semantic than using multiple individual RadioButton components.

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | Appearance variant |
| `disabled` | `boolean` | `false` | Whether disabled |
| `readonly` | `boolean` | `false` | Whether read-only |
| `compact` | `boolean` | `false` | Whether compact mode |
| `value` | `any` | - | Selected value |
| `options` | `Array<any>` | - | Options array |
| `keyField` | `string` | `'code'` | Value field name |
| `textField` | `string` | `'text'` | Display field name |
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | Display mode |
| `item$style` | `string` | `''` | Style for individual radio button |
| `disabledOptions` | `Array<string>` | `[]` | Disabled option values |
| `style` | `string` | `''` | Custom styles |
| `onChange` | `OnChangeHandler<any>` | - | Value change callback |

## Usage Examples

```svelte
<script lang="ts">
  import { GroupRadioBox } from '@ticatec/uniface-element';
  
  // Gender options
  const genderOptions = [
    { code: 'male', text: 'Male' },
    { code: 'female', text: 'Female' },
    { code: 'other', text: 'Other' }
  ];
  
  // User level options
  const userLevels = [
    { code: 'basic', text: 'Basic User' },
    { code: 'premium', text: 'Premium User' },
    { code: 'vip', text: 'VIP User' },
    { code: 'enterprise', text: 'Enterprise User' }
  ];
  
  // Notification frequency options
  const notificationFrequency = [
    { code: 'realtime', text: 'Real-time Notifications' },
    { code: 'daily', text: 'Daily Summary' },
    { code: 'weekly', text: 'Weekly Summary' },
    { code: 'never', text: 'Never Notify' }
  ];
  
  let selectedGender = 'male';
  let userLevel = 'basic';
  let notifyFreq = 'daily';
  
  const handleGenderChange = (value: string) => {
    selectedGender = value;
    console.log('Selected gender:', value);
  };
  
  const handleLevelChange = (value: string) => {
    userLevel = value;
    console.log('User level:', value);
  };
  
  const handleNotificationChange = (value: string) => {
    notifyFreq = value;
    console.log('Notification frequency:', value);
  };
</script>

<!-- Gender selection -->
<div class="form-group">
  <label>Gender:</label>
  <GroupRadioBox 
    options={genderOptions}
    keyField="code"
    textField="text"
    bind:value={selectedGender}
    onChange={handleGenderChange}
  />
</div>

<!-- User level selection -->
<div class="form-group">
  <label>User Level:</label>
  <GroupRadioBox 
    options={userLevels}
    keyField="code"
    textField="text"
    bind:value={userLevel}
    onChange={handleLevelChange}
  />
</div>

<!-- Notification frequency selection (compact mode) -->
<div class="form-group">
  <label>Notification Frequency:</label>
  <GroupRadioBox 
    options={notificationFrequency}
    keyField="code"
    textField="text"
    compact={true}
    item$style="margin-right: 16px;"
    bind:value={notifyFreq}
    onChange={handleNotificationChange}
  />
</div>

<!-- Radio group with disabled options -->
<div class="form-group">
  <label>Subscription Plan:</label>
  <GroupRadioBox 
    options={[
      { code: 'free', text: 'Free' },
      { code: 'pro', text: 'Professional' },
      { code: 'enterprise', text: 'Enterprise' },
      { code: 'custom', text: 'Custom' }
    ]}
    keyField="code"
    textField="text"
    disabledOptions={['custom']}
    bind:value={subscriptionPlan}
  />
</div>
```

## Advanced Usage

### Dynamic Options and Conditional Disabling
```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  
  const paymentMethods = [
    { code: 'credit_card', text: 'Credit Card', available: true },
    { code: 'paypal', text: 'PayPal', available: true },
    { code: 'apple_pay', text: 'Apple Pay', available: true },
    { code: 'google_pay', text: 'Google Pay', available: true },
    { code: 'bitcoin', text: 'Bitcoin', available: false }
  ];
  
  let selectedPayment = 'credit_card';
  let userLocation = 'US'; // User location
  
  // Dynamically set available payment methods based on user location
  $: availablePaymentMethods = paymentMethods.filter(method => {
    if (userLocation === 'CN') {
      // Chinese users can use credit card and Alipay
      return ['credit_card', 'alipay'].includes(method.code);
    } else if (userLocation === 'US') {
      // US users can use credit card, PayPal, Apple Pay, Google Pay
      return ['credit_card', 'paypal', 'apple_pay', 'google_pay'].includes(method.code);
    }
    return method.available;
  });
  
  // Dynamically set disabled options
  $: disabledOptions = paymentMethods
    .filter(method => !method.available)
    .map(method => method.code);
  
  const handlePaymentChange = (value: string) => {
    selectedPayment = value;
    // Show corresponding payment form based on payment method
    showPaymentForm(value);
  };
  
  const showPaymentForm = (paymentMethod: string) => {
    console.log(`Show ${paymentMethod} payment form`);
  };
</script>

<div class="form-group">
  <label>User Location:</label>
  <select bind:value={userLocation}>
    <option value="CN">China</option>
    <option value="US">United States</option>
    <option value="OTHER">Other</option>
  </select>
</div>

<div class="form-group">
  <label>Payment Method:</label>
  <GroupRadioBox 
    options={availablePaymentMethods}
    keyField="code"
    textField="text"
    {disabledOptions}
    bind:value={selectedPayment}
    onChange={handlePaymentChange}
  />
</div>
```

### Options with Descriptions
```svelte
<script lang="ts">
  const subscriptionPlans = [
    { 
      code: 'free', 
      text: 'Free', 
      description: 'Basic features, suitable for personal use',
      price: '$0/month'
    },
    { 
      code: 'pro', 
      text: 'Professional', 
      description: 'Full features, suitable for small teams',
      price: '$9/month'
    },
    { 
      code: 'enterprise', 
      text: 'Enterprise', 
      description: 'Advanced features, suitable for large teams',
      price: '$29/month'
    }
  ];
  
  let selectedPlan = 'free';
  
  const handlePlanChange = (value: string) => {
    selectedPlan = value;
    const plan = subscriptionPlans.find(p => p.code === value);
    console.log(`Selected ${plan?.text} plan`);
  };
</script>

<div class="form-group">
  <label>Choose Subscription Plan:</label>
  <div class="plan-options">
    <GroupRadioBox 
      options={subscriptionPlans}
      keyField="code"
      textField="text"
      bind:value={selectedPlan}
      onChange={handlePlanChange}
    />
  </div>
  
  <!-- Display selected plan details -->
  {#each subscriptionPlans as plan}
    {#if plan.code === selectedPlan}
      <div class="plan-details">
        <h4>{plan.text}</h4>
        <p>{plan.description}</p>
        <div class="price">{plan.price}</div>
      </div>
    {/if}
  {/each}
</div>
```

### Grouped Radio Buttons
```svelte
<script lang="ts">
  const themes = {
    light: [
      { code: 'default_light', text: 'Default Light' },
      { code: 'blue_light', text: 'Blue Light' },
      { code: 'green_light', text: 'Green Light' }
    ],
    dark: [
      { code: 'default_dark', text: 'Default Dark' },
      { code: 'blue_dark', text: 'Blue Dark' },
      { code: 'green_dark', text: 'Green Dark' }
    ]
  };
  
  let selectedTheme = 'default_light';
  
  const handleThemeChange = (value: string) => {
    selectedTheme = value;
    applyTheme(value);
  };
  
  const applyTheme = (themeCode: string) => {
    console.log(`Apply theme: ${themeCode}`);
    // Theme application logic
  };
</script>

<div class="theme-selector">
  <div class="theme-group">
    <h4>Light Themes</h4>
    <GroupRadioBox 
      options={themes.light}
      keyField="code"
      textField="text"
      compact={true}
      bind:value={selectedTheme}
      onChange={handleThemeChange}
    />
  </div>
  
  <div class="theme-group">
    <h4>Dark Themes</h4>
    <GroupRadioBox 
      options={themes.dark}
      keyField="code"
      textField="text"
      compact={true}
      bind:value={selectedTheme}
      onChange={handleThemeChange}
    />
  </div>
</div>
```

### Form Validation
```svelte
<script lang="ts">
  const satisfactionLevels = [
    { code: 'very_unsatisfied', text: 'Very Unsatisfied' },
    { code: 'unsatisfied', text: 'Unsatisfied' },
    { code: 'neutral', text: 'Neutral' },
    { code: 'satisfied', text: 'Satisfied' },
    { code: 'very_satisfied', text: 'Very Satisfied' }
  ];
  
  let satisfaction: string | null = null;
  let satisfactionError = '';
  
  const validateSatisfaction = (value: string | null) => {
    if (!value) {
      satisfactionError = 'Please select your satisfaction level';
    } else {
      satisfactionError = '';
    }
  };
  
  const handleSatisfactionChange = (value: string) => {
    satisfaction = value;
    validateSatisfaction(value);
  };
  
  const handleSubmit = () => {
    validateSatisfaction(satisfaction);
    if (!satisfactionError) {
      console.log('Submit satisfaction survey:', satisfaction);
    }
  };
</script>

<div class="form-group">
  <label>How satisfied are you with our service? *</label>
  <GroupRadioBox 
    options={satisfactionLevels}
    keyField="code"
    textField="text"
    bind:value={satisfaction}
    onChange={handleSatisfactionChange}
  />
  {#if satisfactionError}
    <div class="error-message">{satisfactionError}</div>
  {/if}
</div>

<button on:click={handleSubmit} disabled={!!satisfactionError}>
  Submit Survey
</button>
```

## Style Customization

```css
.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  margin-bottom: 12px;
  font-weight: 600;
  color: #333;
}

.plan-options {
  margin-bottom: 16px;
}

.plan-details {
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #007bff;
}

.plan-details h4 {
  margin: 0 0 8px 0;
  color: #007bff;
}

.plan-details p {
  margin: 0 0 12px 0;
  color: #6c757d;
}

.price {
  font-size: 18px;
  font-weight: 700;
  color: #28a745;
}

.theme-selector {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.theme-group {
  padding: 16px;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
}

.theme-group h4 {
  margin: 0 0 12px 0;
  color: #495057;
}

.error-message {
  color: #dc3545;
  font-size: 14px;
  margin-top: 6px;
}

/* Custom radio group styles */
.custom-radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.custom-radio-group .radio-option {
  flex: 1;
  min-width: 120px;
}
```

## Component Advantages

**Advantages over using individual RadioButton components:**

1. **Unified Management**: All related options managed in a single component
2. **Simplified Data Binding**: Only need to bind one value instead of multiple independent values
3. **Style Consistency**: All options have unified styling and spacing
4. **Dynamic Option Management**: Easy to show/hide, enable/disable specific options
5. **Better Semantics**: Clearly expresses the mutually exclusive relationship between options
6. **Easy Maintenance**: All option additions, deletions, and modifications handled in one place

## Best Practices

### 1. Provide Reasonable Default Values
```svelte
<!-- Recommended: Set reasonable default value -->
<GroupRadioBox 
  options={genderOptions}
  bind:value={selectedGender}
  defaultValue="other"
/>

<!-- Avoid: Making user selection mandatory -->
<GroupRadioBox 
  options={genderOptions}
  bind:value={selectedGender}
/>
```

### 2. Limit Number of Options
```svelte
<!-- Recommended: Moderate number of options (3-7) -->
<GroupRadioBox options={satisfactionLevels} /> <!-- 5 options -->

<!-- Avoid: Too many options, use dropdown select instead -->
<OptionsSelect options={countryList} /> <!-- 200+ countries -->
```

### 3. Provide Clear Labels
```svelte
<!-- Recommended: Clear description -->
<label>Please select your age group:</label>
<GroupRadioBox options={ageRanges} />

<!-- Avoid: Vague labels -->
<label>Select:</label>
<GroupRadioBox options={someOptions} />
```

### 4. Use Disabled State Appropriately
```svelte
<!-- Recommended: Clear reasoning -->
<GroupRadioBox 
  options={premiumFeatures}
  disabledOptions={nonPremiumUser ? ['advanced', 'pro'] : []}
/>
<div class="help-text">Upgrade to premium to unlock more features</div>
```