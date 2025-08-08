# NumberRange 数值范围组件

一个数值范围输入组件，允许用户指定两个数字之间的范围，通常用于按数值条件过滤数据，如价格范围、年龄范围或数量过滤器。

## 概述

NumberRange 组件为选择数值范围提供了直观的界面，具有内置验证、自动范围约束和清除功能。它具有两个相互连接的数字输入框，可以智能地相互验证，确保"从"值始终小于或等于"到"值。非常适合搜索过滤器、数据查询和任何需要数值范围选择的应用程序。

## 安装

```typescript
import NumberRange from '@ticatec/uniface-element/NumberRange';
import type { OnChangeHandler } from '@ticatec/uniface-element/NumberRange';
```

## 基本用法

```svelte
<script lang="ts">
  import NumberRange from '@ticatec/uniface-element/NumberRange';

  let fromValue: number = 0;
  let toValue: number = 100;
</script>

<NumberRange 
  bind:fromValue 
  bind:toValue 
  variant="outlined"
/>
```

## 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | 视觉样式变体 |
| `compact` | `boolean` | `false` | 启用紧凑布局以适应密集表单 |
| `class` | `string` | `''` | 额外的 CSS 类名 |
| `style` | `string` | `''` | 自定义内联样式 |
| `min` | `number \| null` | `null` | 全局最小允许值 |
| `max` | `number \| null` | `null` | 全局最大允许值 |
| `fromValue` | `number` | - | 范围的起始值（可绑定） |
| `toValue` | `number` | - | 范围的结束值（可绑定） |
| `allowNegative` | `boolean` | `false` | 在输入框中允许负数 |

## 功能特性

- **智能验证**：自动验证范围约束（从 ≤ 到）
- **跨字段限制**："从"值设置"到"的最大值，"到"值设置"从"的最小值
- **清除功能**：当存在值时显示的内置清除按钮
- **自动聚焦**：清除值后聚焦第一个输入框
- **负数支持**：可选支持负数范围
- **一致样式**：通过变体支持与其他表单组件匹配

## 类型定义

```typescript
/**
 * 变更事件处理器类型
 */
type OnChangeHandler<T> = (value: T) => void;
```

## 使用示例

### 价格范围过滤器

```svelte
<script lang="ts">
  import NumberRange from '@ticatec/uniface-element/NumberRange';

  let minPrice: number = 0;
  let maxPrice: number = 1000;

  // 响应式语句处理价格范围变化
  $: if (minPrice !== undefined && maxPrice !== undefined) {
    filterProductsByPrice(minPrice, maxPrice);
  }

  function filterProductsByPrice(min: number, max: number) {
    console.log(`过滤产品价格范围：￥${min} 到 ￥${max}`);
    // 在此实现过滤逻辑
  }

  function resetPriceFilter() {
    minPrice = 0;
    maxPrice = 1000;
  }
</script>

<div class="price-filter">
  <h3>价格范围</h3>
  
  <NumberRange
    bind:fromValue={minPrice}
    bind:toValue={maxPrice}
    variant="outlined"
    min={0}
    max={10000}
    style="width: 300px;"
  />
  
  <div class="price-display">
    <span class="price-label">
      ￥{minPrice?.toLocaleString() || 0} - ￥{maxPrice?.toLocaleString() || 0}
    </span>
  </div>
  
  <button class="reset-btn" on:click={resetPriceFilter}>
    重置过滤器
  </button>
</div>

<style>
  .price-filter {
    padding: 16px;
    background: #f8f9fa;
    border-radius: 8px;
    max-width: 400px;
  }
  
  .price-filter h3 {
    margin: 0 0 12px 0;
    color: #333;
    font-size: 1.1rem;
  }
  
  .price-display {
    margin: 12px 0;
    text-align: center;
  }
  
  .price-label {
    font-weight: 500;
    color: #007bff;
    font-size: 1.1rem;
  }
  
  .reset-btn {
    width: 100%;
    padding: 8px 16px;
    background: #6c757d;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 8px;
  }
  
  .reset-btn:hover {
    background: #5a6268;
  }
</style>
```

### 年龄范围选择器

```svelte
<script lang="ts">
  import NumberRange from '@ticatec/uniface-element/NumberRange';

  let minAge: number = 18;
  let maxAge: number = 65;
  let selectedProfiles = [];

  // 按年龄过滤用户资料的函数
  function filterProfilesByAge(min: number, max: number) {
    // 模拟资料数据
    const allProfiles = [
      { id: 1, name: '张小明', age: 25 },
      { id: 2, name: '李小红', age: 35 },
      { id: 3, name: '王小刚', age: 45 },
      { id: 4, name: '赵小丽', age: 28 },
      { id: 5, name: '陈小华', age: 52 }
    ];

    selectedProfiles = allProfiles.filter(profile => 
      profile.age >= min && profile.age <= max
    );
  }

  // 初始加载和值变化时进行过滤
  $: filterProfilesByAge(minAge || 0, maxAge || 100);
</script>

<div class="age-filter-demo">
  <div class="filter-section">
    <h3>按年龄范围过滤</h3>
    
    <NumberRange
      bind:fromValue={minAge}
      bind:toValue={maxAge}
      variant="filled"
      min={16}
      max={100}
      style="width: 250px;"
      compact={true}
    />
    
    <div class="age-summary">
      <p>显示年龄 {minAge} 到 {maxAge} 岁的资料</p>
      <p class="result-count">找到 {selectedProfiles.length} 个资料</p>
    </div>
  </div>
  
  <div class="results-section">
    <h4>匹配的资料</h4>
    {#if selectedProfiles.length > 0}
      <div class="profiles-grid">
        {#each selectedProfiles as profile}
          <div class="profile-card">
            <div class="profile-name">{profile.name}</div>
            <div class="profile-age">年龄: {profile.age}</div>
          </div>
        {/each}
      </div>
    {:else}
      <p class="no-results">没有资料匹配所选年龄范围</p>
    {/if}
  </div>
</div>

<style>
  .age-filter-demo {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .filter-section {
    background: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    margin-bottom: 20px;
  }
  
  .filter-section h3 {
    margin: 0 0 16px 0;
    color: #333;
  }
  
  .age-summary {
    margin-top: 12px;
    padding: 12px;
    background: #e3f2fd;
    border-radius: 4px;
    text-align: center;
  }
  
  .result-count {
    font-weight: 600;
    color: #1976d2;
    margin: 4px 0 0 0;
  }
  
  .results-section h4 {
    margin: 0 0 16px 0;
    color: #333;
  }
  
  .profiles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
  }
  
  .profile-card {
    padding: 16px;
    background: #f8f9fa;
    border-radius: 6px;
    border-left: 4px solid #007bff;
  }
  
  .profile-name {
    font-weight: 500;
    color: #333;
    margin-bottom: 4px;
  }
  
  .profile-age {
    color: #666;
    font-size: 0.9rem;
  }
  
  .no-results {
    text-align: center;
    color: #666;
    font-style: italic;
    padding: 40px 20px;
  }
</style>
```

### 库存范围查询

```svelte
<script lang="ts">
  import NumberRange from '@ticatec/uniface-element/NumberRange';

  let minQuantity: number = 0;
  let maxQuantity: number = 500;
  
  // 模拟库存数据
  let inventoryItems = [
    { id: 'A001', name: 'Widget Alpha', quantity: 45, category: '电子产品' },
    { id: 'B002', name: 'Gadget Beta', quantity: 120, category: '工具' },
    { id: 'C003', name: 'Device Gamma', quantity: 8, category: '电子产品' },
    { id: 'D004', name: 'Tool Delta', quantity: 300, category: '工具' },
    { id: 'E005', name: 'Part Epsilon', quantity: 750, category: '配件' }
  ];

  let filteredItems = [];

  function applyQuantityFilter() {
    filteredItems = inventoryItems.filter(item =>
      item.quantity >= (minQuantity || 0) && 
      item.quantity <= (maxQuantity || Infinity)
    );
  }

  // 当范围变化时应用过滤器
  $: {
    minQuantity, maxQuantity;
    applyQuantityFilter();
  }

  function exportResults() {
    const csvContent = [
      'ID,名称,数量,类别',
      ...filteredItems.map(item => 
        `${item.id},${item.name},${item.quantity},${item.category}`
      )
    ].join('\n');
    
    console.log('导出数据:', csvContent);
    alert('数据已导出到控制台');
  }

  // 预定义范围预设
  const presets = [
    { label: '低库存 (0-50)', min: 0, max: 50 },
    { label: '中等库存 (51-200)', min: 51, max: 200 },
    { label: '高库存 (201-500)', min: 201, max: 500 },
    { label: '库存过多 (500+)', min: 500, max: 1000 }
  ];

  function applyPreset(preset) {
    minQuantity = preset.min;
    maxQuantity = preset.max;
  }
</script>

<div class="inventory-query">
  <header class="query-header">
    <h2>库存数量过滤器</h2>
    <p>按数量范围过滤库存物品</p>
  </header>

  <div class="filter-controls">
    <div class="range-input-section">
      <label>数量范围：</label>
      <NumberRange
        bind:fromValue={minQuantity}
        bind:toValue={maxQuantity}
        variant="outlined"
        min={0}
        max={1000}
        style="width: 280px;"
      />
    </div>

    <div class="presets-section">
      <label>快速预设：</label>
      <div class="preset-buttons">
        {#each presets as preset}
          <button 
            class="preset-btn"
            on:click={() => applyPreset(preset)}
          >
            {preset.label}
          </button>
        {/each}
      </div>
    </div>
  </div>

  <div class="results-section">
    <div class="results-header">
      <h3>结果 ({filteredItems.length} 项)</h3>
      {#if filteredItems.length > 0}
        <button class="export-btn" on:click={exportResults}>
          导出 CSV
        </button>
      {/if}
    </div>

    <div class="results-table">
      {#if filteredItems.length > 0}
        <table>
          <thead>
            <tr>
              <th>物品 ID</th>
              <th>名称</th>
              <th>数量</th>
              <th>类别</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            {#each filteredItems as item}
              <tr>
                <td class="item-id">{item.id}</td>
                <td class="item-name">{item.name}</td>
                <td class="item-quantity">{item.quantity}</td>
                <td class="item-category">{item.category}</td>
                <td class="item-status">
                  <span class="status-badge status-{item.quantity < 50 ? 'low' : item.quantity < 200 ? 'medium' : 'high'}">
                    {item.quantity < 50 ? '低' : item.quantity < 200 ? '中' : '高'}
                  </span>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      {:else}
        <div class="no-results">
          <p>在指定数量范围内未找到库存物品。</p>
          <p class="suggestion">尝试调整范围或使用预设过滤器。</p>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .inventory-query {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
  }

  .query-header {
    text-align: center;
    margin-bottom: 30px;
  }

  .query-header h2 {
    color: #333;
    margin: 0 0 8px 0;
  }

  .query-header p {
    color: #666;
    margin: 0;
  }

  .filter-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    align-items: flex-end;
    margin-bottom: 30px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
  }

  .range-input-section,
  .presets-section {
    flex: 1;
    min-width: 250px;
  }

  .range-input-section label,
  .presets-section label {
    display: block;
    font-weight: 500;
    margin-bottom: 8px;
    color: #333;
  }

  .preset-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .preset-btn {
    padding: 6px 12px;
    background: #e9ecef;
    border: 1px solid #ced4da;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.2s;
  }

  .preset-btn:hover {
    background: #dee2e6;
    border-color: #adb5bd;
  }

  .results-section {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    overflow: hidden;
  }

  .results-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: #f8f9fa;
    border-bottom: 1px solid #dee2e6;
  }

  .results-header h3 {
    margin: 0;
    color: #333;
  }

  .export-btn {
    padding: 8px 16px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.875rem;
  }

  .export-btn:hover {
    background: #0056b3;
  }

  .results-table {
    padding: 20px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    text-align: left;
    padding: 12px;
    border-bottom: 1px solid #dee2e6;
  }

  th {
    font-weight: 600;
    color: #333;
    background: #f8f9fa;
  }

  .item-id {
    font-family: monospace;
    font-weight: 500;
  }

  .item-quantity {
    text-align: right;
    font-weight: 500;
  }

  .status-badge {
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .status-low {
    background: #ffebee;
    color: #c62828;
  }

  .status-medium {
    background: #fff3e0;
    color: #ef6c00;
  }

  .status-high {
    background: #e8f5e8;
    color: #2e7d32;
  }

  .no-results {
    text-align: center;
    padding: 60px 20px;
    color: #666;
  }

  .suggestion {
    font-size: 0.9rem;
    color: #888;
    margin-top: 8px;
  }

  @media (max-width: 768px) {
    .filter-controls {
      flex-direction: column;
      align-items: stretch;
    }
    
    .preset-buttons {
      justify-content: center;
    }
    
    .results-header {
      flex-direction: column;
      gap: 12px;
      align-items: stretch;
    }
    
    table {
      font-size: 0.875rem;
    }
    
    th, td {
      padding: 8px;
    }
  }
</style>
```

## 样式

NumberRange 组件使用以下 CSS 类：

```css
.uniface-range-editor {
  /* 主要范围容器 */
  display: flex;
  align-items: center;
  gap: 8px;
}

.uniface-range-editor .range-divider {
  /* 从/到输入框之间的分隔符 */
  color: var(--uniface-editor-border-color, #dee2e6);
}

.uniface-range-editor .action-icon {
  /* 清除按钮样式 */
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.uniface-range-editor .action-icon:hover {
  opacity: 1;
}
```

## API 参考

### NumberRange 组件属性

```typescript
interface NumberRangeProps {
  variant?: '' | 'plain' | 'outlined' | 'filled';  // 视觉样式变体
  compact?: boolean;                                // 紧凑布局模式
  class?: string;                                   // CSS 类名
  style?: string;                                   // 自定义内联样式
  min?: number | null;                              // 全局最小值
  max?: number | null;                              // 全局最大值
  fromValue: number;                                // 范围起始值
  toValue: number;                                  // 范围结束值
  allowNegative?: boolean;                          // 允许负数
}
```

## 最佳实践

1. **验证** - 始终绑定 `fromValue` 和 `toValue` 以实现正确的范围验证
2. **限制** - 设置适当的 `min` 和 `max` 值以引导用户输入
3. **用户反馈** - 提供所选范围值的清晰指示
4. **可访问性** - 确保足够的颜色对比度和键盘导航
5. **移动支持** - 在触摸设备上测试输入行为
6. **数据类型** - 在响应式语句中优雅处理 undefined/null 值
7. **性能** - 对大数据集的过滤操作进行防抖处理
8. **清除功能** - 依赖内置清除按钮以保持一致的用户体验