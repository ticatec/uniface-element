# DatePicker 组件

日期选择器组件。

## 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | 外观变体 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `readonly` | `boolean` | `false` | 是否只读 |
| `compact` | `boolean` | `false` | 是否紧凑模式 |
| `mandatory` | `boolean` | `false` | 是否必填 |
| `value` | `any` | `null` | 日期值 |
| `style` | `string` | `''` | 自定义样式 |
| `placeholder` | `string` | `''` | 占位符文本 |
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | 显示模式 |
| `min` | `UniDate` | `null` | 最小日期 |
| `max` | `UniDate` | `null` | 最大日期 |
| `onChange` | `OnChangeHandler<Date>` | - | 值变化回调 |

## 使用示例

```svelte
<script lang="ts">
  import DatePicker from '@ticatec/uniface-element/DatePicker';
  
  let birthDate: any = null;
  let startDate: any = new Date();
  let endDate: any = null;
  
  const handleBirthDateChange = (date: Date): void => {
    birthDate = date;
    console.log('出生日期：', date);
  };
  
  const handleStartDateChange = (date: Date): void => {
    startDate = date;
    console.log('开始日期：', date);
  };
  
  const handleEndDateChange = (date: Date): void => {
    endDate = date;
    console.log('结束日期：', date);
  };
</script>

<!-- 基本日期选择器 -->
<DatePicker 
  placeholder="选择日期"
  bind:value={birthDate}
  onChange={handleBirthDateChange}
/>

<!-- 带最小日期限制的开始日期 -->
<DatePicker 
  placeholder="选择开始日期"
  min={new Date()}
  bind:value={startDate}
  onChange={handleStartDateChange}
/>

<!-- 带日期范围的结束日期 -->
<DatePicker 
  placeholder="选择结束日期"
  min={startDate}
  bind:value={endDate}
  onChange={handleEndDateChange}
/>
```

## 高级用法

### 日期范围选择
```svelte
<script lang="ts">
  let startDate: any = null;
  let endDate: any = null;
  
  const handleStartChange = (date: Date) => {
    startDate = date;
    // 如果结束日期早于开始日期，重置结束日期
    if (endDate && new Date(endDate) < new Date(date)) {
      endDate = null;
    }
  };
  
  const handleEndChange = (date: Date) => {
    endDate = date;
  };
</script>

<div class="date-range">
  <DatePicker 
    placeholder="开始日期"
    bind:value={startDate}
    onChange={handleStartChange}
  />
  
  <DatePicker 
    placeholder="结束日期"
    min={startDate}
    bind:value={endDate}
    onChange={handleEndChange}
  />
</div>
```

## 最佳实践

### 1. 合理设置日期范围
```svelte
<script lang="ts">
  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 1);
</script>

<!-- 只允许未来日期 -->
<DatePicker 
  placeholder="预订日期"
  min={futureDate}
/>

<!-- 允许过去日期 -->
<DatePicker 
  placeholder="出生日期"
  max={today}
/>
```

### 2. 使用 mandatory 标记必填字段
```svelte
<DatePicker 
  mandatory={true}
  placeholder="必填日期字段"
/>
```