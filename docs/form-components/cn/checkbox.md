# CheckBox 组件

复选框组件，用于布尔值的输入。

## 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | 外观变体 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `readonly` | `boolean` | `false` | 是否只读 |
| `value` | `boolean` | `false` | 选中状态 |
| `label` | `string` | `''` | 标签文本 |
| `indeterminate` | `boolean` | `false` | 是否为不确定状态 |
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | 显示模式 |
| `style` | `string` | `''` | 自定义样式 |
| `onChange` | `OnChangeHandler<boolean>` | - | 值变化回调 |

## 使用示例

```svelte
<script lang="ts">
  import { CheckBox } from '@ticatec/uniface-element';
  
  let agreeTerms: boolean = false;
  let enableNotifications: boolean = true;
  let partialSelection: boolean = false;
  
  const handleAgreeChange = (checked: boolean): void => {
    agreeTerms = checked;
  };
  
  const handleNotificationChange = (checked: boolean): void => {
    enableNotifications = checked;
  };
</script>

<!-- 同意条款 -->
<CheckBox 
  label="我同意服务条款和隐私政策"
  bind:value={agreeTerms}
  onChange={handleAgreeChange}
/>

<!-- 通知设置 -->
<CheckBox 
  label="启用邮件通知"
  bind:value={enableNotifications}
  onChange={handleNotificationChange}
/>

<!-- 不确定状态的复选框 -->
<CheckBox 
  label="部分选中状态"
  indeterminate={true}
  bind:value={partialSelection}
/>
```