# Tabs Component

A flexible and feature-rich tabbed interface component that allows organizing content into multiple switchable panels with support for scrolling, closing, and custom tab rendering.

## Overview

The Tabs component provides an intuitive way to organize related content into separate, navigable panels. It includes advanced features like horizontal scrolling for many tabs, closable tabs, reload functionality, and custom tab rendering. Perfect for dashboards, settings panels, multi-step forms, and content organization.

## Installation

```typescript
import Tabs from '@ticatec/uniface-element/Tabs';
import type { TabActionHandler, TabCloseHandler, TabRender } from '@ticatec/uniface-element/Tabs';
```

## Basic Usage

```svelte
<script lang="ts">
  import Tabs from '@ticatec/uniface-element/Tabs';

  let tabData = [
    { id: 1, text: 'Dashboard', content: 'dashboard' },
    { id: 2, text: 'Users', content: 'users' },
    { id: 3, text: 'Settings', content: 'settings' }
  ];

  let activeTab = tabData[0];
</script>

<Tabs tabs={tabData} bind:activeTab>
  <div class="tab-content">
    {#if activeTab.content === 'dashboard'}
      <div class="dashboard-panel">
        <h3>Dashboard Content</h3>
        <p>Welcome to your dashboard...</p>
      </div>
    {:else if activeTab.content === 'users'}
      <div class="users-panel">
        <h3>User Management</h3>
        <p>Manage your users here...</p>
      </div>
    {:else if activeTab.content === 'settings'}
      <div class="settings-panel">
        <h3>Application Settings</h3>
        <p>Configure your application...</p>
      </div>
    {/if}
  </div>
</Tabs>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `class` | `string` | `""` | Additional CSS class names |
| `simple` | `boolean` | `false` | Use simplified tab styling |
| `textField` | `string` | `'text'` | Property name to use for tab text |
| `style` | `string` | `''` | Custom CSS styles for tabs container |
| `tabs` | `Array<any>` | `[]` | Array of tab objects |
| `scrollStep` | `number` | `100` | Pixels to scroll when using scroll buttons |
| `closable` | `boolean \| TabActionHandler` | `false` | Enable tab closing or custom close logic |
| `activeTab` | `any` | `null` | Currently active tab object |
| `tabRender` | `TabRender` | `null` | Custom tab rendering component |
| `reloadHandler` | `TabActionHandler` | `null` | Handler for tab reload action |
| `closeHandler` | `TabCloseHandler` | `null` | Handler for tab close action |

## Type Definitions

```typescript
export type TabActionHandler = (tab: any) => void;
export type TabCloseHandler = (tab: any) => Promise<boolean>;
export type TabRender = (tab: any) => any;
```

## Usage Examples

### Basic Tabs

```svelte
<script lang="ts">
  import Tabs from '@ticatec/uniface-element/Tabs';

  let navigationTabs = [
    { id: 'overview', text: 'Overview' },
    { id: 'analytics', text: 'Analytics' },
    { id: 'reports', text: 'Reports' },
    { id: 'settings', text: 'Settings' }
  ];

  let currentTab = navigationTabs[0];
</script>

<Tabs tabs={navigationTabs} bind:activeTab={currentTab}>
  <div class="content-area">
    {#if currentTab.id === 'overview'}
      <h2>System Overview</h2>
      <p>General system information and status.</p>
    {:else if currentTab.id === 'analytics'}
      <h2>Analytics Dashboard</h2>
      <p>View detailed analytics and metrics.</p>
    {:else if currentTab.id === 'reports'}
      <h2>Reports</h2>
      <p>Generate and view system reports.</p>
    {:else if currentTab.id === 'settings'}
      <h2>Configuration</h2>
      <p>Manage system settings and preferences.</p>
    {/if}
  </div>
</Tabs>
```

### Closable Tabs

```svelte
<script lang="ts">
  import Tabs from '@ticatec/uniface-element/Tabs';
  import type { TabCloseHandler } from '@ticatec/uniface-element/Tabs';

  let documentTabs = [
    { id: 1, text: 'Document 1', modified: false },
    { id: 2, text: 'Document 2', modified: true },
    { id: 3, text: 'Document 3', modified: false }
  ];

  let activeDocument = documentTabs[0];

  const handleTabClose: TabCloseHandler = async (tab) => {
    if (tab.modified) {
      const shouldClose = confirm(`"${tab.text}" has unsaved changes. Close anyway?`);
      return shouldClose;
    }
    return true;
  };
</script>

<Tabs 
  tabs={documentTabs} 
  bind:activeTab={activeDocument}
  closable={true}
  closeHandler={handleTabClose}
>
  <div class="document-editor">
    <h3>Editing: {activeDocument.text}</h3>
    <textarea placeholder="Document content..." rows="10" cols="50"></textarea>
    {#if activeDocument.modified}
      <p class="unsaved-indicator">• Unsaved changes</p>
    {/if}
  </div>
</Tabs>
```

### Tabs with Reload Functionality

```svelte
<script lang="ts">
  import Tabs from '@ticatec/uniface-element/Tabs';
  import type { TabActionHandler } from '@ticatec/uniface-element/Tabs';

  let dataTabs = [
    { id: 'users', text: 'Users', lastRefresh: new Date() },
    { id: 'orders', text: 'Orders', lastRefresh: new Date() },
    { id: 'products', text: 'Products', lastRefresh: new Date() }
  ];

  let activeDataTab = dataTabs[0];

  const handleTabReload: TabActionHandler = (tab) => {
    console.log(`Reloading ${tab.text} data...`);
    tab.lastRefresh = new Date();
    // Trigger data refresh logic here
    refreshTabData(tab.id);
  };

  function refreshTabData(tabId: string) {
    // Simulate data refresh
    console.log(`Refreshing data for tab: ${tabId}`);
  }
</script>

<Tabs 
  tabs={dataTabs} 
  bind:activeTab={activeDataTab}
  reloadHandler={handleTabReload}
>
  <div class="data-panel">
    <div class="panel-header">
      <h3>{activeDataTab.text} Data</h3>
      <small>Last refreshed: {activeDataTab.lastRefresh.toLocaleTimeString()}</small>
    </div>
    
    <div class="data-content">
      {#if activeDataTab.id === 'users'}
        <p>User management interface...</p>
      {:else if activeDataTab.id === 'orders'}
        <p>Order tracking and management...</p>
      {:else if activeDataTab.id === 'products'}
        <p>Product catalog management...</p>
      {/if}
    </div>
  </div>
</Tabs>
```

### Custom Tab Field

```svelte
<script lang="ts">
  import Tabs from '@ticatec/uniface-element/Tabs';

  // Using custom field name for tab labels
  let projectTabs = [
    { projectId: 'proj-1', name: 'Website Redesign', status: 'active' },
    { projectId: 'proj-2', name: 'Mobile App', status: 'completed' },
    { projectId: 'proj-3', name: 'API Integration', status: 'pending' }
  ];

  let selectedProject = projectTabs[0];
</script>

<Tabs 
  tabs={projectTabs} 
  bind:activeTab={selectedProject}
  textField="name"
>
  <div class="project-details">
    <h2>{selectedProject.name}</h2>
    <p>Project ID: {selectedProject.projectId}</p>
    <p>Status: <span class="status-{selectedProject.status}">{selectedProject.status}</span></p>
  </div>
</Tabs>

<style>
  .status-active { color: #28a745; }
  .status-completed { color: #6c757d; }
  .status-pending { color: #ffc107; }
</style>
```

### Scrollable Tabs with Many Items

```svelte
<script lang="ts">
  import Tabs from '@ticatec/uniface-element/Tabs';

  // Generate many tabs to demonstrate scrolling
  let manyTabs = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    text: `Tab ${i + 1}`,
    content: `Content for tab ${i + 1}`
  }));

  let activeManyTab = manyTabs[0];
</script>

<div style="max-width: 600px; margin: 20px 0;">
  <Tabs 
    tabs={manyTabs} 
    bind:activeTab={activeManyTab}
    scrollStep={150}
    style="border: 1px solid #dee2e6; border-radius: 8px;"
  >
    <div class="scrollable-content">
      <h3>{activeManyTab.text}</h3>
      <p>{activeManyTab.content}</p>
      <p>This demonstrates horizontal scrolling when there are many tabs.</p>
    </div>
  </Tabs>
</div>

<style>
  .scrollable-content {
    padding: 20px;
    min-height: 200px;
  }
</style>
```

### Custom Tab Rendering

```svelte
<script lang="ts">
  import Tabs from '@ticatec/uniface-element/Tabs';
  import type { TabRender } from '@ticatec/uniface-element/Tabs';
  import CustomTabRenderer from './CustomTabRenderer.svelte';

  let notificationTabs = [
    { id: 'inbox', text: 'Inbox', count: 5, icon: 'inbox' },
    { id: 'sent', text: 'Sent', count: 0, icon: 'send' },
    { id: 'drafts', text: 'Drafts', count: 2, icon: 'draft' },
    { id: 'trash', text: 'Trash', count: 1, icon: 'delete' }
  ];

  let activeNotificationTab = notificationTabs[0];

  // Custom tab renderer component
  const customTabRenderer: TabRender = CustomTabRenderer;
</script>

<Tabs 
  tabs={notificationTabs} 
  bind:activeTab={activeNotificationTab}
  tabRender={customTabRenderer}
>
  <div class="notification-panel">
    <h3>{activeNotificationTab.text}</h3>
    <p>Items: {activeNotificationTab.count}</p>
    
    {#if activeNotificationTab.id === 'inbox'}
      <div class="inbox-content">
        <p>You have {activeNotificationTab.count} new messages.</p>
      </div>
    {:else if activeNotificationTab.id === 'drafts'}
      <div class="drafts-content">
        <p>You have {activeNotificationTab.count} draft messages.</p>
      </div>
    {:else}
      <div class="empty-content">
        <p>No items in {activeNotificationTab.text.toLowerCase()}.</p>
      </div>
    {/if}
  </div>
</Tabs>
```

CustomTabRenderer.svelte:
```svelte
<script lang="ts">
  export let tab: any;
  export let closable: boolean = false;
  export let closeTab: (() => void) | null = null;
  export let reloadTab: (() => void) | null = null;
</script>

<div class="custom-tab">
  <i class="icon-{tab.icon}"></i>
  <span class="tab-text">{tab.text}</span>
  {#if tab.count > 0}
    <span class="badge">{tab.count}</span>
  {/if}
  
  {#if reloadTab}
    <button class="tab-action reload" on:click={reloadTab} aria-label="Reload">
      <i class="icon-refresh"></i>
    </button>
  {/if}
  
  {#if closable && closeTab}
    <button class="tab-action close" on:click={closeTab} aria-label="Close">
      <i class="icon-close"></i>
    </button>
  {/if}
</div>

<style>
  .custom-tab {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 12px;
  }
  
  .badge {
    background: #dc3545;
    color: white;
    font-size: 0.75rem;
    padding: 2px 6px;
    border-radius: 10px;
    min-width: 18px;
    text-align: center;
  }
  
  .tab-action {
    background: none;
    border: none;
    cursor: pointer;
    padding: 2px;
    opacity: 0.6;
    transition: opacity 0.2s;
  }
  
  .tab-action:hover {
    opacity: 1;
  }
</style>
```

### Advanced Tabs with Dynamic Content

```svelte
<script lang="ts">
  import Tabs from '@ticatec/uniface-element/Tabs';
  import type { TabActionHandler, TabCloseHandler } from '@ticatec/uniface-element/Tabs';

  let workspaceTabs = [
    { id: 'workspace-1', text: 'Main Workspace', type: 'workspace', canClose: false },
    { id: 'file-1', text: 'app.js', type: 'file', modified: false, canClose: true },
    { id: 'file-2', text: 'styles.css', type: 'file', modified: true, canClose: true }
  ];

  let activeWorkspaceTab = workspaceTabs[0];

  const isClosable: TabActionHandler = (tab) => {
    return tab.canClose === true;
  };

  const handleClose: TabCloseHandler = async (tab) => {
    if (tab.type === 'file' && tab.modified) {
      const save = confirm(`Save changes to ${tab.text}?`);
      if (save) {
        // Simulate save operation
        await new Promise(resolve => setTimeout(resolve, 500));
        tab.modified = false;
      }
    }
    return true;
  };

  const handleReload: TabActionHandler = (tab) => {
    if (tab.type === 'file') {
      console.log(`Reloading file: ${tab.text}`);
      tab.modified = false;
    }
  };

  function addNewFile() {
    const fileId = `file-${Date.now()}`;
    const newFile = {
      id: fileId,
      text: 'untitled.txt',
      type: 'file',
      modified: false,
      canClose: true
    };
    workspaceTabs = [...workspaceTabs, newFile];
    activeWorkspaceTab = newFile;
  }
</script>

<div class="ide-interface">
  <div class="toolbar">
    <button on:click={addNewFile} class="btn-new-file">
      + New File
    </button>
  </div>
  
  <Tabs 
    tabs={workspaceTabs}
    bind:activeTab={activeWorkspaceTab}
    closable={isClosable}
    closeHandler={handleClose}
    reloadHandler={handleReload}
    class="ide-tabs"
  >
    <div class="editor-area">
      {#if activeWorkspaceTab.type === 'workspace'}
        <div class="workspace-content">
          <h3>Welcome to the Workspace</h3>
          <p>Open files will appear as tabs above.</p>
        </div>
      {:else if activeWorkspaceTab.type === 'file'}
        <div class="file-editor">
          <div class="file-header">
            <h4>{activeWorkspaceTab.text}</h4>
            {#if activeWorkspaceTab.modified}
              <span class="modified-indicator">●</span>
            {/if}
          </div>
          <textarea
            class="code-editor"
            placeholder="Enter your code here..."
            on:input={() => activeWorkspaceTab.modified = true}
          ></textarea>
        </div>
      {/if}
    </div>
  </Tabs>
</div>

<style>
  .ide-interface {
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .toolbar {
    background: #f8f9fa;
    padding: 8px 16px;
    border-bottom: 1px solid #dee2e6;
  }
  
  .btn-new-file {
    padding: 6px 12px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .editor-area {
    min-height: 300px;
    padding: 16px;
  }
  
  .file-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
  }
  
  .file-header h4 {
    margin: 0;
  }
  
  .modified-indicator {
    color: #ffc107;
    font-size: 1.5rem;
    line-height: 1;
  }
  
  .code-editor {
    width: 100%;
    height: 200px;
    font-family: 'Courier New', monospace;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .workspace-content {
    text-align: center;
    padding: 40px;
    color: #666;
  }
</style>
```

## Styling

The Tabs component uses the following CSS classes:

```css
.uniface-tab-panel {
  /* Main tabs container */
}

.uniface-tabs-wrap {
  /* Tab header container */
}

.uniface-tabs-wrap.simple {
  /* Simple styling variant */
}

.scroll-left, .scroll-right {
  /* Scroll control buttons */
}

.tabs-panel {
  /* Tab buttons container */
}

.uniface-tab {
  /* Individual tab button */
}

.uniface-tab.active {
  /* Active tab styling */
}

.tab-content {
  /* Tab content area */
}

.tab-refresh, .tab-action {
  /* Tab action buttons (refresh, close) */
}
```

## API Reference

### Tabs Component Props

```typescript
interface TabsProps {
  class?: string;                           // Additional CSS classes
  simple?: boolean;                         // Simplified styling
  textField?: string;                       // Field name for tab text
  style?: string;                          // Custom styles
  tabs: Array<any>;                        // Tab data array
  scrollStep?: number;                     // Scroll amount in pixels
  closable?: boolean | TabActionHandler;   // Enable closing
  activeTab?: any;                         // Current active tab
  tabRender?: TabRender;                   // Custom tab renderer
  reloadHandler?: TabActionHandler;        // Reload callback
  closeHandler?: TabCloseHandler;          // Close callback
}
```

### Type Definitions

```typescript
/**
 * Tab action handler function
 */
export type TabActionHandler = (tab: any) => void;

/**
 * Tab close handler function - return false to prevent closing
 */
export type TabCloseHandler = (tab: any) => Promise<boolean>;

/**
 * Custom tab render component
 */
export type TabRender = (tab: any) => any;
```

## Best Practices

1. **Consistent Tab Data** - Use consistent object structure across all tab items
2. **Performance** - Avoid heavy computations in tab rendering, especially with many tabs
3. **Keyboard Navigation** - Ensure tabs are accessible via keyboard navigation
4. **Loading States** - Show loading indicators when tab content is being fetched
5. **Memory Management** - Clean up resources when tabs are closed
6. **Visual Feedback** - Provide clear visual feedback for active, hover, and disabled states
7. **Mobile Responsiveness** - Consider how tabs behave on smaller screens
8. **Content Management** - Use proper lifecycle management for tab content components

## Advanced Features

### Programmatic Tab Control

```svelte
<script lang="ts">
  import Tabs from '@ticatec/uniface-element/Tabs';
  
  let tabs = [...];
  let activeTab = tabs[0];
  let tabsRef: Tabs;

  function switchToTab(tabId: string) {
    const tab = tabs.find(t => t.id === tabId);
    if (tab) {
      activeTab = tab;
    }
  }

  function addTab(tabData: any) {
    tabs = [...tabs, tabData];
  }

  function removeTab(tabId: string) {
    tabs = tabs.filter(t => t.id !== tabId);
    // Update active tab if needed
    if (activeTab.id === tabId && tabs.length > 0) {
      activeTab = tabs[0];
    }
  }
</script>

<Tabs bind:this={tabsRef} bind:tabs bind:activeTab>
  <!-- Tab content -->
</Tabs>
```

## Integration with Routing

The Tabs component can be integrated with client-side routing:

```svelte
<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  
  $: currentRoute = $page.route.id;
  
  function handleTabChange(tab: any) {
    goto(`/dashboard/${tab.route}`);
  }
</script>
```