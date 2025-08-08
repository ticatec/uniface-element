# SearchBox Component

A versatile search input component that provides a clean interface for text-based queries and filtering, featuring built-in search icons, clear functionality, and support for international text input methods.

## Overview

The SearchBox component offers a polished search experience with Google Material Design icons, automatic clear functionality, and comprehensive input method support for international users. It provides a consistent interface for implementing search and filter functionality across applications, with built-in focus management and composition event handling for multi-byte character input.

## Installation

```typescript
import SearchBox from '@ticatec/uniface-element/SearchBox';
import type { OnChangeHandler } from '@ticatec/uniface-element/SearchBox';
```

## Basic Usage

```svelte
<script lang="ts">
  import SearchBox from '@ticatec/uniface-element/SearchBox';

  let searchQuery: string | null = null;

  function handleSearch(query: string | null) {
    console.log('Search query:', query);
  }
</script>

<SearchBox 
  bind:value={searchQuery}
  onChange={handleSearch}
  placeholder="Search..."
/>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | Visual styling variant |
| `compact` | `boolean` | `false` | Enable compact layout for dense forms |
| `style` | `string` | `''` | Custom inline styles |
| `value` | `string \| null` | `null` | Current search text value (bindable) |
| `disabled` | `boolean` | `false` | Disable input interaction |
| `onChange` | `OnChangeHandler<string \| null>` | `null` | Change event handler |
| `placeholder` | `string \| null` | `null` | Placeholder text |

## Methods

| Method | Description |
|--------|-------------|
| `focus()` | Programmatically focus the search input |

## Type Definitions

```typescript
/**
 * Change event handler type
 */
type OnChangeHandler<T> = (value: T) => void;
```

## Features

- **Built-in Search Icon**: Google Material Design search icon for clear visual indication
- **Auto-Clear Functionality**: Clear button appears when text is entered
- **International Support**: Input method composition support for multi-byte characters
- **Focus Management**: Programmatic focus control for better UX
- **Consistent Styling**: Matches other form components with variant support
- **Standard Input Behavior**: Standard HTML input functionality with basic keyboard support

## Usage Examples

### Product Search Interface

```svelte
<script lang="ts">
  import SearchBox from '@ticatec/uniface-element/SearchBox';

  let searchQuery: string | null = null;
  
  // Mock product data
  let allProducts = [
    { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 129.99, brand: 'AudioTech' },
    { id: 2, name: 'Smart Watch', category: 'Electronics', price: 299.99, brand: 'TechWear' },
    { id: 3, name: 'Laptop Stand', category: 'Accessories', price: 49.99, brand: 'DeskPro' },
    { id: 4, name: 'USB-C Cable', category: 'Accessories', price: 19.99, brand: 'ConnectPlus' },
    { id: 5, name: 'Bluetooth Speaker', category: 'Electronics', price: 79.99, brand: 'SoundWave' },
    { id: 6, name: 'Phone Case', category: 'Accessories', price: 24.99, brand: 'ProtectAll' },
    { id: 7, name: 'Wireless Charger', category: 'Electronics', price: 34.99, brand: 'PowerUp' }
  ];

  let filteredProducts = [];
  let isSearching = false;

  // Debounced search function
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
    }, 300); // 300ms debounce delay
  }

  // Initial load
  filteredProducts = allProducts;

  // Reactive search
  $: performSearch(searchQuery);

  function clearSearch() {
    searchQuery = null;
  }

  function handleProductClick(product) {
    console.log('Selected product:', product);
    alert(`Selected: ${product.name} - $${product.price}`);
  }
</script>

<div class="product-search">
  <header class="search-header">
    <h2>Product Catalog</h2>
    <p>Search through our product inventory</p>
  </header>

  <div class="search-controls">
    <SearchBox
      bind:value={searchQuery}
      placeholder="Search products, categories, or brands..."
      variant="outlined"
      style="width: 100%; max-width: 500px;"
    />
    
    {#if searchQuery}
      <div class="search-info">
        <span class="search-results">
          {isSearching ? 'Searching...' : `${filteredProducts.length} products found`}
        </span>
        <button class="clear-search-btn" on:click={clearSearch}>
          Clear Search
        </button>
      </div>
    {/if}
  </div>

  <div class="products-grid">
    {#if isSearching}
      <div class="loading-state">
        <div class="loading-spinner">🔍</div>
        <p>Searching products...</p>
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
            <span class="product-price">${product.price}</span>
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
        <h3>No products found</h3>
        <p>We couldn't find any products matching "{searchQuery}"</p>
        <button class="reset-search-btn" on:click={clearSearch}>
          View All Products
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

### User Directory Search

```svelte
<script lang="ts">
  import SearchBox from '@ticatec/uniface-element/SearchBox';

  let searchQuery: string | null = null;
  let searchBoxRef: any;

  // Mock user data
  let allUsers = [
    { id: 1, name: 'Alice Johnson', email: 'alice.johnson@company.com', department: 'Engineering', role: 'Senior Developer', status: 'Active' },
    { id: 2, name: 'Bob Smith', email: 'bob.smith@company.com', department: 'Marketing', role: 'Marketing Manager', status: 'Active' },
    { id: 3, name: 'Carol Davis', email: 'carol.davis@company.com', department: 'Sales', role: 'Sales Representative', status: 'On Leave' },
    { id: 4, name: 'David Wilson', email: 'david.wilson@company.com', department: 'HR', role: 'HR Specialist', status: 'Active' },
    { id: 5, name: 'Emma Brown', email: 'emma.brown@company.com', department: 'Engineering', role: 'Tech Lead', status: 'Remote' },
    { id: 6, name: 'Frank Miller', email: 'frank.miller@company.com', department: 'Finance', role: 'Accountant', status: 'Active' }
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

  // Initial load
  filteredUsers = allUsers;

  // Reactive search
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

  // Keyboard shortcut for search focus
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
    <h2>Employee Directory</h2>
    <p>Search and browse company employees</p>
    <div class="keyboard-hint">
      <kbd>Ctrl</kbd> + <kbd>K</kbd> to focus search
    </div>
  </header>

  <div class="search-section">
    <div class="search-input-container">
      <SearchBox
        bind:this={searchBoxRef}
        bind:value={searchQuery}
        placeholder="Search employees..."
        variant="outlined"
        style="width: 100%;"
      />
    </div>

    <div class="search-options">
      <label>Search in:</label>
      <select bind:value={searchMode} class="search-mode-select">
        <option value="all">All fields</option>
        <option value="name">Name only</option>
        <option value="email">Email only</option>
        <option value="department">Department only</option>
      </select>
      
      {#if searchQuery || selectedUser}
        <button class="reset-btn" on:click={resetSearch}>Reset</button>
      {/if}
    </div>
  </div>

  <div class="directory-content">
    <div class="users-list">
      <div class="list-header">
        <h3>Search Results</h3>
        <span class="result-count">{filteredUsers.length} user{filteredUsers.length === 1 ? '' : 's'}</span>
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
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div class="user-info">
              <div class="user-name">{user.name}</div>
              <div class="user-email">{user.email}</div>
              <div class="user-role">{user.role}</div>
              <div class="user-department">{user.department}</div>
            </div>
            <div class="user-status">
              <span class="status-badge status-{user.status.toLowerCase().replace(' ', '-')}">{user.status}</span>
            </div>
          </div>
        {/each}

        {#if filteredUsers.length === 0}
          <div class="no-users-found">
            <h4>No employees found</h4>
            <p>
              {#if searchQuery}
                No employees match your search for "{searchQuery}"
              {:else}
                No employees in the directory
              {/if}
            </p>
            {#if searchQuery}
              <button class="clear-search-btn" on:click={() => searchQuery = null}>Clear Search</button>
            {/if}
          </div>
        {/if}
      </div>
    </div>

    {#if selectedUser}
      <div class="user-details">
        <div class="details-header">
          <h3>Employee Details</h3>
          <button class="close-details-btn" on:click={() => selectedUser = null}>×</button>
        </div>
        
        <div class="details-content">
          <div class="detail-avatar">
            {selectedUser.name.split(' ').map(n => n[0]).join('')}
          </div>
          
          <div class="detail-info">
            <h4>{selectedUser.name}</h4>
            <div class="detail-row">
              <span class="detail-label">Email:</span>
              <span class="detail-value">
                <a href="mailto:{selectedUser.email}">{selectedUser.email}</a>
              </span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Role:</span>
              <span class="detail-value">{selectedUser.role}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Department:</span>
              <span class="detail-value">{selectedUser.department}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Status:</span>
              <span class="detail-value">
                <span class="status-badge status-{selectedUser.status.toLowerCase().replace(' ', '-')}">{selectedUser.status}</span>
              </span>
            </div>
          </div>
          
          <div class="detail-actions">
            <button class="action-btn primary">Send Message</button>
            <button class="action-btn secondary">View Profile</button>
            <button class="action-btn secondary">Schedule Meeting</button>
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

  .status-active {
    background: #d4edda;
    color: #155724;
  }

  .status-remote {
    background: #cce5ff;
    color: #004085;
  }

  .status-on-leave {
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

### Advanced Filtering with Multiple Search Boxes

```svelte
<script lang="ts">
  import SearchBox from '@ticatec/uniface-element/SearchBox';

  // Multiple search criteria
  let titleSearch: string | null = null;
  let authorSearch: string | null = null;
  let tagSearch: string | null = null;

  // Mock article data
  let allArticles = [
    {
      id: 1,
      title: 'Getting Started with Svelte',
      author: 'John Developer',
      category: 'Tutorial',
      tags: ['svelte', 'javascript', 'frontend'],
      publishDate: '2024-03-01',
      readTime: 8,
      excerpt: 'Learn the basics of Svelte framework and build your first application.'
    },
    {
      id: 2,
      title: 'Advanced TypeScript Patterns',
      author: 'Jane Coder',
      category: 'Advanced',
      tags: ['typescript', 'patterns', 'advanced'],
      publishDate: '2024-02-28',
      readTime: 12,
      excerpt: 'Explore advanced TypeScript patterns for better code organization.'
    },
    {
      id: 3,
      title: 'CSS Grid Layout Guide',
      author: 'Mike Designer',
      category: 'CSS',
      tags: ['css', 'grid', 'layout', 'responsive'],
      publishDate: '2024-03-05',
      readTime: 6,
      excerpt: 'Master CSS Grid for modern responsive layouts.'
    },
    {
      id: 4,
      title: 'Database Optimization Tips',
      author: 'Sarah Admin',
      category: 'Backend',
      tags: ['database', 'optimization', 'performance'],
      publishDate: '2024-02-25',
      readTime: 15,
      excerpt: 'Improve your database performance with these optimization techniques.'
    },
    {
      id: 5,
      title: 'React vs Svelte Comparison',
      author: 'Alex Framework',
      category: 'Comparison',
      tags: ['react', 'svelte', 'comparison', 'frontend'],
      publishDate: '2024-03-03',
      readTime: 10,
      excerpt: 'A detailed comparison between React and Svelte frameworks.'
    }
  ];

  let filteredArticles = [];
  let activeFiltersCount = 0;

  function performSearch() {
    let results = allArticles;

    // Filter by title
    if (titleSearch && titleSearch.trim()) {
      const titleTerm = titleSearch.toLowerCase().trim();
      results = results.filter(article =>
        article.title.toLowerCase().includes(titleTerm)
      );
    }

    // Filter by author
    if (authorSearch && authorSearch.trim()) {
      const authorTerm = authorSearch.toLowerCase().trim();
      results = results.filter(article =>
        article.author.toLowerCase().includes(authorTerm)
      );
    }

    // Filter by tags
    if (tagSearch && tagSearch.trim()) {
      const tagTerm = tagSearch.toLowerCase().trim();
      results = results.filter(article =>
        article.tags.some(tag => tag.toLowerCase().includes(tagTerm)) ||
        article.category.toLowerCase().includes(tagTerm)
      );
    }

    filteredArticles = results;

    // Count active filters
    activeFiltersCount = [titleSearch, authorSearch, tagSearch]
      .filter(search => search && search.trim()).length;
  }

  // Initial load
  filteredArticles = allArticles;

  // Reactive search
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
    console.log('Reading article:', article.title);
    alert(`Opening: ${article.title}\nBy ${article.author} • ${article.readTime} min read`);
  }

  // Get unique authors and tags for suggestions
  const allAuthors = [...new Set(allArticles.map(a => a.author))];
  const allTags = [...new Set(allArticles.flatMap(a => a.tags))];
  const allCategories = [...new Set(allArticles.map(a => a.category))];
</script>

<div class="article-search">
  <header class="search-header">
    <h2>Article Library</h2>
    <p>Search and filter through our knowledge base</p>
  </header>

  <div class="search-filters">
    <div class="filter-row">
      <div class="filter-group">
        <label>Search by Title</label>
        <SearchBox
          bind:value={titleSearch}
          placeholder="Enter article title..."
          variant="outlined"
          compact={true}
        />
      </div>

      <div class="filter-group">
        <label>Search by Author</label>
        <SearchBox
          bind:value={authorSearch}
          placeholder="Enter author name..."
          variant="outlined"
          compact={true}
        />
      </div>

      <div class="filter-group">
        <label>Search by Tags/Category</label>
        <SearchBox
          bind:value={tagSearch}
          placeholder="Enter tags or category..."
          variant="outlined"
          compact={true}
        />
      </div>
    </div>

    <div class="filter-actions">
      <div class="filter-info">
        {#if activeFiltersCount > 0}
          <span class="active-filters">{activeFiltersCount} filter{activeFiltersCount === 1 ? '' : 's'} active</span>
          <button class="clear-all-btn" on:click={clearAllFilters}>Clear All</button>
        {:else}
          <span class="no-filters">No filters applied</span>
        {/if}
      </div>

      <div class="results-info">
        <span class="result-count">{filteredArticles.length} article{filteredArticles.length === 1 ? '' : 's'} found</span>
      </div>
    </div>

    <!-- Quick filter suggestions -->
    <div class="quick-suggestions">
      <div class="suggestion-group">
        <span class="suggestion-label">Popular Authors:</span>
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
        <span class="suggestion-label">Popular Tags:</span>
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
              <span class="article-author">By {article.author}</span>
              <span class="article-date">{new Date(article.publishDate).toLocaleDateString()}</span>
              <span class="article-read-time">{article.readTime} min read</span>
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
        <h3>No articles found</h3>
        <p>
          {#if activeFiltersCount > 0}
            No articles match your current search criteria.
            <br>Try adjusting your filters or clearing some search terms.
          {:else}
            No articles available in the library.
          {/if}
        </p>
        {#if activeFiltersCount > 0}
          <button class="reset-btn" on:click={clearAllFilters}>Clear All Filters</button>
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

## Styling

The SearchBox component uses the following CSS classes:

```css
.uniface-common-editor {
  /* Main input container */
  position: relative;
}

.uniface-common-editor .leading-icon {
  /* Search icon container */
  display: flex;
  align-items: center;
  padding: 0 8px;
  color: var(--uniface-editor-icon-color, #6c757d);
}

.uniface-common-editor .action-icon {
  /* Clear button styling */
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.uniface-common-editor .action-icon:hover {
  opacity: 1;
}
```

## API Reference

### SearchBox Component Props

```typescript
interface SearchBoxProps {
  variant?: '' | 'plain' | 'outlined' | 'filled';  // Visual styling variant
  compact?: boolean;                                // Compact layout mode
  style?: string;                                   // Custom inline styles
  value: string | null;                             // Search text value
  disabled?: boolean;                               // Disable input
  onChange?: OnChangeHandler<string | null>;        // Change event handler
  placeholder?: string | null;                      // Placeholder text
}
```

### Methods

```typescript
interface SearchBox {
  focus(): void;  // Programmatically focus the input
}
```

## Best Practices

1. **Debouncing** - Implement debounced search to avoid excessive API calls
2. **Loading States** - Show loading indicators during search operations
3. **Empty States** - Provide helpful messages when no results are found
4. **Keyboard Shortcuts** - Implement application-level keyboard shortcuts for search focus (like Ctrl+K)
5. **Search Scope** - Clearly indicate what fields are being searched
6. **Clear Functionality** - Always provide easy way to clear search (component has built-in clear button)
7. **Mobile UX** - Ensure touch-friendly interaction on mobile devices
8. **Performance** - Optimize search algorithms for large datasets
9. **Input Composition** - Component handles international text input (Chinese, Japanese, etc.) correctly
10. **Visual Feedback** - Highlight matching terms in search results when possible