# InputOptionsSelect Component

Selection component with input and async search functionality.

## Type Definitions

```typescript
type LazyLoader = (keyword: string, pageNo: number) => Promise<{
  list: Array<any>;
  hasMore: boolean;
}>;
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | Appearance variant |
| `disabled` | `boolean` | `false` | Whether disabled |
| `readonly` | `boolean` | `false` | Whether read-only |
| `compact` | `boolean` | `false` | Whether compact mode |
| `text` | `string` | `''` | Display text |
| `value` | `any` | `null` | Selected value |
| `keyField` | `string` | `'code'` | Value field name |
| `textField` | `string` | `'text'` | Display field name |
| `menu$height` | `number` | `0` | Dropdown menu height |
| `placeholder` | `string` | `''` | Placeholder text |
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | Display mode |
| `itemRender` | `any` | `null` | Custom option render component |
| `lazyLoader` | `LazyLoader` | - | Async data loader |
| `style` | `string` | `''` | Custom styles |
| `onChange` | `OnChangeHandler<any>` | - | Value change callback |

## Usage Examples

```svelte
<script lang="ts">
  import InputOptionsSelect, { type LazyLoader } from '@ticatec/uniface-element/InputOptionsSelect';
  
  interface User {
    id: string;
    name: string;
    email: string;
    department: string;
  }
  
  interface Product {
    code: string;
    text: string;
    category: string;
    price: number;
  }
  
  let selectedUser: User | null = null;
  let selectedProduct: Product | null = null;
  
  // User search
  const searchUsers: LazyLoader = async (keyword: string, pageNo: number) => {
    const response = await fetch(`/api/users/search?q=${encodeURIComponent(keyword)}&page=${pageNo}`);
    const data = await response.json();
    return {
      list: data.users,
      hasMore: data.hasMore
    };
  };
  
  // Product search
  const searchProducts: LazyLoader = async (keyword: string, pageNo: number) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const mockProducts: Product[] = [
      { code: 'P001', text: 'iPhone 15 Pro', category: 'Phone', price: 999 },
      { code: 'P002', text: 'MacBook Air M2', category: 'Laptop', price: 1299 },
      { code: 'P003', text: 'iPad Pro 12.9', category: 'Tablet', price: 899 }
    ].filter(p => p.text.toLowerCase().includes(keyword.toLowerCase()));
    
    return {
      list: mockProducts,
      hasMore: false
    };
  };
  
  const handleUserChange = (user: User): void => {
    selectedUser = user;
    console.log('Selected user:', user);
  };
  
  const handleProductChange = (product: Product): void => {
    selectedProduct = product;
    console.log('Selected product:', product);
  };
</script>

<!-- User search selection -->
<InputOptionsSelect 
  placeholder="Search for users..."
  lazyLoader={searchUsers}
  keyField="id"
  textField="name"
  onChange={handleUserChange}
/>

<!-- Product search selection -->
<InputOptionsSelect 
  placeholder="Search for products..."
  lazyLoader={searchProducts}
  keyField="code"
  textField="text"
  onChange={handleProductChange}
/>
```

## Advanced Usage

### Custom Option Rendering
```svelte
<script lang="ts">
  import UserItemRenderer from './UserItemRenderer.svelte';
  
  const searchUsersWithDetails: LazyLoader = async (keyword: string, pageNo: number) => {
    const response = await fetch(`/api/users/search-detailed?q=${keyword}&page=${pageNo}`);
    return response.json();
  };
</script>

<InputOptionsSelect 
  placeholder="Search users"
  lazyLoader={searchUsersWithDetails}
  keyField="id"
  textField="name"
  itemRender={UserItemRenderer}
  onChange={handleUserChange}
/>

<!-- UserItemRenderer.svelte -->
<script lang="ts">
  export let item: User;
</script>

<div class="user-item">
  <div class="user-avatar">
    <img src={item.avatar} alt={item.name} />
  </div>
  <div class="user-info">
    <div class="user-name">{item.name}</div>
    <div class="user-email">{item.email}</div>
    <div class="user-department">{item.department}</div>
  </div>
</div>
```

### Search with Caching
```svelte
<script lang="ts">
  interface SearchCache {
    [key: string]: {
      data: any[];
      timestamp: number;
    };
  }
  
  let searchCache: SearchCache = {};
  const cacheTimeout = 5 * 60 * 1000; // 5 minute cache
  
  const cachedSearchLoader: LazyLoader = async (keyword: string, pageNo: number) => {
    const cacheKey = `${keyword}-${pageNo}`;
    const cached = searchCache[cacheKey];
    
    // Check cache
    if (cached && Date.now() - cached.timestamp < cacheTimeout) {
      console.log('Using cached data');
      return {
        list: cached.data,
        hasMore: false
      };
    }
    
    // Fetch from API
    const response = await fetch(`/api/search?q=${keyword}&page=${pageNo}`);
    const result = await response.json();
    
    // Cache result
    searchCache[cacheKey] = {
      data: result.list,
      timestamp: Date.now()
    };
    
    return result;
  };
</script>
```

## Best Practices

### 1. Debounced Search
The component internally implements debouncing with a default delay of 500ms before executing search.

### 2. Error Handling
```svelte
<script lang="ts">
  const robustSearchLoader: LazyLoader = async (keyword: string, pageNo: number) => {
    try {
      const response = await fetch(`/api/search?q=${keyword}&page=${pageNo}`);
      
      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Search error:', error);
      return {
        list: [],
        hasMore: false
      };
    }
  };
</script>
```

### 3. Paginated Loading
```svelte
<script lang="ts">
  const paginatedLoader: LazyLoader = async (keyword: string, pageNo: number) => {
    const pageSize = 20;
    const response = await fetch(
      `/api/search?q=${keyword}&page=${pageNo}&size=${pageSize}`
    );
    
    const data = await response.json();
    
    return {
      list: data.items,
      hasMore: data.total > pageNo * pageSize
    };
  };
</script>
```