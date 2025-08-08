# LookupEditor 组件

查找编辑器组件，通过模态对话框进行复杂的查找和选择操作。

## 类型定义

```typescript
type OnActionHandler = () => void;
```

## 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | 外观变体 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `readonly` | `boolean` | `false` | 是否只读 |
| `compact` | `boolean` | `false` | 是否紧凑模式 |
| `mandatory` | `boolean` | `false` | 是否必填 |
| `value` | `T | null` | `null` | 选中的值 |
| `text` | `string` | `''` | 显示文本 |
| `placeholder` | `string` | `''` | 占位符文本 |
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | 显示模式 |
| `style` | `string` | `''` | 自定义样式 |
| `onChange` | `OnChangeHandler<T | null>` | - | 值变化回调 |
| `onAction` | `OnActionHandler` | - | 查找动作回调 |

## 使用示例

```svelte
<script lang="ts">
  import LookupEditor from '@ticatec/uniface-element/LookupEditor';
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
  
  // 客户查找
  const handleCustomerLookup = (): void => {
    showCustomerModal = true;
  };
  
  const handleCustomerSelect = (customer: Customer): void => {
    selectedCustomer = customer.id;
    customerText = `${customer.name} (${customer.code})`;
    showCustomerModal = false;
  };
  
  const handleCustomerChange = (value: string | null): void => {
    selectedCustomer = value;
  };
  
  // 产品查找
  const handleProductLookup = (): void => {
    showProductModal = true;
  };
  
  const handleProductSelect = (product: Product): void => {
    selectedProduct = product.id;
    productText = `${product.name} - ¥${product.price}`;
    showProductModal = false;
  };
  
  const handleProductChange = (value: string | null): void => {
    selectedProduct = value;
  };
</script>

<!-- 客户查找 -->
<LookupEditor 
  placeholder="请选择客户"
  bind:value={selectedCustomer}
  bind:text={customerText}
  onAction={handleCustomerLookup}
  onChange={handleCustomerChange}
/>

<!-- 产品查找 -->
<LookupEditor 
  placeholder="请选择产品"
  mandatory={true}
  bind:value={selectedProduct}
  bind:text={productText}
  onAction={handleProductLookup}
  onChange={handleProductChange}
/>

<!-- 客户查找模态框 -->
{#if showCustomerModal}
  <CustomerLookupModal 
    onSelect={handleCustomerSelect}
    onClose={() => showCustomerModal = false}
  />
{/if}

<!-- 产品查找模态框 -->
{#if showProductModal}
  <ProductLookupModal 
    onSelect={handleProductSelect}
    onClose={() => showProductModal = false}
  />
{/if}
```

## 高级用法

### 多步骤查找流程
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
    
    // 重置供应商产品选择
    selectedSupplierProduct = null;
    supplierProductText = '';
  };
  
  const handleSupplierProductLookup = (): void => {
    if (!selectedSupplier) {
      alert('请先选择供应商');
      return;
    }
    showSupplierProductModal = true;
  };
  
  const handleSupplierProductSelect = (product: SupplierProduct): void => {
    selectedSupplierProduct = product.id;
    supplierProductText = `${product.name} - ¥${product.price}`;
    showSupplierProductModal = false;
  };
</script>

<div class="lookup-flow">
  <div class="form-field">
    <label>供应商：</label>
    <LookupEditor 
      placeholder="请选择供应商"
      bind:value={selectedSupplier}
      bind:text={supplierText}
      onAction={handleSupplierLookup}
    />
  </div>
  
  <div class="form-field">
    <label>供应商产品：</label>
    <LookupEditor 
      placeholder="请选择产品"
      disabled={!selectedSupplier}
      bind:value={selectedSupplierProduct}
      bind:text={supplierProductText}
      onAction={handleSupplierProductLookup}
    />
  </div>
</div>
```

### 带缓存的查找
```svelte
<script lang="ts">
  interface CacheEntry<T> {
    data: T;
    timestamp: number;
  }
  
  class LookupCache {
    private cache = new Map<string, CacheEntry<any>>();
    private ttl = 5 * 60 * 1000; // 5分钟缓存
    
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
    // 检查缓存
    const cachedUsers = cache.get('users');
    if (cachedUsers) {
      console.log('使用缓存的用户数据');
    }
    
    showUserModal = true;
  };
  
  interface User {
    id: string;
    name: string;
    email: string;
  }
  
  const handleUserSelect = (user: User): void => {
    selectedUser = user.id;
    userText = `${user.name} (${user.email})`;
    
    // 缓存用户数据
    cache.set(`user:${user.id}`, user);
    
    showUserModal = false;
  };
</script>
```

### 外部API集成
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
    const response: Response = await fetch(`/api/users/search?q=${encodeURIComponent(query)}&page=${page}`);
    if (!response.ok) {
      throw new Error('搜索用户失败');
    }
    return await response.json();
  };
  
  const handleApiUserLookup = (): void => {
    showApiUserModal = true;
  };
  
  const handleApiUserSelect = async (userId: number): Promise<void> => {
    isLoading = true;
    try {
      const response: Response = await fetch(`/api/users/${userId}`);
      const user: ApiUser = await response.json();
      
      selectedApiUser = user.id;
      apiUserText = `${user.name} - ${user.department}`;
      showApiUserModal = false;
    } catch (error: unknown) {
      console.error('获取用户详情失败：', error);
    } finally {
      isLoading = false;
    }
  };
</script>

<LookupEditor 
  placeholder="请选择API用户"
  disabled={isLoading}
  bind:value={selectedApiUser}
  bind:text={apiUserText}
  onAction={handleApiUserLookup}
/>

{#if isLoading}
  <div class="loading-indicator">加载中...</div>
{/if}
```

## 最佳实践

### 1. 提供清晰的显示文本
```typescript
interface DisplayItem {
  name: string;
  code: string;
  category: string;
}

const formatDisplayText = (item: DisplayItem): string => {
  return `${item.name} (${item.code}) - ${item.category}`;
};
```

### 2. 处理必填验证
```svelte
<script lang="ts">
  let value: string | null = null;
  let error: string = '';
  
  const validate = (): boolean => {
    if (!value) {
      error = '此字段为必填项';
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

### 3. 响应式模态框
```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  
  let isMobile: boolean = false;
  let showModal: boolean = false;
  
  const checkMobile = (): void => {
    isMobile = window.innerWidth < 768;
  };
  
  const handleSelect = (item: any): void => {
    // Handle selection logic
  };
  
  onMount((): (() => void) => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return (): void => window.removeEventListener('resize', checkMobile);
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