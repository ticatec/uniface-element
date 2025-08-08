# ProgressStepBar 步骤进度条组件

ProgressStepBar 组件提供多步骤流程的可视化展示，显示每个步骤的当前状态和进度。

## 功能特性

- **多步骤可视化**：显示多个顺序步骤的进度
- **状态指示器**：每个步骤的等待、处理中和已完成状态
- **灵活布局**：支持水平和垂直两种方向
- **可定制样式**：可配置背景色和样式
- **步骤信息**：支持标题和可选的备注说明

## 导入

```typescript
import { ProgressStepBar, ProgressStep, ProgressStepStatus } from '@ticatec/uniface-element/ProgressStepBar';
```

## 基本用法

### 水平步骤条

```svelte
<script>
  import { ProgressStepBar, ProgressStepStatus } from '@ticatec/uniface-element/ProgressStepBar';
  
  const steps = [
    {
      topic: "账户设置",
      comment: "创建您的档案",
      status: ProgressStepStatus.Completed
    },
    {
      topic: "身份验证",
      comment: "验证您的邮箱",
      status: ProgressStepStatus.Processing
    },
    {
      topic: "完善资料",
      comment: "添加个人详情",
      status: ProgressStepStatus.Pending
    }
  ];
</script>

<ProgressStepBar 
  {steps} 
  direction="horizontal" 
/>
```

### 垂直步骤条

```svelte
<script>
  import { ProgressStepBar, ProgressStepStatus } from '@ticatec/uniface-element/ProgressStepBar';
  
  const workflowSteps = [
    {
      topic: "审阅文档",
      status: ProgressStepStatus.Completed
    },
    {
      topic: "经理审批",
      status: ProgressStepStatus.Processing
    },
    {
      topic: "最终处理",
      status: ProgressStepStatus.Pending
    }
  ];
</script>

<ProgressStepBar 
  steps={workflowSteps} 
  direction="vertical"
  backgroundColor="#f8f9fa"
/>
```

## API 参考

### 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `steps` | `Array<ProgressStep>` | 必需 | 步骤对象数组 |
| `direction` | `'vertical' \| 'horizontal'` | `'horizontal'` | 布局方向 |
| `backgroundColor` | `string` | `'var(--uniface-progress-step-bar-bg, #ffffff)'` | 背景颜色 |
| `style` | `string` | `''` | 附加CSS样式 |

### ProgressStep 接口

```typescript
interface ProgressStep {
  topic: string;          // 步骤标题
  comment?: string;       // 可选的步骤描述
  status: ProgressStepStatus; // 当前状态
}
```

### ProgressStepStatus 枚举

```typescript
enum ProgressStepStatus {
  Pending = 'pending',       // 未开始
  Processing = 'processing', // 当前活动
  Completed = 'completed'    // 已完成
}
```

## 详细示例

### 电商结账流程

```svelte
<script>
  import { ProgressStepBar, ProgressStepStatus } from '@ticatec/uniface-element/ProgressStepBar';
  
  let checkoutSteps = [
    {
      topic: "购物车",
      comment: "查看您的商品",
      status: ProgressStepStatus.Completed
    },
    {
      topic: "配送信息",
      comment: "输入配送详情",
      status: ProgressStepStatus.Completed
    },
    {
      topic: "支付",
      comment: "选择支付方式",
      status: ProgressStepStatus.Processing
    },
    {
      topic: "确认",
      comment: "审核并完成",
      status: ProgressStepStatus.Pending
    }
  ];
  
  const nextStep = () => {
    const currentIndex = checkoutSteps.findIndex(step => 
      step.status === ProgressStepStatus.Processing
    );
    
    if (currentIndex >= 0 && currentIndex < checkoutSteps.length - 1) {
      checkoutSteps[currentIndex].status = ProgressStepStatus.Completed;
      checkoutSteps[currentIndex + 1].status = ProgressStepStatus.Processing;
      checkoutSteps = [...checkoutSteps]; // 触发响应式更新
    }
  };
</script>

<div class="checkout-container">
  <ProgressStepBar steps={checkoutSteps} />
  <button on:click={nextStep}>下一步</button>
</div>
```

### 表单向导与验证

```svelte
<script>
  import { ProgressStepBar, ProgressStepStatus } from '@ticatec/uniface-element/ProgressStepBar';
  
  let formSteps = [
    {
      topic: "个人信息",
      comment: "姓名、邮箱、电话",
      status: ProgressStepStatus.Processing
    },
    {
      topic: "地址详情",
      comment: "配送和账单地址",
      status: ProgressStepStatus.Pending
    },
    {
      topic: "偏好设置",
      comment: "通信设置",
      status: ProgressStepStatus.Pending
    }
  ];
  
  let currentStepIndex = 0;
  
  const completeCurrentStep = () => {
    if (currentStepIndex < formSteps.length) {
      formSteps[currentStepIndex].status = ProgressStepStatus.Completed;
      
      if (currentStepIndex < formSteps.length - 1) {
        currentStepIndex++;
        formSteps[currentStepIndex].status = ProgressStepStatus.Processing;
      }
      
      formSteps = [...formSteps];
    }
  };
</script>

<div class="form-wizard">
  <ProgressStepBar 
    steps={formSteps} 
    direction="horizontal"
    style="margin-bottom: 20px;"
  />
  
  <div class="step-content">
    <h3>{formSteps[currentStepIndex]?.topic}</h3>
    <p>{formSteps[currentStepIndex]?.comment}</p>
    
    {#if currentStepIndex < formSteps.length}
      <button on:click={completeCurrentStep}>
        完成步骤
      </button>
    {/if}
  </div>
</div>
```

### 文件上传流程

```svelte
<script>
  import { ProgressStepBar, ProgressStepStatus } from '@ticatec/uniface-element/ProgressStepBar';
  
  let uploadSteps = [
    {
      topic: "选择文件",
      status: ProgressStepStatus.Completed
    },
    {
      topic: "上传",
      comment: "传输文件中...",
      status: ProgressStepStatus.Processing
    },
    {
      topic: "处理",
      comment: "分析内容",
      status: ProgressStepStatus.Pending
    },
    {
      topic: "完成",
      comment: "文件就绪",
      status: ProgressStepStatus.Pending
    }
  ];
  
  const simulateUpload = async () => {
    // 模拟上传过程
    await new Promise(resolve => setTimeout(resolve, 2000));
    uploadSteps[1].status = ProgressStepStatus.Completed;
    uploadSteps[2].status = ProgressStepStatus.Processing;
    uploadSteps = [...uploadSteps];
    
    // 模拟处理
    await new Promise(resolve => setTimeout(resolve, 1500));
    uploadSteps[2].status = ProgressStepStatus.Completed;
    uploadSteps[3].status = ProgressStepStatus.Processing;
    uploadSteps = [...uploadSteps];
    
    // 完成
    await new Promise(resolve => setTimeout(resolve, 1000));
    uploadSteps[3].status = ProgressStepStatus.Completed;
    uploadSteps = [...uploadSteps];
  };
</script>

<ProgressStepBar 
  steps={uploadSteps} 
  direction="vertical"
/>
<button on:click={simulateUpload}>开始上传</button>
```

## 最佳实践

1. **清晰的步骤名称**：使用描述性、面向操作的步骤标题
2. **有用的备注**：为每个步骤提供上下文说明
3. **逻辑进展**：确保步骤遵循自然的顺序
4. **状态管理**：保持状态更新与实际进度同步
5. **用户指导**：显示用户在每个步骤中的期望操作
6. **错误处理**：考虑如何处理步骤失败或验证错误
7. **响应式设计**：在不同屏幕尺寸上测试两种方向

## 样式提示

- 在步骤之间使用一致的间距和排版
- 考虑使用自定义CSS变量进行主题集成
- 测试状态指示器的可见性和对比度
- 确保移动界面有足够的触摸目标

## 无障碍访问说明

- 步骤进展提供清晰的视觉反馈
- 状态变化通过样式和定位表示
- 在实现自定义交互时考虑为屏幕阅读器添加ARIA标签
- 确保状态指示器有足够的颜色对比度