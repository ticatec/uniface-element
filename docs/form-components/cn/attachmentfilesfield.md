# AttachmentFilesField 附件文件字段组件

AttachmentFilesField 组件提供全面的文件上传和管理界面，支持多种文件类型、拖拽上传、进度跟踪和文件删除确认。

## 功能特性

- **多文件上传**：支持同时上传多个文件
- **文件类型检测**：自动检测和分类文件类型（图片、PDF、文档等）
- **拖拽支持**：直观的拖拽文件上传界面
- **上传进度**：实时上传进度跟踪和取消功能
- **文件管理**：查看、删除和管理已上传的文件
- **显示模式**：编辑和查看模式适应不同场景
- **变体支持**：多种样式变体（plain、outlined、filled）
- **确认对话框**：文件删除的可选确认对话框
- **响应式设计**：适应不同屏幕尺寸和布局

## 导入

```typescript
import { AttachmentFilesField } from '@ticatec/uniface-element/AttachmentFilesField';
import type { AttachmentFile, FileUpload } from '@ticatec/uniface-element/AttachmentFilesField';
```

## 基本用法

### 简单文件上传字段

```svelte
<script>
  import { AttachmentFilesField } from '@ticatec/uniface-element/AttachmentFilesField';
  import type { AttachmentFile, FileUpload } from '@ticatec/uniface-element/AttachmentFilesField';
  
  let attachments: AttachmentFile[] = [];
  
  const uploadFile: FileUpload = (file, progressUpdate, onUploaded, errorHandler) => {
    // 模拟文件上传
    let uploadedBytes = 0;
    const totalBytes = file.size;
    
    const uploadInterval = setInterval(() => {
      uploadedBytes += Math.min(1024 * 100, totalBytes - uploadedBytes); // 100KB 块
      progressUpdate(uploadedBytes);
      
      if (uploadedBytes >= totalBytes) {
        clearInterval(uploadInterval);
        // 模拟成功上传并返回模拟URL
        const mockUrl = URL.createObjectURL(file);
        onUploaded(mockUrl);
      }
    }, 100);
    
    return {
      cancel: async () => {
        clearInterval(uploadInterval);
        return true;
      }
    };
  };
</script>

<AttachmentFilesField 
  bind:files={attachments}
  {uploadFile}
/>
```

### 带验证的样式化文件上传

```svelte
<script>
  import { AttachmentFilesField } from '@ticatec/uniface-element/AttachmentFilesField';
  import type { AttachmentFile, FileUpload } from '@ticatec/uniface-element/AttachmentFilesField';
  
  let documents: AttachmentFile[] = [];
  
  const uploadDocument: FileUpload = (file, progressUpdate, onUploaded, errorHandler) => {
    // 验证文件大小（最大 10MB）
    if (file.size > 10 * 1024 * 1024) {
      errorHandler(new Error('文件大小不能超过 10MB'));
      return { cancel: async () => true };
    }
    
    // 验证文件类型
    const allowedTypes = ['pdf', 'doc', 'docx', 'txt', 'jpg', 'png'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    if (!fileExtension || !allowedTypes.includes(fileExtension)) {
      errorHandler(new Error('不支持的文件类型。允许的类型：PDF、DOC、DOCX、TXT、JPG、PNG'));
      return { cancel: async () => true };
    }
    
    // 模拟 API 上传
    const formData = new FormData();
    formData.append('file', file);
    
    return {
      cancel: async () => {
        // 取消上传的实现
        return true;
      }
    };
  };
  
  const confirmRemoval = async (file: AttachmentFile) => {
    return confirm(`确定要删除"${file.name}"吗？`);
  };
</script>

<div class="document-upload">
  <label>项目文档</label>
  <AttachmentFilesField 
    bind:files={documents}
    variant="outlined"
    uploadFile={uploadDocument}
    removeFileConfirm={confirmRemoval}
    style="margin-top: 8px;"
  />
</div>
```

## API 参考

### 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `files` | `Array<AttachmentFile>` | `[]` | 附件文件数组 |
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | 视觉变体 |
| `disabled` | `boolean` | `false` | 字段是否禁用 |
| `readonly` | `boolean` | `false` | 字段是否只读 |
| `style` | `string` | `''` | 附加CSS样式 |
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | 显示模式（编辑/查看） |
| `removeFileConfirm` | `RemoveConfirm` | `null` | 文件删除的可选确认函数 |
| `uploadFile` | `FileUpload` | 必需 | 处理文件上传的函数 |
| `text` | `string \| null` | `null` | 显示文本（从文件名自动生成） |

### 类型定义

#### AttachmentFile 接口

```typescript
interface AttachmentFile {
  name: string;     // 文件名
  type: FileType;   // 文件类型分类
  uri: string;      // 文件URL或路径
}
```

#### FileType 枚举

```typescript
enum FileType {
  IMAGE = 'img',    // 图片
  PDF = 'pdf',      // PDF文档
  DOC = 'doc',      // Word文档
  XLS = 'xml',      // Excel表格
  PPT = 'ppt',      // PowerPoint演示文稿
  AUDIO = 'wav',    // 音频文件
  VIDEO = 'mov',    // 视频文件
  OTHER = 'dat'     // 其他文件
}
```

#### FileUpload 函数类型

```typescript
type FileUpload = (
  file: File,
  progressUpdate: ProgressUpdate,
  onUploaded: OnUploaded,
  errorHandler: ErrorHandler
) => UploadProgress;

type ProgressUpdate = (uploadBytes: number) => void;
type OnUploaded = (url: string, thumbnail?: string) => void;
type ErrorHandler = (e: Error) => void;

interface UploadProgress {
  cancel: () => Promise<boolean>;
}
```

#### RemoveConfirm 函数类型

```typescript
type RemoveConfirm = (file: AttachmentFile) => Promise<boolean>;
```

## 高级示例

### 文档管理系统

```svelte
<script>
  import { AttachmentFilesField, DisplayMode } from '@ticatec/uniface-element/AttachmentFilesField';
  import type { AttachmentFile, FileUpload } from '@ticatec/uniface-element/AttachmentFilesField';
  
  let projectFiles: AttachmentFile[] = [
    {
      name: "项目提案.pdf",
      type: FileType.PDF,
      uri: "/documents/proposal.pdf"
    },
    {
      name: "需求文档.docx",
      type: FileType.DOC,
      uri: "/documents/requirements.docx"
    }
  ];
  
  let isEditMode = true;
  let uploadProgress = new Map<string, number>();
  
  const uploadToServer: FileUpload = async (file, progressUpdate, onUploaded, errorHandler) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', 'project-documents');
      
      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          progressUpdate(e.loaded);
        }
      });
      
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          onUploaded(response.url, response.thumbnail);
        } else {
          errorHandler(new Error(`上传失败: ${xhr.statusText}`));
        }
      });
      
      xhr.addEventListener('error', () => {
        errorHandler(new Error('上传过程中发生网络错误'));
      });
      
      xhr.open('POST', '/api/upload');
      xhr.send(formData);
      
      return {
        cancel: async () => {
          xhr.abort();
          return true;
        }
      };
    } catch (error) {
      errorHandler(error as Error);
      return { cancel: async () => true };
    }
  };
  
  const confirmFileRemoval = async (file: AttachmentFile) => {
    const result = await showCustomDialog({
      title: '删除文件',
      message: `确定要删除"${file.name}"吗？此操作无法撤销。`,
      buttons: ['取消', '删除'],
      type: 'warning'
    });
    
    return result === '删除';
  };
  
  const showCustomDialog = (options: any) => {
    return new Promise((resolve) => {
      // 自定义对话框的实现
      const confirmed = confirm(`${options.title}: ${options.message}`);
      resolve(confirmed ? '删除' : '取消');
    });
  };
  
  const toggleEditMode = () => {
    isEditMode = !isEditMode;
  };
</script>

<div class="document-manager">
  <div class="manager-header">
    <h3>项目文档</h3>
    <button on:click={toggleEditMode}>
      {isEditMode ? '查看模式' : '编辑模式'}
    </button>
  </div>
  
  <AttachmentFilesField 
    bind:files={projectFiles}
    variant="outlined"
    displayMode={isEditMode ? DisplayMode.Edit : DisplayMode.View}
    uploadFile={uploadToServer}
    removeFileConfirm={confirmFileRemoval}
    style="margin-top: 15px; min-height: 120px;"
  />
  
  <div class="file-summary">
    <p>文件总数: {projectFiles.length}</p>
    <p>类型: {[...new Set(projectFiles.map(f => f.type))].join(', ')}</p>
  </div>
</div>

<style>
  .document-manager {
    max-width: 600px;
    margin: 20px 0;
  }
  
  .manager-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .file-summary {
    margin-top: 10px;
    padding: 10px;
    background: #f5f5f5;
    border-radius: 4px;
    font-size: 0.9em;
    color: #666;
  }
</style>
```

### 带附件的表单

```svelte
<script>
  import { AttachmentFilesField } from '@ticatec/uniface-element/AttachmentFilesField';
  import type { AttachmentFile, FileUpload } from '@ticatec/uniface-element/AttachmentFilesField';
  
  let formData = {
    title: '',
    description: '',
    attachments: [] as AttachmentFile[]
  };
  
  let errors = {};
  let isSubmitting = false;
  
  const uploadFile: FileUpload = (file, progressUpdate, onUploaded, errorHandler) => {
    // 文件大小限制：5MB
    if (file.size > 5 * 1024 * 1024) {
      errorHandler(new Error('文件大小必须小于 5MB'));
      return { cancel: async () => true };
    }
    
    // 模拟上传过程
    let uploaded = 0;
    const total = file.size;
    
    const interval = setInterval(() => {
      uploaded += Math.min(1024 * 50, total - uploaded);
      progressUpdate(uploaded);
      
      if (uploaded >= total) {
        clearInterval(interval);
        setTimeout(() => {
          const mockUrl = `/files/${Date.now()}_${file.name}`;
          onUploaded(mockUrl);
        }, 200);
      }
    }, 50);
    
    return {
      cancel: async () => {
        clearInterval(interval);
        return true;
      }
    };
  };
  
  const validateForm = () => {
    errors = {};
    
    if (!formData.title.trim()) {
      errors.title = '标题是必填项';
    }
    
    if (!formData.description.trim()) {
      errors.description = '描述是必填项';
    }
    
    if (formData.attachments.length === 0) {
      errors.attachments = '至少需要一个附件';
    }
    
    return Object.keys(errors).length === 0;
  };
  
  const submitForm = async () => {
    if (!validateForm()) return;
    
    isSubmitting = true;
    
    try {
      // 模拟表单提交
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('表单提交成功！');
      formData = { title: '', description: '', attachments: [] };
    } catch (error) {
      alert('提交失败，请重试。');
    } finally {
      isSubmitting = false;
    }
  };
  
  const confirmRemoval = async (file: AttachmentFile) => {
    return confirm(`从附件中删除"${file.name}"？`);
  };
</script>

<form class="attachment-form" on:submit|preventDefault={submitForm}>
  <div class="form-group">
    <label for="title">标题 *</label>
    <input
      id="title"
      type="text"
      bind:value={formData.title}
      disabled={isSubmitting}
      class:error={errors.title}
    />
    {#if errors.title}
      <div class="error-message">{errors.title}</div>
    {/if}
  </div>
  
  <div class="form-group">
    <label for="description">描述 *</label>
    <textarea
      id="description"
      rows="4"
      bind:value={formData.description}
      disabled={isSubmitting}
      class:error={errors.description}
    ></textarea>
    {#if errors.description}
      <div class="error-message">{errors.description}</div>
    {/if}
  </div>
  
  <div class="form-group">
    <label>附件 *</label>
    <AttachmentFilesField
      bind:files={formData.attachments}
      variant="outlined"
      {uploadFile}
      removeFileConfirm={confirmRemoval}
      disabled={isSubmitting}
    />
    {#if errors.attachments}
      <div class="error-message">{errors.attachments}</div>
    {/if}
  </div>
  
  <div class="form-actions">
    <button 
      type="button" 
      on:click={() => formData = { title: '', description: '', attachments: [] }}
      disabled={isSubmitting}
    >
      清除
    </button>
    <button 
      type="submit" 
      disabled={isSubmitting}
      class="primary"
    >
      {isSubmitting ? '提交中...' : '提交'}
    </button>
  </div>
</form>

<style>
  .attachment-form {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
  }
  
  .form-group input, .form-group textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }
  
  .form-group input.error, .form-group textarea.error {
    border-color: #d32f2f;
  }
  
  .error-message {
    color: #d32f2f;
    font-size: 0.875em;
    margin-top: 4px;
  }
  
  .form-actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }
  
  button {
    padding: 10px 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }
  
  button.primary {
    background: #1976d2;
    color: white;
    border-color: #1976d2;
  }
  
  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
</style>
```

### 多分类文件管理器

```svelte
<script>
  import { AttachmentFilesField, DisplayMode } from '@ticatec/uniface-element/AttachmentFilesField';
  import type { AttachmentFile, FileUpload } from '@ticatec/uniface-element/AttachmentFilesField';
  
  let fileCategories = {
    documents: [] as AttachmentFile[],
    images: [] as AttachmentFile[],
    archives: [] as AttachmentFile[]
  };
  
  let activeCategory = 'documents';
  
  const categoryConfigs = {
    documents: {
      title: '文档',
      accept: ['.pdf', '.doc', '.docx', '.txt', '.rtf'],
      maxSize: 10 * 1024 * 1024, // 10MB
      description: 'PDF、DOC、DOCX、TXT、RTF 文件，最大 10MB'
    },
    images: {
      title: '图片',
      accept: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'],
      maxSize: 5 * 1024 * 1024, // 5MB
      description: '图片文件，最大 5MB'
    },
    archives: {
      title: '压缩包',
      accept: ['.zip', '.rar', '.7z', '.tar', '.gz'],
      maxSize: 50 * 1024 * 1024, // 50MB
      description: '压缩包文件，最大 50MB'
    }
  };
  
  const createUploadFunction = (category: string): FileUpload => {
    return (file, progressUpdate, onUploaded, errorHandler) => {
      const config = categoryConfigs[category];
      
      // 验证文件大小
      if (file.size > config.maxSize) {
        const maxSizeMB = Math.round(config.maxSize / (1024 * 1024));
        errorHandler(new Error(`文件大小超过 ${maxSizeMB}MB 限制`));
        return { cancel: async () => true };
      }
      
      // 验证文件类型
      const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!config.accept.includes(fileExt)) {
        errorHandler(new Error(`不支持的文件类型。允许的类型：${config.accept.join(', ')}`));
        return { cancel: async () => true };
      }
      
      // 模拟分类上传
      let uploaded = 0;
      const total = file.size;
      
      const interval = setInterval(() => {
        uploaded += Math.min(1024 * 100, total - uploaded);
        progressUpdate(uploaded);
        
        if (uploaded >= total) {
          clearInterval(interval);
          setTimeout(() => {
            const mockUrl = `/files/${category}/${Date.now()}_${file.name}`;
            onUploaded(mockUrl);
          }, 300);
        }
      }, 100);
      
      return {
        cancel: async () => {
          clearInterval(interval);
          return true;
        }
      };
    };
  };
  
  const confirmRemoval = async (file: AttachmentFile) => {
    return confirm(`从${categoryConfigs[activeCategory].title.toLowerCase()}中删除"${file.name}"？`);
  };
  
  const getTotalFiles = () => {
    return Object.values(fileCategories).reduce((sum, files) => sum + files.length, 0);
  };
</script>

<div class="multi-category-manager">
  <div class="category-tabs">
    {#each Object.keys(categoryConfigs) as category}
      <button
        class="tab"
        class:active={activeCategory === category}
        on:click={() => activeCategory = category}
      >
        {categoryConfigs[category].title}
        ({fileCategories[category].length})
      </button>
    {/each}
  </div>
  
  <div class="category-content">
    <div class="category-header">
      <h3>{categoryConfigs[activeCategory].title}</h3>
      <p class="category-description">{categoryConfigs[activeCategory].description}</p>
    </div>
    
    <AttachmentFilesField
      bind:files={fileCategories[activeCategory]}
      variant="outlined"
      uploadFile={createUploadFunction(activeCategory)}
      removeFileConfirm={confirmRemoval}
      style="min-height: 150px;"
    />
  </div>
  
  <div class="summary">
    <p>所有分类的文件总数: {getTotalFiles()}</p>
  </div>
</div>

<style>
  .multi-category-manager {
    max-width: 800px;
    margin: 20px auto;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .category-tabs {
    display: flex;
    background: #f5f5f5;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .tab {
    flex: 1;
    padding: 15px 20px;
    border: none;
    background: transparent;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .tab:hover {
    background: #e8e8e8;
  }
  
  .tab.active {
    background: white;
    border-bottom: 2px solid #1976d2;
    color: #1976d2;
    font-weight: bold;
  }
  
  .category-content {
    padding: 20px;
  }
  
  .category-header {
    margin-bottom: 15px;
  }
  
  .category-header h3 {
    margin: 0 0 5px 0;
    color: #333;
  }
  
  .category-description {
    margin: 0;
    font-size: 0.9em;
    color: #666;
  }
  
  .summary {
    padding: 15px 20px;
    background: #f9f9f9;
    border-top: 1px solid #e0e0e0;
    font-size: 0.9em;
    color: #666;
  }
</style>
```

## 最佳实践

1. **文件验证**：始终在上传前验证文件大小和类型
2. **进度反馈**：在上传过程中提供清晰的进度指示器
3. **错误处理**：实施全面的错误处理以应对网络问题
4. **确认对话框**：对破坏性操作使用确认对话框
5. **无障碍访问**：确保适当的ARIA标签和键盘导航
6. **性能优化**：对大型文件列表考虑延迟加载
7. **安全性**：在服务器端也要验证文件
8. **用户体验**：明确提供文件限制和要求的反馈

## 样式说明

- 组件支持标准变体样式（plain、outlined、filled）
- 文件图标根据文件类型自动选择
- 上传进度通过进度条可视化显示
- 自定义样式可以通过`style`属性应用

## 无障碍访问注意事项

- 上传按钮支持键盘访问
- 文件删除按钮包含适当的ARIA标签
- 屏幕阅读器可以导航文件列表
- 进度更新会通知辅助技术
- 颜色对比度符合无障碍标准

## 浏览器支持

- 支持File API的现代浏览器
- 拖拽功能需要HTML5支持
- 进度跟踪在支持XMLHttpRequest Level 2的浏览器中工作