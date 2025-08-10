# T型布局 HeaderLayout

HeaderLayout组件提供了一个灵活的T型布局，顶部是头部，下方是主要内容区域。主要区域可以选择性地包含一个可以动态调整大小的侧边栏，布局会根据提供的属性进行适配。

## 功能特性

- **T型布局**：头部横跨顶部全宽，下方是内容区域
- **可选侧边栏**：主要内容区域可以包含可调整大小的侧边栏
- **灵活配置**：可配置的头部高度和侧边栏尺寸
- **分割面板集成**：使用Split组件实现平滑的侧边栏调整大小
- **响应式设计**：适应不同屏幕尺寸和配置

## 导入

```typescript
import { HeaderLayout } from '@ticatec/uniface-element/app-layout/HeaderLayout';
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

- **header**: 要在头部中显示的内容（横跨全宽）
- **sidebar**: 要在侧边栏中显示的内容（可选）
- **Default Slot**: 要在内容区域显示的主要内容

## 基本用法

```svelte
<script lang="ts">
  import { HeaderLayout } from '@ticatec/uniface-element/app-layout/HeaderLayout';
</script>

<HeaderLayout 
  sidebarResize={true} 
  headerHeight="60px"
  sidebarWidth="250px" 
  sidebarMaxWidth="400px" 
  sidebarMinWidth="200px"
>
  <div slot="header">
    <h1>应用程序头部</h1>
  </div>
    
  <div slot="sidebar">
    <p>侧边栏内容</p>
  </div>

  <div>
    <p>主要内容区域</p>
  </div>
</HeaderLayout>
```

## 高级示例

### 带导航头部的应用程序

```svelte
<script lang="ts">
  import { HeaderLayout } from '@ticatec/uniface-element/app-layout/HeaderLayout';
  import { NavigatorMenu } from '@ticatec/uniface-element/NavigatorMenu';
  import { Button } from '@ticatec/uniface-element/Button';
  import Breadcrumbs from '@ticatec/uniface-element/Breadcrumbs';
  
  let menuItems = [
    { id: 1, text: '仪表板', icon: 'dashboard' },
    { id: 2, text: '项目管理', icon: 'folder' },
    { id: 3, text: '团队管理', icon: 'people' },
    { id: 4, text: '系统设置', icon: 'settings' }
  ];
  
  let breadcrumbItems = [
    { text: '首页', href: '#' },
    { text: '项目管理', href: '#' },
    { text: '当前项目' }
  ];
  
  let currentUser = { name: '张三', role: '管理员' };
</script>

<HeaderLayout 
  sidebarResize={true}
  headerHeight="80px"
  sidebarWidth="280px"
  sidebarMaxWidth="400px"
  sidebarMinWidth="200px"
>
  <div slot="header" class="app-header">
    <div class="header-brand">
      <img src="/logo.png" alt="Logo" class="logo" />
      <h1>项目管理系统</h1>
    </div>
    
    <div class="header-nav">
      <Breadcrumbs items={breadcrumbItems} />
    </div>
    
    <div class="header-user">
      <span class="user-info">
        {currentUser.name} ({currentUser.role})
      </span>
      <Button variant="outlined" size="small">个人资料</Button>
      <Button type="primary" size="small">退出登录</Button>
    </div>
  </div>

  <div slot="sidebar" class="app-sidebar">
    <NavigatorMenu items={menuItems} />
  </div>

  <main class="app-content">
    <div class="content-header">
      <h2>欢迎使用仪表板</h2>
      <p>从这里管理您的项目和团队</p>
    </div>
    
    <div class="content-body">
      <div class="stats-grid">
        <div class="stat-card">
          <h3>活跃项目</h3>
          <div class="stat-value">12</div>
        </div>
        <div class="stat-card">
          <h3>团队成员</h3>
          <div class="stat-value">8</div>
        </div>
        <div class="stat-card">
          <h3>已完成任务</h3>
          <div class="stat-value">145</div>
        </div>
      </div>
    </div>
  </main>
</HeaderLayout>

<style>
  .app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  .header-brand {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  
  .logo {
    width: 40px;
    height: 40px;
  }
  
  .header-nav {
    flex: 1;
    display: flex;
    justify-content: center;
  }
  
  .header-user {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  
  .user-info {
    font-size: 0.9em;
  }
  
  .app-sidebar {
    background: #f8f9fa;
    border-right: 1px solid #e9ecef;
    padding: 20px 0;
  }
  
  .app-content {
    padding: 30px;
    background: #ffffff;
  }
  
  .content-header {
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e9ecef;
  }
  
  .content-header h2 {
    margin: 0 0 5px 0;
    color: #2c3e50;
  }
  
  .content-header p {
    margin: 0;
    color: #6c757d;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }
  
  .stat-card {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    text-align: center;
  }
  
  .stat-card h3 {
    margin: 0 0 10px 0;
    font-size: 0.9em;
    color: #6c757d;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .stat-value {
    font-size: 2.5em;
    font-weight: bold;
    color: #2c3e50;
  }
</style>
```

### 文档编辑器布局

```svelte
<script lang="ts">
  import { HeaderLayout } from '@ticatec/uniface-element/app-layout/HeaderLayout';
  import { Button } from '@ticatec/uniface-element/Button';
  import { IconButton } from '@ticatec/uniface-element/IconButton';
  
  let documentTitle = '无标题文档';
  let lastSaved = new Date().toLocaleTimeString();
  let wordCount = 1247;
</script>

<HeaderLayout 
  sidebarResize={true}
  headerHeight="70px"
  sidebarWidth="250px"
  sidebarMaxWidth="350px"
  sidebarMinWidth="200px"
>
  <div slot="header" class="editor-header">
    <div class="header-left">
      <IconButton icon="menu" title="文件菜单" />
      <div class="document-info">
        <input 
          bind:value={documentTitle} 
          class="document-title"
          placeholder="无标题文档"
        />
        <small class="last-saved">最后保存: {lastSaved}</small>
      </div>
    </div>
    
    <div class="header-center">
      <div class="toolbar">
        <IconButton icon="undo" title="撤销" />
        <IconButton icon="redo" title="重做" />
        <div class="divider"></div>
        <IconButton icon="format_bold" title="加粗" />
        <IconButton icon="format_italic" title="斜体" />
        <IconButton icon="format_underlined" title="下划线" />
      </div>
    </div>
    
    <div class="header-right">
      <Button variant="outlined" size="small">分享</Button>
      <Button type="primary" size="small">保存</Button>
    </div>
  </div>

  <div slot="sidebar" class="document-sidebar">
    <div class="sidebar-section">
      <h3>文档大纲</h3>
      <ul class="outline-list">
        <li><a href="#intro">引言</a></li>
        <li><a href="#chapter1">第一章</a></li>
        <li><a href="#chapter2">第二章</a></li>
        <li><a href="#conclusion">结论</a></li>
      </ul>
    </div>
    
    <div class="sidebar-section">
      <h3>统计信息</h3>
      <div class="doc-stats">
        <div class="stat-item">
          <label>字数:</label>
          <span>{wordCount}</span>
        </div>
        <div class="stat-item">
          <label>字符数:</label>
          <span>{wordCount * 5}</span>
        </div>
        <div class="stat-item">
          <label>页数:</label>
          <span>{Math.ceil(wordCount / 250)}</span>
        </div>
      </div>
    </div>
  </div>

  <div class="editor-content">
    <div class="document-editor">
      <div class="editor-paper">
        <h1>文档标题</h1>
        <p>开始在这里编写您的文档...</p>
        <p>编辑器内容将在这个区域显示。您可以添加任何富文本编辑组件或简单的文本区域。</p>
      </div>
    </div>
  </div>
</HeaderLayout>

<style>
  .editor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    background: white;
    border-bottom: 1px solid #e0e0e0;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  
  .header-left {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  
  .document-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  
  .document-title {
    border: none;
    font-size: 1.1em;
    font-weight: 500;
    padding: 2px 4px;
    border-radius: 3px;
    background: transparent;
  }
  
  .document-title:focus {
    background: #f5f5f5;
    outline: none;
  }
  
  .last-saved {
    color: #666;
    font-size: 0.8em;
  }
  
  .header-center {
    flex: 1;
    display: flex;
    justify-content: center;
  }
  
  .toolbar {
    display: flex;
    align-items: center;
    gap: 5px;
    background: #f8f9fa;
    padding: 5px 10px;
    border-radius: 6px;
  }
  
  .divider {
    width: 1px;
    height: 20px;
    background: #dee2e6;
    margin: 0 5px;
  }
  
  .header-right {
    display: flex;
    gap: 10px;
  }
  
  .document-sidebar {
    background: #fafafa;
    border-right: 1px solid #e0e0e0;
    padding: 20px 0;
  }
  
  .sidebar-section {
    padding: 0 20px;
    margin-bottom: 30px;
  }
  
  .sidebar-section h3 {
    margin: 0 0 15px 0;
    font-size: 0.9em;
    color: #495057;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .outline-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .outline-list li {
    margin-bottom: 8px;
  }
  
  .outline-list a {
    text-decoration: none;
    color: #6c757d;
    padding: 4px 8px;
    display: block;
    border-radius: 4px;
    transition: all 0.2s;
  }
  
  .outline-list a:hover {
    background: #e9ecef;
    color: #495057;
  }
  
  .doc-stats {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9em;
  }
  
  .stat-item label {
    color: #6c757d;
  }
  
  .stat-item span {
    font-weight: 500;
    color: #495057;
  }
  
  .editor-content {
    background: #f8f9fa;
    padding: 20px;
  }
  
  .document-editor {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .editor-paper {
    background: white;
    padding: 40px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    min-height: 600px;
  }
  
  .editor-paper h1 {
    margin-top: 0;
    color: #2c3e50;
  }
  
  .editor-paper p {
    line-height: 1.6;
    color: #495057;
  }
</style>
```

## 最佳实践

1. **头部内容**：使用头部进行全局导航、品牌展示和用户操作
2. **布局层次**：确保头部、侧边栏和主要内容之间有清晰的视觉层次
3. **响应式行为**：考虑布局在不同屏幕尺寸下的表现
4. **性能优化**：保持头部内容轻量化以确保一致的性能
5. **无障碍访问**：使用语义化HTML和适当的焦点管理
6. **内容组织**：使用侧边栏进行上下文导航和工具展示

## 无障碍访问注意事项

- 使用正确的标题层次结构（头部使用h1，内容区域使用h2+）
- 确保键盘导航在所有布局区域都能正常工作
- 为屏幕阅读器用户提供跳转链接
- 当区域调整大小时保持适当的焦点管理
- 在插槽内使用语义化HTML元素（header、nav、main）

## 浏览器支持

- 支持CSS Grid和Flexbox的现代浏览器
- 调整大小功能需要指针事件支持
- 布局在所有支持CSS Grid的浏览器中工作

## 注意事项

- 该组件内部使用Split组件实现侧边栏调整大小功能
- 头部横跨全宽并保持在顶部固定
- 侧边栏是可选的 - 布局可以只使用头部和主要内容
- 你可以指定调整大小时侧边栏的最小和最大宽度
- 所有尺寸都可以用任何有效的CSS单位指定（px、%、rem等）
- 布局会自动适配提供的插槽内容