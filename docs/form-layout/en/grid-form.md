# GridForm Component

Grid-based form layout component providing CSS Grid-based form container with support for flexible grid layouts and field arrangements.

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `style` | `string` | `''` | Custom styles |
| `columns` | `number` | `6` | Number of grid columns |
| `fieldLayout` | `'vertical' \| 'horizontal'` | `'vertical'` | Field layout direction |

## Usage Examples

### Basic Grid Form

```svelte
<script lang="ts">
  import { GridForm, FormField, TextEditor, NumberEditor, OptionsSelect } from '@ticatec/uniface-element';
  
  interface UserProfile {
    firstName: string;
    lastName: string;
    age: number | null;
    gender: string;
    email: string;
    phone: string;
  }
  
  let userProfile: UserProfile = {
    firstName: '',
    lastName: '',
    age: null,
    gender: '',
    email: '',
    phone: ''
  };
  
  const genderOptions = [
    { code: 'male', text: 'Male' },
    { code: 'female', text: 'Female' },
    { code: 'other', text: 'Other' }
  ];
  
  const handleSubmit = (): void => {
    console.log('Submit user info:', userProfile);
  };
</script>

<!-- 6-column grid layout -->
<GridForm columns={6} fieldLayout="vertical">
  <FormField label="First Name" style="grid-column: span 2;">
    <TextEditor 
      placeholder="Enter first name"
      bind:value={userProfile.firstName}
    />
  </FormField>
  
  <FormField label="Last Name" style="grid-column: span 2;">
    <TextEditor 
      placeholder="Enter last name"
      bind:value={userProfile.lastName}
    />
  </FormField>
  
  <FormField label="Age" style="grid-column: span 2;">
    <NumberEditor 
      placeholder="Enter age"
      min={1}
      max={120}
      bind:value={userProfile.age}
    />
  </FormField>
  
  <FormField label="Gender" style="grid-column: span 3;">
    <OptionsSelect 
      options={genderOptions}
      keyField="code"
      textField="text"
      bind:value={userProfile.gender}
    />
  </FormField>
  
  <FormField label="Phone" style="grid-column: span 3;">
    <TextEditor 
      placeholder="Enter phone number"
      bind:value={userProfile.phone}
    />
  </FormField>
  
  <FormField label="Email" style="grid-column: span 6;">
    <TextEditor 
      placeholder="Enter email address"
      bind:value={userProfile.email}
    />
  </FormField>
  
  <div style="grid-column: span 6;" class="form-actions">
    <button type="button" on:click={handleSubmit}>
      Submit
    </button>
  </div>
</GridForm>

<style>
  .form-actions {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  
  .form-actions button {
    padding: 10px 24px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .form-actions button:hover {
    background: #0056b3;
  }
</style>
```

### Complex Grid Form Layout

```svelte
<script lang="ts">
  import { GridForm, FormField, TextEditor, NumberEditor, DatePicker, OptionsSelect, CheckBox } from '@ticatec/uniface-element';
  
  interface ProductForm {
    basicInfo: {
      name: string;
      category: string;
      brand: string;
      model: string;
    };
    pricing: {
      cost: number | null;
      price: number | null;
      discount: number | null;
    };
    inventory: {
      stock: number | null;
      minStock: number | null;
      maxStock: number | null;
    };
    details: {
      description: string;
      specifications: string;
      launchDate: Date | null;
    };
    settings: {
      isActive: boolean;
      isFeatured: boolean;
      allowBackorder: boolean;
    };
  }
  
  let productData: ProductForm = {
    basicInfo: {
      name: '',
      category: '',
      brand: '',
      model: ''
    },
    pricing: {
      cost: null,
      price: null,
      discount: null
    },
    inventory: {
      stock: null,
      minStock: null,
      maxStock: null
    },
    details: {
      description: '',
      specifications: '',
      launchDate: null
    },
    settings: {
      isActive: true,
      isFeatured: false,
      allowBackorder: false
    }
  };
  
  const categoryOptions = [
    { code: 'electronics', text: 'Electronics' },
    { code: 'clothing', text: 'Clothing' },
    { code: 'books', text: 'Books' },
    { code: 'home', text: 'Home & Garden' }
  ];
  
  const validateForm = (): boolean => {
    return productData.basicInfo.name.length > 0 &&
           productData.basicInfo.category.length > 0 &&
           productData.pricing.price !== null;
  };
  
  const handleSave = (): void => {
    if (validateForm()) {
      console.log('Save product info:', productData);
    } else {
      alert('Please fill in required fields');
    }
  };
</script>

<div class="product-form">
  <h2>Product Information Form</h2>
  
  <GridForm columns={12} fieldLayout="vertical">
    <!-- Basic Information Section -->
    <div style="grid-column: span 12;" class="section-header">
      <h3>Basic Information</h3>
    </div>
    
    <FormField label="Product Name" required style="grid-column: span 6;">
      <TextEditor 
        placeholder="Enter product name"
        bind:value={productData.basicInfo.name}
      />
    </FormField>
    
    <FormField label="Category" required style="grid-column: span 3;">
      <OptionsSelect 
        options={categoryOptions}
        keyField="code"
        textField="text"
        placeholder="Select category"
        bind:value={productData.basicInfo.category}
      />
    </FormField>
    
    <FormField label="Brand" style="grid-column: span 3;">
      <TextEditor 
        placeholder="Enter brand"
        bind:value={productData.basicInfo.brand}
      />
    </FormField>
    
    <FormField label="Model" style="grid-column: span 6;">
      <TextEditor 
        placeholder="Enter product model"
        bind:value={productData.basicInfo.model}
      />
    </FormField>
    
    <FormField label="Launch Date" style="grid-column: span 6;">
      <DatePicker bind:value={productData.details.launchDate} />
    </FormField>
    
    <!-- Pricing Information Section -->
    <div style="grid-column: span 12;" class="section-header">
      <h3>Pricing Information</h3>
    </div>
    
    <FormField label="Cost Price" style="grid-column: span 4;">
      <NumberEditor 
        placeholder="Enter cost price"
        min={0}
        precision={2}
        bind:value={productData.pricing.cost}
      />
    </FormField>
    
    <FormField label="Sale Price" required style="grid-column: span 4;">
      <NumberEditor 
        placeholder="Enter sale price"
        min={0}
        precision={2}
        bind:value={productData.pricing.price}
      />
    </FormField>
    
    <FormField label="Discount (%)" style="grid-column: span 4;">
      <NumberEditor 
        placeholder="Enter discount"
        min={0}
        max={100}
        precision={1}
        bind:value={productData.pricing.discount}
      />
    </FormField>
    
    <!-- Inventory Information Section -->
    <div style="grid-column: span 12;" class="section-header">
      <h3>Inventory Information</h3>
    </div>
    
    <FormField label="Current Stock" style="grid-column: span 4;">
      <NumberEditor 
        placeholder="Enter stock quantity"
        min={0}
        bind:value={productData.inventory.stock}
      />
    </FormField>
    
    <FormField label="Minimum Stock" style="grid-column: span 4;">
      <NumberEditor 
        placeholder="Enter minimum stock"
        min={0}
        bind:value={productData.inventory.minStock}
      />
    </FormField>
    
    <FormField label="Maximum Stock" style="grid-column: span 4;">
      <NumberEditor 
        placeholder="Enter maximum stock"
        min={0}
        bind:value={productData.inventory.maxStock}
      />
    </FormField>
    
    <!-- Details Section -->
    <div style="grid-column: span 12;" class="section-header">
      <h3>Product Details</h3>
    </div>
    
    <FormField label="Description" style="grid-column: span 6;">
      <TextEditor 
        multiline
        rows={4}
        placeholder="Enter product description"
        bind:value={productData.details.description}
      />
    </FormField>
    
    <FormField label="Specifications" style="grid-column: span 6;">
      <TextEditor 
        multiline
        rows={4}
        placeholder="Enter technical specifications"
        bind:value={productData.details.specifications}
      />
    </FormField>
    
    <!-- Settings Section -->
    <div style="grid-column: span 12;" class="section-header">
      <h3>Settings</h3>
    </div>
    
    <FormField label="" style="grid-column: span 4;">
      <CheckBox 
        label="Active Product"
        bind:value={productData.settings.isActive}
      />
    </FormField>
    
    <FormField label="" style="grid-column: span 4;">
      <CheckBox 
        label="Featured Product"
        bind:value={productData.settings.isFeatured}
      />
    </FormField>
    
    <FormField label="" style="grid-column: span 4;">
      <CheckBox 
        label="Allow Backorder"
        bind:value={productData.settings.allowBackorder}
      />
    </FormField>
    
    <!-- Action Buttons -->
    <div style="grid-column: span 12;" class="form-actions">
      <button type="button" class="btn-secondary">
        Cancel
      </button>
      <button type="button" class="btn-primary" on:click={handleSave}>
        Save Product
      </button>
    </div>
  </GridForm>
</div>

<style>
  .product-form {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .product-form h2 {
    margin-bottom: 30px;
    color: #333;
    text-align: center;
  }
  
  .section-header {
    margin: 20px 0 10px 0;
  }
  
  .section-header h3 {
    margin: 0;
    padding: 10px 0;
    color: #495057;
    font-size: 16px;
    border-bottom: 2px solid #007bff;
    background: linear-gradient(90deg, #f8f9fa 0%, transparent 100%);
    padding-left: 10px;
  }
  
  .form-actions {
    display: flex;
    gap: 15px;
    justify-content: center;
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid #dee2e6;
  }
  
  .btn-primary, .btn-secondary {
    padding: 12px 24px;
    border: none;
    border-radius: 4px;
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
</style>
```

### Responsive Grid Form

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
  
  // Responsive column calculation
  $: columns = screenWidth < 768 ? 2 : (screenWidth < 1024 ? 4 : 6);
  $: fieldLayout = screenWidth < 768 ? 'vertical' : 'horizontal';
  
  interface ContactForm {
    name: string;
    email: string;
    phone: string;
    address: string;
  }
  
  let contactData: ContactForm = {
    name: '',
    email: '',
    phone: '',
    address: ''
  };
</script>

<div class="responsive-form">
  <h3>Responsive Grid Form (Current columns: {columns})</h3>
  
  <GridForm {columns} {fieldLayout}>
    <FormField 
      label="Name" 
      style="grid-column: span {Math.min(columns, 3)};"
    >
      <TextEditor bind:value={contactData.name} />
    </FormField>
    
    <FormField 
      label="Email" 
      style="grid-column: span {Math.min(columns, 3)};"
    >
      <TextEditor bind:value={contactData.email} />
    </FormField>
    
    <FormField 
      label="Phone" 
      style="grid-column: span {Math.min(columns, 2)};"
    >
      <TextEditor bind:value={contactData.phone} />
    </FormField>
    
    <FormField 
      label="Address" 
      style="grid-column: span {columns};"
    >
      <TextEditor 
        multiline 
        rows={2} 
        bind:value={contactData.address} 
      />
    </FormField>
  </GridForm>
</div>

<style>
  .responsive-form {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .responsive-form h3 {
    margin-bottom: 20px;
    color: #495057;
    text-align: center;
  }
</style>
```

## Grid Column Spanning Control

Use CSS Grid's `grid-column: span X` syntax to control the number of columns a field occupies:

```svelte
<GridForm columns={12}>
  <!-- Span 2 columns -->
  <FormField label="Name" style="grid-column: span 2;">
    <TextEditor />
  </FormField>
  
  <!-- Span 4 columns -->
  <FormField label="Email Address" style="grid-column: span 4;">
    <TextEditor />
  </FormField>
  
  <!-- Span 6 columns -->
  <FormField label="Detailed Address" style="grid-column: span 6;">
    <TextEditor />
  </FormField>
  
  <!-- Span full row (12 columns) -->
  <FormField label="Notes" style="grid-column: span 12;">
    <TextEditor multiline rows={3} />
  </FormField>
</GridForm>
```

## Common Column Configurations

| Columns | Use Case | Typical Usage |
|---------|----------|---------------|
| 2 | Mobile or simple forms | Left-right two-column layout |
| 3 | Tablet or medium complexity forms | Three equal-width columns |
| 4 | Standard desktop forms | Four-column layout with flexible combinations |
| 6 | Complex forms | Supports 1/2, 1/3, 1/6 ratios |
| 12 | Highly flexible forms | Bootstrap-style 12-grid system |

## Best Practices

### 1. Plan Grid Columns Reasonably
```svelte
<!-- Mobile-first responsive design -->
<script lang="ts">
  $: columns = window.innerWidth < 768 ? 2 : 
               window.innerWidth < 1024 ? 4 : 6;
</script>

<GridForm {columns}>
  <!-- Field configuration -->
</GridForm>
```

### 2. Logical Grouping and Alignment
```svelte
<GridForm columns={6}>
  <!-- Keep related fields on the same row -->
  <FormField label="First Name" style="grid-column: span 2;">
    <TextEditor />
  </FormField>
  <FormField label="Last Name" style="grid-column: span 2;">
    <TextEditor />
  </FormField>
  <FormField label="Age" style="grid-column: span 2;">
    <NumberEditor />
  </FormField>
  
  <!-- Long fields occupy full row -->
  <FormField label="Detailed Address" style="grid-column: span 6;">
    <TextEditor />
  </FormField>
</GridForm>
```

### 3. Responsive Grid Gaps
```css
/* Responsive gap control */
:global(.grid-form > div) {
  gap: 16px;
}

@media (max-width: 768px) {
  :global(.grid-form > div) {
    gap: 12px;
  }
}

@media (max-width: 480px) {
  :global(.grid-form > div) {
    gap: 8px;
  }
}
```

## Style Customization

```css
/* Grid form container */
:global(.grid-form) {
  display: block;
  width: 100%;
}

/* Grid content area */
:global(.grid-form > div) {
  display: grid;
  gap: 16px;
  align-items: start;
}

/* Horizontal layout styles */
:global(.grid-form.field-layout-horizontal > div) {
  align-items: center;
}

/* Custom grid item styles */
.grid-item {
  padding: 8px;
  background: #f8f9fa;
  border-radius: 4px;
}

/* Section styles */
.section-divider {
  grid-column: 1 / -1;
  height: 1px;
  background: #dee2e6;
  margin: 20px 0;
}
```

## Component Advantages

1. **Flexible Grid System** - Based on CSS Grid, supports any column configuration
2. **Precise Layout Control** - Can precisely control column span for each field
3. **Responsive Friendly** - Easy to implement responsive layout adjustments
4. **Consistent Alignment** - Automatically aligns form fields for visual consistency
5. **Highly Extensible** - Supports complex form layout requirements
6. **Performance Optimized** - Native CSS Grid support for excellent performance