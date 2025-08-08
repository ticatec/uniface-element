# ProgressBar Component

The ProgressBar component provides visual progress indication with support for both circular and linear display modes, along with various status states.

## Features

- **Multiple Display Types**: Circular and linear progress bars
- **Status Indicators**: Success, failure, canceled, and progressing states
- **Customizable Appearance**: Configurable size, colors, and text display
- **Visual Feedback**: Icons and color coding for different states
- **CSS Custom Properties**: Theme support through CSS variables

## Import

```typescript
import { ProgressBar, ProgressStatus } from '@ticatec/uniface-element/ProgressBar';
```

## Basic Usage

### Circular Progress Bar

```svelte
<script>
  import { ProgressBar, ProgressStatus } from '@ticatec/uniface-element/ProgressBar';
  
  let progress = 65;
  let status = ProgressStatus.progressing;
</script>

<ProgressBar 
  {progress} 
  {status}
  type="circular" 
  size={120} 
/>
```

### Linear Progress Bar

```svelte
<script>
  import { ProgressBar, ProgressStatus } from '@ticatec/uniface-element/ProgressBar';
  
  let progress = 45;
</script>

<ProgressBar 
  {progress}
  type="liner" 
  height={8}
  showText={true}
/>
```

## API Reference

### Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `progress` | `number` | `0` | Progress value (0-100) |
| `size` | `number` | `100` | Size of circular progress bar |
| `type` | `'circular' \| 'liner'` | `'circular'` | Progress bar type |
| `height` | `number` | `5` | Height/thickness of progress bar |
| `showText` | `boolean` | `true` | Whether to show progress text |
| `status` | `ProgressStatus` | `ProgressStatus.progressing` | Progress status |

### ProgressStatus Enum

```typescript
enum ProgressStatus {
  progressing = 'progressing',
  successful = 'successful',
  failure = 'failure',
  canceled = 'canceled'
}
```

## Status Examples

### Success State

```svelte
<ProgressBar 
  progress={100} 
  status={ProgressStatus.successful}
  type="circular"
/>
```

### Failure State

```svelte
<ProgressBar 
  progress={50} 
  status={ProgressStatus.failure}
  type="liner"
/>
```

### Canceled State

```svelte
<ProgressBar 
  progress={30} 
  status={ProgressStatus.canceled}
  type="circular"
/>
```

## Styling

The component uses CSS custom properties for theming:

```css
:root {
  --uniface-progress-bar-color: #22BDFF;
  --uniface-progress-bar-success-color: #2DC071;
  --uniface-progress-bar-failure-color: #FF685B;
  --uniface-progress-bar-canceled-color: #FFC533;
  --uniface-progress-bar-bg: #E2E8F0;
}
```

## Advanced Examples

### Dynamic Progress with Status Updates

```svelte
<script>
  import { ProgressBar, ProgressStatus } from '@ticatec/uniface-element/ProgressBar';
  
  let progress = 0;
  let status = ProgressStatus.progressing;
  
  const simulate = () => {
    const timer = setInterval(() => {
      progress += 10;
      if (progress >= 100) {
        clearInterval(timer);
        status = ProgressStatus.successful;
      }
    }, 500);
  };
</script>

<ProgressBar {progress} {status} type="circular" size={100} />
<button on:click={simulate}>Start Progress</button>
```

### Upload Progress Indicator

```svelte
<script>
  import { ProgressBar, ProgressStatus } from '@ticatec/uniface-element/ProgressBar';
  
  let uploadProgress = 0;
  let uploadStatus = ProgressStatus.progressing;
  
  const handleUpload = async (file) => {
    uploadStatus = ProgressStatus.progressing;
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      uploadProgress = i;
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    uploadStatus = ProgressStatus.successful;
  };
</script>

<div class="upload-container">
  <ProgressBar 
    progress={uploadProgress} 
    status={uploadStatus}
    type="liner" 
    height={6}
  />
  <input type="file" on:change={handleUpload} />
</div>
```

## Best Practices

1. **Choose Appropriate Type**: Use circular for compact spaces, linear for wide layouts
2. **Status Indication**: Always update status to reflect the actual state of the operation
3. **User Feedback**: Provide clear text or visual cues about what's happening
4. **Accessibility**: Ensure adequate color contrast and consider screen readers
5. **Performance**: Avoid excessive progress updates; throttle to reasonable intervals
6. **Error Handling**: Use failure status and provide retry mechanisms when appropriate

## Accessibility Notes

- Progress bars convey completion status through visual indicators
- Status-specific icons (✔, ✗, !) provide additional context
- Color coding supports different progress states
- Text display can be toggled for different accessibility needs