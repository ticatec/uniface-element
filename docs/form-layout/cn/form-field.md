# FormField 组件

表单字段组件，提供带标签、错误提示和必填标识的表单字段容器，是表单构建的核心组件。

## 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `label` | `string` | `'Label:'` | 字段标签文本 |
| `style` | `string` | `''` | 自定义样式 |
| `label$style` | `string \| null` | `null` | 标签样式 |
| `required` | `boolean` | `false` | 是否必填字段 |
| `error` | `string \| null` | `null` | 错误提示信息 |
| `labelSuffix` | `string` | `':'` | 标签后缀 |
| `label$alignment` | `'center' \| 'top'` | `'center'` | 标签对齐方式 |
| `class` | `string` | `''` | CSS类名 |

## 使用示例

### 基础表单字段

```svelte
<script lang="ts">
  import FormField, TextEditor, NumberEditor, DatePicker from '@ticatec/uniface-element/FormField, TextEditor, NumberEditor, DatePicker';
  
  interface UserForm {
    name: string;
    age: number | null;
    email: string;
    birthDate: Date | null;
  }
  
  let userForm: UserForm = {
    name: '',
    age: null,
    email: '',
    birthDate: null
  };
</script>

<!-- 基础字段 -->
<FormField label="姓名">
  <TextEditor 
    variant="outlined" 
    bind:value={userForm.name} 
    placeholder="请输入姓名"
  />
</FormField>

<!-- 数字字段 -->
<FormField label="年龄">
  <NumberEditor 
    variant="outlined" 
    bind:value={userForm.age}
    min={1}
    max={120}
    placeholder="请输入年龄"
  />
</FormField>

<!-- 邮箱字段 -->
<FormField label="邮箱">
  <TextEditor 
    variant="outlined" 
    bind:value={userForm.email}
    placeholder="请输入邮箱地址"
  />
</FormField>

<!-- 日期字段 -->
<FormField label="出生日期">
  <DatePicker variant="outlined" bind:value={userForm.birthDate} />
</FormField>
```

### 必填字段和验证

```svelte
<script lang="ts">
  import FormField, TextEditor, OptionsSelect from '@ticatec/uniface-element/FormField, TextEditor, OptionsSelect';
  
  interface RegistrationForm {
    username: string;
    password: string;
    email: string;
    gender: string;
  }
  
  let registrationForm: RegistrationForm = {
    username: '',
    password: '',
    email: '',
    gender: ''
  };
  
  let errors: Record<string, string> = {};
  
  const genderOptions = [
    { code: 'male', text: '男' },
    { code: 'female', text: '女' },
    { code: 'other', text: '其他' }
  ];
  
  const validateForm = (): void => {
    errors = {};
    
    if (!registrationForm.username) {
      errors.username = '用户名不能为空';
    } else if (registrationForm.username.length < 3) {
      errors.username = '用户名至少需要3个字符';
    }
    
    if (!registrationForm.password) {
      errors.password = '密码不能为空';
    } else if (registrationForm.password.length < 8) {
      errors.password = '密码至少需要8个字符';
    }
    
    if (!registrationForm.email) {
      errors.email = '邮箱不能为空';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registrationForm.email)) {
      errors.email = '请输入有效的邮箱地址';
    }
  };
  
  const handleSubmit = (): void => {
    validateForm();
    if (Object.keys(errors).length === 0) {
      console.log('表单提交成功', registrationForm);
    }
  };
</script>

<div class="registration-form">
  <h3>用户注册</h3>
  
  <!-- 必填用户名字段 -->
  <FormField required label="用户名" error={errors.username}>
    <TextEditor 
      variant="outlined" 
      bind:value={registrationForm.username}
      placeholder="请输入用户名"
      on:input={() => errors.username = ''}
    />
  </FormField>
  
  <!-- 必填密码字段 -->
  <FormField required label="密码" error={errors.password}>
    <TextEditor 
      variant="outlined" 
      type="password"
      bind:value={registrationForm.password}
      placeholder="请输入密码"
      on:input={() => errors.password = ''}
    />
  </FormField>
  
  <!-- 必填邮箱字段 -->
  <FormField required label="邮箱地址" error={errors.email}>
    <TextEditor 
      variant="outlined" 
      bind:value={registrationForm.email}
      placeholder="请输入邮箱地址"
      on:input={() => errors.email = ''}
    />
  </FormField>
  
  <!-- 可选性别字段 -->
  <FormField label="性别">
    <OptionsSelect 
      variant="outlined"
      options={genderOptions}
      keyField="code"
      textField="text"
      bind:value={registrationForm.gender}
      placeholder="请选择性别"
    />
  </FormField>
  
  <div class="form-actions">
    <button type="button" class="btn-primary" on:click={handleSubmit}>
      注册
    </button>
  </div>
</div>

<style>
  .registration-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 30px;
    background: #f8f9fa;
    border-radius: 8px;
  }
  
  .registration-form h3 {
    margin-bottom: 25px;
    text-align: center;
    color: #495057;
  }
  
  .form-actions {
    margin-top: 25px;
    text-align: center;
  }
  
  .btn-primary {
    padding: 12px 40px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
  }
  
  .btn-primary:hover {
    background: #0056b3;
  }
</style>
```

### 自定义标签样式和对齐

```svelte
<script lang="ts">
  import FormField, TextEditor, MemoEditor from '@ticatec/uniface-element/FormField, TextEditor, MemoEditor';
  
  let contactData = {
    name: '',
    company: '',
    position: '',
    description: ''
  };
</script>

<div class="contact-form">
  <h3>联系人信息</h3>
  
  <!-- 重要字段标签样式 -->
  <FormField 
    required
    label="姓名" 
    label$style="color: #dc3545; font-weight: 600; font-size: 16px;"
    labelSuffix="*"
  >
    <TextEditor 
      variant="outlined" 
      bind:value={contactData.name}
      placeholder="请输入联系人姓名"
    />
  </FormField>
  
  <!-- 普通字段标签样式 -->
  <FormField 
    label="公司名称" 
    label$style="color: #28a745; font-weight: 500;"
  >
    <TextEditor 
      variant="outlined" 
      bind:value={contactData.company}
      placeholder="请输入公司名称"
    />
  </FormField>
  
  <!-- 自定义标签颜色 -->
  <FormField 
    label="职位" 
    label$style="color: #6f42c1; font-style: italic;"
  >
    <TextEditor 
      variant="outlined" 
      bind:value={contactData.position}
      placeholder="请输入职位"
    />
  </FormField>
  
  <!-- 顶部对齐的多行文本 -->
  <FormField 
    label="详细描述" 
    label$alignment="top"
    label$style="color: #495057; font-weight: 500; padding-top: 8px;"
  >
    <MemoEditor 
      variant="outlined"
      bind:value={contactData.description}
      placeholder="请输入详细描述"
      rows={4}
      maxLength={500}
      showIndicator
    />
  </FormField>
</div>

<style>
  .contact-form {
    max-width: 600px;
    margin: 0 auto;
    padding: 30px;
  }
  
  .contact-form h3 {
    margin-bottom: 25px;
    color: #495057;
    border-bottom: 2px solid #007bff;
    padding-bottom: 10px;
  }
</style>
```

### 长标签文本处理

```svelte
<script lang="ts">
  import FormField, TextEditor, CheckBox from '@ticatec/uniface-element/FormField, TextEditor, CheckBox';
  
  let advancedSettings = {
    serverEndpoint: '',
    apiKey: '',
    enableLogging: false,
    autoRetry: false
  };
</script>

<div class="settings-form">
  <h3>高级设置</h3>
  
  <!-- 长标签自动省略 -->
  <FormField 
    label="服务器端点URL地址（支持HTTP和HTTPS协议）"
    required
  >
    <TextEditor 
      variant="outlined" 
      bind:value={advancedSettings.serverEndpoint}
      placeholder="请输入服务器端点URL"
    />
  </FormField>
  
  <!-- 长标签使用自定义样式 -->
  <FormField 
    label="API密钥（用于身份验证和访问控制）"
    label$style="font-size: 14px; line-height: 1.2; white-space: normal;"
    required
  >
    <TextEditor 
      variant="outlined" 
      type="password"
      bind:value={advancedSettings.apiKey}
      placeholder="请输入API密钥"
    />
  </FormField>
  
  <!-- 开关类型字段 -->
  <FormField label="启用详细日志记录功能" labelSuffix="">
    <CheckBox 
      label="记录所有API请求和响应详情"
      bind:value={advancedSettings.enableLogging}
    />
  </FormField>
  
  <!-- 开关类型字段 -->
  <FormField label="启用自动重试机制" labelSuffix="">
    <CheckBox 
      label="当请求失败时自动重试最多3次"
      bind:value={advancedSettings.autoRetry}
    />
  </FormField>
</div>

<style>
  .settings-form {
    max-width: 700px;
    margin: 0 auto;
    padding: 30px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .settings-form h3 {
    margin-bottom: 25px;
    color: #333;
    font-size: 20px;
  }
</style>
```

### 表单字段组合使用

```svelte
<script lang="ts">
  import FormField, TextEditor, NumberEditor, DatePicker, OptionsSelect, CheckBox from '@ticatec/uniface-element/FormField, TextEditor, NumberEditor, DatePicker, OptionsSelect, CheckBox';
  
  interface EmployeeForm {
    personalInfo: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      birthDate: Date | null;
    };
    workInfo: {
      employeeId: string;
      department: string;
      position: string;
      salary: number | null;
      startDate: Date | null;
    };
    settings: {
      receiveEmails: boolean;
      isManager: boolean;
    };
  }
  
  let employeeForm: EmployeeForm = {
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      birthDate: null
    },
    workInfo: {
      employeeId: '',
      department: '',
      position: '',
      salary: null,
      startDate: null
    },
    settings: {
      receiveEmails: true,
      isManager: false
    }
  };
  
  let validationErrors: Record<string, string> = {};
  
  const departments = [
    { code: 'engineering', text: '工程部' },
    { code: 'marketing', text: '市场部' },
    { code: 'sales', text: '销售部' },
    { code: 'hr', text: '人事部' }
  ];
  
  const validateForm = (): boolean => {
    validationErrors = {};
    
    if (!employeeForm.personalInfo.firstName) {
      validationErrors.firstName = '姓氏不能为空';
    }
    
    if (!employeeForm.personalInfo.lastName) {
      validationErrors.lastName = '名字不能为空';
    }
    
    if (!employeeForm.personalInfo.email) {
      validationErrors.email = '邮箱不能为空';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employeeForm.personalInfo.email)) {
      validationErrors.email = '请输入有效的邮箱地址';
    }
    
    if (!employeeForm.workInfo.employeeId) {
      validationErrors.employeeId = '员工ID不能为空';
    }
    
    return Object.keys(validationErrors).length === 0;
  };
  
  const handleSave = (): void => {
    if (validateForm()) {
      console.log('员工信息保存成功', employeeForm);
      alert('员工信息已保存');
    }
  };
  
  const clearFieldError = (field: string): void => {
    if (validationErrors[field]) {
      validationErrors = { ...validationErrors };
      delete validationErrors[field];
    }
  };
</script>

<div class="employee-form">
  <h2>员工信息管理</h2>
  
  <!-- 个人信息部分 -->
  <section class="form-section">
    <h3>个人信息</h3>
    
    <div class="form-row">
      <div class="form-col">
        <FormField required label="姓" error={validationErrors.firstName}>
          <TextEditor 
            variant="outlined" 
            bind:value={employeeForm.personalInfo.firstName}
            placeholder="请输入姓氏"
            on:input={() => clearFieldError('firstName')}
          />
        </FormField>
      </div>
      
      <div class="form-col">
        <FormField required label="名" error={validationErrors.lastName}>
          <TextEditor 
            variant="outlined" 
            bind:value={employeeForm.personalInfo.lastName}
            placeholder="请输入名字"
            on:input={() => clearFieldError('lastName')}
          />
        </FormField>
      </div>
    </div>
    
    <FormField required label="邮箱地址" error={validationErrors.email}>
      <TextEditor 
        variant="outlined" 
        bind:value={employeeForm.personalInfo.email}
        placeholder="请输入邮箱地址"
        on:input={() => clearFieldError('email')}
      />
    </FormField>
    
    <FormField label="联系电话">
      <TextEditor 
        variant="outlined" 
        bind:value={employeeForm.personalInfo.phone}
        placeholder="请输入联系电话"
      />
    </FormField>
    
    <FormField label="出生日期">
      <DatePicker 
        variant="outlined" 
        bind:value={employeeForm.personalInfo.birthDate}
      />
    </FormField>
  </section>
  
  <!-- 工作信息部分 -->
  <section class="form-section">
    <h3>工作信息</h3>
    
    <FormField required label="员工ID" error={validationErrors.employeeId}>
      <TextEditor 
        variant="outlined" 
        bind:value={employeeForm.workInfo.employeeId}
        placeholder="请输入员工ID"
        on:input={() => clearFieldError('employeeId')}
      />
    </FormField>
    
    <div class="form-row">
      <div class="form-col">
        <FormField label="部门">
          <OptionsSelect 
            variant="outlined"
            options={departments}
            keyField="code"
            textField="text"
            bind:value={employeeForm.workInfo.department}
            placeholder="请选择部门"
          />
        </FormField>
      </div>
      
      <div class="form-col">
        <FormField label="职位">
          <TextEditor 
            variant="outlined" 
            bind:value={employeeForm.workInfo.position}
            placeholder="请输入职位"
          />
        </FormField>
      </div>
    </div>
    
    <div class="form-row">
      <div class="form-col">
        <FormField label="薪资">
          <NumberEditor 
            variant="outlined" 
            bind:value={employeeForm.workInfo.salary}
            min={0}
            precision={0}
            placeholder="请输入薪资"
          />
        </FormField>
      </div>
      
      <div class="form-col">
        <FormField label="入职日期">
          <DatePicker 
            variant="outlined" 
            bind:value={employeeForm.workInfo.startDate}
          />
        </FormField>
      </div>
    </div>
  </section>
  
  <!-- 设置选项部分 -->
  <section class="form-section">
    <h3>账户设置</h3>
    
    <FormField label="通知偏好" labelSuffix="">
      <CheckBox 
        label="接收邮件通知"
        bind:value={employeeForm.settings.receiveEmails}
      />
    </FormField>
    
    <FormField label="权限设置" labelSuffix="">
      <CheckBox 
        label="管理员权限"
        bind:value={employeeForm.settings.isManager}
      />
    </FormField>
  </section>
  
  <!-- 操作按钮 -->
  <div class="form-actions">
    <button type="button" class="btn-secondary">
      取消
    </button>
    <button type="button" class="btn-primary" on:click={handleSave}>
      保存员工信息
    </button>
  </div>
</div>

<style>
  .employee-form {
    max-width: 800px;
    margin: 0 auto;
    padding: 30px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .employee-form h2 {
    margin-bottom: 30px;
    text-align: center;
    color: #333;
    font-size: 24px;
  }
  
  .form-section {
    margin-bottom: 35px;
    padding: 25px;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    background: #f8f9fa;
  }
  
  .form-section h3 {
    margin: 0 0 20px 0;
    color: #495057;
    font-size: 18px;
    border-bottom: 2px solid #007bff;
    padding-bottom: 8px;
  }
  
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 16px;
  }
  
  .form-col {
    min-width: 0;
  }
  
  .form-actions {
    display: flex;
    gap: 15px;
    justify-content: center;
    padding-top: 25px;
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
  
  @media (max-width: 768px) {
    .form-row {
      grid-template-columns: 1fr;
      gap: 16px;
    }
    
    .employee-form {
      padding: 20px;
    }
    
    .form-section {
      padding: 20px;
    }
  }
</style>
```

## 标签对齐方式

### 居中对齐（默认）
```svelte
<FormField label="姓名" label$alignment="center">
  <TextEditor />
</FormField>
```

### 顶部对齐
```svelte
<!-- 适用于多行输入控件 -->
<FormField label="详细描述" label$alignment="top">
  <MemoEditor rows={4} />
</FormField>
```

## 错误提示处理

```svelte
<script lang="ts">
  let formData = { email: '' };
  let errors: Record<string, string> = {};
  
  const validateEmail = (): void => {
    if (!formData.email) {
      errors.email = '邮箱不能为空';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = '请输入有效的邮箱地址';
    } else {
      delete errors.email;
      errors = { ...errors };
    }
  };
</script>

<FormField required label="邮箱" error={errors.email}>
  <TextEditor 
    bind:value={formData.email}
    on:blur={validateEmail}
  />
</FormField>
```

## 样式定制

```css
/* 表单字段容器 */
:global(.uniface-form-field) {
  margin-bottom: 20px;
}

/* 表单内容区域 */
:global(.uniface-form-field .form-content) {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* 标签样式 */
:global(.uniface-form-field .field-label) {
  font-weight: 500;
  color: #495057;
  margin-bottom: 4px;
}

/* 必填标识样式 */
:global(.uniface-form-field .required-indicator) {
  color: #dc3545;
  margin-right: 4px;
}

/* 顶部对齐标签 */
:global(.uniface-form-field .field-label.vert-top) {
  align-self: flex-start;
}

/* 错误提示样式 */
:global(.uniface-form-field .field-hint) {
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
}

/* 字段内容区域 */
:global(.uniface-form-field .field) {
  flex: 1;
}

/* 水平布局样式 */
:global(.field-layout-horizontal .uniface-form-field .form-content) {
  flex-direction: row;
  align-items: center;
  gap: 12px;
}

:global(.field-layout-horizontal .uniface-form-field .field-label) {
  flex-shrink: 0;
  margin-bottom: 0;
  min-width: 120px;
}

/* 响应式样式 */
@media (max-width: 768px) {
  :global(.field-layout-horizontal .uniface-form-field .form-content) {
    flex-direction: column;
    align-items: stretch;
  }
  
  :global(.field-layout-horizontal .uniface-form-field .field-label) {
    min-width: auto;
    margin-bottom: 4px;
  }
}
```

## 最佳实践

### 1. 合理使用必填标识
```svelte
<!-- 必须填写的字段 -->
<FormField required label="用户名">
  <TextEditor />
</FormField>

<!-- 可选字段 -->
<FormField label="昵称">
  <TextEditor />
</FormField>
```

### 2. 及时显示验证错误
```svelte
<script lang="ts">
  const clearError = (field: string): void => {
    if (errors[field]) {
      delete errors[field];
      errors = { ...errors };
    }
  };
</script>

<FormField required label="邮箱" error={errors.email}>
  <TextEditor 
    bind:value={formData.email}
    on:input={() => clearError('email')}
  />
</FormField>
```

### 3. 选择合适的标签对齐方式
```svelte
<!-- 单行输入：使用居中对齐 -->
<FormField label="姓名" label$alignment="center">
  <TextEditor />
</FormField>

<!-- 多行输入：使用顶部对齐 -->
<FormField label="备注" label$alignment="top">
  <MemoEditor rows={3} />
</FormField>
```

### 4. 自定义标签样式
```svelte
<!-- 重要字段突出显示 -->
<FormField 
  required 
  label="密码" 
  label$style="color: #dc3545; font-weight: 600;"
>
  <TextEditor type="password" />
</FormField>

<!-- 次要字段淡化显示 -->
<FormField 
  label="备注" 
  label$style="color: #6c757d; font-size: 14px;"
>
  <TextEditor />
</FormField>
```

## 组件优势

1. **完整的字段功能** - 提供标签、必填标识、错误提示的完整字段支持
2. **灵活的布局选项** - 支持标签的居中和顶部对齐方式
3. **丰富的样式定制** - 支持标签样式、后缀和整体样式的定制
4. **完善的验证支持** - 内置错误提示显示机制
5. **响应式友好** - 支持水平和垂直布局的响应式切换
6. **易于集成** - 与所有表单控件无缝配合使用
7. **一致性保证** - 统一的字段样式和行为规范