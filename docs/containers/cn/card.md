# Card 卡片组件

一个灵活且多用途的卡片容器组件，用于显示带有可选标题、操作按钮和样式变体的内容。

## 概述

Card 组件提供了一种结构化的方式来在容器中显示内容，可以包含标题、头部栏、操作按钮和各种视觉样式。它非常适合创建内容卡片、信息面板和交互式容器。

## 安装

```typescript
import Card from '@ticatec/uniface-element/Card';
import type { CardAction } from '@ticatec/uniface-element/Card';
```

## 基本用法

```svelte
<script lang="ts">
  import Card from '@ticatec/uniface-element/Card';

  let title = "基础卡片";
</script>

<Card {title}>
  <p>这是卡片内容区域，您可以在这里放置任何内容。</p>
</Card>
```

## 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `style` | `string` | `""` | 卡片的自定义 CSS 样式 |
| `title` | `string` | `null` | 卡片标题（创建简单头部） |
| `actions` | `Array<CardAction>` | `[]` | 卡片的操作按钮 |
| `variant` | `'plain' \| '3d'` | `'plain'` | 视觉样式变体 |
| `iconColor` | `string \| null` | `null` | 操作图标的颜色 |
| `data` | `any` | - | 传递给操作回调的数据 |

## 插槽

| 插槽 | 描述 |
|------|------|
| `default` | 卡片的主要内容区域 |
| `header-bar` | 自定义头部内容（覆盖标题） |
| `action-bar` | 自定义操作栏（未提供操作数组时使用） |

## CardAction 接口

```typescript
interface CardAction {
  /**
   * 使用icon字体
   */
  icon?: string;

  /**
   * 直接嵌入图标
   */
  img?: string;

  /**
   * 鼠标停留的提示
   */
  hint?: string;

  /**
   * 是否禁用
   */
  disabled?: boolean;

  /**
   * 操作回调函数
   */
  callback: ActionCallback;
}

type ActionCallback = (data: any) => void;
```

## 使用示例

### 带标题的基础卡片

```svelte
<script lang="ts">
  import Card from '@ticatec/uniface-element/Card';
</script>

<Card title="用户信息">
  <div class="user-info">
    <p><strong>姓名:</strong> 张三</p>
    <p><strong>邮箱:</strong> zhang@example.com</p>
    <p><strong>角色:</strong> 开发者</p>
  </div>
</Card>
```

### 带操作按钮的卡片

```svelte
<script lang="ts">
  import Card from '@ticatec/uniface-element/Card';
  import type { CardAction } from '@ticatec/uniface-element/Card';

  let userData = { id: 1, name: '张三' };

  let actions: CardAction[] = [
    {
      icon: 'edit',
      hint: '编辑用户',
      callback: (data) => console.log('编辑', data)
    },
    {
      icon: 'delete',
      hint: '删除用户',
      callback: (data) => console.log('删除', data)
    },
    {
      icon: 'share',
      hint: '分享用户资料',
      disabled: false,
      callback: (data) => console.log('分享', data)
    }
  ];
</script>

<Card title="用户卡片" {actions} data={userData}>
  <div class="user-profile">
    <p>用户资料内容在这里...</p>
  </div>
</Card>
```

### 3D 样式卡片

```svelte
<script lang="ts">
  import Card from '@ticatec/uniface-element/Card';
</script>

<Card title="3D 卡片" variant="3d">
  <p>这张卡片具有3D阴影效果，增强视觉吸引力。</p>
</Card>
```

### 带自定义头部的卡片

```svelte
<script lang="ts">
  import Card from '@ticatec/uniface-element/Card';
</script>

<Card>
  <div slot="header-bar" class="custom-header">
    <h3>自定义头部</h3>
    <span class="status-badge">激活</span>
  </div>
  
  <div class="card-body">
    <p>带有自定义头部样式的内容。</p>
  </div>
</Card>
```

### 带自定义操作栏的卡片

```svelte
<script lang="ts">
  import Card from '@ticatec/uniface-element/Card';
</script>

<Card title="自定义操作">
  <p>卡片内容在这里。</p>
  
  <div slot="action-bar" class="custom-actions">
    <button class="btn-primary">保存</button>
    <button class="btn-secondary">取消</button>
  </div>
</Card>
```

### 包含所有功能的高级卡片

```svelte
<script lang="ts">
  import Card from '@ticatec/uniface-element/Card';
  import type { CardAction } from '@ticatec/uniface-element/Card';

  let projectData = {
    id: 'proj-123',
    name: '网站重新设计',
    status: '进行中'
  };

  let projectActions: CardAction[] = [
    {
      icon: 'visibility',
      hint: '查看项目详情',
      callback: (data) => viewProject(data)
    },
    {
      icon: 'edit',
      hint: '编辑项目',
      callback: (data) => editProject(data)
    },
    {
      icon: 'share',
      hint: '分享项目',
      callback: (data) => shareProject(data)
    },
    {
      icon: 'archive',
      hint: '归档项目',
      disabled: projectData.status === '已归档',
      callback: (data) => archiveProject(data)
    }
  ];

  function viewProject(data: any) {
    console.log('查看项目:', data);
  }

  function editProject(data: any) {
    console.log('编辑项目:', data);
  }

  function shareProject(data: any) {
    console.log('分享项目:', data);
  }

  function archiveProject(data: any) {
    console.log('归档项目:', data);
  }
</script>

<Card
  title="项目: {projectData.name}"
  variant="3d"
  actions={projectActions}
  data={projectData}
  iconColor="#007bff"
  style="max-width: 400px; margin: 20px;"
>
  <div class="project-details">
    <div class="status-row">
      <span class="label">状态:</span>
      <span class="status status-{projectData.status.toLowerCase().replace(' ', '-')}">
        {projectData.status}
      </span>
    </div>
    <div class="description">
      <p>采用现代 UI/UX 原则对公司网站进行完整重新设计。</p>
    </div>
    <div class="progress">
      <div class="progress-bar">
        <div class="progress-fill" style="width: 65%"></div>
      </div>
      <span class="progress-text">65% 完成</span>
    </div>
  </div>
</Card>

<style>
  .project-details {
    padding: 16px 0;
  }
  
  .status-row {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }
  
  .label {
    font-weight: 600;
    margin-right: 8px;
  }
  
  .status {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.875rem;
    font-weight: 500;
  }
  
  .status-进行中 {
    background-color: #fff3cd;
    color: #856404;
  }
  
  .description {
    margin-bottom: 16px;
  }
  
  .progress {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .progress-bar {
    flex: 1;
    height: 8px;
    background-color: #e9ecef;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .progress-fill {
    height: 100%;
    background-color: #007bff;
    transition: width 0.3s ease;
  }
  
  .progress-text {
    font-size: 0.875rem;
    color: #6c757d;
    white-space: nowrap;
  }
</style>
```

## 样式

Card 组件使用以下 CSS 类：

```css
.uniface-card {
  /* 基础卡片容器 */
}

.uniface-card.shadowBox {
  /* 带阴影的3D变体 */
}

.card-header {
  /* 头部容器 */
}

.card-header.simple {
  /* 简单标题头部 */
}

.card-content {
  /* 主要内容区域 */
}

.card-action-bar {
  /* 操作栏容器 */
}
```

## API 参考

### CardAction 接口

```typescript
interface CardAction {
  /**
   * 使用icon字体（如 'edit'、'delete'）
   */
  icon?: string;

  /**
   * 直接嵌入图标的URL
   */
  img?: string;

  /**
   * 鼠标停留时显示的提示文字
   */
  hint?: string;

  /**
   * 操作按钮是否被禁用
   */
  disabled?: boolean;

  /**
   * 点击操作时执行的回调函数
   */
  callback: ActionCallback;
}
```

### 类型定义

```typescript
/**
 * 操作回调函数
 */
export type ActionCallback = (data: any) => void;
```

## 最佳实践

1. **使用描述性标题** - 保持卡片标题简洁但信息丰富
2. **限制操作数量** - 不要用太多操作按钮让用户感到困惑
3. **提供提示** - 始终为操作包含有用的工具提示文本
4. **处理禁用状态** - 当操作不适用时禁用它们
5. **一致的样式** - 在类似的卡片中使用相同的变体
6. **响应式设计** - 考虑卡片在不同屏幕尺寸上的显示效果