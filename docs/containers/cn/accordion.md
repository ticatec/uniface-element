# Accordion 手风琴组件

一个可折叠的内容容器组件，允许以空间高效的可展开/折叠格式组织多个内容部分。

## 概述

Accordion 组件提供了一种优雅的方式来显示多个内容部分，用户可以展开和折叠各个部分。它支持排他模式（一次只能打开一个部分）和多开模式，非常适合用于常见问题解答、导航菜单、内容组织和仪表板部分。

## 安装

```typescript
import Accordion from '@ticatec/uniface-element/Accordion';
import type { AccordionItem } from '@ticatec/uniface-element/Accordion';
```

## 基本用法

```svelte
<script lang="ts">
  import Accordion from '@ticatec/uniface-element/Accordion';
  import type { AccordionItem } from '@ticatec/uniface-element/Accordion';
  
  // 导入您的组件
  import UserProfile from './UserProfile.svelte';
  import Settings from './Settings.svelte';
  import Reports from './Reports.svelte';

  let accordionItems: AccordionItem[] = [
    {
      title: '用户资料',
      component: UserProfile,
      params: { userId: 123 }
    },
    {
      title: '设置',
      component: Settings
    },
    {
      title: '报告',
      component: Reports,
      params: { type: 'monthly' }
    }
  ];
</script>

<Accordion accordions={accordionItems} />
```

## 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `style` | `string` | `''` | 手风琴容器的自定义 CSS 样式 |
| `class` | `string` | `''` | 额外的 CSS 类名 |
| `compact` | `boolean` | `false` | 使用紧凑样式，减少内边距 |
| `accordions` | `Array<AccordionItem>` | `[]` | 要显示的手风琴项目数组 |
| `exclusive` | `boolean` | `false` | 一次只允许打开一个手风琴 |
| `activeItem` | `AccordionItem` | `null` | 当前活动项目（与排他模式一起使用） |

## AccordionItem 接口

```typescript
interface AccordionItem {
  /**
   * 手风琴部分的显示标题
   */
  title: string;

  /**
   * 要在手风琴内容中渲染的 Svelte 组件
   */
  component: any;

  /**
   * 传递给组件的参数/属性
   */
  params?: any;
}
```

## 使用示例

### 基础手风琴

```svelte
<script lang="ts">
  import Accordion from '@ticatec/uniface-element/Accordion';
  import type { AccordionItem } from '@ticatec/uniface-element/Accordion';

  // 用于演示的简单文本组件
  let TextSection = (text: string) => `<div class="section-content"><p>${text}</p></div>`;

  let items: AccordionItem[] = [
    {
      title: '入门指南',
      component: TextSection,
      params: { text: '欢迎来到我们的平台！在这里您可以找到开始使用所需的一切。' }
    },
    {
      title: '功能特性',
      component: TextSection,
      params: { text: '探索我们应用程序中提供的强大功能。' }
    },
    {
      title: '客户支持',
      component: TextSection,
      params: { text: '需要帮助？请联系我们的支持团队寻求帮助。' }
    }
  ];
</script>

<Accordion accordions={items} />
```

### 排他模式手风琴

```svelte
<script lang="ts">
  import Accordion from '@ticatec/uniface-element/Accordion';
  import type { AccordionItem } from '@ticatec/uniface-element/Accordion';
  
  import DashboardPanel from './DashboardPanel.svelte';
  import AnalyticsPanel from './AnalyticsPanel.svelte';
  import SettingsPanel from './SettingsPanel.svelte';

  let dashboardItems: AccordionItem[] = [
    {
      title: '仪表板概览',
      component: DashboardPanel,
      params: { view: 'overview' }
    },
    {
      title: '数据分析',
      component: AnalyticsPanel,
      params: { period: '30d' }
    },
    {
      title: '系统设置',
      component: SettingsPanel
    }
  ];

  let activeItem: AccordionItem = dashboardItems[0];
</script>

<Accordion 
  accordions={dashboardItems} 
  exclusive={true}
  bind:activeItem
/>
```

### 紧凑手风琴

```svelte
<script lang="ts">
  import Accordion from '@ticatec/uniface-element/Accordion';
  import type { AccordionItem } from '@ticatec/uniface-element/Accordion';
  
  import QuickAction from './QuickAction.svelte';

  let quickActions: AccordionItem[] = [
    {
      title: '快速操作',
      component: QuickAction,
      params: { actions: ['create', 'edit', 'delete'] }
    },
    {
      title: '最近项目',
      component: QuickAction,
      params: { type: 'recent', limit: 5 }
    },
    {
      title: '收藏夹',
      component: QuickAction,
      params: { type: 'favorites' }
    }
  ];
</script>

<Accordion 
  accordions={quickActions} 
  compact={true}
  class="sidebar-accordion"
  style="max-width: 300px;"
/>
```

### 带真实组件的动态手风琴

```svelte
<script lang="ts">
  import Accordion from '@ticatec/uniface-element/Accordion';
  import type { AccordionItem } from '@ticatec/uniface-element/Accordion';
  
  // 导入实际组件
  import UserListComponent from './components/UserListComponent.svelte';
  import ProductCatalog from './components/ProductCatalog.svelte';
  import OrderHistory from './components/OrderHistory.svelte';
  import SystemLogs from './components/SystemLogs.svelte';

  let currentUser = { id: 1, role: 'admin' };
  
  let adminSections: AccordionItem[] = [
    {
      title: '用户管理',
      component: UserListComponent,
      params: { 
        editable: true,
        filters: ['active', 'pending'],
        currentUser: currentUser
      }
    },
    {
      title: '产品目录',
      component: ProductCatalog,
      params: {
        mode: 'admin',
        showHidden: true,
        allowEdit: true
      }
    },
    {
      title: '订单历史',
      component: OrderHistory,
      params: {
        dateRange: '30d',
        status: 'all',
        exportEnabled: true
      }
    },
    {
      title: '系统日志',
      component: SystemLogs,
      params: {
        level: 'info',
        realTime: true,
        maxLines: 1000
      }
    }
  ];

  // 处理动态更新
  function refreshAccordion() {
    adminSections = [...adminSections];
  }
</script>

<div class="admin-dashboard">
  <h2>管理员仪表板</h2>
  
  <Accordion 
    accordions={adminSections}
    style="border: 1px solid #e0e0e0; border-radius: 8px;"
    class="admin-accordion"
  />
  
  <button on:click={refreshAccordion} class="refresh-btn">
    刷新数据
  </button>
</div>

<style>
  .admin-dashboard {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .refresh-btn {
    margin-top: 20px;
    padding: 10px 20px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .refresh-btn:hover {
    background: #0056b3;
  }
  
  :global(.admin-accordion) {
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
</style>
```

### 常见问题手风琴

```svelte
<script lang="ts">
  import Accordion from '@ticatec/uniface-element/Accordion';
  import type { AccordionItem } from '@ticatec/uniface-element/Accordion';
  
  // 创建简单的FAQ内容组件
  const FAQContent = (content: string) => {
    return `<div class="faq-content">${content}</div>`;
  };

  let faqItems: AccordionItem[] = [
    {
      title: '这个平台是什么？',
      component: FAQContent,
      params: '我们的平台是一个用于管理您的业务运营的综合解决方案，包括用户管理、分析和报告工具。'
    },
    {
      title: '如何开始使用？',
      component: FAQContent,
      params: '开始使用很简单！注册账户，完善您的个人资料，然后按照我们的分步入门指南进行操作。'
    },
    {
      title: '价格方案有哪些？',
      component: FAQContent,
      params: '我们提供灵活的价格方案，包括免费套餐、每月29美元的专业套餐和企业解决方案。请联系我们的销售团队了解定制价格。'
    },
    {
      title: '如何联系客服？',
      component: FAQContent,
      params: '您可以通过聊天工具全天候联系我们的支持团队，发送邮件至 support@company.com，或拨打热线 400-888-8888。'
    },
    {
      title: '我的数据安全吗？',
      component: FAQContent,
      params: '绝对安全！我们使用企业级加密，定期进行安全审计，并遵守GDPR、SOC 2等安全标准。'
    }
  ];
</script>

<div class="faq-section">
  <h2>常见问题</h2>
  <p class="faq-subtitle">查找有关我们平台常见问题的答案</p>
  
  <Accordion 
    accordions={faqItems}
    class="faq-accordion"
    style="margin-top: 30px;"
  />
</div>

<style>
  .faq-section {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 20px;
  }
  
  .faq-section h2 {
    text-align: center;
    color: #333;
    margin-bottom: 10px;
  }
  
  .faq-subtitle {
    text-align: center;
    color: #666;
    margin-bottom: 0;
  }
  
  :global(.faq-content) {
    padding: 16px;
    line-height: 1.6;
    color: #555;
  }
  
  :global(.faq-accordion .uniface-accordion-panel) {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    margin-bottom: 12px;
  }
</style>
```

### 嵌套内容手风琴

```svelte
<script lang="ts">
  import Accordion from '@ticatec/uniface-element/Accordion';
  import type { AccordionItem } from '@ticatec/uniface-element/Accordion';
  
  // 复杂嵌套组件示例
  import ProjectDetails from './ProjectDetails.svelte';
  import TaskManager from './TaskManager.svelte';
  import TeamOverview from './TeamOverview.svelte';
  import FileManager from './FileManager.svelte';

  let projectId = 'proj-123';
  let projectData = {
    name: '网站重新设计',
    status: 'active',
    deadline: '2024-06-30'
  };

  let projectSections: AccordionItem[] = [
    {
      title: `项目详情 - ${projectData.name}`,
      component: ProjectDetails,
      params: {
        projectId,
        projectData,
        editable: true,
        showTimeline: true
      }
    },
    {
      title: '任务管理',
      component: TaskManager,
      params: {
        projectId,
        view: 'kanban',
        allowAssignment: true,
        filters: ['all', 'assigned', 'completed']
      }
    },
    {
      title: '团队协作',
      component: TeamOverview,
      params: {
        projectId,
        showActivity: true,
        allowInvite: true,
        roles: ['admin', 'member', 'viewer']
      }
    },
    {
      title: '文件管理',
      component: FileManager,
      params: {
        projectId,
        allowUpload: true,
        maxFileSize: '10MB',
        allowedTypes: ['.pdf', '.doc', '.jpg', '.png']
      }
    }
  ];

  // 自动选择第一个项目
  let activeSection = projectSections[0];
</script>

<div class="project-workspace">
  <div class="project-header">
    <h1>{projectData.name}</h1>
    <span class="status-badge status-{projectData.status}">
      {projectData.status.toUpperCase()}
    </span>
  </div>
  
  <Accordion 
    accordions={projectSections}
    exclusive={true}
    bind:activeItem={activeSection}
    class="project-accordion"
    style="margin-top: 20px;"
  />
</div>

<style>
  .project-workspace {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .project-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
  }
  
  .project-header h1 {
    margin: 0;
    color: #333;
  }
  
  .status-badge {
    padding: 4px 12px;
    border-radius: 16px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
  }
  
  .status-active {
    background: #d4edda;
    color: #155724;
  }
  
  :global(.project-accordion) {
    border: 1px solid #dee2e6;
    border-radius: 8px;
    overflow: hidden;
  }
</style>
```

## 样式

Accordion 组件使用以下 CSS 类：

```css
.uniface-accordion-panel {
  /* 主要的手风琴容器 */
}

.uniface-accordion-panel.compact {
  /* 减少内边距的紧凑变体 */
}

/* 各个手风琴项目由 AccordionItemView 组件进行样式设置 */
```

## 高级用法

### 程序化控制

```svelte
<script lang="ts">
  import Accordion from '@ticatec/uniface-element/Accordion';
  import type { AccordionItem } from '@ticatec/uniface-element/Accordion';
  
  let accordionRef: Accordion;
  let items: AccordionItem[] = [...];
  let activeItem: AccordionItem;

  function openSpecificSection(index: number) {
    if (items[index]) {
      activeItem = items[index];
    }
  }

  function addNewSection() {
    const newItem: AccordionItem = {
      title: `新部分 ${items.length + 1}`,
      component: SomeComponent,
      params: { id: Date.now() }
    };
    items = [...items, newItem];
  }

  function removeSection(index: number) {
    items = items.filter((_, i) => i !== index);
  }
</script>

<div class="controls">
  <button on:click={() => openSpecificSection(0)}>打开第一个</button>
  <button on:click={addNewSection}>添加部分</button>
</div>

<Accordion 
  bind:this={accordionRef}
  accordions={items}
  bind:activeItem
  exclusive={true}
/>
```

## API 参考

### Accordion 组件属性

```typescript
interface AccordionProps {
  style?: string;                   // 自定义 CSS 样式
  class?: string;                   // 额外的 CSS 类
  compact?: boolean;                // 使用紧凑样式
  accordions: Array<AccordionItem>; // 手风琴项目数组
  exclusive?: boolean;              // 一次只能打开一个
  activeItem?: AccordionItem;       // 当前活动项目
}
```

### AccordionItem 接口

```typescript
interface AccordionItem {
  /**
   * 手风琴部分的显示标题
   */
  title: string;

  /**
   * 要在手风琴内容中渲染的 Svelte 组件
   */
  component: any;

  /**
   * 传递给组件的参数/属性
   */
  params?: any;
}
```

## 最佳实践

1. **有意义的标题** - 使用清晰、描述性的标题来指示部分包含什么内容
2. **组件组织** - 保持手风琴内容组件的专注性和独立性
3. **性能考量** - 考虑对重型内容组件进行懒加载
4. **排他模式** - 对导航样式的手风琴使用排他模式，对内容组织使用多开模式
5. **响应式设计** - 确保手风琴内容在移动设备上运行良好
6. **加载状态** - 当手风琴内容需要数据获取时，优雅地处理加载状态
7. **键盘导航** - 确保手风琴部分具有键盘可访问性
8. **视觉层次** - 使用一致的样式在手风琴内容中保持视觉层次

## 可访问性

Accordion 组件遵循可访问性最佳实践：

- 为屏幕阅读器提供适当的 ARIA 属性
- 支持键盘导航
- 展开/折叠时的焦点管理
- 语义化 HTML 结构

## 性能考量

- 组件仅在其手风琴部分打开时才被实例化
- 使用 `params` 属性只向组件传递必要的数据
- 考虑对数据繁重的组件实现懒加载
- 避免深度嵌套的手风琴结构以获得更好的性能