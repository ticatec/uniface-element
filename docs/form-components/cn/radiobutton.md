# RadioButton 组件

单选按钮组件，用于在多个选项中选择一个。

## 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | 外观变体 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `readonly` | `boolean` | `false` | 是否只读 |
| `value` | `any` | `null` | 选中的值 |
| `groupValue` | `any` | `null` | 单选组的当前值 |
| `label` | `string` | `''` | 标签文本 |
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | 显示模式 |
| `style` | `string` | `''` | 自定义样式 |
| `onChange` | `OnChangeHandler<any>` | - | 值变化回调 |

## 使用示例

```svelte
<script lang="ts">
  import RadioButton from '@ticatec/uniface-element/RadioButton';
  
  let selectedPayment: string = 'credit';
  let selectedSize: string = 'M';
  
  const handlePaymentChange = (value: string): void => {
    selectedPayment = value;
    console.log('支付方式：', value);
  };
  
  const handleSizeChange = (value: string): void => {
    selectedSize = value;
    console.log('尺寸：', value);
  };
</script>

<!-- 支付方式选择 -->
<div>
  <h4>请选择支付方式：</h4>
  <RadioButton 
    label="信用卡支付"
    value="credit"
    groupValue={selectedPayment}
    onChange={handlePaymentChange}
  />
  <RadioButton 
    label="支付宝"
    value="alipay"
    groupValue={selectedPayment}
    onChange={handlePaymentChange}
  />
  <RadioButton 
    label="微信支付"
    value="wechat"
    groupValue={selectedPayment}
    onChange={handlePaymentChange}
  />
</div>

<!-- 尺寸选择 -->
<div>
  <h4>请选择尺寸：</h4>
  <RadioButton 
    label="小号 (S)"
    value="S"
    groupValue={selectedSize}
    onChange={handleSizeChange}
  />
  <RadioButton 
    label="中号 (M)"
    value="M"
    groupValue={selectedSize}
    onChange={handleSizeChange}
  />
  <RadioButton 
    label="大号 (L)"
    value="L"
    groupValue={selectedSize}
    onChange={handleSizeChange}
  />
</div>
```