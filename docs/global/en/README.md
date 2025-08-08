# Global Components

Global components are mounted directly to the document body and can be accessed through global methods without needing to import them in each component. These provide application-wide functionality for user feedback and modal interactions.

## Table of Contents

- [Setup](#setup)
- [ToastBoard](#toastboard)
- [DialogBoard](#dialogboard)
- [IndicatorBoard](#indicatorboard)
- [MessageBoxBoard](#messageboxboard)
- [TypeScript Declarations](#typescript-declarations)
- [Best Practices](#best-practices)

## Setup

To use global components, you need to include them in your main application layout, typically in your root `+layout.svelte` or `app.html`:

```svelte
<script lang="ts">
  import { ToastBoard } from "@ticatec/uniface-element/ToastBoard";
  import { DialogBoard } from "@ticatec/uniface-element/DialogBoard";
  import { IndicatorBoard } from "@ticatec/uniface-element/IndicatorBoard";
  import { MessageBoxBoard } from "@ticatec/uniface-element/MessageBoxBoard";
</script>

<!-- Your main application content -->
<main>
  <slot />
</main>

<!-- Global components - these will be mounted to document.body -->
<ToastBoard />
<DialogBoard />
<IndicatorBoard />
<MessageBoxBoard />
```

Once mounted, these components register themselves to the global `window` object and can be accessed anywhere in your application.

## ToastBoard

The `ToastBoard` component provides non-blocking notifications for user feedback, such as success messages, errors, or informational alerts.

### Features

- **Multiple Types**: Support for `error`, `info`, and `success` message types
- **Auto Dismiss**: Configurable duration with automatic dismissal
- **Smooth Animations**: Slide-in/slide-out transitions with customizable direction
- **Queue Management**: Handles multiple toast messages gracefully

### Usage

```typescript
// Basic usage - shows error message for 3 seconds (default)
window.Toast.show("Operation failed");

// Specify message type and duration
window.Toast.show("User created successfully", "success", 2);
window.Toast.show("Processing your request...", "info", 5);
window.Toast.show("Invalid input data", "error", 4);
```

### API Reference

```typescript
interface Toast {
  show: (message: string, type?: "error" | "info" | "success", duration?: number) => void;
}
```

#### Parameters

- **message** (`string`): The text to display in the toast
- **type** (`"error" | "info" | "success"`, optional): Visual style of the toast
  - `"error"` (default): Red styling for error messages
  - `"info"`: Blue styling for informational messages  
  - `"success"`: Green styling for success messages
- **duration** (`number`, optional): Display duration in seconds (default: 3)

### Properties

```svelte
<ToastBoard fromBottom={false} />
```

- **fromBottom** (`boolean`, optional): Whether toasts slide in from bottom (default: `false` - slides from top)

### Examples

```typescript
// Common use cases
try {
  await api.createUser(userData);
  window.Toast.show("User created successfully!", "success");
} catch (error) {
  window.Toast.show("Failed to create user: " + error.message, "error");
}

// Long-running operation
window.Toast.show("Uploading file... Please wait", "info", 10);

// Form validation feedback
if (!email.includes('@')) {
  window.Toast.show("Please enter a valid email address", "error");
}

// Success confirmation
window.Toast.show("Settings saved successfully", "success", 2);
```

## DialogBoard

The `DialogBoard` component manages modal dialogs globally, allowing you to open any Svelte component as a modal dialog from anywhere in your application.

### Features

- **Universal Modal System**: Open any Svelte component as a modal
- **Global Access**: Available through `window.Dialog` API
- **Prop Passing**: Pass props to the modal component
- **Context Integration**: Provides close function through context

### Usage

```typescript
// Open a component as modal
window.Dialog.showModal(MyDialogComponent, {
  title: "Edit User",
  user: userData,
  onSave: (result) => {
    console.log("User saved:", result);
  }
});
```

### API Reference

```typescript
interface IDialog {
  showModal<T>(component: any, props?: T): void;
}
```

### Examples

```typescript
// Open user edit dialog
window.Dialog.showModal(UserEditDialog, {
  user: selectedUser,
  onSave: async (updatedUser) => {
    await updateUser(updatedUser);
    window.Toast.show("User updated successfully", "success");
  }
});

// Open confirmation dialog
window.Dialog.showModal(ConfirmDialog, {
  title: "Delete Item",
  message: "Are you sure you want to delete this item?",
  onConfirm: () => {
    deleteItem(itemId);
  }
});

// Open complex form dialog
window.Dialog.showModal(ProductFormDialog, {
  product: product,
  categories: availableCategories,
  onSubmit: async (productData) => {
    try {
      await saveProduct(productData);
      window.Toast.show("Product saved!", "success");
    } catch (error) {
      window.Toast.show("Save failed: " + error.message, "error");
    }
  }
});
```

## IndicatorBoard

The `IndicatorBoard` component provides a full-screen loading overlay for blocking user interactions during asynchronous operations.

### Features

- **Full-Screen Overlay**: Blocks entire application interface
- **Custom Messages**: Display operation status to users
- **Automatic Management**: Show/hide based on async operation lifecycle
- **Prevents User Action**: Ensures data integrity during operations

### Usage

```typescript
// Basic loading indicator
try {
  window.Indicator.show("Loading data...");
  const data = await api.fetchData();
  // Process data
} finally {
  window.Indicator.hide();
}

// Multiple operations with status updates
window.Indicator.show("Initializing...");
await initializeApp();

window.Indicator.show("Loading user data...");
await loadUserData();

window.Indicator.show("Setting up workspace...");
await setupWorkspace();

window.Indicator.hide();
```

### API Reference

```typescript
interface Indicator {
  show: (message: string) => void;
  hide: () => void;
}
```

### Examples

```typescript
// File upload with progress indication
const uploadFile = async (file) => {
  try {
    window.Indicator.show("Uploading file...");
    const result = await api.uploadFile(file);
    window.Toast.show("File uploaded successfully", "success");
    return result;
  } catch (error) {
    window.Toast.show("Upload failed: " + error.message, "error");
    throw error;
  } finally {
    window.Indicator.hide();
  }
};

// Data processing workflow
const processData = async (data) => {
  try {
    window.Indicator.show("Validating data...");
    await validateData(data);
    
    window.Indicator.show("Processing records...");
    const processed = await processRecords(data);
    
    window.Indicator.show("Saving results...");
    await saveResults(processed);
    
    window.Toast.show("Data processed successfully", "success");
  } catch (error) {
    window.Toast.show("Processing failed: " + error.message, "error");
  } finally {
    window.Indicator.hide();
  }
};

// Async operation with automatic cleanup
const performAction = async () => {
  const cleanup = () => window.Indicator.hide();
  
  try {
    window.Indicator.show("Performing action...");
    await someAsyncOperation();
    
    // Ensure indicator is hidden even if the operation throws
    cleanup();
    
    window.Toast.show("Action completed", "success");
  } catch (error) {
    cleanup();
    window.Toast.show("Action failed", "error");
    throw error;
  }
};
```

## MessageBoxBoard

The `MessageBoxBoard` component provides modal confirmation dialogs and message boxes for user interactions that require explicit confirmation.

### Features

- **Confirmation Dialogs**: Yes/No, OK/Cancel interactions
- **Information Messages**: Display important information
- **Promise-based**: Async/await support for dialog results
- **Modal Result Types**: Standard dialog result enumeration

### Usage

```typescript
// Confirmation dialog
const result = await window.MessageBox.showConfirm("Delete this item?");
if (result === ModalResult.MR_OK) {
  deleteItem();
}

// Information message
await window.MessageBox.showInfo("Operation completed successfully", "Success");
```

### API Reference

```typescript
interface MessageBox {
  showConfirm: (message: string, title?: string) => Promise<ModalResult>;
  showInfo: (message: string, title?: string) => Promise<ModalResult>;
}

enum ModalResult {
  MR_OK = 1,
  MR_CANCEL = 2
}
```

### Examples

```typescript
// Delete confirmation
const confirmDelete = async (itemName) => {
  const result = await window.MessageBox.showConfirm(
    `Are you sure you want to delete "${itemName}"? This action cannot be undone.`,
    "Confirm Delete"
  );
  
  if (result === ModalResult.MR_OK) {
    try {
      await deleteItem(itemName);
      window.Toast.show("Item deleted successfully", "success");
    } catch (error) {
      window.Toast.show("Failed to delete item", "error");
    }
  }
};

// Save changes confirmation
const handlePageLeave = async () => {
  if (hasUnsavedChanges) {
    const result = await window.MessageBox.showConfirm(
      "You have unsaved changes. Are you sure you want to leave?",
      "Unsaved Changes"
    );
    
    return result === ModalResult.MR_OK;
  }
  
  return true;
};

// Information display
const showWelcomeMessage = async () => {
  await window.MessageBox.showInfo(
    "Welcome to the application! Please take a moment to review the getting started guide.",
    "Welcome"
  );
};

// Error handling with confirmation
const handleCriticalError = async (error) => {
  const result = await window.MessageBox.showConfirm(
    `A critical error occurred: ${error.message}\n\nWould you like to reload the application?`,
    "Critical Error"
  );
  
  if (result === ModalResult.MR_OK) {
    window.location.reload();
  }
};

// Batch operation confirmation
const processBatchOperation = async (items) => {
  const result = await window.MessageBox.showConfirm(
    `This will process ${items.length} items and may take several minutes. Continue?`,
    "Batch Processing"
  );
  
  if (result === ModalResult.MR_OK) {
    try {
      window.Indicator.show("Processing items...");
      await processBatch(items);
      window.Toast.show(`Successfully processed ${items.length} items`, "success");
    } catch (error) {
      window.Toast.show("Batch processing failed", "error");
    } finally {
      window.Indicator.hide();
    }
  }
};
```

## TypeScript Declarations

Add these type declarations to your `src/app.d.ts` or global type definition file:

```typescript
import type { 
  IDialog, 
  Toast, 
  Indicator, 
  MessageBox, 
  ModalResult 
} from '@ticatec/uniface-element';

declare global {
  interface Window {
    Dialog: IDialog;
    Toast: Toast;
    Indicator: Indicator;
    MessageBox: MessageBox;
  }
}

// Re-export for convenience
export { ModalResult };
```

## Best Practices

### 1. Proper Error Handling

```typescript
// Always use try-finally with Indicator
const performOperation = async () => {
  try {
    window.Indicator.show("Processing...");
    await operation();
    window.Toast.show("Operation completed", "success");
  } catch (error) {
    window.Toast.show("Operation failed", "error");
    throw error;
  } finally {
    window.Indicator.hide(); // Always hide, even on error
  }
};
```

### 2. User-Friendly Messages

```typescript
// Provide clear, actionable messages
window.Toast.show("User created successfully", "success");
window.Toast.show("Please fill in all required fields", "error");
window.Toast.show("Saving changes... Please wait", "info", 5);

// Avoid technical jargon
// ❌ Bad: "HTTP 404 error occurred"
// ✅ Good: "The requested item could not be found"
```

### 3. Appropriate Duration

```typescript
// Short messages (1-3 seconds)
window.Toast.show("Copied to clipboard", "success", 2);

// Important messages (3-5 seconds)
window.Toast.show("Your password has been updated", "success", 4);

// Long operations (5+ seconds)
window.Toast.show("Large file upload in progress...", "info", 10);
```

### 4. Confirmation Patterns

```typescript
// Critical actions should always confirm
const deleteUser = async (user) => {
  const result = await window.MessageBox.showConfirm(
    `Delete user "${user.name}"? This action cannot be undone.`
  );
  
  if (result === ModalResult.MR_OK) {
    // Proceed with deletion
  }
};

// Non-critical actions can use toast feedback
const toggleUserStatus = async (user) => {
  try {
    await updateUserStatus(user.id, !user.active);
    window.Toast.show(
      `User ${user.active ? 'deactivated' : 'activated'}`, 
      "success"
    );
  } catch (error) {
    window.Toast.show("Failed to update user status", "error");
  }
};
```

### 5. Loading State Management

```typescript
// Use Indicator for operations that block the UI
const saveDocument = async () => {
  window.Indicator.show("Saving document...");
  try {
    await api.saveDocument();
    window.Toast.show("Document saved", "success");
  } finally {
    window.Indicator.hide();
  }
};

// Use Toast for background operations
const autoSave = async () => {
  try {
    await api.autoSaveDocument();
    window.Toast.show("Auto-saved", "info", 1);
  } catch (error) {
    window.Toast.show("Auto-save failed", "error", 2);
  }
};
```

## Accessibility Considerations

- Toast messages should be announced by screen readers
- Modal dialogs should trap focus and handle escape key
- Provide sufficient color contrast for all message types
- Use semantic HTML and ARIA labels appropriately
- Ensure keyboard navigation works for all interactive elements

## Browser Support

- Modern browsers with ES2020+ support
- CSS Grid and Flexbox support for layouts
- DOM manipulation APIs for dynamic mounting
- Promise support for async dialog interactions