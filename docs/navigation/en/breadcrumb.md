# Breadcrumb Component

The Breadcrumb component provides hierarchical navigation that shows the user's current location within the application structure and allows navigation back to parent levels.

## Features

- **Hierarchical Navigation**: Shows the path from root to current location
- **Customizable Separator**: Configurable separator character between items
- **Click Navigation**: Click handlers for navigating to parent levels
- **Flexible Data Structure**: Support for custom data objects
- **Styling Support**: Custom styles and CSS integration

## Import

```typescript
import { Breadcrumbs, Breadcrumb } from '@ticatec/uniface-element/Breadcrumbs';
```

## Basic Usage

### Simple Breadcrumb

```svelte
<script>
  import Breadcrumbs from '@ticatec/uniface-element/Breadcrumbs';
  
  const breadcrumbItems = [
    { label: "Home", data: { route: "/" } },
    { label: "Products", data: { route: "/products" } },
    { label: "Electronics", data: { route: "/products/electronics" } },
    { label: "Laptops", data: { route: "/products/electronics/laptops" } }
  ];
  
  const handleItemClick = (data) => (event) => {
    console.log('Navigate to:', data.route);
    // Handle navigation logic here
  };
</script>

<Breadcrumbs 
  items={breadcrumbItems}
  onItemClick={handleItemClick}
/>
```

### Custom Separator

```svelte
<script>
  import Breadcrumbs from '@ticatec/uniface-element/Breadcrumbs';
  
  const pathItems = [
    { label: "Dashboard", data: { id: 1 } },
    { label: "User Management", data: { id: 2 } },
    { label: "Edit Profile", data: { id: 3 } }
  ];
  
  const navigate = (data) => (event) => {
    console.log('Navigating to item:', data.id);
  };
</script>

<Breadcrumbs 
  items={pathItems}
  separator=">"
  onItemClick={navigate}
  style="padding: 10px; background: #f5f5f5;"
/>
```

## API Reference

### Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `items` | `Array<Breadcrumb>` | `[]` | Array of breadcrumb items |
| `separator` | `string` | `"/"` | Separator character between items |
| `onItemClick` | `(item: any) => (event: MouseEvent) => void` | required | Click handler function |
| `style` | `string` | `''` | Additional CSS styles |

### Breadcrumb Interface

```typescript
interface Breadcrumb {
  label: string;  // Display text
  data: any;      // Associated data object
}
```

## Advanced Examples

### File System Navigation

```svelte
<script>
  import Breadcrumbs from '@ticatec/uniface-element/Breadcrumbs';
  
  let currentPath = [
    { label: "Documents", data: { path: "/documents", type: "folder" } },
    { label: "Projects", data: { path: "/documents/projects", type: "folder" } },
    { label: "WebApp", data: { path: "/documents/projects/webapp", type: "folder" } },
    { label: "src", data: { path: "/documents/projects/webapp/src", type: "folder" } }
  ];
  
  const navigateToPath = (data) => (event) => {
    // Find the index of the clicked item
    const clickedIndex = currentPath.findIndex(item => item.data.path === data.path);
    
    if (clickedIndex >= 0) {
      // Truncate the path to the clicked item
      currentPath = currentPath.slice(0, clickedIndex + 1);
      console.log('Navigated to:', data.path);
      
      // In a real app, you'd update your file browser state here
    }
  };
  
  const addFolder = () => {
    currentPath = [...currentPath, { 
      label: "components", 
      data: { path: currentPath[currentPath.length - 1].data.path + "/components", type: "folder" }
    }];
  };
</script>

<div class="file-navigator">
  <Breadcrumbs 
    items={currentPath}
    separator="/"
    onItemClick={navigateToPath}
    style="font-family: monospace; background: #f8f8f8; padding: 8px; border-radius: 4px;"
  />
  
  <button on:click={addFolder}>Add Components Folder</button>
</div>
```

### E-commerce Category Navigation

```svelte
<script>
  import Breadcrumbs from '@ticatec/uniface-element/Breadcrumbs';
  
  let categoryPath = [
    { label: "All Categories", data: { categoryId: null, slug: "" } }
  ];
  
  const categories = [
    { id: 1, name: "Electronics", parent: null, slug: "electronics" },
    { id: 2, name: "Computers", parent: 1, slug: "computers" },
    { id: 3, name: "Laptops", parent: 2, slug: "laptops" },
    { id: 4, name: "Gaming Laptops", parent: 3, slug: "gaming-laptops" }
  ];
  
  const navigateToCategory = (data) => (event) => {
    if (data.categoryId === null) {
      // Navigate to root
      categoryPath = [categoryPath[0]];
    } else {
      // Find the clicked category and rebuild path
      const clickedIndex = categoryPath.findIndex(
        item => item.data.categoryId === data.categoryId
      );
      
      if (clickedIndex >= 0) {
        categoryPath = categoryPath.slice(0, clickedIndex + 1);
      }
    }
    
    console.log('Category path updated:', categoryPath);
  };
  
  const drillDownCategory = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    if (category) {
      categoryPath = [...categoryPath, {
        label: category.name,
        data: { categoryId: category.id, slug: category.slug }
      }];
    }
  };
</script>

<div class="category-navigation">
  <Breadcrumbs 
    items={categoryPath}
    separator="›"
    onItemClick={navigateToCategory}
    style="margin-bottom: 15px;"
  />
  
  <div class="category-actions">
    <button on:click={() => drillDownCategory(1)}>Go to Electronics</button>
    <button on:click={() => drillDownCategory(2)}>Go to Computers</button>
    <button on:click={() => drillDownCategory(3)}>Go to Laptops</button>
    <button on:click={() => drillDownCategory(4)}>Go to Gaming</button>
  </div>
</div>
```

### Multi-step Form Navigation

```svelte
<script>
  import Breadcrumbs from '@ticatec/uniface-element/Breadcrumbs';
  
  const formSteps = [
    { id: 1, name: "Account Info", completed: true },
    { id: 2, name: "Personal Details", completed: true },
    { id: 3, name: "Preferences", completed: false },
    { id: 4, name: "Confirmation", completed: false }
  ];
  
  let currentStepId = 3;
  
  // Build breadcrumb from completed steps + current step
  $: breadcrumbItems = formSteps
    .filter((step, index) => step.completed || step.id === currentStepId)
    .map(step => ({
      label: step.name,
      data: { stepId: step.id, completed: step.completed }
    }));
  
  const navigateToStep = (data) => (event) => {
    // Only allow navigation to completed steps
    if (data.completed) {
      currentStepId = data.stepId;
      console.log('Navigated to step:', data.stepId);
    }
  };
  
  const completeCurrentStep = () => {
    const step = formSteps.find(s => s.id === currentStepId);
    if (step) {
      step.completed = true;
      
      // Move to next uncompleted step
      const nextStep = formSteps.find(s => !s.completed);
      if (nextStep) {
        currentStepId = nextStep.id;
      }
    }
  };
</script>

<div class="form-breadcrumb">
  <Breadcrumbs 
    items={breadcrumbItems}
    separator="→"
    onItemClick={navigateToStep}
    style="background: linear-gradient(90deg, #e3f2fd, #bbdefb); padding: 10px; border-radius: 8px;"
  />
  
  <div class="form-controls">
    <p>Current Step: {formSteps.find(s => s.id === currentStepId)?.name}</p>
    <button on:click={completeCurrentStep}>Complete Step</button>
  </div>
</div>
```

## Best Practices

1. **Clear Labels**: Use descriptive, concise labels that clearly indicate the location
2. **Logical Hierarchy**: Ensure breadcrumbs reflect actual application structure
3. **Clickable Parents**: Make parent levels clickable for easy navigation
4. **Current Item Behavior**: The last item typically shouldn't be clickable (represents current location)
5. **Responsive Design**: Consider how breadcrumbs appear on mobile devices
6. **Consistent Separators**: Use appropriate separators for your design system
7. **Performance**: Avoid rebuilding breadcrumbs unnecessarily

## Styling Notes

- The component renders each item with a separator prefix
- The last item (current location) has click handler set to null
- Custom styles can be applied via the `style` prop
- Consider using CSS for hover effects on clickable items

## Accessibility Considerations

- Breadcrumbs provide context about page location
- Click handlers should provide keyboard support
- Consider ARIA labels for screen readers
- Ensure sufficient color contrast for text and separators

## Integration Tips

- Use with routing libraries to sync with URL structure
- Combine with page titles for better user orientation
- Consider auto-generating from route configurations
- Test truncation behavior for very long paths