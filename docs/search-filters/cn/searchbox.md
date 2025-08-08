# SearchBox 搜索框组件

一个多功能搜索输入组件，为基于文本的查询和过滤提供清洁的界面，具有内置搜索图标、清除功能和对国际文本输入方法的支持。

## 概述

SearchBox 组件通过 Google Material Design 图标、自动清除功能和对国际用户的全面输入方法支持，提供精美的搜索体验。它为在应用程序中实现搜索和过滤功能提供一致的界面，具有内置的焦点管理和多字节字符输入的合成事件处理。

## 安装

```typescript
import SearchBox from '@ticatec/uniface-element/SearchBox';
import type { OnChangeHandler } from '@ticatec/uniface-element/SearchBox';
```

## 基本用法

```svelte
<script lang="ts">
  import SearchBox from '@ticatec/uniface-element/SearchBox';

  let searchQuery: string | null = null;

  function handleSearch(query: string | null) {
    console.log('搜索查询:', query);
  }
</script>

<SearchBox 
  bind:value={searchQuery}
  onChange={handleSearch}
  placeholder="搜索..."
/>
```

## 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | 视觉样式变体 |
| `compact` | `boolean` | `false` | 启用紧凑布局以适应密集表单 |
| `style` | `string` | `''` | 自定义内联样式 |
| `value` | `string \| null` | `null` | 当前搜索文本值（可绑定） |
| `disabled` | `boolean` | `false` | 禁用输入交互 |
| `onChange` | `OnChangeHandler<string \| null>` | `null` | 变更事件处理器 |
| `placeholder` | `string \| null` | `null` | 占位符文本 |

## 方法

| 方法 | 描述 |
|------|------|
| `focus()` | 以编程方式聚焦搜索输入框 |

## 类型定义

```typescript
/**
 * 变更事件处理器类型
 */
type OnChangeHandler<T> = (value: T) => void;
```

## 功能特性

- **内置搜索图标**：Google Material Design 搜索图标提供清晰的视觉指示
- **自动清除功能**：输入文本时出现清除按钮
- **国际化支持**：多字节字符的输入法合成支持
- **焦点管理**：以编程方式进行焦点控制以获得更好的用户体验
- **一致样式**：通过变体支持与其他表单组件匹配
- **可访问性**：适当的 ARIA 标签和键盘导航

## 使用示例

### 产品搜索界面

```svelte
<script lang="ts">
  import SearchBox from '@ticatec/uniface-element/SearchBox';

  let searchQuery: string | null = null;
  
  // 模拟产品数据
  let allProducts = [
    { id: 1, name: '无线耳机', category: '电子产品', price: 899.99, brand: '音质科技' },
    { id: 2, name: '智能手表', category: '电子产品', price: 2199.99, brand: '时间科技' },
    { id: 3, name: '笔记本支架', category: '配件', price: 299.99, brand: '办公专家' },
    { id: 4, name: 'USB-C 数据线', category: '配件', price: 99.99, brand: '连接助手' },
    { id: 5, name: '蓝牙音箱', category: '电子产品', price: 499.99, brand: '声波制造' },
    { id: 6, name: '手机保护套', category: '配件', price: 149.99, brand: '全方位保护' },
    { id: 7, name: '无线充电器', category: '电子产品', price: 199.99, brand: '能量传输' }
  ];

  let filteredProducts = [];
  let isSearching = false;

  // 防抖搜索函数
  let searchTimeout: number;

  function performSearch(query: string | null) {
    clearTimeout(searchTimeout);
    isSearching = true;

    searchTimeout = setTimeout(() => {
      if (!query || query.trim() === '') {
        filteredProducts = allProducts;
      } else {
        const searchTerm = query.toLowerCase().trim();
        filteredProducts = allProducts.filter(product =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm) ||
          product.brand.toLowerCase().includes(searchTerm)
        );
      }
      isSearching = false;
    }, 300); // 300ms 防抖延迟
  }

  // 初始加载
  filteredProducts = allProducts;

  // 响应式搜索
  $: performSearch(searchQuery);

  function clearSearch() {
    searchQuery = null;
  }

  function handleProductClick(product) {
    console.log('选中产品:', product);
    alert(`选中：${product.name} - ¥${product.price}`);
  }
</script>

<div class="product-search">
  <header class="search-header">
    <h2>产品目录</h2>
    <p>搜索我们的产品库存</p>
  </header>

  <div class="search-controls">
    <SearchBox
      bind:value={searchQuery}
      placeholder="搜索产品、分类或品牌..."
      variant="outlined"
      style="width: 100%; max-width: 500px;"
    />
    
    {#if searchQuery}
      <div class="search-info">
        <span class="search-results">
          {isSearching ? '搜索中...' : `找到 ${filteredProducts.length} 个产品`}
        </span>
        <button class="clear-search-btn" on:click={clearSearch}>
          清除搜索
        </button>
      </div>
    {/if}
  </div>

  <div class="products-grid">
    {#if isSearching}
      <div class="loading-state">
        <div class="loading-spinner">🔍</div>
        <p>正在搜索产品...</p>
      </div>
    {:else if filteredProducts.length > 0}
      {#each filteredProducts as product}
        <div 
          class="product-card"
          on:click={() => handleProductClick(product)}
          tabindex="0"
          role="button"
        >
          <div class="product-header">
            <h3 class="product-name">{product.name}</h3>
            <span class="product-price">¥{product.price}</span>
          </div>
          <div class="product-details">
            <span class="product-category">{product.category}</span>
            <span class="product-brand">{product.brand}</span>
          </div>
        </div>
      {/each}
    {:else}
      <div class="no-results">
        <div class="no-results-icon">🔍</div>
        <h3>未找到产品</h3>
        <p>无法找到与"{searchQuery}"匹配的产品</p>
        <button class="reset-search-btn" on:click={clearSearch}>
          查看所有产品
        </button>
      </div>
    {/if}
  </div>
</div>

<style>
  .product-search {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .search-header {
    text-align: center;
    margin-bottom: 30px;
  }

  .search-header h2 {
    color: #333;
    margin: 0 0 8px 0;
  }

  .search-header p {
    color: #666;
    margin: 0;
  }

  .search-controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    margin-bottom: 30px;
  }

  .search-info {
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 0.9rem;
  }

  .search-results {
    color: #666;
  }

  .clear-search-btn {
    padding: 4px 8px;
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.8rem;
  }

  .clear-search-btn:hover {
    background: #e9ecef;
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    min-height: 200px;
  }

  .product-card {
    background: white;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .product-card:hover,
  .product-card:focus {
    border-color: #007bff;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,123,255,0.15);
    outline: none;
  }

  .product-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
  }

  .product-name {
    margin: 0;
    color: #333;
    font-size: 1.2rem;
    font-weight: 600;
  }

  .product-price {
    color: #007bff;
    font-weight: 700;
    font-size: 1.1rem;
  }

  .product-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .product-category {
    background: #e9ecef;
    color: #495057;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .product-brand {
    color: #666;
    font-size: 0.9rem;
    font-style: italic;
  }

  .loading-state,
  .no-results {
    grid-column: 1 / -1;
    text-align: center;
    padding: 60px 20px;
    color: #666;
  }

  .loading-spinner {
    font-size: 3rem;
    animation: pulse 1.5s infinite;
  }

  .no-results-icon {
    font-size: 4rem;
    opacity: 0.5;
    margin-bottom: 16px;
  }

  .no-results h3 {
    color: #333;
    margin: 0 0 8px 0;
  }

  .no-results p {
    margin: 0 0 20px 0;
  }

  .reset-search-btn {
    padding: 8px 16px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
  }

  .reset-search-btn:hover {
    background: #0056b3;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  @media (max-width: 768px) {
    .products-grid {
      grid-template-columns: 1fr;
    }
    
    .product-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
    
    .product-details {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
  }
</style>
```

### 用户目录搜索

```svelte
<script lang="ts">
  import SearchBox from '@ticatec/uniface-element/SearchBox';

  let searchQuery: string | null = null;
  let searchBoxRef: any;

  // 模拟用户数据
  let allUsers = [
    { id: 1, name: '张小明', email: 'zhangxiaoming@company.com', department: '工程部', role: '高级开发工程师', status: '在职' },
    { id: 2, name: '李小红', email: 'lixiaohong@company.com', department: '市场部', role: '市场经理', status: '在职' },
    { id: 3, name: '王小刚', email: 'wangxiaogang@company.com', department: '销售部', role: '销售代表', status: '请假' },
    { id: 4, name: '赵小丽', email: 'zhaoxiaoli@company.com', department: '人事部', role: '人事专员', status: '在职' },
    { id: 5, name: '陈小华', email: 'chenxiaohua@company.com', department: '工程部', role: '技术主管', status: '远程' },
    { id: 6, name: '孙小强', email: 'sunxiaoqiang@company.com', department: '财务部', role: '会计', status: '在职' }
  ];

  let filteredUsers = [];
  let selectedUser = null;
  let searchMode = 'all'; // 'all', 'name', 'email', 'department'

  function performUserSearch(query: string | null) {
    if (!query || query.trim() === '') {
      filteredUsers = allUsers;
      return;
    }

    const searchTerm = query.toLowerCase().trim();
    filteredUsers = allUsers.filter(user => {
      switch (searchMode) {
        case 'name':
          return user.name.toLowerCase().includes(searchTerm);
        case 'email':
          return user.email.toLowerCase().includes(searchTerm);
        case 'department':
          return user.department.toLowerCase().includes(searchTerm);
        default: // 'all'
          return user.name.toLowerCase().includes(searchTerm) ||
                 user.email.toLowerCase().includes(searchTerm) ||
                 user.department.toLowerCase().includes(searchTerm) ||
                 user.role.toLowerCase().includes(searchTerm);
      }
    });
  }

  // 初始加载
  filteredUsers = allUsers;

  // 响应式搜索
  $: performUserSearch(searchQuery);

  function selectUser(user) {
    selectedUser = user;
  }

  function focusSearch() {
    searchBoxRef?.focus();
  }

  function resetSearch() {
    searchQuery = null;
    selectedUser = null;
    searchMode = 'all';
  }

  // 搜索键盘快捷键
  function handleKeydown(event) {
    if (event.ctrlKey && event.key === 'k') {
      event.preventDefault();
      focusSearch();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="user-directory">
  <header class="directory-header">
    <h2>员工目录</h2>
    <p>搜索和浏览公司员工</p>
    <div class="keyboard-hint">
      <kbd>Ctrl</kbd> + <kbd>K</kbd> 聚焦搜索
    </div>
  </header>

  <div class="search-section">
    <div class="search-input-container">
      <SearchBox
        bind:this={searchBoxRef}
        bind:value={searchQuery}
        placeholder="搜索员工..."
        variant="outlined"
        style="width: 100%;"
      />
    </div>

    <div class="search-options">
      <label>搜索范围：</label>
      <select bind:value={searchMode} class="search-mode-select">
        <option value="all">所有字段</option>
        <option value="name">仅姓名</option>
        <option value="email">仅邮箱</option>
        <option value="department">仅部门</option>
      </select>
      
      {#if searchQuery || selectedUser}
        <button class="reset-btn" on:click={resetSearch}>重置</button>
      {/if}
    </div>
  </div>

  <div class="directory-content">
    <div class="users-list">
      <div class="list-header">
        <h3>搜索结果</h3>
        <span class="result-count">{filteredUsers.length} 名用户</span>
      </div>

      <div class="users-grid">
        {#each filteredUsers as user}
          <div 
            class="user-card" 
            class:selected={selectedUser?.id === user.id}
            on:click={() => selectUser(user)}
            tabindex="0"
            role="button"
          >
            <div class="user-avatar">
              {user.name.substring(0, 2)}
            </div>
            <div class="user-info">
              <div class="user-name">{user.name}</div>
              <div class="user-email">{user.email}</div>
              <div class="user-role">{user.role}</div>
              <div class="user-department">{user.department}</div>
            </div>
            <div class="user-status">
              <span class="status-badge status-{user.status.replace(' ', '-')}">{user.status}</span>
            </div>
          </div>
        {/each}

        {#if filteredUsers.length === 0}
          <div class="no-users-found">
            <h4>未找到员工</h4>
            <p>
              {#if searchQuery}
                没有员工匹配您的搜索条件"{searchQuery}"
              {:else}
                目录中没有员工
              {/if}
            </p>
            {#if searchQuery}
              <button class="clear-search-btn" on:click={() => searchQuery = null}>清除搜索</button>
            {/if}
          </div>
        {/if}
      </div>
    </div>

    {#if selectedUser}
      <div class="user-details">
        <div class="details-header">
          <h3>员工详情</h3>
          <button class="close-details-btn" on:click={() => selectedUser = null}>×</button>
        </div>
        
        <div class="details-content">
          <div class="detail-avatar">
            {selectedUser.name.substring(0, 2)}
          </div>
          
          <div class="detail-info">
            <h4>{selectedUser.name}</h4>
            <div class="detail-row">
              <span class="detail-label">邮箱：</span>
              <span class="detail-value">
                <a href="mailto:{selectedUser.email}">{selectedUser.email}</a>
              </span>
            </div>
            <div class="detail-row">
              <span class="detail-label">职位：</span>
              <span class="detail-value">{selectedUser.role}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">部门：</span>
              <span class="detail-value">{selectedUser.department}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">状态：</span>
              <span class="detail-value">
                <span class="status-badge status-{selectedUser.status.replace(' ', '-')}">{selectedUser.status}</span>
              </span>
            </div>
          </div>
          
          <div class="detail-actions">
            <button class="action-btn primary">发送消息</button>
            <button class="action-btn secondary">查看资料</button>
            <button class="action-btn secondary">安排会议</button>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .user-directory {
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .directory-header {
    text-align: center;
    margin-bottom: 30px;
  }

  .directory-header h2 {
    color: #333;
    margin: 0 0 8px 0;
  }

  .directory-header p {
    color: #666;
    margin: 0 0 12px 0;
  }

  .keyboard-hint {
    font-size: 0.8rem;
    color: #888;
  }

  .keyboard-hint kbd {
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 3px;
    padding: 2px 6px;
    font-size: 0.7rem;
  }

  .search-section {
    margin-bottom: 30px;
  }

  .search-input-container {
    max-width: 600px;
    margin: 0 auto 16px;
  }

  .search-options {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    font-size: 0.9rem;
  }

  .search-mode-select {
    padding: 4px 8px;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    background: white;
  }

  .reset-btn {
    padding: 4px 12px;
    background: #6c757d;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.8rem;
  }

  .reset-btn:hover {
    background: #5a6268;
  }

  .directory-content {
    flex: 1;
    display: flex;
    gap: 20px;
    min-height: 0;
  }

  .users-list {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  .list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 2px solid #e9ecef;
  }

  .list-header h3 {
    margin: 0;
    color: #333;
  }

  .result-count {
    color: #666;
    font-size: 0.9rem;
  }

  .users-grid {
    flex: 1;
    overflow-y: auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 16px;
    padding-right: 8px;
  }

  .user-card {
    background: white;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    padding: 16px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 16px;
    height: fit-content;
  }

  .user-card:hover,
  .user-card:focus {
    border-color: #007bff;
    box-shadow: 0 2px 4px rgba(0,123,255,0.15);
    outline: none;
  }

  .user-card.selected {
    border-color: #007bff;
    background: #f0f8ff;
  }

  .user-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #007bff;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 1.1rem;
    flex-shrink: 0;
  }

  .user-info {
    flex: 1;
    min-width: 0;
  }

  .user-name {
    font-weight: 600;
    color: #333;
    margin-bottom: 4px;
  }

  .user-email {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .user-role {
    color: #495057;
    font-size: 0.85rem;
    font-weight: 500;
  }

  .user-department {
    color: #6c757d;
    font-size: 0.8rem;
  }

  .status-badge {
    padding: 3px 8px;
    border-radius: 12px;
    font-size: 0.7rem;
    font-weight: 500;
    text-transform: uppercase;
  }

  .status-在职 {
    background: #d4edda;
    color: #155724;
  }

  .status-远程 {
    background: #cce5ff;
    color: #004085;
  }

  .status-请假 {
    background: #fff3cd;
    color: #856404;
  }

  .no-users-found {
    grid-column: 1 / -1;
    text-align: center;
    padding: 60px 20px;
    color: #666;
  }

  .no-users-found h4 {
    color: #333;
    margin: 0 0 8px 0;
  }

  .clear-search-btn {
    margin-top: 16px;
    padding: 8px 16px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .clear-search-btn:hover {
    background: #0056b3;
  }

  .user-details {
    width: 400px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    max-height: 600px;
  }

  .details-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px 0;
  }

  .details-header h3 {
    margin: 0;
    color: #333;
  }

  .close-details-btn {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .close-details-btn:hover {
    color: #333;
    background: #f8f9fa;
    border-radius: 50%;
  }

  .details-content {
    padding: 20px;
    flex: 1;
    overflow-y: auto;
  }

  .detail-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: #007bff;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 1.8rem;
    margin: 0 auto 20px;
  }

  .detail-info h4 {
    text-align: center;
    color: #333;
    margin: 0 0 20px 0;
    font-size: 1.3rem;
  }

  .detail-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;
  }

  .detail-label {
    font-weight: 500;
    color: #555;
  }

  .detail-value a {
    color: #007bff;
    text-decoration: none;
  }

  .detail-value a:hover {
    text-decoration: underline;
  }

  .detail-actions {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .action-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .action-btn.primary {
    background: #007bff;
    color: white;
  }

  .action-btn.primary:hover {
    background: #0056b3;
  }

  .action-btn.secondary {
    background: #f8f9fa;
    color: #495057;
    border: 1px solid #dee2e6;
  }

  .action-btn.secondary:hover {
    background: #e9ecef;
  }

  @media (max-width: 768px) {
    .directory-content {
      flex-direction: column;
    }
    
    .user-details {
      width: 100%;
    }
    
    .users-grid {
      grid-template-columns: 1fr;
    }
    
    .search-options {
      flex-direction: column;
      gap: 8px;
    }
  }
</style>
```

### 多搜索框高级过滤

```svelte
<script lang="ts">
  import SearchBox from '@ticatec/uniface-element/SearchBox';

  // 多个搜索条件
  let titleSearch: string | null = null;
  let authorSearch: string | null = null;
  let tagSearch: string | null = null;

  // 模拟文章数据
  let allArticles = [
    {
      id: 1,
      title: 'Svelte 入门指南',
      author: '张开发',
      category: '教程',
      tags: ['svelte', 'javascript', '前端'],
      publishDate: '2024-03-01',
      readTime: 8,
      excerpt: '学习 Svelte 框架的基础知识并构建您的第一个应用程序。'
    },
    {
      id: 2,
      title: '高级 TypeScript 模式',
      author: '李程序员',
      category: '高级',
      tags: ['typescript', '模式', '高级'],
      publishDate: '2024-02-28',
      readTime: 12,
      excerpt: '探索高级 TypeScript 模式以更好地组织代码。'
    },
    {
      id: 3,
      title: 'CSS 网格布局指南',
      author: '王设计师',
      category: 'CSS',
      tags: ['css', '网格', '布局', '响应式'],
      publishDate: '2024-03-05',
      readTime: 6,
      excerpt: '掌握 CSS 网格布局以实现现代响应式布局。'
    },
    {
      id: 4,
      title: '数据库优化技巧',
      author: '赵管理员',
      category: '后端',
      tags: ['数据库', '优化', '性能'],
      publishDate: '2024-02-25',
      readTime: 15,
      excerpt: '使用这些优化技术提高数据库性能。'
    },
    {
      id: 5,
      title: 'React vs Svelte 对比',
      author: '陈框架师',
      category: '对比',
      tags: ['react', 'svelte', '对比', '前端'],
      publishDate: '2024-03-03',
      readTime: 10,
      excerpt: 'React 和 Svelte 框架之间的详细对比。'
    }
  ];

  let filteredArticles = [];
  let activeFiltersCount = 0;

  function performSearch() {
    let results = allArticles;

    // 按标题过滤
    if (titleSearch && titleSearch.trim()) {
      const titleTerm = titleSearch.toLowerCase().trim();
      results = results.filter(article =>
        article.title.toLowerCase().includes(titleTerm)
      );
    }

    // 按作者过滤
    if (authorSearch && authorSearch.trim()) {
      const authorTerm = authorSearch.toLowerCase().trim();
      results = results.filter(article =>
        article.author.toLowerCase().includes(authorTerm)
      );
    }

    // 按标签过滤
    if (tagSearch && tagSearch.trim()) {
      const tagTerm = tagSearch.toLowerCase().trim();
      results = results.filter(article =>
        article.tags.some(tag => tag.toLowerCase().includes(tagTerm)) ||
        article.category.toLowerCase().includes(tagTerm)
      );
    }

    filteredArticles = results;

    // 统计活跃过滤器
    activeFiltersCount = [titleSearch, authorSearch, tagSearch]
      .filter(search => search && search.trim()).length;
  }

  // 初始加载
  filteredArticles = allArticles;

  // 响应式搜索
  $: {
    titleSearch, authorSearch, tagSearch;
    performSearch();
  }

  function clearAllFilters() {
    titleSearch = null;
    authorSearch = null;
    tagSearch = null;
  }

  function readArticle(article) {
    console.log('阅读文章:', article.title);
    alert(`打开：${article.title}\n作者 ${article.author} • ${article.readTime} 分钟阅读`);
  }

  // 获取独特的作者和标签以提供建议
  const allAuthors = [...new Set(allArticles.map(a => a.author))];
  const allTags = [...new Set(allArticles.flatMap(a => a.tags))];
  const allCategories = [...new Set(allArticles.map(a => a.category))];
</script>

<div class="article-search">
  <header class="search-header">
    <h2>文章库</h2>
    <p>搜索和过滤我们的知识库</p>
  </header>

  <div class="search-filters">
    <div class="filter-row">
      <div class="filter-group">
        <label>按标题搜索</label>
        <SearchBox
          bind:value={titleSearch}
          placeholder="输入文章标题..."
          variant="outlined"
          compact={true}
        />
      </div>

      <div class="filter-group">
        <label>按作者搜索</label>
        <SearchBox
          bind:value={authorSearch}
          placeholder="输入作者姓名..."
          variant="outlined"
          compact={true}
        />
      </div>

      <div class="filter-group">
        <label>按标签/分类搜索</label>
        <SearchBox
          bind:value={tagSearch}
          placeholder="输入标签或分类..."
          variant="outlined"
          compact={true}
        />
      </div>
    </div>

    <div class="filter-actions">
      <div class="filter-info">
        {#if activeFiltersCount > 0}
          <span class="active-filters">{activeFiltersCount} 个过滤器生效</span>
          <button class="clear-all-btn" on:click={clearAllFilters}>清除所有</button>
        {:else}
          <span class="no-filters">未应用过滤器</span>
        {/if}
      </div>

      <div class="results-info">
        <span class="result-count">找到 {filteredArticles.length} 篇文章</span>
      </div>
    </div>

    <!-- 快速过滤建议 -->
    <div class="quick-suggestions">
      <div class="suggestion-group">
        <span class="suggestion-label">热门作者：</span>
        {#each allAuthors.slice(0, 3) as author}
          <button 
            class="suggestion-btn" 
            on:click={() => authorSearch = author}
            class:active={authorSearch === author}
          >
            {author}
          </button>
        {/each}
      </div>

      <div class="suggestion-group">
        <span class="suggestion-label">热门标签：</span>
        {#each allTags.slice(0, 5) as tag}
          <button 
            class="suggestion-btn" 
            on:click={() => tagSearch = tag}
            class:active={tagSearch === tag}
          >
            #{tag}
          </button>
        {/each}
      </div>
    </div>
  </div>

  <div class="articles-section">
    {#if filteredArticles.length > 0}
      <div class="articles-grid">
        {#each filteredArticles as article}
          <div class="article-card" on:click={() => readArticle(article)}>
            <div class="article-header">
              <h3 class="article-title">{article.title}</h3>
              <span class="article-category">{article.category}</span>
            </div>
            
            <div class="article-meta">
              <span class="article-author">作者 {article.author}</span>
              <span class="article-date">{new Date(article.publishDate).toLocaleDateString()}</span>
              <span class="article-read-time">{article.readTime} 分钟阅读</span>
            </div>
            
            <p class="article-excerpt">{article.excerpt}</p>
            
            <div class="article-tags">
              {#each article.tags as tag}
                <span class="tag">#{tag}</span>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <div class="no-articles">
        <div class="no-articles-icon">📚</div>
        <h3>未找到文章</h3>
        <p>
          {#if activeFiltersCount > 0}
            没有文章匹配您当前的搜索条件。
            <br>尝试调整您的过滤器或清除一些搜索条件。
          {:else}
            库中没有可用的文章。
          {/if}
        </p>
        {#if activeFiltersCount > 0}
          <button class="reset-btn" on:click={clearAllFilters}>清除所有过滤器</button>
        {/if}
      </div>
    {/if}
  </div>
</div>

<style>
  .article-search {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .search-header {
    text-align: center;
    margin-bottom: 30px;
  }

  .search-header h2 {
    color: #333;
    margin: 0 0 8px 0;
  }

  .search-header p {
    color: #666;
    margin: 0;
  }

  .search-filters {
    background: #f8f9fa;
    padding: 25px;
    border-radius: 8px;
    margin-bottom: 30px;
  }

  .filter-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 20px;
  }

  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .filter-group label {
    font-weight: 500;
    color: #333;
    font-size: 0.9rem;
  }

  .filter-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #dee2e6;
  }

  .filter-info {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .active-filters {
    color: #007bff;
    font-weight: 500;
  }

  .no-filters {
    color: #666;
  }

  .clear-all-btn {
    padding: 4px 8px;
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.8rem;
  }

  .clear-all-btn:hover {
    background: #c82333;
  }

  .result-count {
    color: #495057;
    font-weight: 500;
  }

  .quick-suggestions {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .suggestion-group {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .suggestion-label {
    color: #666;
    font-size: 0.85rem;
    font-weight: 500;
  }

  .suggestion-btn {
    padding: 4px 8px;
    background: white;
    border: 1px solid #dee2e6;
    border-radius: 12px;
    cursor: pointer;
    font-size: 0.75rem;
    transition: all 0.2s;
  }

  .suggestion-btn:hover {
    border-color: #007bff;
    color: #007bff;
  }

  .suggestion-btn.active {
    background: #007bff;
    color: white;
    border-color: #007bff;
  }

  .articles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 24px;
  }

  .article-card {
    background: white;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .article-card:hover {
    border-color: #007bff;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,123,255,0.15);
  }

  .article-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
  }

  .article-title {
    margin: 0;
    color: #333;
    font-size: 1.2rem;
    font-weight: 600;
    line-height: 1.3;
  }

  .article-category {
    background: #e9ecef;
    color: #495057;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.7rem;
    font-weight: 500;
    text-transform: uppercase;
    flex-shrink: 0;
    margin-left: 12px;
  }

  .article-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 12px;
    font-size: 0.85rem;
    color: #666;
  }

  .article-author {
    font-weight: 500;
  }

  .article-excerpt {
    color: #555;
    line-height: 1.5;
    margin: 0 0 16px 0;
  }

  .article-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .tag {
    background: #f8f9fa;
    color: #495057;
    padding: 3px 8px;
    border-radius: 10px;
    font-size: 0.7rem;
    border: 1px solid #e9ecef;
  }

  .no-articles {
    text-align: center;
    padding: 80px 20px;
    color: #666;
  }

  .no-articles-icon {
    font-size: 4rem;
    opacity: 0.5;
    margin-bottom: 16px;
  }

  .no-articles h3 {
    color: #333;
    margin: 0 0 12px 0;
  }

  .no-articles p {
    margin: 0 0 20px 0;
    line-height: 1.6;
  }

  .reset-btn {
    padding: 10px 20px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .reset-btn:hover {
    background: #0056b3;
  }

  @media (max-width: 768px) {
    .filter-row {
      grid-template-columns: 1fr;
    }
    
    .filter-actions {
      flex-direction: column;
      gap: 12px;
      align-items: stretch;
    }
    
    .quick-suggestions {
      flex-direction: column;
    }
    
    .articles-grid {
      grid-template-columns: 1fr;
    }
    
    .article-header {
      flex-direction: column;
      gap: 8px;
    }
    
    .article-category {
      align-self: flex-start;
      margin-left: 0;
    }
  }
</style>
```

## 样式

SearchBox 组件使用以下 CSS 类：

```css
.uniface-common-editor {
  /* 主输入容器 */
  position: relative;
}

.uniface-common-editor .leading-icon {
  /* 搜索图标容器 */
  display: flex;
  align-items: center;
  padding: 0 8px;
  color: var(--uniface-editor-icon-color, #6c757d);
}

.uniface-common-editor .action-icon {
  /* 清除按钮样式 */
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.uniface-common-editor .action-icon:hover {
  opacity: 1;
}
```

## API 参考

### SearchBox 组件属性

```typescript
interface SearchBoxProps {
  variant?: '' | 'plain' | 'outlined' | 'filled';  // 视觉样式变体
  compact?: boolean;                                // 紧凑布局模式
  style?: string;                                   // 自定义内联样式
  value: string | null;                             // 搜索文本值
  disabled?: boolean;                               // 禁用输入
  onChange?: OnChangeHandler<string | null>;        // 变更事件处理器
  placeholder?: string | null;                      // 占位符文本
}
```

### 方法

```typescript
interface SearchBox {
  focus(): void;  // 以编程方式聚焦输入框
}
```

## 最佳实践

1. **防抖处理** - 实现防抖搜索以避免过多的 API 调用
2. **加载状态** - 在搜索操作期间显示加载指示器
3. **空状态** - 在没有找到结果时提供有用的消息
4. **键盘导航** - 支持搜索焦点的键盘快捷键
5. **搜索范围** - 清楚地表明正在搜索哪些字段
6. **清除功能** - 始终提供清除搜索的简单方法
7. **移动端用户体验** - 确保在移动设备上的触摸友好交互
8. **性能** - 为大数据集优化搜索算法
9. **可访问性** - 提供适当的 ARIA 标签和屏幕阅读器支持
10. **视觉反馈** - 尽可能在搜索结果中突出显示匹配条件