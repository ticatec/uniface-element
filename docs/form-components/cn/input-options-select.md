# InputOptionsSelect 组件

带输入和异步搜索功能的选择组件。

## 类型定义

```typescript
interface LoaderResult<T = any> {
  list: T[];
  hasMore: boolean;
}

type LazyLoader<T = any> = (keyword: string, pageNo: number) => Promise<LoaderResult<T>>;
```

## 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | 外观变体 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `readonly` | `boolean` | `false` | 是否只读 |
| `compact` | `boolean` | `false` | 是否紧凑模式 |
| `text` | `string` | `''` | 显示文本 |
| `value` | `T | null` | `null` | 选中的值 |
| `keyField` | `string` | `'code'` | 值字段名 |
| `textField` | `string` | `'text'` | 显示字段名 |
| `menu$height` | `number` | `0` | 下拉菜单高度 |
| `placeholder` | `string` | `''` | 占位符文本 |
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | 显示模式 |
| `itemRender` | `ComponentType` | `null` | 自定义选项渲染组件 |
| `lazyLoader` | `LazyLoader<T>` | - | 异步数据加载器 |
| `style` | `string` | `''` | 自定义样式 |
| `onChange` | `OnChangeHandler<T | null>` | - | 值变化回调 |

## 使用示例

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
  
  // 用户搜索
  const searchUsers: LazyLoader<User> = async (keyword: string, pageNo: number): Promise<LoaderResult<User>> => {
    const response: Response = await fetch(`/api/users/search?q=${encodeURIComponent(keyword)}&page=${pageNo}`);
    const data = await response.json();
    return {
      list: data.users,
      hasMore: data.hasMore
    };
  };
  
  // 产品搜索
  const searchProducts: LazyLoader<Product> = async (keyword: string, pageNo: number): Promise<LoaderResult<Product>> => {
    // 模拟API延迟
    await new Promise<void>(resolve => setTimeout(resolve, 300));
    
    const mockProducts: Product[] = [
      { code: 'P001', text: 'iPhone 15 Pro', category: '手机', price: 7999 },
      { code: 'P002', text: 'MacBook Air M2', category: '笔记本', price: 8999 },
      { code: 'P003', text: 'iPad Pro 12.9', category: '平板', price: 6999 }
    ].filter((p: Product): boolean => p.text.toLowerCase().includes(keyword.toLowerCase()));
    
    return {
      list: mockProducts,
      hasMore: false
    };
  };
  
  const handleUserChange = (user: User): void => {
    selectedUser = user;
    console.log('选择的用户：', user);
  };
  
  const handleProductChange = (product: Product): void => {
    selectedProduct = product;
    console.log('选择的产品：', product);
  };
</script>

<!-- 用户搜索选择 -->
<InputOptionsSelect 
  placeholder="请输入用户名搜索"
  lazyLoader={searchUsers}
  keyField="id"
  textField="name"
  onChange={handleUserChange}
/>

<!-- 产品搜索选择 -->
<InputOptionsSelect 
  placeholder="请输入产品名称搜索"
  lazyLoader={searchProducts}
  keyField="code"
  textField="text"
  onChange={handleProductChange}
/>
```

## 高级用法

### 自定义选项渲染
```svelte
<script lang="ts">
  import type { ComponentType } from 'svelte';
  import UserItemRenderer from './UserItemRenderer.svelte';
  
  const searchUsersWithDetails: LazyLoader<User> = async (keyword: string, pageNo: number): Promise<LoaderResult<User>> => {
    const response: Response = await fetch(`/api/users/search-detailed?q=${keyword}&page=${pageNo}`);
    return await response.json();
  };
</script>

<InputOptionsSelect 
  placeholder="搜索用户"
  lazyLoader={searchUsersWithDetails}
  keyField="id"
  textField="name"
  itemRender={UserItemRenderer}
  onChange={handleUserChange}
/>

<!-- UserItemRenderer.svelte -->
<script lang="ts">
  interface User {
    id: string;
    name: string;
    email: string;
    department: string;
    avatar: string;
  }
  
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

### 带缓存的搜索
```svelte
<script lang="ts">
  interface SearchCache {
    [key: string]: {
      data: any[];
      timestamp: number;
    };
  }
  
  let searchCache: SearchCache = {};
  const cacheTimeout: number = 5 * 60 * 1000; // 5分钟缓存
  
  const cachedSearchLoader: LazyLoader = async (keyword: string, pageNo: number): Promise<LoaderResult> => {
    const cacheKey: string = `${keyword}-${pageNo}`;
    const cached = searchCache[cacheKey];
    
    // 检查缓存
    if (cached && Date.now() - cached.timestamp < cacheTimeout) {
      console.log('使用缓存数据');
      return {
        list: cached.data,
        hasMore: false
      };
    }
    
    // 从API获取数据
    const response: Response = await fetch(`/api/search?q=${keyword}&page=${pageNo}`);
    const result: LoaderResult = await response.json();
    
    // 缓存结果
    searchCache[cacheKey] = {
      data: result.list,
      timestamp: Date.now()
    };
    
    return result;
  };
</script>
```

## 最佳实践

### 1. 防抖搜索
组件内部已经实现了防抖机制，默认延迟500ms后执行搜索。

### 2. 错误处理
```svelte
<script lang="ts">
  const robustSearchLoader: LazyLoader = async (keyword: string, pageNo: number): Promise<LoaderResult> => {
    try {
      const response: Response = await fetch(`/api/search?q=${keyword}&page=${pageNo}`);
      
      if (!response.ok) {
        throw new Error(`搜索失败: ${response.status}`);
      }
      
      return await response.json();
    } catch (error: unknown) {
      console.error('搜索出错：', error);
      return {
        list: [],
        hasMore: false
      };
    }
  };
</script>
```

### 3. 分页加载
```svelte
<script lang="ts">
  const paginatedLoader: LazyLoader = async (keyword: string, pageNo: number): Promise<LoaderResult> => {
    const pageSize: number = 20;
    const response: Response = await fetch(
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