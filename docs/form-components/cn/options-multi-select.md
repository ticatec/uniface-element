# OptionsMultiSelect 组件

多选下拉组件，允许从选项中选择多个值，以标签形式显示。

## 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | 外观变体 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `readonly` | `boolean` | `false` | 是否只读 |
| `compact` | `boolean` | `false` | 是否紧凑模式 |
| `value` | `string` | `''` | 选中值（用分隔符连接） |
| `delimiter` | `string` | `';'` | 值分隔符 |
| `options` | `Array<any>` | `[]` | 选项数组 |
| `keyField` | `string` | `'code'` | 值字段名 |
| `textField` | `string` | `'text'` | 显示字段名 |
| `placeholder` | `string` | `''` | 占位符文本 |
| `emptyText` | `string` | `''` | 空值显示文本 |
| `disableOptions` | `Array<string>` | `[]` | 禁用的选项值 |
| `hideOptions` | `Array<string>` | `[]` | 隐藏的选项值 |
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | 显示模式 |
| `menu$height` | `number` | `0` | 下拉菜单高度 |
| `tagColor` | `string` | `''` | 标签颜色 |
| `tagVariant` | `'borderless' \| 'border' \| 'round'` | `'border'` | 标签样式 |
| `style` | `string` | `''` | 自定义样式 |
| `onChange` | `OnChangeHandler<Array<string>>` | - | 值变化回调 |

## 使用示例

```svelte
<script lang="ts">
  import { OptionsMultiSelect } from '@ticatec/uniface-element';
  
  interface Option {
    code: string;
    text: string;
  }
  
  // 技能选项
  const skills: Option[] = [
    { code: 'js', text: 'JavaScript' },
    { code: 'ts', text: 'TypeScript' },
    { code: 'svelte', text: 'Svelte' },
    { code: 'vue', text: 'Vue.js' },
    { code: 'react', text: 'React' },
    { code: 'node', text: 'Node.js' },
    { code: 'python', text: 'Python' },
    { code: 'java', text: 'Java' }
  ];
  
  // 兴趣爱好
  const hobbies: Option[] = [
    { code: 'reading', text: '阅读' },
    { code: 'music', text: '音乐' },
    { code: 'sports', text: '运动' },
    { code: 'travel', text: '旅行' },
    { code: 'photography', text: '摄影' },
    { code: 'cooking', text: '烹饪' }
  ];
  
  let selectedSkills: string = '';
  let selectedHobbies: string = '';
  
  const handleSkillsChange = (values: string[]): void => {
    console.log('选择的技能：', values);
  };
  
  const handleHobbiesChange = (values: string[]): void => {
    console.log('选择的爱好：', values);
  };
</script>

<!-- 技能多选 -->
<OptionsMultiSelect 
  placeholder="请选择您的技能"
  options={skills}
  keyField="code"
  textField="text"
  bind:value={selectedSkills}
  onChange={handleSkillsChange}
/>

<!-- 兴趣爱好多选（圆角标签） -->
<OptionsMultiSelect 
  placeholder="请选择您的兴趣爱好"
  options={hobbies}
  keyField="code"
  textField="text"
  tagVariant="round"
  tagColor="#007bff"
  bind:value={selectedHobbies}
  onChange={handleHobbiesChange}
/>
```

## 高级用法

### 动态选项管理
```svelte
<script lang="ts">
  interface Category {
    id: string;
    name: string;
    parent_id: string | null;
  }
  
  let selectedCategories: string = '';
  let availableCategories: Category[] = [];
  let userLevel: 'basic' | 'premium' | 'admin' = 'basic';
  
  // 根据用户级别过滤可用分类
  $: filteredCategories = availableCategories.filter(cat => {
    if (userLevel === 'basic') {
      return cat.parent_id === null; // 只显示顶级分类
    } else if (userLevel === 'premium') {
      return true; // 显示所有分类
    } else {
      return true; // 管理员看到所有分类
    }
  });
  
  // 根据用户级别设置禁用选项
  $: disabledOptions = userLevel === 'basic' 
    ? availableCategories.filter(cat => cat.parent_id !== null).map(cat => cat.id)
    : [];
</script>

<OptionsMultiSelect 
  placeholder="请选择分类"
  options={filteredCategories}
  keyField="id"
  textField="name"
  {disabledOptions}
  bind:value={selectedCategories}
/>
```

## 最佳实践

### 1. 限制选择数量
```svelte
<script lang="ts">
  let selectedTags: string = '';
  let maxTags: number = 5;
  let tagError: string = '';
  
  const handleTagsChange = (values: string[]): void => {
    if (values.length > maxTags) {
      tagError = `最多只能选择 ${maxTags} 个标签`;
      // 截取前maxTags个
      selectedTags = values.slice(0, maxTags).join(';');
    } else {
      tagError = '';
    }
  };
</script>

<OptionsMultiSelect 
  options={tagOptions}
  bind:value={selectedTags}
  onChange={handleTagsChange}
/>
{#if tagError}
  <div class="error-message">{tagError}</div>
{/if}
```

### 2. 自定义标签样式
```svelte
<OptionsMultiSelect 
  options={colorOptions}
  tagVariant="round"
  tagColor="var(--primary-color)"
  bind:value={selectedColors}
/>
```