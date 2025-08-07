# UnitNumberEditor 组件

带单位的数字输入组件，允许用户选择不同的计量单位。

## 类型定义

```typescript
interface UnitOption {
  code: string;
  text: string;
  ratio: number; // 与基础单位的换算比例
}
```

## 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | 外观变体 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `readonly` | `boolean` | `false` | 是否只读 |
| `compact` | `boolean` | `false` | 是否紧凑模式 |
| `value` | `number \| null` | `null` | 数值 |
| `unit` | `string` | `''` | 当前选择的单位代码 |
| `units` | `UnitOption[]` | `[]` | 可用单位选项 |
| `placeholder` | `string` | `''` | 占位符文本 |
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | 显示模式 |
| `precision` | `number \| null` | `null` | 小数位数 |
| `style` | `string` | `''` | 自定义样式 |
| `onChange` | `OnChangeHandler<{value: number, unit: string}>` | - | 值变化回调 |

## 使用示例

```svelte
<script lang="ts">
  import { UnitNumberEditor, type UnitOption } from '@ticatec/uniface-element';
  
  // 重量单位选项
  const weightUnits: UnitOption[] = [
    { code: 'kg', text: '千克', ratio: 1 },
    { code: 'g', text: '克', ratio: 0.001 },
    { code: 'lb', text: '磅', ratio: 0.453592 }
  ];
  
  // 距离单位选项
  const distanceUnits: UnitOption[] = [
    { code: 'm', text: '米', ratio: 1 },
    { code: 'cm', text: '厘米', ratio: 0.01 },
    { code: 'km', text: '公里', ratio: 1000 },
    { code: 'in', text: '英寸', ratio: 0.0254 }
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
    console.log(`重量: ${value} ${unit}`);
  };
  
  const handleDistanceChange = ({value, unit}: UnitValue): void => {
    distance = value;
    distanceUnit = unit;
    console.log(`距离: ${value} ${unit}`);
  };
</script>

<!-- 重量输入 -->
<UnitNumberEditor 
  placeholder="请输入重量"
  units={weightUnits}
  precision={2}
  bind:value={weight}
  bind:unit={weightUnit}
  onChange={handleWeightChange}
/>

<!-- 距离输入 -->
<UnitNumberEditor 
  placeholder="请输入距离"
  units={distanceUnits}
  precision={2}
  bind:value={distance}
  bind:unit={distanceUnit}
  onChange={handleDistanceChange}
/>
```

## 高级用法

### 单位换算
```svelte
<script lang="ts">
  let inputValue: number | null = null;
  let inputUnit: string = 'kg';
  let baseValue: number | null = null; // 基础单位值
  
  const convertToBase = (value: number, unit: string, units: UnitOption[]): number => {
    const unitOption = units.find(u => u.code === unit);
    return value * (unitOption?.ratio || 1);
  };
  
  const handleValueChange = ({value, unit}: UnitValue): void => {
    inputValue = value;
    inputUnit = unit;
    
    if (value !== null) {
      baseValue = convertToBase(value, unit, weightUnits);
      console.log(`基础值: ${baseValue} kg`);
    } else {
      baseValue = null;
    }
  };
</script>

<UnitNumberEditor 
  placeholder="请输入重量"
  units={weightUnits}
  precision={3}
  bind:value={inputValue}
  bind:unit={inputUnit}
  onChange={handleValueChange}
/>

{#if baseValue !== null}
  <p>等于: {baseValue.toFixed(3)} kg</p>
{/if}
```

## 最佳实践

### 1. 合理设置精度
```svelte
<!-- 重量：3位小数 -->
<UnitNumberEditor units={weightUnits} precision={3} />

<!-- 距离：2位小数 -->
<UnitNumberEditor units={distanceUnits} precision={2} />

<!-- 温度：1位小数 -->
<UnitNumberEditor units={temperatureUnits} precision={1} />
```

### 2. 提供常用单位
```svelte
<script lang="ts">
  // 按使用频率排序
  const lengthUnits: UnitOption[] = [
    { code: 'm', text: '米', ratio: 1 },      // 最常用
    { code: 'cm', text: '厘米', ratio: 0.01 }, // 常用
    { code: 'mm', text: '毫米', ratio: 0.001 }, // 常用
    { code: 'km', text: '公里', ratio: 1000 },  // 较少用
    { code: 'in', text: '英寸', ratio: 0.0254 } // 特殊需求
  ];
</script>
```