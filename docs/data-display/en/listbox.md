# ListBox Component

A versatile list display component that provides item selection, filtering, lazy loading, and multiple selection modes for displaying collections of data.

## Overview

The ListBox component offers a comprehensive solution for displaying lists of items with rich interaction capabilities. It supports single and multiple selection modes, real-time filtering, lazy loading for large datasets, and custom item rendering. Perfect for user selection interfaces, data browsers, and content management systems.

## Installation

```typescript
import ListBox from '@ticatec/uniface-element/ListBox';
import type { LazyLoader, FunFilter, LoadResult } from '@ticatec/uniface-element/ListBox';
```

## Basic Usage

```svelte
<script lang="ts">
  import ListBox from '@ticatec/uniface-element/ListBox';
  
  // Simple item renderer component
  const ItemRenderer = ({ item }) => `
    <div class="list-item">
      <h4>${item.title}</h4>
      <p>${item.description}</p>
    </div>
  `;

  let items = [
    { id: 1, title: 'Item 1', description: 'First item description' },
    { id: 2, title: 'Item 2', description: 'Second item description' },
    { id: 3, title: 'Item 3', description: 'Third item description' }
  ];

  let selectedItem = null;
</script>

<ListBox
  list={items}
  itemRender={ItemRenderer}
  selectMode="single"
  bind:selectedItem
/>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `readonly` | `boolean` | `false` | Make the list read-only |
| `style` | `string \| null` | `null` | Custom CSS styles for container |
| `header$style` | `string \| null` | `null` | Custom styles for header area |
| `footer$style` | `string \| null` | `null` | Custom styles for footer area |
| `list` | `Array<any>` | - | Array of items to display |
| `itemRender` | `any` | - | Component for rendering each item |
| `selectMode` | `'none' \| 'single' \| 'multiple'` | `'none'` | Selection behavior mode |
| `filter` | `FunFilter \| null` | `null` | Filter function for items |
| `lazyLoader` | `LazyLoader \| null` | `null` | Lazy loading configuration |
| `selectedItem` | `any` | `null` | Currently selected item (single mode) |
| `selectedList` | `Array<any>` | `[]` | Selected items (multiple mode) |
| `class` | `string` | `''` | Additional CSS class names |
| `item$props` | `any` | `null` | Additional props for item renderer |
| `onSelectChange` | `OnSelectChange` | `null` | Selection change callback |
| `onItemDblClick` | `OnItemDblClick` | `null` | Item double-click callback |
| `onItemClick` | `OnItemClick` | `null` | Item click callback |
| `title` | `string` | `null` | Header title |
| `round` | `boolean` | `false` | Apply rounded corners |

## Slots

| Slot | Description |
|------|-------------|
| `header` | Custom header content |
| `footer` | Custom footer content |
| `loadMoreIndicator` | Custom loading indicator for lazy loading |

## Type Definitions

```typescript
/**
 * Filter function for items
 */
export type FunFilter = (item: any, text: string) => boolean;

/**
 * Lazy loading result structure
 */
export interface LoadResult {
  hasMore: boolean;
  list: Array<any>;
}

/**
 * Lazy loader function
 */
export type LazyLoader = (text: string, pageNo: number) => Promise<LoadResult>;

/**
 * Event handler types
 */
type OnSelectChange = (item: any) => void;
type OnItemDblClick = (item: any) => void;
type OnItemClick = (item: any) => void;
```

## Usage Examples

### Single Selection List

```svelte
<script lang="ts">
  import ListBox from '@ticatec/uniface-element/ListBox';

  // Custom item renderer
  const UserRenderer = ({ item, selected }) => `
    <div class="user-item ${selected ? 'selected' : ''}">
      <div class="user-avatar">
        <img src="${item.avatar}" alt="${item.name}" width="32" height="32" />
      </div>
      <div class="user-info">
        <div class="user-name">${item.name}</div>
        <div class="user-role">${item.role}</div>
      </div>
    </div>
  `;

  let users = [
    { id: 1, name: 'Alice Johnson', role: 'Developer', avatar: '/avatars/alice.jpg' },
    { id: 2, name: 'Bob Smith', role: 'Designer', avatar: '/avatars/bob.jpg' },
    { id: 3, name: 'Carol Davis', role: 'Manager', avatar: '/avatars/carol.jpg' }
  ];

  let selectedUser = null;

  function handleUserSelect(user: any) {
    console.log('Selected user:', user);
  }
</script>

<ListBox
  title="Select User"
  list={users}
  itemRender={UserRenderer}
  selectMode="single"
  bind:selectedItem={selectedUser}
  onSelectChange={handleUserSelect}
  style="width: 300px; height: 400px; border: 1px solid #ddd;"
/>

<style>
  :global(.user-item) {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  :global(.user-item:hover) {
    background-color: #f8f9fa;
  }
  
  :global(.user-item.selected) {
    background-color: #e3f2fd;
  }
  
  :global(.user-avatar img) {
    border-radius: 50%;
  }
  
  :global(.user-name) {
    font-weight: 500;
    margin-bottom: 2px;
  }
  
  :global(.user-role) {
    font-size: 0.875rem;
    color: #666;
  }
</style>
```

### Multiple Selection List

```svelte
<script lang="ts">
  import ListBox from '@ticatec/uniface-element/ListBox';

  const TaskRenderer = ({ item }) => `
    <div class="task-item">
      <div class="task-title">${item.title}</div>
      <div class="task-meta">
        <span class="task-priority priority-${item.priority.toLowerCase()}">${item.priority}</span>
        <span class="task-due">Due: ${new Date(item.dueDate).toLocaleDateString()}</span>
      </div>
    </div>
  `;

  let tasks = [
    { id: 1, title: 'Review pull request', priority: 'High', dueDate: '2024-03-20' },
    { id: 2, title: 'Update documentation', priority: 'Medium', dueDate: '2024-03-22' },
    { id: 3, title: 'Fix minor bugs', priority: 'Low', dueDate: '2024-03-25' },
    { id: 4, title: 'Plan next sprint', priority: 'High', dueDate: '2024-03-18' }
  ];

  let selectedTasks = [];

  $: console.log('Selected tasks:', selectedTasks);
</script>

<ListBox
  title="Select Tasks"
  list={tasks}
  itemRender={TaskRenderer}
  selectMode="multiple"
  bind:selectedList={selectedTasks}
  style="width: 400px; height: 500px;"
  round={true}
/>

<div class="selection-summary">
  <p>Selected: {selectedTasks.length} task(s)</p>
  {#if selectedTasks.length > 0}
    <ul>
      {#each selectedTasks as task}
        <li>{task.title}</li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  :global(.task-item) {
    padding: 12px;
    border-bottom: 1px solid #eee;
  }
  
  :global(.task-title) {
    font-weight: 500;
    margin-bottom: 6px;
  }
  
  :global(.task-meta) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
  }
  
  :global(.task-priority) {
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 500;
  }
  
  :global(.priority-high) {
    background: #ffebee;
    color: #c62828;
  }
  
  :global(.priority-medium) {
    background: #fff3e0;
    color: #ef6c00;
  }
  
  :global(.priority-low) {
    background: #e8f5e8;
    color: #2e7d32;
  }
  
  :global(.task-due) {
    color: #666;
  }
  
  .selection-summary {
    margin-top: 16px;
    padding: 12px;
    background: #f8f9fa;
    border-radius: 4px;
  }
</style>
```

### Filtered List

```svelte
<script lang="ts">
  import ListBox from '@ticatec/uniface-element/ListBox';
  import type { FunFilter } from '@ticatec/uniface-element/ListBox';

  const ProductRenderer = ({ item }) => `
    <div class="product-item">
      <img src="${item.image}" alt="${item.name}" class="product-image" />
      <div class="product-info">
        <div class="product-name">${item.name}</div>
        <div class="product-category">${item.category}</div>
        <div class="product-price">$${item.price.toFixed(2)}</div>
      </div>
    </div>
  `;

  let products = [
    { id: 1, name: 'Laptop Pro', category: 'Electronics', price: 1299.99, image: '/images/laptop.jpg' },
    { id: 2, name: 'Coffee Maker', category: 'Appliances', price: 89.99, image: '/images/coffee.jpg' },
    { id: 3, name: 'Smartphone', category: 'Electronics', price: 699.99, image: '/images/phone.jpg' },
    { id: 4, name: 'Desk Chair', category: 'Furniture', price: 249.99, image: '/images/chair.jpg' },
    { id: 5, name: 'Tablet', category: 'Electronics', price: 329.99, image: '/images/tablet.jpg' }
  ];

  const productFilter: FunFilter = (item, text) => {
    if (!text) return true;
    const searchText = text.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchText) ||
      item.category.toLowerCase().includes(searchText)
    );
  };

  let selectedProduct = null;
</script>

<ListBox
  title="Product Catalog"
  list={products}
  itemRender={ProductRenderer}
  selectMode="single"
  filter={productFilter}
  bind:selectedItem={selectedProduct}
  style="width: 350px; height: 600px;"
  header$style="padding: 16px;"
/>

{#if selectedProduct}
  <div class="product-details">
    <h3>Selected Product</h3>
    <p><strong>Name:</strong> {selectedProduct.name}</p>
    <p><strong>Category:</strong> {selectedProduct.category}</p>
    <p><strong>Price:</strong> ${selectedProduct.price.toFixed(2)}</p>
  </div>
{/if}

<style>
  :global(.product-item) {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
  }
  
  :global(.product-item:hover) {
    background-color: #f8f9fa;
  }
  
  :global(.product-image) {
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 4px;
  }
  
  :global(.product-name) {
    font-weight: 500;
    margin-bottom: 2px;
  }
  
  :global(.product-category) {
    font-size: 0.875rem;
    color: #666;
    margin-bottom: 2px;
  }
  
  :global(.product-price) {
    font-weight: 600;
    color: #007bff;
  }
  
  .product-details {
    margin-top: 20px;
    padding: 16px;
    background: #f8f9fa;
    border-radius: 4px;
    width: 350px;
  }
</style>
```

### Lazy Loading List

```svelte
<script lang="ts">
  import ListBox from '@ticatec/uniface-element/ListBox';
  import type { LazyLoader, LoadResult } from '@ticatec/uniface-element/ListBox';

  const MessageRenderer = ({ item }) => `
    <div class="message-item">
      <div class="message-header">
        <span class="sender">${item.sender}</span>
        <span class="timestamp">${new Date(item.timestamp).toLocaleTimeString()}</span>
      </div>
      <div class="message-subject">${item.subject}</div>
      <div class="message-preview">${item.preview}</div>
    </div>
  `;

  // Simulate API call for lazy loading
  const messageLoader: LazyLoader = async (searchText, pageNo) => {
    console.log(`Loading page ${pageNo} with search: "${searchText}"`);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const pageSize = 10;
    const totalMessages = 100;
    
    // Generate mock messages
    const messages = Array.from({ length: pageSize }, (_, i) => {
      const messageId = (pageNo - 1) * pageSize + i + 1;
      return {
        id: messageId,
        sender: `User ${messageId}`,
        subject: searchText 
          ? `Message about ${searchText} #${messageId}` 
          : `Message Subject ${messageId}`,
        preview: `This is a preview of message ${messageId}. It contains some sample content...`,
        timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString()
      };
    });

    // Filter messages if search text provided
    const filteredMessages = searchText 
      ? messages.filter(msg => 
          msg.subject.toLowerCase().includes(searchText.toLowerCase()) ||
          msg.sender.toLowerCase().includes(searchText.toLowerCase())
        )
      : messages;

    return {
      list: filteredMessages,
      hasMore: pageNo * pageSize < totalMessages
    };
  };

  let selectedMessage = null;
</script>

<ListBox
  title="Messages (Lazy Loading)"
  itemRender={MessageRenderer}
  selectMode="single"
  lazyLoader={messageLoader}
  bind:selectedItem={selectedMessage}
  style="width: 400px; height: 500px;"
/>

<div slot="loadMoreIndicator" class="load-more">
  <div class="loading-spinner">Loading more messages...</div>
</div>

{#if selectedMessage}
  <div class="message-details">
    <h3>Selected Message</h3>
    <p><strong>From:</strong> {selectedMessage.sender}</p>
    <p><strong>Subject:</strong> {selectedMessage.subject}</p>
    <p><strong>Time:</strong> {new Date(selectedMessage.timestamp).toLocaleString()}</p>
    <div class="message-content">
      <p>{selectedMessage.preview}</p>
    </div>
  </div>
{/if}

<style>
  :global(.message-item) {
    padding: 12px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  :global(.message-item:hover) {
    background-color: #f8f9fa;
  }
  
  :global(.message-header) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
  }
  
  :global(.sender) {
    font-weight: 500;
    color: #333;
  }
  
  :global(.timestamp) {
    font-size: 0.75rem;
    color: #666;
  }
  
  :global(.message-subject) {
    font-weight: 500;
    margin-bottom: 4px;
  }
  
  :global(.message-preview) {
    font-size: 0.875rem;
    color: #666;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .load-more {
    padding: 16px;
    text-align: center;
    color: #666;
  }
  
  .loading-spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  
  .message-details {
    margin-top: 20px;
    padding: 16px;
    background: #f8f9fa;
    border-radius: 4px;
    width: 400px;
  }
  
  .message-content {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid #dee2e6;
  }
</style>
```

### Custom Item Renderer

```svelte
<script lang="ts">
  import ListBox from '@ticatec/uniface-element/ListBox';
  
  // Custom Svelte component for item rendering
  import FileItemRenderer from './FileItemRenderer.svelte';

  let files = [
    { id: 1, name: 'document.pdf', size: 2048000, type: 'pdf', modified: '2024-03-15T10:30:00Z' },
    { id: 2, name: 'image.jpg', size: 1536000, type: 'image', modified: '2024-03-14T15:45:00Z' },
    { id: 3, name: 'script.js', size: 8192, type: 'code', modified: '2024-03-13T09:20:00Z' },
    { id: 4, name: 'data.csv', size: 512000, type: 'data', modified: '2024-03-12T14:10:00Z' }
  ];

  let selectedFiles = [];

  function handleFileDoubleClick(file: any) {
    console.log('Opening file:', file.name);
    // Implement file opening logic
  }
</script>

<ListBox
  title="File Browser"
  list={files}
  itemRender={FileItemRenderer}
  selectMode="multiple"
  bind:selectedList={selectedFiles}
  onItemDblClick={handleFileDoubleClick}
  style="width: 500px; height: 400px;"
  item$props={{ showDetails: true, allowPreview: true }}
>
  <div slot="footer" class="file-footer">
    <span>{files.length} item(s), {selectedFiles.length} selected</span>
  </div>
</ListBox>
```

FileItemRenderer.svelte:
```svelte
<script lang="ts">
  export let item: any;
  export let selected: boolean = false;
  export let readonly: boolean = false;
  export let showDetails: boolean = false;
  export let allowPreview: boolean = false;

  function formatFileSize(bytes: number) {
    const sizes = ['B', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  }

  function getFileIcon(type: string) {
    const icons = {
      pdf: '📄',
      image: '🖼️',
      code: '💻',
      data: '📊',
      default: '📁'
    };
    return icons[type] || icons.default;
  }
</script>

<div class="file-item" class:selected class:readonly>
  <div class="file-icon">
    {getFileIcon(item.type)}
  </div>
  
  <div class="file-info">
    <div class="file-name">{item.name}</div>
    {#if showDetails}
      <div class="file-details">
        <span class="file-size">{formatFileSize(item.size)}</span>
        <span class="file-modified">Modified: {new Date(item.modified).toLocaleDateString()}</span>
      </div>
    {/if}
  </div>
  
  {#if allowPreview && item.type === 'image'}
    <button class="preview-btn" on:click|stopPropagation={() => console.log('Preview', item.name)}>
      👁️
    </button>
  {/if}
</div>

<style>
  .file-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 12px;
    border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .file-item:hover:not(.readonly) {
    background-color: #f8f9fa;
  }
  
  .file-item.selected {
    background-color: #e3f2fd;
  }
  
  .file-item.readonly {
    cursor: default;
    opacity: 0.7;
  }
  
  .file-icon {
    font-size: 24px;
    flex-shrink: 0;
  }
  
  .file-info {
    flex: 1;
    min-width: 0;
  }
  
  .file-name {
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .file-details {
    display: flex;
    gap: 16px;
    font-size: 0.875rem;
    color: #666;
    margin-top: 2px;
  }
  
  .preview-btn {
    background: none;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 4px 8px;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.2s;
  }
  
  .preview-btn:hover {
    opacity: 1;
  }
</style>
```

## Styling

The ListBox component uses the following CSS classes:

```css
.uniface-listbox {
  /* Main list container */
}

.uniface-listbox.round {
  /* Rounded corners variant */
}

.box-header {
  /* Header container */
}

.header-search {
  /* Search box container */
}

.listbox-content {
  /* Main content area */
}

.listbox-content.selectable {
  /* Selectable list styling */
}

.listview-item {
  /* Individual list item */
}

.listview-item.selected {
  /* Selected item styling */
}

.box-footer {
  /* Footer container */
}

.list-view-mask {
  /* Loading overlay */
}
```

## API Reference

### ListBox Component Props

```typescript
interface ListBoxProps {
  readonly?: boolean;              // Read-only mode
  style?: string | null;           // Container styles
  header$style?: string | null;    // Header styles
  footer$style?: string | null;    // Footer styles
  list: Array<any>;               // Items to display
  itemRender: any;                // Item renderer component
  selectMode: 'none' | 'single' | 'multiple'; // Selection mode
  filter?: FunFilter | null;       // Filter function
  lazyLoader?: LazyLoader | null;  // Lazy loading config
  selectedItem?: any;              // Selected item (single mode)
  selectedList?: Array<any>;       // Selected items (multiple mode)
  class?: string;                  // CSS classes
  item$props?: any;               // Props for item renderer
  onSelectChange?: OnSelectChange; // Selection callback
  onItemDblClick?: OnItemDblClick; // Double-click callback
  onItemClick?: OnItemClick;       // Click callback
  title?: string;                  // Header title
  round?: boolean;                 // Rounded corners
}
```

## Best Practices

1. **Performance** - Use lazy loading for large datasets (>100 items)
2. **Item Renderers** - Keep item rendering components lightweight and focused
3. **Filtering** - Implement efficient filter functions for responsive search
4. **Selection Management** - Always bind to selectedItem/selectedList for state tracking
5. **Accessibility** - Ensure item renderers support keyboard navigation
6. **Error Handling** - Handle loading errors gracefully in lazy loader
7. **Visual Feedback** - Provide clear visual indicators for selection and loading states
8. **Mobile Support** - Consider touch-friendly item sizes and interactions