# DatePicker Component

Date picker component.

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | Appearance variant |
| `disabled` | `boolean` | `false` | Whether disabled |
| `readonly` | `boolean` | `false` | Whether read-only |
| `compact` | `boolean` | `false` | Whether compact mode |
| `value` | `Date \| string \| null` | `null` | Date value |
| `format` | `string` | `'YYYY-MM-DD'` | Date format |
| `placeholder` | `string` | `''` | Placeholder text |
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | Display mode |
| `minDate` | `Date \| string \| null` | `null` | Minimum date |
| `maxDate` | `Date \| string \| null` | `null` | Maximum date |
| `disabledDates` | `Array<Date \| string>` | `[]` | Disabled dates |
| `locale` | `string` | `'en-US'` | Locale |
| `style` | `string` | `''` | Custom styles |
| `onChange` | `OnChangeHandler<Date>` | - | Value change callback |

## Usage Examples

```svelte
<script lang="ts">
  import { DatePicker } from '@ticatec/uniface-element';
  
  let birthDate: Date | null = null;
  let startDate: Date = new Date();
  let endDate: Date | null = null;
  
  // Calculate min and max dates
  const today: Date = new Date();
  const minBirthDate: Date = new Date(1900, 0, 1);
  const maxBirthDate: Date = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  
  const handleBirthDateChange = (date: Date): void => {
    birthDate = date;
    console.log('Birth date:', date);
  };
  
  const handleStartDateChange = (date: Date): void => {
    startDate = date;
    // Auto-set minimum end date
    if (endDate && date > endDate) {
      endDate = date;
    }
  };
  
  const handleEndDateChange = (date: Date): void => {
    endDate = date;
  };
</script>

<!-- Birth date selection -->
<DatePicker 
  placeholder="Please select birth date"
  minDate={minBirthDate}
  maxDate={maxBirthDate}
  bind:value={birthDate}
  onChange={handleBirthDateChange}
/>

<!-- Start date -->
<DatePicker 
  placeholder="Please select start date"
  minDate={today}
  bind:value={startDate}
  onChange={handleStartDateChange}
/>

<!-- End date -->
<DatePicker 
  placeholder="Please select end date"
  minDate={startDate}
  bind:value={endDate}
  onChange={handleEndDateChange}
/>
```

## Advanced Usage

### Weekday Selection
```svelte
<script lang="ts">
  let workDate: Date | null = null;
  
  // Check if it's a weekday (Monday to Friday)
  const isWorkday = (date: Date): boolean => {
    const day = date.getDay();
    return day >= 1 && day <= 5;
  };
  
  // Generate disabled weekend dates
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
  
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  
  $: disabledWeekends = generateDisabledWeekends(new Date(), nextMonth);
</script>

<DatePicker 
  placeholder="Please select weekday"
  disabledDates={disabledWeekends}
  bind:value={workDate}
/>
```

## Best Practices

### 1. Set Reasonable Date Ranges
```svelte
<script lang="ts">
  // Booking date: only future dates
  const bookingMinDate = new Date();
  bookingMinDate.setDate(bookingMinDate.getDate() + 1);
  
  // Birthday: not exceeding current date
  const birthdayMaxDate = new Date();
</script>

<DatePicker 
  placeholder="Booking date"
  minDate={bookingMinDate}
/>

<DatePicker 
  placeholder="Birth date"
  maxDate={birthdayMaxDate}
/>
```

### 2. Localization Settings
```svelte
<DatePicker 
  locale="en-US"
  format="MM/DD/YYYY"
  placeholder="Please select date"
/>
```