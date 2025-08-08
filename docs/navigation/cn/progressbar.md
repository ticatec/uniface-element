# ProgressBar 进度条组件

ProgressBar 组件提供可视化进度指示，支持圆形和线性显示模式，以及各种状态指示。

## 功能特性

- **多种显示类型**：圆形和线性进度条
- **状态指示器**：成功、失败、取消和进行中状态
- **可定制外观**：可配置尺寸、颜色和文本显示
- **视觉反馈**：不同状态的图标和颜色编码
- **CSS 自定义属性**：通过 CSS 变量支持主题

## 导入

```typescript
import { ProgressBar, ProgressStatus } from '@ticatec/uniface-element/ProgressBar';
```

## 基本用法

### 圆形进度条

```svelte
<script>
  import { ProgressBar, ProgressStatus } from '@ticatec/uniface-element/ProgressBar';
  
  let progress = 65;
  let status = ProgressStatus.progressing;
</script>

<ProgressBar 
  {progress} 
  {status}
  type="circular" 
  size={120} 
/>
```

### 线性进度条

```svelte
<script>
  import { ProgressBar, ProgressStatus } from '@ticatec/uniface-element/ProgressBar';
  
  let progress = 45;
</script>

<ProgressBar 
  {progress}
  type="liner" 
  height={8}
  showText={true}
/>
```

## API 参考

### 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `progress` | `number` | `0` | 进度值 (0-100) |
| `size` | `number` | `100` | 圆形进度条的大小 |
| `type` | `'circular' \| 'liner'` | `'circular'` | 进度条类型 |
| `height` | `number` | `5` | 进度条高度/厚度 |
| `showText` | `boolean` | `true` | 是否显示进度文本 |
| `status` | `ProgressStatus` | `ProgressStatus.progressing` | 进度状态 |

### ProgressStatus 枚举

```typescript
enum ProgressStatus {
  progressing = 'progressing',  // 进行中
  successful = 'successful',    // 成功
  failure = 'failure',         // 失败
  canceled = 'canceled'        // 已取消
}
```

## 状态示例

### 成功状态

```svelte
<ProgressBar 
  progress={100} 
  status={ProgressStatus.successful}
  type="circular"
/>
```

### 失败状态

```svelte
<ProgressBar 
  progress={50} 
  status={ProgressStatus.failure}
  type="liner"
/>
```

### 取消状态

```svelte
<ProgressBar 
  progress={30} 
  status={ProgressStatus.canceled}
  type="circular"
/>
```

## 样式定制

组件使用 CSS 自定义属性进行主题配置：

```css
:root {
  --uniface-progress-bar-color: #22BDFF;         /* 默认进度颜色 */
  --uniface-progress-bar-success-color: #2DC071; /* 成功状态颜色 */
  --uniface-progress-bar-failure-color: #FF685B; /* 失败状态颜色 */
  --uniface-progress-bar-canceled-color: #FFC533; /* 取消状态颜色 */
  --uniface-progress-bar-bg: #E2E8F0;            /* 背景颜色 */
}
```

## 高级示例

### 动态进度与状态更新

```svelte
<script>
  import { ProgressBar, ProgressStatus } from '@ticatec/uniface-element/ProgressBar';
  
  let progress = 0;
  let status = ProgressStatus.progressing;
  
  const simulate = () => {
    const timer = setInterval(() => {
      progress += 10;
      if (progress >= 100) {
        clearInterval(timer);
        status = ProgressStatus.successful;
      }
    }, 500);
  };
</script>

<ProgressBar {progress} {status} type="circular" size={100} />
<button on:click={simulate}>开始进度</button>
```

### 文件上传进度指示器

```svelte
<script>
  import { ProgressBar, ProgressStatus } from '@ticatec/uniface-element/ProgressBar';
  
  let uploadProgress = 0;
  let uploadStatus = ProgressStatus.progressing;
  
  const handleUpload = async (file) => {
    uploadStatus = ProgressStatus.progressing;
    
    // 模拟上传进度
    for (let i = 0; i <= 100; i += 10) {
      uploadProgress = i;
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    uploadStatus = ProgressStatus.successful;
  };
</script>

<div class="upload-container">
  <ProgressBar 
    progress={uploadProgress} 
    status={uploadStatus}
    type="liner" 
    height={6}
  />
  <input type="file" on:change={handleUpload} />
</div>
```

## 最佳实践

1. **选择合适的类型**：在紧凑空间使用圆形，在宽布局中使用线性
2. **状态指示**：始终更新状态以反映操作的实际状态
3. **用户反馈**：提供关于正在发生的事情的清晰文本或视觉提示
4. **无障碍访问**：确保足够的颜色对比度并考虑屏幕阅读器
5. **性能优化**：避免过度的进度更新；限制到合理的间隔
6. **错误处理**：使用失败状态并在适当时提供重试机制

## 无障碍访问说明

- 进度条通过视觉指示器传达完成状态
- 状态特定的图标（✔、✗、!）提供额外的上下文
- 颜色编码支持不同的进度状态
- 可以切换文本显示以满足不同的无障碍访问需求