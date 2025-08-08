# DatePicker Component

Date picker component.

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | Appearance variant |
| `disabled` | `boolean` | `false` | Whether disabled |
| `readonly` | `boolean` | `false` | Whether read-only |
| `compact` | `boolean` | `false` | Whether compact mode |
| `mandatory` | `boolean` | `false` | Whether required |
| `value` | `any` | `null` | Date value |
| `style` | `string` | `''` | Custom styles |
| `placeholder` | `string` | `''` | Placeholder text |
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | Display mode |
| `min` | `UniDate` | `null` | Minimum date |
| `max` | `UniDate` | `null` | Maximum date |
| `onChange` | `OnChangeHandler<Date>` | - | Value change callback |

## Usage Examples

```svelte
<script lang="ts">
  import DatePicker from '@ticatec/uniface-element/DatePicker';
  
  let birthDate: any = null;
  let startDate: any = new Date();
  let endDate: any = null;
  
  const handleBirthDateChange = (date: Date): void => {
    birthDate = date;
    console.log('Birth date:', date);
  };
  
  const handleStartDateChange = (date: Date): void => {
    startDate = date;
    console.log('Start date:', date);
  };
  
  const handleEndDateChange = (date: Date): void => {
    endDate = date;
    console.log('End date:', date);
  };
</script>

<!-- Basic date picker -->
<DatePicker 
  placeholder="Select date"
  bind:value={birthDate}
  onChange={handleBirthDateChange}
/>

<!-- Start date with minimum -->
<DatePicker 
  placeholder="Select start date"
  min={new Date()}
  bind:value={startDate}
  onChange={handleStartDateChange}
/>

<!-- End date with range -->
<DatePicker 
  placeholder="Select end date"
  min={startDate}
  bind:value={endDate}
  onChange={handleEndDateChange}
/>
```

## Advanced Usage

### Date Range Selection
```svelte
<script lang="ts">
  let startDate: any = null;
  let endDate: any = null;
  
  const handleStartChange = (date: Date) => {
    startDate = date;
    // Reset end date if it's before start date
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
    placeholder="Start date"
    bind:value={startDate}
    onChange={handleStartChange}
  />
  
  <DatePicker 
    placeholder="End date"
    min={startDate}
    bind:value={endDate}
    onChange={handleEndChange}
  />
</div>
```

## Best Practices

### 1. Set Reasonable Date Ranges
```svelte
<script lang="ts">
  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 1);
</script>

<!-- Future dates only -->
<DatePicker 
  placeholder="Booking date"
  min={futureDate}
/>

<!-- Past dates allowed -->
<DatePicker 
  placeholder="Birth date"
  max={today}
/>
```

### 2. Use Mandatory for Required Fields
```svelte
<DatePicker 
  mandatory={true}
  placeholder="Required date field"
/>
```