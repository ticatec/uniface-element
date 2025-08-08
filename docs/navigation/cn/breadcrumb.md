# Breadcrumb 面包屑组件

Breadcrumb 组件提供分层导航，显示用户在应用程序结构中的当前位置，并允许导航回到父级层次。

## 功能特性

- **分层导航**：显示从根目录到当前位置的路径
- **可定制分隔符**：可配置项目之间的分隔符字符
- **点击导航**：用于导航到父级层次的点击处理器
- **灵活的数据结构**：支持自定义数据对象
- **样式支持**：自定义样式和CSS集成

## 导入

```typescript
import { Breadcrumbs, Breadcrumb } from '@ticatec/uniface-element/Breadcrumbs';
```

## 基本用法

### 简单面包屑

```svelte
<script>
  import { Breadcrumbs } from '@ticatec/uniface-element/Breadcrumbs';
  
  const breadcrumbItems = [
    { label: "首页", data: { route: "/" } },
    { label: "产品", data: { route: "/products" } },
    { label: "电子产品", data: { route: "/products/electronics" } },
    { label: "笔记本电脑", data: { route: "/products/electronics/laptops" } }
  ];
  
  const handleItemClick = (data) => (event) => {
    console.log('导航到:', data.route);
    // 在这里处理导航逻辑
  };
</script>

<Breadcrumbs 
  items={breadcrumbItems}
  onItemClick={handleItemClick}
/>
```

### 自定义分隔符

```svelte
<script>
  import { Breadcrumbs } from '@ticatec/uniface-element/Breadcrumbs';
  
  const pathItems = [
    { label: "仪表板", data: { id: 1 } },
    { label: "用户管理", data: { id: 2 } },
    { label: "编辑资料", data: { id: 3 } }
  ];
  
  const navigate = (data) => (event) => {
    console.log('导航到项目:', data.id);
  };
</script>

<Breadcrumbs 
  items={pathItems}
  separator=">"
  onItemClick={navigate}
  style="padding: 10px; background: #f5f5f5;"
/>
```

## API 参考

### 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `items` | `Array<Breadcrumb>` | `[]` | 面包屑项目数组 |
| `separator` | `string` | `"/"` | 项目之间的分隔符字符 |
| `onItemClick` | `(item: any) => (event: MouseEvent) => void` | 必需 | 点击处理函数 |
| `style` | `string` | `''` | 附加CSS样式 |

### Breadcrumb 接口

```typescript
interface Breadcrumb {
  label: string;  // 显示文本
  data: any;      // 关联数据对象
}
```

## 高级示例

### 文件系统导航

```svelte
<script>
  import { Breadcrumbs } from '@ticatec/uniface-element/Breadcrumbs';
  
  let currentPath = [
    { label: "文档", data: { path: "/documents", type: "folder" } },
    { label: "项目", data: { path: "/documents/projects", type: "folder" } },
    { label: "WebApp", data: { path: "/documents/projects/webapp", type: "folder" } },
    { label: "src", data: { path: "/documents/projects/webapp/src", type: "folder" } }
  ];
  
  const navigateToPath = (data) => (event) => {
    // 找到点击项目的索引
    const clickedIndex = currentPath.findIndex(item => item.data.path === data.path);
    
    if (clickedIndex >= 0) {
      // 截取路径到点击的项目
      currentPath = currentPath.slice(0, clickedIndex + 1);
      console.log('导航到:', data.path);
      
      // 在真实应用中，您会在这里更新文件浏览器状态
    }
  };
  
  const addFolder = () => {
    currentPath = [...currentPath, { 
      label: "组件", 
      data: { path: currentPath[currentPath.length - 1].data.path + "/components", type: "folder" }
    }];
  };
</script>

<div class="file-navigator">
  <Breadcrumbs 
    items={currentPath}
    separator="/"
    onItemClick={navigateToPath}
    style="font-family: monospace; background: #f8f8f8; padding: 8px; border-radius: 4px;"
  />
  
  <button on:click={addFolder}>添加组件文件夹</button>
</div>
```

### 电商分类导航

```svelte
<script>
  import { Breadcrumbs } from '@ticatec/uniface-element/Breadcrumbs';
  
  let categoryPath = [
    { label: "所有分类", data: { categoryId: null, slug: "" } }
  ];
  
  const categories = [
    { id: 1, name: "电子产品", parent: null, slug: "electronics" },
    { id: 2, name: "电脑", parent: 1, slug: "computers" },
    { id: 3, name: "笔记本电脑", parent: 2, slug: "laptops" },
    { id: 4, name: "游戏笔记本", parent: 3, slug: "gaming-laptops" }
  ];
  
  const navigateToCategory = (data) => (event) => {
    if (data.categoryId === null) {
      // 导航到根目录
      categoryPath = [categoryPath[0]];
    } else {
      // 找到点击的分类并重建路径
      const clickedIndex = categoryPath.findIndex(
        item => item.data.categoryId === data.categoryId
      );
      
      if (clickedIndex >= 0) {
        categoryPath = categoryPath.slice(0, clickedIndex + 1);
      }
    }
    
    console.log('分类路径已更新:', categoryPath);
  };
  
  const drillDownCategory = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    if (category) {
      categoryPath = [...categoryPath, {
        label: category.name,
        data: { categoryId: category.id, slug: category.slug }
      }];
    }
  };
</script>

<div class="category-navigation">
  <Breadcrumbs 
    items={categoryPath}
    separator="›"
    onItemClick={navigateToCategory}
    style="margin-bottom: 15px;"
  />
  
  <div class="category-actions">
    <button on:click={() => drillDownCategory(1)}>进入电子产品</button>
    <button on:click={() => drillDownCategory(2)}>进入电脑</button>
    <button on:click={() => drillDownCategory(3)}>进入笔记本</button>
    <button on:click={() => drillDownCategory(4)}>进入游戏本</button>
  </div>
</div>
```

### 多步骤表单导航

```svelte
<script>
  import { Breadcrumbs } from '@ticatec/uniface-element/Breadcrumbs';
  
  const formSteps = [
    { id: 1, name: "账户信息", completed: true },
    { id: 2, name: "个人详情", completed: true },
    { id: 3, name: "偏好设置", completed: false },
    { id: 4, name: "确认", completed: false }
  ];
  
  let currentStepId = 3;
  
  // 从已完成步骤 + 当前步骤构建面包屑
  $: breadcrumbItems = formSteps
    .filter((step, index) => step.completed || step.id === currentStepId)
    .map(step => ({
      label: step.name,
      data: { stepId: step.id, completed: step.completed }
    }));
  
  const navigateToStep = (data) => (event) => {
    // 只允许导航到已完成的步骤
    if (data.completed) {
      currentStepId = data.stepId;
      console.log('导航到步骤:', data.stepId);
    }
  };
  
  const completeCurrentStep = () => {
    const step = formSteps.find(s => s.id === currentStepId);
    if (step) {
      step.completed = true;
      
      // 移动到下一个未完成步骤
      const nextStep = formSteps.find(s => !s.completed);
      if (nextStep) {
        currentStepId = nextStep.id;
      }
    }
  };
</script>

<div class="form-breadcrumb">
  <Breadcrumbs 
    items={breadcrumbItems}
    separator="→"
    onItemClick={navigateToStep}
    style="background: linear-gradient(90deg, #e3f2fd, #bbdefb); padding: 10px; border-radius: 8px;"
  />
  
  <div class="form-controls">
    <p>当前步骤: {formSteps.find(s => s.id === currentStepId)?.name}</p>
    <button on:click={completeCurrentStep}>完成步骤</button>
  </div>
</div>
```

## 最佳实践

1. **清晰的标签**：使用描述性、简洁的标签，清楚地表示位置
2. **逻辑层次结构**：确保面包屑反映实际的应用程序结构
3. **可点击的父级**：使父级层次可点击以便轻松导航
4. **当前项目行为**：最后一项通常不应该是可点击的（表示当前位置）
5. **响应式设计**：考虑面包屑在移动设备上的显示
6. **一致的分隔符**：为您的设计系统使用适当的分隔符
7. **性能优化**：避免不必要地重建面包屑

## 样式说明

- 组件为每个项目渲染带有分隔符前缀
- 最后一项（当前位置）的点击处理器设置为null
- 自定义样式可以通过`style`属性应用
- 考虑使用CSS为可点击项目添加悬停效果

## 无障碍访问注意事项

- 面包屑提供关于页面位置的上下文
- 点击处理器应该提供键盘支持
- 考虑为屏幕阅读器添加ARIA标签
- 确保文本和分隔符有足够的颜色对比度

## 集成提示

- 与路由库结合使用以同步URL结构
- 与页面标题结合使用以更好地定位用户
- 考虑从路由配置自动生成
- 测试很长路径的截断行为