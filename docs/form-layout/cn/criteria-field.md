# CriteriaField 组件

条件筛选字段组件，提供带标签的筛选字段容器，专门用于构建条件筛选表单。

## 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `label` | `string` | `'Label'` | 字段标签文本 |
| `style` | `string` | `''` | 自定义样式 |
| `label$style` | `string` | `''` | 标签样式 |
| `size` | `'' \| 'x15' \| 'x20' \| 'x25' \| 'x30' \| 'x35' \| 'x40'` | `''` | 字段大小 |
| `labelSuffix` | `string` | `':'` | 标签后缀 |
| `class` | `string` | `''` | CSS类名 |

## 使用示例

### 基础筛选字段

```svelte
<script lang="ts">
  import { CriteriaField, TextEditor } from '@ticatec/uniface-element';
  
  let searchCriteria = {
    name: '',
    email: '',
    department: ''
  };
</script>

<CriteriaField size="x20" label="姓名">
  <TextEditor 
    variant="outlined" 
    bind:value={searchCriteria.name} 
    placeholder="输入姓名进行搜索"
  />
</CriteriaField>

<CriteriaField size="x25" label="邮箱">
  <TextEditor 
    variant="outlined" 
    bind:value={searchCriteria.email} 
    placeholder="输入邮箱地址"
  />
</CriteriaField>

<CriteriaField size="x30" label="部门">
  <TextEditor 
    variant="outlined" 
    bind:value={searchCriteria.department} 
    placeholder="输入部门名称"
  />
</CriteriaField>
```

### 不同尺寸的筛选字段

```svelte
<script lang="ts">
  import { CriteriaField, TextEditor, NumberRange, DateRange } from '@ticatec/uniface-element';
  
  interface SearchCriteria {
    name: string;
    ageFrom: number | null;
    ageTo: number | null;
    dobFrom: Date | null;
    dobTo: Date | null;
    department: string;
    position: string;
  }
  
  let criteria: SearchCriteria = {
    name: '',
    ageFrom: null,
    ageTo: null,
    dobFrom: null,
    dobTo: null,
    department: '',
    position: ''
  };
</script>

<div class="criteria-container">
  <h3>员工搜索条件</h3>
  
  <!-- 小尺寸字段 -->
  <CriteriaField size="x15" label="ID">
    <TextEditor variant="outlined" bind:value={criteria.name} />
  </CriteriaField>
  
  <!-- 标准尺寸字段 -->
  <CriteriaField size="x20" label="姓名">
    <TextEditor 
      variant="outlined" 
      bind:value={criteria.name}
      placeholder="输入完整姓名或使用 * 通配符"
    />
  </CriteriaField>
  
  <!-- 中等尺寸字段 -->
  <CriteriaField size="x25" label="年龄范围">
    <NumberRange 
      variant="outlined"
      bind:fromValue={criteria.ageFrom}
      bind:toValue={criteria.ageTo}
      min={18}
      max={65}
    />
  </CriteriaField>
  
  <!-- 较大尺寸字段 -->
  <CriteriaField size="x30" label="出生日期">
    <DateRange 
      variant="outlined"
      bind:fromValue={criteria.dobFrom}
      bind:toValue={criteria.dobTo}
    />
  </CriteriaField>
  
  <!-- 大尺寸字段 -->
  <CriteriaField size="x35" label="部门">
    <TextEditor 
      variant="outlined" 
      bind:value={criteria.department}
      placeholder="输入部门名称"
    />
  </CriteriaField>
  
  <!-- 最大尺寸字段 -->
  <CriteriaField size="x40" label="职位">
    <TextEditor 
      variant="outlined" 
      bind:value={criteria.position}
      placeholder="输入职位名称"
    />
  </CriteriaField>
</div>

<style>
  .criteria-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .criteria-container h3 {
    margin-bottom: 20px;
    color: #495057;
  }
</style>
```

### 自定义标签样式

```svelte
<script lang="ts">
  import { CriteriaField, TextEditor, OptionsSelect } from '@ticatec/uniface-element';
  
  let searchData = {
    keyword: '',
    category: '',
    status: ''
  };
  
  const categoryOptions = [
    { code: 'all', text: '全部分类' },
    { code: 'electronics', text: '电子产品' },
    { code: 'clothing', text: '服装' },
    { code: 'books', text: '图书' }
  ];
  
  const statusOptions = [
    { code: 'active', text: '活跃' },
    { code: 'inactive', text: '非活跃' },
    { code: 'pending', text: '待审核' }
  ];
</script>

<div class="search-form">
  <h3>产品搜索</h3>
  
  <!-- 重要字段标签 -->
  <CriteriaField 
    size="x25" 
    label="关键词" 
    label$style="color: #dc3545; font-weight: 600;"
    labelSuffix="*："
  >
    <TextEditor 
      variant="outlined" 
      bind:value={searchData.keyword}
      placeholder="输入产品关键词"
    />
  </CriteriaField>
  
  <!-- 普通字段标签 -->
  <CriteriaField 
    size="x30" 
    label="产品分类"
    label$style="color: #28a745; font-weight: 500;"
  >
    <OptionsSelect 
      variant="outlined"
      options={categoryOptions}
      keyField="code"
      textField="text"
      bind:value={searchData.category}
    />
  </CriteriaField>
  
  <!-- 状态字段标签 -->
  <CriteriaField 
    size="x25" 
    label="状态"
    label$style="color: #6f42c1; font-style: italic;"
    labelSuffix="："
  >
    <OptionsSelect 
      variant="outlined"
      options={statusOptions}
      keyField="code"
      textField="text"
      bind:value={searchData.status}
    />
  </CriteriaField>
</div>

<style>
  .search-form {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
  }
  
  .search-form h3 {
    margin-bottom: 20px;
    color: #495057;
    text-align: center;
  }
</style>
```

### 长标签文本处理

```svelte
<script lang="ts">
  import { CriteriaField, TextEditor, DateRange } from '@ticatec/uniface-element';
  
  let advancedCriteria = {
    employeeIdOrName: '',
    workStartDate: null as Date | null,
    workEndDate: null as Date | null,
    projectName: ''
  };
</script>

<div class="advanced-search">
  <h3>高级搜索表单</h3>
  
  <!-- 长标签自动省略 -->
  <CriteriaField 
    size="x25" 
    label="员工ID或姓名（支持模糊搜索和通配符）"
  >
    <TextEditor 
      variant="outlined" 
      bind:value={advancedCriteria.employeeIdOrName}
      placeholder="输入员工ID或姓名"
    />
  </CriteriaField>
  
  <!-- 长标签在较大容器中显示 -->
  <CriteriaField 
    size="x35" 
    label="工作日期范围（包含入职和离职时间筛选）"
  >
    <DateRange 
      variant="outlined"
      bind:fromValue={advancedCriteria.workStartDate}
      bind:toValue={advancedCriteria.workEndDate}
    />
  </CriteriaField>
  
  <!-- 自定义标签样式避免省略 -->
  <CriteriaField 
    size="x30" 
    label="项目名称或编号"
    label$style="font-size: 12px; line-height: 1.2; white-space: normal;"
  >
    <TextEditor 
      variant="outlined" 
      bind:value={advancedCriteria.projectName}
      placeholder="输入项目相关信息"
    />
  </CriteriaField>
</div>

<style>
  .advanced-search {
    max-width: 700px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .advanced-search h3 {
    margin-bottom: 25px;
    color: #495057;
    border-bottom: 2px solid #007bff;
    padding-bottom: 10px;
  }
</style>
```

### 与其他组件组合使用

```svelte
<script lang="ts">
  import { CriteriaField, TextEditor, NumberRange, OptionsSelect, CheckBox, DatePicker } from '@ticatec/uniface-element';
  
  interface ProductSearchCriteria {
    name: string;
    category: string;
    priceFrom: number | null;
    priceTo: number | null;
    inStock: boolean;
    releaseDate: Date | null;
    brand: string;
  }
  
  let productCriteria: ProductSearchCriteria = {
    name: '',
    category: '',
    priceFrom: null,
    priceTo: null,
    inStock: false,
    releaseDate: null,
    brand: ''
  };
  
  const categories = [
    { code: '', text: '全部' },
    { code: 'electronics', text: '电子产品' },
    { code: 'books', text: '图书' },
    { code: 'clothing', text: '服装' }
  ];
  
  const brands = [
    { code: '', text: '全部品牌' },
    { code: 'apple', text: '苹果' },
    { code: 'samsung', text: '三星' },
    { code: 'sony', text: '索尼' }
  ];
  
  const handleSearch = (): void => {
    console.log('搜索条件：', productCriteria);
  };
  
  const handleReset = (): void => {
    productCriteria = {
      name: '',
      category: '',
      priceFrom: null,
      priceTo: null,
      inStock: false,
      releaseDate: null,
      brand: ''
    };
  };
</script>

<div class="product-search-form">
  <h2>产品搜索</h2>
  
  <div class="criteria-grid">
    <CriteriaField size="x30" label="产品名称">
      <TextEditor 
        variant="outlined" 
        bind:value={productCriteria.name}
        placeholder="输入产品名称关键词"
      />
    </CriteriaField>
    
    <CriteriaField size="x25" label="产品分类">
      <OptionsSelect 
        variant="outlined"
        options={categories}
        keyField="code"
        textField="text"
        bind:value={productCriteria.category}
      />
    </CriteriaField>
    
    <CriteriaField size="x30" label="价格范围">
      <NumberRange 
        variant="outlined"
        bind:fromValue={productCriteria.priceFrom}
        bind:toValue={productCriteria.priceTo}
        min={0}
        precision={2}
      />
    </CriteriaField>
    
    <CriteriaField size="x25" label="品牌">
      <OptionsSelect 
        variant="outlined"
        options={brands}
        keyField="code"
        textField="text"
        bind:value={productCriteria.brand}
      />
    </CriteriaField>
    
    <CriteriaField size="x25" label="发布日期">
      <DatePicker 
        variant="outlined"
        bind:value={productCriteria.releaseDate}
      />
    </CriteriaField>
    
    <CriteriaField size="x20" label="库存状态">
      <CheckBox 
        label="仅显示有库存商品"
        bind:value={productCriteria.inStock}
      />
    </CriteriaField>
  </div>
  
  <div class="search-actions">
    <button type="button" class="btn-secondary" on:click={handleReset}>
      重置
    </button>
    <button type="button" class="btn-primary" on:click={handleSearch}>
      搜索
    </button>
  </div>
</div>

<style>
  .product-search-form {
    max-width: 900px;
    margin: 0 auto;
    padding: 30px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .product-search-form h2 {
    margin-bottom: 30px;
    color: #333;
    text-align: center;
    font-size: 24px;
  }
  
  .criteria-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .search-actions {
    display: flex;
    gap: 15px;
    justify-content: center;
    padding-top: 20px;
    border-top: 1px solid #dee2e6;
  }
  
  .btn-primary, .btn-secondary {
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .btn-primary {
    background: #007bff;
    color: white;
  }
  
  .btn-secondary {
    background: #6c757d;
    color: white;
  }
  
  .btn-primary:hover {
    background: #0056b3;
    transform: translateY(-1px);
  }
  
  .btn-secondary:hover {
    background: #545b62;
    transform: translateY(-1px);
  }
</style>
```

## 尺寸说明

| 尺寸 | 描述 | 适用场景 |
|------|------|----------|
| `''` (默认) | 自适应宽度 | 灵活布局 |
| `x15` | 最小宽度 | ID、编号等短字段 |
| `x20` | 小宽度 | 姓名、代码等短文本 |
| `x25` | 标准宽度 | 常用文本字段 |
| `x30` | 中等宽度 | 较长文本或范围选择 |
| `x35` | 较大宽度 | 复杂输入控件 |
| `x40` | 最大宽度 | 长文本或复合控件 |

## 标签后缀

```svelte
<!-- 默认使用冒号 -->
<CriteriaField label="姓名">
  <TextEditor />
</CriteriaField>

<!-- 自定义后缀 -->
<CriteriaField label="必填字段" labelSuffix="*：">
  <TextEditor />
</CriteriaField>

<!-- 无后缀 -->
<CriteriaField label="选项" labelSuffix="">
  <CheckBox label="启用" />
</CriteriaField>
```

## 样式定制

```css
/* 自定义筛选字段容器 */
:global(.uniface-filter-field) {
  margin-bottom: 16px;
}

/* 字段容器样式 */
:global(.uniface-filter-field .field-container) {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* 标签样式 */
:global(.uniface-filter-field .field-label) {
  flex-shrink: 0;
  font-weight: 500;
  color: #495057;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 字段内容样式 */
:global(.uniface-filter-field .field) {
  flex: 1;
  min-width: 0;
}

/* 尺寸定制 */
:global(.uniface-filter-field.x20 .field-label) {
  width: 120px;
}

:global(.uniface-filter-field.x30 .field-label) {
  width: 150px;
}

/* 响应式样式 */
@media (max-width: 768px) {
  :global(.uniface-filter-field .field-container) {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
  
  :global(.uniface-filter-field .field-label) {
    width: auto !important;
  }
}
```

## 最佳实践

### 1. 合理选择字段尺寸
```svelte
<!-- 短字段使用小尺寸 -->
<CriteriaField size="x15" label="ID">
  <TextEditor />
</CriteriaField>

<!-- 标准字段使用中等尺寸 -->
<CriteriaField size="x25" label="姓名">
  <TextEditor />
</CriteriaField>

<!-- 复杂控件使用大尺寸 -->
<CriteriaField size="x35" label="日期范围">
  <DateRange />
</CriteriaField>
```

### 2. 标签文本处理
```svelte
<!-- 简洁明确的标签 -->
<CriteriaField label="姓名">
  <TextEditor />
</CriteriaField>

<!-- 长标签考虑换行显示 -->
<CriteriaField 
  label="员工姓名或工号"
  label$style="white-space: normal; line-height: 1.2;"
>
  <TextEditor />
</CriteriaField>
```

### 3. 筛选表单布局
```svelte
<div class="criteria-form">
  <div class="criteria-row">
    <CriteriaField size="x25" label="关键词">
      <TextEditor />
    </CriteriaField>
    
    <CriteriaField size="x25" label="分类">
      <OptionsSelect />
    </CriteriaField>
  </div>
  
  <div class="criteria-actions">
    <button>搜索</button>
    <button>重置</button>
  </div>
</div>
```

## 组件优势

1. **专业筛选布局** - 专为条件筛选表单设计的布局组件
2. **灵活尺寸控制** - 多种预设尺寸，适应不同字段需求
3. **标签样式定制** - 支持标签文本和样式的完全定制
4. **响应式友好** - 在不同屏幕尺寸下自动适应布局
5. **易于集成** - 与各种表单控件完美配合使用
6. **一致性设计** - 统一的视觉样式，提升用户体验