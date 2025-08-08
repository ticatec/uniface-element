# MemoEditor 备忘录编辑器组件

MemoEditor 组件提供多行文本输入，具有字符计数、调整大小选项和显示模式支持等高级功能，适用于较长的文本内容。

## 功能特性

- **多行文本输入**：基于textarea的长文本内容输入
- **字符计数**：可选的字符限制和计数器显示
- **可调整大小输入**：可配置的调整大小行为（无、水平、垂直、双向）
- **显示模式**：编辑和查看模式，支持HTML渲染
- **文本换行**：可配置的文本换行行为
- **清除功能**：内置带图标的清除按钮
- **变体支持**：多种样式变体（plain、outlined、filled）
- **HTML转义**：查看模式下的安全HTML渲染

## 导入

```typescript
import { MemoEditor } from '@ticatec/uniface-element/MemoEditor';
```

## 基本用法

### 简单备忘录编辑器

```svelte
<script>
  import { MemoEditor } from '@ticatec/uniface-element/MemoEditor';
  
  let content = '';
</script>

<MemoEditor 
  bind:value={content}
  input$rows={4}
  placeholder="输入您的备忘录..."
/>
```

### 带字符限制和计数器

```svelte
<script>
  import { MemoEditor } from '@ticatec/uniface-element/MemoEditor';
  
  let message = '';
</script>

<MemoEditor 
  bind:value={message}
  maxLength={500}
  showIndicator={true}
  input$rows={5}
  placeholder="写下您的消息（最多500个字符）..."
/>
```

### 可调整大小的编辑器

```svelte
<script>
  import { MemoEditor } from '@ticatec/uniface-element/MemoEditor';
  
  let notes = '';
</script>

<MemoEditor 
  bind:value={notes}
  resize="both"
  input$rows={6}
  variant="outlined"
  placeholder="可调整大小的笔记编辑器..."
/>
```

## API 参考

### 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `value` | `string` | 必需 | 文本内容 |
| `disabled` | `boolean` | `false` | 编辑器是否禁用 |
| `readonly` | `boolean` | `false` | 编辑器是否只读 |
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | 视觉变体 |
| `style` | `string` | `''` | 附加CSS样式 |
| `wrap` | `'hard' \| 'soft'` | `'hard'` | 文本换行行为 |
| `resize` | `'none' \| 'horizontal' \| 'vertical' \| 'both'` | `'none'` | 调整大小功能 |
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | 显示模式（编辑/查看） |
| `input$rows` | `number` | `3` | 可见文本行数 |
| `showIndicator` | `boolean` | `false` | 显示字符计数器 |
| `maxLength` | `number` | `null` | 最大字符限制 |

### DisplayMode 枚举

```typescript
enum DisplayMode {
  Edit = 'edit',    // 编辑模式
  View = 'view'     // 查看模式
}
```

## 高级示例

### 评论系统

```svelte
<script>
  import { MemoEditor, DisplayMode } from '@ticatec/uniface-element/MemoEditor';
  
  let comment = '';
  let isEditing = true;
  let savedComments = [];
  
  const saveComment = () => {
    if (comment.trim()) {
      savedComments = [...savedComments, {
        id: Date.now(),
        content: comment,
        timestamp: new Date().toLocaleString()
      }];
      comment = '';
    }
  };
  
  const editComment = (commentObj) => {
    comment = commentObj.content;
    isEditing = true;
  };
</script>

<div class="comment-system">
  <div class="comment-input">
    <MemoEditor 
      bind:value={comment}
      maxLength={1000}
      showIndicator={true}
      input$rows={4}
      variant="outlined"
      resize="vertical"
      placeholder="写下您的评论..."
      style="margin-bottom: 10px;"
    />
    <button on:click={saveComment} disabled={!comment.trim()}>
      发表评论
    </button>
  </div>
  
  <div class="comment-list">
    {#each savedComments as commentObj (commentObj.id)}
      <div class="comment-item" style="border: 1px solid #ddd; padding: 10px; margin: 5px 0;">
        <MemoEditor 
          value={commentObj.content}
          displayMode={DisplayMode.View}
          style="border: none; background: transparent;"
        />
        <div class="comment-meta" style="font-size: 0.8em; color: #666; margin-top: 5px;">
          {commentObj.timestamp}
          <button on:click={() => editComment(commentObj)}>编辑</button>
        </div>
      </div>
    {/each}
  </div>
</div>
```

### 富文本笔记系统

```svelte
<script>
  import { MemoEditor, DisplayMode } from '@ticatec/uniface-element/MemoEditor';
  
  let notes = {};
  let currentNoteId = null;
  let currentContent = '';
  let isPreviewMode = false;
  
  const createNote = () => {
    const id = Date.now();
    notes[id] = {
      title: `笔记 ${Object.keys(notes).length + 1}`,
      content: '',
      lastModified: new Date()
    };
    currentNoteId = id;
    currentContent = '';
    isPreviewMode = false;
  };
  
  const selectNote = (id) => {
    if (currentNoteId && notes[currentNoteId]) {
      notes[currentNoteId].content = currentContent;
      notes[currentNoteId].lastModified = new Date();
    }
    currentNoteId = id;
    currentContent = notes[id].content;
    isPreviewMode = false;
  };
  
  const saveCurrentNote = () => {
    if (currentNoteId && notes[currentNoteId]) {
      notes[currentNoteId].content = currentContent;
      notes[currentNoteId].lastModified = new Date();
    }
  };
  
  const togglePreview = () => {
    saveCurrentNote();
    isPreviewMode = !isPreviewMode;
  };
</script>

<div class="note-app" style="display: flex; height: 400px;">
  <div class="note-list" style="width: 200px; border-right: 1px solid #ddd; padding: 10px;">
    <button on:click={createNote} style="width: 100%; margin-bottom: 10px;">
      新建笔记
    </button>
    {#each Object.entries(notes) as [id, note] (id)}
      <div 
        class="note-item" 
        class:active={currentNoteId == id}
        style="padding: 8px; margin: 2px 0; cursor: pointer; background: {currentNoteId == id ? '#e3f2fd' : 'transparent'};"
        on:click={() => selectNote(id)}
      >
        <div style="font-weight: bold; font-size: 0.9em;">{note.title}</div>
        <div style="font-size: 0.7em; color: #666;">{note.lastModified.toLocaleDateString()}</div>
      </div>
    {/each}
  </div>
  
  <div class="note-editor" style="flex: 1; display: flex; flex-direction: column;">
    {#if currentNoteId}
      <div class="editor-toolbar" style="padding: 10px; border-bottom: 1px solid #ddd;">
        <button on:click={togglePreview}>
          {isPreviewMode ? '编辑' : '预览'}
        </button>
        <button on:click={saveCurrentNote}>保存</button>
      </div>
      
      <div class="editor-content" style="flex: 1; padding: 10px;">
        <MemoEditor 
          bind:value={currentContent}
          displayMode={isPreviewMode ? DisplayMode.View : DisplayMode.Edit}
          resize="none"
          input$rows={15}
          maxLength={10000}
          showIndicator={!isPreviewMode}
          style="height: 100%; border: none;"
          placeholder="开始写您的笔记..."
        />
      </div>
    {:else}
      <div class="no-note" style="flex: 1; display: flex; align-items: center; justify-content: center; color: #666;">
        选择一个笔记或创建新笔记
      </div>
    {/if}
  </div>
</div>
```

### 带验证的表单

```svelte
<script>
  import { MemoEditor } from '@ticatec/uniface-element/MemoEditor';
  
  let formData = {
    description: '',
    feedback: '',
    requirements: ''
  };
  
  let errors = {};
  
  const validateField = (field, value) => {
    switch (field) {
      case 'description':
        return value.trim().length >= 10 ? '' : '描述至少需要10个字符';
      case 'feedback':
        return value.trim().length >= 5 ? '' : '反馈至少需要5个字符';
      case 'requirements':
        return value.trim().length > 0 ? '' : '需求是必填项';
      default:
        return '';
    }
  };
  
  const handleFieldChange = (field) => (event) => {
    const value = event.target.value;
    formData[field] = value;
    errors[field] = validateField(field, value);
  };
  
  const submitForm = () => {
    // 验证所有字段
    Object.keys(formData).forEach(field => {
      errors[field] = validateField(field, formData[field]);
    });
    
    const hasErrors = Object.values(errors).some(error => error !== '');
    
    if (!hasErrors) {
      console.log('表单提交:', formData);
      alert('表单提交成功！');
    }
  };
</script>

<form class="validated-form" style="max-width: 600px; margin: 0 auto;">
  <div class="field-group" style="margin-bottom: 20px;">
    <label for="description" style="display: block; margin-bottom: 5px; font-weight: bold;">
      项目描述 *
    </label>
    <MemoEditor 
      bind:value={formData.description}
      input$rows={4}
      maxLength={500}
      showIndicator={true}
      variant="outlined"
      resize="vertical"
      placeholder="描述您的项目..."
      on:input={handleFieldChange('description')}
    />
    {#if errors.description}
      <div class="error" style="color: #d32f2f; font-size: 0.875em; margin-top: 4px;">
        {errors.description}
      </div>
    {/if}
  </div>
  
  <div class="field-group" style="margin-bottom: 20px;">
    <label for="feedback" style="display: block; margin-bottom: 5px; font-weight: bold;">
      附加反馈
    </label>
    <MemoEditor 
      bind:value={formData.feedback}
      input$rows={3}
      maxLength={300}
      showIndicator={true}
      variant="filled"
      placeholder="任何额外的反馈..."
      on:input={handleFieldChange('feedback')}
    />
    {#if errors.feedback}
      <div class="error" style="color: #d32f2f; font-size: 0.875em; margin-top: 4px;">
        {errors.feedback}
      </div>
    {/if}
  </div>
  
  <div class="field-group" style="margin-bottom: 20px;">
    <label for="requirements" style="display: block; margin-bottom: 5px; font-weight: bold;">
      需求 *
    </label>
    <MemoEditor 
      bind:value={formData.requirements}
      input$rows={5}
      variant="outlined"
      resize="both"
      placeholder="列出您的需求..."
      on:input={handleFieldChange('requirements')}
    />
    {#if errors.requirements}
      <div class="error" style="color: #d32f2f; font-size: 0.875em; margin-top: 4px;">
        {errors.requirements}
      </div>
    {/if}
  </div>
  
  <button type="button" on:click={submitForm} style="padding: 10px 20px; background: #1976d2; color: white; border: none; border-radius: 4px;">
    提交表单
  </button>
</form>
```

## 最佳实践

1. **字符限制**：为用户指导和数据约束设置适当的`maxLength`
2. **视觉反馈**：在字符限制时使用`showIndicator`以获得更好的用户体验
3. **无障碍访问**：提供清晰的标签和占位符文本
4. **调整大小行为**：根据布局约束选择适当的调整大小选项
5. **验证**：实现带有清晰错误消息的客户端验证
6. **性能**：考虑对实时验证或自动保存功能进行防抖处理
7. **内容安全**：组件在查看模式下自动转义HTML

## 样式说明

- 组件支持标准变体样式（plain、outlined、filled）
- 自定义样式可以通过`style`属性应用
- 启用时字符计数器出现在右下角
- 当有内容且未禁用时出现清除按钮

## 事件

组件转发标准的textarea事件：
- `on:blur`
- `on:focus`
- `on:keydown`
- `on:keyup`
- `on:keypress`
- `on:change`
- `on:input`

## 无障碍访问注意事项

- textarea元素的适当焦点管理
- 字符限制信息以可视方式呈现
- 清除按钮提供替代内容清除方法
- 查看模式下HTML内容安全转义