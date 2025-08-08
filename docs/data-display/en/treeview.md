# TreeView Component

A hierarchical data display component that renders tree structures with expandable/collapsible nodes, lazy loading support, and interactive node selection.

## Overview

The TreeView component provides a sophisticated interface for displaying hierarchical data structures. It supports node expansion/collapse, lazy loading for large datasets, custom node rendering, context menus, and flexible node selection. Perfect for file systems, organization charts, menu structures, and any hierarchical data visualization.

## Installation

```typescript
import TreeView from '@ticatec/uniface-element/TreeView';
import type { LazyLoader, NodeVisibleFun, OnNodeSelectionChange, LoadChildrenFun } from '@ticatec/uniface-element/TreeView';
import type { TreeNode, CheckIsDirectory, GetText } from '@ticatec/uniface-element/TreeNodes';
```

## Basic Usage

```svelte
<script lang="ts">
  import TreeView from '@ticatec/uniface-element/TreeView';
  import type { TreeNode, CheckIsDirectory } from '@ticatec/uniface-element/TreeNodes';

  // Sample hierarchical data
  let treeData: TreeNode<any>[] = [
    {
      item: { id: '1', name: 'Root Folder', type: 'folder' },
      expand: true,
      children: [
        {
          item: { id: '2', name: 'Documents', type: 'folder' },
          expand: false,
          children: [
            { item: { id: '3', name: 'file1.txt', type: 'file' } },
            { item: { id: '4', name: 'file2.pdf', type: 'file' } }
          ]
        },
        {
          item: { id: '5', name: 'Images', type: 'folder' },
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

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `nodes` | `Array<TreeNode<any>>` | - | Array of tree nodes to display |
| `textField` | `string \| GetText<any>` | - | Field name or function to get node text |
| `style` | `string` | `""` | Custom CSS styles for the tree container |
| `lazyLoader` | `LazyLoader \| null` | `null` | Lazy loading configuration |
| `activeNode` | `any` | `null` | Currently active/selected node |
| `class` | `string` | `""` | Additional CSS class names |
| `isVisible` | `NodeVisibleFun` | `null` | Function to determine node visibility |
| `onSelectionChange` | `OnNodeSelectionChange` | `null` | Node selection change callback |
| `onContextMenu` | `OnContextMenu` | `null` | Context menu callback |
| `checkIsDirectory` | `CheckIsDirectory<any>` | - | Function to check if node is a directory |

## Type Definitions

```typescript
/**
 * Tree node structure
 */
export type TreeNode<T> = {
  item: T;
  expand?: boolean;
  children?: TreeNode<T>[];
};

/**
 * Function to check if node is a directory/branch
 */
export type CheckIsDirectory<T> = (node: TreeNode<T>) => boolean;

/**
 * Function to get text from node item
 */
export type GetText<T> = (data: T) => string;

/**
 * Node selection change callback
 */
export type OnNodeSelectionChange = (node: TreeNode<any>) => Promise<boolean>;

/**
 * Node visibility filter function
 */
export type NodeVisibleFun = (node: TreeNode<any>) => boolean;

/**
 * Load children function for lazy loading
 */
export type LoadChildrenFun = (item: TreeNode<any>) => Promise<Array<TreeNode<any>>>;

/**
 * Lazy loader configuration
 */
export interface LazyLoader {
  /**
   * Check if node is a branch (has children)
   */
  isBranch: CheckIsDirectory<any>;

  /**
   * Data loader function
   */
  load: LoadChildrenFun;
}
```

## Usage Examples

### File System Tree

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
      item: { id: 'root', name: 'Project Root', type: 'folder' },
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
    console.log('Selected node:', node.item.name);
    selectedNode = node;
    return true; // Allow selection
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
      <h3>Selected: {selectedNode.item.name}</h3>
      <p><strong>Type:</strong> {selectedNode.item.type}</p>
      {#if selectedNode.item.size}
        <p><strong>Size:</strong> {selectedNode.item.size} bytes</p>
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

### Organization Chart

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
        name: 'John Smith',
        position: 'CEO',
        department: 'Executive',
        hasSubordinates: true
      },
      expand: true,
      children: [
        {
          item: {
            id: 'cto',
            name: 'Sarah Johnson',
            position: 'CTO',
            department: 'Technology',
            hasSubordinates: true
          },
          expand: true,
          children: [
            {
              item: {
                id: 'dev-manager',
                name: 'Mike Wilson',
                position: 'Development Manager',
                department: 'Engineering',
                hasSubordinates: true
              },
              expand: false,
              children: [
                { item: { id: 'dev1', name: 'Alice Brown', position: 'Senior Developer', department: 'Engineering', hasSubordinates: false } },
                { item: { id: 'dev2', name: 'Bob Davis', position: 'Developer', department: 'Engineering', hasSubordinates: false } }
              ]
            },
            { item: { id: 'qa', name: 'Emily Chen', position: 'QA Lead', department: 'Quality Assurance', hasSubordinates: false } }
          ]
        },
        {
          item: {
            id: 'cfo',
            name: 'David Rodriguez',
            position: 'CFO',
            department: 'Finance',
            hasSubordinates: true
          },
          expand: false,
          children: [
            { item: { id: 'accountant', name: 'Lisa Wang', position: 'Senior Accountant', department: 'Finance', hasSubordinates: false } }
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
  <h2>Organization Chart</h2>
  
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
        <p><strong>Department:</strong> {selectedEmployee.item.department}</p>
        <p><strong>ID:</strong> {selectedEmployee.item.id}</p>
        <p><strong>Has Team:</strong> {selectedEmployee.item.hasSubordinates ? 'Yes' : 'No'}</p>
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

### Lazy Loading Tree

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

  // Initial root nodes
  let initialNodes: TreeNode<ApiNode>[] = [
    {
      item: { id: 'api', name: 'API Endpoints', type: 'folder', hasChildren: true },
      expand: false
    },
    {
      item: { id: 'components', name: 'Components', type: 'folder', hasChildren: true },
      expand: false
    }
  ];

  const checkIsDirectory: CheckIsDirectory<ApiNode> = (node) => {
    return node.item.type === 'folder' && node.item.hasChildren;
  };

  // Simulate API call for loading children
  const loadChildren: LoadChildrenFun = async (parentNode) => {
    console.log('Loading children for:', parentNode.item.name);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock data based on parent node
    if (parentNode.item.id === 'api') {
      return [
        {
          item: { id: 'users', name: 'Users API', type: 'folder', hasChildren: true }
        },
        {
          item: { id: 'orders', name: 'Orders API', type: 'folder', hasChildren: true }
        },
        {
          item: { id: 'auth', name: 'Authentication', type: 'file' }
        }
      ];
    } else if (parentNode.item.id === 'components') {
      return [
        {
          item: { id: 'ui', name: 'UI Components', type: 'folder', hasChildren: true }
        },
        {
          item: { id: 'forms', name: 'Form Components', type: 'folder', hasChildren: true }
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
    console.log('Selected:', node.item.name);
    return true;
  }
</script>

<div class="api-explorer">
  <h2>API Explorer (Lazy Loading)</h2>
  
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
      <h3>Selected: {activeNode.item.name}</h3>
      <p><strong>Type:</strong> {activeNode.item.type}</p>
      <p><strong>ID:</strong> {activeNode.item.id}</p>
      {#if activeNode.item.hasChildren}
        <p><strong>Has Children:</strong> Yes</p>
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

### Filtered Tree with Context Menu

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
      item: { id: 'dashboard', label: 'Dashboard', icon: '📊', category: 'main' },
      expand: true,
      children: [
        { item: { id: 'analytics', label: 'Analytics', icon: '📈', category: 'dashboard' } },
        { item: { id: 'reports', label: 'Reports', icon: '📋', category: 'dashboard' } }
      ]
    },
    {
      item: { id: 'users', label: 'User Management', icon: '👥', category: 'main' },
      expand: false,
      children: [
        { item: { id: 'user-list', label: 'User List', icon: '📝', category: 'users' } },
        { item: { id: 'user-roles', label: 'Roles & Permissions', icon: '🔒', category: 'users' } },
        { item: { id: 'user-settings', label: 'User Settings', icon: '⚙️', category: 'users' } }
      ]
    },
    {
      item: { id: 'content', label: 'Content Management', icon: '📄', category: 'main' },
      expand: false,
      children: [
        { item: { id: 'pages', label: 'Pages', icon: '📖', category: 'content' } },
        { item: { id: 'media', label: 'Media Library', icon: '🖼️', category: 'content' } }
      ]
    },
    {
      item: { id: 'settings', label: 'System Settings', icon: '🔧', category: 'main' },
      expand: false,
      children: [
        { item: { id: 'general', label: 'General', icon: '⚙️', category: 'settings' } },
        { item: { id: 'security', label: 'Security', icon: '🛡️', category: 'settings' } }
      ]
    }
  ];

  let searchQuery = '';
  let selectedNode: TreeNode<MenuItem> | null = null;

  const checkIsDirectory: CheckIsDirectory<MenuItem> = (node) => {
    return node.children && node.children.length > 0;
  };

  // Filter function for search
  const nodeVisibilityFilter: NodeVisibleFun = (node) => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      node.item.label.toLowerCase().includes(query) ||
      node.item.category.toLowerCase().includes(query)
    );
  };

  // Node selection handler
  const handleNodeSelection: OnNodeSelectionChange = async (node) => {
    selectedNode = node;
    console.log('Selected menu item:', node.item.label);
    return true;
  };

  // Context menu handler
  const handleContextMenu: OnContextMenu = (event, node) => {
    event.preventDefault();
    console.log('Context menu for:', node.item.label);
    
    // You could show a custom context menu here
    const menuItems = [
      { label: 'Edit', action: () => console.log('Edit', node.item.label) },
      { label: 'Delete', action: () => console.log('Delete', node.item.label) },
      { label: 'Duplicate', action: () => console.log('Duplicate', node.item.label) }
    ];
    
    // Show context menu at cursor position
    showContextMenu(event.clientX, event.clientY, menuItems);
  };

  function showContextMenu(x: number, y: number, items: any[]) {
    // Implementation would show a context menu at the specified position
    alert(`Context menu at (${x}, ${y})\nItems: ${items.map(i => i.label).join(', ')}`);
  }

  function clearSearch() {
    searchQuery = '';
  }
</script>

<div class="menu-manager">
  <h2>Navigation Menu Manager</h2>
  
  <div class="search-controls">
    <input
      type="text"
      bind:value={searchQuery}
      placeholder="Search menu items..."
      class="search-input"
    />
    {#if searchQuery}
      <button on:click={clearSearch} class="clear-btn">Clear</button>
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
            <strong>Category:</strong> {selectedNode.item.category}
          </div>
          <div class="detail-item">
            <strong>Type:</strong> {checkIsDirectory(selectedNode) ? 'Menu Group' : 'Menu Item'}
          </div>
          {#if selectedNode.children}
            <div class="detail-item">
              <strong>Children:</strong> {selectedNode.children.length}
            </div>
          {/if}
        </div>
        
        <div class="action-buttons">
          <button class="btn btn-primary">Edit</button>
          <button class="btn btn-secondary">Duplicate</button>
          <button class="btn btn-danger">Delete</button>
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

## Styling

The TreeView component uses the following CSS classes:

```css
.uniface-tree-view {
  /* Main tree container */
}

/* Individual tree nodes are styled by the TreeNodeView component */
```

## API Reference

### TreeView Component Props

```typescript
interface TreeViewProps {
  nodes: Array<TreeNode<any>>;        // Tree nodes to display
  textField: string | GetText<any>;   // Field or function for node text
  style?: string;                     // Custom styles
  lazyLoader?: LazyLoader | null;     // Lazy loading config
  activeNode?: any;                   // Currently active node
  class?: string;                     // CSS classes
  isVisible?: NodeVisibleFun;         // Node visibility filter
  onSelectionChange?: OnNodeSelectionChange; // Selection callback
  onContextMenu?: OnContextMenu;      // Context menu callback
  checkIsDirectory: CheckIsDirectory<any>; // Directory check function
}
```

## Integration with TreeNodes Utility

The TreeView component works seamlessly with the TreeNodes utility class for managing hierarchical data:

```svelte
<script lang="ts">
  import TreeView from '@ticatec/uniface-element/TreeView';
  import TreeNodes from '@ticatec/uniface-element/TreeNodes';

  // Create TreeNodes instance for data management
  const treeManager = new TreeNodes({
    keyField: 'id',
    parentKeyField: 'parentId',
    textField: 'name',
    checkIsRoot: (item) => !item.parentId,
    checkIsDirectory: (node) => node.item.type === 'folder'
  });

  // Set flat data array - TreeNodes will build the hierarchy
  let flatData = [
    { id: '1', name: 'Root', type: 'folder', parentId: null },
    { id: '2', name: 'Child 1', type: 'folder', parentId: '1' },
    { id: '3', name: 'File 1', type: 'file', parentId: '2' }
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

## Best Practices

1. **Performance** - Use lazy loading for large tree structures (>100 nodes)
2. **Node Text** - Use consistent text field or function for node display
3. **State Management** - Track active/selected nodes for user interaction
4. **Accessibility** - Ensure keyboard navigation support
5. **Error Handling** - Handle loading errors gracefully in lazy loader
6. **Visual Feedback** - Provide loading indicators during lazy loading
7. **Context Actions** - Implement context menus for node operations
8. **Filtering** - Use visibility functions for search/filter functionality