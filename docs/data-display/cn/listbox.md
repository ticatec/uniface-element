# ListBox 列表框组件

一个多功能的列表显示组件，提供项目选择、过滤、懒加载和多种选择模式，用于显示数据集合。

## 概述

ListBox 组件为显示项目列表提供了全面的解决方案，具有丰富的交互功能。它支持单选和多选模式、实时过滤、大数据集的懒加载以及自定义项目渲染。非常适合用户选择界面、数据浏览器和内容管理系统。

## 安装

```typescript
import ListBox from '@ticatec/uniface-element/ListBox';
import type { LazyLoader, FunFilter, LoadResult } from '@ticatec/uniface-element/ListBox';
```

## 基本用法

```svelte
<script lang="ts">
  import ListBox from '@ticatec/uniface-element/ListBox';
  
  // 简单的项目渲染器组件
  const ItemRenderer = ({ item }) => `
    <div class="list-item">
      <h4>${item.title}</h4>
      <p>${item.description}</p>
    </div>
  `;

  let items = [
    { id: 1, title: '项目 1', description: '第一个项目描述' },
    { id: 2, title: '项目 2', description: '第二个项目描述' },
    { id: 3, title: '项目 3', description: '第三个项目描述' }
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

## 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `readonly` | `boolean` | `false` | 设置列表为只读模式 |
| `style` | `string \| null` | `null` | 容器的自定义 CSS 样式 |
| `header$style` | `string \| null` | `null` | 头部区域的自定义样式 |
| `footer$style` | `string \| null` | `null` | 底部区域的自定义样式 |
| `list` | `Array<any>` | - | 要显示的项目数组 |
| `itemRender` | `any` | - | 用于渲染每个项目的组件 |
| `selectMode` | `'none' \| 'single' \| 'multiple'` | `'none'` | 选择行为模式 |
| `filter` | `FunFilter \| null` | `null` | 项目过滤函数 |
| `lazyLoader` | `LazyLoader \| null` | `null` | 懒加载配置 |
| `selectedItem` | `any` | `null` | 当前选中的项目（单选模式） |
| `selectedList` | `Array<any>` | `[]` | 选中的项目（多选模式） |
| `class` | `string` | `''` | 额外的 CSS 类名 |
| `item$props` | `any` | `null` | 传递给项目渲染器的额外属性 |
| `onSelectChange` | `OnSelectChange` | `null` | 选择变更回调 |
| `onItemDblClick` | `OnItemDblClick` | `null` | 项目双击回调 |
| `onItemClick` | `OnItemClick` | `null` | 项目点击回调 |
| `title` | `string` | `null` | 头部标题 |
| `round` | `boolean` | `false` | 应用圆角 |

## 插槽

| 插槽 | 描述 |
|------|------|
| `header` | 自定义头部内容 |
| `footer` | 自定义底部内容 |
| `loadMoreIndicator` | 懒加载的自定义加载指示器 |

## 类型定义

```typescript
/**
 * 项目过滤函数
 */
export type FunFilter = (item: any, text: string) => boolean;

/**
 * 懒加载结果结构
 */
export interface LoadResult {
  hasMore: boolean;
  list: Array<any>;
}

/**
 * 懒加载函数
 */
export type LazyLoader = (text: string, pageNo: number) => Promise<LoadResult>;

/**
 * 事件处理器类型
 */
type OnSelectChange = (item: any) => void;
type OnItemDblClick = (item: any) => void;
type OnItemClick = (item: any) => void;
```

## 使用示例

### 单选列表

```svelte
<script lang="ts">
  import ListBox from '@ticatec/uniface-element/ListBox';

  // 自定义项目渲染器
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
    { id: 1, name: '张小明', role: '开发工程师', avatar: '/avatars/zhang.jpg' },
    { id: 2, name: '李小红', role: '设计师', avatar: '/avatars/li.jpg' },
    { id: 3, name: '王小刚', role: '项目经理', avatar: '/avatars/wang.jpg' }
  ];

  let selectedUser = null;

  function handleUserSelect(user: any) {
    console.log('选中用户:', user);
  }
</script>

<ListBox
  title="选择用户"
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

### 多选列表

```svelte
<script lang="ts">
  import ListBox from '@ticatec/uniface-element/ListBox';

  const TaskRenderer = ({ item }) => `
    <div class="task-item">
      <div class="task-title">${item.title}</div>
      <div class="task-meta">
        <span class="task-priority priority-${item.priority.toLowerCase()}">${item.priority === 'High' ? '高' : item.priority === 'Medium' ? '中' : '低'}</span>
        <span class="task-due">截止: ${new Date(item.dueDate).toLocaleDateString()}</span>
      </div>
    </div>
  `;

  let tasks = [
    { id: 1, title: '审查拉取请求', priority: 'High', dueDate: '2024-03-20' },
    { id: 2, title: '更新文档', priority: 'Medium', dueDate: '2024-03-22' },
    { id: 3, title: '修复小错误', priority: 'Low', dueDate: '2024-03-25' },
    { id: 4, title: '规划下个冲刺', priority: 'High', dueDate: '2024-03-18' }
  ];

  let selectedTasks = [];

  $: console.log('选中的任务:', selectedTasks);
</script>

<ListBox
  title="选择任务"
  list={tasks}
  itemRender={TaskRenderer}
  selectMode="multiple"
  bind:selectedList={selectedTasks}
  style="width: 400px; height: 500px;"
  round={true}
/>

<div class="selection-summary">
  <p>已选择: {selectedTasks.length} 个任务</p>
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

### 带过滤的列表

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
        <div class="product-price">¥${item.price.toFixed(2)}</div>
      </div>
    </div>
  `;

  let products = [
    { id: 1, name: '笔记本电脑', category: '电子产品', price: 8999.99, image: '/images/laptop.jpg' },
    { id: 2, name: '咖啡机', category: '家用电器', price: 599.99, image: '/images/coffee.jpg' },
    { id: 3, name: '智能手机', category: '电子产品', price: 4699.99, image: '/images/phone.jpg' },
    { id: 4, name: '办公椅', category: '家具', price: 1699.99, image: '/images/chair.jpg' },
    { id: 5, name: '平板电脑', category: '电子产品', price: 2199.99, image: '/images/tablet.jpg' }
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
  title="产品目录"
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
    <h3>选中的产品</h3>
    <p><strong>名称:</strong> {selectedProduct.name}</p>
    <p><strong>分类:</strong> {selectedProduct.category}</p>
    <p><strong>价格:</strong> ¥{selectedProduct.price.toFixed(2)}</p>
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

### 懒加载列表

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

  // 模拟 API 调用进行懒加载
  const messageLoader: LazyLoader = async (searchText, pageNo) => {
    console.log(`加载第 ${pageNo} 页，搜索条件: "${searchText}"`);
    
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const pageSize = 10;
    const totalMessages = 100;
    
    // 生成模拟消息
    const messages = Array.from({ length: pageSize }, (_, i) => {
      const messageId = (pageNo - 1) * pageSize + i + 1;
      return {
        id: messageId,
        sender: `用户${messageId}`,
        subject: searchText 
          ? `关于${searchText}的消息 #${messageId}` 
          : `消息主题 ${messageId}`,
        preview: `这是消息 ${messageId} 的预览。它包含一些示例内容...`,
        timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString()
      };
    });

    // 如果提供了搜索文本则过滤消息
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
  title="消息（懒加载）"
  itemRender={MessageRenderer}
  selectMode="single"
  lazyLoader={messageLoader}
  bind:selectedItem={selectedMessage}
  style="width: 400px; height: 500px;"
/>

<div slot="loadMoreIndicator" class="load-more">
  <div class="loading-spinner">正在加载更多消息...</div>
</div>

{#if selectedMessage}
  <div class="message-details">
    <h3>选中的消息</h3>
    <p><strong>发件人:</strong> {selectedMessage.sender}</p>
    <p><strong>主题:</strong> {selectedMessage.subject}</p>
    <p><strong>时间:</strong> {new Date(selectedMessage.timestamp).toLocaleString()}</p>
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

### 自定义项目渲染器

```svelte
<script lang="ts">
  import ListBox from '@ticatec/uniface-element/ListBox';
  
  // 用于项目渲染的自定义 Svelte 组件
  import FileItemRenderer from './FileItemRenderer.svelte';

  let files = [
    { id: 1, name: '文档.pdf', size: 2048000, type: 'pdf', modified: '2024-03-15T10:30:00Z' },
    { id: 2, name: '图片.jpg', size: 1536000, type: 'image', modified: '2024-03-14T15:45:00Z' },
    { id: 3, name: '脚本.js', size: 8192, type: 'code', modified: '2024-03-13T09:20:00Z' },
    { id: 4, name: '数据.csv', size: 512000, type: 'data', modified: '2024-03-12T14:10:00Z' }
  ];

  let selectedFiles = [];

  function handleFileDoubleClick(file: any) {
    console.log('打开文件:', file.name);
    // 实现文件打开逻辑
  }
</script>

<ListBox
  title="文件浏览器"
  list={files}
  itemRender={FileItemRenderer}
  selectMode="multiple"
  bind:selectedList={selectedFiles}
  onItemDblClick={handleFileDoubleClick}
  style="width: 500px; height: 400px;"
  item$props={{ showDetails: true, allowPreview: true }}
>
  <div slot="footer" class="file-footer">
    <span>{files.length} 个项目，已选择 {selectedFiles.length} 个</span>
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
        <span class="file-modified">修改时间: {new Date(item.modified).toLocaleDateString()}</span>
      </div>
    {/if}
  </div>
  
  {#if allowPreview && item.type === 'image'}
    <button class="preview-btn" on:click|stopPropagation={() => console.log('预览', item.name)}>
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

## 样式

ListBox 组件使用以下 CSS 类：

```css
.uniface-listbox {
  /* 主要列表容器 */
}

.uniface-listbox.round {
  /* 圆角变体 */
}

.box-header {
  /* 头部容器 */
}

.header-search {
  /* 搜索框容器 */
}

.listbox-content {
  /* 主要内容区域 */
}

.listbox-content.selectable {
  /* 可选择列表样式 */
}

.listview-item {
  /* 单个列表项 */
}

.listview-item.selected {
  /* 选中项样式 */
}

.box-footer {
  /* 底部容器 */
}

.list-view-mask {
  /* 加载遮罩 */
}
```

## API 参考

### ListBox 组件属性

```typescript
interface ListBoxProps {
  readonly?: boolean;              // 只读模式
  style?: string | null;           // 容器样式
  header$style?: string | null;    // 头部样式
  footer$style?: string | null;    // 底部样式
  list: Array<any>;               // 要显示的项目
  itemRender: any;                // 项目渲染器组件
  selectMode: 'none' | 'single' | 'multiple'; // 选择模式
  filter?: FunFilter | null;       // 过滤函数
  lazyLoader?: LazyLoader | null;  // 懒加载配置
  selectedItem?: any;              // 选中的项目（单选模式）
  selectedList?: Array<any>;       // 选中的项目（多选模式）
  class?: string;                  // CSS 类
  item$props?: any;               // 项目渲染器的属性
  onSelectChange?: OnSelectChange; // 选择回调
  onItemDblClick?: OnItemDblClick; // 双击回调
  onItemClick?: OnItemClick;       // 点击回调
  title?: string;                  // 头部标题
  round?: boolean;                 // 圆角
}
```

## 最佳实践

1. **性能优化** - 对于大数据集（>100项）使用懒加载
2. **项目渲染器** - 保持项目渲染组件轻量级和专注
3. **过滤功能** - 实现高效的过滤函数以获得响应式搜索
4. **选择管理** - 始终绑定到 selectedItem/selectedList 进行状态跟踪
5. **可访问性** - 确保项目渲染器支持键盘导航
6. **错误处理** - 在懒加载器中优雅地处理加载错误
7. **视觉反馈** - 为选择和加载状态提供清晰的视觉指示器
8. **移动端支持** - 考虑触摸友好的项目尺寸和交互