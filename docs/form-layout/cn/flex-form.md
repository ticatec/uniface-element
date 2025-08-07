# FlexForm 组件

弹性表单布局组件，提供灵活的表单容器，支持垂直和水平字段布局模式。

## 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `style` | `string` | `''` | 自定义样式 |
| `fieldLayout` | `'vertical' \| 'horizontal'` | `'vertical'` | 字段布局方向 |

## 使用示例

### 基础垂直布局表单

```svelte
<script lang="ts">
  import { FlexForm, FormField, TextEditor, NumberEditor } from '@ticatec/uniface-element';
  
  let formData = {
    name: '',
    email: '',
    age: null as number | null
  };
  
  const handleSubmit = (): void => {
    console.log('提交表单数据：', formData);
  };
</script>

<FlexForm fieldLayout="vertical">
  <FormField label="姓名" required>
    <TextEditor 
      placeholder="请输入姓名"
      bind:value={formData.name}
    />
  </FormField>
  
  <FormField label="邮箱">
    <TextEditor 
      placeholder="请输入邮箱"
      bind:value={formData.email}
    />
  </FormField>
  
  <FormField label="年龄">
    <NumberEditor 
      placeholder="请输入年龄"
      min={1}
      max={120}
      bind:value={formData.age}
    />
  </FormField>
  
  <div class="form-actions">
    <button type="button" on:click={handleSubmit}>
      提交
    </button>
  </div>
</FlexForm>
```

### 水平布局表单

```svelte
<script lang="ts">
  import { FlexForm, FormField, TextEditor, OptionsSelect, DatePicker } from '@ticatec/uniface-element';
  
  interface UserProfile {
    firstName: string;
    lastName: string;
    gender: string;
    birthDate: Date | null;
  }
  
  let userProfile: UserProfile = {
    firstName: '',
    lastName: '',
    gender: '',
    birthDate: null
  };
  
  const genderOptions = [
    { code: 'male', text: '男' },
    { code: 'female', text: '女' },
    { code: 'other', text: '其他' }
  ];
</script>

<FlexForm fieldLayout="horizontal" style="max-width: 800px;">
  <FormField label="姓">
    <TextEditor bind:value={userProfile.firstName} />
  </FormField>
  
  <FormField label="名">
    <TextEditor bind:value={userProfile.lastName} />
  </FormField>
  
  <FormField label="性别">
    <OptionsSelect 
      options={genderOptions}
      keyField="code"
      textField="text"
      bind:value={userProfile.gender}
    />
  </FormField>
  
  <FormField label="出生日期">
    <DatePicker bind:value={userProfile.birthDate} />
  </FormField>
</FlexForm>
```

### 复杂表单布局

```svelte
<script lang="ts">
  import { FlexForm, FormField, TextEditor, NumberEditor, Switch, CheckBox } from '@ticatec/uniface-element';
  
  interface ContactForm {
    personalInfo: {
      name: string;
      phone: string;
      email: string;
    };
    addressInfo: {
      address: string;
      city: string;
      zipCode: string;
    };
    preferences: {
      newsletter: boolean;
      smsNotify: boolean;
    };
  }
  
  let contactForm: ContactForm = {
    personalInfo: {
      name: '',
      phone: '',
      email: ''
    },
    addressInfo: {
      address: '',
      city: '',
      zipCode: ''
    },
    preferences: {
      newsletter: false,
      smsNotify: false
    }
  };
  
  const validateForm = (): boolean => {
    // 表单验证逻辑
    return contactForm.personalInfo.name.length > 0 &&
           contactForm.personalInfo.email.length > 0;
  };
  
  const handleSave = (): void => {
    if (validateForm()) {
      console.log('保存表单：', contactForm);
    } else {
      alert('请填写必填字段');
    }
  };
</script>

<div class="contact-form-container">
  <h2>联系信息表单</h2>
  
  <!-- 个人信息部分 -->
  <section class="form-section">
    <h3>个人信息</h3>
    <FlexForm fieldLayout="vertical">
      <FormField label="姓名" required>
        <TextEditor 
          placeholder="请输入姓名"
          bind:value={contactForm.personalInfo.name}
        />
      </FormField>
      
      <FormField label="电话">
        <TextEditor 
          placeholder="请输入电话号码"
          bind:value={contactForm.personalInfo.phone}
        />
      </FormField>
      
      <FormField label="邮箱" required>
        <TextEditor 
          placeholder="请输入邮箱地址"
          bind:value={contactForm.personalInfo.email}
        />
      </FormField>
    </FlexForm>
  </section>
  
  <!-- 地址信息部分 -->
  <section class="form-section">
    <h3>地址信息</h3>
    <FlexForm fieldLayout="horizontal">
      <FormField label="地址">
        <TextEditor 
          placeholder="请输入详细地址"
          bind:value={contactForm.addressInfo.address}
        />
      </FormField>
      
      <FormField label="城市">
        <TextEditor 
          placeholder="请输入城市"
          bind:value={contactForm.addressInfo.city}
        />
      </FormField>
      
      <FormField label="邮编">
        <TextEditor 
          placeholder="请输入邮政编码"
          bind:value={contactForm.addressInfo.zipCode}
        />
      </FormField>
    </FlexForm>
  </section>
  
  <!-- 偏好设置部分 -->
  <section class="form-section">
    <h3>通知偏好</h3>
    <FlexForm fieldLayout="vertical">
      <FormField label="">
        <CheckBox 
          label="订阅邮件通讯"
          bind:value={contactForm.preferences.newsletter}
        />
      </FormField>
      
      <FormField label="">
        <CheckBox 
          label="接收短信通知"
          bind:value={contactForm.preferences.smsNotify}
        />
      </FormField>
    </FlexForm>
  </section>
  
  <div class="form-actions">
    <button type="button" class="btn-secondary">
      取消
    </button>
    <button type="button" class="btn-primary" on:click={handleSave}>
      保存
    </button>
  </div>
</div>

<style>
  .contact-form-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .form-section {
    margin-bottom: 30px;
    padding: 20px;
    border: 1px solid #e1e5e9;
    border-radius: 8px;
    background: #f8f9fa;
  }
  
  .form-section h3 {
    margin: 0 0 20px 0;
    color: #495057;
    font-size: 18px;
  }
  
  .form-actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    padding-top: 20px;
    border-top: 1px solid #dee2e6;
  }
  
  .btn-primary, .btn-secondary {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
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
  }
  
  .btn-secondary:hover {
    background: #545b62;
  }
</style>
```

## 布局模式对比

### 垂直布局 (fieldLayout="vertical")
- 字段标签和输入控件垂直排列
- 适合表单字段较多或字段标签较长的情况
- 在较窄的屏幕上表现更好
- 每个字段占用完整宽度

### 水平布局 (fieldLayout="horizontal")
- 字段标签和输入控件水平排列
- 适合简单表单或需要紧凑布局的情况
- 在宽屏幕上能更有效利用空间
- 标签宽度固定，输入控件占用剩余空间

## 响应式设计

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  
  let isNarrowScreen: boolean = false;
  
  const checkScreenWidth = (): void => {
    isNarrowScreen = window.innerWidth < 768;
  };
  
  onMount(() => {
    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);
    return () => window.removeEventListener('resize', checkScreenWidth);
  });
  
  $: fieldLayout = isNarrowScreen ? 'vertical' : 'horizontal';
</script>

<FlexForm {fieldLayout}>
  <!-- 表单字段 -->
</FlexForm>
```

## 样式定制

```css
/* 自定义FlexForm样式 */
:global(.flex-form) {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 水平布局样式 */
:global(.flex-form.field-layout-horizontal) {
  gap: 12px;
}

/* 自定义表单容器 */
.custom-form {
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* 响应式样式 */
@media (max-width: 768px) {
  :global(.flex-form.field-layout-horizontal) {
    /* 在小屏幕上强制垂直布局 */
  }
}
```

## 最佳实践

### 1. 选择合适的布局模式
```svelte
<!-- 简单表单：使用水平布局 -->
<FlexForm fieldLayout="horizontal">
  <FormField label="用户名"><TextEditor /></FormField>
  <FormField label="密码"><TextEditor type="password" /></FormField>
</FlexForm>

<!-- 复杂表单：使用垂直布局 -->
<FlexForm fieldLayout="vertical">
  <FormField label="详细描述">
    <TextEditor multiline rows={4} />
  </FormField>
</FlexForm>
```

### 2. 合理分组表单字段
```svelte
<div class="form-container">
  <section>
    <h3>基本信息</h3>
    <FlexForm fieldLayout="vertical">
      <!-- 基本信息字段 -->
    </FlexForm>
  </section>
  
  <section>
    <h3>联系方式</h3>
    <FlexForm fieldLayout="horizontal">
      <!-- 联系方式字段 -->
    </FlexForm>
  </section>
</div>
```

### 3. 表单验证集成
```svelte
<script lang="ts">
  let errors: Record<string, string> = {};
  
  const validateField = (field: string, value: any): void => {
    // 验证逻辑
    if (!value) {
      errors[field] = '此字段为必填项';
    } else {
      delete errors[field];
    }
    errors = { ...errors };
  };
</script>

<FlexForm fieldLayout="vertical">
  <FormField label="姓名" required error={errors.name}>
    <TextEditor 
      bind:value={formData.name}
      onChange={(value) => validateField('name', value)}
    />
  </FormField>
</FlexForm>
```

## 组件优势

1. **灵活布局** - 支持垂直和水平两种布局模式
2. **响应式友好** - 可根据屏幕尺寸动态调整布局
3. **简洁API** - 最少的属性配置，易于使用
4. **样式可定制** - 通过CSS变量和样式类轻松定制外观
5. **语义化结构** - 清晰的HTML结构，有利于SEO和可访问性
6. **组合性强** - 与其他表单组件完美配合使用