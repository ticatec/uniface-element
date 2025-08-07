# DatePicker 组件

日期选择器组件。

## 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | 外观变体 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `readonly` | `boolean` | `false` | 是否只读 |
| `compact` | `boolean` | `false` | 是否紧凑模式 |
| `value` | `Date \| string \| null` | `null` | 日期值 |
| `format` | `string` | `'YYYY-MM-DD'` | 日期格式 |
| `placeholder` | `string` | `''` | 占位符文本 |
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | 显示模式 |
| `minDate` | `Date \| string \| null` | `null` | 最小日期 |
| `maxDate` | `Date \| string \| null` | `null` | 最大日期 |
| `disabledDates` | `Array<Date \| string>` | `[]` | 禁用的日期 |
| `locale` | `string` | `'zh-CN'` | 语言区域 |
| `style` | `string` | `''` | 自定义样式 |
| `onChange` | `OnChangeHandler<Date>` | - | 值变化回调 |

## 使用示例

```svelte
<script lang="ts">
  import { DatePicker } from '@ticatec/uniface-element';
  
  let birthDate: Date | null = null;
  let startDate: Date = new Date();
  let endDate: Date | null = null;
  
  // 计算最小和最大日期
  const today: Date = new Date();
  const minBirthDate: Date = new Date(1900, 0, 1);
  const maxBirthDate: Date = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  
  const handleBirthDateChange = (date: Date): void => {
    birthDate = date;
    console.log('出生日期：', date);
  };
  
  const handleStartDateChange = (date: Date): void => {
    startDate = date;
    // 自动设置结束日期的最小值
    if (endDate && date > endDate) {
      endDate = date;
    }
  };
  
  const handleEndDateChange = (date: Date): void => {
    endDate = date;
  };
</script>

<!-- 出生日期选择 -->
<DatePicker 
  placeholder="请选择出生日期"
  minDate={minBirthDate}
  maxDate={maxBirthDate}
  bind:value={birthDate}
  onChange={handleBirthDateChange}
/>

<!-- 开始日期 -->
<DatePicker 
  placeholder="请选择开始日期"
  minDate={today}
  bind:value={startDate}
  onChange={handleStartDateChange}
/>

<!-- 结束日期 -->
<DatePicker 
  placeholder="请选择结束日期"
  minDate={startDate}
  bind:value={endDate}
  onChange={handleEndDateChange}
/>
```

## 高级用法

### 工作日选择
```svelte
<script lang="ts">
  let workDate: Date | null = null;
  
  // 判断是否为工作日（周一到周五）
  const isWorkday = (date: Date): boolean => {
    const day = date.getDay();
    return day >= 1 && day <= 5;
  };
  
  // 生成禁用日期列表（周末）
  const generateDisabledWeekends = (startDate: Date, endDate: Date): Date[] => {
    const disabled: Date[] = [];
    const current = new Date(startDate);
    
    while (current <= endDate) {
      if (!isWorkday(current)) {
        disabled.push(new Date(current));
      }
      current.setDate(current.getDate() + 1);
    }
    
    return disabled;
  };
  
  const nextMonth: Date = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  
  $: disabledWeekends = generateDisabledWeekends(new Date(), nextMonth);
</script>

<DatePicker 
  placeholder="请选择工作日"
  disabledDates={disabledWeekends}
  bind:value={workDate}
/>
```

## 最佳实践

### 1. 合理设置日期范围
```svelte
<script lang="ts">
  // 预订日期：只能选择未来日期
  const bookingMinDate: Date = new Date();
  bookingMinDate.setDate(bookingMinDate.getDate() + 1);
  
  // 生日：不超过当前日期
  const birthdayMaxDate: Date = new Date();
</script>

<DatePicker 
  placeholder="预订日期"
  minDate={bookingMinDate}
/>

<DatePicker 
  placeholder="出生日期"
  maxDate={birthdayMaxDate}
/>
```

### 2. 本地化设置
```svelte
<DatePicker 
  locale="zh-CN"
  format="YYYY年MM月DD日"
  placeholder="请选择日期"
/>
```