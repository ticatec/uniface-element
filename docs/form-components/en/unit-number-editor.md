# UnitNumberEditor Component

Number input component with units, allowing users to select different measurement units.

## Type Definitions

```typescript
interface UnitOption {
  code: string;
  text: string;
  ratio: number; // Conversion ratio to base unit
}
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | Appearance variant |
| `disabled` | `boolean` | `false` | Whether disabled |
| `readonly` | `boolean` | `false` | Whether read-only |
| `compact` | `boolean` | `false` | Whether compact mode |
| `value` | `number \| null` | `null` | Numeric value |
| `unit` | `string` | `''` | Currently selected unit code |
| `units` | `UnitOption[]` | `[]` | Available unit options |
| `placeholder` | `string` | `''` | Placeholder text |
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | Display mode |
| `precision` | `number \| null` | `null` | Number of decimal places |
| `style` | `string` | `''` | Custom styles |
| `onChange` | `OnChangeHandler<{value: number, unit: string}>` | - | Value change callback |

## Usage Examples

```svelte
<script lang="ts">
  import UnitNumberEditor, { type UnitOption } from '@ticatec/uniface-element/UnitNumberEditor';
  
  // Weight unit options
  const weightUnits: UnitOption[] = [
    { code: 'kg', text: 'Kilogram', ratio: 1 },
    { code: 'g', text: 'Gram', ratio: 0.001 },
    { code: 'lb', text: 'Pound', ratio: 0.453592 }
  ];
  
  // Distance unit options
  const distanceUnits: UnitOption[] = [
    { code: 'm', text: 'Meter', ratio: 1 },
    { code: 'cm', text: 'Centimeter', ratio: 0.01 },
    { code: 'km', text: 'Kilometer', ratio: 1000 },
    { code: 'in', text: 'Inch', ratio: 0.0254 }
  ];
  
  let weight: number | null = null;
  let weightUnit: string = 'kg';
  let distance: number | null = null;
  let distanceUnit: string = 'm';
  
  interface UnitValue {
    value: number;
    unit: string;
  }
  
  const handleWeightChange = ({value, unit}: UnitValue): void => {
    weight = value;
    weightUnit = unit;
    console.log(`Weight: ${value} ${unit}`);
  };
  
  const handleDistanceChange = ({value, unit}: UnitValue): void => {
    distance = value;
    distanceUnit = unit;
    console.log(`Distance: ${value} ${unit}`);
  };
</script>

<!-- Weight input -->
<UnitNumberEditor 
  placeholder="Enter weight"
  units={weightUnits}
  precision={2}
  bind:value={weight}
  bind:unit={weightUnit}
  onChange={handleWeightChange}
/>

<!-- Distance input -->
<UnitNumberEditor 
  placeholder="Enter distance"
  units={distanceUnits}
  precision={2}
  bind:value={distance}
  bind:unit={distanceUnit}
  onChange={handleDistanceChange}
/>
```

## Advanced Usage

### Unit Conversion
```svelte
<script lang="ts">
  let inputValue: number | null = null;
  let inputUnit: string = 'kg';
  let baseValue: number | null = null; // Base unit value
  
  const convertToBase = (value: number, unit: string, units: UnitOption[]): number => {
    const unitOption = units.find(u => u.code === unit);
    return value * (unitOption?.ratio || 1);
  };
  
  const handleValueChange = ({value, unit}: UnitValue): void => {
    inputValue = value;
    inputUnit = unit;
    
    if (value !== null) {
      baseValue = convertToBase(value, unit, weightUnits);
      console.log(`Base value: ${baseValue} kg`);
    } else {
      baseValue = null;
    }
  };
</script>

<UnitNumberEditor 
  placeholder="Enter weight"
  units={weightUnits}
  precision={3}
  bind:value={inputValue}
  bind:unit={inputUnit}
  onChange={handleValueChange}
/>

{#if baseValue !== null}
  <p>Equals: {baseValue.toFixed(3)} kg</p>
{/if}
```

## Best Practices

### 1. Set Reasonable Precision
```svelte
<!-- Weight: 3 decimal places -->
<UnitNumberEditor units={weightUnits} precision={3} />

<!-- Distance: 2 decimal places -->
<UnitNumberEditor units={distanceUnits} precision={2} />

<!-- Temperature: 1 decimal place -->
<UnitNumberEditor units={temperatureUnits} precision={1} />
```

### 2. Provide Common Units
```svelte
<script lang="ts">
  // Sorted by usage frequency
  const lengthUnits: UnitOption[] = [
    { code: 'm', text: 'Meter', ratio: 1 },      // Most common
    { code: 'cm', text: 'Centimeter', ratio: 0.01 }, // Common
    { code: 'mm', text: 'Millimeter', ratio: 0.001 }, // Common
    { code: 'km', text: 'Kilometer', ratio: 1000 },  // Less common
    { code: 'in', text: 'Inch', ratio: 0.0254 } // Special needs
  ];
</script>
```