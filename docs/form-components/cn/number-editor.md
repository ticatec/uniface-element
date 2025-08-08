# NumberEditor 组件

专用于数字输入的组件，支持整数和浮点数。

## 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | 外观变体 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `readonly` | `boolean` | `false` | 是否只读 |
| `compact` | `boolean` | `false` | 是否紧凑模式 |
| `value` | `number \| null` | `null` | 数值 |
| `placeholder` | `string` | `''` | 占位符文本 |
| `precision` | `number \| null` | `null` | 小数位数 |
| `suffix` | `string` | `''` | 文本后缀 |
| `prefix` | `string` | `''` | 文本前缀 |
| `allowNegative` | `boolean` | `false` | 允许负数 |
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | 显示模式 |
| `max` | `number \| null` | `null` | 最大值 |
| `min` | `number \| null` | `null` | 最小值 |
| `removable` | `boolean` | `true` | 显示清除按钮 |
| `style` | `string` | `''` | 自定义样式 |
| `onChange` | `OnChangeHandler<number \| null>` | - | 值变化回调 |

## 使用示例

```svelte
<script lang="ts">
  import NumberEditor from '@ticatec/uniface-element/NumberEditor';
  
  let price: number | null = null;
  let quantity: number | null = 1;
  let rating: number | null = null;
  
  const handlePriceChange = (value: number | null) => {
    price = value;
    console.log('价格：', value);
  };
  
  const handleQuantityChange = (value: number | null) => {
    quantity = value;
    console.log('数量：', value);
  };
  
  const handleRatingChange = (value: number | null) => {
    rating = value;
    console.log('评分：', value);
  };
</script>

<!-- 带前缀的价格输入 -->
<NumberEditor 
  placeholder="请输入价格"
  min={0}
  precision={2}
  prefix="¥"
  onChange={handlePriceChange}
  bind:value={price}
/>

<!-- 带限制的数量输入 -->
<NumberEditor 
  placeholder="请输入数量"
  min={1}
  max={999}
  precision={0}
  onChange={handleQuantityChange}
  bind:value={quantity}
/>

<!-- 带后缀的评分输入 -->
<NumberEditor 
  placeholder="请输入评分"
  min={0}
  max={5}
  precision={1}
  suffix="/5"
  onChange={handleRatingChange}
  bind:value={rating}
/>
```

## 高级用法

### 货币输入
```svelte
<script lang="ts">
  let amount = null;
  let formattedAmount = '';
  
  const formatCurrency = (value) => {
    if (value === null || value === undefined) return '';
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY'
    }).format(value);
  };
  
  const handleAmountChange = (value) => {
    amount = value;
    formattedAmount = formatCurrency(value);
  };
</script>

<div class="currency-input">
  <NumberEditor 
    placeholder="请输入金额"
    min={0}
    precision={2}
    prefix="¥"
    bind:value={amount}
    onChange={handleAmountChange}
  />
  {#if formattedAmount}
    <div class="currency-display">{formattedAmount}</div>
  {/if}
</div>
```

### 百分比输入
```svelte
<script lang="ts">
  let percentage = null;
  
  const handlePercentageChange = (value) => {
    // 限制在0-100之间
    if (value !== null) {
      percentage = Math.min(Math.max(value, 0), 100);
    } else {
      percentage = value;
    }
  };
</script>

<div class="percentage-input">
  <NumberEditor 
    placeholder="请输入百分比"
    min={0}
    max={100}
    precision={1}
    suffix="%"
    bind:value={percentage}
    onChange={handlePercentageChange}
  />
</div>
```

### 表单验证
```svelte
<script lang="ts">
  let age = null;
  let ageError = '';
  
  const validateAge = (value) => {
    if (value === null) {
      ageError = '年龄不能为空';
    } else if (value < 18) {
      ageError = '年龄必须满18岁';
    } else if (value > 120) {
      ageError = '请输入有效的年龄';
    } else {
      ageError = '';
    }
  };
  
  const handleAgeChange = (value) => {
    age = value;
    validateAge(value);
  };
</script>

<div class="form-field">
  <NumberEditor 
    placeholder="请输入年龄"
    min={1}
    max={120}
    bind:value={age}
    onChange={handleAgeChange}
  />
  {#if ageError}
    <div class="error-message">{ageError}</div>
  {/if}
</div>
```

## 样式定制

```css
.currency-input {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.currency-display {
  font-size: 12px;
  color: #6c757d;
  font-weight: 500;
}

.percentage-input {
  display: flex;
  align-items: center;
  gap: 8px;
}

.suffix {
  font-weight: 500;
  color: #495057;
}

.form-field {
  margin-bottom: 16px;
}

.error-message {
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
}
```

## 最佳实践

### 1. 设置合适的精度
```svelte
<!-- 货币：2位小数 -->
<NumberEditor precision={2} prefix="¥" />

<!-- 百分比：1位小数 -->
<NumberEditor precision={1} suffix="%" max={100} />

<!-- 整数：不设置precision -->
<NumberEditor precision={0} />
```

### 2. 合理的范围限制
```svelte
<!-- 年龄 -->
<NumberEditor min={0} max={150} precision={0} />

<!-- 评分 -->
<NumberEditor min={0} max={5} precision={1} suffix="/5" />

<!-- 价格 -->
<NumberEditor min={0} precision={2} prefix="¥" />
```

### 3. 合适的前后缀使用
```svelte
<!-- 货币前缀 -->
<NumberEditor prefix="¥" precision={2} />

<!-- 百分比后缀 -->
<NumberEditor suffix="%" precision={1} max={100} />

<!-- 单位后缀 -->
<NumberEditor suffix="kg" precision={1} min={0} />
```