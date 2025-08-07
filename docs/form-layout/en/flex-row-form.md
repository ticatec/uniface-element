# FlexRowForm Component

Flexible row-based form layout component providing a row-based form container with support for vertical and horizontal field layout modes.

## Component Description

The FlexRowForm component consists of the following sub-components:
- **FormContainer** - Main container component
- **Row** - Row component for organizing form rows
- **Cell** - Cell component for placing form fields

## FormContainer Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `style` | `string` | `''` | Custom styles |
| `fieldLayout` | `'vertical' \| 'horizontal'` | `'vertical'` | Field layout direction |

## Usage Examples

### Basic Row-based Layout

```svelte
<script lang="ts">
  import { FormContainer, Row, Cell, FormField, TextEditor, NumberEditor } from '@ticatec/uniface-element';
  
  interface UserInfo {
    firstName: string;
    lastName: string;
    age: number | null;
    email: string;
  }
  
  let userInfo: UserInfo = {
    firstName: '',
    lastName: '',
    age: null,
    email: ''
  };
  
  const handleSubmit = (): void => {
    console.log('Submit user info:', userInfo);
  };
</script>

<FormContainer fieldLayout="horizontal">
  <Row>
    <Cell>
      <FormField label="First Name">
        <TextEditor 
          placeholder="Enter first name"
          bind:value={userInfo.firstName}
        />
      </FormField>
    </Cell>
    
    <Cell>
      <FormField label="Last Name">
        <TextEditor 
          placeholder="Enter last name"
          bind:value={userInfo.lastName}
        />
      </FormField>
    </Cell>
    
    <Cell>
      <FormField label="Age">
        <NumberEditor 
          placeholder="Enter age"
          min={1}
          max={120}
          bind:value={userInfo.age}
        />
      </FormField>
    </Cell>
  </Row>
  
  <Row>
    <Cell>
      <FormField label="Email">
        <TextEditor 
          placeholder="Enter email address"
          bind:value={userInfo.email}
        />
      </FormField>
    </Cell>
  </Row>
  
  <Row>
    <Cell>
      <div class="form-actions">
        <button type="button" on:click={handleSubmit}>
          Submit
        </button>
      </div>
    </Cell>
  </Row>
</FormContainer>
```

### Complex Form Layout

```svelte
<script lang="ts">
  import { FormContainer, Row, Cell, FormField, TextEditor, OptionsSelect, DatePicker, CheckBox } from '@ticatec/uniface-element';
  
  interface EmployeeForm {
    personalInfo: {
      firstName: string;
      lastName: string;
      gender: string;
      birthDate: Date | null;
    };
    workInfo: {
      department: string;
      position: string;
      startDate: Date | null;
    };
    contact: {
      phone: string;
      email: string;
      address: string;
    };
    preferences: {
      emailNotifications: boolean;
      newsletter: boolean;
    };
  }
  
  let employeeData: EmployeeForm = {
    personalInfo: {
      firstName: '',
      lastName: '',
      gender: '',
      birthDate: null
    },
    workInfo: {
      department: '',
      position: '',
      startDate: null
    },
    contact: {
      phone: '',
      email: '',
      address: ''
    },
    preferences: {
      emailNotifications: true,
      newsletter: false
    }
  };
  
  const genderOptions = [
    { code: 'male', text: 'Male' },
    { code: 'female', text: 'Female' },
    { code: 'other', text: 'Other' }
  ];
  
  const departmentOptions = [
    { code: 'engineering', text: 'Engineering' },
    { code: 'marketing', text: 'Marketing' },
    { code: 'sales', text: 'Sales' },
    { code: 'hr', text: 'Human Resources' }
  ];
  
  const validateForm = (): boolean => {
    return employeeData.personalInfo.firstName.length > 0 &&
           employeeData.personalInfo.lastName.length > 0 &&
           employeeData.contact.email.length > 0;
  };
  
  const handleSave = (): void => {
    if (validateForm()) {
      console.log('Save employee info:', employeeData);
    } else {
      alert('Please fill in required fields');
    }
  };
</script>

<div class="employee-form">
  <h2>Employee Information Form</h2>
  
  <FormContainer fieldLayout="horizontal">
    <!-- Personal Information Row -->
    <Row>
      <Cell>
        <h3>Personal Information</h3>
      </Cell>
    </Row>
    
    <Row>
      <Cell>
        <FormField label="First Name" required>
          <TextEditor bind:value={employeeData.personalInfo.firstName} />
        </FormField>
      </Cell>
      
      <Cell>
        <FormField label="Last Name" required>
          <TextEditor bind:value={employeeData.personalInfo.lastName} />
        </FormField>
      </Cell>
      
      <Cell>
        <FormField label="Gender">
          <OptionsSelect 
            options={genderOptions}
            keyField="code"
            textField="text"
            bind:value={employeeData.personalInfo.gender}
          />
        </FormField>
      </Cell>
    </Row>
    
    <Row>
      <Cell>
        <FormField label="Birth Date">
          <DatePicker bind:value={employeeData.personalInfo.birthDate} />
        </FormField>
      </Cell>
    </Row>
    
    <!-- Work Information Row -->
    <Row>
      <Cell>
        <h3>Work Information</h3>
      </Cell>
    </Row>
    
    <Row>
      <Cell>
        <FormField label="Department">
          <OptionsSelect 
            options={departmentOptions}
            keyField="code"
            textField="text"
            bind:value={employeeData.workInfo.department}
          />
        </FormField>
      </Cell>
      
      <Cell>
        <FormField label="Position">
          <TextEditor bind:value={employeeData.workInfo.position} />
        </FormField>
      </Cell>
      
      <Cell>
        <FormField label="Start Date">
          <DatePicker bind:value={employeeData.workInfo.startDate} />
        </FormField>
      </Cell>
    </Row>
    
    <!-- Contact Information Row -->
    <Row>
      <Cell>
        <h3>Contact Information</h3>
      </Cell>
    </Row>
    
    <Row>
      <Cell>
        <FormField label="Phone">
          <TextEditor bind:value={employeeData.contact.phone} />
        </FormField>
      </Cell>
      
      <Cell>
        <FormField label="Email" required>
          <TextEditor bind:value={employeeData.contact.email} />
        </FormField>
      </Cell>
    </Row>
    
    <Row>
      <Cell>
        <FormField label="Address">
          <TextEditor 
            multiline 
            rows={2}
            bind:value={employeeData.contact.address} 
          />
        </FormField>
      </Cell>
    </Row>
    
    <!-- Preferences Row -->
    <Row>
      <Cell>
        <h3>Notification Preferences</h3>
      </Cell>
    </Row>
    
    <Row>
      <Cell>
        <FormField label="">
          <CheckBox 
            label="Receive email notifications"
            bind:value={employeeData.preferences.emailNotifications}
          />
        </FormField>
      </Cell>
      
      <Cell>
        <FormField label="">
          <CheckBox 
            label="Subscribe to company newsletter"
            bind:value={employeeData.preferences.newsletter}
          />
        </FormField>
      </Cell>
    </Row>
    
    <!-- Action Buttons Row -->
    <Row>
      <Cell>
        <div class="form-actions">
          <button type="button" class="btn-secondary">
            Cancel
          </button>
          <button type="button" class="btn-primary" on:click={handleSave}>
            Save
          </button>
        </div>
      </Cell>
    </Row>
  </FormContainer>
</div>

<style>
  .employee-form {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .employee-form h2 {
    margin-bottom: 30px;
    color: #333;
  }
  
  .employee-form h3 {
    margin: 20px 0 10px 0;
    color: #666;
    font-size: 16px;
    border-bottom: 1px solid #e1e5e9;
    padding-bottom: 5px;
  }
  
  .form-actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    margin-top: 20px;
  }
  
  .btn-primary, .btn-secondary {
    padding: 10px 20px;
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

### Responsive Row Layout

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  
  let screenWidth: number = 0;
  
  const updateScreenWidth = (): void => {
    screenWidth = window.innerWidth;
  };
  
  onMount(() => {
    updateScreenWidth();
    window.addEventListener('resize', updateScreenWidth);
    return () => window.removeEventListener('resize', updateScreenWidth);
  });
  
  // Adjust layout based on screen width
  $: fieldLayout = screenWidth < 768 ? 'vertical' : 'horizontal';
  $: cellsPerRow = screenWidth < 768 ? 1 : (screenWidth < 1024 ? 2 : 3);
</script>

<FormContainer {fieldLayout}>
  <Row>
    {#each Array(cellsPerRow) as _, i}
      <Cell>
        <FormField label={`Field ${i + 1}`}>
          <TextEditor placeholder={`Enter field ${i + 1}`} />
        </FormField>
      </Cell>
    {/each}
  </Row>
</FormContainer>
```

## Component Features

### 1. Flexible Row-Column Structure
- **Row** component defines form rows
- **Cell** component defines cells within rows
- Free combination of row and column layouts

### 2. Multiple Layout Mode Support
- **Vertical layout**: Label on top, control below
- **Horizontal layout**: Label on left, control on right

### 3. Responsive Design Friendly
- Can adjust number of cells per row based on screen size
- Supports switching layout modes on different devices

## Comparison with FlexForm

| Feature | FlexForm | FlexRowForm |
|---------|----------|-------------|
| Structure | Simple container structure | Grid structure based on rows and columns |
| Layout Control | Overall layout mode | Row-by-row layout control |
| Complexity | Simple, suitable for basic forms | Complex, suitable for large forms |
| Responsiveness | Overall responsiveness | Precise control of responsive behavior per row |
| Use Case | Simple forms | Complex multi-section forms |

## Best Practices

### 1. Plan Row Structure Reasonably
```svelte
<!-- Group related fields in the same row -->
<Row>
  <Cell><FormField label="First Name"><TextEditor /></FormField></Cell>
  <Cell><FormField label="Last Name"><TextEditor /></FormField></Cell>
</Row>

<!-- Independent fields in separate rows -->
<Row>
  <Cell><FormField label="Detailed Address"><TextEditor multiline /></FormField></Cell>
</Row>
```

### 2. Responsive Design
```svelte
<script lang="ts">
  // Adjust number of fields per row based on screen size
  $: isMobile = window.innerWidth < 768;
</script>

{#if isMobile}
  <!-- Mobile: one field per row -->
  <Row><Cell><FormField label="Name"><TextEditor /></FormField></Cell></Row>
  <Row><Cell><FormField label="Email"><TextEditor /></FormField></Cell></Row>
{:else}
  <!-- Desktop: multiple fields per row -->
  <Row>
    <Cell><FormField label="Name"><TextEditor /></FormField></Cell>
    <Cell><FormField label="Email"><TextEditor /></FormField></Cell>
  </Row>
{/if}
```

### 3. Headings and Grouping
```svelte
<FormContainer>
  <!-- Group heading row -->
  <Row>
    <Cell><h3>Personal Information</h3></Cell>
  </Row>
  
  <!-- Related field rows -->
  <Row>
    <Cell><FormField label="Name"><TextEditor /></FormField></Cell>
    <Cell><FormField label="Age"><NumberEditor /></FormField></Cell>
  </Row>
</FormContainer>
```

## Style Customization

```css
/* Row container styles */
:global(.flex-row-form) {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Horizontal layout styles */
:global(.flex-row-form.field-layout-horizontal) {
  gap: 12px;
}

/* Custom row styles */
.custom-row {
  padding: 10px;
  border: 1px solid #e1e5e9;
  border-radius: 4px;
}

/* Custom cell styles */
.custom-cell {
  padding: 8px;
}

/* Responsive styles */
@media (max-width: 768px) {
  :global(.flex-row-form) {
    gap: 8px;
  }
}
```

## Component Advantages

1. **Precise Layout Control** - Row-by-row control of layout and field arrangement
2. **Structured Organization** - Clear row-column structure, easy to manage complex forms
3. **Highly Customizable** - Each row and cell can be independently styled
4. **Responsive Friendly** - Supports precise responsive layout control
5. **High Maintainability** - Structured organization facilitates maintenance and modifications