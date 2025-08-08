# Tabs 标签页组件

一个灵活且功能丰富的标签页界面组件，允许将内容组织为多个可切换的面板，支持滚动、关闭和自定义标签页渲染。

## 概述

Tabs 组件提供了一种直观的方式来将相关内容组织到单独的、可导航的面板中。它包含高级功能，如多个标签页的水平滚动、可关闭标签页、重新加载功能和自定义标签页渲染。非常适合用于仪表板、设置面板、多步骤表单和内容组织。

## 安装

```typescript
import Tabs from '@ticatec/uniface-element/Tabs';
import type { TabActionHandler, TabCloseHandler, TabRender } from '@ticatec/uniface-element/Tabs';
```

## 基本用法

```svelte
<script lang="ts">
  import Tabs from '@ticatec/uniface-element/Tabs';

  let tabData = [
    { id: 1, text: '仪表板', content: 'dashboard' },
    { id: 2, text: '用户', content: 'users' },
    { id: 3, text: '设置', content: 'settings' }
  ];

  let activeTab = tabData[0];
</script>

<Tabs tabs={tabData} bind:activeTab>
  <div class="tab-content">
    {#if activeTab.content === 'dashboard'}
      <div class="dashboard-panel">
        <h3>仪表板内容</h3>
        <p>欢迎来到您的仪表板...</p>
      </div>
    {:else if activeTab.content === 'users'}
      <div class="users-panel">
        <h3>用户管理</h3>
        <p>在这里管理您的用户...</p>
      </div>
    {:else if activeTab.content === 'settings'}
      <div class="settings-panel">
        <h3>应用程序设置</h3>
        <p>配置您的应用程序...</p>
      </div>
    {/if}
  </div>
</Tabs>
```

## 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `class` | `string` | `""` | 额外的 CSS 类名 |
| `simple` | `boolean` | `false` | 使用简化的标签页样式 |
| `textField` | `string` | `'text'` | 用于标签页文本的属性名称 |
| `style` | `string` | `''` | 标签页容器的自定义 CSS 样式 |
| `tabs` | `Array<any>` | `[]` | 标签页对象数组 |
| `scrollStep` | `number` | `100` | 使用滚动按钮时滚动的像素数 |
| `closable` | `boolean \| TabActionHandler` | `false` | 启用标签页关闭或自定义关闭逻辑 |
| `activeTab` | `any` | `null` | 当前活动的标签页对象 |
| `tabRender` | `TabRender` | `null` | 自定义标签页渲染组件 |
| `reloadHandler` | `TabActionHandler` | `null` | 标签页重新加载操作的处理程序 |
| `closeHandler` | `TabCloseHandler` | `null` | 标签页关闭操作的处理程序 |

## 类型定义

```typescript
export type TabActionHandler = (tab: any) => void;
export type TabCloseHandler = (tab: any) => Promise<boolean>;
export type TabRender = (tab: any) => any;
```

## 使用示例

### 基础标签页

```svelte
<script lang="ts">
  import Tabs from '@ticatec/uniface-element/Tabs';

  let navigationTabs = [
    { id: 'overview', text: '概览' },
    { id: 'analytics', text: '分析' },
    { id: 'reports', text: '报告' },
    { id: 'settings', text: '设置' }
  ];

  let currentTab = navigationTabs[0];
</script>

<Tabs tabs={navigationTabs} bind:activeTab={currentTab}>
  <div class="content-area">
    {#if currentTab.id === 'overview'}
      <h2>系统概览</h2>
      <p>一般系统信息和状态。</p>
    {:else if currentTab.id === 'analytics'}
      <h2>分析仪表板</h2>
      <p>查看详细的分析和指标。</p>
    {:else if currentTab.id === 'reports'}
      <h2>报告</h2>
      <p>生成和查看系统报告。</p>
    {:else if currentTab.id === 'settings'}
      <h2>配置</h2>
      <p>管理系统设置和首选项。</p>
    {/if}
  </div>
</Tabs>
```

### 可关闭标签页

```svelte
<script lang="ts">
  import Tabs from '@ticatec/uniface-element/Tabs';
  import type { TabCloseHandler } from '@ticatec/uniface-element/Tabs';

  let documentTabs = [
    { id: 1, text: '文档 1', modified: false },
    { id: 2, text: '文档 2', modified: true },
    { id: 3, text: '文档 3', modified: false }
  ];

  let activeDocument = documentTabs[0];

  const handleTabClose: TabCloseHandler = async (tab) => {
    if (tab.modified) {
      const shouldClose = confirm(`"${tab.text}" 有未保存的更改。仍要关闭吗？`);
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
    <h3>正在编辑: {activeDocument.text}</h3>
    <textarea placeholder="文档内容..." rows="10" cols="50"></textarea>
    {#if activeDocument.modified}
      <p class="unsaved-indicator">• 未保存的更改</p>
    {/if}
  </div>
</Tabs>
```

### 带重新加载功能的标签页

```svelte
<script lang="ts">
  import Tabs from '@ticatec/uniface-element/Tabs';
  import type { TabActionHandler } from '@ticatec/uniface-element/Tabs';

  let dataTabs = [
    { id: 'users', text: '用户', lastRefresh: new Date() },
    { id: 'orders', text: '订单', lastRefresh: new Date() },
    { id: 'products', text: '产品', lastRefresh: new Date() }
  ];

  let activeDataTab = dataTabs[0];

  const handleTabReload: TabActionHandler = (tab) => {
    console.log(`正在重新加载 ${tab.text} 数据...`);
    tab.lastRefresh = new Date();
    // 在这里触发数据刷新逻辑
    refreshTabData(tab.id);
  };

  function refreshTabData(tabId: string) {
    // 模拟数据刷新
    console.log(`正在刷新标签页数据: ${tabId}`);
  }
</script>

<Tabs 
  tabs={dataTabs} 
  bind:activeTab={activeDataTab}
  reloadHandler={handleTabReload}
>
  <div class="data-panel">
    <div class="panel-header">
      <h3>{activeDataTab.text} 数据</h3>
      <small>最后刷新: {activeDataTab.lastRefresh.toLocaleTimeString()}</small>
    </div>
    
    <div class="data-content">
      {#if activeDataTab.id === 'users'}
        <p>用户管理界面...</p>
      {:else if activeDataTab.id === 'orders'}
        <p>订单跟踪和管理...</p>
      {:else if activeDataTab.id === 'products'}
        <p>产品目录管理...</p>
      {/if}
    </div>
  </div>
</Tabs>
```

### 自定义标签页字段

```svelte
<script lang="ts">
  import Tabs from '@ticatec/uniface-element/Tabs';

  // 使用自定义字段名称作为标签页标签
  let projectTabs = [
    { projectId: 'proj-1', name: '网站重新设计', status: 'active' },
    { projectId: 'proj-2', name: '移动应用', status: 'completed' },
    { projectId: 'proj-3', name: 'API 集成', status: 'pending' }
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
    <p>项目 ID: {selectedProject.projectId}</p>
    <p>状态: <span class="status-{selectedProject.status}">{selectedProject.status}</span></p>
  </div>
</Tabs>

<style>
  .status-active { color: #28a745; }
  .status-completed { color: #6c757d; }
  .status-pending { color: #ffc107; }
</style>
```

### 带多个项目的可滚动标签页

```svelte
<script lang="ts">
  import Tabs from '@ticatec/uniface-element/Tabs';

  // 生成多个标签页以演示滚动功能
  let manyTabs = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    text: `标签页 ${i + 1}`,
    content: `标签页 ${i + 1} 的内容`
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
      <p>这演示了当有很多标签页时的水平滚动。</p>
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

### 自定义标签页渲染

```svelte
<script lang="ts">
  import Tabs from '@ticatec/uniface-element/Tabs';
  import type { TabRender } from '@ticatec/uniface-element/Tabs';
  import CustomTabRenderer from './CustomTabRenderer.svelte';

  let notificationTabs = [
    { id: 'inbox', text: '收件箱', count: 5, icon: 'inbox' },
    { id: 'sent', text: '已发送', count: 0, icon: 'send' },
    { id: 'drafts', text: '草稿', count: 2, icon: 'draft' },
    { id: 'trash', text: '回收站', count: 1, icon: 'delete' }
  ];

  let activeNotificationTab = notificationTabs[0];

  // 自定义标签页渲染器组件
  const customTabRenderer: TabRender = CustomTabRenderer;
</script>

<Tabs 
  tabs={notificationTabs} 
  bind:activeTab={activeNotificationTab}
  tabRender={customTabRenderer}
>
  <div class="notification-panel">
    <h3>{activeNotificationTab.text}</h3>
    <p>项目数: {activeNotificationTab.count}</p>
    
    {#if activeNotificationTab.id === 'inbox'}
      <div class="inbox-content">
        <p>您有 {activeNotificationTab.count} 条新消息。</p>
      </div>
    {:else if activeNotificationTab.id === 'drafts'}
      <div class="drafts-content">
        <p>您有 {activeNotificationTab.count} 条草稿消息。</p>
      </div>
    {:else}
      <div class="empty-content">
        <p>{activeNotificationTab.text} 中没有项目。</p>
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
    <button class="tab-action reload" on:click={reloadTab} aria-label="重新加载">
      <i class="icon-refresh"></i>
    </button>
  {/if}
  
  {#if closable && closeTab}
    <button class="tab-action close" on:click={closeTab} aria-label="关闭">
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

### 带动态内容的高级标签页

```svelte
<script lang="ts">
  import Tabs from '@ticatec/uniface-element/Tabs';
  import type { TabActionHandler, TabCloseHandler } from '@ticatec/uniface-element/Tabs';

  let workspaceTabs = [
    { id: 'workspace-1', text: '主工作区', type: 'workspace', canClose: false },
    { id: 'file-1', text: 'app.js', type: 'file', modified: false, canClose: true },
    { id: 'file-2', text: 'styles.css', type: 'file', modified: true, canClose: true }
  ];

  let activeWorkspaceTab = workspaceTabs[0];

  const isClosable: TabActionHandler = (tab) => {
    return tab.canClose === true;
  };

  const handleClose: TabCloseHandler = async (tab) => {
    if (tab.type === 'file' && tab.modified) {
      const save = confirm(`保存对 ${tab.text} 的更改？`);
      if (save) {
        // 模拟保存操作
        await new Promise(resolve => setTimeout(resolve, 500));
        tab.modified = false;
      }
    }
    return true;
  };

  const handleReload: TabActionHandler = (tab) => {
    if (tab.type === 'file') {
      console.log(`重新加载文件: ${tab.text}`);
      tab.modified = false;
    }
  };

  function addNewFile() {
    const fileId = `file-${Date.now()}`;
    const newFile = {
      id: fileId,
      text: '未命名.txt',
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
      + 新建文件
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
          <h3>欢迎来到工作区</h3>
          <p>打开的文件将显示为上方的标签页。</p>
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
            placeholder="在这里输入您的代码..."
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

## 样式

Tabs 组件使用以下 CSS 类：

```css
.uniface-tab-panel {
  /* 主要的标签页容器 */
}

.uniface-tabs-wrap {
  /* 标签页头部容器 */
}

.uniface-tabs-wrap.simple {
  /* 简化样式变体 */
}

.scroll-left, .scroll-right {
  /* 滚动控制按钮 */
}

.tabs-panel {
  /* 标签页按钮容器 */
}

.uniface-tab {
  /* 单个标签页按钮 */
}

.uniface-tab.active {
  /* 活动标签页样式 */
}

.tab-content {
  /* 标签页内容区域 */
}

.tab-refresh, .tab-action {
  /* 标签页操作按钮（刷新、关闭） */
}
```

## API 参考

### Tabs 组件属性

```typescript
interface TabsProps {
  class?: string;                           // 额外的 CSS 类
  simple?: boolean;                         // 简化样式
  textField?: string;                       // 标签页文本的字段名
  style?: string;                          // 自定义样式
  tabs: Array<any>;                        // 标签页数据数组
  scrollStep?: number;                     // 滚动像素数
  closable?: boolean | TabActionHandler;   // 启用关闭
  activeTab?: any;                         // 当前活动标签页
  tabRender?: TabRender;                   // 自定义标签页渲染器
  reloadHandler?: TabActionHandler;        // 重新加载回调
  closeHandler?: TabCloseHandler;          // 关闭回调
}
```

### 类型定义

```typescript
/**
 * 标签页操作处理器函数
 */
export type TabActionHandler = (tab: any) => void;

/**
 * 标签页关闭处理器函数 - 返回 false 阻止关闭
 */
export type TabCloseHandler = (tab: any) => Promise<boolean>;

/**
 * 自定义标签页渲染组件
 */
export type TabRender = (tab: any) => any;
```

## 最佳实践

1. **一致的标签页数据** - 在所有标签页项目中使用一致的对象结构
2. **性能优化** - 避免在标签页渲染中进行繁重的计算，特别是有多个标签页时
3. **键盘导航** - 确保标签页可通过键盘导航访问
4. **加载状态** - 在获取标签页内容时显示加载指示器
5. **内存管理** - 在关闭标签页时清理资源
6. **视觉反馈** - 为活动、悬停和禁用状态提供清晰的视觉反馈
7. **移动端响应式** - 考虑标签页在较小屏幕上的行为
8. **内容管理** - 对标签页内容组件使用适当的生命周期管理

## 高级功能

### 程序化标签页控制

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
    // 如果需要，更新活动标签页
    if (activeTab.id === tabId && tabs.length > 0) {
      activeTab = tabs[0];
    }
  }
</script>

<Tabs bind:this={tabsRef} bind:tabs bind:activeTab>
  <!-- 标签页内容 -->
</Tabs>
```

## 与路由集成

Tabs 组件可以与客户端路由集成：

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