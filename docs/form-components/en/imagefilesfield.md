# ImageFilesField Component

The ImageFilesField component provides a specialized image upload and management interface with thumbnail previews, image preview functionality, and support for multiple image formats.

## Features

- **Image-Specific Upload**: Optimized for image file handling with automatic thumbnail generation
- **Image Preview**: Full-size image preview in modal dialog
- **Thumbnail Display**: Automatic thumbnail generation and display
- **Multiple Image Support**: Configurable maximum number of images
- **Image Format Support**: Support for common image formats (JPG, PNG, GIF, WebP, etc.)
- **Drag & Drop**: Intuitive drag-and-drop image upload
- **Progress Tracking**: Real-time upload progress with cancel capability
- **Display Modes**: Edit and view modes for different contexts
- **Variant Support**: Multiple styling variants (plain, outlined, filled)
- **Responsive Layout**: Adapts to different screen sizes

## Import

```typescript
import ImageFilesField from '@ticatec/uniface-element/ImageFilesField';
import type { ImageFile, FileUpload } from '@ticatec/uniface-element/ImageFilesField';
```

## Basic Usage

### Simple Image Upload Field

```svelte
<script>
  import ImageFilesField from '@ticatec/uniface-element/ImageFilesField';
  import type { ImageFile, FileUpload } from '@ticatec/uniface-element/ImageFilesField';
  
  let images: ImageFile[] = [];
  
  const uploadImage: FileUpload = (file, progressUpdate, onUploaded, errorHandler) => {
    // Validate that it's an image file
    if (!file.type.startsWith('image/')) {
      errorHandler(new Error('Please select an image file'));
      return { cancel: async () => true };
    }
    
    // Simulate image upload with thumbnail generation
    let uploadedBytes = 0;
    const totalBytes = file.size;
    
    const uploadInterval = setInterval(() => {
      uploadedBytes += Math.min(1024 * 100, totalBytes - uploadedBytes);
      progressUpdate(uploadedBytes);
      
      if (uploadedBytes >= totalBytes) {
        clearInterval(uploadInterval);
        
        // Create thumbnail
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

### Avatar Upload with Single Image

```svelte
<script>
  import ImageFilesField from '@ticatec/uniface-element/ImageFilesField';
  import type { ImageFile, FileUpload } from '@ticatec/uniface-element/ImageFilesField';
  
  let avatar: ImageFile[] = [];
  
  const uploadAvatar: FileUpload = (file, progressUpdate, onUploaded, errorHandler) => {
    // Validate image dimensions and size
    const img = new Image();
    img.onload = () => {
      if (img.width < 100 || img.height < 100) {
        errorHandler(new Error('Image must be at least 100x100 pixels'));
        return;
      }
      
      if (file.size > 2 * 1024 * 1024) {
        errorHandler(new Error('Image size must be less than 2MB'));
        return;
      }
      
      // Create square thumbnail
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
    return confirm('Remove avatar image?');
  };
</script>

<div class="avatar-upload">
  <label>Profile Picture</label>
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

## API Reference

### Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `files` | `Array<ImageFile>` | `[]` | Array of image files |
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | Visual variant |
| `disabled` | `boolean` | `false` | Whether the field is disabled |
| `readonly` | `boolean` | `false` | Whether the field is read-only |
| `style` | `string` | `''` | Additional CSS styles |
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | Display mode (Edit/View) |
| `removeFileConfirm` | `RemoveConfirm` | `null` | Optional confirmation function for file removal |
| `uploadFile` | `FileUpload` | required | Function to handle file uploads |
| `maxFiles` | `number` | `1` | Maximum number of images allowed |
| `text` | `string \| null` | `null` | Display text (auto-generated from file names) |

### Types

#### ImageFile Interface

```typescript
interface ImageFile {
  name: string;           // Image file name
  uri: string;            // Full-size image URL or path
  thumbnail?: string;     // Thumbnail URL (optional)
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
type RemoveConfirm = (file: ImageFile) => Promise<boolean>;
```

## Advanced Examples

### Photo Gallery Upload

```svelte
<script>
  import ImageFilesField, { DisplayMode } from '@ticatec/uniface-element/ImageFilesField';
  import type { ImageFile, FileUpload } from '@ticatec/uniface-element/ImageFilesField';
  
  let galleryImages: ImageFile[] = [];
  let isEditMode = true;
  
  const uploadToGallery: FileUpload = (file, progressUpdate, onUploaded, errorHandler) => {
    // Validate image file
    if (!file.type.startsWith('image/')) {
      errorHandler(new Error('Only image files are allowed'));
      return { cancel: async () => true };
    }
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      errorHandler(new Error('Image size cannot exceed 10MB'));
      return { cancel: async () => true };
    }
    
    const img = new Image();
    img.onload = async () => {
      try {
        // Create optimized thumbnail
        const thumbnail = await createThumbnail(img, 200, 200);
        
        // Simulate API upload
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
        errorHandler(new Error('Failed to process image'));
      }
    };
    
    img.onerror = () => {
      errorHandler(new Error('Invalid image file'));
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
      
      // Calculate dimensions maintaining aspect ratio
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
      title: 'Remove Image',
      message: `Remove "${image.name}" from gallery?`,
      confirmText: 'Remove',
      cancelText: 'Cancel'
    });
    
    return result;
  };
  
  const showConfirmDialog = (options: any) => {
    return new Promise<boolean>((resolve) => {
      // Custom confirmation dialog implementation
      const confirmed = confirm(`${options.title}: ${options.message}`);
      resolve(confirmed);
    });
  };
</script>

<div class="photo-gallery">
  <div class="gallery-header">
    <h3>Photo Gallery</h3>
    <div class="gallery-actions">
      <button on:click={() => isEditMode = !isEditMode}>
        {isEditMode ? 'View Mode' : 'Edit Mode'}
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
    <p>Images: {galleryImages.length} / 20</p>
    <p>Formats supported: JPG, PNG, GIF, WebP</p>
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

### Product Image Management

```svelte
<script>
  import ImageFilesField from '@ticatec/uniface-element/ImageFilesField';
  import type { ImageFile, FileUpload } from '@ticatec/uniface-element/ImageFilesField';
  
  let productImages: ImageFile[] = [];
  let uploadErrors: string[] = [];
  
  const uploadProductImage: FileUpload = (file, progressUpdate, onUploaded, errorHandler) => {
    // Clear previous errors
    uploadErrors = [];
    
    // Validate image requirements for product
    if (!file.type.startsWith('image/')) {
      const error = 'Only image files are allowed for products';
      uploadErrors = [...uploadErrors, error];
      errorHandler(new Error(error));
      return { cancel: async () => true };
    }
    
    // Check file size
    if (file.size > 5 * 1024 * 1024) {
      const error = 'Product images must be smaller than 5MB';
      uploadErrors = [...uploadErrors, error];
      errorHandler(new Error(error));
      return { cancel: async () => true };
    }
    
    const img = new Image();
    img.onload = async () => {
      // Validate dimensions for product images
      if (img.width < 500 || img.height < 500) {
        const error = 'Product images must be at least 500x500 pixels';
        uploadErrors = [...uploadErrors, error];
        errorHandler(new Error(error));
        return;
      }
      
      try {
        // Create multiple thumbnail sizes for product
        const thumbnailSmall = await createProductThumbnail(img, 150, 150);
        const thumbnailMedium = await createProductThumbnail(img, 300, 300);
        
        // Simulate upload with progress
        let uploaded = 0;
        const total = file.size;
        
        const uploadInterval = setInterval(() => {
          uploaded += Math.min(1024 * 150, total - uploaded);
          progressUpdate(uploaded);
          
          if (uploaded >= total) {
            clearInterval(uploadInterval);
            
            // Return full URL and thumbnail
            const fullUrl = URL.createObjectURL(file);
            onUploaded(fullUrl, thumbnailSmall);
          }
        }, 80);
        
      } catch (error) {
        const errorMsg = 'Failed to process product image';
        uploadErrors = [...uploadErrors, errorMsg];
        errorHandler(new Error(errorMsg));
      }
    };
    
    img.onerror = () => {
      const error = 'Invalid or corrupted image file';
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
      
      // Center and crop the image to fill the square
      const size = Math.min(img.width, img.height);
      const sx = (img.width - size) / 2;
      const sy = (img.height - size) / 2;
      
      ctx?.drawImage(img, sx, sy, size, size, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', 0.9));
    });
  };
  
  const confirmProductImageRemoval = async (image: ImageFile) => {
    return confirm(`Remove product image "${image.name}"? This will affect product display.`);
  };
  
  const clearErrors = () => {
    uploadErrors = [];
  };
</script>

<div class="product-image-manager">
  <div class="manager-header">
    <h3>Product Images</h3>
    <div class="requirements">
      <h4>Image Requirements:</h4>
      <ul>
        <li>Minimum 500×500 pixels</li>
        <li>Maximum 5MB file size</li>
        <li>Formats: JPG, PNG, WebP</li>
        <li>Up to 8 images per product</li>
      </ul>
    </div>
  </div>
  
  {#if uploadErrors.length > 0}
    <div class="error-panel">
      <h4>Upload Errors:</h4>
      <ul>
        {#each uploadErrors as error}
          <li>{error}</li>
        {/each}
      </ul>
      <button on:click={clearErrors}>Clear Errors</button>
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
    <p><strong>Current images:</strong> {productImages.length} / 8</p>
    {#if productImages.length > 0}
      <p><strong>Image names:</strong></p>
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

## Best Practices

1. **Image Validation**: Always validate image dimensions, file size, and format
2. **Thumbnail Generation**: Create thumbnails for better performance and UX
3. **Progress Feedback**: Show upload progress for large image files
4. **Error Handling**: Provide clear error messages for validation failures
5. **Preview Functionality**: Allow users to preview images before and after upload
6. **Aspect Ratio**: Consider maintaining or enforcing specific aspect ratios
7. **Optimization**: Compress images when appropriate to reduce file size
8. **Accessibility**: Provide alt text and proper ARIA labels for images

## Styling Notes

- The component displays images as thumbnails in a grid layout
- Image previews open in a modal overlay
- Upload progress is shown with progress bars
- Custom styles can be applied via the `style` prop

## Accessibility Considerations

- Images include appropriate alt attributes
- Keyboard navigation is supported for all interactive elements
- Screen readers can access image information
- Color contrast meets accessibility standards
- Focus management is handled properly in modals

## Browser Support

- Modern browsers with Canvas API support for thumbnail generation
- File API support required for file handling
- Drag & drop requires HTML5 support
- Image preview functionality works in all modern browsers