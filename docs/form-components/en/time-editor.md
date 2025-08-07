# TimeEditor Component

Time input component supporting hour and minute selection.

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | Appearance variant |
| `disabled` | `boolean` | `false` | Whether disabled |
| `readonly` | `boolean` | `false` | Whether read-only |
| `compact` | `boolean` | `false` | Whether compact mode |
| `value` | `string` | `''` | Time value (format: HH:MM) |
| `placeholder` | `string` | `''` | Placeholder text |
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | Display mode |
| `format24h` | `boolean` | `true` | Whether to use 24-hour format |
| `minuteStep` | `number` | `1` | Minute step |
| `style` | `string` | `''` | Custom styles |
| `onChange` | `OnChangeHandler<string>` | - | Value change callback |

## Usage Examples

```svelte
<script lang="ts">
  import { TimeEditor } from '@ticatec/uniface-element';
  
  let startTime: string = '09:00';
  let endTime: string = '17:30';
  
  const handleStartTimeChange = (value: string) => {
    startTime = value;
    console.log('Start time:', value);
  };
  
  const handleEndTimeChange = (value: string) => {
    endTime = value;
    console.log('End time:', value);
  };
</script>

<!-- Start time -->
<TimeEditor 
  placeholder="Select start time"
  bind:value={startTime}
  onChange={handleStartTimeChange}
/>

<!-- End time (15-minute intervals) -->
<TimeEditor 
  placeholder="Select end time"
  minuteStep={15}
  bind:value={endTime}
  onChange={handleEndTimeChange}
/>
```

## Advanced Usage

### Working Hours Setup
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
    <label>Working Hours:</label>
    <TimeEditor 
      placeholder="Start time"
      minuteStep={30}
      bind:value={workingHours.start}
      onChange={updateWorkingHours('start')}
    />
    <span>to</span>
    <TimeEditor 
      placeholder="End time"
      minuteStep={30}
      bind:value={workingHours.end}
      onChange={updateWorkingHours('end')}
    />
  </div>
  
  <div class="time-range">
    <label>Break Time:</label>
    <TimeEditor 
      placeholder="Start time"
      minuteStep={15}
      bind:value={workingHours.break_start}
      onChange={updateWorkingHours('break_start')}
    />
    <span>to</span>
    <TimeEditor 
      placeholder="End time"
      minuteStep={15}
      bind:value={workingHours.break_end}
      onChange={updateWorkingHours('break_end')}
    />
  </div>
</div>
```

## Best Practices

### 1. Set Appropriate Step Size
```svelte
<!-- Meeting time: 15-minute intervals -->
<TimeEditor minuteStep={15} />

<!-- Work shifts: 30-minute intervals -->
<TimeEditor minuteStep={30} />

<!-- Precise time: 1-minute intervals -->
<TimeEditor minuteStep={1} />
```

### 2. Time Range Validation
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
        timeError = 'End time must be later than start time';
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