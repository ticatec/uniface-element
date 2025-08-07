# DateTimePicker 组件

日期时间选择器组件。

## 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | 外观变体 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `readonly` | `boolean` | `false` | 是否只读 |
| `compact` | `boolean` | `false` | 是否紧凑模式 |
| `value` | `Date \| string \| null` | `null` | 日期时间值 |
| `format` | `string` | `'YYYY-MM-DD HH:mm'` | 日期时间格式 |
| `placeholder` | `string` | `''` | 占位符文本 |
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | 显示模式 |
| `minDateTime` | `Date \| string \| null` | `null` | 最小日期时间 |
| `maxDateTime` | `Date \| string \| null` | `null` | 最大日期时间 |
| `minuteStep` | `number` | `1` | 分钟步长 |
| `locale` | `string` | `'zh-CN'` | 语言区域 |
| `style` | `string` | `''` | 自定义样式 |
| `onChange` | `OnChangeHandler<Date>` | - | 值变化回调 |

## 使用示例

```svelte
<script lang="ts">
  import { DateTimePicker } from '@ticatec/uniface-element';
  
  let appointmentTime: Date | null = null;
  let eventStartTime: Date = new Date();
  let eventEndTime: Date | null = null;
  
  const handleAppointmentChange = (dateTime: Date): void => {
    appointmentTime = dateTime;
    console.log('预约时间：', dateTime);
  };
  
  const handleEventStartChange = (dateTime: Date): void => {
    eventStartTime = dateTime;
    // 自动设置结束时间为开始时间后1小时
    if (!eventEndTime) {
      eventEndTime = new Date(dateTime.getTime() + 60 * 60 * 1000);
    }
  };
  
  const handleEventEndChange = (dateTime: Date): void => {
    eventEndTime = dateTime;
  };
</script>

<!-- 预约时间选择 -->
<DateTimePicker 
  placeholder="请选择预约时间"
  minDateTime={new Date()}
  minuteStep={15}
  bind:value={appointmentTime}
  onChange={handleAppointmentChange}
/>

<!-- 事件开始时间 -->
<DateTimePicker 
  placeholder="请选择开始时间"
  bind:value={eventStartTime}
  onChange={handleEventStartChange}
/>

<!-- 事件结束时间 -->
<DateTimePicker 
  placeholder="请选择结束时间"
  minDateTime={eventStartTime}
  bind:value={eventEndTime}
  onChange={handleEventEndChange}
/>
```

## 高级用法

### 会议室预订
```svelte
<script lang="ts">
  interface MeetingSlot {
    start: Date;
    end: Date;
    duration: number; // 分钟
  }
  
  let meetingStart: Date | null = null;
  let meetingEnd: Date | null = null;
  
  // 工作时间限制
  const getWorkingHourLimits = (date: Date): { min: Date; max: Date } => {
    const workStart = new Date(date);
    workStart.setHours(9, 0, 0, 0);
    
    const workEnd = new Date(date);
    workEnd.setHours(18, 0, 0, 0);
    
    return { min: workStart, max: workEnd };
  };
  
  const handleMeetingStartChange = (startTime: Date): void => {
    meetingStart = startTime;
    
    // 自动设置结束时间（默认1小时后）
    if (!meetingEnd) {
      meetingEnd = new Date(startTime.getTime() + 60 * 60 * 1000);
    }
  };
  
  const calculateDuration = (start: Date | null, end: Date | null): number => {
    if (!start || !end) return 0;
    return Math.round((end.getTime() - start.getTime()) / (1000 * 60));
  };
  
  $: meetingDuration = calculateDuration(meetingStart, meetingEnd);
  $: workingLimits = meetingStart ? getWorkingHourLimits(meetingStart) : null;
</script>

<div class="meeting-booking">
  <div class="datetime-field">
    <label>会议开始时间：</label>
    <DateTimePicker 
      placeholder="请选择开始时间"
      minDateTime={new Date()}
      minuteStep={15}
      bind:value={meetingStart}
      onChange={handleMeetingStartChange}
    />
  </div>
  
  <div class="datetime-field">
    <label>会议结束时间：</label>
    <DateTimePicker 
      placeholder="请选择结束时间"
      minDateTime={meetingStart}
      maxDateTime={workingLimits?.max}
      minuteStep={15}
      bind:value={meetingEnd}
    />
  </div>
  
  {#if meetingDuration > 0}
    <div class="duration-info">
      会议时长：{Math.floor(meetingDuration / 60)}小时{meetingDuration % 60}分钟
    </div>
  {/if}
  
  {#if workingLimits && meetingEnd && meetingEnd > workingLimits.max}
    <div class="warning">注意：会议结束时间超出工作时间</div>
  {/if}
</div>
```

## 最佳实践

### 1. 设置合理的时间范围
```svelte
<script lang="ts">
  // 预约：只能选择未来时间
  const futureOnly: Date = new Date();
  futureOnly.setMinutes(futureOnly.getMinutes() + 30); // 至少提前30分钟
  
  // 工作时间：限制在工作日的工作时间内
  const isWorkingTime = (date: Date): boolean => {
    const day: number = date.getDay();
    const hour: number = date.getHours();
    return day >= 1 && day <= 5 && hour >= 9 && hour <= 18;
  };
</script>

<!-- 预约系统 -->
<DateTimePicker 
  minDateTime={futureOnly}
  minuteStep={30}
  placeholder="选择预约时间"
/>
```

### 2. 本地化和格式化
```svelte
<DateTimePicker 
  locale="zh-CN"
  format="YYYY年MM月DD日 HH:mm"
  placeholder="请选择日期时间"
/>

<DateTimePicker 
  locale="en-US"
  format="MM/DD/YYYY hh:mm A"
  placeholder="Select date and time"
/>
```

### 3. 表单验证
```svelte
<script lang="ts">
  let selectedDateTime: Date | null = null;
  let error: string = '';
  
  const validateDateTime = (dateTime: Date | null): void => {
    if (!dateTime) {
      error = '请选择日期时间';
      return;
    }
    
    const now: Date = new Date();
    const minTime: Date = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24小时后
    
    if (dateTime < minTime) {
      error = '请选择24小时后的时间';
      return;
    }
    
    error = '';
  };
  
  $: validateDateTime(selectedDateTime);
</script>

<DateTimePicker 
  bind:value={selectedDateTime}
  onChange={validateDateTime}
/>
{#if error}
  <div class="error-message">{error}</div>
{/if}
```