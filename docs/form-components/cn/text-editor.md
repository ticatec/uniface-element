# TextEditor 组件

基础文本输入组件，支持单行和多行文本输入。

## 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | 外观变体 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `readonly` | `boolean` | `false` | 是否只读 |
| `compact` | `boolean` | `false` | 是否紧凑模式 |
| `value` | `string` | `''` | 输入值 |
| `placeholder` | `string` | `''` | 占位符文本 |
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | 显示模式 |
| `multiline` | `boolean` | `false` | 是否多行输入 |
| `rows` | `number` | `3` | 多行模式下的行数 |
| `maxLength` | `number \| null` | `null` | 最大字符长度 |
| `style` | `string` | `''` | 自定义样式 |
| `onChange` | `OnChangeHandler<string>` | - | 值变化回调 |

## 事件

- `onChange(value: string)` - 当输入值发生变化时触发

## 使用示例

```svelte
<script lang="ts">
  import { TextEditor } from '@ticatec/uniface-element';
  
  let inputValue = '';
  
  const handleChange = (value) => {
    console.log('输入值：', value);
    inputValue = value;
  };
</script>

<!-- 基础单行输入 -->
<TextEditor 
  placeholder="请输入文本"
  {onChange}
  bind:value={inputValue}
/>

<!-- 多行文本输入 -->
<TextEditor 
  multiline={true}
  rows={5}
  placeholder="请输入多行文本"
  {onChange}
  bind:value={inputValue}
/>

<!-- 带字符限制的输入 -->
<TextEditor 
  maxLength={100}
  placeholder="最多100个字符"
  {onChange}
  bind:value={inputValue}
/>
```

## 最佳实践

### 表单验证
```svelte
<script lang="ts">
  let value = '';
  let error = '';
  
  const validate = (inputValue) => {
    if (!inputValue || inputValue.trim().length === 0) {
      error = '此字段不能为空';
    } else if (inputValue.length < 3) {
      error = '至少需要3个字符';
    } else {
      error = '';
    }
  };
  
  const handleChange = (newValue) => {
    value = newValue;
    validate(newValue);
  };
</script>

<TextEditor 
  placeholder="请输入内容"
  bind:value={value}
  onChange={handleChange}
/>
{#if error}
  <div class="error-message">{error}</div>
{/if}
```

### 多行文本编辑
```svelte
<script lang="ts">
  let description = '';
</script>

<TextEditor 
  multiline={true}
  rows={6}
  placeholder="请输入描述信息..."
  bind:value={description}
  maxLength={500}
/>
<div class="char-count">{description.length}/500</div>
```

## 样式定制

```css
/* 自定义样式 */
.custom-text-editor {
  border-radius: 8px;
  border: 2px solid #e1e5e9;
  font-family: 'Inter', sans-serif;
}

.custom-text-editor:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}
```

## 无障碍访问

```svelte
<label for="user-name">用户名称：</label>
<TextEditor 
  id="user-name"
  placeholder="请输入用户名称"
  aria-describedby="name-help"
  bind:value={userName}
/>
<div id="name-help" class="form-help">
  用户名称将用于系统显示，建议使用真实姓名
</div>
```