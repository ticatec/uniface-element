# GridForm 组件

网格表单布局组件，提供基于CSS Grid的表单容器，支持灵活的网格布局和字段排列。

## 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `style` | `string` | `''` | 自定义样式 |
| `columns` | `number` | `6` | 网格列数 |
| `fieldLayout` | `'vertical' \| 'horizontal'` | `'vertical'` | 字段布局方向 |

## 使用示例

### 基础网格表单

```svelte
<script lang="ts">
  import { GridForm, FormField, TextEditor, NumberEditor, OptionsSelect } from '@ticatec/uniface-element';
  
  interface UserProfile {
    firstName: string;
    lastName: string;
    age: number | null;
    gender: string;
    email: string;
    phone: string;
  }
  
  let userProfile: UserProfile = {
    firstName: '',
    lastName: '',
    age: null,
    gender: '',
    email: '',
    phone: ''
  };
  
  const genderOptions = [
    { code: 'male', text: '男' },
    { code: 'female', text: '女' },
    { code: 'other', text: '其他' }
  ];
  
  const handleSubmit = (): void => {
    console.log('提交用户信息：', userProfile);
  };
</script>

<!-- 6列网格布局 -->
<GridForm columns={6} fieldLayout="vertical">
  <FormField label="姓" style="grid-column: span 2;">
    <TextEditor 
      placeholder="请输入姓氏"
      bind:value={userProfile.firstName}
    />
  </FormField>
  
  <FormField label="名" style="grid-column: span 2;">
    <TextEditor 
      placeholder="请输入名字"
      bind:value={userProfile.lastName}
    />
  </FormField>
  
  <FormField label="年龄" style="grid-column: span 2;">
    <NumberEditor 
      placeholder="请输入年龄"
      min={1}
      max={120}
      bind:value={userProfile.age}
    />
  </FormField>
  
  <FormField label="性别" style="grid-column: span 3;">
    <OptionsSelect 
      options={genderOptions}
      keyField="code"
      textField="text"
      bind:value={userProfile.gender}
    />
  </FormField>
  
  <FormField label="电话" style="grid-column: span 3;">
    <TextEditor 
      placeholder="请输入电话号码"
      bind:value={userProfile.phone}
    />
  </FormField>
  
  <FormField label="邮箱" style="grid-column: span 6;">
    <TextEditor 
      placeholder="请输入邮箱地址"
      bind:value={userProfile.email}
    />
  </FormField>
  
  <div style="grid-column: span 6;" class="form-actions">
    <button type="button" on:click={handleSubmit}>
      提交
    </button>
  </div>
</GridForm>

<style>
  .form-actions {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  
  .form-actions button {
    padding: 10px 24px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .form-actions button:hover {
    background: #0056b3;
  }
</style>
```

### 复杂网格表单布局

```svelte
<script lang="ts">
  import { GridForm, FormField, TextEditor, NumberEditor, DatePicker, OptionsSelect, CheckBox } from '@ticatec/uniface-element';
  
  interface ProductForm {
    basicInfo: {
      name: string;
      category: string;
      brand: string;
      model: string;
    };
    pricing: {
      cost: number | null;
      price: number | null;
      discount: number | null;
    };
    inventory: {
      stock: number | null;
      minStock: number | null;
      maxStock: number | null;
    };
    details: {
      description: string;
      specifications: string;
      launchDate: Date | null;
    };
    settings: {
      isActive: boolean;
      isFeatured: boolean;
      allowBackorder: boolean;
    };
  }
  
  let productData: ProductForm = {
    basicInfo: {
      name: '',
      category: '',
      brand: '',
      model: ''
    },
    pricing: {
      cost: null,
      price: null,
      discount: null
    },
    inventory: {
      stock: null,
      minStock: null,
      maxStock: null
    },
    details: {
      description: '',
      specifications: '',
      launchDate: null
    },
    settings: {
      isActive: true,
      isFeatured: false,
      allowBackorder: false
    }
  };
  
  const categoryOptions = [
    { code: 'electronics', text: '电子产品' },
    { code: 'clothing', text: '服装' },
    { code: 'books', text: '图书' },
    { code: 'home', text: '家居用品' }
  ];
  
  const validateForm = (): boolean => {
    return productData.basicInfo.name.length > 0 &&
           productData.basicInfo.category.length > 0 &&
           productData.pricing.price !== null;
  };
  
  const handleSave = (): void => {
    if (validateForm()) {
      console.log('保存产品信息：', productData);
    } else {
      alert('请填写必填字段');
    }
  };
</script>

<div class="product-form">
  <h2>产品信息表单</h2>
  
  <GridForm columns={12} fieldLayout="vertical">
    <!-- 基本信息部分 -->
    <div style="grid-column: span 12;" class="section-header">
      <h3>基本信息</h3>
    </div>
    
    <FormField label="产品名称" required style="grid-column: span 6;">
      <TextEditor 
        placeholder="请输入产品名称"
        bind:value={productData.basicInfo.name}
      />
    </FormField>
    
    <FormField label="产品分类" required style="grid-column: span 3;">
      <OptionsSelect 
        options={categoryOptions}
        keyField="code"
        textField="text"
        placeholder="请选择分类"
        bind:value={productData.basicInfo.category}
      />
    </FormField>
    
    <FormField label="品牌" style="grid-column: span 3;">
      <TextEditor 
        placeholder="请输入品牌"
        bind:value={productData.basicInfo.brand}
      />
    </FormField>
    
    <FormField label="型号" style="grid-column: span 6;">
      <TextEditor 
        placeholder="请输入产品型号"
        bind:value={productData.basicInfo.model}
      />
    </FormField>
    
    <FormField label="发布日期" style="grid-column: span 6;">
      <DatePicker bind:value={productData.details.launchDate} />
    </FormField>
    
    <!-- 价格信息部分 -->
    <div style="grid-column: span 12;" class="section-header">
      <h3>价格信息</h3>
    </div>
    
    <FormField label="成本价" style="grid-column: span 4;">
      <NumberEditor 
        placeholder="请输入成本价"
        min={0}
        precision={2}
        bind:value={productData.pricing.cost}
      />
    </FormField>
    
    <FormField label="销售价" required style="grid-column: span 4;">
      <NumberEditor 
        placeholder="请输入销售价"
        min={0}
        precision={2}
        bind:value={productData.pricing.price}
      />
    </FormField>
    
    <FormField label="折扣(%)" style="grid-column: span 4;">
      <NumberEditor 
        placeholder="请输入折扣"
        min={0}
        max={100}
        precision={1}
        bind:value={productData.pricing.discount}
      />
    </FormField>
    
    <!-- 库存信息部分 -->
    <div style="grid-column: span 12;" class="section-header">
      <h3>库存信息</h3>
    </div>
    
    <FormField label="当前库存" style="grid-column: span 4;">
      <NumberEditor 
        placeholder="请输入库存数量"
        min={0}
        bind:value={productData.inventory.stock}
      />
    </FormField>
    
    <FormField label="最小库存" style="grid-column: span 4;">
      <NumberEditor 
        placeholder="请输入最小库存"
        min={0}
        bind:value={productData.inventory.minStock}
      />
    </FormField>
    
    <FormField label="最大库存" style="grid-column: span 4;">
      <NumberEditor 
        placeholder="请输入最大库存"
        min={0}
        bind:value={productData.inventory.maxStock}
      />
    </FormField>
    
    <!-- 详细信息部分 -->
    <div style="grid-column: span 12;" class="section-header">
      <h3>详细信息</h3>
    </div>
    
    <FormField label="产品描述" style="grid-column: span 6;">
      <TextEditor 
        multiline
        rows={4}
        placeholder="请输入产品描述"
        bind:value={productData.details.description}
      />
    </FormField>
    
    <FormField label="技术规格" style="grid-column: span 6;">
      <TextEditor 
        multiline
        rows={4}
        placeholder="请输入技术规格"
        bind:value={productData.details.specifications}
      />
    </FormField>
    
    <!-- 设置选项部分 -->
    <div style="grid-column: span 12;" class="section-header">
      <h3>设置选项</h3>
    </div>
    
    <FormField label="" style="grid-column: span 4;">
      <CheckBox 
        label="启用产品"
        bind:value={productData.settings.isActive}
      />
    </FormField>
    
    <FormField label="" style="grid-column: span 4;">
      <CheckBox 
        label="推荐产品"
        bind:value={productData.settings.isFeatured}
      />
    </FormField>
    
    <FormField label="" style="grid-column: span 4;">
      <CheckBox 
        label="允许缺货预订"
        bind:value={productData.settings.allowBackorder}
      />
    </FormField>
    
    <!-- 操作按钮 -->
    <div style="grid-column: span 12;" class="form-actions">
      <button type="button" class="btn-secondary">
        取消
      </button>
      <button type="button" class="btn-primary" on:click={handleSave}>
        保存产品
      </button>
    </div>
  </GridForm>
</div>

<style>
  .product-form {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .product-form h2 {
    margin-bottom: 30px;
    color: #333;
    text-align: center;
  }
  
  .section-header {
    margin: 20px 0 10px 0;
  }
  
  .section-header h3 {
    margin: 0;
    padding: 10px 0;
    color: #495057;
    font-size: 16px;
    border-bottom: 2px solid #007bff;
    background: linear-gradient(90deg, #f8f9fa 0%, transparent 100%);
    padding-left: 10px;
  }
  
  .form-actions {
    display: flex;
    gap: 15px;
    justify-content: center;
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid #dee2e6;
  }
  
  .btn-primary, .btn-secondary {
    padding: 12px 24px;
    border: none;
    border-radius: 4px;
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

### 响应式网格表单

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  
  let screenWidth: number = 0;
  
  const updateScreenWidth = (): void => {
    screenWidth = window.innerWidth;
  };
  
  onMount(() => {
    updateScreenWidth();
    window.addEventListener('resize', updateScreenWidth);
    return () => window.removeEventListener('resize', updateScreenWidth);
  });
  
  // 响应式列数计算
  $: columns = screenWidth < 768 ? 2 : (screenWidth < 1024 ? 4 : 6);
  $: fieldLayout = screenWidth < 768 ? 'vertical' : 'horizontal';
  
  interface ContactForm {
    name: string;
    email: string;
    phone: string;
    address: string;
  }
  
  let contactData: ContactForm = {
    name: '',
    email: '',
    phone: '',
    address: ''
  };
</script>

<div class="responsive-form">
  <h3>响应式网格表单 (当前列数: {columns})</h3>
  
  <GridForm {columns} {fieldLayout}>
    <FormField 
      label="姓名" 
      style="grid-column: span {Math.min(columns, 3)};"
    >
      <TextEditor bind:value={contactData.name} />
    </FormField>
    
    <FormField 
      label="邮箱" 
      style="grid-column: span {Math.min(columns, 3)};"
    >
      <TextEditor bind:value={contactData.email} />
    </FormField>
    
    <FormField 
      label="电话" 
      style="grid-column: span {Math.min(columns, 2)};"
    >
      <TextEditor bind:value={contactData.phone} />
    </FormField>
    
    <FormField 
      label="地址" 
      style="grid-column: span {columns};"
    >
      <TextEditor 
        multiline 
        rows={2} 
        bind:value={contactData.address} 
      />
    </FormField>
  </GridForm>
</div>

<style>
  .responsive-form {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .responsive-form h3 {
    margin-bottom: 20px;
    color: #495057;
    text-align: center;
  }
</style>
```

## 网格跨列控制

使用CSS Grid的`grid-column: span X`语法来控制字段占用的列数：

```svelte
<GridForm columns={12}>
  <!-- 占用2列 -->
  <FormField label="姓名" style="grid-column: span 2;">
    <TextEditor />
  </FormField>
  
  <!-- 占用4列 -->
  <FormField label="邮箱地址" style="grid-column: span 4;">
    <TextEditor />
  </FormField>
  
  <!-- 占用6列 -->
  <FormField label="详细地址" style="grid-column: span 6;">
    <TextEditor />
  </FormField>
  
  <!-- 占用整行（12列） -->
  <FormField label="备注" style="grid-column: span 12;">
    <TextEditor multiline rows={3} />
  </FormField>
</GridForm>
```

## 常用列数配置

| 列数 | 适用场景 | 典型用途 |
|------|----------|----------|
| 2 | 移动端或简单表单 | 左右两栏布局 |
| 3 | 平板或中等复杂度表单 | 三栏等宽布局 |
| 4 | 桌面端标准表单 | 四栏布局，灵活组合 |
| 6 | 复杂表单 | 支持1/2、1/3、1/6等比例 |
| 12 | 高度灵活的表单 | Bootstrap式12栅格系统 |

## 最佳实践

### 1. 合理规划网格列数
```svelte
<!-- 移动优先的响应式设计 -->
<script lang="ts">
  $: columns = window.innerWidth < 768 ? 2 : 
               window.innerWidth < 1024 ? 4 : 6;
</script>

<GridForm {columns}>
  <!-- 字段配置 -->
</GridForm>
```

### 2. 逻辑分组和对齐
```svelte
<GridForm columns={6}>
  <!-- 相关字段保持同一行 -->
  <FormField label="姓" style="grid-column: span 2;">
    <TextEditor />
  </FormField>
  <FormField label="名" style="grid-column: span 2;">
    <TextEditor />
  </FormField>
  <FormField label="年龄" style="grid-column: span 2;">
    <NumberEditor />
  </FormField>
  
  <!-- 长字段独占一行 -->
  <FormField label="详细地址" style="grid-column: span 6;">
    <TextEditor />
  </FormField>
</GridForm>
```

### 3. 响应式网格间隙
```css
/* 响应式间隙控制 */
:global(.grid-form > div) {
  gap: 16px;
}

@media (max-width: 768px) {
  :global(.grid-form > div) {
    gap: 12px;
  }
}

@media (max-width: 480px) {
  :global(.grid-form > div) {
    gap: 8px;
  }
}
```

## 样式定制

```css
/* 网格表单容器 */
:global(.grid-form) {
  display: block;
  width: 100%;
}

/* 网格内容区域 */
:global(.grid-form > div) {
  display: grid;
  gap: 16px;
  align-items: start;
}

/* 水平布局样式 */
:global(.grid-form.field-layout-horizontal > div) {
  align-items: center;
}

/* 自定义网格项样式 */
.grid-item {
  padding: 8px;
  background: #f8f9fa;
  border-radius: 4px;
}

/* 分组样式 */
.section-divider {
  grid-column: 1 / -1;
  height: 1px;
  background: #dee2e6;
  margin: 20px 0;
}
```

## 组件优势

1. **灵活的网格系统** - 基于CSS Grid，支持任意列数配置
2. **精确的布局控制** - 可以精确控制每个字段的占用列数
3. **响应式友好** - 易于实现响应式布局调整
4. **对齐一致** - 自动对齐表单字段，保持视觉一致性
5. **扩展性强** - 支持复杂的表单布局需求
6. **性能优化** - CSS Grid原生支持，性能优异