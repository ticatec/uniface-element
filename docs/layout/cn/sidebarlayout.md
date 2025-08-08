# 侧边栏布局 SidebarLayout

SidebarLayout组件提供了一个灵活的布局，包含侧边栏、头部和主要内容区域。侧边栏可以动态调整大小，并且布局会根据提供的属性进行适配。

## 功能特性

- **灵活侧边栏**：可调整大小的侧边栏，支持配置最小和最大宽度
- **头部支持**：可选的头部区域，用于导航或品牌展示
- **响应式设计**：适应不同屏幕尺寸和配置
- **分割面板集成**：使用Split组件实现平滑的调整大小功能
- **可定制尺寸**：所有区域的高度和宽度都可配置

## 导入

```typescript
import { SidebarLayout } from '@ticatec/uniface-element/app-layout/SidebarLayout';
```

## 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `sidebarResize` | `boolean` | `false` | 如果设置为 true，则启用侧边栏调整大小功能 |
| `headerHeight` | `string` | `"48px"` | 设置头部的高度 |
| `sidebarWidth` | `string` | `"300px"` | 设置侧边栏的初始宽度 |
| `sidebarMaxWidth` | `string \| null` | `null` | 设置调整大小时侧边栏的最大宽度 |
| `sidebarMinWidth` | `string \| null` | `null` | 设置调整大小时侧边栏的最小宽度 |

## 插槽

- **sidebar**: 要在侧边栏中显示的内容
- **header**: 要在头部中显示的内容（可选）
- **Default Slot**: 要在主要区域显示的主要内容

## 基本用法

```svelte
<script lang="ts">
  import { SidebarLayout } from '@ticatec/uniface-element/app-layout/SidebarLayout';
</script>

<SidebarLayout 
  sidebarResize={true}
  headerHeight="60px"
  sidebarWidth="250px" 
  sidebarMaxWidth="400px" 
  sidebarMinWidth="200px"
>
  <div slot="sidebar">
    <p>侧边栏内容</p>
  </div>

  <div slot="header">
    <h1>头部内容</h1>
  </div>

  <div>
    <p>主要内容区域</p>
  </div>
</SidebarLayout>
```

## 高级示例

### 带导航的应用程序布局

```svelte
<script lang="ts">
  import { SidebarLayout } from '@ticatec/uniface-element/app-layout/SidebarLayout';
  import { NavigatorMenu } from '@ticatec/uniface-element/NavigatorMenu';
  import { Button } from '@ticatec/uniface-element/Button';
  
  let menuItems = [
    { id: 1, text: '仪表板', icon: 'dashboard' },
    { id: 2, text: '用户管理', icon: 'people' },
    { id: 3, text: '系统设置', icon: 'settings' }
  ];
  
  let currentPage = '仪表板';
</script>

<SidebarLayout 
  sidebarResize={true}
  headerHeight="60px"
  sidebarWidth="280px"
  sidebarMaxWidth="400px"
  sidebarMinWidth="200px"
>
  <div slot="header" class="app-header">
    <div class="header-left">
      <h1>我的应用程序</h1>
    </div>
    <div class="header-right">
      <Button variant="outlined">个人资料</Button>
      <Button type="primary">退出登录</Button>
    </div>
  </div>

  <div slot="sidebar" class="app-sidebar">
    <NavigatorMenu 
      items={menuItems}
      on:select={(e) => currentPage = e.detail.text}
    />
  </div>

  <main class="app-content">
    <h2>{currentPage}</h2>
    <p>{currentPage}页面的内容显示在这里...</p>
  </main>
</SidebarLayout>

<style>
  .app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    background: #f5f5f5;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .header-right {
    display: flex;
    gap: 10px;
  }
  
  .app-sidebar {
    padding: 20px 0;
    background: #fafafa;
  }
  
  .app-content {
    padding: 20px;
  }
</style>
```

### 可折叠侧边栏布局

```svelte
<script lang="ts">
  import { SidebarLayout } from '@ticatec/uniface-element/app-layout/SidebarLayout';
  import { IconButton } from '@ticatec/uniface-element/IconButton';
  
  let sidebarCollapsed = false;
  let sidebarWidth = sidebarCollapsed ? '60px' : '250px';
  
  const toggleSidebar = () => {
    sidebarCollapsed = !sidebarCollapsed;
    sidebarWidth = sidebarCollapsed ? '60px' : '250px';
  };
</script>

<SidebarLayout 
  sidebarResize={false}
  {sidebarWidth}
  headerHeight="50px"
>
  <div slot="header" class="header-with-toggle">
    <IconButton 
      icon="menu" 
      on:click={toggleSidebar}
      title={sidebarCollapsed ? '展开侧边栏' : '折叠侧边栏'}
    />
    <h1>仪表板</h1>
  </div>

  <div slot="sidebar" class="collapsible-sidebar">
    {#if sidebarCollapsed}
      <div class="sidebar-icons">
        <IconButton icon="dashboard" title="仪表板" />
        <IconButton icon="people" title="用户管理" />
        <IconButton icon="settings" title="系统设置" />
      </div>
    {:else}
      <nav class="sidebar-nav">
        <a href="#dashboard">仪表板</a>
        <a href="#users">用户管理</a>
        <a href="#settings">系统设置</a>
      </nav>
    {/if}
  </div>

  <div class="main-content">
    <p>主应用程序内容</p>
  </div>
</SidebarLayout>

<style>
  .header-with-toggle {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 0 20px;
    background: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  
  .collapsible-sidebar {
    background: #2c3e50;
    color: white;
    transition: all 0.3s ease;
  }
  
  .sidebar-icons {
    display: flex;
    flex-direction: column;
    padding: 20px 5px;
    gap: 10px;
  }
  
  .sidebar-nav {
    padding: 20px 0;
  }
  
  .sidebar-nav a {
    display: block;
    padding: 12px 20px;
    color: white;
    text-decoration: none;
    transition: background-color 0.2s;
  }
  
  .sidebar-nav a:hover {
    background-color: rgba(255,255,255,0.1);
  }
  
  .main-content {
    padding: 30px;
  }
</style>
```

## 最佳实践

1. **侧边栏内容**：保持侧边栏内容有序且易于扫描
2. **响应式设计**：考虑布局在小屏幕上的表现
3. **调整限制**：为侧边栏设置适当的最小和最大宽度
4. **头部使用**：使用头部插槽在页面间保持导航一致性
5. **内容层次**：使用合适的标题结构组织主要内容
6. **性能考虑**：避免在侧边栏中放置可能影响调整大小性能的重型组件

## 无障碍访问注意事项

- 确保键盘导航在所有区域都能正常工作
- 为调整大小手柄和导航元素提供适当的ARIA标签
- 在侧边栏折叠/展开时保持焦点管理
- 在插槽内使用语义化HTML元素（nav、main、header）
- 确保颜色对比度符合无障碍标准

## 浏览器支持

- 支持CSS Grid和Flexbox的现代浏览器
- 调整大小功能需要指针事件支持
- 平滑动画需要支持CSS过渡的浏览器

## 注意事项

- 该组件内部使用Split组件实现调整大小功能
- 你可以指定调整大小时侧边栏的最小和最大宽度
- 布局将自动适配提供的尺寸和插槽内容
- 头部插槽是可选的 - 没有头部插槽布局也能正常工作
- 所有尺寸都可以用任何有效的CSS单位指定（px、%、rem等）