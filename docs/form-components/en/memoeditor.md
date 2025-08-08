# MemoEditor Component

The MemoEditor component provides a multi-line text input with advanced features including character counting, resizing options, and display mode support for longer text content.

## Features

- **Multi-line Text Input**: Textarea-based input for longer text content
- **Character Counting**: Optional character limit and counter display
- **Resizable Input**: Configurable resize behavior (none, horizontal, vertical, both)
- **Display Modes**: Edit and view modes with HTML rendering
- **Text Wrapping**: Configurable text wrapping behavior
- **Clear Function**: Built-in clear button with icon
- **Variant Support**: Multiple styling variants (plain, outlined, filled)
- **HTML Escaping**: Safe HTML rendering in view mode

## Import

```typescript
import { MemoEditor } from '@ticatec/uniface-element/MemoEditor';
```

## Basic Usage

### Simple Memo Editor

```svelte
<script>
  import { MemoEditor } from '@ticatec/uniface-element/MemoEditor';
  
  let content = '';
</script>

<MemoEditor 
  bind:value={content}
  input$rows={4}
  placeholder="Enter your memo..."
/>
```

### With Character Limit and Counter

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
  placeholder="Write your message (max 500 characters)..."
/>
```

### Resizable Editor

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
  placeholder="Resizable notes editor..."
/>
```

## API Reference

### Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `string` | required | The text content |
| `disabled` | `boolean` | `false` | Whether the editor is disabled |
| `readonly` | `boolean` | `false` | Whether the editor is read-only |
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | Visual variant |
| `style` | `string` | `''` | Additional CSS styles |
| `wrap` | `'hard' \| 'soft'` | `'hard'` | Text wrapping behavior |
| `resize` | `'none' \| 'horizontal' \| 'vertical' \| 'both'` | `'none'` | Resize capability |
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | Display mode (Edit/View) |
| `input$rows` | `number` | `3` | Number of visible text lines |
| `showIndicator` | `boolean` | `false` | Show character counter |
| `maxLength` | `number` | `null` | Maximum character limit |

### DisplayMode Enum

```typescript
enum DisplayMode {
  Edit = 'edit',
  View = 'view'
}
```

## Advanced Examples

### Comment System

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
      placeholder="Write your comment..."
      style="margin-bottom: 10px;"
    />
    <button on:click={saveComment} disabled={!comment.trim()}>
      Post Comment
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
          <button on:click={() => editComment(commentObj)}>Edit</button>
        </div>
      </div>
    {/each}
  </div>
</div>
```

### Rich Text Note-Taking

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
      title: `Note ${Object.keys(notes).length + 1}`,
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
      New Note
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
          {isPreviewMode ? 'Edit' : 'Preview'}
        </button>
        <button on:click={saveCurrentNote}>Save</button>
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
          placeholder="Start writing your note..."
        />
      </div>
    {:else}
      <div class="no-note" style="flex: 1; display: flex; align-items: center; justify-content: center; color: #666;">
        Select a note or create a new one
      </div>
    {/if}
  </div>
</div>
```

### Form with Validation

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
        return value.trim().length >= 10 ? '' : 'Description must be at least 10 characters';
      case 'feedback':
        return value.trim().length >= 5 ? '' : 'Feedback must be at least 5 characters';
      case 'requirements':
        return value.trim().length > 0 ? '' : 'Requirements are required';
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
    // Validate all fields
    Object.keys(formData).forEach(field => {
      errors[field] = validateField(field, formData[field]);
    });
    
    const hasErrors = Object.values(errors).some(error => error !== '');
    
    if (!hasErrors) {
      console.log('Form submitted:', formData);
      alert('Form submitted successfully!');
    }
  };
</script>

<form class="validated-form" style="max-width: 600px; margin: 0 auto;">
  <div class="field-group" style="margin-bottom: 20px;">
    <label for="description" style="display: block; margin-bottom: 5px; font-weight: bold;">
      Project Description *
    </label>
    <MemoEditor 
      bind:value={formData.description}
      input$rows={4}
      maxLength={500}
      showIndicator={true}
      variant="outlined"
      resize="vertical"
      placeholder="Describe your project..."
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
      Additional Feedback
    </label>
    <MemoEditor 
      bind:value={formData.feedback}
      input$rows={3}
      maxLength={300}
      showIndicator={true}
      variant="filled"
      placeholder="Any additional feedback..."
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
      Requirements *
    </label>
    <MemoEditor 
      bind:value={formData.requirements}
      input$rows={5}
      variant="outlined"
      resize="both"
      placeholder="List your requirements..."
      on:input={handleFieldChange('requirements')}
    />
    {#if errors.requirements}
      <div class="error" style="color: #d32f2f; font-size: 0.875em; margin-top: 4px;">
        {errors.requirements}
      </div>
    {/if}
  </div>
  
  <button type="button" on:click={submitForm} style="padding: 10px 20px; background: #1976d2; color: white; border: none; border-radius: 4px;">
    Submit Form
  </button>
</form>
```

## Best Practices

1. **Character Limits**: Set appropriate `maxLength` for user guidance and data constraints
2. **Visual Feedback**: Use `showIndicator` with character limits for better UX
3. **Accessibility**: Provide clear labels and placeholder text
4. **Resize Behavior**: Choose appropriate resize options based on layout constraints
5. **Validation**: Implement client-side validation with clear error messages
6. **Performance**: Consider debouncing for real-time validation or auto-save features
7. **Content Safety**: The component automatically escapes HTML in view mode

## Styling Notes

- The component supports standard variant styling (plain, outlined, filled)
- Custom styles can be applied via the `style` prop
- Character counter appears at the bottom-right when enabled
- Clear button appears when content is present and not disabled

## Events

The component forwards standard textarea events:
- `on:blur`
- `on:focus` 
- `on:keydown`
- `on:keyup`
- `on:keypress`
- `on:change`
- `on:input`

## Accessibility Considerations

- Proper focus management for textarea element
- Character limit information is visually presented
- Clear button provides alternative content clearing method
- HTML content is safely escaped in view mode