# TreeView 树形视图组件

一个分层数据显示组件，可渲染具有可展开/折叠节点、懒加载支持和交互式节点选择的树形结构。

## 概述

TreeView 组件为显示分层数据结构提供了复杂的界面。它支持节点展开/折叠、大数据集的懒加载、自定义节点渲染、上下文菜单和灵活的节点选择。非常适合文件系统、组织结构图、菜单结构和任何分层数据可视化。

## 安装

```typescript
import TreeView from '@ticatec/uniface-element/TreeView';
import type { LazyLoader, NodeVisibleFun, OnNodeSelectionChange, LoadChildrenFun } from '@ticatec/uniface-element/TreeView';
import type { TreeNode, CheckIsDirectory, GetText } from '@ticatec/uniface-element/TreeNodes';
```

## 基本用法

```svelte
<script lang="ts">
  import TreeView from '@ticatec/uniface-element/TreeView';
  import type { TreeNode, CheckIsDirectory } from '@ticatec/uniface-element/TreeNodes';

  // 示例分层数据
  let treeData: TreeNode<any>[] = [
    {
      item: { id: '1', name: '根文件夹', type: 'folder' },
      expand: true,
      children: [
        {
          item: { id: '2', name: '文档', type: 'folder' },
          expand: false,
          children: [
            { item: { id: '3', name: 'file1.txt', type: 'file' } },
            { item: { id: '4', name: 'file2.pdf', type: 'file' } }
          ]
        },
        {
          item: { id: '5', name: '图片', type: 'folder' },
          expand: false,
          children: [
            { item: { id: '6', name: 'photo.jpg', type: 'file' } }
          ]
        }
      ]
    }
  ];

  const checkIsDirectory: CheckIsDirectory<any> = (node) => {
    return node.item.type === 'folder';
  };

  let activeNode = null;
</script>

<TreeView
  nodes={treeData}
  textField="name"
  {checkIsDirectory}
  bind:activeNode
/>
```

## 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `nodes` | `Array<TreeNode<any>>` | - | 要显示的树节点数组 |
| `textField` | `string \| GetText<any>` | - | 获取节点文本的字段名或函数 |
| `style` | `string` | `""` | 树容器的自定义 CSS 样式 |
| `lazyLoader` | `LazyLoader \| null` | `null` | 懒加载配置 |
| `activeNode` | `any` | `null` | 当前活动/选中的节点 |
| `class` | `string` | `""` | 额外的 CSS 类名 |
| `isVisible` | `NodeVisibleFun` | `null` | 确定节点可见性的函数 |
| `onSelectionChange` | `OnNodeSelectionChange` | `null` | 节点选择变更回调 |
| `onContextMenu` | `OnContextMenu` | `null` | 上下文菜单回调 |
| `checkIsDirectory` | `CheckIsDirectory<any>` | - | 检查节点是否为目录的函数 |

## 类型定义

```typescript
/**
 * 树节点结构
 */
export type TreeNode<T> = {
  item: T;
  expand?: boolean;
  children?: TreeNode<T>[];
};

/**
 * 检查节点是否为目录/分支的函数
 */
export type CheckIsDirectory<T> = (node: TreeNode<T>) => boolean;

/**
 * 从节点项目获取文本的函数
 */
export type GetText<T> = (data: T) => string;

/**
 * 节点选择变更回调
 */
export type OnNodeSelectionChange = (node: TreeNode<any>) => Promise<boolean>;

/**
 * 节点可见性过滤函数
 */
export type NodeVisibleFun = (node: TreeNode<any>) => boolean;

/**
 * 懒加载的加载子节点函数
 */
export type LoadChildrenFun = (item: TreeNode<any>) => Promise<Array<TreeNode<any>>>;

/**
 * 懒加载器配置
 */
export interface LazyLoader {
  /**
   * 检查节点是否是分支（有子节点）
   */
  isBranch: CheckIsDirectory<any>;

  /**
   * 数据加载器函数
   */
  load: LoadChildrenFun;
}
```

## 使用示例

### 文件系统树

```svelte
<script lang="ts">
  import TreeView from '@ticatec/uniface-element/TreeView';
  import type { TreeNode, CheckIsDirectory } from '@ticatec/uniface-element/TreeNodes';

  interface FileSystemItem {
    id: string;
    name: string;
    type: 'file' | 'folder';
    size?: number;
    modified?: string;
  }

  let fileSystem: TreeNode<FileSystemItem>[] = [
    {
      item: { id: 'root', name: '项目根目录', type: 'folder' },
      expand: true,
      children: [
        {
          item: { id: 'src', name: 'src', type: 'folder' },
          expand: true,
          children: [
            {
              item: { id: 'components', name: 'components', type: 'folder' },
              expand: false,
              children: [
                { item: { id: 'header', name: 'Header.svelte', type: 'file', size: 2048 } },
                { item: { id: 'footer', name: 'Footer.svelte', type: 'file', size: 1024 } }
              ]
            },
            { item: { id: 'main', name: 'main.ts', type: 'file', size: 512 } },
            { item: { id: 'app', name: 'App.svelte', type: 'file', size: 3072 } }
          ]
        },
        {
          item: { id: 'public', name: 'public', type: 'folder' },
          expand: false,
          children: [
            { item: { id: 'index', name: 'index.html', type: 'file', size: 1536 } },
            { item: { id: 'favicon', name: 'favicon.ico', type: 'file', size: 256 } }
          ]
        },
        { item: { id: 'package', name: 'package.json', type: 'file', size: 1024 } },
        { item: { id: 'readme', name: 'README.md', type: 'file', size: 2048 } }
      ]
    }
  ];

  const checkIsDirectory: CheckIsDirectory<FileSystemItem> = (node) => {
    return node.item.type === 'folder';
  };

  let selectedNode: TreeNode<FileSystemItem> | null = null;

  async function handleNodeSelection(node: TreeNode<FileSystemItem>): Promise<boolean> {
    console.log('选中节点:', node.item.name);
    selectedNode = node;
    return true; // 允许选择
  }
</script>

<div class="file-explorer">
  <TreeView
    nodes={fileSystem}
    textField="name"
    checkIsDirectory={checkIsDirectory}
    onSelectionChange={handleNodeSelection}
    style="border: 1px solid #ddd; height: 400px; overflow-y: auto;"
  />
  
  {#if selectedNode}
    <div class="file-details">
      <h3>选中: {selectedNode.item.name}</h3>
      <p><strong>类型:</strong> {selectedNode.item.type === 'folder' ? '文件夹' : '文件'}</p>
      {#if selectedNode.item.size}
        <p><strong>大小:</strong> {selectedNode.item.size} 字节</p>
      {/if}
    </div>
  {/if}
</div>

<style>
  .file-explorer {
    display: flex;
    gap: 20px;
  }
  
  .file-details {
    padding: 16px;
    background: #f8f9fa;
    border-radius: 4px;
    min-width: 200px;
  }
</style>
```

### 组织架构图

```svelte
<script lang="ts">
  import TreeView from '@ticatec/uniface-element/TreeView';
  import type { TreeNode, CheckIsDirectory, GetText } from '@ticatec/uniface-element/TreeNodes';

  interface Employee {
    id: string;
    name: string;
    position: string;
    department: string;
    hasSubordinates: boolean;
  }

  let organizationChart: TreeNode<Employee>[] = [
    {
      item: {
        id: 'ceo',
        name: '张总',
        position: 'CEO',
        department: '总裁办',
        hasSubordinates: true
      },
      expand: true,
      children: [
        {
          item: {
            id: 'cto',
            name: '李技术总监',
            position: 'CTO',
            department: '技术部',
            hasSubordinates: true
          },
          expand: true,
          children: [
            {
              item: {
                id: 'dev-manager',
                name: '王开发经理',
                position: '开发经理',
                department: '工程部',
                hasSubordinates: true
              },
              expand: false,
              children: [
                { item: { id: 'dev1', name: '刘高级开发', position: '高级开发工程师', department: '工程部', hasSubordinates: false } },
                { item: { id: 'dev2', name: '陈开发', position: '开发工程师', department: '工程部', hasSubordinates: false } }
              ]
            },
            { item: { id: 'qa', name: '赵测试负责人', position: 'QA负责人', department: '质量保证部', hasSubordinates: false } }
          ]
        },
        {
          item: {
            id: 'cfo',
            name: '周财务总监',
            position: 'CFO',
            department: '财务部',
            hasSubordinates: true
          },
          expand: false,
          children: [
            { item: { id: 'accountant', name: '吴高级会计', position: '高级会计', department: '财务部', hasSubordinates: false } }
          ]
        }
      ]
    }
  ];

  const checkIsDirectory: CheckIsDirectory<Employee> = (node) => {
    return node.item.hasSubordinates;
  };

  const getEmployeeText: GetText<Employee> = (employee) => {
    return `${employee.name} - ${employee.position}`;
  };

  let selectedEmployee: TreeNode<Employee> | null = null;
</script>

<div class="org-chart">
  <h2>组织架构图</h2>
  
  <TreeView
    nodes={organizationChart}
    textField={getEmployeeText}
    checkIsDirectory={checkIsDirectory}
    bind:activeNode={selectedEmployee}
    style="background: white; border: 1px solid #e0e0e0; padding: 16px; border-radius: 8px;"
  />
  
  {#if selectedEmployee}
    <div class="employee-card">
      <div class="employee-header">
        <h3>{selectedEmployee.item.name}</h3>
        <span class="position">{selectedEmployee.item.position}</span>
      </div>
      <div class="employee-details">
        <p><strong>部门:</strong> {selectedEmployee.item.department}</p>
        <p><strong>ID:</strong> {selectedEmployee.item.id}</p>
        <p><strong>有下属:</strong> {selectedEmployee.item.hasSubordinates ? '是' : '否'}</p>
      </div>
    </div>
  {/if}
</div>

<style>
  .org-chart {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .employee-card {
    margin-top: 20px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .employee-header {
    margin-bottom: 12px;
  }
  
  .employee-header h3 {
    margin: 0 0 4px 0;
    color: #333;
  }
  
  .position {
    background: #007bff;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.875rem;
  }
  
  .employee-details p {
    margin: 8px 0;
    color: #555;
  }
</style>
```

### 懒加载树

```svelte
<script lang="ts">
  import TreeView from '@ticatec/uniface-element/TreeView';
  import type { TreeNode, CheckIsDirectory } from '@ticatec/uniface-element/TreeNodes';
  import type { LazyLoader, LoadChildrenFun } from '@ticatec/uniface-element/TreeView';

  interface ApiNode {
    id: string;
    name: string;
    type: 'folder' | 'file';
    hasChildren?: boolean;
  }

  // 初始根节点
  let initialNodes: TreeNode<ApiNode>[] = [
    {
      item: { id: 'api', name: 'API 接口', type: 'folder', hasChildren: true },
      expand: false
    },
    {
      item: { id: 'components', name: '组件', type: 'folder', hasChildren: true },
      expand: false
    }
  ];

  const checkIsDirectory: CheckIsDirectory<ApiNode> = (node) => {
    return node.item.type === 'folder' && node.item.hasChildren;
  };

  // 模拟 API 调用加载子节点
  const loadChildren: LoadChildrenFun = async (parentNode) => {
    console.log('正在加载子节点:', parentNode.item.name);
    
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 根据父节点的模拟数据
    if (parentNode.item.id === 'api') {
      return [
        {
          item: { id: 'users', name: '用户 API', type: 'folder', hasChildren: true }
        },
        {
          item: { id: 'orders', name: '订单 API', type: 'folder', hasChildren: true }
        },
        {
          item: { id: 'auth', name: '身份验证', type: 'file' }
        }
      ];
    } else if (parentNode.item.id === 'components') {
      return [
        {
          item: { id: 'ui', name: 'UI 组件', type: 'folder', hasChildren: true }
        },
        {
          item: { id: 'forms', name: '表单组件', type: 'folder', hasChildren: true }
        }
      ];
    } else if (parentNode.item.id === 'users') {
      return [
        { item: { id: 'get-users', name: 'GET /users', type: 'file' } },
        { item: { id: 'post-user', name: 'POST /users', type: 'file' } },
        { item: { id: 'put-user', name: 'PUT /users/:id', type: 'file' } }
      ];
    } else if (parentNode.item.id === 'orders') {
      return [
        { item: { id: 'get-orders', name: 'GET /orders', type: 'file' } },
        { item: { id: 'post-order', name: 'POST /orders', type: 'file' } }
      ];
    }

    return [];
  };

  const lazyLoader: LazyLoader = {
    isBranch: checkIsDirectory,
    load: loadChildren
  };

  let activeNode: TreeNode<ApiNode> | null = null;
  let loadingNodes = new Set();

  async function handleNodeSelection(node: TreeNode<ApiNode>): Promise<boolean> {
    console.log('选中:', node.item.name);
    return true;
  }
</script>

<div class="api-explorer">
  <h2>API 浏览器（懒加载）</h2>
  
  <TreeView
    nodes={initialNodes}
    textField="name"
    checkIsDirectory={checkIsDirectory}
    lazyLoader={lazyLoader}
    onSelectionChange={handleNodeSelection}
    bind:activeNode
    style="height: 500px; border: 1px solid #ddd; overflow-y: auto; padding: 8px;"
  />
  
  {#if activeNode}
    <div class="node-info">
      <h3>选中: {activeNode.item.name}</h3>
      <p><strong>类型:</strong> {activeNode.item.type === 'folder' ? '文件夹' : '文件'}</p>
      <p><strong>ID:</strong> {activeNode.item.id}</p>
      {#if activeNode.item.hasChildren}
        <p><strong>有子节点:</strong> 是</p>
      {/if}
    </div>
  {/if}
</div>

<style>
  .api-explorer {
    max-width: 600px;
    margin: 20px 0;
  }
  
  .node-info {
    margin-top: 20px;
    padding: 16px;
    background: #f8f9fa;
    border-radius: 4px;
  }
  
  .node-info h3 {
    margin: 0 0 12px 0;
    color: #333;
  }
  
  .node-info p {
    margin: 6px 0;
    color: #555;
  }
</style>
```

### 带上下文菜单的过滤树

```svelte
<script lang="ts">
  import TreeView from '@ticatec/uniface-element/TreeView';
  import type { TreeNode, CheckIsDirectory } from '@ticatec/uniface-element/TreeNodes';
  import type { NodeVisibleFun, OnNodeSelectionChange } from '@ticatec/uniface-element/TreeView';
  import type { OnContextMenu } from '@ticatec/uniface-element/ContextMenu';

  interface MenuItem {
    id: string;
    label: string;
    icon?: string;
    children?: MenuItem[];
    category: string;
  }

  let menuStructure: TreeNode<MenuItem>[] = [
    {
      item: { id: 'dashboard', label: '仪表板', icon: '📊', category: 'main' },
      expand: true,
      children: [
        { item: { id: 'analytics', label: '分析', icon: '📈', category: 'dashboard' } },
        { item: { id: 'reports', label: '报告', icon: '📋', category: 'dashboard' } }
      ]
    },
    {
      item: { id: 'users', label: '用户管理', icon: '👥', category: 'main' },
      expand: false,
      children: [
        { item: { id: 'user-list', label: '用户列表', icon: '📝', category: 'users' } },
        { item: { id: 'user-roles', label: '角色权限', icon: '🔒', category: 'users' } },
        { item: { id: 'user-settings', label: '用户设置', icon: '⚙️', category: 'users' } }
      ]
    },
    {
      item: { id: 'content', label: '内容管理', icon: '📄', category: 'main' },
      expand: false,
      children: [
        { item: { id: 'pages', label: '页面', icon: '📖', category: 'content' } },
        { item: { id: 'media', label: '媒体库', icon: '🖼️', category: 'content' } }
      ]
    },
    {
      item: { id: 'settings', label: '系统设置', icon: '🔧', category: 'main' },
      expand: false,
      children: [
        { item: { id: 'general', label: '常规', icon: '⚙️', category: 'settings' } },
        { item: { id: 'security', label: '安全', icon: '🛡️', category: 'settings' } }
      ]
    }
  ];

  let searchQuery = '';
  let selectedNode: TreeNode<MenuItem> | null = null;

  const checkIsDirectory: CheckIsDirectory<MenuItem> = (node) => {
    return node.children && node.children.length > 0;
  };

  // 搜索的过滤函数
  const nodeVisibilityFilter: NodeVisibleFun = (node) => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      node.item.label.toLowerCase().includes(query) ||
      node.item.category.toLowerCase().includes(query)
    );
  };

  // 节点选择处理器
  const handleNodeSelection: OnNodeSelectionChange = async (node) => {
    selectedNode = node;
    console.log('选中菜单项:', node.item.label);
    return true;
  };

  // 上下文菜单处理器
  const handleContextMenu: OnContextMenu = (event, node) => {
    event.preventDefault();
    console.log('上下文菜单:', node.item.label);
    
    // 这里可以显示自定义上下文菜单
    const menuItems = [
      { label: '编辑', action: () => console.log('编辑', node.item.label) },
      { label: '删除', action: () => console.log('删除', node.item.label) },
      { label: '复制', action: () => console.log('复制', node.item.label) }
    ];
    
    // 在光标位置显示上下文菜单
    showContextMenu(event.clientX, event.clientY, menuItems);
  };

  function showContextMenu(x: number, y: number, items: any[]) {
    // 实现会在指定位置显示上下文菜单
    alert(`上下文菜单位置 (${x}, ${y})\n项目: ${items.map(i => i.label).join(', ')}`);
  }

  function clearSearch() {
    searchQuery = '';
  }
</script>

<div class="menu-manager">
  <h2>导航菜单管理器</h2>
  
  <div class="search-controls">
    <input
      type="text"
      bind:value={searchQuery}
      placeholder="搜索菜单项..."
      class="search-input"
    />
    {#if searchQuery}
      <button on:click={clearSearch} class="clear-btn">清除</button>
    {/if}
  </div>
  
  <div class="tree-container">
    <TreeView
      nodes={menuStructure}
      textField="label"
      checkIsDirectory={checkIsDirectory}
      isVisible={nodeVisibilityFilter}
      onSelectionChange={handleNodeSelection}
      onContextMenu={handleContextMenu}
      style="height: 400px; border: 1px solid #ddd; padding: 12px; overflow-y: auto;"
    />
    
    {#if selectedNode}
      <div class="menu-item-details">
        <h3>
          {#if selectedNode.item.icon}
            <span class="item-icon">{selectedNode.item.icon}</span>
          {/if}
          {selectedNode.item.label}
        </h3>
        <div class="details-grid">
          <div class="detail-item">
            <strong>ID:</strong> {selectedNode.item.id}
          </div>
          <div class="detail-item">
            <strong>分类:</strong> {selectedNode.item.category}
          </div>
          <div class="detail-item">
            <strong>类型:</strong> {checkIsDirectory(selectedNode) ? '菜单组' : '菜单项'}
          </div>
          {#if selectedNode.children}
            <div class="detail-item">
              <strong>子项:</strong> {selectedNode.children.length}
            </div>
          {/if}
        </div>
        
        <div class="action-buttons">
          <button class="btn btn-primary">编辑</button>
          <button class="btn btn-secondary">复制</button>
          <button class="btn btn-danger">删除</button>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .menu-manager {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .search-controls {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
  }
  
  .search-input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }
  
  .clear-btn {
    padding: 8px 16px;
    background: #f8f9fa;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .clear-btn:hover {
    background: #e9ecef;
  }
  
  .tree-container {
    display: flex;
    gap: 20px;
  }
  
  .menu-item-details {
    flex: 0 0 300px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
    height: fit-content;
  }
  
  .menu-item-details h3 {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0 0 16px 0;
    color: #333;
  }
  
  .item-icon {
    font-size: 1.2em;
  }
  
  .details-grid {
    display: grid;
    gap: 8px;
    margin-bottom: 20px;
  }
  
  .detail-item {
    padding: 8px 0;
    border-bottom: 1px solid #e9ecef;
    color: #555;
  }
  
  .action-buttons {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  
  .btn {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.875rem;
  }
  
  .btn-primary {
    background: #007bff;
    color: white;
  }
  
  .btn-secondary {
    background: #6c757d;
    color: white;
  }
  
  .btn-danger {
    background: #dc3545;
    color: white;
  }
  
  .btn:hover {
    opacity: 0.8;
  }
</style>
```

## 样式

TreeView 组件使用以下 CSS 类：

```css
.uniface-tree-view {
  /* 主要树容器 */
}

/* 各个树节点由 TreeNodeView 组件进行样式设置 */
```

## API 参考

### TreeView 组件属性

```typescript
interface TreeViewProps {
  nodes: Array<TreeNode<any>>;        // 要显示的树节点
  textField: string | GetText<any>;   // 节点文本的字段或函数
  style?: string;                     // 自定义样式
  lazyLoader?: LazyLoader | null;     // 懒加载配置
  activeNode?: any;                   // 当前活动节点
  class?: string;                     // CSS 类
  isVisible?: NodeVisibleFun;         // 节点可见性过滤器
  onSelectionChange?: OnNodeSelectionChange; // 选择回调
  onContextMenu?: OnContextMenu;      // 上下文菜单回调
  checkIsDirectory: CheckIsDirectory<any>; // 目录检查函数
}
```

## 与 TreeNodes 工具的集成

TreeView 组件与 TreeNodes 工具类无缝协作，用于管理分层数据：

```svelte
<script lang="ts">
  import TreeView from '@ticatec/uniface-element/TreeView';
  import TreeNodes from '@ticatec/uniface-element/TreeNodes';

  // 创建 TreeNodes 实例进行数据管理
  const treeManager = new TreeNodes({
    keyField: 'id',
    parentKeyField: 'parentId',
    textField: 'name',
    checkIsRoot: (item) => !item.parentId,
    checkIsDirectory: (node) => node.item.type === 'folder'
  });

  // 设置扁平数据数组 - TreeNodes 将构建层次结构
  let flatData = [
    { id: '1', name: '根目录', type: 'folder', parentId: null },
    { id: '2', name: '子项 1', type: 'folder', parentId: '1' },
    { id: '3', name: '文件 1', type: 'file', parentId: '2' }
  ];

  treeManager.setData(flatData);
  let treeNodes = treeManager.nodes;
</script>

<TreeView
  nodes={treeNodes}
  textField="name"
  checkIsDirectory={treeManager.checkIsDirectory}
/>
```

## 最佳实践

1. **性能优化** - 对于大型树结构（>100个节点）使用懒加载
2. **节点文本** - 为节点显示使用一致的文本字段或函数
3. **状态管理** - 跟踪活动/选中节点以便用户交互
4. **可访问性** - 确保键盘导航支持
5. **错误处理** - 在懒加载器中优雅地处理加载错误
6. **视觉反馈** - 在懒加载过程中提供加载指示器
7. **上下文操作** - 为节点操作实现上下文菜单
8. **过滤功能** - 使用可见性函数进行搜索/过滤功能