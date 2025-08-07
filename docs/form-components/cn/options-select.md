# OptionsSelect 组件

单选下拉选择组件，从预定义选项中选择一个值。

## 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | 外观变体 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `readonly` | `boolean` | `false` | 是否只读 |
| `compact` | `boolean` | `false` | 是否紧凑模式 |
| `value` | `any` | `null` | 选中的值 |
| `options` | `Array<any>` | `[]` | 选项数组 |
| `keyField` | `string` | `'code'` | 值字段名 |
| `textField` | `string` | `'text'` | 显示字段名 |
| `placeholder` | `string` | `''` | 占位符文本 |
| `emptyText` | `string` | `''` | 空值显示文本 |
| `disableOptions` | `Array<string>` | `[]` | 禁用的选项值 |
| `hideOptions` | `Array<string>` | `[]` | 隐藏的选项值 |
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | 显示模式 |
| `menu$height` | `number` | `0` | 下拉菜单高度 |
| `style` | `string` | `''` | 自定义样式 |
| `onChange` | `OnChangeHandler<any>` | - | 值变化回调 |

## 使用示例

```svelte
<script lang="ts">
  import { OptionsSelect } from '@ticatec/uniface-element';
  
  // 国家选项
  const countries = [
    { code: 'CN', text: '中国' },
    { code: 'US', text: '美国' },
    { code: 'JP', text: '日本' },
    { code: 'GB', text: '英国' },
    { code: 'DE', text: '德国' }
  ];
  
  // 状态选项
  const statuses = [
    { code: 'active', text: '活跃' },
    { code: 'inactive', text: '非活跃' },
    { code: 'pending', text: '待审核' },
    { code: 'suspended', text: '暂停' }
  ];
  
  let selectedCountry = '';
  let userStatus = 'active';
  
  const handleCountryChange = (value) => {
    selectedCountry = value;
    console.log('选择的国家：', value);
  };
  
  const handleStatusChange = (value) => {
    userStatus = value;
    console.log('用户状态：', value);
  };
</script>

<!-- 国家选择 -->
<OptionsSelect 
  placeholder="请选择国家"
  options={countries}
  keyField="code"
  textField="text"
  bind:value={selectedCountry}
  onChange={handleCountryChange}
/>

<!-- 用户状态选择（禁用部分选项） -->
<OptionsSelect 
  placeholder="请选择状态"
  options={statuses}
  keyField="code"
  textField="text"
  disableOptions={['suspended']}
  bind:value={userStatus}
  onChange={handleStatusChange}
/>
```