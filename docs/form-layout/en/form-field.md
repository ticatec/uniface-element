# FormField Component

Form field component providing a form field container with label, error messages, and required indicators - the core component for form building.

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | `string` | `'Label:'` | Field label text |
| `style` | `string` | `''` | Custom styles |
| `label$style` | `string \| null` | `null` | Label styles |
| `required` | `boolean` | `false` | Whether field is required |
| `error` | `string \| null` | `null` | Error message |
| `labelSuffix` | `string` | `':'` | Label suffix |
| `label$alignment` | `'center' \| 'top'` | `'center'` | Label alignment |
| `class` | `string` | `''` | CSS class name |

## Usage Examples

### Basic Form Fields

```svelte
<script lang="ts">
  import FormField, TextEditor, NumberEditor, DatePicker from '@ticatec/uniface-element/FormField, TextEditor, NumberEditor, DatePicker';
  
  interface UserForm {
    name: string;
    age: number | null;
    email: string;
    birthDate: Date | null;
  }
  
  let userForm: UserForm = {
    name: '',
    age: null,
    email: '',
    birthDate: null
  };
</script>

<!-- Basic field -->
<FormField label="Name">
  <TextEditor 
    variant="outlined" 
    bind:value={userForm.name} 
    placeholder="Enter name"
  />
</FormField>

<!-- Number field -->
<FormField label="Age">
  <NumberEditor 
    variant="outlined" 
    bind:value={userForm.age}
    min={1}
    max={120}
    placeholder="Enter age"
  />
</FormField>

<!-- Email field -->
<FormField label="Email">
  <TextEditor 
    variant="outlined" 
    bind:value={userForm.email}
    placeholder="Enter email address"
  />
</FormField>

<!-- Date field -->
<FormField label="Birth Date">
  <DatePicker variant="outlined" bind:value={userForm.birthDate} />
</FormField>
```

### Required Fields and Validation

```svelte
<script lang="ts">
  import FormField, TextEditor, OptionsSelect from '@ticatec/uniface-element/FormField, TextEditor, OptionsSelect';
  
  interface RegistrationForm {
    username: string;
    password: string;
    email: string;
    gender: string;
  }
  
  let registrationForm: RegistrationForm = {
    username: '',
    password: '',
    email: '',
    gender: ''
  };
  
  let errors: Record<string, string> = {};
  
  const genderOptions = [
    { code: 'male', text: 'Male' },
    { code: 'female', text: 'Female' },
    { code: 'other', text: 'Other' }
  ];
  
  const validateForm = (): void => {
    errors = {};
    
    if (!registrationForm.username) {
      errors.username = 'Username is required';
    } else if (registrationForm.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    }
    
    if (!registrationForm.password) {
      errors.password = 'Password is required';
    } else if (registrationForm.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    
    if (!registrationForm.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registrationForm.email)) {
      errors.email = 'Please enter a valid email address';
    }
  };
  
  const handleSubmit = (): void => {
    validateForm();
    if (Object.keys(errors).length === 0) {
      console.log('Form submitted successfully', registrationForm);
    }
  };
</script>

<div class="registration-form">
  <h3>User Registration</h3>
  
  <!-- Required username field -->
  <FormField required label="Username" error={errors.username}>
    <TextEditor 
      variant="outlined" 
      bind:value={registrationForm.username}
      placeholder="Enter username"
      on:input={() => errors.username = ''}
    />
  </FormField>
  
  <!-- Required password field -->
  <FormField required label="Password" error={errors.password}>
    <TextEditor 
      variant="outlined" 
      type="password"
      bind:value={registrationForm.password}
      placeholder="Enter password"
      on:input={() => errors.password = ''}
    />
  </FormField>
  
  <!-- Required email field -->
  <FormField required label="Email Address" error={errors.email}>
    <TextEditor 
      variant="outlined" 
      bind:value={registrationForm.email}
      placeholder="Enter email address"
      on:input={() => errors.email = ''}
    />
  </FormField>
  
  <!-- Optional gender field -->
  <FormField label="Gender">
    <OptionsSelect 
      variant="outlined"
      options={genderOptions}
      keyField="code"
      textField="text"
      bind:value={registrationForm.gender}
      placeholder="Select gender"
    />
  </FormField>
  
  <div class="form-actions">
    <button type="button" class="btn-primary" on:click={handleSubmit}>
      Register
    </button>
  </div>
</div>

<style>
  .registration-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 30px;
    background: #f8f9fa;
    border-radius: 8px;
  }
  
  .registration-form h3 {
    margin-bottom: 25px;
    text-align: center;
    color: #495057;
  }
  
  .form-actions {
    margin-top: 25px;
    text-align: center;
  }
  
  .btn-primary {
    padding: 12px 40px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
  }
  
  .btn-primary:hover {
    background: #0056b3;
  }
</style>
```

### Custom Label Styles and Alignment

```svelte
<script lang="ts">
  import FormField, TextEditor, MemoEditor from '@ticatec/uniface-element/FormField, TextEditor, MemoEditor';
  
  let contactData = {
    name: '',
    company: '',
    position: '',
    description: ''
  };
</script>

<div class="contact-form">
  <h3>Contact Information</h3>
  
  <!-- Important field label style -->
  <FormField 
    required
    label="Name" 
    label$style="color: #dc3545; font-weight: 600; font-size: 16px;"
    labelSuffix="*"
  >
    <TextEditor 
      variant="outlined" 
      bind:value={contactData.name}
      placeholder="Enter contact name"
    />
  </FormField>
  
  <!-- Regular field label style -->
  <FormField 
    label="Company Name" 
    label$style="color: #28a745; font-weight: 500;"
  >
    <TextEditor 
      variant="outlined" 
      bind:value={contactData.company}
      placeholder="Enter company name"
    />
  </FormField>
  
  <!-- Custom label color -->
  <FormField 
    label="Position" 
    label$style="color: #6f42c1; font-style: italic;"
  >
    <TextEditor 
      variant="outlined" 
      bind:value={contactData.position}
      placeholder="Enter position"
    />
  </FormField>
  
  <!-- Top-aligned multiline text -->
  <FormField 
    label="Detailed Description" 
    label$alignment="top"
    label$style="color: #495057; font-weight: 500; padding-top: 8px;"
  >
    <MemoEditor 
      variant="outlined"
      bind:value={contactData.description}
      placeholder="Enter detailed description"
      rows={4}
      maxLength={500}
      showIndicator
    />
  </FormField>
</div>

<style>
  .contact-form {
    max-width: 600px;
    margin: 0 auto;
    padding: 30px;
  }
  
  .contact-form h3 {
    margin-bottom: 25px;
    color: #495057;
    border-bottom: 2px solid #007bff;
    padding-bottom: 10px;
  }
</style>
```

### Long Label Text Handling

```svelte
<script lang="ts">
  import FormField, TextEditor, CheckBox from '@ticatec/uniface-element/FormField, TextEditor, CheckBox';
  
  let advancedSettings = {
    serverEndpoint: '',
    apiKey: '',
    enableLogging: false,
    autoRetry: false
  };
</script>

<div class="settings-form">
  <h3>Advanced Settings</h3>
  
  <!-- Long label with automatic ellipsis -->
  <FormField 
    label="Server Endpoint URL Address (supports HTTP and HTTPS protocols)"
    required
  >
    <TextEditor 
      variant="outlined" 
      bind:value={advancedSettings.serverEndpoint}
      placeholder="Enter server endpoint URL"
    />
  </FormField>
  
  <!-- Long label with custom style -->
  <FormField 
    label="API Key (for authentication and access control)"
    label$style="font-size: 14px; line-height: 1.2; white-space: normal;"
    required
  >
    <TextEditor 
      variant="outlined" 
      type="password"
      bind:value={advancedSettings.apiKey}
      placeholder="Enter API key"
    />
  </FormField>
  
  <!-- Switch type field -->
  <FormField label="Enable Detailed Logging Feature" labelSuffix="">
    <CheckBox 
      label="Log all API requests and response details"
      bind:value={advancedSettings.enableLogging}
    />
  </FormField>
  
  <!-- Switch type field -->
  <FormField label="Enable Auto Retry Mechanism" labelSuffix="">
    <CheckBox 
      label="Automatically retry up to 3 times when request fails"
      bind:value={advancedSettings.autoRetry}
    />
  </FormField>
</div>

<style>
  .settings-form {
    max-width: 700px;
    margin: 0 auto;
    padding: 30px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .settings-form h3 {
    margin-bottom: 25px;
    color: #333;
    font-size: 20px;
  }
</style>
```

### Combined Form Field Usage

```svelte
<script lang="ts">
  import FormField, TextEditor, NumberEditor, DatePicker, OptionsSelect, CheckBox from '@ticatec/uniface-element/FormField, TextEditor, NumberEditor, DatePicker, OptionsSelect, CheckBox';
  
  interface EmployeeForm {
    personalInfo: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      birthDate: Date | null;
    };
    workInfo: {
      employeeId: string;
      department: string;
      position: string;
      salary: number | null;
      startDate: Date | null;
    };
    settings: {
      receiveEmails: boolean;
      isManager: boolean;
    };
  }
  
  let employeeForm: EmployeeForm = {
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      birthDate: null
    },
    workInfo: {
      employeeId: '',
      department: '',
      position: '',
      salary: null,
      startDate: null
    },
    settings: {
      receiveEmails: true,
      isManager: false
    }
  };
  
  let validationErrors: Record<string, string> = {};
  
  const departments = [
    { code: 'engineering', text: 'Engineering' },
    { code: 'marketing', text: 'Marketing' },
    { code: 'sales', text: 'Sales' },
    { code: 'hr', text: 'Human Resources' }
  ];
  
  const validateForm = (): boolean => {
    validationErrors = {};
    
    if (!employeeForm.personalInfo.firstName) {
      validationErrors.firstName = 'First name is required';
    }
    
    if (!employeeForm.personalInfo.lastName) {
      validationErrors.lastName = 'Last name is required';
    }
    
    if (!employeeForm.personalInfo.email) {
      validationErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employeeForm.personalInfo.email)) {
      validationErrors.email = 'Please enter a valid email address';
    }
    
    if (!employeeForm.workInfo.employeeId) {
      validationErrors.employeeId = 'Employee ID is required';
    }
    
    return Object.keys(validationErrors).length === 0;
  };
  
  const handleSave = (): void => {
    if (validateForm()) {
      console.log('Employee information saved successfully', employeeForm);
      alert('Employee information has been saved');
    }
  };
  
  const clearFieldError = (field: string): void => {
    if (validationErrors[field]) {
      validationErrors = { ...validationErrors };
      delete validationErrors[field];
    }
  };
</script>

<div class="employee-form">
  <h2>Employee Information Management</h2>
  
  <!-- Personal Information Section -->
  <section class="form-section">
    <h3>Personal Information</h3>
    
    <div class="form-row">
      <div class="form-col">
        <FormField required label="First Name" error={validationErrors.firstName}>
          <TextEditor 
            variant="outlined" 
            bind:value={employeeForm.personalInfo.firstName}
            placeholder="Enter first name"
            on:input={() => clearFieldError('firstName')}
          />
        </FormField>
      </div>
      
      <div class="form-col">
        <FormField required label="Last Name" error={validationErrors.lastName}>
          <TextEditor 
            variant="outlined" 
            bind:value={employeeForm.personalInfo.lastName}
            placeholder="Enter last name"
            on:input={() => clearFieldError('lastName')}
          />
        </FormField>
      </div>
    </div>
    
    <FormField required label="Email Address" error={validationErrors.email}>
      <TextEditor 
        variant="outlined" 
        bind:value={employeeForm.personalInfo.email}
        placeholder="Enter email address"
        on:input={() => clearFieldError('email')}
      />
    </FormField>
    
    <FormField label="Phone Number">
      <TextEditor 
        variant="outlined" 
        bind:value={employeeForm.personalInfo.phone}
        placeholder="Enter phone number"
      />
    </FormField>
    
    <FormField label="Birth Date">
      <DatePicker 
        variant="outlined" 
        bind:value={employeeForm.personalInfo.birthDate}
      />
    </FormField>
  </section>
  
  <!-- Work Information Section -->
  <section class="form-section">
    <h3>Work Information</h3>
    
    <FormField required label="Employee ID" error={validationErrors.employeeId}>
      <TextEditor 
        variant="outlined" 
        bind:value={employeeForm.workInfo.employeeId}
        placeholder="Enter employee ID"
        on:input={() => clearFieldError('employeeId')}
      />
    </FormField>
    
    <div class="form-row">
      <div class="form-col">
        <FormField label="Department">
          <OptionsSelect 
            variant="outlined"
            options={departments}
            keyField="code"
            textField="text"
            bind:value={employeeForm.workInfo.department}
            placeholder="Select department"
          />
        </FormField>
      </div>
      
      <div class="form-col">
        <FormField label="Position">
          <TextEditor 
            variant="outlined" 
            bind:value={employeeForm.workInfo.position}
            placeholder="Enter position"
          />
        </FormField>
      </div>
    </div>
    
    <div class="form-row">
      <div class="form-col">
        <FormField label="Salary">
          <NumberEditor 
            variant="outlined" 
            bind:value={employeeForm.workInfo.salary}
            min={0}
            precision={0}
            placeholder="Enter salary"
          />
        </FormField>
      </div>
      
      <div class="form-col">
        <FormField label="Start Date">
          <DatePicker 
            variant="outlined" 
            bind:value={employeeForm.workInfo.startDate}
          />
        </FormField>
      </div>
    </div>
  </section>
  
  <!-- Settings Section -->
  <section class="form-section">
    <h3>Account Settings</h3>
    
    <FormField label="Notification Preferences" labelSuffix="">
      <CheckBox 
        label="Receive email notifications"
        bind:value={employeeForm.settings.receiveEmails}
      />
    </FormField>
    
    <FormField label="Permission Settings" labelSuffix="">
      <CheckBox 
        label="Administrator privileges"
        bind:value={employeeForm.settings.isManager}
      />
    </FormField>
  </section>
  
  <!-- Action Buttons -->
  <div class="form-actions">
    <button type="button" class="btn-secondary">
      Cancel
    </button>
    <button type="button" class="btn-primary" on:click={handleSave}>
      Save Employee Information
    </button>
  </div>
</div>

<style>
  .employee-form {
    max-width: 800px;
    margin: 0 auto;
    padding: 30px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .employee-form h2 {
    margin-bottom: 30px;
    text-align: center;
    color: #333;
    font-size: 24px;
  }
  
  .form-section {
    margin-bottom: 35px;
    padding: 25px;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    background: #f8f9fa;
  }
  
  .form-section h3 {
    margin: 0 0 20px 0;
    color: #495057;
    font-size: 18px;
    border-bottom: 2px solid #007bff;
    padding-bottom: 8px;
  }
  
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 16px;
  }
  
  .form-col {
    min-width: 0;
  }
  
  .form-actions {
    display: flex;
    gap: 15px;
    justify-content: center;
    padding-top: 25px;
    border-top: 1px solid #dee2e6;
  }
  
  .btn-primary, .btn-secondary {
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
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
    transform: translateY(-1px);
  }
  
  .btn-secondary:hover {
    background: #545b62;
    transform: translateY(-1px);
  }
  
  @media (max-width: 768px) {
    .form-row {
      grid-template-columns: 1fr;
      gap: 16px;
    }
    
    .employee-form {
      padding: 20px;
    }
    
    .form-section {
      padding: 20px;
    }
  }
</style>
```

## Label Alignment

### Center Alignment (Default)
```svelte
<FormField label="Name" label$alignment="center">
  <TextEditor />
</FormField>
```

### Top Alignment
```svelte
<!-- Suitable for multiline input controls -->
<FormField label="Detailed Description" label$alignment="top">
  <MemoEditor rows={4} />
</FormField>
```

## Error Message Handling

```svelte
<script lang="ts">
  let formData = { email: '' };
  let errors: Record<string, string> = {};
  
  const validateEmail = (): void => {
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    } else {
      delete errors.email;
      errors = { ...errors };
    }
  };
</script>

<FormField required label="Email" error={errors.email}>
  <TextEditor 
    bind:value={formData.email}
    on:blur={validateEmail}
  />
</FormField>
```

## Style Customization

```css
/* Form field container */
:global(.uniface-form-field) {
  margin-bottom: 20px;
}

/* Form content area */
:global(.uniface-form-field .form-content) {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Label styles */
:global(.uniface-form-field .field-label) {
  font-weight: 500;
  color: #495057;
  margin-bottom: 4px;
}

/* Required indicator styles */
:global(.uniface-form-field .required-indicator) {
  color: #dc3545;
  margin-right: 4px;
}

/* Top-aligned label */
:global(.uniface-form-field .field-label.vert-top) {
  align-self: flex-start;
}

/* Error message styles */
:global(.uniface-form-field .field-hint) {
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
}

/* Field content area */
:global(.uniface-form-field .field) {
  flex: 1;
}

/* Horizontal layout styles */
:global(.field-layout-horizontal .uniface-form-field .form-content) {
  flex-direction: row;
  align-items: center;
  gap: 12px;
}

:global(.field-layout-horizontal .uniface-form-field .field-label) {
  flex-shrink: 0;
  margin-bottom: 0;
  min-width: 120px;
}

/* Responsive styles */
@media (max-width: 768px) {
  :global(.field-layout-horizontal .uniface-form-field .form-content) {
    flex-direction: column;
    align-items: stretch;
  }
  
  :global(.field-layout-horizontal .uniface-form-field .field-label) {
    min-width: auto;
    margin-bottom: 4px;
  }
}
```

## Best Practices

### 1. Use Required Indicators Appropriately
```svelte
<!-- Required fields -->
<FormField required label="Username">
  <TextEditor />
</FormField>

<!-- Optional fields -->
<FormField label="Nickname">
  <TextEditor />
</FormField>
```

### 2. Show Validation Errors Promptly
```svelte
<script lang="ts">
  const clearError = (field: string): void => {
    if (errors[field]) {
      delete errors[field];
      errors = { ...errors };
    }
  };
</script>

<FormField required label="Email" error={errors.email}>
  <TextEditor 
    bind:value={formData.email}
    on:input={() => clearError('email')}
  />
</FormField>
```

### 3. Choose Appropriate Label Alignment
```svelte
<!-- Single line input: use center alignment -->
<FormField label="Name" label$alignment="center">
  <TextEditor />
</FormField>

<!-- Multiline input: use top alignment -->
<FormField label="Notes" label$alignment="top">
  <MemoEditor rows={3} />
</FormField>
```

### 4. Customize Label Styles
```svelte
<!-- Highlight important fields -->
<FormField 
  required 
  label="Password" 
  label$style="color: #dc3545; font-weight: 600;"
>
  <TextEditor type="password" />
</FormField>

<!-- De-emphasize secondary fields -->
<FormField 
  label="Notes" 
  label$style="color: #6c757d; font-size: 14px;"
>
  <TextEditor />
</FormField>
```

## Component Advantages

1. **Complete Field Functionality** - Provides comprehensive field support with labels, required indicators, and error messages
2. **Flexible Layout Options** - Supports both center and top alignment for labels
3. **Rich Style Customization** - Supports customization of label styles, suffixes, and overall styling
4. **Comprehensive Validation Support** - Built-in error message display mechanism
5. **Responsive Friendly** - Supports responsive switching between horizontal and vertical layouts
6. **Easy Integration** - Seamlessly works with all form controls
7. **Consistency Assurance** - Unified field styling and behavior standards