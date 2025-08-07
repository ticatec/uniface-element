# FlexRowForm 组件

灵活的行式表单布局组件，提供基于行的表单容器，支持垂直和水平字段布局模式。

## 组件说明

FlexRowForm 组件由以下子组件组成：
- **FormContainer** - 主容器组件
- **Row** - 行组件，用于组织表单行
- **Cell** - 单元格组件，用于放置表单字段

## FormContainer 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `style` | `string` | `''` | 自定义样式 |
| `fieldLayout` | `'vertical' \| 'horizontal'` | `'vertical'` | 字段布局方向 |

## 使用示例

### 基础行式布局

```svelte
<script lang="ts">
  import { FormContainer, Row, Cell, FormField, TextEditor, NumberEditor } from '@ticatec/uniface-element';
  
  interface UserInfo {
    firstName: string;
    lastName: string;
    age: number | null;
    email: string;
  }
  
  let userInfo: UserInfo = {
    firstName: '',
    lastName: '',
    age: null,
    email: ''
  };
  
  const handleSubmit = (): void => {
    console.log('提交用户信息：', userInfo);
  };
</script>

<FormContainer fieldLayout="horizontal">
  <Row>
    <Cell>
      <FormField label="姓">
        <TextEditor 
          placeholder="请输入姓氏"
          bind:value={userInfo.firstName}
        />
      </FormField>
    </Cell>
    
    <Cell>
      <FormField label="名">
        <TextEditor 
          placeholder="请输入名字"
          bind:value={userInfo.lastName}
        />
      </FormField>
    </Cell>
    
    <Cell>
      <FormField label="年龄">
        <NumberEditor 
          placeholder="请输入年龄"
          min={1}
          max={120}
          bind:value={userInfo.age}
        />
      </FormField>
    </Cell>
  </Row>
  
  <Row>
    <Cell>
      <FormField label="邮箱">
        <TextEditor 
          placeholder="请输入邮箱地址"
          bind:value={userInfo.email}
        />
      </FormField>
    </Cell>
  </Row>
  
  <Row>
    <Cell>
      <div class="form-actions">
        <button type="button" on:click={handleSubmit}>
          提交
        </button>
      </div>
    </Cell>
  </Row>
</FormContainer>
```

### 复杂表单布局

```svelte
<script lang="ts">
  import { FormContainer, Row, Cell, FormField, TextEditor, OptionsSelect, DatePicker, CheckBox } from '@ticatec/uniface-element';
  
  interface EmployeeForm {
    personalInfo: {
      firstName: string;
      lastName: string;
      gender: string;
      birthDate: Date | null;
    };
    workInfo: {
      department: string;
      position: string;
      startDate: Date | null;
    };
    contact: {
      phone: string;
      email: string;
      address: string;
    };
    preferences: {
      emailNotifications: boolean;
      newsletter: boolean;
    };
  }
  
  let employeeData: EmployeeForm = {
    personalInfo: {
      firstName: '',
      lastName: '',
      gender: '',
      birthDate: null
    },
    workInfo: {
      department: '',
      position: '',
      startDate: null
    },
    contact: {
      phone: '',
      email: '',
      address: ''
    },
    preferences: {
      emailNotifications: true,
      newsletter: false
    }
  };
  
  const genderOptions = [
    { code: 'male', text: '男' },
    { code: 'female', text: '女' },
    { code: 'other', text: '其他' }
  ];
  
  const departmentOptions = [
    { code: 'engineering', text: '工程部' },
    { code: 'marketing', text: '市场部' },
    { code: 'sales', text: '销售部' },
    { code: 'hr', text: '人事部' }
  ];
  
  const validateForm = (): boolean => {
    return employeeData.personalInfo.firstName.length > 0 &&
           employeeData.personalInfo.lastName.length > 0 &&
           employeeData.contact.email.length > 0;
  };
  
  const handleSave = (): void => {
    if (validateForm()) {
      console.log('保存员工信息：', employeeData);
    } else {
      alert('请填写必填字段');
    }
  };
</script>

<div class="employee-form">
  <h2>员工信息表单</h2>
  
  <FormContainer fieldLayout="horizontal">
    <!-- 个人信息行 -->
    <Row>
      <Cell>
        <h3>个人信息</h3>
      </Cell>
    </Row>
    
    <Row>
      <Cell>
        <FormField label="姓" required>
          <TextEditor bind:value={employeeData.personalInfo.firstName} />
        </FormField>
      </Cell>
      
      <Cell>
        <FormField label="名" required>
          <TextEditor bind:value={employeeData.personalInfo.lastName} />
        </FormField>
      </Cell>
      
      <Cell>
        <FormField label="性别">
          <OptionsSelect 
            options={genderOptions}
            keyField="code"
            textField="text"
            bind:value={employeeData.personalInfo.gender}
          />
        </FormField>
      </Cell>
    </Row>
    
    <Row>
      <Cell>
        <FormField label="出生日期">
          <DatePicker bind:value={employeeData.personalInfo.birthDate} />
        </FormField>
      </Cell>
    </Row>
    
    <!-- 工作信息行 -->
    <Row>
      <Cell>
        <h3>工作信息</h3>
      </Cell>
    </Row>
    
    <Row>
      <Cell>
        <FormField label="部门">
          <OptionsSelect 
            options={departmentOptions}
            keyField="code"
            textField="text"
            bind:value={employeeData.workInfo.department}
          />
        </FormField>
      </Cell>
      
      <Cell>
        <FormField label="职位">
          <TextEditor bind:value={employeeData.workInfo.position} />
        </FormField>
      </Cell>
      
      <Cell>
        <FormField label="入职日期">
          <DatePicker bind:value={employeeData.workInfo.startDate} />
        </FormField>
      </Cell>
    </Row>
    
    <!-- 联系信息行 -->
    <Row>
      <Cell>
        <h3>联系信息</h3>
      </Cell>
    </Row>
    
    <Row>
      <Cell>
        <FormField label="电话">
          <TextEditor bind:value={employeeData.contact.phone} />
        </FormField>
      </Cell>
      
      <Cell>
        <FormField label="邮箱" required>
          <TextEditor bind:value={employeeData.contact.email} />
        </FormField>
      </Cell>
    </Row>
    
    <Row>
      <Cell>
        <FormField label="地址">
          <TextEditor 
            multiline 
            rows={2}
            bind:value={employeeData.contact.address} 
          />
        </FormField>
      </Cell>
    </Row>
    
    <!-- 偏好设置行 -->
    <Row>
      <Cell>
        <h3>通知偏好</h3>
      </Cell>
    </Row>
    
    <Row>
      <Cell>
        <FormField label="">
          <CheckBox 
            label="接收邮件通知"
            bind:value={employeeData.preferences.emailNotifications}
          />
        </FormField>
      </Cell>
      
      <Cell>
        <FormField label="">
          <CheckBox 
            label="订阅公司通讯"
            bind:value={employeeData.preferences.newsletter}
          />
        </FormField>
      </Cell>
    </Row>
    
    <!-- 操作按钮行 -->
    <Row>
      <Cell>
        <div class="form-actions">
          <button type="button" class="btn-secondary">
            取消
          </button>
          <button type="button" class="btn-primary" on:click={handleSave}>
            保存
          </button>
        </div>
      </Cell>
    </Row>
  </FormContainer>
</div>

<style>
  .employee-form {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .employee-form h2 {
    margin-bottom: 30px;
    color: #333;
  }
  
  .employee-form h3 {
    margin: 20px 0 10px 0;
    color: #666;
    font-size: 16px;
    border-bottom: 1px solid #e1e5e9;
    padding-bottom: 5px;
  }
  
  .form-actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    margin-top: 20px;
  }
  
  .btn-primary, .btn-secondary {
    padding: 10px 20px;
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

### 响应式行布局

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
  
  // 根据屏幕宽度调整布局
  $: fieldLayout = screenWidth < 768 ? 'vertical' : 'horizontal';
  $: cellsPerRow = screenWidth < 768 ? 1 : (screenWidth < 1024 ? 2 : 3);
</script>

<FormContainer {fieldLayout}>
  <Row>
    {#each Array(cellsPerRow) as _, i}
      <Cell>
        <FormField label={`字段 ${i + 1}`}>
          <TextEditor placeholder={`输入字段 ${i + 1}`} />
        </FormField>
      </Cell>
    {/each}
  </Row>
</FormContainer>
```

## 组件特点

### 1. 灵活的行列结构
- **Row** 组件定义表单行
- **Cell** 组件定义行内的单元格
- 可以自由组合行和列的布局

### 2. 支持多种布局模式
- **垂直布局**：标签在上，控件在下
- **水平布局**：标签在左，控件在右

### 3. 响应式设计友好
- 可以根据屏幕尺寸调整每行的单元格数量
- 支持在不同设备上切换布局模式

## 与FlexForm的对比

| 特性 | FlexForm | FlexRowForm |
|------|----------|-------------|
| 结构 | 简单的容器结构 | 基于行列的网格结构 |
| 布局控制 | 整体布局模式 | 可以逐行控制布局 |
| 复杂度 | 简单，适合基本表单 | 复杂，适合大型表单 |
| 响应式 | 整体响应式 | 可以精确控制每行的响应式行为 |
| 使用场景 | 简单表单 | 复杂的多段表单 |

## 最佳实践

### 1. 合理规划行结构
```svelte
<!-- 相关字段分组在同一行 -->
<Row>
  <Cell><FormField label="姓"><TextEditor /></FormField></Cell>
  <Cell><FormField label="名"><TextEditor /></FormField></Cell>
</Row>

<!-- 独立字段单独成行 -->
<Row>
  <Cell><FormField label="详细地址"><TextEditor multiline /></FormField></Cell>
</Row>
```

### 2. 响应式设计
```svelte
<script lang="ts">
  // 根据屏幕尺寸调整每行的字段数量
  $: isMobile = window.innerWidth < 768;
</script>

{#if isMobile}
  <!-- 移动端：每行一个字段 -->
  <Row><Cell><FormField label="姓名"><TextEditor /></FormField></Cell></Row>
  <Row><Cell><FormField label="邮箱"><TextEditor /></FormField></Cell></Row>
{:else}
  <!-- 桌面端：每行多个字段 -->
  <Row>
    <Cell><FormField label="姓名"><TextEditor /></FormField></Cell>
    <Cell><FormField label="邮箱"><TextEditor /></FormField></Cell>
  </Row>
{/if}
```

### 3. 标题和分组
```svelte
<FormContainer>
  <!-- 分组标题行 -->
  <Row>
    <Cell><h3>个人信息</h3></Cell>
  </Row>
  
  <!-- 相关字段行 -->
  <Row>
    <Cell><FormField label="姓名"><TextEditor /></FormField></Cell>
    <Cell><FormField label="年龄"><NumberEditor /></FormField></Cell>
  </Row>
</FormContainer>
```

## 样式定制

```css
/* 行容器样式 */
:global(.flex-row-form) {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 水平布局样式 */
:global(.flex-row-form.field-layout-horizontal) {
  gap: 12px;
}

/* 自定义行样式 */
.custom-row {
  padding: 10px;
  border: 1px solid #e1e5e9;
  border-radius: 4px;
}

/* 自定义单元格样式 */
.custom-cell {
  padding: 8px;
}

/* 响应式样式 */
@media (max-width: 768px) {
  :global(.flex-row-form) {
    gap: 8px;
  }
}
```

## 组件优势

1. **精确布局控制** - 可以逐行控制布局和字段排列
2. **结构化组织** - 清晰的行列结构，便于管理复杂表单
3. **高度可定制** - 每个行和单元格都可以独立定制样式
4. **响应式友好** - 支持精确的响应式布局控制
5. **可维护性强** - 结构化的组织方式便于后期维护和修改