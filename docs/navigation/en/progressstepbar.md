# ProgressStepBar Component

The ProgressStepBar component provides a visual representation of multi-step processes, showing the current status and progress through each step.

## Features

- **Multi-Step Visualization**: Display progress through multiple sequential steps
- **Status Indicators**: Pending, processing, and completed states for each step
- **Flexible Layout**: Both horizontal and vertical orientations
- **Customizable Styling**: Configurable background colors and styles
- **Step Information**: Support for titles and optional comments

## Import

```typescript
import { ProgressStepBar, ProgressStep, ProgressStepStatus } from '@ticatec/uniface-element/ProgressStepBar';
```

## Basic Usage

### Horizontal Step Bar

```svelte
<script>
  import { ProgressStepBar, ProgressStepStatus } from '@ticatec/uniface-element/ProgressStepBar';
  
  const steps = [
    {
      topic: "Account Setup",
      comment: "Create your profile",
      status: ProgressStepStatus.Completed
    },
    {
      topic: "Verification",
      comment: "Verify your email",
      status: ProgressStepStatus.Processing
    },
    {
      topic: "Complete Profile",
      comment: "Add personal details",
      status: ProgressStepStatus.Pending
    }
  ];
</script>

<ProgressStepBar 
  {steps} 
  direction="horizontal" 
/>
```

### Vertical Step Bar

```svelte
<script>
  import { ProgressStepBar, ProgressStepStatus } from '@ticatec/uniface-element/ProgressStepBar';
  
  const workflowSteps = [
    {
      topic: "Review Document",
      status: ProgressStepStatus.Completed
    },
    {
      topic: "Manager Approval",
      status: ProgressStepStatus.Processing
    },
    {
      topic: "Final Processing",
      status: ProgressStepStatus.Pending
    }
  ];
</script>

<ProgressStepBar 
  steps={workflowSteps} 
  direction="vertical"
  backgroundColor="#f8f9fa"
/>
```

## API Reference

### Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `steps` | `Array<ProgressStep>` | required | Array of step objects |
| `direction` | `'vertical' \| 'horizontal'` | `'horizontal'` | Layout direction |
| `backgroundColor` | `string` | `'var(--uniface-progress-step-bar-bg, #ffffff)'` | Background color |
| `style` | `string` | `''` | Additional CSS styles |

### ProgressStep Interface

```typescript
interface ProgressStep {
  topic: string;          // Step title
  comment?: string;       // Optional step description
  status: ProgressStepStatus; // Current status
}
```

### ProgressStepStatus Enum

```typescript
enum ProgressStepStatus {
  Pending = 'pending',       // Not started
  Processing = 'processing', // Currently active
  Completed = 'completed'    // Finished
}
```

## Detailed Examples

### E-commerce Checkout Process

```svelte
<script>
  import { ProgressStepBar, ProgressStepStatus } from '@ticatec/uniface-element/ProgressStepBar';
  
  let checkoutSteps = [
    {
      topic: "Shopping Cart",
      comment: "Review your items",
      status: ProgressStepStatus.Completed
    },
    {
      topic: "Shipping Info",
      comment: "Enter delivery details",
      status: ProgressStepStatus.Completed
    },
    {
      topic: "Payment",
      comment: "Choose payment method",
      status: ProgressStepStatus.Processing
    },
    {
      topic: "Confirmation",
      comment: "Review and complete",
      status: ProgressStepStatus.Pending
    }
  ];
  
  const nextStep = () => {
    const currentIndex = checkoutSteps.findIndex(step => 
      step.status === ProgressStepStatus.Processing
    );
    
    if (currentIndex >= 0 && currentIndex < checkoutSteps.length - 1) {
      checkoutSteps[currentIndex].status = ProgressStepStatus.Completed;
      checkoutSteps[currentIndex + 1].status = ProgressStepStatus.Processing;
      checkoutSteps = [...checkoutSteps]; // Trigger reactivity
    }
  };
</script>

<div class="checkout-container">
  <ProgressStepBar steps={checkoutSteps} />
  <button on:click={nextStep}>Next Step</button>
</div>
```

### Form Wizard with Validation

```svelte
<script>
  import { ProgressStepBar, ProgressStepStatus } from '@ticatec/uniface-element/ProgressStepBar';
  
  let formSteps = [
    {
      topic: "Personal Information",
      comment: "Name, email, phone",
      status: ProgressStepStatus.Processing
    },
    {
      topic: "Address Details",
      comment: "Shipping and billing",
      status: ProgressStepStatus.Pending
    },
    {
      topic: "Preferences",
      comment: "Communication settings",
      status: ProgressStepStatus.Pending
    }
  ];
  
  let currentStepIndex = 0;
  
  const completeCurrentStep = () => {
    if (currentStepIndex < formSteps.length) {
      formSteps[currentStepIndex].status = ProgressStepStatus.Completed;
      
      if (currentStepIndex < formSteps.length - 1) {
        currentStepIndex++;
        formSteps[currentStepIndex].status = ProgressStepStatus.Processing;
      }
      
      formSteps = [...formSteps];
    }
  };
</script>

<div class="form-wizard">
  <ProgressStepBar 
    steps={formSteps} 
    direction="horizontal"
    style="margin-bottom: 20px;"
  />
  
  <div class="step-content">
    <h3>{formSteps[currentStepIndex]?.topic}</h3>
    <p>{formSteps[currentStepIndex]?.comment}</p>
    
    {#if currentStepIndex < formSteps.length}
      <button on:click={completeCurrentStep}>
        Complete Step
      </button>
    {/if}
  </div>
</div>
```

### File Upload Process

```svelte
<script>
  import { ProgressStepBar, ProgressStepStatus } from '@ticatec/uniface-element/ProgressStepBar';
  
  let uploadSteps = [
    {
      topic: "Select Files",
      status: ProgressStepStatus.Completed
    },
    {
      topic: "Upload",
      comment: "Transferring files...",
      status: ProgressStepStatus.Processing
    },
    {
      topic: "Processing",
      comment: "Analyzing content",
      status: ProgressStepStatus.Pending
    },
    {
      topic: "Complete",
      comment: "Files ready",
      status: ProgressStepStatus.Pending
    }
  ];
  
  const simulateUpload = async () => {
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000));
    uploadSteps[1].status = ProgressStepStatus.Completed;
    uploadSteps[2].status = ProgressStepStatus.Processing;
    uploadSteps = [...uploadSteps];
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    uploadSteps[2].status = ProgressStepStatus.Completed;
    uploadSteps[3].status = ProgressStepStatus.Processing;
    uploadSteps = [...uploadSteps];
    
    // Complete
    await new Promise(resolve => setTimeout(resolve, 1000));
    uploadSteps[3].status = ProgressStepStatus.Completed;
    uploadSteps = [...uploadSteps];
  };
</script>

<ProgressStepBar 
  steps={uploadSteps} 
  direction="vertical"
/>
<button on:click={simulateUpload}>Start Upload</button>
```

## Best Practices

1. **Clear Step Names**: Use descriptive, action-oriented step titles
2. **Helpful Comments**: Provide context for what happens in each step
3. **Logical Progression**: Ensure steps follow a natural sequence
4. **Status Management**: Keep status updates synchronized with actual progress
5. **User Guidance**: Show users what's expected in each step
6. **Error Handling**: Consider how to handle step failures or validation errors
7. **Responsive Design**: Test both orientations on different screen sizes

## Styling Tips

- Use consistent spacing and typography across steps
- Consider using custom CSS variables for theme integration
- Test visibility and contrast for status indicators
- Ensure adequate touch targets for mobile interfaces

## Accessibility Notes

- Step progression provides clear visual feedback
- Status changes are indicated through styling and positioning
- Consider adding ARIA labels for screen readers when implementing custom interactions
- Ensure sufficient color contrast for status indicators