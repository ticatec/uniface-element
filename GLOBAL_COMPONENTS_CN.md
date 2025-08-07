# 全局组件

全局组件直接挂载到 document.body 上，可以通过全局方法访问，无需在每个组件中单独导入。这些组件为整个应用程序提供用户反馈和模态交互功能。

## 目录

- [设置](#设置)
- [ToastBoard 消息提示](#toastboard-消息提示)
- [DialogBoard 对话框](#dialogboard-对话框)
- [IndicatorBoard 加载指示器](#indicatorboard-加载指示器)
- [MessageBoxBoard 消息框](#messageboxboard-消息框)
- [TypeScript 类型声明](#typescript-类型声明)

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

### 使用方法

```typescript
// 基本用法 - 显示错误消息 3 秒（默认）
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
  - `"error"` (默认): 错误消息的红色样式
  - `"info"`: 信息消息的蓝色样式
  - `"success"`: 成功消息的绿色样式
- **duration** (`number`, 可选): 显示持续时间，单位为秒（默认：3）

### 属性

```svelte
<ToastBoard fromBottom={false} />
```

- **fromBottom** (`boolean`, 可选): 提示是否从底部滑入（默认：`false` - 从顶部滑入）

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

// 快速通知
window.Toast.show("设置已保存", "success", 1);
```

## DialogBoard 对话框

`DialogBoard` 组件管理模态对话框，为显示自定义对话框组件提供集中式系统。

> 📖 **对话框系统的完整文档，请查看 [DIALOG_SYSTEM_CN.md](./DIALOG_SYSTEM_CN.md)**

### 快速开始

```svelte
<!-- 在根布局中包含 -->
<DialogBoard />
```

```typescript
// 将任何 Svelte 组件作为模态对话框打开
window.Dialog.showModal(MyComponent, {
  title: "编辑用户",
  user: userData,
  onSave: (user) => {
    console.log("用户已保存：", user);
  }
});
```

### 基础对话框组件

```svelte
<script lang="ts">
  import { getContext } from 'svelte';
  
  export let title: string;
  export let user: any;
  export let onSave: (user: any) => void;
  
  const closeDialog = getContext('closeDialog');
  
  const handleSave = () => {
    onSave(user);
    closeDialog();
  };
</script>

<div class="dialog-content">
  <h2>{title}</h2>
  <input bind:value={user.name} />
  <button on:click={handleSave}>保存</button>
  <button on:click={closeDialog}>取消</button>
</div>
```

### 主要特性

- **动态组件**：将任何 Svelte 组件加载为模态对话框
- **基于上下文的关闭**：使用 `getContext('closeDialog')` 进行适当的生命周期管理
- **内置组件**：`Dialog` 和 `CommonDialog` 用于标准用例
- **多个对话框**：支持堆叠的模态对话框
- **TypeScript 支持**：包含完整的类型定义

## IndicatorBoard 加载指示器

`IndicatorBoard` 组件显示带有加载动画和消息的全屏加载覆盖层，在异步操作期间阻止用户交互。

### 特性

- **全屏覆盖**：在加载时阻止用户交互
- **加载动画**：内置加载动画效果
- **自定义消息**：显示上下文相关的加载消息
- **简单控制**：简单的显示/隐藏 API

### 使用方法

```typescript
// 显示加载指示器
window.Indicator.show("正在加载用户数据...");

// 隐藏加载指示器
window.Indicator.hide();

// 典型的异步操作模式
try {
  window.Indicator.show("正在保存更改...");
  await api.saveData(formData);
  window.Toast.show("数据保存成功", "success");
} catch (error) {
  window.Toast.show("保存数据失败", "error");
} finally {
  window.Indicator.hide();
}
```

### API 参考

```typescript
interface Indicator {
  show: (message: string) => void;
  hide: () => void;
}
```

#### 方法

- **show(message)**：使用指定消息显示加载指示器
- **hide()**：隐藏加载指示器

### 示例

```typescript
// 数据获取
const loadUserData = async () => {
  try {
    window.Indicator.show("正在加载用户资料...");
    const user = await api.getUser(userId);
    // 使用用户数据更新UI
  } finally {
    window.Indicator.hide();
  }
};

// 文件上传
const uploadFile = async (file) => {
  try {
    window.Indicator.show("正在上传文件... 请稍候");
    await api.uploadFile(file);
    window.Toast.show("文件上传成功", "success");
  } catch (error) {
    window.Toast.show("上传失败：" + error.message, "error");
  } finally {
    window.Indicator.hide();
  }
};

// 批量操作
const processBulkData = async (items) => {
  try {
    window.Indicator.show(`正在处理 ${items.length} 个项目...`);
    await api.processBulkData(items);
    window.Toast.show("批量处理完成", "success");
  } finally {
    window.Indicator.hide();
  }
};
```

## MessageBoxBoard 消息框

`MessageBoxBoard` 组件提供系统级模态对话框用于确认和重要消息，类似于原生浏览器警告框，但具有自定义样式和更好的用户体验。

### 特性

- **两种对话框类型**：信息对话框和确认对话框
- **可拖拽**：对话框可以在屏幕上移动
- **基于 Promise**：支持 async/await 获取用户响应
- **国际化**：按钮的内置国际化支持
- **HTML 支持**：选择性渲染 HTML 内容
- **自定义图标**：不同消息类型的不同图标

### 使用方法

```typescript
// 简单信息消息
await window.MessageBox.showInfo("操作完成成功");

// 确认对话框
const result = await window.MessageBox.showConfirm(
  "您确定要删除此用户吗？",
  "确认删除"
);

if (result === ModalResult.MR_OK) {
  // 用户点击了确定/确认
  await deleteUser();
  window.Toast.show("用户删除成功", "success");
}
```

### API 参考

```typescript
interface IMessageBox {
  showInfo: (message: string, title?: string, escapeHTML?: boolean) => Promise<void>;
  showConfirm: (
    message: string, 
    title?: string | null, 
    escapeHTML?: boolean, 
    type?: 'info' | 'warning'
  ) => Promise<ModalResult>;
}

enum ModalResult {
  MR_OK = 1,
  MR_CANCEL = 2,
  MR_CLOSE = 3
}
```

#### 方法

**showInfo(message, title?, escapeHTML?)**
- **message** (`string`): 要显示的消息
- **title** (`string`, 可选): 对话框标题
- **escapeHTML** (`boolean`, 可选): 是否转义消息中的 HTML（默认：`true`）
- **返回值**: `Promise<void>`

**showConfirm(message, title?, escapeHTML?, type?)**
- **message** (`string`): 确认消息
- **title** (`string`, 可选): 对话框标题
- **escapeHTML** (`boolean`, 可选): 是否转义消息中的 HTML（默认：`true`）
- **type** (`'info' | 'warning'`, 可选): 对话框类型，影响图标和样式（默认：`'info'`）
- **返回值**: `Promise<ModalResult>`

### 属性

```svelte
<MessageBoxBoard appTitle="我的应用程序" />
```

- **appTitle** (`string`, 可选): 未提供标题时的默认标题

### 示例

```typescript
import { ModalResult } from '@ticatec/uniface-element';

// 信息对话框
await window.MessageBox.showInfo("设置已成功保存");
await window.MessageBox.showInfo(
  "<strong>警告：</strong>此操作无法撤销", 
  "重要通知", 
  false // 不转义 HTML
);

// 确认对话框
const deleteUser = async (user) => {
  const result = await window.MessageBox.showConfirm(
    `您确定要删除用户"${user.name}"吗？此操作无法撤销。`,
    "确认删除",
    true, // 转义 HTML
    "warning" // 警告样式
  );
  
  if (result === ModalResult.MR_OK) {
    try {
      window.Indicator.show("正在删除用户...");
      await api.deleteUser(user.id);
      window.Toast.show("用户删除成功", "success");
    } catch (error) {
      window.Toast.show("删除用户失败", "error");
    } finally {
      window.Indicator.hide();
    }
  }
};

// 数据丢失确认
const handleUnsavedChanges = async () => {
  const result = await window.MessageBox.showConfirm(
    "您有未保存的更改。确定要离开此页面吗？",
    "未保存的更改",
    true,
    "warning"
  );
  
  return result === ModalResult.MR_OK;
};

// 带 HTML 的复杂确认
const confirmBulkAction = async (count) => {
  const result = await window.MessageBox.showConfirm(
    `<p>您即将处理 <strong>${count}</strong> 个项目。</p>
     <p>此操作可能需要几分钟。是否继续？</p>`,
    "批量处理",
    false // 允许 HTML
  );
  
  return result === ModalResult.MR_OK;
};
```

## TypeScript 类型声明

将这些声明添加到您的 `app.d.ts` 或全局类型文件中以获得适当的 TypeScript 支持：

```typescript
// src/app.d.ts
import type { Toast } from '@ticatec/uniface-element';
import type { IDialog } from '@ticatec/uniface-element';
import type { Indicator } from '@ticatec/uniface-element';
import type { IMessageBox } from '@ticatec/uniface-element';

declare global {
  interface Window {
    Toast: Toast;
    Dialog: IDialog;
    Indicator: Indicator;
    MessageBox: IMessageBox;
  }
}
```

## 最佳实践

### 1. 使用全局组件处理错误

```typescript
const handleApiCall = async (apiFunction, successMessage) => {
  try {
    window.Indicator.show("正在处理...");
    const result = await apiFunction();
    window.Toast.show(successMessage, "success");
    return result;
  } catch (error) {
    window.Toast.show(`错误：${error.message}`, "error");
    throw error;
  } finally {
    window.Indicator.hide();
  }
};
```

### 2. 确认模式

```typescript
const safeDelete = async (item, deleteFunction) => {
  const confirmed = await window.MessageBox.showConfirm(
    `您确定要删除"${item.name}"吗？`,
    "确认删除",
    true,
    "warning"
  );
  
  if (confirmed === ModalResult.MR_OK) {
    await handleApiCall(
      () => deleteFunction(item.id),
      "项目删除成功"
    );
  }
};
```

### 3. 加载状态

```typescript
// 快速操作
const quickSave = async (data) => {
  window.Indicator.show("正在保存...");
  try {
    await api.save(data);
    window.Toast.show("已保存", "success", 1);
  } finally {
    window.Indicator.hide();
  }
};

// 带进度的长时间操作
const longOperation = async (data) => {
  window.Indicator.show("正在处理... 这可能需要几分钟");
  try {
    await api.longProcess(data);
    window.Toast.show("处理成功完成", "success", 3);
  } finally {
    window.Indicator.hide();
  }
};
```

## 样式定制

所有全局组件都使用 Uniface 主题系统。您可以通过覆盖 CSS 变量来自定义它们的外观：

```css
:root {
  /* Toast 样式 */
  --uniface-toast-success-bg: #d4edda;
  --uniface-toast-error-bg: #f8d7da;
  --uniface-toast-info-bg: #d1ecf1;
  
  /* 消息框样式 */
  --uniface-message-box-bg: #ffffff;
  --uniface-message-box-border: #dee2e6;
  
  /* 指示器样式 */  
  --uniface-indicator-bg: rgba(0, 0, 0, 0.5);
  --uniface-indicator-text-color: #ffffff;
}
```

## 完整使用示例

以下是一个完整的应用场景示例，展示了如何协同使用多个全局组件：

```typescript
// 用户管理功能
const UserManager = {
  // 创建用户
  async createUser(userData) {
    try {
      window.Indicator.show("正在创建用户...");
      const newUser = await api.createUser(userData);
      window.Toast.show("用户创建成功", "success");
      return newUser;
    } catch (error) {
      window.Toast.show("创建用户失败：" + error.message, "error");
      throw error;
    } finally {
      window.Indicator.hide();
    }
  },

  // 删除用户（带确认）
  async deleteUser(user) {
    const result = await window.MessageBox.showConfirm(
      `您确定要删除用户"${user.name}"吗？\n此操作无法撤销。`,
      "确认删除",
      true,
      "warning"
    );

    if (result === ModalResult.MR_OK) {
      try {
        window.Indicator.show("正在删除用户...");
        await api.deleteUser(user.id);
        window.Toast.show("用户删除成功", "success");
        return true;
      } catch (error) {
        window.Toast.show("删除用户失败：" + error.message, "error");
        return false;
      } finally {
        window.Indicator.hide();
      }
    }
    return false;
  },

  // 编辑用户（使用自定义对话框）
  async editUser(user) {
    return new Promise((resolve) => {
      window.Dialog.showModal(UserEditDialog, {
        user: { ...user },
        onSave: async (updatedUser) => {
          try {
            window.Indicator.show("正在保存用户信息...");
            const result = await api.updateUser(updatedUser);
            window.Toast.show("用户信息更新成功", "success");
            resolve(result);
          } catch (error) {
            window.Toast.show("更新用户信息失败：" + error.message, "error");
            resolve(null);
          } finally {
            window.Indicator.hide();
          }
        },
        onCancel: () => resolve(null)
      });
    });
  }
};
```