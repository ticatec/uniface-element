# AttachmentFilesField Component

The AttachmentFilesField component provides a comprehensive file upload and management interface with support for various file types, drag-and-drop upload, progress tracking, and file removal confirmation.

## Features

- **Multiple File Upload**: Support for uploading multiple files simultaneously
- **File Type Detection**: Automatic detection and categorization of file types (image, PDF, document, etc.)
- **Drag & Drop Support**: Intuitive drag-and-drop file upload interface
- **Upload Progress**: Real-time upload progress tracking with cancel capability
- **File Management**: View, remove, and manage uploaded files
- **Display Modes**: Edit and view modes for different contexts
- **Variant Support**: Multiple styling variants (plain, outlined, filled)
- **Confirmation Dialogs**: Optional removal confirmation for file deletion
- **Responsive Design**: Adapts to different screen sizes and layouts

## Import

```typescript
import { AttachmentFilesField } from '@ticatec/uniface-element/AttachmentFilesField';
import type { AttachmentFile, FileUpload } from '@ticatec/uniface-element/AttachmentFilesField';
```

## Basic Usage

### Simple File Upload Field

```svelte
<script>
  import { AttachmentFilesField } from '@ticatec/uniface-element/AttachmentFilesField';
  import type { AttachmentFile, FileUpload } from '@ticatec/uniface-element/AttachmentFilesField';
  
  let attachments: AttachmentFile[] = [];
  
  const uploadFile: FileUpload = (file, progressUpdate, onUploaded, errorHandler) => {
    // Simulate file upload
    let uploadedBytes = 0;
    const totalBytes = file.size;
    
    const uploadInterval = setInterval(() => {
      uploadedBytes += Math.min(1024 * 100, totalBytes - uploadedBytes); // 100KB chunks
      progressUpdate(uploadedBytes);
      
      if (uploadedBytes >= totalBytes) {
        clearInterval(uploadInterval);
        // Simulate successful upload with a mock URL
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

### Styled File Upload with Validation

```svelte
<script>
  import { AttachmentFilesField } from '@ticatec/uniface-element/AttachmentFilesField';
  import type { AttachmentFile, FileUpload } from '@ticatec/uniface-element/AttachmentFilesField';
  
  let documents: AttachmentFile[] = [];
  
  const uploadDocument: FileUpload = (file, progressUpdate, onUploaded, errorHandler) => {
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      errorHandler(new Error('File size cannot exceed 10MB'));
      return { cancel: async () => true };
    }
    
    // Validate file type
    const allowedTypes = ['pdf', 'doc', 'docx', 'txt', 'jpg', 'png'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    if (!fileExtension || !allowedTypes.includes(fileExtension)) {
      errorHandler(new Error('File type not supported. Allowed: PDF, DOC, DOCX, TXT, JPG, PNG'));
      return { cancel: async () => true };
    }
    
    // Simulate API upload
    const formData = new FormData();
    formData.append('file', file);
    
    return {
      cancel: async () => {
        // Implementation for canceling upload
        return true;
      }
    };
  };
  
  const confirmRemoval = async (file: AttachmentFile) => {
    return confirm(`Are you sure you want to remove "${file.name}"?`);
  };
</script>

<div class="document-upload">
  <label>Project Documents</label>
  <AttachmentFilesField 
    bind:files={documents}
    variant="outlined"
    uploadFile={uploadDocument}
    removeFileConfirm={confirmRemoval}
    style="margin-top: 8px;"
  />
</div>
```

## API Reference

### Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `files` | `Array<AttachmentFile>` | `[]` | Array of attached files |
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | Visual variant |
| `disabled` | `boolean` | `false` | Whether the field is disabled |
| `readonly` | `boolean` | `false` | Whether the field is read-only |
| `style` | `string` | `''` | Additional CSS styles |
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | Display mode (Edit/View) |
| `removeFileConfirm` | `RemoveConfirm` | `null` | Optional confirmation function for file removal |
| `uploadFile` | `FileUpload` | required | Function to handle file uploads |
| `text` | `string \| null` | `null` | Display text (auto-generated from file names) |

### Types

#### AttachmentFile Interface

```typescript
interface AttachmentFile {
  name: string;     // File name
  type: FileType;   // File type category
  uri: string;      // File URL or path
}
```

#### FileType Enum

```typescript
enum FileType {
  IMAGE = 'img',
  PDF = 'pdf',
  DOC = 'doc',
  XLS = 'xml',
  PPT = 'ppt',
  AUDIO = 'wav',
  VIDEO = 'mov',
  OTHER = 'dat'
}
```

#### FileUpload Function Type

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

#### RemoveConfirm Function Type

```typescript
type RemoveConfirm = (file: AttachmentFile) => Promise<boolean>;
```

## Advanced Examples

### Document Management System

```svelte
<script>
  import { AttachmentFilesField, DisplayMode } from '@ticatec/uniface-element/AttachmentFilesField';
  import type { AttachmentFile, FileUpload } from '@ticatec/uniface-element/AttachmentFilesField';
  
  let projectFiles: AttachmentFile[] = [
    {
      name: "Project_Proposal.pdf",
      type: FileType.PDF,
      uri: "/documents/proposal.pdf"
    },
    {
      name: "Requirements_Doc.docx",
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
          errorHandler(new Error(`Upload failed: ${xhr.statusText}`));
        }
      });
      
      xhr.addEventListener('error', () => {
        errorHandler(new Error('Network error during upload'));
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
      title: 'Remove File',
      message: `Are you sure you want to remove "${file.name}"? This action cannot be undone.`,
      buttons: ['Cancel', 'Remove'],
      type: 'warning'
    });
    
    return result === 'Remove';
  };
  
  const showCustomDialog = (options: any) => {
    return new Promise((resolve) => {
      // Implementation of custom dialog
      const confirmed = confirm(`${options.title}: ${options.message}`);
      resolve(confirmed ? 'Remove' : 'Cancel');
    });
  };
  
  const toggleEditMode = () => {
    isEditMode = !isEditMode;
  };
</script>

<div class="document-manager">
  <div class="manager-header">
    <h3>Project Documents</h3>
    <button on:click={toggleEditMode}>
      {isEditMode ? 'View Mode' : 'Edit Mode'}
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
    <p>Total files: {projectFiles.length}</p>
    <p>Types: {[...new Set(projectFiles.map(f => f.type))].join(', ')}</p>
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

### Form with File Attachments

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
    // File size limit: 5MB
    if (file.size > 5 * 1024 * 1024) {
      errorHandler(new Error('File size must be less than 5MB'));
      return { cancel: async () => true };
    }
    
    // Simulate upload process
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
      errors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }
    
    if (formData.attachments.length === 0) {
      errors.attachments = 'At least one attachment is required';
    }
    
    return Object.keys(errors).length === 0;
  };
  
  const submitForm = async () => {
    if (!validateForm()) return;
    
    isSubmitting = true;
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Form submitted successfully!');
      formData = { title: '', description: '', attachments: [] };
    } catch (error) {
      alert('Submission failed. Please try again.');
    } finally {
      isSubmitting = false;
    }
  };
  
  const confirmRemoval = async (file: AttachmentFile) => {
    return confirm(`Remove "${file.name}" from attachments?`);
  };
</script>

<form class="attachment-form" on:submit|preventDefault={submitForm}>
  <div class="form-group">
    <label for="title">Title *</label>
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
    <label for="description">Description *</label>
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
    <label>Attachments *</label>
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
      Clear
    </button>
    <button 
      type="submit" 
      disabled={isSubmitting}
      class="primary"
    >
      {isSubmitting ? 'Submitting...' : 'Submit'}
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

### Multi-Category File Manager

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
      title: 'Documents',
      accept: ['.pdf', '.doc', '.docx', '.txt', '.rtf'],
      maxSize: 10 * 1024 * 1024, // 10MB
      description: 'PDF, DOC, DOCX, TXT, RTF files up to 10MB'
    },
    images: {
      title: 'Images',
      accept: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'],
      maxSize: 5 * 1024 * 1024, // 5MB
      description: 'Image files up to 5MB'
    },
    archives: {
      title: 'Archives',
      accept: ['.zip', '.rar', '.7z', '.tar', '.gz'],
      maxSize: 50 * 1024 * 1024, // 50MB
      description: 'Archive files up to 50MB'
    }
  };
  
  const createUploadFunction = (category: string): FileUpload => {
    return (file, progressUpdate, onUploaded, errorHandler) => {
      const config = categoryConfigs[category];
      
      // Validate file size
      if (file.size > config.maxSize) {
        const maxSizeMB = Math.round(config.maxSize / (1024 * 1024));
        errorHandler(new Error(`File size exceeds ${maxSizeMB}MB limit`));
        return { cancel: async () => true };
      }
      
      // Validate file type
      const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!config.accept.includes(fileExt)) {
        errorHandler(new Error(`File type not supported. Allowed: ${config.accept.join(', ')}`));
        return { cancel: async () => true };
      }
      
      // Simulate categorized upload
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
    return confirm(`Remove "${file.name}" from ${categoryConfigs[activeCategory].title.toLowerCase()}?`);
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
    <p>Total files across all categories: {getTotalFiles()}</p>
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

## Best Practices

1. **File Validation**: Always validate file size and type before upload
2. **Progress Feedback**: Provide clear progress indicators during upload
3. **Error Handling**: Implement comprehensive error handling for network issues
4. **Confirmation Dialogs**: Use confirmation dialogs for destructive actions
5. **Accessibility**: Ensure proper ARIA labels and keyboard navigation
6. **Performance**: Consider lazy loading for large file lists
7. **Security**: Validate files on the server side as well
8. **User Experience**: Provide clear feedback on file limitations and requirements

## Styling Notes

- The component supports standard variant styling (plain, outlined, filled)
- File icons are automatically selected based on file type
- Upload progress is visually indicated with progress bars
- Custom styles can be applied via the `style` prop

## Accessibility Considerations

- Upload button is keyboard accessible
- File removal buttons include proper ARIA labels
- Screen readers can navigate through file lists
- Progress updates are announced to assistive technologies
- Color contrast meets accessibility standards

## Browser Support

- Modern browsers with File API support
- Drag & drop requires HTML5 support
- Progress tracking works in browsers supporting XMLHttpRequest Level 2