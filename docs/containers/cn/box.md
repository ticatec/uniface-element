# Box 容器组件

一个简单且灵活的容器组件，提供带有可选头部、内容和底部部分的结构化布局。

## 概述

Box 组件是一个多用途容器，提供了一种清洁、有组织的方式来显示带有可选头部和底部部分的内容。它非常适合创建内容区域、信息面板和具有一致样式的结构化布局。

## 安装

```typescript
import Box from '@ticatec/uniface-element/Box';
```

## 基本用法

```svelte
<script lang="ts">
  import Box from '@ticatec/uniface-element/Box';
</script>

<Box title="基础容器">
  <p>这是容器组件的主要内容区域。</p>
</Box>
```

## 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `style` | `string \| null` | `null` | 容器的自定义 CSS 样式 |
| `title` | `string` | `null` | 容器标题（创建简单头部） |
| `round` | `boolean` | `false` | 为容器应用圆角 |
| `content$style` | `string \| null` | `null` | 内容区域的自定义样式 |
| `header$style` | `string \| null` | `null` | 头部区域的自定义样式 |
| `footer$style` | `string \| null` | `null` | 底部区域的自定义样式 |
| `class` | `string` | `null` | 额外的 CSS 类名 |

## 插槽

| 插槽 | 描述 |
|------|------|
| `default` | 容器的主要内容区域 |
| `header` | 自定义头部内容（覆盖标题） |
| `footer` | 底部内容区域 |

## 使用示例

### 带标题的基础容器

```svelte
<script lang="ts">
  import Box from '@ticatec/uniface-element/Box';
</script>

<Box title="用户资料">
  <div class="profile-content">
    <p><strong>姓名:</strong> 张三</p>
    <p><strong>部门:</strong> 工程部</p>
    <p><strong>位置:</strong> 北京</p>
  </div>
</Box>
```

### 圆角容器

```svelte
<script lang="ts">
  import Box from '@ticatec/uniface-element/Box';
</script>

<Box title="圆角容器" round={true}>
  <p>这个容器有圆角，外观更柔和。</p>
</Box>
```

### 带自定义头部的容器

```svelte
<script lang="ts">
  import Box from '@ticatec/uniface-element/Box';
</script>

<Box>
  <div slot="header" class="custom-header">
    <h3>自定义头部</h3>
    <span class="status-indicator">活跃</span>
  </div>
  
  <div class="content">
    <p>带有自定义头部布局的内容。</p>
  </div>
</Box>

<style>
  .custom-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .status-indicator {
    background-color: #28a745;
    color: white;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 0.75rem;
  }
</style>
```

### 带底部的容器

```svelte
<script lang="ts">
  import Box from '@ticatec/uniface-element/Box';
</script>

<Box title="文章">
  <div class="article-content">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  </div>
  
  <div slot="footer" class="article-footer">
    <span class="author">作者: 王小明</span>
    <span class="date">2024年3月15日</span>
  </div>
</Box>

<style>
  .article-footer {
    display: flex;
    justify-content: space-between;
    color: #666;
    font-size: 0.875rem;
    border-top: 1px solid #eee;
    padding-top: 8px;
  }
</style>
```

### 带自定义区域样式的容器

```svelte
<script lang="ts">
  import Box from '@ticatec/uniface-element/Box';
</script>

<Box
  title="仪表板统计"
  round={true}
  style="border: 2px solid #007bff; max-width: 400px;"
  header$style="background-color: #007bff; color: white; padding: 12px 16px;"
  content$style="padding: 20px;"
  footer$style="background-color: #f8f9fa; padding: 8px 16px;"
>
  <div class="stats-grid">
    <div class="stat-item">
      <div class="stat-value">1,234</div>
      <div class="stat-label">总用户数</div>
    </div>
    <div class="stat-item">
      <div class="stat-value">98.5%</div>
      <div class="stat-label">运行时间</div>
    </div>
  </div>
  
  <div slot="footer">
    <small>最后更新: 5分钟前</small>
  </div>
</Box>

<style>
  .stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  
  .stat-item {
    text-align: center;
  }
  
  .stat-value {
    font-size: 2rem;
    font-weight: bold;
    color: #007bff;
  }
  
  .stat-label {
    font-size: 0.875rem;
    color: #666;
    margin-top: 4px;
  }
</style>
```

### 多容器布局

```svelte
<script lang="ts">
  import Box from '@ticatec/uniface-element/Box';
</script>

<div class="box-grid">
  <Box title="快速统计" class="stat-box">
    <div class="quick-stats">
      <div class="stat">
        <span class="number">156</span>
        <span class="label">订单</span>
      </div>
      <div class="stat">
        <span class="number">¥12,450</span>
        <span class="label">收入</span>
      </div>
    </div>
  </Box>

  <Box title="最近活动" class="activity-box">
    <ul class="activity-list">
      <li>用户张三已注册</li>
      <li>订单 #1234 已完成</li>
      <li>收到付款</li>
    </ul>
  </Box>

  <Box title="系统状态" round={true} class="status-box">
    <div class="status-items">
      <div class="status-item">
        <span class="indicator green"></span>
        <span>数据库: 在线</span>
      </div>
      <div class="status-item">
        <span class="indicator green"></span>
        <span>API: 正常</span>
      </div>
      <div class="status-item">
        <span class="indicator yellow"></span>
        <span>缓存: 警告</span>
      </div>
    </div>
  </Box>
</div>

<style>
  .box-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin: 20px 0;
  }
  
  .quick-stats {
    display: flex;
    justify-content: space-around;
    text-align: center;
  }
  
  .stat .number {
    display: block;
    font-size: 1.5rem;
    font-weight: bold;
    color: #007bff;
  }
  
  .stat .label {
    font-size: 0.875rem;
    color: #666;
  }
  
  .activity-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .activity-list li {
    padding: 8px 0;
    border-bottom: 1px solid #eee;
  }
  
  .activity-list li:last-child {
    border-bottom: none;
  }
  
  .status-items {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .status-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
  
  .indicator.green {
    background-color: #28a745;
  }
  
  .indicator.yellow {
    background-color: #ffc107;
  }
</style>
```

## 样式

Box 组件使用以下 CSS 类：

```css
.uniface-box {
  /* 基础容器 */
}

.uniface-box.round {
  /* 圆角变体 */
}

.box-header {
  /* 头部容器 */
}

.box-header .title {
  /* 头部中的标题 */
}

.box-content {
  /* 主要内容区域 */
}

.box-footer {
  /* 底部容器 */
}

.flex-container {
  /* 应用于头部和底部的弹性布局 */
}
```

## 高级用法

### 带动态内容的容器

```svelte
<script lang="ts">
  import Box from '@ticatec/uniface-element/Box';
  
  let showAdvanced = false;
  let userCount = 1250;
  
  function toggleAdvanced() {
    showAdvanced = !showAdvanced;
  }
</script>

<Box 
  title="用户管理" 
  round={true}
  content$style="min-height: 200px;"
>
  <div class="user-stats">
    <p>总用户数: <strong>{userCount}</strong></p>
    
    {#if showAdvanced}
      <div class="advanced-stats">
        <p>今日活跃: <strong>{Math.floor(userCount * 0.15)}</strong></p>
        <p>本周新增: <strong>{Math.floor(userCount * 0.05)}</strong></p>
        <p>高级用户: <strong>{Math.floor(userCount * 0.12)}</strong></p>
      </div>
    {/if}
  </div>
  
  <div slot="footer" class="actions">
    <button on:click={toggleAdvanced}>
      {showAdvanced ? '隐藏' : '显示'} 高级统计
    </button>
  </div>
</Box>

<style>
  .user-stats {
    padding: 8px 0;
  }
  
  .advanced-stats {
    margin-top: 16px;
    padding: 16px;
    background-color: #f8f9fa;
    border-radius: 4px;
  }
  
  .actions {
    text-align: right;
  }
  
  .actions button {
    padding: 6px 12px;
    border: 1px solid #007bff;
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .actions button:hover {
    background-color: #0056b3;
  }
</style>
```

## 最佳实践

1. **使用描述性标题** - 保持标题清晰且信息丰富
2. **一致的间距** - 使用样式属性保持一致的内边距和外边距
3. **语义化结构** - 为不同类型的内容使用适当的插槽
4. **响应式设计** - 考虑容器在不同屏幕尺寸上的堆叠和调整大小
5. **视觉层次** - 使用头部和底部创建清晰的内容分离
6. **可访问性** - 确保适当的标题结构和颜色对比度

## 与 Card 组件的比较

虽然 Box 和 Card 组件都作为容器使用，但它们有不同的用途：

- **Box**: 简单的结构化容器，专注于布局和组织
- **Card**: 功能丰富的容器，具有内置操作按钮和交互元素

选择 Box 用于：
- 简单的内容组织
- 自定义样式需求
- 最小开销
- 灵活的布局要求

选择 Card 用于：
- 交互式内容
- 内置操作按钮
- 一致的基于卡片的设计
- 3D 视觉效果