# 全局组件

全局组件直接挂载到 document.body 上，可以通过全局方法访问，无需在每个组件中单独导入。这些组件为整个应用程序提供用户反馈和模态交互功能。

## 目录

- [设置](#设置)
- [ToastBoard 消息提示](#toastboard-消息提示)
- [DialogBoard 对话框](#dialogboard-对话框)
- [IndicatorBoard 加载指示器](#indicatorboard-加载指示器)
- [MessageBoxBoard 消息框](#messageboxboard-消息框)
- [TypeScript 类型声明](#typescript-类型声明)
- [最佳实践](#最佳实践)

## 设置

要使用全局组件，需要在主应用程序布局中包含它们，通常在根 `+layout.svelte` 或 `app.html` 中：

```svelte
<script lang="ts">
  import { ToastBoard } from "@ticatec/uniface-element/ToastBoard";
  import { DialogBoard } from "@ticatec/uniface-element/DialogBoard";
  import { IndicatorBoard } from "@ticatec/uniface-element/IndicatorBoard";
  import { MessageBoxBoard } from "@ticatec/uniface-element/MessageBoxBoard";
</script>

<!-- 主应用程序内容 -->
<main>
  <slot />
</main>

<!-- 全局组件 - 这些将被挂载到 document.body -->
<ToastBoard />
<DialogBoard />
<IndicatorBoard />
<MessageBoxBoard />
```

一旦挂载，这些组件会将自己注册到全局 `window` 对象，可以在应用程序的任何地方访问。

## ToastBoard 消息提示

`ToastBoard` 组件提供非阻塞的用户反馈通知，如成功消息、错误或信息提示。

### 特性

- **多种类型**：支持 `error`、`info` 和 `success` 消息类型
- **自动消失**：可配置的持续时间和自动消失
- **流畅动画**：滑入/滑出过渡效果，可自定义方向
- **队列管理**：优雅地处理多个消息提示

### 用法

```typescript
// 基础用法 - 显示错误消息 3 秒（默认）
window.Toast.show("操作失败");

// 指定消息类型和持续时间
window.Toast.show("用户创建成功", "success", 2);
window.Toast.show("正在处理您的请求...", "info", 5);
window.Toast.show("输入数据无效", "error", 4);
```

### API 参考

```typescript
interface Toast {
  show: (message: string, type?: "error" | "info" | "success", duration?: number) => void;
}
```

#### 参数

- **message** (`string`): 在提示中显示的文本
- **type** (`"error" | "info" | "success"`, 可选): 提示的视觉样式
  - `"error"` (默认): 红色样式，用于错误消息
  - `"info"`: 蓝色样式，用于信息消息
  - `"success"`: 绿色样式，用于成功消息
- **duration** (`number`, 可选): 显示持续时间，单位秒（默认: 3）

### 属性

```svelte
<ToastBoard fromBottom={false} />
```

- **fromBottom** (`boolean`, 可选): 提示是否从底部滑入（默认: `false` - 从顶部滑入）

### 示例

```typescript
// 常见用例
try {
  await api.createUser(userData);
  window.Toast.show("用户创建成功！", "success");
} catch (error) {
  window.Toast.show("创建用户失败：" + error.message, "error");
}

// 长时间运行的操作
window.Toast.show("正在上传文件... 请稍候", "info", 10);

// 表单验证反馈
if (!email.includes('@')) {
  window.Toast.show("请输入有效的邮箱地址", "error");
}

// 成功确认
window.Toast.show("设置保存成功", "success", 2);
```

## DialogBoard 对话框

`DialogBoard` 组件全局管理模态对话框，允许您从应用程序的任何地方将任何 Svelte 组件作为模态对话框打开。

### 特性

- **通用模态系统**：将任何 Svelte 组件作为模态打开
- **全局访问**：通过 `window.Dialog` API 可用
- **属性传递**：向模态组件传递属性
- **上下文集成**：通过上下文提供关闭函数

### 用法

```typescript
// 将组件作为模态打开
window.Dialog.showModal(MyDialogComponent, {
  title: "编辑用户",
  user: userData,
  onSave: (result) => {
    console.log("用户已保存:", result);
  }
});
```

### API 参考

```typescript
interface IDialog {
  showModal<T>(component: any, props?: T): void;
}
```

### 示例

```typescript
// 打开用户编辑对话框
window.Dialog.showModal(UserEditDialog, {
  user: selectedUser,
  onSave: async (updatedUser) => {
    await updateUser(updatedUser);
    window.Toast.show("用户更新成功", "success");
  }
});

// 打开确认对话框
window.Dialog.showModal(ConfirmDialog, {
  title: "删除项目",
  message: "您确定要删除此项目吗？",
  onConfirm: () => {
    deleteItem(itemId);
  }
});

// 打开复杂表单对话框
window.Dialog.showModal(ProductFormDialog, {
  product: product,
  categories: availableCategories,
  onSubmit: async (productData) => {
    try {
      await saveProduct(productData);
      window.Toast.show("产品保存成功！", "success");
    } catch (error) {
      window.Toast.show("保存失败：" + error.message, "error");
    }
  }
});
```

## IndicatorBoard 加载指示器

`IndicatorBoard` 组件提供全屏加载覆盖层，在异步操作期间阻止用户交互。

### 特性

- **全屏覆盖**：阻止整个应用程序界面
- **自定义消息**：向用户显示操作状态
- **自动管理**：基于异步操作生命周期显示/隐藏
- **防止用户操作**：确保操作期间的数据完整性

### 用法

```typescript
// 基础加载指示器
try {
  window.Indicator.show("正在加载数据...");
  const data = await api.fetchData();
  // 处理数据
} finally {
  window.Indicator.hide();
}

// 多个操作带状态更新
window.Indicator.show("初始化中...");
await initializeApp();

window.Indicator.show("正在加载用户数据...");
await loadUserData();

window.Indicator.show("设置工作区...");
await setupWorkspace();

window.Indicator.hide();
```

### API 参考

```typescript
interface Indicator {
  show: (message: string) => void;
  hide: () => void;
}
```

### 示例

```typescript
// 文件上传带进度指示
const uploadFile = async (file) => {
  try {
    window.Indicator.show("正在上传文件...");
    const result = await api.uploadFile(file);
    window.Toast.show("文件上传成功", "success");
    return result;
  } catch (error) {
    window.Toast.show("上传失败：" + error.message, "error");
    throw error;
  } finally {
    window.Indicator.hide();
  }
};

// 数据处理工作流
const processData = async (data) => {
  try {
    window.Indicator.show("验证数据中...");
    await validateData(data);
    
    window.Indicator.show("处理记录中...");
    const processed = await processRecords(data);
    
    window.Indicator.show("保存结果中...");
    await saveResults(processed);
    
    window.Toast.show("数据处理成功", "success");
  } catch (error) {
    window.Toast.show("处理失败：" + error.message, "error");
  } finally {
    window.Indicator.hide();
  }
};

// 带自动清理的异步操作
const performAction = async () => {
  const cleanup = () => window.Indicator.hide();
  
  try {
    window.Indicator.show("执行操作中...");
    await someAsyncOperation();
    
    // 确保即使操作抛出异常也隐藏指示器
    cleanup();
    
    window.Toast.show("操作完成", "success");
  } catch (error) {
    cleanup();
    window.Toast.show("操作失败", "error");
    throw error;
  }
};
```

## MessageBoxBoard 消息框

`MessageBoxBoard` 组件提供模态确认对话框和消息框，用于需要明确确认的用户交互。

### 特性

- **确认对话框**：是/否、确定/取消交互
- **信息消息**：显示重要信息
- **基于 Promise**：支持异步/等待的对话框结果
- **模态结果类型**：标准对话框结果枚举

### 用法

```typescript
// 确认对话框
const result = await window.MessageBox.showConfirm("删除此项目？");
if (result === ModalResult.MR_OK) {
  deleteItem();
}

// 信息消息
await window.MessageBox.showInfo("操作成功完成", "成功");
```

### API 参考

```typescript
interface MessageBox {
  showConfirm: (message: string, title?: string) => Promise<ModalResult>;
  showInfo: (message: string, title?: string) => Promise<ModalResult>;
}

enum ModalResult {
  MR_OK = 1,
  MR_CANCEL = 2
}
```

### 示例

```typescript
// 删除确认
const confirmDelete = async (itemName) => {
  const result = await window.MessageBox.showConfirm(
    `您确定要删除"${itemName}"吗？此操作无法撤销。`,
    "确认删除"
  );
  
  if (result === ModalResult.MR_OK) {
    try {
      await deleteItem(itemName);
      window.Toast.show("项目删除成功", "success");
    } catch (error) {
      window.Toast.show("删除项目失败", "error");
    }
  }
};

// 保存更改确认
const handlePageLeave = async () => {
  if (hasUnsavedChanges) {
    const result = await window.MessageBox.showConfirm(
      "您有未保存的更改。确定要离开吗？",
      "未保存的更改"
    );
    
    return result === ModalResult.MR_OK;
  }
  
  return true;
};

// 信息显示
const showWelcomeMessage = async () => {
  await window.MessageBox.showInfo(
    "欢迎使用应用程序！请花点时间查看入门指南。",
    "欢迎"
  );
};

// 错误处理带确认
const handleCriticalError = async (error) => {
  const result = await window.MessageBox.showConfirm(
    `发生严重错误：${error.message}\n\n您要重新加载应用程序吗？`,
    "严重错误"
  );
  
  if (result === ModalResult.MR_OK) {
    window.location.reload();
  }
};

// 批量操作确认
const processBatchOperation = async (items) => {
  const result = await window.MessageBox.showConfirm(
    `这将处理 ${items.length} 个项目，可能需要几分钟时间。继续吗？`,
    "批量处理"
  );
  
  if (result === ModalResult.MR_OK) {
    try {
      window.Indicator.show("处理项目中...");
      await processBatch(items);
      window.Toast.show(`成功处理 ${items.length} 个项目`, "success");
    } catch (error) {
      window.Toast.show("批量处理失败", "error");
    } finally {
      window.Indicator.hide();
    }
  }
};
```

## TypeScript 类型声明

将这些类型声明添加到您的 `src/app.d.ts` 或全局类型定义文件中：

```typescript
import type { 
  IDialog, 
  Toast, 
  Indicator, 
  MessageBox, 
  ModalResult 
} from '@ticatec/uniface-element';

declare global {
  interface Window {
    Dialog: IDialog;
    Toast: Toast;
    Indicator: Indicator;
    MessageBox: MessageBox;
  }
}

// 为方便使用而重新导出
export { ModalResult };
```

## 最佳实践

### 1. 适当的错误处理

```typescript
// 总是在 Indicator 中使用 try-finally
const performOperation = async () => {
  try {
    window.Indicator.show("处理中...");
    await operation();
    window.Toast.show("操作完成", "success");
  } catch (error) {
    window.Toast.show("操作失败", "error");
    throw error;
  } finally {
    window.Indicator.hide(); // 即使出错也要隐藏
  }
};
```

### 2. 用户友好的消息

```typescript
// 提供清晰、可操作的消息
window.Toast.show("用户创建成功", "success");
window.Toast.show("请填写所有必填字段", "error");
window.Toast.show("正在保存更改... 请稍候", "info", 5);

// 避免技术术语
// ❌ 错误: "HTTP 404 错误发生"
// ✅ 正确: "找不到请求的项目"
```

### 3. 适当的持续时间

```typescript
// 短消息（1-3 秒）
window.Toast.show("已复制到剪贴板", "success", 2);

// 重要消息（3-5 秒）
window.Toast.show("您的密码已更新", "success", 4);

// 长操作（5+ 秒）
window.Toast.show("大文件上传进行中...", "info", 10);
```

### 4. 确认模式

```typescript
// 关键操作应该始终确认
const deleteUser = async (user) => {
  const result = await window.MessageBox.showConfirm(
    `删除用户"${user.name}"？此操作无法撤销。`
  );
  
  if (result === ModalResult.MR_OK) {
    // 执行删除
  }
};

// 非关键操作可以使用提示反馈
const toggleUserStatus = async (user) => {
  try {
    await updateUserStatus(user.id, !user.active);
    window.Toast.show(
      `用户已${user.active ? '停用' : '启用'}`, 
      "success"
    );
  } catch (error) {
    window.Toast.show("更新用户状态失败", "error");
  }
};
```

### 5. 加载状态管理

```typescript
// 对阻止UI的操作使用 Indicator
const saveDocument = async () => {
  window.Indicator.show("保存文档中...");
  try {
    await api.saveDocument();
    window.Toast.show("文档已保存", "success");
  } finally {
    window.Indicator.hide();
  }
};

// 对后台操作使用 Toast
const autoSave = async () => {
  try {
    await api.autoSaveDocument();
    window.Toast.show("自动保存", "info", 1);
  } catch (error) {
    window.Toast.show("自动保存失败", "error", 2);
  }
};
```

## 无障碍访问注意事项

- 提示消息应该被屏幕阅读器读出
- 模态对话框应该捕获焦点并处理 Escape 键
- 为所有消息类型提供足够的颜色对比度
- 适当使用语义化 HTML 和 ARIA 标签
- 确保所有交互元素的键盘导航正常工作

## 浏览器支持

- 需要支持 ES2020+ 的现代浏览器
- 布局需要 CSS Grid 和 Flexbox 支持
- 动态挂载需要 DOM 操作 API
- 异步对话框交互需要 Promise 支持