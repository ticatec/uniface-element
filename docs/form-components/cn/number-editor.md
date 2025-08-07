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
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | 显示模式 |
| `min` | `number \| null` | `null` | 最小值 |
| `max` | `number \| null` | `null` | 最大值 |
| `step` | `number` | `1` | 步长 |
| `precision` | `number \| null` | `null` | 小数位数 |
| `style` | `string` | `''` | 自定义样式 |
| `onChange` | `OnChangeHandler<number>` | - | 值变化回调 |

## 使用示例

```svelte
<script lang="ts">
  import { NumberEditor } from '@ticatec/uniface-element';
  
  let price = 0;
  let quantity = 1;
  let rating = null;
  
  const handlePriceChange = (value) => {
    price = value;
    console.log('价格：', value);
  };
  
  const handleQuantityChange = (value) => {
    quantity = value;
    console.log('数量：', value);
  };
  
  const handleRatingChange = (value) => {
    rating = value;
    console.log('评分：', value);
  };
</script>

<!-- 价格输入（支持小数） -->
<NumberEditor 
  placeholder="请输入价格"
  min={0}
  precision={2}
  step={0.01}
  onChange={handlePriceChange}
  bind:value={price}
/>

<!-- 数量输入（整数） -->
<NumberEditor 
  placeholder="请输入数量"
  min={1}
  max={999}
  step={1}
  onChange={handleQuantityChange}
  bind:value={quantity}
/>

<!-- 评分输入（0.5步长） -->
<NumberEditor 
  placeholder="请输入评分"
  min={0}
  max={5}
  step={0.5}
  precision={1}
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
    step={0.01}
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
    step={0.1}
    precision={1}
    bind:value={percentage}
    onChange={handlePercentageChange}
  />
  <span class="suffix">%</span>
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
<NumberEditor precision={2} step={0.01} />

<!-- 百分比：1位小数 -->
<NumberEditor precision={1} step={0.1} max={100} />

<!-- 整数：不设置precision -->
<NumberEditor step={1} />
```

### 2. 合理的范围限制
```svelte
<!-- 年龄 -->
<NumberEditor min={0} max={150} />

<!-- 评分 -->
<NumberEditor min={0} max={5} step={0.1} />

<!-- 价格 -->
<NumberEditor min={0} step={0.01} />
```

### 3. 适当的步长设置
```svelte
<!-- 精确控制 -->
<NumberEditor step={0.01} /> <!-- 货币 -->
<NumberEditor step={0.5} />  <!-- 评分 -->
<NumberEditor step={5} />    <!-- 年龄段 -->
```