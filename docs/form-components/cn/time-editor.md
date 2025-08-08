# TimeEditor 组件

时间输入组件，支持小时和分钟的选择。

## 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | 外观变体 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `readonly` | `boolean` | `false` | 是否只读 |
| `compact` | `boolean` | `false` | 是否紧凑模式 |
| `value` | `string` | `''` | 时间值（格式：HH:MM） |
| `placeholder` | `string` | `''` | 占位符文本 |
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | 显示模式 |
| `format24h` | `boolean` | `true` | 是否使用24小时格式 |
| `minuteStep` | `number` | `1` | 分钟步长 |
| `style` | `string` | `''` | 自定义样式 |
| `onChange` | `OnChangeHandler<string>` | - | 值变化回调 |

## 使用示例

```svelte
<script lang="ts">
  import TimeEditor from '@ticatec/uniface-element/TimeEditor';
  
  let startTime: string = '09:00';
  let endTime: string = '17:30';
  
  const handleStartTimeChange = (value: string) => {
    startTime = value;
    console.log('开始时间：', value);
  };
  
  const handleEndTimeChange = (value: string) => {
    endTime = value;
    console.log('结束时间：', value);
  };
</script>

<!-- 开始时间 -->
<TimeEditor 
  placeholder="请选择开始时间"
  bind:value={startTime}
  onChange={handleStartTimeChange}
/>

<!-- 结束时间（15分钟间隔） -->
<TimeEditor 
  placeholder="请选择结束时间"
  minuteStep={15}
  bind:value={endTime}
  onChange={handleEndTimeChange}
/>
```

## 高级用法

### 工作时间设置
```svelte
<script lang="ts">
  interface WorkingHours {
    start: string;
    end: string;
    break_start: string;
    break_end: string;
  }
  
  let workingHours: WorkingHours = {
    start: '09:00',
    end: '18:00',
    break_start: '12:00',
    break_end: '13:00'
  };
  
  const updateWorkingHours = (field: keyof WorkingHours) => (value: string) => {
    workingHours = { ...workingHours, [field]: value };
  };
</script>

<div class="working-hours">
  <div class="time-range">
    <label>工作时间：</label>
    <TimeEditor 
      placeholder="开始时间"
      minuteStep={30}
      bind:value={workingHours.start}
      onChange={updateWorkingHours('start')}
    />
    <span>至</span>
    <TimeEditor 
      placeholder="结束时间"
      minuteStep={30}
      bind:value={workingHours.end}
      onChange={updateWorkingHours('end')}
    />
  </div>
  
  <div class="time-range">
    <label>休息时间：</label>
    <TimeEditor 
      placeholder="开始时间"
      minuteStep={15}
      bind:value={workingHours.break_start}
      onChange={updateWorkingHours('break_start')}
    />
    <span>至</span>
    <TimeEditor 
      placeholder="结束时间"
      minuteStep={15}
      bind:value={workingHours.break_end}
      onChange={updateWorkingHours('break_end')}
    />
  </div>
</div>
```

## 最佳实践

### 1. 设置合适的步长
```svelte
<!-- 会议时间：15分钟间隔 -->
<TimeEditor minuteStep={15} />

<!-- 工作班次：30分钟间隔 -->
<TimeEditor minuteStep={30} />

<!-- 精确时间：1分钟间隔 -->
<TimeEditor minuteStep={1} />
```

### 2. 时间范围验证
```svelte
<script lang="ts">
  let startTime: string = '';
  let endTime: string = '';
  let timeError: string = '';
  
  const validateTimeRange = (start: string, end: string): void => {
    if (start && end) {
      const startMinutes = timeToMinutes(start);
      const endMinutes = timeToMinutes(end);
      
      if (startMinutes >= endMinutes) {
        timeError = '结束时间必须晚于开始时间';
      } else {
        timeError = '';
      }
    }
  };
  
  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };
  
  $: validateTimeRange(startTime, endTime);
</script>
```