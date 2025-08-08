# ImageFilesField 图片文件字段组件

ImageFilesField 组件提供专门的图片上传和管理界面，具有缩略图预览、图片预览功能和对多种图片格式的支持。

## 功能特性

- **图片专用上传**：针对图片文件处理优化，自动生成缩略图
- **图片预览**：在模态对话框中全尺寸图片预览
- **缩略图显示**：自动生成和显示缩略图
- **多图片支持**：可配置的最大图片数量
- **图片格式支持**：支持常见图片格式（JPG、PNG、GIF、WebP等）
- **拖拽上传**：直观的拖拽图片上传
- **进度跟踪**：实时上传进度和取消功能
- **显示模式**：编辑和查看模式适应不同场景
- **变体支持**：多种样式变体（plain、outlined、filled）
- **响应式布局**：适应不同屏幕尺寸

## 导入

```typescript
import ImageFilesField from '@ticatec/uniface-element/ImageFilesField';
import type { ImageFile, FileUpload } from '@ticatec/uniface-element/ImageFilesField';
```

## 基本用法

### 简单图片上传字段

```svelte
<script>
  import ImageFilesField from '@ticatec/uniface-element/ImageFilesField';
  import type { ImageFile, FileUpload } from '@ticatec/uniface-element/ImageFilesField';
  
  let images: ImageFile[] = [];
  
  const uploadImage: FileUpload = (file, progressUpdate, onUploaded, errorHandler) => {
    // 验证是否为图片文件
    if (!file.type.startsWith('image/')) {
      errorHandler(new Error('请选择图片文件'));
      return { cancel: async () => true };
    }
    
    // 模拟带缩略图生成的图片上传
    let uploadedBytes = 0;
    const totalBytes = file.size;
    
    const uploadInterval = setInterval(() => {
      uploadedBytes += Math.min(1024 * 100, totalBytes - uploadedBytes);
      progressUpdate(uploadedBytes);
      
      if (uploadedBytes >= totalBytes) {
        clearInterval(uploadInterval);
        
        // 创建缩略图
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
          canvas.width = 150;
          canvas.height = 150;
          ctx?.drawImage(img, 0, 0, 150, 150);
          
          const thumbnailUrl = canvas.toDataURL();
          const fullUrl = URL.createObjectURL(file);
          
          onUploaded(fullUrl, thumbnailUrl);
        };
        
        img.src = URL.createObjectURL(file);
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

<ImageFilesField 
  bind:files={images}
  {uploadImage}
  maxFiles={5}
/>
```

### 单张头像上传

```svelte
<script>
  import ImageFilesField from '@ticatec/uniface-element/ImageFilesField';
  import type { ImageFile, FileUpload } from '@ticatec/uniface-element/ImageFilesField';
  
  let avatar: ImageFile[] = [];
  
  const uploadAvatar: FileUpload = (file, progressUpdate, onUploaded, errorHandler) => {
    // 验证图片尺寸和大小
    const img = new Image();
    img.onload = () => {
      if (img.width < 100 || img.height < 100) {
        errorHandler(new Error('图片尺寸至少为 100x100 像素'));
        return;
      }
      
      if (file.size > 2 * 1024 * 1024) {
        errorHandler(new Error('图片大小必须小于 2MB'));
        return;
      }
      
      // 创建正方形缩略图
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const size = Math.min(img.width, img.height);
      
      canvas.width = 100;
      canvas.height = 100;
      
      const sx = (img.width - size) / 2;
      const sy = (img.height - size) / 2;
      
      ctx?.drawImage(img, sx, sy, size, size, 0, 0, 100, 100);
      
      const thumbnailUrl = canvas.toDataURL();
      const fullUrl = URL.createObjectURL(file);
      
      onUploaded(fullUrl, thumbnailUrl);
    };
    
    img.src = URL.createObjectURL(file);
    
    return {
      cancel: async () => true
    };
  };
  
  const confirmRemoval = async (file: ImageFile) => {
    return confirm('删除头像图片？');
  };
</script>

<div class="avatar-upload">
  <label>头像</label>
  <ImageFilesField 
    bind:files={avatar}
    variant="outlined"
    uploadFile={uploadAvatar}
    removeFileConfirm={confirmRemoval}
    maxFiles={1}
    style="margin-top: 8px;"
  />
</div>
```

## API 参考

### 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `files` | `Array<ImageFile>` | `[]` | 图片文件数组 |
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | 视觉变体 |
| `disabled` | `boolean` | `false` | 字段是否禁用 |
| `readonly` | `boolean` | `false` | 字段是否只读 |
| `style` | `string` | `''` | 附加CSS样式 |
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | 显示模式（编辑/查看） |
| `removeFileConfirm` | `RemoveConfirm` | `null` | 文件删除的可选确认函数 |
| `uploadFile` | `FileUpload` | 必需 | 处理文件上传的函数 |
| `maxFiles` | `number` | `1` | 允许的最大图片数量 |
| `text` | `string \| null` | `null` | 显示文本（从文件名自动生成） |

### 类型定义

#### ImageFile 接口

```typescript
interface ImageFile {
  name: string;           // 图片文件名
  uri: string;            // 全尺寸图片URL或路径
  thumbnail?: string;     // 缩略图URL（可选）
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
type RemoveConfirm = (file: ImageFile) => Promise<boolean>;
```

## 高级示例

### 照片相册上传

```svelte
<script>
  import ImageFilesField, { DisplayMode } from '@ticatec/uniface-element/ImageFilesField';
  import type { ImageFile, FileUpload } from '@ticatec/uniface-element/ImageFilesField';
  
  let galleryImages: ImageFile[] = [];
  let isEditMode = true;
  
  const uploadToGallery: FileUpload = (file, progressUpdate, onUploaded, errorHandler) => {
    // 验证图片文件
    if (!file.type.startsWith('image/')) {
      errorHandler(new Error('只允许图片文件'));
      return { cancel: async () => true };
    }
    
    // 检查文件大小（最大 10MB）
    if (file.size > 10 * 1024 * 1024) {
      errorHandler(new Error('图片大小不能超过 10MB'));
      return { cancel: async () => true };
    }
    
    const img = new Image();
    img.onload = async () => {
      try {
        // 创建优化缩略图
        const thumbnail = await createThumbnail(img, 200, 200);
        
        // 模拟 API 上传
        const formData = new FormData();
        formData.append('image', file);
        formData.append('gallery', 'main');
        
        let uploadedBytes = 0;
        const totalBytes = file.size;
        
        const simulateUpload = setInterval(() => {
          uploadedBytes += Math.min(1024 * 200, totalBytes - uploadedBytes);
          progressUpdate(uploadedBytes);
          
          if (uploadedBytes >= totalBytes) {
            clearInterval(simulateUpload);
            const fullUrl = URL.createObjectURL(file);
            onUploaded(fullUrl, thumbnail);
          }
        }, 100);
        
      } catch (error) {
        errorHandler(new Error('处理图片失败'));
      }
    };
    
    img.onerror = () => {
      errorHandler(new Error('无效的图片文件'));
    };
    
    img.src = URL.createObjectURL(file);
    
    return {
      cancel: async () => true
    };
  };
  
  const createThumbnail = (img: HTMLImageElement, maxWidth: number, maxHeight: number): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // 计算保持宽高比的尺寸
      let { width, height } = img;
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      
      ctx?.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', 0.8));
    });
  };
  
  const confirmImageRemoval = async (image: ImageFile) => {
    const result = await showConfirmDialog({
      title: '删除图片',
      message: `从相册中删除"${image.name}"？`,
      confirmText: '删除',
      cancelText: '取消'
    });
    
    return result;
  };
  
  const showConfirmDialog = (options: any) => {
    return new Promise<boolean>((resolve) => {
      // 自定义确认对话框实现
      const confirmed = confirm(`${options.title}: ${options.message}`);
      resolve(confirmed);
    });
  };
</script>

<div class="photo-gallery">
  <div class="gallery-header">
    <h3>照片相册</h3>
    <div class="gallery-actions">
      <button on:click={() => isEditMode = !isEditMode}>
        {isEditMode ? '查看模式' : '编辑模式'}
      </button>
    </div>
  </div>
  
  <ImageFilesField 
    bind:files={galleryImages}
    variant="outlined"
    displayMode={isEditMode ? DisplayMode.Edit : DisplayMode.View}
    uploadFile={uploadToGallery}
    removeFileConfirm={confirmImageRemoval}
    maxFiles={20}
    style="min-height: 200px; border-radius: 8px;"
  />
  
  <div class="gallery-stats">
    <p>图片: {galleryImages.length} / 20</p>
    <p>支持格式: JPG、PNG、GIF、WebP</p>
  </div>
</div>

<style>
  .photo-gallery {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    background: #fafafa;
  }
  
  .gallery-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .gallery-stats {
    margin-top: 15px;
    padding: 10px;
    background: white;
    border-radius: 4px;
    font-size: 0.9em;
    color: #666;
  }
  
  .gallery-stats p {
    margin: 2px 0;
  }
</style>
```

### 产品图片管理

```svelte
<script>
  import ImageFilesField from '@ticatec/uniface-element/ImageFilesField';
  import type { ImageFile, FileUpload } from '@ticatec/uniface-element/ImageFilesField';
  
  let productImages: ImageFile[] = [];
  let uploadErrors: string[] = [];
  
  const uploadProductImage: FileUpload = (file, progressUpdate, onUploaded, errorHandler) => {
    // 清除之前的错误
    uploadErrors = [];
    
    // 验证产品图片要求
    if (!file.type.startsWith('image/')) {
      const error = '产品只允许上传图片文件';
      uploadErrors = [...uploadErrors, error];
      errorHandler(new Error(error));
      return { cancel: async () => true };
    }
    
    // 检查文件大小
    if (file.size > 5 * 1024 * 1024) {
      const error = '产品图片必须小于 5MB';
      uploadErrors = [...uploadErrors, error];
      errorHandler(new Error(error));
      return { cancel: async () => true };
    }
    
    const img = new Image();
    img.onload = async () => {
      // 验证产品图片尺寸
      if (img.width < 500 || img.height < 500) {
        const error = '产品图片尺寸至少为 500x500 像素';
        uploadErrors = [...uploadErrors, error];
        errorHandler(new Error(error));
        return;
      }
      
      try {
        // 为产品创建多种缩略图尺寸
        const thumbnailSmall = await createProductThumbnail(img, 150, 150);
        const thumbnailMedium = await createProductThumbnail(img, 300, 300);
        
        // 模拟带进度的上传
        let uploaded = 0;
        const total = file.size;
        
        const uploadInterval = setInterval(() => {
          uploaded += Math.min(1024 * 150, total - uploaded);
          progressUpdate(uploaded);
          
          if (uploaded >= total) {
            clearInterval(uploadInterval);
            
            // 返回全尺寸URL和缩略图
            const fullUrl = URL.createObjectURL(file);
            onUploaded(fullUrl, thumbnailSmall);
          }
        }, 80);
        
      } catch (error) {
        const errorMsg = '处理产品图片失败';
        uploadErrors = [...uploadErrors, errorMsg];
        errorHandler(new Error(errorMsg));
      }
    };
    
    img.onerror = () => {
      const error = '无效或损坏的图片文件';
      uploadErrors = [...uploadErrors, error];
      errorHandler(new Error(error));
    };
    
    img.src = URL.createObjectURL(file);
    
    return {
      cancel: async () => true
    };
  };
  
  const createProductThumbnail = (img: HTMLImageElement, width: number, height: number): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = width;
      canvas.height = height;
      
      // 居中裁剪图片以填充正方形
      const size = Math.min(img.width, img.height);
      const sx = (img.width - size) / 2;
      const sy = (img.height - size) / 2;
      
      ctx?.drawImage(img, sx, sy, size, size, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', 0.9));
    });
  };
  
  const confirmProductImageRemoval = async (image: ImageFile) => {
    return confirm(`删除产品图片"${image.name}"？这将影响产品展示。`);
  };
  
  const clearErrors = () => {
    uploadErrors = [];
  };
</script>

<div class="product-image-manager">
  <div class="manager-header">
    <h3>产品图片</h3>
    <div class="requirements">
      <h4>图片要求：</h4>
      <ul>
        <li>最小尺寸 500×500 像素</li>
        <li>最大文件大小 5MB</li>
        <li>格式：JPG、PNG、WebP</li>
        <li>每个产品最多 8 张图片</li>
      </ul>
    </div>
  </div>
  
  {#if uploadErrors.length > 0}
    <div class="error-panel">
      <h4>上传错误：</h4>
      <ul>
        {#each uploadErrors as error}
          <li>{error}</li>
        {/each}
      </ul>
      <button on:click={clearErrors}>清除错误</button>
    </div>
  {/if}
  
  <ImageFilesField 
    bind:files={productImages}
    variant="outlined"
    uploadFile={uploadProductImage}
    removeFileConfirm={confirmProductImageRemoval}
    maxFiles={8}
    style="margin: 20px 0; min-height: 180px;"
  />
  
  <div class="image-summary">
    <p><strong>当前图片：</strong> {productImages.length} / 8</p>
    {#if productImages.length > 0}
      <p><strong>图片名称：</strong></p>
      <ul class="image-list">
        {#each productImages as image}
          <li>{image.name}</li>
        {/each}
      </ul>
    {/if}
  </div>
</div>

<style>
  .product-image-manager {
    max-width: 700px;
    margin: 20px auto;
    padding: 25px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: white;
  }
  
  .manager-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
  }
  
  .requirements {
    background: #f0f8ff;
    padding: 15px;
    border-radius: 6px;
    max-width: 250px;
  }
  
  .requirements h4 {
    margin: 0 0 10px 0;
    color: #1976d2;
    font-size: 0.9em;
  }
  
  .requirements ul {
    margin: 0;
    padding-left: 20px;
    font-size: 0.85em;
    color: #555;
  }
  
  .error-panel {
    background: #ffebee;
    border: 1px solid #f44336;
    padding: 15px;
    border-radius: 4px;
    margin-bottom: 20px;
  }
  
  .error-panel h4 {
    margin: 0 0 10px 0;
    color: #d32f2f;
  }
  
  .error-panel ul {
    margin: 0 0 10px 0;
    padding-left: 20px;
    color: #d32f2f;
  }
  
  .error-panel button {
    background: #d32f2f;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
  }
  
  .image-summary {
    background: #f5f5f5;
    padding: 15px;
    border-radius: 4px;
    font-size: 0.9em;
  }
  
  .image-list {
    margin: 5px 0 0 0;
    padding-left: 20px;
    color: #666;
  }
</style>
```

## 最佳实践

1. **图片验证**：始终验证图片尺寸、文件大小和格式
2. **缩略图生成**：创建缩略图以提高性能和用户体验
3. **进度反馈**：对大型图片文件显示上传进度
4. **错误处理**：为验证失败提供清晰的错误消息
5. **预览功能**：允许用户在上传前后预览图片
6. **宽高比**：考虑保持或强制特定的宽高比
7. **优化**：适当时压缩图片以减少文件大小
8. **无障碍访问**：为图片提供替代文本和适当的ARIA标签

## 样式说明

- 组件以网格布局显示图片缩略图
- 图片预览在模态覆盖层中打开
- 上传进度通过进度条显示
- 自定义样式可以通过`style`属性应用

## 无障碍访问注意事项

- 图片包含适当的alt属性
- 所有交互元素支持键盘导航
- 屏幕阅读器可以访问图片信息
- 颜色对比度符合无障碍标准
- 在模态框中适当处理焦点管理

## 浏览器支持

- 需要Canvas API支持的现代浏览器以生成缩略图
- 需要File API支持进行文件处理
- 拖拽功能需要HTML5支持
- 图片预览功能在所有现代浏览器中工作