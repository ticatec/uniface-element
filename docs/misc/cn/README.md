# 杂项组件

Uniface Element 库提供了一组实用工具和布局组件，用于构建现代 Svelte 应用程序。这些组件处理常见的 UI 模式并提供灵活的布局。

## 目录

- [Split 组件](#split-组件)
- [Drawer 组件](#drawer-组件)
- [Tag 组件](#tag-组件)
- [Card 组件](#card-组件)
- [最佳实践](#最佳实践)

## Split 组件

Split 组件提供可调整大小的分隔符，用于创建具有可拖动分隔符的分割面板布局。

### 特性

- **水平和垂直**: 支持水平和垂直分割
- **可拖动调整**: 支持鼠标拖动的交互式调整句柄
- **可逆方向**: 使用 reverse 属性控制调整方向
- **面板绑定**: 绑定到特定面板以进行受控调整
- **固定模式**: 可选择禁用调整以实现静态布局

### 基本用法

```svelte
<script lang="ts">
  import { Split } from '@ticatec/uniface-element';
  
  let leftPanel;
  let topPanel;
</script>

<!-- 垂直分割（左/右面板） -->
<div class="split-container">
  <div class="left-panel" bind:this={leftPanel}>
    左侧面板内容
  </div>
  
  <Split 
    direction="vertical" 
    width={4} 
    bindingPanel={leftPanel}
  />
  
  <div class="right-panel">
    右侧面板内容
  </div>
</div>

<!-- 水平分割（上/下面板） -->
<div class="split-container horizontal">
  <div class="top-panel" bind:this={topPanel}>
    顶部面板内容
  </div>
  
  <Split 
    direction="horizontal" 
    width={4} 
    bindingPanel={topPanel}
  />
  
  <div class="bottom-panel">
    底部面板内容
  </div>
</div>

<style>
  .split-container {
    display: flex;
    height: 400px;
    width: 100%;
    border: 1px solid #ddd;
  }
  
  .split-container.horizontal {
    flex-direction: column;
  }
  
  .left-panel, .right-panel {
    flex: 1;
    padding: 16px;
    overflow: auto;
  }
  
  .top-panel, .bottom-panel {
    flex: 1;
    padding: 16px;
    overflow: auto;
  }
  
  .left-panel {
    background: #f8f9fa;
    min-width: 150px;
  }
  
  .right-panel {
    background: #fff;
  }
  
  .top-panel {
    background: #f8f9fa;
    min-height: 100px;
  }
  
  .bottom-panel {
    background: #fff;
  }
</style>
```

### 高级布局

```svelte
<script lang="ts">
  import { Split } from '@ticatec/uniface-element';
  
  let sidebar;
  let contentLeft;
  let contentTop;
</script>

<!-- 复杂分割布局：侧边栏 + 主内容区域与嵌套分割 -->
<div class="app-layout">
  <!-- 侧边栏 -->
  <div class="sidebar" bind:this={sidebar}>
    <h3>导航</h3>
    <nav>
      <ul>
        <li>仪表板</li>
        <li>项目</li>
        <li>设置</li>
      </ul>
    </nav>
  </div>
  
  <!-- 垂直分隔符 -->
  <Split 
    direction="vertical" 
    width={3} 
    bindingPanel={sidebar}
  />
  
  <!-- 主内容区域 -->
  <div class="main-content">
    <!-- 顶部内容区域 -->
    <div class="content-top" bind:this={contentTop}>
      <h2>主内容</h2>
      <p>这是可以调整大小的主内容区域。</p>
    </div>
    
    <!-- 水平分隔符 -->
    <Split 
      direction="horizontal" 
      width={3} 
      bindingPanel={contentTop}
      reverse={true}
    />
    
    <!-- 底部内容区域 -->
    <div class="content-bottom">
      <h3>详细信息面板</h3>
      <p>附加的详细信息和信息。</p>
    </div>
  </div>
</div>

<style>
  .app-layout {
    display: flex;
    height: 500px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .sidebar {
    width: 200px;
    min-width: 150px;
    background: #2c3e50;
    color: white;
    padding: 16px;
  }
  
  .sidebar h3 {
    margin: 0 0 16px 0;
    color: #ecf0f1;
  }
  
  .sidebar nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .sidebar nav li {
    padding: 8px 0;
    cursor: pointer;
    transition: color 0.2s;
  }
  
  .sidebar nav li:hover {
    color: #3498db;
  }
  
  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .content-top {
    flex: 1;
    min-height: 200px;
    padding: 16px;
    background: #fff;
  }
  
  .content-bottom {
    height: 150px;
    min-height: 100px;
    padding: 16px;
    background: #f8f9fa;
    border-top: 1px solid #dee2e6;
  }
</style>
```

### Split 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `direction` | `'horizontal' \| 'vertical'` | `'vertical'` | 分割方向 |
| `width` | `number` | `2` | 分隔符厚度（像素） |
| `bindingPanel` | `HTMLElement \| null` | `null` | 要调整大小的面板元素 |
| `reverse` | `boolean` | `false` | 反转调整方向 |

## Drawer 组件

Drawer 组件提供一个滑出面板，可以位于屏幕的左侧或右侧。

### 特性

- **侧边定位**: 左侧或右侧定位
- **流畅动画**: 飞入/飞出过渡效果，可配置持续时间
- **可自定义宽度**: 可调整的抽屉宽度
- **背景交互**: 点击外部即可关闭
- **插槽支持**: 通过插槽灵活内容

### 基本用法

```svelte
<script lang="ts">
  import { Drawer } from '@ticatec/uniface-element';
  
  let leftDrawerVisible = false;
  let rightDrawerVisible = false;
  
  const toggleLeftDrawer = () => {
    leftDrawerVisible = !leftDrawerVisible;
  };
  
  const toggleRightDrawer = () => {
    rightDrawerVisible = !rightDrawerVisible;
  };
</script>

<div class="drawer-demo">
  <h2>Drawer 组件演示</h2>
  
  <div class="buttons">
    <button on:click={toggleLeftDrawer}>
      切换左侧抽屉
    </button>
    
    <button on:click={toggleRightDrawer}>
      切换右侧抽屉
    </button>
  </div>
  
  <p>点击上面的按钮来打开/关闭抽屉。</p>
</div>

<!-- 左侧抽屉 -->
<Drawer bind:visible={leftDrawerVisible} position="left" width={300}>
  <div class="drawer-content">
    <h3>左侧导航</h3>
    <nav>
      <a href="#home">首页</a>
      <a href="#about">关于</a>
      <a href="#services">服务</a>
      <a href="#contact">联系</a>
    </nav>
  </div>
</Drawer>

<!-- 右侧抽屉 -->
<Drawer bind:visible={rightDrawerVisible} position="right" width={350}>
  <div class="drawer-content">
    <h3>设置面板</h3>
    <div class="settings">
      <label>
        <input type="checkbox" /> 深色模式
      </label>
      <label>
        <input type="checkbox" checked /> 通知
      </label>
      <label>
        <input type="checkbox" /> 自动保存
      </label>
    </div>
  </div>
</Drawer>

<style>
  .drawer-demo {
    padding: 40px;
    text-align: center;
  }
  
  .buttons {
    margin: 20px 0;
    display: flex;
    gap: 16px;
    justify-content: center;
  }
  
  .buttons button {
    padding: 10px 20px;
    border: 1px solid #007bff;
    background: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .buttons button:hover {
    background: #0056b3;
  }
  
  .drawer-content {
    padding: 20px;
    height: 100%;
  }
  
  .drawer-content h3 {
    margin: 0 0 20px 0;
    color: #333;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }
  
  .drawer-content nav {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .drawer-content nav a {
    padding: 8px 12px;
    color: #007bff;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.2s;
  }
  
  .drawer-content nav a:hover {
    background: #f8f9fa;
  }
  
  .settings {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .settings label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }
</style>
```

### 移动菜单示例

```svelte
<script lang="ts">
  import { Drawer } from '@ticatec/uniface-element';
  
  let menuVisible = false;
  
  const toggleMenu = () => {
    menuVisible = !menuVisible;
  };
  
  const closeMenu = () => {
    menuVisible = false;
  };
</script>

<!-- 移动端头部 -->
<header class="mobile-header">
  <button class="menu-button" on:click={toggleMenu}>
    <span class="hamburger">☰</span>
  </button>
  <h1>我的应用</h1>
  <div class="header-actions">
    <!-- 头部操作 -->
  </div>
</header>

<!-- 移动端导航抽屉 -->
<Drawer bind:visible={menuVisible} position="left" width={280}>
  <div class="mobile-menu">
    <div class="menu-header">
      <h2>菜单</h2>
      <button class="close-button" on:click={closeMenu}>×</button>
    </div>
    
    <nav class="menu-nav">
      <a href="#dashboard" on:click={closeMenu}>仪表板</a>
      <a href="#projects" on:click={closeMenu}>项目</a>
      <a href="#team" on:click={closeMenu}>团队</a>
      <a href="#settings" on:click={closeMenu}>设置</a>
      
      <div class="menu-divider"></div>
      
      <a href="#help" on:click={closeMenu}>帮助与支持</a>
      <a href="#logout" on:click={closeMenu}>退出登录</a>
    </nav>
  </div>
</Drawer>

<style>
  .mobile-header {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    background: #fff;
    border-bottom: 1px solid #eee;
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .menu-button {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    padding: 8px;
    margin-right: 12px;
  }
  
  .mobile-header h1 {
    flex: 1;
    margin: 0;
    font-size: 1.2em;
    color: #333;
  }
  
  .mobile-menu {
    height: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
  }
  
  .menu-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid #eee;
  }
  
  .menu-header h2 {
    margin: 0;
    color: #333;
  }
  
  .close-button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .menu-nav {
    flex: 1;
    padding: 16px 0;
    display: flex;
    flex-direction: column;
  }
  
  .menu-nav a {
    padding: 12px 20px;
    color: #333;
    text-decoration: none;
    border-bottom: 1px solid #f5f5f5;
    transition: background-color 0.2s;
  }
  
  .menu-nav a:hover {
    background: #f8f9fa;
  }
  
  .menu-divider {
    height: 1px;
    background: #ddd;
    margin: 8px 20px;
  }
</style>
```

### Drawer 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `visible` | `boolean` | `false` | 控制抽屉可见性 |
| `width` | `number` | `300` | 抽屉宽度（像素） |
| `position` | `'left' \| 'right'` | `'left'` | 抽屉位置 |

## Tag 组件

Tag 组件显示带有可选删除功能的标记信息。

### 特性

- **多种尺寸**: 大、中、小尺寸变体
- **样式变体**: 无边框、有边框和圆角样式
- **可移除**: 带有自定义处理器的可选删除按钮
- **颜色支持**: 可定制的颜色和颜色类
- **灵活文本**: 显示任何文本内容

### 基本用法

```svelte
<script lang="ts">
  import { Tag } from '@ticatec/uniface-element';
  
  let tags = [
    { id: 1, text: 'JavaScript', color: 'blue' },
    { id: 2, text: 'TypeScript', color: 'blue' },
    { id: 3, text: 'Svelte', color: 'orange' },
    { id: 4, text: 'CSS', color: 'green' }
  ];
  
  const removeTag = (tagId: number) => {
    tags = tags.filter(tag => tag.id !== tagId);
  };
</script>

<div class="tag-demo">
  <h3>默认标签</h3>
  <div class="tag-group">
    {#each tags as tag}
      <Tag 
        text={tag.text}
        removable={true}
        removeHandler={() => removeTag(tag.id)}
      />
    {/each}
  </div>
  
  <h3>尺寸变体</h3>
  <div class="tag-group">
    <Tag text="小标签" size="small" />
    <Tag text="中等标签" size="middle" />
    <Tag text="大标签" size="big" />
  </div>
  
  <h3>样式变体</h3>
  <div class="tag-group">
    <Tag text="无边框" variant="borderless" />
    <Tag text="有边框" variant="border" />
    <Tag text="圆角" variant="round" />
  </div>
  
  <h3>不可移除标签</h3>
  <div class="tag-group">
    <Tag text="状态：活跃" removable={false} color="green" />
    <Tag text="优先级：高" removable={false} color="red" />
    <Tag text="类型：错误" removable={false} color="orange" />
  </div>
</div>

<style>
  .tag-demo {
    padding: 20px;
  }
  
  .tag-group {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 12px 0 24px 0;
  }
  
  .tag-demo h3 {
    margin: 20px 0 8px 0;
    color: #333;
    font-size: 1.1em;
  }
</style>
```

### 动态标签管理

```svelte
<script lang="ts">
  import { Tag } from '@ticatec/uniface-element';
  
  let newTagText = '';
  let tags = [
    { id: 1, text: '前端', color: 'blue' },
    { id: 2, text: '后端', color: 'green' },
    { id: 3, text: '数据库', color: 'purple' }
  ];
  let nextId = 4;
  
  const addTag = () => {
    if (newTagText.trim()) {
      tags = [...tags, { 
        id: nextId++, 
        text: newTagText.trim(),
        color: getRandomColor()
      }];
      newTagText = '';
    }
  };
  
  const removeTag = (tagId: number) => {
    tags = tags.filter(tag => tag.id !== tagId);
  };
  
  const getRandomColor = () => {
    const colors = ['blue', 'green', 'red', 'orange', 'purple', 'pink'];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      addTag();
    }
  };
</script>

<div class="tag-manager">
  <h3>技能标签管理器</h3>
  
  <!-- 添加新标签 -->
  <div class="add-tag-form">
    <input 
      type="text" 
      bind:value={newTagText}
      placeholder="输入技能..."
      on:keypress={handleKeyPress}
    />
    <button on:click={addTag} disabled={!newTagText.trim()}>
      添加标签
    </button>
  </div>
  
  <!-- 标签列表 -->
  <div class="tag-list">
    {#each tags as tag (tag.id)}
      <Tag 
        text={tag.text}
        color={tag.color}
        variant="round"
        removable={true}
        removeHandler={() => removeTag(tag.id)}
      />
    {/each}
    
    {#if tags.length === 0}
      <p class="empty-state">还没有标签。在上面添加一些技能！</p>
    {/if}
  </div>
  
  <!-- 标签统计 -->
  <div class="tag-stats">
    <small>总技能数：{tags.length}</small>
  </div>
</div>

<style>
  .tag-manager {
    max-width: 500px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #fff;
  }
  
  .add-tag-form {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
  }
  
  .add-tag-form input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }
  
  .add-tag-form button {
    padding: 8px 16px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;
  }
  
  .add-tag-form button:hover:not(:disabled) {
    background: #0056b3;
  }
  
  .add-tag-form button:disabled {
    background: #6c757d;
    cursor: not-allowed;
  }
  
  .tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    min-height: 40px;
    margin-bottom: 12px;
  }
  
  .empty-state {
    color: #666;
    font-style: italic;
    margin: 0;
  }
  
  .tag-stats {
    text-align: right;
    color: #666;
  }
</style>
```

### Tag 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `size` | `'big' \| 'middle' \| 'small'` | `'middle'` | 标签大小变体 |
| `variant` | `'borderless' \| 'border' \| 'round'` | `'border'` | 视觉样式变体 |
| `removable` | `boolean` | `true` | 显示删除按钮 |
| `text` | `string` | `''` | 标签文本内容 |
| `style` | `string` | `''` | 自定义 CSS 样式 |
| `class` | `string` | `''` | CSS 类名 |
| `removeHandler` | `MouseClickHandler` | - | 删除按钮点击处理器 |
| `color` | `string` | - | 颜色类标识符 |

## Card 组件

Card 组件提供一个带有可选头部、内容和操作区域的容器。

### 特性

- **灵活布局**: 头部、内容和操作部分
- **样式变体**: 朴素和 3D 阴影变体
- **操作支持**: 内置操作栏，支持可配置操作
- **插槽系统**: 通过命名插槽提供灵活内容
- **数据绑定**: 向操作传递数据上下文

### 基本用法

```svelte
<script lang="ts">
  import { Card } from '@ticatec/uniface-element';
  import type { CardAction } from '@ticatec/uniface-element';
  
  const user = {
    name: '张三',
    email: 'zhangsan@example.com',
    avatar: '/avatars/zhangsan.jpg'
  };
  
  const cardActions: CardAction[] = [
    {
      icon: 'icon_google_edit',
      hint: '编辑个人资料',
      callback: (data) => {
        console.log('编辑用户:', data);
      }
    },
    {
      icon: 'icon_google_delete',
      hint: '删除用户',
      callback: (data) => {
        console.log('删除用户:', data);
      }
    }
  ];
</script>

<div class="card-demo">
  <!-- 带标题的简单卡片 -->
  <Card title="用户个人资料" variant="plain">
    <div class="profile-content">
      <img src={user.avatar} alt={user.name} class="avatar" />
      <div class="user-info">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
    </div>
  </Card>
  
  <!-- 带操作的卡片 -->
  <Card 
    title="用户管理" 
    variant="3d"
    actions={cardActions}
    data={user}
  >
    <div class="user-details">
      <p><strong>姓名：</strong> {user.name}</p>
      <p><strong>邮箱：</strong> {user.email}</p>
      <p><strong>状态：</strong> 活跃</p>
    </div>
  </Card>
  
  <!-- 带自定义头部的卡片 -->
  <Card variant="plain">
    <div slot="header-bar" class="custom-header">
      <h3>自定义头部</h3>
      <span class="status-badge">在线</span>
    </div>
    
    <div class="card-body">
      <p>这个卡片有一个带有附加元素的自定义头部。</p>
    </div>
    
    <div slot="action-bar" class="custom-actions">
      <button class="btn-primary">保存</button>
      <button class="btn-secondary">取消</button>
    </div>
  </Card>
</div>

<style>
  .card-demo {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    padding: 20px;
  }
  
  .profile-content {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
  }
  
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .user-info h3 {
    margin: 0 0 4px 0;
    color: #333;
  }
  
  .user-info p {
    margin: 0;
    color: #666;
    font-size: 0.9em;
  }
  
  .user-details {
    padding: 16px;
  }
  
  .user-details p {
    margin: 8px 0;
  }
  
  .custom-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
  }
  
  .custom-header h3 {
    margin: 0;
    color: #333;
  }
  
  .status-badge {
    background: #28a745;
    color: white;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.8em;
  }
  
  .card-body {
    padding: 16px;
  }
  
  .custom-actions {
    display: flex;
    gap: 8px;
    padding: 12px 16px;
    background: #f8f9fa;
  }
  
  .btn-primary, .btn-secondary {
    padding: 6px 12px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    font-size: 0.9em;
  }
  
  .btn-primary {
    background: #007bff;
    color: white;
  }
  
  .btn-secondary {
    background: #6c757d;
    color: white;
  }
</style>
```

### 卡片网格布局

```svelte
<script lang="ts">
  import { Card } from '@ticatec/uniface-element';
  
  const projects = [
    {
      id: 1,
      title: '电子商务平台',
      description: '使用 React 和 Node.js 的现代在线购物平台',
      status: '进行中',
      progress: 75
    },
    {
      id: 2,
      title: '移动银行应用',
      description: '适用于 iOS 和 Android 的安全移动银行应用',
      status: '已完成',
      progress: 100
    },
    {
      id: 3,
      title: '数据分析仪表板',
      description: '带有交互式图表的实时分析仪表板',
      status: '规划中',
      progress: 25
    }
  ];
  
  const getProjectActions = (project) => [
    {
      icon: 'icon_google_visibility',
      hint: '查看项目',
      callback: (data) => console.log('查看项目:', data.title)
    },
    {
      icon: 'icon_google_edit',
      hint: '编辑项目',
      callback: (data) => console.log('编辑项目:', data.title)
    },
    {
      icon: 'icon_google_more_vert',
      hint: '更多选项',
      callback: (data) => console.log('更多选项:', data.title)
    }
  ];
</script>

<div class="project-grid">
  <h2>项目仪表板</h2>
  
  <div class="grid">
    {#each projects as project}
      <Card 
        title={project.title}
        variant="3d"
        actions={getProjectActions(project)}
        data={project}
      >
        <div class="project-card-content">
          <p class="description">{project.description}</p>
          
          <div class="project-meta">
            <div class="status">
              <span class="status-label">状态：</span>
              <span class="status-value status-{project.status.toLowerCase().replace(' ', '-')}">
                {project.status}
              </span>
            </div>
            
            <div class="progress">
              <span class="progress-label">进度：</span>
              <div class="progress-bar">
                <div 
                  class="progress-fill" 
                  style="width: {project.progress}%"
                ></div>
              </div>
              <span class="progress-text">{project.progress}%</span>
            </div>
          </div>
        </div>
      </Card>
    {/each}
  </div>
</div>

<style>
  .project-grid {
    padding: 20px;
  }
  
  .project-grid h2 {
    margin: 0 0 24px 0;
    color: #333;
  }
  
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 20px;
  }
  
  .project-card-content {
    padding: 16px;
  }
  
  .description {
    color: #666;
    line-height: 1.5;
    margin: 0 0 16px 0;
  }
  
  .project-meta {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .status, .progress {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9em;
  }
  
  .status-label, .progress-label {
    font-weight: 500;
    color: #333;
    min-width: 60px;
  }
  
  .status-value {
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 0.8em;
    font-weight: 500;
  }
  
  .status-已完成 {
    background: #d4edda;
    color: #155724;
  }
  
  .status-进行中 {
    background: #d1ecf1;
    color: #0c5460;
  }
  
  .status-规划中 {
    background: #fff3cd;
    color: #856404;
  }
  
  .progress-bar {
    flex: 1;
    height: 6px;
    background: #e9ecef;
    border-radius: 3px;
    overflow: hidden;
  }
  
  .progress-fill {
    height: 100%;
    background: #007bff;
    transition: width 0.3s ease;
  }
  
  .progress-text {
    min-width: 35px;
    text-align: right;
    font-size: 0.8em;
    color: #666;
  }
</style>
```

### Card 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `style` | `string` | `''` | 自定义 CSS 样式 |
| `title` | `string` | - | 卡片标题文本 |
| `actions` | `CardAction[]` | `[]` | 操作按钮配置 |
| `variant` | `'plain' \| '3d'` | `'plain'` | 视觉样式变体 |
| `iconColor` | `string \| null` | `null` | 操作图标颜色 |
| `data` | `any` | - | 传递给操作处理器的数据 |

### CardAction 接口

```typescript
interface CardAction {
  icon?: string;        // 图标类名
  img?: string;         // 图片源 URL
  hint?: string;        // 工具提示文本
  disabled?: boolean;   // 禁用操作
  callback: (data: any) => void;  // 点击处理器
}
```

## 最佳实践

### 1. Split 组件使用

```svelte
<!-- 为面板提供最小尺寸 -->
<style>
  .resizable-panel {
    min-width: 200px;
    min-height: 150px;
  }
</style>

<!-- 使用适当的绑定 -->
<Split bindingPanel={panelElement} direction="vertical" />
```

### 2. Drawer 无障碍访问

```svelte
<!-- 添加适当的 ARIA 标签和键盘支持 -->
<Drawer bind:visible={drawerOpen} position="left">
  <div role="navigation" aria-label="主导航">
    <!-- 导航内容 -->
  </div>
</Drawer>
```

### 3. Tag 管理

```svelte
<!-- 为可移除标签提供清晰的视觉反馈 -->
<Tag 
  text="可移除标签"
  removable={true}
  removeHandler={() => handleRemove()}
  aria-label="删除标签"
/>
```

### 4. Card 组织

```svelte
<!-- 在网格中使用一致的卡片布局 -->
<div class="card-grid">
  {#each items as item}
    <Card title={item.title} variant="3d">
      <!-- 一致的内容结构 -->
    </Card>
  {/each}
</div>

<style>
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }
</style>
```

这些杂项组件为现代应用程序提供了基本的 UI 模式，在保持可用性和无障碍标准的同时提供灵活性和一致的设计。