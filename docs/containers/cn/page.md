# Page 页面组件

一个全面的页面容器组件，提供带有头部、导航操作和内容区域的结构化布局，用于构建完整的应用程序页面。

## 概述

Page 组件旨在创建一致的全页面布局，具有内置的头部功能、导航操作（返回/重新加载）和内容容器。它非常适合创建应用程序页面、表单、仪表板和具有专业外观的详情视图。

## 安装

```typescript
import Page from '@ticatec/uniface-element/Page';
import { PageHeader } from '@ticatec/uniface-element/Page';
import type { PageAction } from '@ticatec/uniface-element/Page';
```

## 基本用法

```svelte
<script lang="ts">
  import Page from '@ticatec/uniface-element/Page';
</script>

<Page title="仪表板" comment="系统指标概览">
  <div class="dashboard-content">
    <p>您的页面内容在这里...</p>
  </div>
</Page>
```

## 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `title` | `string` | `''` | 显示在头部的页面标题 |
| `comment` | `string` | `null` | 副标题或描述文本 |
| `header$style` | `string` | `''` | 头部区域的自定义样式 |
| `content$style` | `string` | `''` | 内容区域的自定义样式 |
| `round` | `boolean` | `false` | 为页面应用圆角 |
| `shadow` | `boolean` | `true` | 为页面应用阴影效果 |
| `goBack` | `PageAction \| null` | `null` | 返回导航操作 |
| `reload` | `PageAction \| null` | `null` | 重新加载/刷新操作 |
| `style` | `string` | `''` | 页面包装器的自定义样式 |

## 插槽

| 插槽 | 描述 |
|------|------|
| `default` | 页面的主要内容区域 |
| `page-header` | 自定义头部内容（覆盖默认头部） |
| `header-ext` | 额外的头部内容（扩展默认头部） |

## PageAction 类型

```typescript
export type PageAction = () => any;
```

## 使用示例

### 基础页面

```svelte
<script lang="ts">
  import Page from '@ticatec/uniface-element/Page';
</script>

<Page title="用户资料" comment="管理您的账户设置">
  <div class="profile-form">
    <h3>个人信息</h3>
    <p>在下面编辑您的资料详情...</p>
    <!-- 表单内容 -->
  </div>
</Page>
```

### 带导航操作的页面

```svelte
<script lang="ts">
  import Page from '@ticatec/uniface-element/Page';
  import type { PageAction } from '@ticatec/uniface-element/Page';

  const handleGoBack: PageAction = () => {
    window.history.back();
    console.log('正在返回...');
  };

  const handleReload: PageAction = () => {
    window.location.reload();
    console.log('正在重新加载页面...');
  };
</script>

<Page
  title="订单详情"
  comment="订单 #12345 - 处理中"
  goBack={handleGoBack}
  reload={handleReload}
>
  <div class="order-details">
    <h3>订单信息</h3>
    <p>客户: 张三</p>
    <p>总计: ¥299.99</p>
    <p>状态: 处理中</p>
  </div>
</Page>
```

### 样式化页面

```svelte
<script lang="ts">
  import Page from '@ticatec/uniface-element/Page';
</script>

<Page
  title="分析仪表板"
  comment="实时业务指标"
  round={true}
  shadow={true}
  style="max-width: 1200px; margin: 0 auto;"
  header$style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;"
  content$style="padding: 30px;"
>
  <div class="dashboard-grid">
    <div class="metric-card">
      <h4>收入</h4>
      <div class="metric-value">¥45,231</div>
    </div>
    <div class="metric-card">
      <h4>用户</h4>
      <div class="metric-value">1,234</div>
    </div>
    <div class="metric-card">
      <h4>转化率</h4>
      <div class="metric-value">3.4%</div>
    </div>
  </div>
</Page>

<style>
  .dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }
  
  .metric-card {
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    text-align: center;
  }
  
  .metric-card h4 {
    margin: 0 0 10px 0;
    color: #666;
    font-weight: normal;
  }
  
  .metric-value {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
  }
</style>
```

### 带自定义头部的页面

```svelte
<script lang="ts">
  import Page from '@ticatec/uniface-element/Page';
  import { PageHeader } from '@ticatec/uniface-element/Page';
</script>

<Page>
  <div slot="page-header" class="custom-header">
    <div class="header-left">
      <h1>自定义仪表板</h1>
      <p>高级分析和报告</p>
    </div>
    <div class="header-right">
      <button class="export-btn">导出数据</button>
      <button class="settings-btn">设置</button>
    </div>
  </div>
  
  <div class="page-content">
    <p>带有操作按钮和布局的自定义头部</p>
  </div>
</Page>

<style>
  .custom-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: #f8f9fa;
    border-bottom: 1px solid #dee2e6;
  }
  
  .header-left h1 {
    margin: 0 0 5px 0;
    font-size: 1.5rem;
  }
  
  .header-left p {
    margin: 0;
    color: #666;
    font-size: 0.875rem;
  }
  
  .header-right {
    display: flex;
    gap: 10px;
  }
  
  .export-btn, .settings-btn {
    padding: 8px 16px;
    border: 1px solid #007bff;
    background: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .settings-btn {
    background: transparent;
    color: #007bff;
  }
</style>
```

### 带扩展头部的页面

```svelte
<script lang="ts">
  import Page from '@ticatec/uniface-element/Page';
  import type { PageAction } from '@ticatec/uniface-element/Page';

  const handleBack: PageAction = () => {
    console.log('正在返回...');
  };

  let activeTab = 'overview';
</script>

<Page
  title="项目管理"
  comment="管理项目任务和团队协作"
  goBack={handleBack}
>
  <div slot="header-ext" class="header-tabs">
    <button
      class="tab"
      class:active={activeTab === 'overview'}
      on:click={() => activeTab = 'overview'}
    >
      概览
    </button>
    <button
      class="tab"
      class:active={activeTab === 'tasks'}
      on:click={() => activeTab = 'tasks'}
    >
      任务
    </button>
    <button
      class="tab"
      class:active={activeTab === 'team'}
      on:click={() => activeTab = 'team'}
    >
      团队
    </button>
  </div>
  
  <div class="tab-content">
    {#if activeTab === 'overview'}
      <div class="overview-section">
        <h3>项目概览</h3>
        <p>当前项目状态和关键指标</p>
      </div>
    {:else if activeTab === 'tasks'}
      <div class="tasks-section">
        <h3>任务管理</h3>
        <p>查看和管理项目任务</p>
      </div>
    {:else if activeTab === 'team'}
      <div class="team-section">
        <h3>团队成员</h3>
        <p>与您的团队协作</p>
      </div>
    {/if}
  </div>
</Page>

<style>
  .header-tabs {
    display: flex;
    gap: 1px;
    background: #e9ecef;
    border-radius: 4px;
    padding: 4px;
  }
  
  .tab {
    padding: 8px 16px;
    border: none;
    background: transparent;
    border-radius: 2px;
    cursor: pointer;
    font-size: 0.875rem;
    transition: background-color 0.2s;
  }
  
  .tab:hover {
    background: rgba(255,255,255,0.5);
  }
  
  .tab.active {
    background: white;
    font-weight: 500;
  }
  
  .tab-content {
    padding: 20px 0;
  }
</style>
```

### 表单页面示例

```svelte
<script lang="ts">
  import Page from '@ticatec/uniface-element/Page';
  import type { PageAction } from '@ticatec/uniface-element/Page';

  let formData = {
    name: '',
    email: '',
    department: 'engineering'
  };

  const handleBack: PageAction = () => {
    if (confirm('确定要离开吗？未保存的更改将丢失。')) {
      window.history.back();
    }
  };

  const handleReload: PageAction = () => {
    if (confirm('重新加载页面？未保存的更改将丢失。')) {
      window.location.reload();
    }
  };

  function handleSubmit() {
    console.log('提交表单:', formData);
    // 处理表单提交
  }

  function handleReset() {
    formData = { name: '', email: '', department: 'engineering' };
  }
</script>

<Page
  title="添加新员工"
  comment="完成表单以添加新团队成员"
  goBack={handleBack}
  reload={handleReload}
  round={true}
  content$style="max-width: 600px; margin: 0 auto; padding: 30px;"
>
  <form class="employee-form" on:submit|preventDefault={handleSubmit}>
    <div class="form-group">
      <label for="name">全名 *</label>
      <input
        id="name"
        type="text"
        bind:value={formData.name}
        required
        placeholder="输入全名"
      />
    </div>
    
    <div class="form-group">
      <label for="email">邮箱地址 *</label>
      <input
        id="email"
        type="email"
        bind:value={formData.email}
        required
        placeholder="输入邮箱地址"
      />
    </div>
    
    <div class="form-group">
      <label for="department">部门</label>
      <select id="department" bind:value={formData.department}>
        <option value="engineering">工程部</option>
        <option value="design">设计部</option>
        <option value="marketing">市场部</option>
        <option value="sales">销售部</option>
      </select>
    </div>
    
    <div class="form-actions">
      <button type="button" class="btn-secondary" on:click={handleReset}>
        重置
      </button>
      <button type="submit" class="btn-primary">
        添加员工
      </button>
    </div>
  </form>
</Page>

<style>
  .employee-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  .form-group label {
    font-weight: 500;
    color: #333;
  }
  
  .form-group input,
  .form-group select {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  .form-group input:focus,
  .form-group select:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
  }
  
  .form-actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    margin-top: 20px;
  }
  
  .btn-primary,
  .btn-secondary {
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    border: none;
  }
  
  .btn-primary {
    background: #007bff;
    color: white;
  }
  
  .btn-secondary {
    background: #6c757d;
    color: white;
  }
  
  .btn-primary:hover {
    background: #0056b3;
  }
  
  .btn-secondary:hover {
    background: #545b62;
  }
</style>
```

## 样式

Page 组件使用以下 CSS 类：

```css
.uniface-page-wrapper {
  /* 页面包装器容器 */
}

.uniface-page {
  /* 主页面容器 */
}

.uniface-page.shadow {
  /* 带阴影效果的页面 */
}

.uniface-page.round {
  /* 带圆角的页面 */
}

.uniface-page-header {
  /* 头部容器 */
}

.page-container {
  /* 内容容器 */
}
```

## API 参考

### Page 组件属性

除非标记为必需，否则所有属性都是可选的。

```typescript
interface PageProps {
  title: string;                    // 页面标题
  comment?: string | null;          // 副标题/描述
  header$style?: string;            // 头部自定义样式
  content$style?: string;           // 内容自定义样式
  round?: boolean;                  // 圆角
  shadow?: boolean;                 // 阴影效果
  goBack?: PageAction | null;       // 返回导航
  reload?: PageAction | null;       // 重新加载操作
  style?: string;                   // 包装器自定义样式
}
```

### PageAction 类型

```typescript
export type PageAction = () => any;
```

## 最佳实践

1. **一致的导航** - 始终为详情页面提供返回导航
2. **描述性标题** - 使用清晰、描述性的页面标题来解释页面用途
3. **有用的注释** - 添加副标题/注释文本以提供上下文
4. **响应式布局** - 使用内容样式确保适当的响应式行为
5. **操作确认** - 确认诸如从未保存表单导航等破坏性操作
6. **加载状态** - 当操作是异步时，优雅地处理加载状态
7. **错误处理** - 为页面操作实现适当的错误处理
8. **可访问性** - 确保适当的标题层次结构和键盘导航

## 与路由器集成

Page 组件与路由库配合良好：

```svelte
<script lang="ts">
  import Page from '@ticatec/uniface-element/Page';
  import { goto } from '$app/navigation';
  import type { PageAction } from '@ticatec/uniface-element/Page';

  const handleBack: PageAction = () => {
    goto('/dashboard');
  };
</script>

<Page title="设置" goBack={handleBack}>
  <!-- 页面内容 -->
</Page>
```