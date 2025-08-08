# Navigator Component

The Navigator component provides a flexible navigation interface for displaying interactive item lists with status indicators, highlights, and click handling.

## Features

- **Interactive Navigation**: Clickable items with custom handlers
- **Status Indicators**: Visual status representation for each item
- **Highlighting**: Support for highlighting specific items
- **Active State Management**: Track and display active/selected items
- **Flexible Item Structure**: Support for any item data structure
- **Customizable Styling**: Custom styles and CSS integration

## Import

```typescript
import { Navigator, NavItemStatus } from '@ticatec/uniface-element/Navigator';
```

## Basic Usage

### Simple Navigation List

```svelte
<script>
  import { Navigator, NavItemStatus } from '@ticatec/uniface-element/Navigator';
  
  const navItems = [
    { id: 1, text: "Dashboard", completed: true },
    { id: 2, text: "Projects", completed: true },
    { id: 3, text: "Settings", completed: false },
    { id: 4, text: "Profile", completed: false }
  ];
  
  let activeItem = navItems[0];
  
  const handleItemClick = (item) => {
    console.log('Clicked:', item.text);
    activeItem = item;
  };
  
  const getItemStatus = (item) => {
    return item.completed ? NavItemStatus.Completed : NavItemStatus.NotStart;
  };
</script>

<Navigator 
  items={navItems}
  {activeItem}
  itemClickHandler={handleItemClick}
  retrieveStatus={getItemStatus}
/>
```

### Navigation with Highlights

```svelte
<script>
  import { Navigator, NavItemStatus } from '@ticatec/uniface-element/Navigator';
  
  const menuItems = [
    { id: 1, text: "Home", status: "completed" },
    { id: 2, text: "About", status: "warning" },
    { id: 3, text: "Services", status: "not-start" },
    { id: 4, text: "Contact", status: "completed" }
  ];
  
  let activeItem = menuItems[0];
  let highlightedItems = [menuItems[1], menuItems[3]]; // Highlight About and Contact
  
  const handleClick = (item) => {
    activeItem = item;
    // Handle navigation logic here
  };
  
  const getStatus = (item) => {
    switch (item.status) {
      case 'completed': return NavItemStatus.Completed;
      case 'warning': return NavItemStatus.Warning;
      default: return NavItemStatus.NotStart;
    }
  };
</script>

<Navigator 
  items={menuItems}
  {activeItem}
  highlights={highlightedItems}
  itemClickHandler={handleClick}
  retrieveStatus={getStatus}
  style="width: 250px; border: 1px solid #e0e0e0;"
/>
```

## API Reference

### Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `items` | `Array<any>` | required | Array of navigation items |
| `activeItem` | `any` | `null` | Currently active/selected item |
| `style` | `string` | `""` | Additional CSS styles |
| `highlights` | `Array<any>` | `[]` | Items to highlight |
| `itemClickHandler` | `ItemClickHandler` | required | Click event handler |
| `retrieveStatus` | `RetrieveItemStatus` | required | Function to get item status |

### Types

```typescript
type ItemClickHandler = (item: any) => void;
type RetrieveItemStatus = (item: any) => NavItemStatus;
```

### NavItemStatus Enum

```typescript
enum NavItemStatus {
  Completed = "nav-completed",
  Warning = "nav-warning", 
  NotStart = "nav-not-start"
}
```

## Advanced Examples

### Task Management Navigator

```svelte
<script>
  import { Navigator, NavItemStatus } from '@ticatec/uniface-element/Navigator';
  
  let tasks = [
    { 
      id: 1, 
      text: "Setup Project", 
      completed: true, 
      hasIssues: false 
    },
    { 
      id: 2, 
      text: "Design Database", 
      completed: true, 
      hasIssues: true 
    },
    { 
      id: 3, 
      text: "Implement API", 
      completed: false, 
      hasIssues: false 
    },
    { 
      id: 4, 
      text: "Frontend Development", 
      completed: false, 
      hasIssues: false 
    }
  ];
  
  let activeTask = tasks[2]; // Currently working on API
  let importantTasks = tasks.filter(task => task.hasIssues);
  
  const handleTaskClick = (task) => {
    activeTask = task;
    console.log(`Switched to task: ${task.text}`);
  };
  
  const getTaskStatus = (task) => {
    if (task.hasIssues) return NavItemStatus.Warning;
    if (task.completed) return NavItemStatus.Completed;
    return NavItemStatus.NotStart;
  };
</script>

<div class="task-navigator">
  <h3>Project Tasks</h3>
  <Navigator 
    items={tasks}
    activeItem={activeTask}
    highlights={importantTasks}
    itemClickHandler={handleTaskClick}
    retrieveStatus={getTaskStatus}
    style="border: 1px solid #ddd; border-radius: 4px; padding: 8px;"
  />
</div>
```

### Multi-Step Form Navigator

```svelte
<script>
  import { Navigator, NavItemStatus } from '@ticatec/uniface-element/Navigator';
  
  let formSteps = [
    { id: 'personal', text: "Personal Info", completed: true },
    { id: 'address', text: "Address", completed: true },
    { id: 'payment', text: "Payment", completed: false, current: true },
    { id: 'review', text: "Review", completed: false }
  ];
  
  let currentStep = formSteps.find(step => step.current);
  
  const handleStepClick = (step) => {
    // Only allow clicking on completed steps or current step
    if (step.completed || step.current) {
      currentStep = step;
      
      // Update current step flags
      formSteps = formSteps.map(s => ({
        ...s,
        current: s.id === step.id
      }));
    }
  };
  
  const getStepStatus = (step) => {
    if (step.completed) return NavItemStatus.Completed;
    if (step.current) return NavItemStatus.Warning; // Current step
    return NavItemStatus.NotStart;
  };
  
  const completeCurrentStep = () => {
    const stepIndex = formSteps.findIndex(s => s.current);
    if (stepIndex >= 0) {
      formSteps[stepIndex].completed = true;
      formSteps[stepIndex].current = false;
      
      if (stepIndex < formSteps.length - 1) {
        formSteps[stepIndex + 1].current = true;
        currentStep = formSteps[stepIndex + 1];
      }
      
      formSteps = [...formSteps]; // Trigger reactivity
    }
  };
</script>

<div class="form-navigation">
  <Navigator 
    items={formSteps}
    activeItem={currentStep}
    itemClickHandler={handleStepClick}
    retrieveStatus={getStepStatus}
    style="margin-bottom: 20px;"
  />
  
  <div class="form-content">
    <h4>Step: {currentStep?.text}</h4>
    <button on:click={completeCurrentStep}>
      Complete Step
    </button>
  </div>
</div>
```

### File Browser Navigator

```svelte
<script>
  import { Navigator, NavItemStatus } from '@ticatec/uniface-element/Navigator';
  
  let files = [
    { name: "documents", type: "folder", accessible: true },
    { name: "images", type: "folder", accessible: true },
    { name: "config.json", type: "file", accessible: true },
    { name: "backup.zip", type: "file", accessible: false },
    { name: "temp", type: "folder", accessible: false }
  ];
  
  let selectedFile = files[0];
  let recentFiles = [files[2]]; // Recently accessed files
  
  const handleFileClick = (file) => {
    if (file.accessible) {
      selectedFile = file;
      console.log(`Opened: ${file.name}`);
    } else {
      console.log(`Cannot access: ${file.name}`);
    }
  };
  
  const getFileStatus = (file) => {
    if (!file.accessible) return NavItemStatus.Warning;
    return file.type === 'folder' ? NavItemStatus.Completed : NavItemStatus.NotStart;
  };
</script>

<div class="file-browser">
  <Navigator 
    items={files}
    activeItem={selectedFile}
    highlights={recentFiles}
    itemClickHandler={handleFileClick}
    retrieveStatus={getFileStatus}
    style="font-family: monospace; background: #f5f5f5;"
  />
</div>
```

## Best Practices

1. **Clear Item Text**: Use descriptive, concise text for navigation items
2. **Consistent Status Logic**: Ensure status determination is predictable
3. **Appropriate Highlighting**: Use highlights sparingly for important items
4. **Accessibility**: Ensure sufficient color contrast for status indicators
5. **Click Handling**: Provide meaningful feedback for user interactions
6. **State Management**: Keep active item synchronized with application state
7. **Performance**: Consider virtualization for very large item lists

## Styling Notes

- Status classes (`nav-completed`, `nav-warning`, `nav-not-start`) provide visual differentiation
- Active items receive special styling to show selection
- Highlighted items have additional visual emphasis
- Custom CSS can be applied via the `style` prop

## Integration Tips

- Use with routing libraries for single-page application navigation
- Combine with state management for complex application flows
- Consider keyboard navigation support for accessibility
- Test with various item data structures to ensure flexibility