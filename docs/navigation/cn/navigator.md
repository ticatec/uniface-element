# Navigator 导航器组件

Navigator 组件提供灵活的导航界面，用于显示带有状态指示器、高亮和点击处理的交互式项目列表。

## 功能特性

- **交互式导航**：带有自定义处理器的可点击项目
- **状态指示器**：每个项目的可视化状态表示
- **高亮显示**：支持高亮特定项目
- **激活状态管理**：跟踪和显示激活/选中的项目
- **灵活的项目结构**：支持任何项目数据结构
- **可定制样式**：自定义样式和CSS集成

## 导入

```typescript
import { Navigator, NavItemStatus } from '@ticatec/uniface-element/Navigator';
```

## 基本用法

### 简单导航列表

```svelte
<script>
  import { Navigator, NavItemStatus } from '@ticatec/uniface-element/Navigator';
  
  const navItems = [
    { id: 1, text: "仪表板", completed: true },
    { id: 2, text: "项目", completed: true },
    { id: 3, text: "设置", completed: false },
    { id: 4, text: "个人资料", completed: false }
  ];
  
  let activeItem = navItems[0];
  
  const handleItemClick = (item) => {
    console.log('点击:', item.text);
    activeItem = item;
  };
  
  const getItemStatus = (item) => {
    return item.completed ? NavItemStatus.Completed : NavItemStatus.NotStart;
  };
</script>

<Navigator 
  items={navItems}
  {activeItem}
  itemClickHandler={handleItemClick}
  retrieveStatus={getItemStatus}
/>
```

### 带高亮的导航

```svelte
<script>
  import { Navigator, NavItemStatus } from '@ticatec/uniface-element/Navigator';
  
  const menuItems = [
    { id: 1, text: "首页", status: "completed" },
    { id: 2, text: "关于", status: "warning" },
    { id: 3, text: "服务", status: "not-start" },
    { id: 4, text: "联系", status: "completed" }
  ];
  
  let activeItem = menuItems[0];
  let highlightedItems = [menuItems[1], menuItems[3]]; // 高亮关于和联系
  
  const handleClick = (item) => {
    activeItem = item;
    // 在这里处理导航逻辑
  };
  
  const getStatus = (item) => {
    switch (item.status) {
      case 'completed': return NavItemStatus.Completed;
      case 'warning': return NavItemStatus.Warning;
      default: return NavItemStatus.NotStart;
    }
  };
</script>

<Navigator 
  items={menuItems}
  {activeItem}
  highlights={highlightedItems}
  itemClickHandler={handleClick}
  retrieveStatus={getStatus}
  style="width: 250px; border: 1px solid #e0e0e0;"
/>
```

## API 参考

### 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `items` | `Array<any>` | 必需 | 导航项目数组 |
| `activeItem` | `any` | `null` | 当前激活/选中的项目 |
| `style` | `string` | `""` | 附加CSS样式 |
| `highlights` | `Array<any>` | `[]` | 要高亮的项目 |
| `itemClickHandler` | `ItemClickHandler` | 必需 | 点击事件处理器 |
| `retrieveStatus` | `RetrieveItemStatus` | 必需 | 获取项目状态的函数 |

### 类型定义

```typescript
type ItemClickHandler = (item: any) => void;
type RetrieveItemStatus = (item: any) => NavItemStatus;
```

### NavItemStatus 枚举

```typescript
enum NavItemStatus {
  Completed = "nav-completed",  // 已完成
  Warning = "nav-warning",      // 警告
  NotStart = "nav-not-start"    // 未开始
}
```

## 高级示例

### 任务管理导航器

```svelte
<script>
  import { Navigator, NavItemStatus } from '@ticatec/uniface-element/Navigator';
  
  let tasks = [
    { 
      id: 1, 
      text: "项目设置", 
      completed: true, 
      hasIssues: false 
    },
    { 
      id: 2, 
      text: "数据库设计", 
      completed: true, 
      hasIssues: true 
    },
    { 
      id: 3, 
      text: "API实现", 
      completed: false, 
      hasIssues: false 
    },
    { 
      id: 4, 
      text: "前端开发", 
      completed: false, 
      hasIssues: false 
    }
  ];
  
  let activeTask = tasks[2]; // 当前正在进行API开发
  let importantTasks = tasks.filter(task => task.hasIssues);
  
  const handleTaskClick = (task) => {
    activeTask = task;
    console.log(`切换到任务: ${task.text}`);
  };
  
  const getTaskStatus = (task) => {
    if (task.hasIssues) return NavItemStatus.Warning;
    if (task.completed) return NavItemStatus.Completed;
    return NavItemStatus.NotStart;
  };
</script>

<div class="task-navigator">
  <h3>项目任务</h3>
  <Navigator 
    items={tasks}
    activeItem={activeTask}
    highlights={importantTasks}
    itemClickHandler={handleTaskClick}
    retrieveStatus={getTaskStatus}
    style="border: 1px solid #ddd; border-radius: 4px; padding: 8px;"
  />
</div>
```

### 多步骤表单导航器

```svelte
<script>
  import { Navigator, NavItemStatus } from '@ticatec/uniface-element/Navigator';
  
  let formSteps = [
    { id: 'personal', text: "个人信息", completed: true },
    { id: 'address', text: "地址", completed: true },
    { id: 'payment', text: "支付", completed: false, current: true },
    { id: 'review', text: "审核", completed: false }
  ];
  
  let currentStep = formSteps.find(step => step.current);
  
  const handleStepClick = (step) => {
    // 只允许点击已完成的步骤或当前步骤
    if (step.completed || step.current) {
      currentStep = step;
      
      // 更新当前步骤标志
      formSteps = formSteps.map(s => ({
        ...s,
        current: s.id === step.id
      }));
    }
  };
  
  const getStepStatus = (step) => {
    if (step.completed) return NavItemStatus.Completed;
    if (step.current) return NavItemStatus.Warning; // 当前步骤
    return NavItemStatus.NotStart;
  };
  
  const completeCurrentStep = () => {
    const stepIndex = formSteps.findIndex(s => s.current);
    if (stepIndex >= 0) {
      formSteps[stepIndex].completed = true;
      formSteps[stepIndex].current = false;
      
      if (stepIndex < formSteps.length - 1) {
        formSteps[stepIndex + 1].current = true;
        currentStep = formSteps[stepIndex + 1];
      }
      
      formSteps = [...formSteps]; // 触发响应式更新
    }
  };
</script>

<div class="form-navigation">
  <Navigator 
    items={formSteps}
    activeItem={currentStep}
    itemClickHandler={handleStepClick}
    retrieveStatus={getStepStatus}
    style="margin-bottom: 20px;"
  />
  
  <div class="form-content">
    <h4>步骤: {currentStep?.text}</h4>
    <button on:click={completeCurrentStep}>
      完成步骤
    </button>
  </div>
</div>
```

### 文件浏览器导航器

```svelte
<script>
  import { Navigator, NavItemStatus } from '@ticatec/uniface-element/Navigator';
  
  let files = [
    { name: "文档", type: "folder", accessible: true },
    { name: "图片", type: "folder", accessible: true },
    { name: "配置.json", type: "file", accessible: true },
    { name: "备份.zip", type: "file", accessible: false },
    { name: "临时", type: "folder", accessible: false }
  ];
  
  let selectedFile = files[0];
  let recentFiles = [files[2]]; // 最近访问的文件
  
  const handleFileClick = (file) => {
    if (file.accessible) {
      selectedFile = file;
      console.log(`打开: ${file.name}`);
    } else {
      console.log(`无法访问: ${file.name}`);
    }
  };
  
  const getFileStatus = (file) => {
    if (!file.accessible) return NavItemStatus.Warning;
    return file.type === 'folder' ? NavItemStatus.Completed : NavItemStatus.NotStart;
  };
</script>

<div class="file-browser">
  <Navigator 
    items={files}
    activeItem={selectedFile}
    highlights={recentFiles}
    itemClickHandler={handleFileClick}
    retrieveStatus={getFileStatus}
    style="font-family: monospace; background: #f5f5f5;"
  />
</div>
```

## 最佳实践

1. **清晰的项目文本**：为导航项目使用描述性、简洁的文本
2. **一致的状态逻辑**：确保状态确定是可预测的
3. **适当的高亮**：谨慎使用高亮来标识重要项目
4. **无障碍访问**：确保状态指示器有足够的颜色对比度
5. **点击处理**：为用户交互提供有意义的反馈
6. **状态管理**：保持激活项目与应用程序状态同步
7. **性能优化**：对于非常大的项目列表考虑虚拟化

## 样式说明

- 状态类（`nav-completed`、`nav-warning`、`nav-not-start`）提供视觉区分
- 激活项目接收特殊样式以显示选择
- 高亮项目有额外的视觉强调
- 自定义CSS可以通过`style`属性应用

## 集成提示

- 与路由库结合用于单页应用导航
- 与状态管理结合处理复杂应用流程
- 考虑键盘导航支持以提高无障碍访问性
- 使用各种项目数据结构进行测试以确保灵活性