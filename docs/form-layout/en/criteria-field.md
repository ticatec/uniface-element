# CriteriaField Component

Conditional filtering field component providing a labeled filtering field container specifically designed for building criteria filtering forms.

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | `string` | `'Label'` | Field label text |
| `style` | `string` | `''` | Custom styles |
| `label$style` | `string` | `''` | Label styles |
| `size` | `'' \| 'x15' \| 'x20' \| 'x25' \| 'x30' \| 'x35' \| 'x40'` | `''` | Field size |
| `labelSuffix` | `string` | `':'` | Label suffix |
| `class` | `string` | `''` | CSS class name |

## Usage Examples

### Basic Filtering Fields

```svelte
<script lang="ts">
  import { CriteriaField, TextEditor } from '@ticatec/uniface-element';
  
  let searchCriteria = {
    name: '',
    email: '',
    department: ''
  };
</script>

<CriteriaField size="x20" label="Name">
  <TextEditor 
    variant="outlined" 
    bind:value={searchCriteria.name} 
    placeholder="Enter name to search"
  />
</CriteriaField>

<CriteriaField size="x25" label="Email">
  <TextEditor 
    variant="outlined" 
    bind:value={searchCriteria.email} 
    placeholder="Enter email address"
  />
</CriteriaField>

<CriteriaField size="x30" label="Department">
  <TextEditor 
    variant="outlined" 
    bind:value={searchCriteria.department} 
    placeholder="Enter department name"
  />
</CriteriaField>
```

### Different Sizes of Filtering Fields

```svelte
<script lang="ts">
  import { CriteriaField, TextEditor, NumberRange, DateRange } from '@ticatec/uniface-element';
  
  interface SearchCriteria {
    name: string;
    ageFrom: number | null;
    ageTo: number | null;
    dobFrom: Date | null;
    dobTo: Date | null;
    department: string;
    position: string;
  }
  
  let criteria: SearchCriteria = {
    name: '',
    ageFrom: null,
    ageTo: null,
    dobFrom: null,
    dobTo: null,
    department: '',
    position: ''
  };
</script>

<div class="criteria-container">
  <h3>Employee Search Criteria</h3>
  
  <!-- Small size field -->
  <CriteriaField size="x15" label="ID">
    <TextEditor variant="outlined" bind:value={criteria.name} />
  </CriteriaField>
  
  <!-- Standard size field -->
  <CriteriaField size="x20" label="Name">
    <TextEditor 
      variant="outlined" 
      bind:value={criteria.name}
      placeholder="Enter full name or use * wildcard"
    />
  </CriteriaField>
  
  <!-- Medium size field -->
  <CriteriaField size="x25" label="Age Range">
    <NumberRange 
      variant="outlined"
      bind:fromValue={criteria.ageFrom}
      bind:toValue={criteria.ageTo}
      min={18}
      max={65}
    />
  </CriteriaField>
  
  <!-- Large size field -->
  <CriteriaField size="x30" label="Birth Date">
    <DateRange 
      variant="outlined"
      bind:fromValue={criteria.dobFrom}
      bind:toValue={criteria.dobTo}
    />
  </CriteriaField>
  
  <!-- Extra large size field -->
  <CriteriaField size="x35" label="Department">
    <TextEditor 
      variant="outlined" 
      bind:value={criteria.department}
      placeholder="Enter department name"
    />
  </CriteriaField>
  
  <!-- Maximum size field -->
  <CriteriaField size="x40" label="Position">
    <TextEditor 
      variant="outlined" 
      bind:value={criteria.position}
      placeholder="Enter position title"
    />
  </CriteriaField>
</div>

<style>
  .criteria-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .criteria-container h3 {
    margin-bottom: 20px;
    color: #495057;
  }
</style>
```

### Custom Label Styles

```svelte
<script lang="ts">
  import { CriteriaField, TextEditor, OptionsSelect } from '@ticatec/uniface-element';
  
  let searchData = {
    keyword: '',
    category: '',
    status: ''
  };
  
  const categoryOptions = [
    { code: 'all', text: 'All Categories' },
    { code: 'electronics', text: 'Electronics' },
    { code: 'clothing', text: 'Clothing' },
    { code: 'books', text: 'Books' }
  ];
  
  const statusOptions = [
    { code: 'active', text: 'Active' },
    { code: 'inactive', text: 'Inactive' },
    { code: 'pending', text: 'Pending' }
  ];
</script>

<div class="search-form">
  <h3>Product Search</h3>
  
  <!-- Important field label -->
  <CriteriaField 
    size="x25" 
    label="Keyword" 
    label$style="color: #dc3545; font-weight: 600;"
    labelSuffix="*:"
  >
    <TextEditor 
      variant="outlined" 
      bind:value={searchData.keyword}
      placeholder="Enter product keywords"
    />
  </CriteriaField>
  
  <!-- Regular field label -->
  <CriteriaField 
    size="x30" 
    label="Category"
    label$style="color: #28a745; font-weight: 500;"
  >
    <OptionsSelect 
      variant="outlined"
      options={categoryOptions}
      keyField="code"
      textField="text"
      bind:value={searchData.category}
    />
  </CriteriaField>
  
  <!-- Status field label -->
  <CriteriaField 
    size="x25" 
    label="Status"
    label$style="color: #6f42c1; font-style: italic;"
    labelSuffix=":"
  >
    <OptionsSelect 
      variant="outlined"
      options={statusOptions}
      keyField="code"
      textField="text"
      bind:value={searchData.status}
    />
  </CriteriaField>
</div>

<style>
  .search-form {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
  }
  
  .search-form h3 {
    margin-bottom: 20px;
    color: #495057;
    text-align: center;
  }
</style>
```

### Long Label Text Handling

```svelte
<script lang="ts">
  import { CriteriaField, TextEditor, DateRange } from '@ticatec/uniface-element';
  
  let advancedCriteria = {
    employeeIdOrName: '',
    workStartDate: null as Date | null,
    workEndDate: null as Date | null,
    projectName: ''
  };
</script>

<div class="advanced-search">
  <h3>Advanced Search Form</h3>
  
  <!-- Long label with automatic ellipsis -->
  <CriteriaField 
    size="x25" 
    label="Employee ID or Name (supports fuzzy search and wildcards)"
  >
    <TextEditor 
      variant="outlined" 
      bind:value={advancedCriteria.employeeIdOrName}
      placeholder="Enter employee ID or name"
    />
  </CriteriaField>
  
  <!-- Long label in larger container -->
  <CriteriaField 
    size="x35" 
    label="Work Date Range (includes hire and termination date filtering)"
  >
    <DateRange 
      variant="outlined"
      bind:fromValue={advancedCriteria.workStartDate}
      bind:toValue={advancedCriteria.workEndDate}
    />
  </CriteriaField>
  
  <!-- Custom label style to avoid ellipsis -->
  <CriteriaField 
    size="x30" 
    label="Project Name or Number"
    label$style="font-size: 12px; line-height: 1.2; white-space: normal;"
  >
    <TextEditor 
      variant="outlined" 
      bind:value={advancedCriteria.projectName}
      placeholder="Enter project information"
    />
  </CriteriaField>
</div>

<style>
  .advanced-search {
    max-width: 700px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .advanced-search h3 {
    margin-bottom: 25px;
    color: #495057;
    border-bottom: 2px solid #007bff;
    padding-bottom: 10px;
  }
</style>
```

### Combined with Other Components

```svelte
<script lang="ts">
  import { CriteriaField, TextEditor, NumberRange, OptionsSelect, CheckBox, DatePicker } from '@ticatec/uniface-element';
  
  interface ProductSearchCriteria {
    name: string;
    category: string;
    priceFrom: number | null;
    priceTo: number | null;
    inStock: boolean;
    releaseDate: Date | null;
    brand: string;
  }
  
  let productCriteria: ProductSearchCriteria = {
    name: '',
    category: '',
    priceFrom: null,
    priceTo: null,
    inStock: false,
    releaseDate: null,
    brand: ''
  };
  
  const categories = [
    { code: '', text: 'All' },
    { code: 'electronics', text: 'Electronics' },
    { code: 'books', text: 'Books' },
    { code: 'clothing', text: 'Clothing' }
  ];
  
  const brands = [
    { code: '', text: 'All Brands' },
    { code: 'apple', text: 'Apple' },
    { code: 'samsung', text: 'Samsung' },
    { code: 'sony', text: 'Sony' }
  ];
  
  const handleSearch = (): void => {
    console.log('Search criteria:', productCriteria);
  };
  
  const handleReset = (): void => {
    productCriteria = {
      name: '',
      category: '',
      priceFrom: null,
      priceTo: null,
      inStock: false,
      releaseDate: null,
      brand: ''
    };
  };
</script>

<div class="product-search-form">
  <h2>Product Search</h2>
  
  <div class="criteria-grid">
    <CriteriaField size="x30" label="Product Name">
      <TextEditor 
        variant="outlined" 
        bind:value={productCriteria.name}
        placeholder="Enter product name keywords"
      />
    </CriteriaField>
    
    <CriteriaField size="x25" label="Category">
      <OptionsSelect 
        variant="outlined"
        options={categories}
        keyField="code"
        textField="text"
        bind:value={productCriteria.category}
      />
    </CriteriaField>
    
    <CriteriaField size="x30" label="Price Range">
      <NumberRange 
        variant="outlined"
        bind:fromValue={productCriteria.priceFrom}
        bind:toValue={productCriteria.priceTo}
        min={0}
        precision={2}
      />
    </CriteriaField>
    
    <CriteriaField size="x25" label="Brand">
      <OptionsSelect 
        variant="outlined"
        options={brands}
        keyField="code"
        textField="text"
        bind:value={productCriteria.brand}
      />
    </CriteriaField>
    
    <CriteriaField size="x25" label="Release Date">
      <DatePicker 
        variant="outlined"
        bind:value={productCriteria.releaseDate}
      />
    </CriteriaField>
    
    <CriteriaField size="x20" label="Stock Status">
      <CheckBox 
        label="In stock only"
        bind:value={productCriteria.inStock}
      />
    </CriteriaField>
  </div>
  
  <div class="search-actions">
    <button type="button" class="btn-secondary" on:click={handleReset}>
      Reset
    </button>
    <button type="button" class="btn-primary" on:click={handleSearch}>
      Search
    </button>
  </div>
</div>

<style>
  .product-search-form {
    max-width: 900px;
    margin: 0 auto;
    padding: 30px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .product-search-form h2 {
    margin-bottom: 30px;
    color: #333;
    text-align: center;
    font-size: 24px;
  }
  
  .criteria-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .search-actions {
    display: flex;
    gap: 15px;
    justify-content: center;
    padding-top: 20px;
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
</style>
```

## Size Specifications

| Size | Description | Use Case |
|------|-------------|----------|
| `''` (default) | Auto-fit width | Flexible layout |
| `x15` | Minimum width | ID, numbers, short fields |
| `x20` | Small width | Names, codes, short text |
| `x25` | Standard width | Common text fields |
| `x30` | Medium width | Longer text or range selections |
| `x35` | Large width | Complex input controls |
| `x40` | Maximum width | Long text or composite controls |

## Label Suffix

```svelte
<!-- Default colon suffix -->
<CriteriaField label="Name">
  <TextEditor />
</CriteriaField>

<!-- Custom suffix -->
<CriteriaField label="Required Field" labelSuffix="*:">
  <TextEditor />
</CriteriaField>

<!-- No suffix -->
<CriteriaField label="Option" labelSuffix="">
  <CheckBox label="Enable" />
</CriteriaField>
```

## Style Customization

```css
/* Custom criteria field container */
:global(.uniface-filter-field) {
  margin-bottom: 16px;
}

/* Field container styles */
:global(.uniface-filter-field .field-container) {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Label styles */
:global(.uniface-filter-field .field-label) {
  flex-shrink: 0;
  font-weight: 500;
  color: #495057;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Field content styles */
:global(.uniface-filter-field .field) {
  flex: 1;
  min-width: 0;
}

/* Size customization */
:global(.uniface-filter-field.x20 .field-label) {
  width: 120px;
}

:global(.uniface-filter-field.x30 .field-label) {
  width: 150px;
}

/* Responsive styles */
@media (max-width: 768px) {
  :global(.uniface-filter-field .field-container) {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
  
  :global(.uniface-filter-field .field-label) {
    width: auto !important;
  }
}
```

## Best Practices

### 1. Choose Appropriate Field Sizes
```svelte
<!-- Use small sizes for short fields -->
<CriteriaField size="x15" label="ID">
  <TextEditor />
</CriteriaField>

<!-- Use medium sizes for standard fields -->
<CriteriaField size="x25" label="Name">
  <TextEditor />
</CriteriaField>

<!-- Use large sizes for complex controls -->
<CriteriaField size="x35" label="Date Range">
  <DateRange />
</CriteriaField>
```

### 2. Label Text Handling
```svelte
<!-- Concise and clear labels -->
<CriteriaField label="Name">
  <TextEditor />
</CriteriaField>

<!-- Consider line wrapping for long labels -->
<CriteriaField 
  label="Employee Name or ID"
  label$style="white-space: normal; line-height: 1.2;"
>
  <TextEditor />
</CriteriaField>
```

### 3. Filter Form Layout
```svelte
<div class="criteria-form">
  <div class="criteria-row">
    <CriteriaField size="x25" label="Keyword">
      <TextEditor />
    </CriteriaField>
    
    <CriteriaField size="x25" label="Category">
      <OptionsSelect />
    </CriteriaField>
  </div>
  
  <div class="criteria-actions">
    <button>Search</button>
    <button>Reset</button>
  </div>
</div>
```

## Component Advantages

1. **Professional Filter Layout** - Specifically designed layout component for criteria filtering forms
2. **Flexible Size Control** - Multiple preset sizes to accommodate different field requirements
3. **Customizable Label Styles** - Full customization support for label text and styles
4. **Responsive Friendly** - Automatic layout adaptation across different screen sizes
5. **Easy Integration** - Perfect compatibility with various form controls
6. **Consistent Design** - Unified visual styles for enhanced user experience