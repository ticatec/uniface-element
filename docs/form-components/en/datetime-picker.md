# DateTimePicker Component

Date and time picker component.

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | Appearance variant |
| `disabled` | `boolean` | `false` | Whether disabled |
| `readonly` | `boolean` | `false` | Whether read-only |
| `compact` | `boolean` | `false` | Whether compact mode |
| `value` | `Date \| string \| null` | `null` | Date/time value |
| `format` | `string` | `'YYYY-MM-DD HH:mm'` | Date/time format |
| `placeholder` | `string` | `''` | Placeholder text |
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | Display mode |
| `minDateTime` | `Date \| string \| null` | `null` | Minimum date/time |
| `maxDateTime` | `Date \| string \| null` | `null` | Maximum date/time |
| `minuteStep` | `number` | `1` | Minute step |
| `locale` | `string` | `'en-US'` | Locale |
| `style` | `string` | `''` | Custom styles |
| `onChange` | `OnChangeHandler<Date>` | - | Value change callback |

## Usage Examples

```svelte
<script lang="ts">
  import { DateTimePicker } from '@ticatec/uniface-element';
  
  let appointmentTime: Date | null = null;
  let eventStartTime: Date = new Date();
  let eventEndTime: Date | null = null;
  
  const handleAppointmentChange = (dateTime: Date): void => {
    appointmentTime = dateTime;
    console.log('Appointment time:', dateTime);
  };
  
  const handleEventStartChange = (dateTime: Date): void => {
    eventStartTime = dateTime;
    // Auto-set end time to 1 hour after start time
    if (!eventEndTime) {
      eventEndTime = new Date(dateTime.getTime() + 60 * 60 * 1000);
    }
  };
  
  const handleEventEndChange = (dateTime: Date): void => {
    eventEndTime = dateTime;
  };
</script>

<!-- Appointment time selection -->
<DateTimePicker 
  placeholder="Please select appointment time"
  minDateTime={new Date()}
  minuteStep={15}
  bind:value={appointmentTime}
  onChange={handleAppointmentChange}
/>

<!-- Event start time -->
<DateTimePicker 
  placeholder="Please select start time"
  bind:value={eventStartTime}
  onChange={handleEventStartChange}
/>

<!-- Event end time -->
<DateTimePicker 
  placeholder="Please select end time"
  minDateTime={eventStartTime}
  bind:value={eventEndTime}
  onChange={handleEventEndChange}
/>
```

## Advanced Usage

### Meeting Room Booking
```svelte
<script lang="ts">
  interface MeetingSlot {
    start: Date;
    end: Date;
    duration: number; // minutes
  }
  
  let meetingStart: Date | null = null;
  let meetingEnd: Date | null = null;
  
  // Working hours constraints
  const getWorkingHourLimits = (date: Date): { min: Date; max: Date } => {
    const workStart = new Date(date);
    workStart.setHours(9, 0, 0, 0);
    
    const workEnd = new Date(date);
    workEnd.setHours(18, 0, 0, 0);
    
    return { min: workStart, max: workEnd };
  };
  
  const handleMeetingStartChange = (startTime: Date): void => {
    meetingStart = startTime;
    
    // Auto-set end time (default 1 hour later)
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
    <label>Meeting Start Time:</label>
    <DateTimePicker 
      placeholder="Please select start time"
      minDateTime={new Date()}
      minuteStep={15}
      bind:value={meetingStart}
      onChange={handleMeetingStartChange}
    />
  </div>
  
  <div class="datetime-field">
    <label>Meeting End Time:</label>
    <DateTimePicker 
      placeholder="Please select end time"
      minDateTime={meetingStart}
      maxDateTime={workingLimits?.max}
      minuteStep={15}
      bind:value={meetingEnd}
    />
  </div>
  
  {#if meetingDuration > 0}
    <div class="duration-info">
      Meeting duration: {Math.floor(meetingDuration / 60)} hours {meetingDuration % 60} minutes
    </div>
  {/if}
  
  {#if workingLimits && meetingEnd && meetingEnd > workingLimits.max}
    <div class="warning">Warning: Meeting end time exceeds working hours</div>
  {/if}
</div>
```

## Best Practices

### 1. Set Reasonable Time Ranges
```svelte
<script lang="ts">
  // Appointments: only future times
  const futureOnly = new Date();
  futureOnly.setMinutes(futureOnly.getMinutes() + 30); // At least 30 minutes ahead
  
  // Working hours: limit to weekday working hours
  const isWorkingTime = (date: Date): boolean => {
    const day = date.getDay();
    const hour = date.getHours();
    return day >= 1 && day <= 5 && hour >= 9 && hour <= 18;
  };
</script>

<!-- Appointment system -->
<DateTimePicker 
  minDateTime={futureOnly}
  minuteStep={30}
  placeholder="Select appointment time"
/>
```

### 2. Localization and Formatting
```svelte
<DateTimePicker 
  locale="en-US"
  format="MM/DD/YYYY hh:mm A"
  placeholder="Please select date and time"
/>

<DateTimePicker 
  locale="en-GB"
  format="DD/MM/YYYY HH:mm"
  placeholder="Select date and time"
/>
```

### 3. Form Validation
```svelte
<script lang="ts">
  let selectedDateTime: Date | null = null;
  let error: string = '';
  
  const validateDateTime = (dateTime: Date | null): void => {
    if (!dateTime) {
      error = 'Please select date and time';
      return;
    }
    
    const now = new Date();
    const minTime = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours later
    
    if (dateTime < minTime) {
      error = 'Please select time at least 24 hours from now';
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