# Global Components

Global components are mounted directly to the document body and can be accessed through global methods without needing to import them in each component. These provide application-wide functionality for user feedback and modal interactions.

## Table of Contents

- [Setup](#setup)
- [ToastBoard](#toastboard)
- [DialogBoard](#dialogboard)
- [IndicatorBoard](#indicatorboard)
- [MessageBoxBoard](#messageboxboard)
- [TypeScript Declarations](#typescript-declarations)

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

// Quick notification
window.Toast.show("Settings saved", "success", 1);
```

## DialogBoard

The `DialogBoard` component manages modal dialogs and provides a centralized system for displaying custom dialog components.

> 📖 **For comprehensive Dialog System documentation, see [DIALOG_SYSTEM.md](./DIALOG_SYSTEM.md)**

### Quick Start

```svelte
<!-- Include in your root layout -->
<DialogBoard />
```

```typescript
// Open any Svelte component as a modal dialog
window.Dialog.showModal(MyComponent, {
  title: "Edit User",
  user: userData,
  onSave: (user) => {
    console.log("User saved:", user);
  }
});
```

### Basic Dialog Component

```svelte
<script lang="ts">
  import { getContext } from 'svelte';
  
  export let title: string;
  export let user: any;
  export let onSave: (user: any) => void;
  
  const closeDialog = getContext('closeDialog');
  
  const handleSave = () => {
    onSave(user);
    closeDialog();
  };
</script>

<div class="dialog-content">
  <h2>{title}</h2>
  <input bind:value={user.name} />
  <button on:click={handleSave}>Save</button>
  <button on:click={closeDialog}>Cancel</button>
</div>
```

### Key Features

- **Dynamic Components**: Load any Svelte component as a modal dialog
- **Context-based Closing**: Use `getContext('closeDialog')` for proper lifecycle management
- **Built-in Components**: `Dialog` and `CommonDialog` for standard use cases
- **Multiple Dialogs**: Support for stacked modal dialogs
- **TypeScript Support**: Full type definitions included

## IndicatorBoard

The `IndicatorBoard` component displays a full-screen loading overlay with a loading spinner and message, preventing user interaction during asynchronous operations.

### Features

- **Full Screen Overlay**: Blocks user interaction while loading
- **Loading Animation**: Built-in loading spinner
- **Custom Messages**: Display contextual loading messages
- **Easy Control**: Simple show/hide API

### Usage

```typescript
// Show loading indicator
window.Indicator.show("Loading user data...");

// Hide loading indicator
window.Indicator.hide();

// Typical async operation pattern
try {
  window.Indicator.show("Saving changes...");
  await api.saveData(formData);
  window.Toast.show("Data saved successfully", "success");
} catch (error) {
  window.Toast.show("Failed to save data", "error");
} finally {
  window.Indicator.hide();
}
```

### API Reference

```typescript
interface Indicator {
  show: (message: string) => void;
  hide: () => void;
}
```

#### Methods

- **show(message)**: Display the loading indicator with the specified message
- **hide()**: Hide the loading indicator

### Examples

```typescript
// Data fetching
const loadUserData = async () => {
  try {
    window.Indicator.show("Loading user profile...");
    const user = await api.getUser(userId);
    // Update UI with user data
  } finally {
    window.Indicator.hide();
  }
};

// File upload
const uploadFile = async (file) => {
  try {
    window.Indicator.show("Uploading file... Please wait");
    await api.uploadFile(file);
    window.Toast.show("File uploaded successfully", "success");
  } catch (error) {
    window.Toast.show("Upload failed: " + error.message, "error");
  } finally {
    window.Indicator.hide();
  }
};

// Bulk operations
const processBulkData = async (items) => {
  try {
    window.Indicator.show(`Processing ${items.length} items...`);
    await api.processBulkData(items);
    window.Toast.show("Bulk processing completed", "success");
  } finally {
    window.Indicator.hide();
  }
};
```

## MessageBoxBoard

The `MessageBoxBoard` component provides system-level modal dialogs for confirmations and important messages, similar to native browser alerts but with custom styling and better UX.

### Features

- **Two Dialog Types**: Info dialogs and confirmation dialogs
- **Draggable**: Dialog can be moved around the screen
- **Promise-based**: Async/await support for user responses
- **Internationalization**: Built-in i18n support for buttons
- **HTML Support**: Option to render HTML content
- **Custom Icons**: Different icons for different message types

### Usage

```typescript
// Simple info message
await window.MessageBox.showInfo("Operation completed successfully");

// Confirmation dialog
const result = await window.MessageBox.showConfirm(
  "Are you sure you want to delete this user?",
  "Confirm Delete"
);

if (result === ModalResult.MR_OK) {
  // User clicked OK/Confirm
  await deleteUser();
  window.Toast.show("User deleted successfully", "success");
}
```

### API Reference

```typescript
interface IMessageBox {
  showInfo: (message: string, title?: string, escapeHTML?: boolean) => Promise<void>;
  showConfirm: (
    message: string, 
    title?: string | null, 
    escapeHTML?: boolean, 
    type?: 'info' | 'warning'
  ) => Promise<ModalResult>;
}

enum ModalResult {
  MR_OK = 1,
  MR_CANCEL = 2,
  MR_CLOSE = 3
}
```

#### Methods

**showInfo(message, title?, escapeHTML?)**
- **message** (`string`): The message to display
- **title** (`string`, optional): Dialog title
- **escapeHTML** (`boolean`, optional): Whether to escape HTML in message (default: `true`)
- **Returns**: `Promise<void>`

**showConfirm(message, title?, escapeHTML?, type?)**
- **message** (`string`): The confirmation message
- **title** (`string`, optional): Dialog title  
- **escapeHTML** (`boolean`, optional): Whether to escape HTML in message (default: `true`)
- **type** (`'info' | 'warning'`, optional): Dialog type affecting icon and styling (default: `'info'`)
- **Returns**: `Promise<ModalResult>`

### Properties

```svelte
<MessageBoxBoard appTitle="My Application" />
```

- **appTitle** (`string`, optional): Default title when no title is provided

### Examples

```typescript
import { ModalResult } from '@ticatec/uniface-element';

// Info dialogs
await window.MessageBox.showInfo("Settings have been saved successfully");
await window.MessageBox.showInfo(
  "<strong>Warning:</strong> This action cannot be undone", 
  "Important Notice", 
  false // Don't escape HTML
);

// Confirmation dialogs
const deleteUser = async (user) => {
  const result = await window.MessageBox.showConfirm(
    `Are you sure you want to delete user "${user.name}"? This action cannot be undone.`,
    "Confirm Delete",
    true, // Escape HTML
    "warning" // Warning style
  );
  
  if (result === ModalResult.MR_OK) {
    try {
      window.Indicator.show("Deleting user...");
      await api.deleteUser(user.id);
      window.Toast.show("User deleted successfully", "success");
    } catch (error) {
      window.Toast.show("Failed to delete user", "error");
    } finally {
      window.Indicator.hide();
    }
  }
};

// Data loss confirmation
const handleUnsavedChanges = async () => {
  const result = await window.MessageBox.showConfirm(
    "You have unsaved changes. Are you sure you want to leave this page?",
    "Unsaved Changes",
    true,
    "warning"
  );
  
  return result === ModalResult.MR_OK;
};

// Complex confirmation with HTML
const confirmBulkAction = async (count) => {
  const result = await window.MessageBox.showConfirm(
    `<p>You are about to process <strong>${count}</strong> items.</p>
     <p>This operation may take several minutes. Continue?</p>`,
    "Bulk Processing",
    false // Allow HTML
  );
  
  return result === ModalResult.MR_OK;
};
```

## TypeScript Declarations

Add these declarations to your `app.d.ts` or global types file to get proper TypeScript support:

```typescript
// src/app.d.ts
import type { Toast } from '@ticatec/uniface-element';
import type { IDialog } from '@ticatec/uniface-element';
import type { Indicator } from '@ticatec/uniface-element';
import type { IMessageBox } from '@ticatec/uniface-element';

declare global {
  interface Window {
    Toast: Toast;
    Dialog: IDialog;
    Indicator: Indicator;
    MessageBox: IMessageBox;
  }
}
```

## Best Practices

### 1. Error Handling with Global Components

```typescript
const handleApiCall = async (apiFunction, successMessage) => {
  try {
    window.Indicator.show("Processing...");
    const result = await apiFunction();
    window.Toast.show(successMessage, "success");
    return result;
  } catch (error) {
    window.Toast.show(`Error: ${error.message}`, "error");
    throw error;
  } finally {
    window.Indicator.hide();
  }
};
```

### 2. Confirmation Patterns

```typescript
const safeDelete = async (item, deleteFunction) => {
  const confirmed = await window.MessageBox.showConfirm(
    `Are you sure you want to delete "${item.name}"?`,
    "Confirm Delete",
    true,
    "warning"
  );
  
  if (confirmed === ModalResult.MR_OK) {
    await handleApiCall(
      () => deleteFunction(item.id),
      "Item deleted successfully"
    );
  }
};
```

### 3. Loading States

```typescript
// For quick operations
const quickSave = async (data) => {
  window.Indicator.show("Saving...");
  try {
    await api.save(data);
    window.Toast.show("Saved", "success", 1);
  } finally {
    window.Indicator.hide();
  }
};

// For longer operations with progress
const longOperation = async (data) => {
  window.Indicator.show("Processing... This may take a few minutes");
  try {
    await api.longProcess(data);
    window.Toast.show("Processing completed successfully", "success", 3);
  } finally {
    window.Indicator.hide();
  }
};
```

## Styling

All global components use the Uniface theme system. You can customize their appearance by overriding CSS variables:

```css
:root {
  /* Toast styling */
  --uniface-toast-success-bg: #d4edda;
  --uniface-toast-error-bg: #f8d7da;
  --uniface-toast-info-bg: #d1ecf1;
  
  /* Message box styling */
  --uniface-message-box-bg: #ffffff;
  --uniface-message-box-border: #dee2e6;
  
  /* Indicator styling */  
  --uniface-indicator-bg: rgba(0, 0, 0, 0.5);
  --uniface-indicator-text-color: #ffffff;
}
```