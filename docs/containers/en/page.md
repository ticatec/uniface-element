# Page Component

A comprehensive page container component that provides a structured layout with header, navigation actions, and content area for building complete application pages.

## Overview

The Page component is designed to create consistent, full-page layouts with built-in header functionality, navigation actions (back/reload), and a content container. It's perfect for creating application pages, forms, dashboards, and detail views with a professional appearance.

## Installation

```typescript
import Page from '@ticatec/uniface-element/Page';
import { PageHeader } from '@ticatec/uniface-element/Page';
import type { PageAction } from '@ticatec/uniface-element/Page';
```

## Basic Usage

```svelte
<script lang="ts">
  import Page from '@ticatec/uniface-element/Page';
</script>

<Page title="Dashboard" comment="Overview of system metrics">
  <div class="dashboard-content">
    <p>Your page content goes here...</p>
  </div>
</Page>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `title` | `string` | `''` | Page title displayed in header |
| `comment` | `string` | `null` | Subtitle or description text |
| `header$style` | `string` | `''` | Custom styles for header area |
| `content$style` | `string` | `''` | Custom styles for content area |
| `round` | `boolean` | `false` | Apply rounded corners to page |
| `shadow` | `boolean` | `true` | Apply shadow effect to page |
| `goBack` | `PageAction \| null` | `null` | Back navigation action |
| `reload` | `PageAction \| null` | `null` | Reload/refresh action |
| `style` | `string` | `''` | Custom styles for page wrapper |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Main content area of the page |
| `page-header` | Custom header content (overrides default header) |
| `header-ext` | Additional header content (extends default header) |

## PageAction Type

```typescript
export type PageAction = () => any;
```

## Usage Examples

### Basic Page

```svelte
<script lang="ts">
  import Page from '@ticatec/uniface-element/Page';
</script>

<Page title="User Profile" comment="Manage your account settings">
  <div class="profile-form">
    <h3>Personal Information</h3>
    <p>Edit your profile details below...</p>
    <!-- Form content -->
  </div>
</Page>
```

### Page with Navigation Actions

```svelte
<script lang="ts">
  import Page from '@ticatec/uniface-element/Page';
  import type { PageAction } from '@ticatec/uniface-element/Page';

  const handleGoBack: PageAction = () => {
    window.history.back();
    console.log('Navigating back...');
  };

  const handleReload: PageAction = () => {
    window.location.reload();
    console.log('Reloading page...');
  };
</script>

<Page
  title="Order Details"
  comment="Order #12345 - Processing"
  goBack={handleGoBack}
  reload={handleReload}
>
  <div class="order-details">
    <h3>Order Information</h3>
    <p>Customer: John Doe</p>
    <p>Total: $299.99</p>
    <p>Status: Processing</p>
  </div>
</Page>
```

### Styled Page

```svelte
<script lang="ts">
  import Page from '@ticatec/uniface-element/Page';
</script>

<Page
  title="Analytics Dashboard"
  comment="Real-time business metrics"
  round={true}
  shadow={true}
  style="max-width: 1200px; margin: 0 auto;"
  header$style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;"
  content$style="padding: 30px;"
>
  <div class="dashboard-grid">
    <div class="metric-card">
      <h4>Revenue</h4>
      <div class="metric-value">$45,231</div>
    </div>
    <div class="metric-card">
      <h4>Users</h4>
      <div class="metric-value">1,234</div>
    </div>
    <div class="metric-card">
      <h4>Conversion</h4>
      <div class="metric-value">3.4%</div>
    </div>
  </div>
</Page>

<style>
  .dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }
  
  .metric-card {
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    text-align: center;
  }
  
  .metric-card h4 {
    margin: 0 0 10px 0;
    color: #666;
    font-weight: normal;
  }
  
  .metric-value {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
  }
</style>
```

### Page with Custom Header

```svelte
<script lang="ts">
  import Page from '@ticatec/uniface-element/Page';
  import { PageHeader } from '@ticatec/uniface-element/Page';
</script>

<Page>
  <div slot="page-header" class="custom-header">
    <div class="header-left">
      <h1>Custom Dashboard</h1>
      <p>Advanced analytics and reporting</p>
    </div>
    <div class="header-right">
      <button class="export-btn">Export Data</button>
      <button class="settings-btn">Settings</button>
    </div>
  </div>
  
  <div class="page-content">
    <p>Custom header with action buttons and layout</p>
  </div>
</Page>

<style>
  .custom-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: #f8f9fa;
    border-bottom: 1px solid #dee2e6;
  }
  
  .header-left h1 {
    margin: 0 0 5px 0;
    font-size: 1.5rem;
  }
  
  .header-left p {
    margin: 0;
    color: #666;
    font-size: 0.875rem;
  }
  
  .header-right {
    display: flex;
    gap: 10px;
  }
  
  .export-btn, .settings-btn {
    padding: 8px 16px;
    border: 1px solid #007bff;
    background: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .settings-btn {
    background: transparent;
    color: #007bff;
  }
</style>
```

### Page with Extended Header

```svelte
<script lang="ts">
  import Page from '@ticatec/uniface-element/Page';
  import type { PageAction } from '@ticatec/uniface-element/Page';

  const handleBack: PageAction = () => {
    console.log('Going back...');
  };

  let activeTab = 'overview';
</script>

<Page
  title="Project Management"
  comment="Manage project tasks and team collaboration"
  goBack={handleBack}
>
  <div slot="header-ext" class="header-tabs">
    <button
      class="tab"
      class:active={activeTab === 'overview'}
      on:click={() => activeTab = 'overview'}
    >
      Overview
    </button>
    <button
      class="tab"
      class:active={activeTab === 'tasks'}
      on:click={() => activeTab = 'tasks'}
    >
      Tasks
    </button>
    <button
      class="tab"
      class:active={activeTab === 'team'}
      on:click={() => activeTab = 'team'}
    >
      Team
    </button>
  </div>
  
  <div class="tab-content">
    {#if activeTab === 'overview'}
      <div class="overview-section">
        <h3>Project Overview</h3>
        <p>Current project status and key metrics</p>
      </div>
    {:else if activeTab === 'tasks'}
      <div class="tasks-section">
        <h3>Task Management</h3>
        <p>View and manage project tasks</p>
      </div>
    {:else if activeTab === 'team'}
      <div class="team-section">
        <h3>Team Members</h3>
        <p>Collaborate with your team</p>
      </div>
    {/if}
  </div>
</Page>

<style>
  .header-tabs {
    display: flex;
    gap: 1px;
    background: #e9ecef;
    border-radius: 4px;
    padding: 4px;
  }
  
  .tab {
    padding: 8px 16px;
    border: none;
    background: transparent;
    border-radius: 2px;
    cursor: pointer;
    font-size: 0.875rem;
    transition: background-color 0.2s;
  }
  
  .tab:hover {
    background: rgba(255,255,255,0.5);
  }
  
  .tab.active {
    background: white;
    font-weight: 500;
  }
  
  .tab-content {
    padding: 20px 0;
  }
</style>
```

### Form Page Example

```svelte
<script lang="ts">
  import Page from '@ticatec/uniface-element/Page';
  import type { PageAction } from '@ticatec/uniface-element/Page';

  let formData = {
    name: '',
    email: '',
    department: 'engineering'
  };

  const handleBack: PageAction = () => {
    if (confirm('Are you sure you want to leave? Unsaved changes will be lost.')) {
      window.history.back();
    }
  };

  const handleReload: PageAction = () => {
    if (confirm('Reload the page? Unsaved changes will be lost.')) {
      window.location.reload();
    }
  };

  function handleSubmit() {
    console.log('Submitting form:', formData);
    // Handle form submission
  }

  function handleReset() {
    formData = { name: '', email: '', department: 'engineering' };
  }
</script>

<Page
  title="Add New Employee"
  comment="Complete the form to add a new team member"
  goBack={handleBack}
  reload={handleReload}
  round={true}
  content$style="max-width: 600px; margin: 0 auto; padding: 30px;"
>
  <form class="employee-form" on:submit|preventDefault={handleSubmit}>
    <div class="form-group">
      <label for="name">Full Name *</label>
      <input
        id="name"
        type="text"
        bind:value={formData.name}
        required
        placeholder="Enter full name"
      />
    </div>
    
    <div class="form-group">
      <label for="email">Email Address *</label>
      <input
        id="email"
        type="email"
        bind:value={formData.email}
        required
        placeholder="Enter email address"
      />
    </div>
    
    <div class="form-group">
      <label for="department">Department</label>
      <select id="department" bind:value={formData.department}>
        <option value="engineering">Engineering</option>
        <option value="design">Design</option>
        <option value="marketing">Marketing</option>
        <option value="sales">Sales</option>
      </select>
    </div>
    
    <div class="form-actions">
      <button type="button" class="btn-secondary" on:click={handleReset}>
        Reset
      </button>
      <button type="submit" class="btn-primary">
        Add Employee
      </button>
    </div>
  </form>
</Page>

<style>
  .employee-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  .form-group label {
    font-weight: 500;
    color: #333;
  }
  
  .form-group input,
  .form-group select {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  .form-group input:focus,
  .form-group select:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
  }
  
  .form-actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    margin-top: 20px;
  }
  
  .btn-primary,
  .btn-secondary {
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    border: none;
  }
  
  .btn-primary {
    background: #007bff;
    color: white;
  }
  
  .btn-secondary {
    background: #6c757d;
    color: white;
  }
  
  .btn-primary:hover {
    background: #0056b3;
  }
  
  .btn-secondary:hover {
    background: #545b62;
  }
</style>
```

## Styling

The Page component uses the following CSS classes:

```css
.uniface-page-wrapper {
  /* Page wrapper container */
}

.uniface-page {
  /* Main page container */
}

.uniface-page.shadow {
  /* Page with shadow effect */
}

.uniface-page.round {
  /* Page with rounded corners */
}

.uniface-page-header {
  /* Header container */
}

.page-container {
  /* Content container */
}
```

## API Reference

### Page Component Props

All properties are optional unless marked as required.

```typescript
interface PageProps {
  title: string;                    // Page title
  comment?: string | null;          // Subtitle/description
  header$style?: string;            // Header custom styles  
  content$style?: string;           // Content custom styles
  round?: boolean;                  // Rounded corners
  shadow?: boolean;                 // Shadow effect
  goBack?: PageAction | null;       // Back navigation
  reload?: PageAction | null;       // Reload action
  style?: string;                   // Wrapper custom styles
}
```

### PageAction Type

```typescript
export type PageAction = () => any;
```

## Best Practices

1. **Consistent Navigation** - Always provide back navigation for detail pages
2. **Descriptive Titles** - Use clear, descriptive page titles that explain the page purpose
3. **Helpful Comments** - Add subtitle/comment text to provide context
4. **Responsive Layout** - Use content styling to ensure proper responsive behavior
5. **Action Confirmation** - Confirm destructive actions like navigation away from unsaved forms
6. **Loading States** - Handle loading states gracefully when actions are async
7. **Error Handling** - Implement proper error handling for page actions
8. **Accessibility** - Ensure proper heading hierarchy and keyboard navigation

## Integration with Router

The Page component works well with routing libraries:

```svelte
<script lang="ts">
  import Page from '@ticatec/uniface-element/Page';
  import { goto } from '$app/navigation';
  import type { PageAction } from '@ticatec/uniface-element/Page';

  const handleBack: PageAction = () => {
    goto('/dashboard');
  };
</script>

<Page title="Settings" goBack={handleBack}>
  <!-- Page content -->
</Page>
```