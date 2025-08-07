# GroupCheckBox 组件

复选框组组件，将多个复选框选项组织在一起，支持位运算和字符串分隔符两种值存储模式。通常用于多选场景，比单独使用多个CheckBox更加方便。

## 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | 外观变体 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `readonly` | `boolean` | `false` | 是否只读 |
| `compact` | `boolean` | `false` | 是否紧凑模式 |
| `value` | `string \| number` | - | 选中的值（字符串或位值） |
| `bitBase` | `boolean` | `false` | 是否使用位运算模式 |
| `options` | `Array<OptionItem>` | - | 选项数组 |
| `keyField` | `string` | `'code'` | 值字段名 |
| `textField` | `string` | `'text'` | 显示字段名 |
| `delimiter` | `string` | `';'` | 字符串模式下的分隔符 |
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | 显示模式 |
| `item$style` | `string` | `''` | 单个复选框的样式 |
| `disabledOptions` | `Array<string>` | `[]` | 禁用的选项值 |
| `hideOptions` | `Array<string>` | `[]` | 隐藏的选项值 |
| `style` | `string` | `''` | 自定义样式 |
| `onChange` | `OnChangeHandler<string \| number>` | - | 值变化回调 |

## 使用示例

```svelte
<script lang="ts">
  import type { OptionItem } from '@ticatec/uniface-element';
  import { GroupCheckBox } from '@ticatec/uniface-element';
  
  // 权限选项
  const permissions: OptionItem[] = [
    { code: 'read', text: '读取权限' },
    { code: 'write', text: '写入权限' },
    { code: 'delete', text: '删除权限' },
    { code: 'admin', text: '管理权限' }
  ];
  
  // 兴趣爱好选项
  const hobbies: OptionItem[] = [
    { code: 'sports', text: '运动' },
    { code: 'music', text: '音乐' },
    { code: 'reading', text: '阅读' },
    { code: 'travel', text: '旅行' },
    { code: 'cooking', text: '烹饪' }
  ];
  
  let userPermissions: number = 0; // 使用位运算
  let userHobbies: string = ''; // 使用字符串分隔符
  let userSkills: string = '';
  
  const handlePermissionChange = (value: number): void => {
    userPermissions = value;
    console.log('用户权限（位值）：', value);
    
    // 解析位值以查看具体权限
    const selectedPermissions: string[] = [];
    let bitValue: number = value;
    let index: number = 0;
    while (bitValue > 0) {
      if (bitValue & 1) {
        selectedPermissions.push(permissions[index].text);
      }
      bitValue >>= 1;
      index++;
    }
    console.log('选中的权限：', selectedPermissions);
  };
  
  const handleHobbiesChange = (value: string): void => {
    userHobbies = value;
    console.log('用户爱好：', value);
  };
</script>

<!-- 权限选择（位运算模式） -->
<div class="form-group">
  <label>用户权限：</label>
  <GroupCheckBox 
    options={permissions}
    keyField="code"
    textField="text"
    bitBase={true}
    bind:value={userPermissions}
    onChange={handlePermissionChange}
  />
</div>

<!-- 兴趣爱好选择（字符串分隔符模式） -->
<div class="form-group">
  <label>兴趣爱好：</label>
  <GroupCheckBox 
    options={hobbies}
    keyField="code"
    textField="text"
    delimiter=";"
    bind:value={userHobbies}
    onChange={handleHobbiesChange}
  />
</div>

<!-- 紧凑模式的复选框组 -->
<div class="form-group">
  <label>技能标签：</label>
  <GroupCheckBox 
    options={[
      { code: 'js', text: 'JavaScript' },
      { code: 'ts', text: 'TypeScript' },
      { code: 'svelte', text: 'Svelte' },
      { code: 'vue', text: 'Vue.js' }
    ]}
    keyField="code"
    textField="text"
    compact={true}
    item$style="margin-right: 12px;"
    bind:value={userSkills}
  />
</div>
```

## 位运算模式说明

当 `bitBase` 为 `true` 时，组件使用位运算来存储选中状态：
- 第1个选项：位值 1 (二进制 0001)
- 第2个选项：位值 2 (二进制 0010)  
- 第3个选项：位值 4 (二进制 0100)
- 第4个选项：位值 8 (二进制 1000)

选择多个选项时，位值相加。例如选择第1和第3个选项，值为 1 + 4 = 5。

### 位运算工具函数

```typescript
// 检查是否包含某个权限
const hasPermission = (permissions: number, permission: string): boolean => {
  const permissionIndex: number = permissionList.findIndex(p => p.code === permission);
  return (permissions & (1 << permissionIndex)) !== 0;
};

// 添加权限
const addPermission = (permissions: number, permission: string): number => {
  const permissionIndex: number = permissionList.findIndex(p => p.code === permission);
  return permissions | (1 << permissionIndex);
};

// 移除权限
const removePermission = (permissions: number, permission: string): number => {
  const permissionIndex: number = permissionList.findIndex(p => p.code === permission);
  return permissions & ~(1 << permissionIndex);
};

// 解析权限列表
const parsePermissions = (permissions: number): string[] => {
  const result: string[] = [];
  let bitValue: number = permissions;
  let index: number = 0;
  while (bitValue > 0) {
    if (bitValue & 1) {
      result.push(permissionList[index].code);
    }
    bitValue >>= 1;
    index++;
  }
  return result;
};
```

## 高级用法

### 动态选项加载
```svelte
<script lang="ts">
  import type { OptionItem } from '@ticatec/uniface-element';
  import { onMount } from 'svelte';
  
  let options: OptionItem[] = [];
  let selectedValues: string = '';
  let loading: boolean = true;
  
  onMount(async (): Promise<void> => {
    try {
      const response: Response = await fetch('/api/categories');
      options = await response.json();
    } catch (error) {
      console.error('加载选项失败：', error);
    } finally {
      loading = false;
    }
  });
  
  const saveUserPreferences = async (preferences: string): Promise<void> => {
    // 实现保存逻辑
  };
  
  const handleChange = (value: string): void => {
    selectedValues = value;
    // 同步到服务器
    saveUserPreferences(value);
  };
</script>

{#if loading}
  <div class="loading">加载选项中...</div>
{:else}
  <GroupCheckBox 
    {options}
    keyField="id"
    textField="name"
    bind:value={selectedValues}
    onChange={handleChange}
  />
{/if}
```

### 条件禁用和隐藏
```svelte
<script lang="ts">
  import type { OptionItem } from '@ticatec/uniface-element';
  
  type UserLevel = 'basic' | 'premium' | 'enterprise';
  
  const features: OptionItem[] = [
    { code: 'basic', text: '基础功能' },
    { code: 'advanced', text: '高级功能' },
    { code: 'premium', text: '高级功能' },
    { code: 'enterprise', text: '企业功能' }
  ];
  
  let userLevel: UserLevel = 'basic'; // basic, premium, enterprise
  let selectedFeatures: string = '';
  
  // 根据用户级别动态设置禁用选项
  $: disabledOptions = ((): string[] => {
    switch (userLevel) {
      case 'basic':
        return ['advanced', 'premium', 'enterprise'];
      case 'premium':
        return ['enterprise'];
      case 'enterprise':
        return [];
      default:
        return ['advanced', 'premium', 'enterprise'];
    }
  })();
  
  // 隐藏企业功能（如果不是企业用户）
  $: hideOptions: string[] = userLevel !== 'enterprise' ? ['enterprise'] : [];
</script>

<div class="form-group">
  <label>用户级别：</label>
  <select bind:value={userLevel}>
    <option value="basic">基础用户</option>
    <option value="premium">高级用户</option>
    <option value="enterprise">企业用户</option>
  </select>
</div>

<div class="form-group">
  <label>可用功能：</label>
  <GroupCheckBox 
    options={features}
    keyField="code"
    textField="text"
    {disabledOptions}
    hideOptions={hideOptions}
    bind:value={selectedFeatures}
  />
</div>
```

### 全选/全不选功能
```svelte
<script lang="ts">
  import type { OptionItem } from '@ticatec/uniface-element';
  
  const allOptions: OptionItem[] = [
    { code: 'option1', text: '选项1' },
    { code: 'option2', text: '选项2' },
    { code: 'option3', text: '选项3' },
    { code: 'option4', text: '选项4' }
  ];
  
  let selectedValues: string = '';
  
  // 检查是否全选
  $: isAllSelected = ((): boolean => {
    if (!selectedValues) return false;
    const selected: string[] = selectedValues.split(';');
    return allOptions.every(option => selected.includes(option.code));
  })();
  
  // 检查是否有部分选中
  $: isIndeterminate = ((): boolean => {
    if (!selectedValues) return false;
    const selected: string[] = selectedValues.split(';');
    return selected.length > 0 && selected.length < allOptions.length;
  })();
  
  const handleSelectAll = (checked: boolean): void => {
    if (checked) {
      selectedValues = allOptions.map(opt => opt.code).join(';');
    } else {
      selectedValues = '';
    }
  };
  
  const handleChange = (value: string): void => {
    selectedValues = value;
  };
</script>

<div class="select-all-container">
  <CheckBox 
    label="全选"
    value={isAllSelected}
    indeterminate={isIndeterminate}
    onChange={handleSelectAll}
  />
</div>

<GroupCheckBox 
  options={allOptions}
  keyField="code"
  textField="text"
  bind:value={selectedValues}
  onChange={handleChange}
/>
```

## 样式定制

```css
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

.select-all-container {
  padding: 8px 0;
  border-bottom: 1px solid #e1e5e9;
  margin-bottom: 12px;
}

.loading {
  padding: 20px;
  text-align: center;
  color: #6c757d;
}

/* 自定义复选框组样式 */
.custom-checkbox-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
}
```

## 组件优势

**相比单独使用CheckBox的优势：**

1. **统一管理**：所有相关选项集中在一个组件中管理
2. **数据绑定简化**：只需绑定一个值，而不是多个独立的值
3. **样式一致性**：所有选项具有统一的样式和间距
4. **选项动态管理**：可以轻松地显示/隐藏、启用/禁用特定选项
5. **位运算支持**：适合权限系统等需要位运算的场景
6. **更好的语义化**：明确表达了选项之间的关联关系

## 最佳实践

### 1. 选择合适的存储模式
```svelte
<!-- 权限系统：使用位运算 -->
<GroupCheckBox bitBase={true} />

<!-- 普通多选：使用字符串分隔符 -->
<GroupCheckBox delimiter="," />
```

### 2. 提供清晰的标签
```svelte
<label>请选择您感兴趣的技术栈：</label>
<GroupCheckBox 
  options={techStack}
  placeholder="选择技术栈"
/>
```

### 3. 合理使用紧凑模式
```svelte
<!-- 选项较多时使用紧凑模式 -->
<GroupCheckBox compact={true} />
```