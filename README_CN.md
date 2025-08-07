# Uniface Element

[![npm version](https://badge.fury.io/js/%40ticatec%2Funiface-element.svg)](https://badge.fury.io/js/%40ticatec%2Funiface-element)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

基于 Svelte 5 构建的全面企业级 UI 组件库，专为现代化 Web 应用程序设计。

[English Documentation](./README.md)

## 特性

✨ **企业级组件** - 为商业应用提供完整的组件集合  
🎨 **主题系统** - 基于 CSS 变量的主题化，可自定义设计令牌  
📱 **响应式设计** - 移动优先的响应式组件  
🌍 **国际化支持** - 内置中英文国际化资源  
🎯 **TypeScript 支持** - 完整的 TypeScript 类型定义，提供更好的开发体验  
🔧 **模块化架构** - 支持按需导入，优化打包体积  
⚡ **高性能** - 基于 Svelte 5 构建，性能卓越  

## 安装

```bash
npm install @ticatec/uniface-element
```

## 快速开始

### 1. 导入样式

```typescript
// 导入主样式文件
import '@ticatec/uniface-element/ticatec-uniface-web.css';
```

### 2. 使用组件

```svelte
<script lang="ts">
  import { Button, DataTable, Dialog } from '@ticatec/uniface-element';
  import type { DataColumn } from '@ticatec/uniface-element';
  
  let columns: DataColumn[] = [
    { field: 'name', title: '姓名', width: 150 },
    { field: 'email', title: '邮箱', width: 200 }
  ];
  
  let data = [
    { name: '张三', email: 'zhangsan@example.com' },
    { name: '李四', email: 'lisi@example.com' }
  ];
</script>

<Button type="primary" on:click={() => console.log('点击了!')}>
  点击我
</Button>

<DataTable {columns} list={data} />
```

## 组件分类

### 布局组件
- **应用布局**: `SidebarLayout`、`HeaderLayout`、`ClassicLayout`、`ColumnsLayout`、`RowsLayout`
- **容器组件**: `Box`、`Card`、`Page`、`Accordion`
- **表单布局**: `FlexForm`、`GridForm`、`FormField`
- **工具组件**: `Split`、`Separator`

### 数据展示
- **表格组件**: `DataTable`、`ConciseDataTable`
- **列表组件**: `ListBox`、`TreeView`
- **导航组件**: `Breadcrumbs`、`Tabs`、`NavigatorMenu`
- **指示器**: `ProgressBar`、`ProgressStepBar`、`Tag`

### 表单控件
- **输入组件**: `TextEditor`、`NumberEditor`、`MemoEditor`、`PasswordEditor`
- **选择组件**: `OptionsSelect`、`OptionsMultiSelect`、`CascadeOptionsSelect`
- **日期时间**: `DatePicker`、`DateTimePicker`、`TimeEditor`
- **其他控件**: `CheckBox`、`RadioButton`、`Switch`、`ColorPicker`

### 反馈组件
- **对话框**: `Dialog`、`MessageBox`、`Drawer`
- **消息通知**: `Toast`、`PopupHint`
- **遮罩层**: `FullScreenOverlay`

### 高级组件
- **编辑器**: `InlineCellEditor`、`PropertyEditor`、`PromptsTextEditor`
- **文件上传**: `AttachmentFiles`、`ImageFiles`
- **数据传输**: `Transfer`
- **搜索组件**: `SearchBox`、`CriteriaField`

## 页面全局组件

页面全局组件直接加载在 body 上，使用时不需要单独引入，可通过全局方法直接使用。通常在系统主页面直接加载：

```svelte
<script lang="ts">
  import { ToastBoard } from "@ticatec/uniface-element/ToastBoard";
  import { DialogBoard } from "@ticatec/uniface-element/DialogBoard";
  import { IndicatorBoard } from "@ticatec/uniface-element/IndicatorBoard";
  import { MessageBoxBoard } from "@ticatec/uniface-element/MessageBoxBoard";
</script>

<div>
  <!-- 主页面内容 -->
</div>

<IndicatorBoard/>
<DialogBoard/>
<ToastBoard/>
<MessageBoxBoard/>
```

### 异步操作指示器 `Indicator`

用于异步操作时遮罩页面并显示操作信息，避免用户异常操作：

```typescript
try {
  window.Indicator.show('正在加载数据...');
  // 异步调用 await service.search();
} finally {
  window.Indicator.hide();
}
```

### 弹出消息 `Toast`

用于显示操作结果和提示信息：

```typescript
// 显示错误消息（默认3秒）
window.Toast.show("无法删除活跃用户", "error", 2);

// 显示成功消息
window.Toast.show("操作成功", "success");

// 显示信息提示
window.Toast.show("这是一条信息", "info");
```

### 消息提示框 `MessageBox`

用于确认操作和信息提示：

```typescript
import { ModalResult } from '@ticatec/uniface-element';

const deleteConfirm = async (user: any) => {
  const result = await window.MessageBox.showConfirm(`确定要删除用户[${user.name}]吗？`);
  if (result === ModalResult.MR_OK) {
    // 执行删除操作
  }
}

// 显示信息提示
await window.MessageBox.showInfo("操作完成", "提示");
```

## 使用示例

### 带内联编辑的数据表格

```svelte
<script lang="ts">
  import { DataTable, InlineCellEditor } from '@ticatec/uniface-element';
  import type { DataColumn } from '@ticatec/uniface-element';
  
  let columns: DataColumn[] = [
    {
      field: 'name',
      title: '姓名',
      width: 200,
      editable: true,
      editor: 'text'
    },
    {
      field: 'status',
      title: '状态',
      width: 120,
      editable: true,
      editor: 'select',
      options: [
        { value: 'active', label: '活跃' },
        { value: 'inactive', label: '非活跃' }
      ]
    }
  ];
</script>

<DataTable {columns} {list} bind:selectedRows />
```

### 表单对话框

```svelte
<script lang="ts">
  import { Dialog, Button, TextEditor, FormField } from '@ticatec/uniface-element';
  
  let showDialog = false;
  let formData = { name: '', email: '' };
</script>

<Button on:click={() => showDialog = true}>打开对话框</Button>

<Dialog bind:visible={showDialog} title="编辑用户">
  <FormField label="姓名">
    <TextEditor bind:value={formData.name} />
  </FormField>
  
  <FormField label="邮箱">
    <TextEditor bind:value={formData.email} type="email" />
  </FormField>
  
  <svelte:fragment slot="actions">
    <Button on:click={() => showDialog = false}>取消</Button>
    <Button type="primary" on:click={() => showDialog = false}>保存</Button>
  </svelte:fragment>
</Dialog>
```

## 布局组件详细介绍

### 左右两栏布局 `SidebarLayout`

实现左右两栏布局，通常左边为导航栏，右边为内容区。右边可以实现上下分割，上面为状态栏，下面为内容区。  
具体使用方法参考 [左右两栏布局详细](./doc/SidebarLayout_CN.md)

### T型布局 `HeaderLayout`

实现上下布局，通常顶部为页眉栏，下面为内容区。内容区可以根据需要在左边建立导航栏。  
具体使用方法参考 [T型布局](./doc/HeaderLayout_CN.md)

### 经典布局 `ClassicLayout`

全屏布局，包括顶部页眉栏、底部状态栏和中间内容区。内容区可以包含左边导航栏和右边注解栏。  
具体方法参考 [经典布局](./doc/ClassicLayout_CN.md)

## 主题定制

组件库使用 CSS 自定义属性进行主题化。你可以通过覆盖这些变量来自定义外观：

```css
:root {
  --uniface-primary-color: #0061FF;
  --uniface-secondary-color: #22BDFF;
  --uniface-primary-text-color: #374151;
  --uniface-button-common-bg: #f0f0f0;
  --uniface-hover-item-background: #f7f7f7;
  /* ... 更多变量 */
}
```

## 国际化

组件库内置国际化支持：

```typescript
import { i18n } from '@ticatec/uniface-element/i18n_resources';

// 设置语言
i18n.setLanguage('zh-CN'); // 或 'en'
```

## 可用导入

### 模块化导入
```typescript
// 单个组件导入
import Button from '@ticatec/uniface-element/Button';
import { DataTable } from '@ticatec/uniface-element/DataTable';
import { SidebarLayout } from '@ticatec/uniface-element/app-layout/SidebarLayout';

// 工具导入
import { utils } from '@ticatec/uniface-element/utils';
import type { DataColumn } from '@ticatec/uniface-element/types';
```

### 批量导入
```typescript
// 导入多个组件
import { Button, DataTable, Dialog, Card } from '@ticatec/uniface-element';
```

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建组件库
npm run build

# 运行类型检查
npm run check
```

## 浏览器支持

- Chrome ≥ 88
- Firefox ≥ 85
- Safari ≥ 14
- Edge ≥ 88

## 贡献

欢迎贡献代码！请查看我们的 [贡献指南](./CONTRIBUTING.md) 了解详细信息。

## 许可证

MIT 许可证 - 查看 [LICENSE](./LICENSE) 文件了解详细信息。

## 作者

**Henry Feng** - [Ticatec](https://github.com/ticatec-auckland)

---

更多详细文档和示例，请访问我们的 [文档网站](#) 或查看 `/src/routes/demo` 目录中的示例组件。