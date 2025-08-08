# PromptsTextEditor 组件

带自动完成提示的文本输入组件。

## 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | 外观变体 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `readonly` | `boolean` | `false` | 是否只读 |
| `compact` | `boolean` | `false` | 是否紧凑模式 |
| `value` | `string` | `''` | 输入值 |
| `placeholder` | `string` | `''` | 占位符文本 |
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | 显示模式 |
| `prompts` | `Array<string>` | `[]` | 提示选项数组 |
| `maxPrompts` | `number` | `10` | 最大显示提示数量 |
| `minChars` | `number` | `1` | 触发提示的最小字符数 |
| `caseSensitive` | `boolean` | `false` | 是否区分大小写 |
| `style` | `string` | `''` | 自定义样式 |
| `onChange` | `OnChangeHandler<string>` | - | 值变化回调 |

## 使用示例

```svelte
<script lang="ts">
  import PromptsTextEditor from '@ticatec/uniface-element/PromptsTextEditor';
  
  // 邮箱域名提示
  const emailDomains: string[] = [
    'gmail.com',
    'qq.com',
    '163.com',
    '126.com',
    'hotmail.com',
    'yahoo.com',
    'outlook.com',
    'sina.com'
  ];
  
  // 城市名称提示
  const cities: string[] = [
    '北京市',
    '上海市',
    '广州市',
    '深圳市',
    '杭州市',
    '南京市',
    '成都市',
    '武汉市',
    '西安市',
    '重庆市'
  ];
  
  let email: string = '';
  let city: string = '';
  
  const handleEmailChange = (value: string): void => {
    email = value;
    console.log('邮箱：', value);
  };
  
  const handleCityChange = (value: string): void => {
    city = value;
    console.log('城市：', value);
  };
</script>

<!-- 邮箱输入（域名提示） -->
<PromptsTextEditor 
  placeholder="请输入邮箱地址"
  prompts={emailDomains}
  bind:value={email}
  onChange={handleEmailChange}
/>

<!-- 城市输入（自动完成） -->
<PromptsTextEditor 
  placeholder="请输入城市名称"
  prompts={cities}
  minChars={1}
  maxPrompts={5}
  bind:value={city}
  onChange={handleCityChange}
/>
```

## 高级用法

### 动态提示
```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  
  let searchValue: string = '';
  let dynamicPrompts: string[] = [];
  let isLoading: boolean = false;
  
  // 从API获取提示
  const fetchPrompts = async (query: string): Promise<string[]> => {
    if (query.length < 2) return [];
    
    isLoading = true;
    try {
      const response = await fetch(`/api/suggestions?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      return data.suggestions || [];
    } catch (error) {
      console.error('获取提示失败：', error);
      return [];
    } finally {
      isLoading = false;
    }
  };
  
  // 防抖更新提示
  let debounceTimeout: number;
  const updatePrompts = (value: string): void => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(async () => {
      dynamicPrompts = await fetchPrompts(value);
    }, 300);
  };
  
  const handleSearchChange = (value: string): void => {
    searchValue = value;
    updatePrompts(value);
  };
</script>

<PromptsTextEditor 
  placeholder="搜索产品..."
  prompts={dynamicPrompts}
  minChars={2}
  maxPrompts={8}
  bind:value={searchValue}
  onChange={handleSearchChange}
/>

{#if isLoading}
  <div class="loading-hint">正在获取建议...</div>
{/if}
```

### 标签输入
```svelte
<script lang="ts">
  const availableTags: string[] = [
    'JavaScript',
    'TypeScript',
    'Svelte',
    'Vue.js',
    'React',
    'Node.js',
    'Python',
    'Java',
    'Go',
    'Rust'
  ];
  
  let tagInput: string = '';
  let selectedTags: string[] = [];
  
  const handleTagInput = (value: string): void => {
    tagInput = value;
    
    // 检查是否输入了分隔符
    if (value.includes(',') || value.includes(';')) {
      const newTags = value.split(/[,;]/).map(tag => tag.trim()).filter(Boolean);
      
      newTags.forEach(tag => {
        if (tag && !selectedTags.includes(tag)) {
          selectedTags = [...selectedTags, tag];
        }
      });
      
      tagInput = ''; // 清空输入
    }
  };
  
  const removeTag = (tagToRemove: string): void => {
    selectedTags = selectedTags.filter(tag => tag !== tagToRemove);
  };
  
  // 过滤已选择的标签
  $: filteredPrompts = availableTags.filter(tag => 
    !selectedTags.includes(tag) && 
    tag.toLowerCase().includes(tagInput.toLowerCase())
  );
</script>

<div class="tag-input-container">
  <!-- 已选择的标签 -->
  <div class="selected-tags">
    {#each selectedTags as tag}
      <span class="tag">
        {tag}
        <button type="button" on:click={() => removeTag(tag)}>×</button>
      </span>
    {/each}
  </div>
  
  <!-- 标签输入 -->
  <PromptsTextEditor 
    placeholder="输入标签名称..."
    prompts={filteredPrompts}
    bind:value={tagInput}
    onChange={handleTagInput}
    minChars={1}
    maxPrompts={6}
  />
  
  <div class="tag-hint">使用逗号或分号分隔多个标签</div>
</div>
```

## 最佳实践

### 1. 合理设置触发条件
```svelte
<!-- 短词汇：1个字符触发 -->
<PromptsTextEditor minChars={1} prompts={shortWords} />

<!-- 长词汇或搜索：2-3个字符触发 -->
<PromptsTextEditor minChars={2} prompts={searchTerms} />
```

### 2. 限制提示数量
```svelte
<!-- 避免显示过多提示 -->
<PromptsTextEditor maxPrompts={6} prompts={largeDataset} />
```

### 3. 区分大小写处理
```svelte
<!-- 代码或技术术语：区分大小写 -->
<PromptsTextEditor caseSensitive={true} prompts={codeSnippets} />

<!-- 一般文本：不区分大小写 -->
<PromptsTextEditor caseSensitive={false} prompts={commonWords} />
```