# LookupEditor Component

Lookup editor component that performs complex lookup and selection operations through modal dialogs.

## Type Definitions

```typescript
type OnActionHandler = () => void;
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | Appearance variant |
| `disabled` | `boolean` | `false` | Whether disabled |
| `readonly` | `boolean` | `false` | Whether read-only |
| `compact` | `boolean` | `false` | Whether compact mode |
| `mandatory` | `boolean` | `false` | Whether required |
| `value` | `any` | `null` | Selected value |
| `text` | `string` | `''` | Display text |
| `placeholder` | `string` | `''` | Placeholder text |
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | Display mode |
| `style` | `string` | `''` | Custom styles |
| `onChange` | `OnChangeHandler<any>` | - | Value change callback |
| `onAction` | `OnActionHandler` | - | Lookup action callback |

## Usage Examples

```svelte
<script lang="ts">
  import { LookupEditor } from '@ticatec/uniface-element';
  import CustomerLookupModal from './CustomerLookupModal.svelte';
  import ProductLookupModal from './ProductLookupModal.svelte';
  
  interface Customer {
    id: string;
    name: string;
    code: string;
    email: string;
  }
  
  interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
  }
  
  let selectedCustomer: string | null = null;
  let customerText: string = '';
  let selectedProduct: string | null = null;
  let productText: string = '';
  let showCustomerModal: boolean = false;
  let showProductModal: boolean = false;
  
  // Customer lookup
  const handleCustomerLookup = (): void => {
    showCustomerModal = true;
  };
  
  const handleCustomerSelect = (customer: Customer): void => {
    selectedCustomer = customer.id;
    customerText = `${customer.name} (${customer.code})`;
    showCustomerModal = false;
  };
  
  const handleCustomerChange = (value: any): void => {
    selectedCustomer = value;
  };
  
  // Product lookup
  const handleProductLookup = (): void => {
    showProductModal = true;
  };
  
  const handleProductSelect = (product: Product): void => {
    selectedProduct = product.id;
    productText = `${product.name} - $${product.price}`;
    showProductModal = false;
  };
  
  const handleProductChange = (value: any): void => {
    selectedProduct = value;
  };
</script>

<!-- Customer lookup -->
<LookupEditor 
  placeholder="Please select customer"
  bind:value={selectedCustomer}
  bind:text={customerText}
  onAction={handleCustomerLookup}
  onChange={handleCustomerChange}
/>

<!-- Product lookup -->
<LookupEditor 
  placeholder="Please select product"
  mandatory={true}
  bind:value={selectedProduct}
  bind:text={productText}
  onAction={handleProductLookup}
  onChange={handleProductChange}
/>

<!-- Customer lookup modal -->
{#if showCustomerModal}
  <CustomerLookupModal 
    onSelect={handleCustomerSelect}
    onClose={() => showCustomerModal = false}
  />
{/if}

<!-- Product lookup modal -->
{#if showProductModal}
  <ProductLookupModal 
    onSelect={handleProductSelect}
    onClose={() => showProductModal = false}
  />
{/if}
```

## Advanced Usage

### Multi-step Lookup Flow
```svelte
<script lang="ts">
  interface Supplier {
    id: string;
    name: string;
    country: string;
  }
  
  interface SupplierProduct {
    id: string;
    name: string;
    supplier_id: string;
    price: number;
  }
  
  let selectedSupplier: string | null = null;
  let supplierText: string = '';
  let selectedSupplierProduct: string | null = null;
  let supplierProductText: string = '';
  let showSupplierModal: boolean = false;
  let showSupplierProductModal: boolean = false;
  
  const handleSupplierLookup = (): void => {
    showSupplierModal = true;
  };
  
  const handleSupplierSelect = (supplier: Supplier): void => {
    selectedSupplier = supplier.id;
    supplierText = `${supplier.name} (${supplier.country})`;
    showSupplierModal = false;
    
    // Reset supplier product selection
    selectedSupplierProduct = null;
    supplierProductText = '';
  };
  
  const handleSupplierProductLookup = (): void => {
    if (!selectedSupplier) {
      alert('Please select supplier first');
      return;
    }
    showSupplierProductModal = true;
  };
  
  const handleSupplierProductSelect = (product: SupplierProduct): void => {
    selectedSupplierProduct = product.id;
    supplierProductText = `${product.name} - $${product.price}`;
    showSupplierProductModal = false;
  };
</script>

<div class="lookup-flow">
  <div class="form-field">
    <label>Supplier:</label>
    <LookupEditor 
      placeholder="Please select supplier"
      bind:value={selectedSupplier}
      bind:text={supplierText}
      onAction={handleSupplierLookup}
    />
  </div>
  
  <div class="form-field">
    <label>Supplier Product:</label>
    <LookupEditor 
      placeholder="Please select product"
      disabled={!selectedSupplier}
      bind:value={selectedSupplierProduct}
      bind:text={supplierProductText}
      onAction={handleSupplierProductLookup}
    />
  </div>
</div>
```

### Lookup with Caching
```svelte
<script lang="ts">
  interface CacheEntry<T> {
    data: T;
    timestamp: number;
  }
  
  class LookupCache {
    private cache = new Map<string, CacheEntry<any>>();
    private ttl = 5 * 60 * 1000; // 5 minute cache
    
    get<T>(key: string): T | null {
      const entry = this.cache.get(key);
      if (!entry) return null;
      
      if (Date.now() - entry.timestamp > this.ttl) {
        this.cache.delete(key);
        return null;
      }
      
      return entry.data;
    }
    
    set<T>(key: string, data: T): void {
      this.cache.set(key, {
        data,
        timestamp: Date.now()
      });
    }
    
    clear(): void {
      this.cache.clear();
    }
  }
  
  const cache = new LookupCache();
  
  let selectedUser: string | null = null;
  let userText: string = '';
  let showUserModal: boolean = false;
  
  const handleUserLookup = (): void => {
    // Check cache
    const cachedUsers = cache.get('users');
    if (cachedUsers) {
      console.log('Using cached user data');
    }
    
    showUserModal = true;
  };
  
  const handleUserSelect = (user: any): void => {
    selectedUser = user.id;
    userText = `${user.name} (${user.email})`;
    
    // Cache user data
    cache.set(`user:${user.id}`, user);
    
    showUserModal = false;
  };
</script>
```

### External API Integration
```svelte
<script lang="ts">
  interface ApiResponse<T> {
    data: T[];
    total: number;
    page: number;
  }
  
  interface ApiUser {
    id: number;
    name: string;
    email: string;
    department: string;
  }
  
  let selectedApiUser: number | null = null;
  let apiUserText: string = '';
  let showApiUserModal: boolean = false;
  let isLoading: boolean = false;
  
  const searchUsers = async (query: string, page: number = 1): Promise<ApiResponse<ApiUser>> => {
    const response = await fetch(`/api/users/search?q=${encodeURIComponent(query)}&page=${page}`);
    if (!response.ok) {
      throw new Error('Failed to search users');
    }
    return response.json();
  };
  
  const handleApiUserLookup = (): void => {
    showApiUserModal = true;
  };
  
  const handleApiUserSelect = async (userId: number): Promise<void> => {
    isLoading = true;
    try {
      const response = await fetch(`/api/users/${userId}`);
      const user: ApiUser = await response.json();
      
      selectedApiUser = user.id;
      apiUserText = `${user.name} - ${user.department}`;
      showApiUserModal = false;
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    } finally {
      isLoading = false;
    }
  };
</script>

<LookupEditor 
  placeholder="Please select API user"
  disabled={isLoading}
  bind:value={selectedApiUser}
  bind:text={apiUserText}
  onAction={handleApiUserLookup}
/>

{#if isLoading}
  <div class="loading-indicator">Loading...</div>
{/if}
```

## Best Practices

### 1. Provide Clear Display Text
```typescript
const formatDisplayText = (item: any): string => {
  return `${item.name} (${item.code}) - ${item.category}`;
};
```

### 2. Handle Required Validation
```svelte
<script lang="ts">
  let value: string | null = null;
  let error: string = '';
  
  const validate = (): boolean => {
    if (!value) {
      error = 'This field is required';
      return false;
    }
    error = '';
    return true;
  };
</script>

<LookupEditor 
  mandatory={true}
  bind:value={value}
  onAction={handleLookup}
/>
{#if error}
  <div class="error-message">{error}</div>
{/if}
```

### 3. Responsive Modal Design
```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  
  let isMobile: boolean = false;
  
  const checkMobile = (): void => {
    isMobile = window.innerWidth < 768;
  };
  
  onMount(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  });
</script>

{#if showModal}
  <LookupModal 
    fullscreen={isMobile}
    onSelect={handleSelect}
    onClose={() => showModal = false}
  />
{/if}
```