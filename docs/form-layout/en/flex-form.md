# FlexForm Component

Flexible form layout component providing a flexible form container with support for both vertical and horizontal field layout modes.

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `style` | `string` | `''` | Custom styles |
| `fieldLayout` | `'vertical' \| 'horizontal'` | `'vertical'` | Field layout direction |

## Usage Examples

### Basic Vertical Layout Form

```svelte
<script lang="ts">
  import { FlexForm, FormField, TextEditor, NumberEditor } from '@ticatec/uniface-element';
  
  let formData = {
    name: '',
    email: '',
    age: null as number | null
  };
  
  const handleSubmit = (): void => {
    console.log('Submit form data:', formData);
  };
</script>

<FlexForm fieldLayout="vertical">
  <FormField label="Name" required>
    <TextEditor 
      placeholder="Enter your name"
      bind:value={formData.name}
    />
  </FormField>
  
  <FormField label="Email">
    <TextEditor 
      placeholder="Enter your email"
      bind:value={formData.email}
    />
  </FormField>
  
  <FormField label="Age">
    <NumberEditor 
      placeholder="Enter your age"
      min={1}
      max={120}
      bind:value={formData.age}
    />
  </FormField>
  
  <div class="form-actions">
    <button type="button" on:click={handleSubmit}>
      Submit
    </button>
  </div>
</FlexForm>
```

### Horizontal Layout Form

```svelte
<script lang="ts">
  import { FlexForm, FormField, TextEditor, OptionsSelect, DatePicker } from '@ticatec/uniface-element';
  
  interface UserProfile {
    firstName: string;
    lastName: string;
    gender: string;
    birthDate: Date | null;
  }
  
  let userProfile: UserProfile = {
    firstName: '',
    lastName: '',
    gender: '',
    birthDate: null
  };
  
  const genderOptions = [
    { code: 'male', text: 'Male' },
    { code: 'female', text: 'Female' },
    { code: 'other', text: 'Other' }
  ];
</script>

<FlexForm fieldLayout="horizontal" style="max-width: 800px;">
  <FormField label="First Name">
    <TextEditor bind:value={userProfile.firstName} />
  </FormField>
  
  <FormField label="Last Name">
    <TextEditor bind:value={userProfile.lastName} />
  </FormField>
  
  <FormField label="Gender">
    <OptionsSelect 
      options={genderOptions}
      keyField="code"
      textField="text"
      bind:value={userProfile.gender}
    />
  </FormField>
  
  <FormField label="Birth Date">
    <DatePicker bind:value={userProfile.birthDate} />
  </FormField>
</FlexForm>
```

### Complex Form Layout

```svelte
<script lang="ts">
  import { FlexForm, FormField, TextEditor, NumberEditor, Switch, CheckBox } from '@ticatec/uniface-element';
  
  interface ContactForm {
    personalInfo: {
      name: string;
      phone: string;
      email: string;
    };
    addressInfo: {
      address: string;
      city: string;
      zipCode: string;
    };
    preferences: {
      newsletter: boolean;
      smsNotify: boolean;
    };
  }
  
  let contactForm: ContactForm = {
    personalInfo: {
      name: '',
      phone: '',
      email: ''
    },
    addressInfo: {
      address: '',
      city: '',
      zipCode: ''
    },
    preferences: {
      newsletter: false,
      smsNotify: false
    }
  };
  
  const validateForm = (): boolean => {
    // Form validation logic
    return contactForm.personalInfo.name.length > 0 &&
           contactForm.personalInfo.email.length > 0;
  };
  
  const handleSave = (): void => {
    if (validateForm()) {
      console.log('Save form:', contactForm);
    } else {
      alert('Please fill in required fields');
    }
  };
</script>

<div class="contact-form-container">
  <h2>Contact Information Form</h2>
  
  <!-- Personal Information Section -->
  <section class="form-section">
    <h3>Personal Information</h3>
    <FlexForm fieldLayout="vertical">
      <FormField label="Name" required>
        <TextEditor 
          placeholder="Enter your name"
          bind:value={contactForm.personalInfo.name}
        />
      </FormField>
      
      <FormField label="Phone">
        <TextEditor 
          placeholder="Enter phone number"
          bind:value={contactForm.personalInfo.phone}
        />
      </FormField>
      
      <FormField label="Email" required>
        <TextEditor 
          placeholder="Enter email address"
          bind:value={contactForm.personalInfo.email}
        />
      </FormField>
    </FlexForm>
  </section>
  
  <!-- Address Information Section -->
  <section class="form-section">
    <h3>Address Information</h3>
    <FlexForm fieldLayout="horizontal">
      <FormField label="Address">
        <TextEditor 
          placeholder="Enter detailed address"
          bind:value={contactForm.addressInfo.address}
        />
      </FormField>
      
      <FormField label="City">
        <TextEditor 
          placeholder="Enter city"
          bind:value={contactForm.addressInfo.city}
        />
      </FormField>
      
      <FormField label="Zip Code">
        <TextEditor 
          placeholder="Enter zip code"
          bind:value={contactForm.addressInfo.zipCode}
        />
      </FormField>
    </FlexForm>
  </section>
  
  <!-- Preferences Section -->
  <section class="form-section">
    <h3>Notification Preferences</h3>
    <FlexForm fieldLayout="vertical">
      <FormField label="">
        <CheckBox 
          label="Subscribe to newsletter"
          bind:value={contactForm.preferences.newsletter}
        />
      </FormField>
      
      <FormField label="">
        <CheckBox 
          label="Receive SMS notifications"
          bind:value={contactForm.preferences.smsNotify}
        />
      </FormField>
    </FlexForm>
  </section>
  
  <div class="form-actions">
    <button type="button" class="btn-secondary">
      Cancel
    </button>
    <button type="button" class="btn-primary" on:click={handleSave}>
      Save
    </button>
  </div>
</div>

<style>
  .contact-form-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .form-section {
    margin-bottom: 30px;
    padding: 20px;
    border: 1px solid #e1e5e9;
    border-radius: 8px;
    background: #f8f9fa;
  }
  
  .form-section h3 {
    margin: 0 0 20px 0;
    color: #495057;
    font-size: 18px;
  }
  
  .form-actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    padding-top: 20px;
    border-top: 1px solid #dee2e6;
  }
  
  .btn-primary, .btn-secondary {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
  }
  
  .btn-primary {
    background: #007bff;
    color: white;
  }
  
  .btn-secondary {
    background: #6c757d;
    color: white;
  }
  
  .btn-primary:hover {
    background: #0056b3;
  }
  
  .btn-secondary:hover {
    background: #545b62;
  }
</style>
```

## Layout Mode Comparison

### Vertical Layout (fieldLayout="vertical")
- Field labels and input controls are arranged vertically
- Suitable for forms with many fields or long field labels
- Better performance on narrow screens
- Each field takes up the full width

### Horizontal Layout (fieldLayout="horizontal")
- Field labels and input controls are arranged horizontally
- Suitable for simple forms or when compact layout is needed
- More efficient space usage on wide screens
- Fixed label width, input controls take remaining space

## Responsive Design

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  
  let isNarrowScreen: boolean = false;
  
  const checkScreenWidth = (): void => {
    isNarrowScreen = window.innerWidth < 768;
  };
  
  onMount(() => {
    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);
    return () => window.removeEventListener('resize', checkScreenWidth);
  });
  
  $: fieldLayout = isNarrowScreen ? 'vertical' : 'horizontal';
</script>

<FlexForm {fieldLayout}>
  <!-- Form fields -->
</FlexForm>
```

## Style Customization

```css
/* Custom FlexForm styles */
:global(.flex-form) {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Horizontal layout styles */
:global(.flex-form.field-layout-horizontal) {
  gap: 12px;
}

/* Custom form container */
.custom-form {
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Responsive styles */
@media (max-width: 768px) {
  :global(.flex-form.field-layout-horizontal) {
    /* Force vertical layout on small screens */
  }
}
```

## Best Practices

### 1. Choose Appropriate Layout Mode
```svelte
<!-- Simple forms: use horizontal layout -->
<FlexForm fieldLayout="horizontal">
  <FormField label="Username"><TextEditor /></FormField>
  <FormField label="Password"><TextEditor type="password" /></FormField>
</FlexForm>

<!-- Complex forms: use vertical layout -->
<FlexForm fieldLayout="vertical">
  <FormField label="Detailed Description">
    <TextEditor multiline rows={4} />
  </FormField>
</FlexForm>
```

### 2. Group Form Fields Logically
```svelte
<div class="form-container">
  <section>
    <h3>Basic Information</h3>
    <FlexForm fieldLayout="vertical">
      <!-- Basic information fields -->
    </FlexForm>
  </section>
  
  <section>
    <h3>Contact Information</h3>
    <FlexForm fieldLayout="horizontal">
      <!-- Contact fields -->
    </FlexForm>
  </section>
</div>
```

### 3. Form Validation Integration
```svelte
<script lang="ts">
  let errors: Record<string, string> = {};
  
  const validateField = (field: string, value: any): void => {
    // Validation logic
    if (!value) {
      errors[field] = 'This field is required';
    } else {
      delete errors[field];
    }
    errors = { ...errors };
  };
</script>

<FlexForm fieldLayout="vertical">
  <FormField label="Name" required error={errors.name}>
    <TextEditor 
      bind:value={formData.name}
      onChange={(value) => validateField('name', value)}
    />
  </FormField>
</FlexForm>
```

## Component Advantages

1. **Flexible Layout** - Supports both vertical and horizontal layout modes
2. **Responsive Friendly** - Can dynamically adjust layout based on screen size
3. **Simple API** - Minimal property configuration, easy to use
4. **Customizable Styles** - Easy customization through CSS variables and style classes
5. **Semantic Structure** - Clear HTML structure, good for SEO and accessibility
6. **High Composability** - Works perfectly with other form components