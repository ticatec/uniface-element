# Uniface 表单组件文档

这是 Uniface 表单组件的中文文档，涵盖了所有可用的表单输入和选择组件。

## 组件概览

### 基础输入组件
- [TextEditor](text-editor.md) - 文本输入框
- [NumberEditor](number-editor.md) - 数字输入框
- [TimeEditor](time-editor.md) - 时间输入框
- [UnitNumberEditor](unit-number-editor.md) - 带单位的数字输入框
- [PromptsTextEditor](prompts-text-editor.md) - 带提示的文本输入框

### 选择组件
- [CheckBox](checkbox.md) - 复选框
- [RadioButton](radiobutton.md) - 单选按钮
- [GroupCheckBox](group-checkbox.md) - 复选框组
- [GroupRadioBox](group-radiobox.md) - 单选按钮组
- [Switch](switch.md) - 开关
- [OptionsSelect](options-select.md) - 选项选择器
- [OptionsMultiSelect](options-multi-select.md) - 多选选择器
- [InputOptionsSelect](input-options-select.md) - 输入选项选择器
- [LookupEditor](lookup-editor.md) - 查找编辑器
- [CascadeOptionsSelect](cascade-options-select.md) - 级联选择器

### 日期时间组件
- [DatePicker](date-picker.md) - 日期选择器
- [DateTimePicker](datetime-picker.md) - 日期时间选择器

## 架构概述

### 核心包装组件
所有表单组件都基于两个核心包装组件：
- **CommonEditor** - 为输入类组件提供统一样式和行为
- **CommonPicker** - 为选择类组件提供下拉面板功能

### 显示模式
所有组件都支持 `DisplayMode` 枚举：
```typescript
enum DisplayMode {
  Edit = 0,    // 编辑模式（默认）
  View = 1,    // 查看模式
  Display = 2  // 显示模式
}
```

### 通用属性
大部分组件共享以下属性：
- `variant: '' | 'plain' | 'outlined' | 'filled'` - 外观变体
- `disabled: boolean` - 是否禁用
- `readonly: boolean` - 是否只读
- `compact: boolean` - 是否紧凑模式
- `style: string` - 自定义 CSS 样式
- `displayMode: DisplayMode` - 显示模式

## 样式和主题

### CSS 自定义属性

所有组件都支持通过 CSS 自定义属性进行主题定制：

```css
:root {
  /* 颜色 */
  --uniface-primary-color: #007bff;
  --uniface-secondary-color: #6c757d;
  --uniface-success-color: #28a745;
  --uniface-danger-color: #dc3545;
  --uniface-warning-color: #ffc107;
  --uniface-info-color: #17a2b8;
  --uniface-light-color: #f8f9fa;
  --uniface-dark-color: #343a40;
  
  /* 边框 */
  --uniface-border-color: #dee2e6;
  --uniface-border-radius: 4px;
  --uniface-border-width: 1px;
  
  /* 间距 */
  --uniface-padding-sm: 4px 8px;
  --uniface-padding-md: 8px 12px;
  --uniface-padding-lg: 12px 16px;
  
  /* 字体 */
  --uniface-font-size-sm: 12px;
  --uniface-font-size-md: 14px;
  --uniface-font-size-lg: 16px;
  
  /* 阴影 */
  --uniface-box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  --uniface-box-shadow-hover: 0 4px 8px rgba(0,0,0,0.15);
}
```

### 变体样式

#### Plain 变体
```css
.uniface-editor.plain {
  border: none;
  background: transparent;
}
```

#### Outlined 变体
```css
.uniface-editor.outlined {
  border: 1px solid var(--uniface-border-color);
  background: white;
}
```

#### Filled 变体
```css
.uniface-editor.filled {
  border: none;
  background: var(--uniface-light-color);
}
```

### 紧凑模式
```css
.uniface-editor.compact {
  padding: var(--uniface-padding-sm);
  font-size: var(--uniface-font-size-sm);
}
```

## 图标使用

所有组件都使用 `@ticatec/uniface-google-material-icons` 图标库，这是对 Google Material Icons 的封装。

### 常用图标

| 图标类 | 描述 | 使用场景 |
|--------|------|----------|
| `icon_google_add` | 添加 | 添加按钮、新建操作 |
| `icon_google_edit` | 编辑 | 编辑按钮、修改操作 |
| `icon_google_delete` | 删除 | 删除按钮、移除操作 |
| `icon_google_search` | 搜索 | 搜索框、查找功能 |
| `icon_google_clear` | 清除 | 清空输入、重置操作 |
| `icon_google_arrow_drop_down` | 下拉箭头 | 下拉选择组件 |
| `icon_google_arrow_drop_up` | 上拉箭头 | 收起下拉面板 |
| `icon_google_check` | 勾选 | 复选框、确认操作 |
| `icon_google_close` | 关闭 | 关闭按钮、取消操作 |
| `icon_google_calendar_today` | 日历 | 日期选择器 |
| `icon_google_access_time` | 时间 | 时间选择器 |
| `icon_google_keyboard_arrow_down` | 键盘下箭头 | 级联选择组件 |
| `icon_google_keyboard_control` | 控制键 | 查找编辑器 |

### 图标使用示例

```svelte
<!-- 在HTML中直接使用 -->
<i class="icon_google_search"></i>

<!-- 在组件属性中使用 -->
<Button icon="icon_google_add" label="添加用户" />

<!-- 在CSS中使用 -->
<style>
  .custom-icon::before {
    content: '';
    @extend .icon_google_settings;
  }
</style>
```

## 国际化支持

### 使用 @ticatec/i18n

```svelte
<script lang="ts">
  import i18n from '@ticatec/i18n';
  
  // 获取本地化文本
  const getText = (key: string, defaultText: string): string => {
    return i18n.getText(key, defaultText);
  };
</script>

<TextEditor 
  placeholder={getText('uniface.editor.placeholder', '请输入内容')}
/>

<Button 
  label={getText('uniface.button.save', '保存')}
/>
```

### 常用国际化键值

| 键值 | 中文 | 英文 |
|------|------|------|
| `uniface.button.save` | 保存 | Save |
| `uniface.button.cancel` | 取消 | Cancel |
| `uniface.button.delete` | 删除 | Delete |
| `uniface.button.edit` | 编辑 | Edit |
| `uniface.loadMore` | 加载更多 | Load more |
| `uniface.noData` | 暂无数据 | No data |
| `uniface.loading` | 加载中... | Loading... |
| `uniface.error.required` | 此字段为必填项 | This field is required |
| `uniface.error.invalid` | 输入格式无效 | Invalid input format |

## 最佳实践

### 1. 响应式设计
```svelte
<style>
  .form-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;
  }
  
  @media (max-width: 768px) {
    .form-container {
      grid-template-columns: 1fr;
    }
  }
</style>
```

### 2. 无障碍访问
```svelte
<!-- 为每个表单字段添加标签 -->
<label for="username">用户名：</label>
<TextEditor id="username" placeholder="请输入用户名" />

<!-- 为选择组件添加描述 -->
<OptionsSelect 
  aria-describedby="country-description"
  placeholder="请选择国家"
  options={countries}
/>
<div id="country-description" class="form-help">
  请选择您所在的国家或地区
</div>
```

### 3. 性能优化
```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  
  interface Option {
    value: string;
    label: string;
  }
  
  let options: Option[] = [];
  
  // 延迟加载大量选项数据
  onMount(async (): Promise<void> => {
    const response = await fetch('/api/options');
    options = await response.json() as Option[];
  });
  
  // 使用防抖处理搜索
  let searchTimeout: NodeJS.Timeout;
  const handleSearch = (keyword: string): void => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      performSearch(keyword);
    }, 300);
  };
  
  const performSearch = (keyword: string): void => {
    // 实现搜索逻辑
  };
</script>
```

### 4. 错误处理
```svelte
<script lang="ts">
  let loading: boolean = false;
  let error: string | null = null;
  
  const handleAsyncOperation = async (): Promise<void> => {
    loading = true;
    error = null;
    
    try {
      await performOperation();
    } catch (err: unknown) {
      error = err instanceof Error ? err.message : '未知错误';
      console.error('操作失败：', err);
    } finally {
      loading = false;
    }
  };
  
  const performOperation = async (): Promise<void> => {
    // 实现异步操作逻辑
  };
</script>

{#if error}
  <div class="error-alert">
    <i class="icon_google_error"></i>
    {error}
  </div>
{/if}
```

## 表单验证示例

```svelte
<script lang="ts">
  import TextEditor from '@ticatec/uniface-element/TextEditor';
  import NumberEditor from '@ticatec/uniface-element/NumberEditor';
  import CheckBox from '@ticatec/uniface-element/Checkbox';
  
  interface FormData {
    name: string;
    email: string;
    age: number | null;
    agreed: boolean;
  }
  
  interface FormErrors {
    [key: string]: string;
  }
  
  type ValidatorFunction = (value: any) => string | null;
  
  interface Validators {
    [key: string]: ValidatorFunction;
  }
  
  let formData: FormData = {
    name: '',
    email: '',
    age: null,
    agreed: false
  };
  
  let errors: FormErrors = {};
  
  // 验证规则
  const validators: Validators = {
    name: (value: string): string | null => {
      if (!value || value.trim().length === 0) {
        return '姓名不能为空';
      }
      if (value.length < 2) {
        return '姓名至少需要2个字符';
      }
      return null;
    },
    email: (value: string): string | null => {
      if (!value) return '邮箱不能为空';
      const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return '请输入有效的邮箱地址';
      }
      return null;
    },
    age: (value: number | null): string | null => {
      if (value === null) return '年龄不能为空';
      if (value < 18) return '年龄必须满18岁';
      if (value > 120) return '请输入有效的年龄';
      return null;
    },
    agreed: (value: boolean): string | null => {
      if (!value) return '请同意服务条款';
      return null;
    }
  };
  
  // 验证单个字段
  const validateField = (field: keyof FormData, value: any): void => {
    const error = validators[field]?.(value);
    if (error) {
      errors[field] = error;
    } else {
      delete errors[field];
    }
    errors = { ...errors };
  };
  
  // 验证整个表单
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    (Object.keys(validators) as Array<keyof FormData>).forEach(field => {
      const error = validators[field](formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });
    errors = newErrors;
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = (): void => {
    if (validateForm()) {
      console.log('表单提交成功', formData);
    } else {
      console.log('表单验证失败', errors);
    }
  };
</script>

<form on:submit|preventDefault={handleSubmit}>
  <!-- 姓名输入 -->
  <div class="form-field">
    <TextEditor 
      placeholder="请输入姓名"
      bind:value={formData.name}
      onChange={(value: string) => validateField('name', value)}
    />
    {#if errors.name}
      <div class="error-message">{errors.name}</div>
    {/if}
  </div>
  
  <!-- 邮箱输入 -->
  <div class="form-field">
    <TextEditor 
      placeholder="请输入邮箱"
      bind:value={formData.email}
      onChange={(value: string) => validateField('email', value)}
    />
    {#if errors.email}
      <div class="error-message">{errors.email}</div>
    {/if}
  </div>
  
  <!-- 年龄输入 -->
  <div class="form-field">
    <NumberEditor 
      placeholder="请输入年龄"
      min={1}
      max={120}
      bind:value={formData.age}
      onChange={(value: number | null) => validateField('age', value)}
    />
    {#if errors.age}
      <div class="error-message">{errors.age}</div>
    {/if}
  </div>
  
  <!-- 同意条款 -->
  <div class="form-field">
    <CheckBox 
      label="我同意服务条款和隐私政策"
      bind:value={formData.agreed}
      onChange={(value: boolean) => validateField('agreed', value)}
    />
    {#if errors.agreed}
      <div class="error-message">{errors.agreed}</div>
    {/if}
  </div>
  
  <button type="submit" disabled={Object.keys(errors).length > 0}>
    提交表单
  </button>
</form>

<style>
  .form-field {
    margin-bottom: 16px;
  }
  
  .error-message {
    color: var(--uniface-danger-color);
    font-size: 12px;
    margin-top: 4px;
  }
  
  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
```

---

## 总结

本文档涵盖了 Uniface 表单组件库的完整 API 和使用方法。每个组件都遵循统一的设计原则和交互模式，确保了良好的用户体验和开发体验。

主要特性：
- 🎨 统一的视觉设计和交互体验
- 🔧 TypeScript 支持，提供完整的类型定义
- 🌍 国际化支持
- ♿ 考虑无障碍访问需求
- 📱 响应式设计
- 🎯 高性能实现
- 🔌 灵活的扩展机制

如需更多信息或遇到问题，请参考相关组件的源代码或联系开发团队。