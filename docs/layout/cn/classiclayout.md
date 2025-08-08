# 经典布局 ClassicLayout

ClassicLayout组件提供了一个全面的全屏布局，包含头部、底部、侧边栏、右侧边栏和主要内容区域。这种经典的应用程序布局非常适合需要多个内容区域和导航区域的复杂应用程序。

## 功能特性

- **全屏布局**：覆盖整个视口，包含头部、内容区和可选的底部栏
- **双侧边栏**：左侧边栏用于导航，可选的右侧边栏用于工具/信息展示
- **可调整面板**：两个侧边栏都可以独立调整大小
- **头部和底部**：固定头部和可选的状态/底部栏
- **灵活配置**：所有区域都是可选的且高度可配置
- **分割面板集成**：使用Split组件实现平滑的面板调整大小

## 导入

```typescript
import { ClassicLayout } from '@ticatec/uniface-element/app-layout/ClassicLayout';
```

## 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `headerHeight` | `string` | `"48px"` | 设置头部的高度 |
| `statusHeight` | `string` | `"22px"` | 设置状态/底部栏的高度 |
| `sidebarWidth` | `string` | `"300px"` | 设置左侧边栏的初始宽度 |
| `sidebarResize` | `boolean` | `false` | 启用左侧边栏调整大小功能 |
| `sidebarMaxWidth` | `string \| null` | `null` | 左侧边栏的最大宽度 |
| `sidebarMinWidth` | `string \| null` | `null` | 左侧边栏的最小宽度 |
| `rightBarWidth` | `string` | `"240px"` | 设置右侧边栏的初始宽度 |
| `rightBarResize` | `boolean` | `false` | 启用右侧边栏调整大小功能 |
| `rightBarMaxWidth` | `string \| null` | `null` | 右侧边栏的最大宽度 |
| `rightBarMinWidth` | `string \| null` | `null` | 右侧边栏的最小宽度 |

## 插槽

- **header**: 显示在头部区域的内容（横跨全宽）
- **sidebar**: 左侧边栏的内容（可选）
- **right-sidebar**: 右侧边栏的内容（可选）
- **bottom**: 底部/状态栏的内容（可选）
- **Default Slot**: 显示在中央区域的主要内容

## 基本用法

```svelte
<script lang="ts">
  import { ClassicLayout } from '@ticatec/uniface-element/app-layout/ClassicLayout';
</script>

<ClassicLayout 
  headerHeight="60px"
  statusHeight="25px"
  sidebarWidth="280px"
  rightBarWidth="250px"
  sidebarResize={true}
  rightBarResize={true}
>
  <div slot="header" class="app-header">
    <h1>应用程序标题</h1>
  </div>
  
  <div slot="sidebar" class="main-sidebar">
    <p>左侧边栏内容</p>
  </div>
  
  <div slot="right-sidebar" class="right-panel">
    <p>右侧边栏内容</p>
  </div>
  
  <div slot="bottom" class="status-bar">
    <p>状态栏内容</p>
  </div>
  
  <main class="main-content">
    <p>主应用程序内容</p>
  </main>
</ClassicLayout>
```

## 高级示例

### IDE风格的应用程序布局

```svelte
<script lang="ts">
  import { ClassicLayout } from '@ticatec/uniface-element/app-layout/ClassicLayout';
  import { NavigatorMenu } from '@ticatec/uniface-element/NavigatorMenu';
  import { Button } from '@ticatec/uniface-element/Button';
  import { Tabs } from '@ticatec/uniface-element/Tabs';
  
  let menuItems = [
    { id: 1, text: '资源管理器', icon: 'folder_open' },
    { id: 2, text: '搜索', icon: 'search' },
    { id: 3, text: '源代码管理', icon: 'source' },
    { id: 4, text: '扩展', icon: 'extension' }
  ];
  
  let openTabs = [
    { id: 1, title: 'App.svelte', modified: true },
    { id: 2, title: 'main.ts', modified: false },
    { id: 3, title: 'styles.css', modified: true }
  ];
  
  let activeTab = 1;
  let projectStats = {
    files: 127,
    lines: 5420,
    characters: 98234
  };
</script>

<ClassicLayout 
  headerHeight="40px"
  statusHeight="22px"
  sidebarWidth="300px"
  rightBarWidth="280px"
  sidebarResize={true}
  rightBarResize={true}
  sidebarMinWidth="200px"
  sidebarMaxWidth="500px"
  rightBarMinWidth="200px"
  rightBarMaxWidth="400px"
>
  <div slot="header" class="ide-header">
    <div class="header-section">
      <span class="app-title">代码编辑器</span>
    </div>
    <div class="header-section header-center">
      <div class="search-box">
        <input type="text" placeholder="搜索文件..." />
      </div>
    </div>
    <div class="header-section">
      <Button size="small" variant="outlined">运行</Button>
      <Button size="small" type="primary">调试</Button>
    </div>
  </div>
  
  <div slot="sidebar" class="ide-sidebar">
    <div class="sidebar-header">
      <h3>资源管理器</h3>
    </div>
    <NavigatorMenu items={menuItems} />
    
    <div class="file-tree">
      <div class="tree-item">📁 src</div>
      <div class="tree-item tree-nested">📄 App.svelte</div>
      <div class="tree-item tree-nested">📄 main.ts</div>
      <div class="tree-item">📁 public</div>
      <div class="tree-item">📄 package.json</div>
    </div>
  </div>
  
  <div slot="right-sidebar" class="ide-right-panel">
    <div class="panel-header">
      <h3>属性</h3>
    </div>
    
    <div class="properties-section">
      <h4>项目统计</h4>
      <div class="stat-grid">
        <div class="stat-item">
          <label>文件:</label>
          <span>{projectStats.files}</span>
        </div>
        <div class="stat-item">
          <label>行数:</label>
          <span>{projectStats.lines}</span>
        </div>
        <div class="stat-item">
          <label>字符:</label>
          <span>{projectStats.characters}</span>
        </div>
      </div>
    </div>
    
    <div class="properties-section">
      <h4>问题</h4>
      <div class="problem-list">
        <div class="problem-item warning">
          <span class="problem-icon">⚠️</span>
          <span>未使用的变量 'temp'</span>
        </div>
        <div class="problem-item error">
          <span class="problem-icon">❌</span>
          <span>缺少分号</span>
        </div>
      </div>
    </div>
  </div>
  
  <div slot="bottom" class="ide-status">
    <div class="status-left">
      <span>就绪</span>
      <span class="separator">|</span>
      <span>第 45 行，第 12 列</span>
    </div>
    <div class="status-right">
      <span>TypeScript</span>
      <span class="separator">|</span>
      <span>UTF-8</span>
      <span class="separator">|</span>
      <span>LF</span>
    </div>
  </div>
  
  <div class="ide-main">
    <div class="tabs-container">
      <Tabs items={openTabs} bind:activeTab />
    </div>
    
    <div class="editor-container">
      <div class="line-numbers">
        {#each Array(20) as _, i}
          <div class="line-number">{i + 1}</div>
        {/each}
      </div>
      
      <div class="code-editor">
        <pre><code>
&lt;script lang="ts"&gt;
  import &#123; Button &#125; from '@ticatec/uniface-element/Button';
  
  let count = 0;
  
  const increment = () => &#123;
    count += 1;
  &#125;;
&lt;/script&gt;

&lt;div class="app"&gt;
  &lt;h1&gt;欢迎使用 Svelte&lt;/h1&gt;
  &lt;Button on:click=&#123;increment&#125;&gt;
    计数: &#123;count&#125;
  &lt;/Button&gt;
&lt;/div&gt;
        </code></pre>
      </div>
    </div>
  </div>
</ClassicLayout>
```

### 仪表板应用程序布局

```svelte
<script lang="ts">
  import { ClassicLayout } from '@ticatec/uniface-element/app-layout/ClassicLayout';
  import { NavigatorMenu } from '@ticatec/uniface-element/NavigatorMenu';
  import { Button } from '@ticatec/uniface-element/Button';
  import { Card } from '@ticatec/uniface-element/Card';
  
  let navigationItems = [
    { id: 1, text: '仪表板', icon: 'dashboard', active: true },
    { id: 2, text: '分析', icon: 'analytics' },
    { id: 3, text: '报表', icon: 'assessment' },
    { id: 4, text: '用户管理', icon: 'people' },
    { id: 5, text: '系统设置', icon: 'settings' }
  ];
  
  let currentUser = {
    name: '张三',
    role: '系统管理员',
    avatar: '/avatar.jpg'
  };
  
  let notifications = [
    { id: 1, text: '新用户注册', time: '2分钟前', type: 'info' },
    { id: 2, text: '服务器维护计划', time: '1小时前', type: 'warning' },
    { id: 3, text: '备份完成', time: '3小时前', type: 'success' }
  ];
  
  let systemStats = {
    uptime: '15天 4小时',
    memory: '68%',
    cpu: '23%',
    storage: '45%'
  };
</script>

<ClassicLayout 
  headerHeight="65px"
  statusHeight="28px"
  sidebarWidth="260px"
  rightBarWidth="300px"
  sidebarResize={true}
  rightBarResize={true}
>
  <div slot="header" class="dashboard-header">
    <div class="header-brand">
      <img src="/logo.png" alt="公司Logo" class="logo" />
      <div class="brand-info">
        <h1>管理仪表板</h1>
        <span class="version">v2.1.0</span>
      </div>
    </div>
    
    <div class="header-actions">
      <Button variant="outlined" size="small">
        📊 导出数据
      </Button>
      <div class="user-menu">
        <img src={currentUser.avatar} alt="用户头像" class="user-avatar" />
        <div class="user-info">
          <span class="user-name">{currentUser.name}</span>
          <small class="user-role">{currentUser.role}</small>
        </div>
      </div>
    </div>
  </div>
  
  <div slot="sidebar" class="dashboard-sidebar">
    <div class="sidebar-content">
      <NavigatorMenu items={navigationItems} />
      
      <div class="sidebar-section">
        <h3>快速操作</h3>
        <div class="quick-actions">
          <Button size="small" style="width: 100%; margin-bottom: 8px;">
            + 新建用户
          </Button>
          <Button size="small" variant="outlined" style="width: 100%; margin-bottom: 8px;">
            📈 生成报告
          </Button>
          <Button size="small" variant="outlined" style="width: 100%;">
            🔧 系统维护
          </Button>
        </div>
      </div>
    </div>
  </div>
  
  <div slot="right-sidebar" class="dashboard-rightbar">
    <div class="rightbar-section">
      <h3>通知</h3>
      <div class="notifications-list">
        {#each notifications as notification}
          <div class="notification-item {notification.type}">
            <div class="notification-content">
              <p>{notification.text}</p>
              <small>{notification.time}</small>
            </div>
          </div>
        {/each}
      </div>
    </div>
    
    <div class="rightbar-section">
      <h3>系统状态</h3>
      <div class="system-stats">
        <div class="stat-row">
          <label>运行时间:</label>
          <span>{systemStats.uptime}</span>
        </div>
        <div class="stat-row">
          <label>内存:</label>
          <span class="stat-value">{systemStats.memory}</span>
        </div>
        <div class="stat-row">
          <label>CPU:</label>
          <span class="stat-value">{systemStats.cpu}</span>
        </div>
        <div class="stat-row">
          <label>存储:</label>
          <span class="stat-value">{systemStats.storage}</span>
        </div>
      </div>
    </div>
  </div>
  
  <div slot="bottom" class="dashboard-status">
    <div class="status-info">
      <span>🟢 所有系统正常运行</span>
      <span class="separator">•</span>
      <span>最后更新: {new Date().toLocaleTimeString()}</span>
    </div>
    <div class="status-actions">
      <span>在线用户: 1,247</span>
    </div>
  </div>
  
  <div class="dashboard-main">
    <div class="main-header">
      <h2>欢迎回来，{currentUser.name}</h2>
      <p>这是您的系统今日概况。</p>
    </div>
    
    <div class="dashboard-grid">
      <Card title="总用户数" style="grid-area: users;">
        <div class="metric-card">
          <div class="metric-value">12,486</div>
          <div class="metric-change positive">+5.2%</div>
        </div>
      </Card>
      
      <Card title="营收" style="grid-area: revenue;">
        <div class="metric-card">
          <div class="metric-value">￥328,392</div>
          <div class="metric-change positive">+12.1%</div>
        </div>
      </Card>
      
      <Card title="活跃会话" style="grid-area: sessions;">
        <div class="metric-card">
          <div class="metric-value">1,247</div>
          <div class="metric-change negative">-2.8%</div>
        </div>
      </Card>
      
      <Card title="系统性能" style="grid-area: performance;">
        <div class="metric-card">
          <div class="metric-value">98.2%</div>
          <div class="metric-change positive">+0.5%</div>
        </div>
      </Card>
      
      <Card title="最近活动" style="grid-area: activity;">
        <div class="activity-list">
          <div class="activity-item">用户从IP 192.168.1.1登录</div>
          <div class="activity-item">数据库备份完成</div>
          <div class="activity-item">新报告已生成</div>
        </div>
      </Card>
    </div>
  </div>
</ClassicLayout>
```

## 最佳实践

1. **布局规划**：仔细规划您的布局区域 - 头部用于品牌/导航，侧边栏用于工具/导航，主区域用于内容
2. **响应式设计**：考虑布局在不同屏幕尺寸下的适应性
3. **内容层次**：使用头部进行主要导航，侧边栏进行次要工具展示
4. **性能优化**：保持侧边栏内容轻量化以维持平滑的调整大小体验
5. **用户体验**：在不同区域之间提供清晰的视觉分离
6. **无障碍访问**：在插槽内使用语义化HTML并维持适当的焦点管理

## 无障碍访问注意事项

- 在所有布局区域使用正确的标题层次结构
- 确保键盘导航在面板之间能够平滑工作
- 为屏幕阅读器用户提供跳转链接以在主要区域间跳转
- 在适当的插槽内使用语义化HTML元素（header、nav、main、aside、footer）
- 面板调整大小时保持适当的焦点管理
- 确保所有区域的颜色对比度符合无障碍标准

## 浏览器支持

- 支持CSS Flexbox的现代浏览器
- 调整大小功能需要指针事件支持
- 布局在所有支持现代CSS的浏览器中工作

## 注意事项

- 该组件内部使用Split组件实现面板调整大小功能
- 所有插槽都是可选的 - 您可以使用头部、侧边栏、主内容和底部的任意组合
- 您可以独立指定两个侧边栏的最小和最大宽度
- 头部和底部高度可以用任何有效的CSS单位自定义
- 布局覆盖整个视口，非常适合应用程序界面
- 启用时，左右侧边栏都可以独立调整大小