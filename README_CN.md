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
  import Button from '@ticatec/uniface-element/Button';
  import DataTable, Dialog from '@ticatec/uniface-element/DataTable';
  import Dialog from '@ticatec/uniface-element/Dialog';
  import type { DataColumn } from '@ticatec/uniface-element/DataTable';
  
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
  import ToastBoard from "@ticatec/uniface-element/ToastBoard";
  import { DialogBoard } from "@ticatec/uniface-element/DialogBoard";
  import IndicatorBoard from "@ticatec/uniface-element/IndicatorBoard";
  import MessageBoxBoard from "@ticatec/uniface-element/MessageBoxBoard";
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
import ModalResult from '@ticatec/uniface-element/ModalResult';

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

### 带行选择的数据表格

```svelte
<script lang="ts">
  import DataTable from '@ticatec/uniface-element/DataTable';
  import type { DataColumn } from '@ticatec/uniface-element';
  
  let columns: DataColumn[] = [
    {
      field: 'name',
      title: '姓名',
      width: 200
    },
    {
      field: 'email',
      title: '邮箱',
      width: 250
    },
    {
      field: 'status',
      title: '状态',
      width: 120
    }
  ];
  
  let data = [
    { id: 1, name: '张三', email: 'zhangsan@example.com', status: '活跃' },
    { id: 2, name: '李四', email: 'lisi@example.com', status: '非活跃' },
    { id: 3, name: '王五', email: 'wangwu@example.com', status: '活跃' }
  ];
  
  let selectedRows = [];
</script>

<DataTable {columns} list={data} bind:selectedRows />
```

### 表单对话框

```svelte
<script lang="ts">
  import Dialog, Button, TextEditor, FormField from '@ticatec/uniface-element/Dialog, Button, TextEditor, FormField';
  
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

## 文档

`/docs` 目录中提供了全面的组件文档：

### 布局组件
- [SidebarLayout](./docs/layout/cn/sidebarlayout.md) | [English](./docs/layout/en/sidebarlayout.md) - 左侧边栏与可调整大小的主内容区域
- [HeaderLayout](./docs/layout/cn/headerlayout.md) | [English](./docs/layout/en/headerlayout.md) - 顶部头部与内容区域及可选侧边栏
- [ClassicLayout](./docs/layout/cn/classiclayout.md) | [English](./docs/layout/en/classiclayout.md) - 全屏布局，包含头部、底部、侧边栏和内容区域

### 按钮组件
- [按钮系统](./docs/buttons/cn/README.md) | [English](./docs/buttons/en/README.md) - 完整的按钮组件，包括 Button、TextButton、IconButton 和 ActionBar

### 对话框组件
- [对话框系统](./docs/dialog/cn/README.md) | [English](./docs/dialog/en/README.md) - 模态对话框系统，包含 DialogBoard、Dialog 和 CommonDialog 组件

### 表单组件
- [表单控件](./docs/form/cn/README.md) | [English](./docs/form/en/README.md) - 全面的表单输入组件，包括 TextEditor、NumberEditor、CheckBox、OptionsSelect 等

### 全局组件
- [全局组件](./docs/global/cn/README.md) | [English](./docs/global/en/README.md) - 应用程序级组件，包括 ToastBoard、DialogBoard、IndicatorBoard 和 MessageBoxBoard

### 杂项组件
- [实用组件](./docs/misc/cn/README.md) | [English](./docs/misc/en/README.md) - 其他组件，包括 Split、Drawer、Tag 和 Card

每个组件文档都包括：
- 包含所有属性和方法的 API 参考
- 高级用法示例和模式
- 最佳实践和样式指南
- 无障碍访问注意事项
- 集成提示

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

中文资源文件：  
可以将文件放置在静态网站的目录下，比如`/assets/uniface_zh-CN.json`
```json
{
  "uniface": {
    "common": {
      "btnClose": "关闭",
      "btnCancel": "取消",
      "btnConfirm": "确定",
      "textMore": "加载更多"
    },
    "colorPicker": "选择颜色",
    "calendar": {
      "months": [
        "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"
      ],
      "monthsAbbr": [
        "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"
      ],
      "weekTitle": [
        "周日", "周一", "周二", "周三", "周四", "周五", "周六"
      ],
      "weekTitleAbbr": [
        "日", "一", "二", "三", "四", "五", "六"
      ],
      "confirmText": "确定"
    },
    "upload": {
      "btnRetry": "重试",
      "btnRemove": "删除",
      "btnPickup": "选择文件"
    },
    "propertyEditor": {
      "colName": "属性",
      "colValue": "值"
    },
    "dataTable": {
      "rowNo": "#",
      "actions": "操作",
      "emptyDataSet": "暂无数据"
    },
    "transfer": {
      "selectIndicator": "已选择: {{selected}}/{{total}}"
    }
  }
}
```

```typescript
import i18n, {i18nUtils} from "@ticatec/i18n";

// 设置语言
i18n.setLanguage('zh-CN'); // 或 'en'
i18nUtils.loadResources('/assets/uniface.json');
```



## 可用导入

### 模块化导入
```typescript
// 单个组件导入
import Button from '@ticatec/uniface-element/Button';
import DataTable from '@ticatec/uniface-element/DataTable';
import SidebarLayout from '@ticatec/uniface-element/app-layout/SidebarLayout';
import AttachmentFilesField from '@ticatec/uniface-element/AttachmentFiles';
import ImageFilesField from '@ticatec/uniface-element/ImageFiles';
import MemoEditor from '@ticatec/uniface-element/MemoEditor';

// 工具导入
import { utils } from '@ticatec/uniface-element/utils';
import type { DataColumn } from '@ticatec/uniface-element/types';
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