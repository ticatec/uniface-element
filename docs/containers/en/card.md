# Card Component

A flexible and versatile card container component for displaying content with optional headers, actions, and styling variants.

## Overview

The Card component provides a structured way to display content within a container that can include a title, header bar, action buttons, and various visual styles. It's perfect for creating content cards, information panels, and interactive containers.

## Installation

```typescript
import Card from '@ticatec/uniface-element/Card';
import type { CardAction } from '@ticatec/uniface-element/Card';
```

## Basic Usage

```svelte
<script lang="ts">
  import Card from '@ticatec/uniface-element/Card';

  let title = "Basic Card";
</script>

<Card {title}>
  <p>This is the card content area where you can place any content.</p>
</Card>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `style` | `string` | `""` | Custom CSS styles for the card |
| `title` | `string` | `null` | Card title (creates simple header) |
| `actions` | `Array<CardAction>` | `[]` | Action buttons for the card |
| `variant` | `'plain' \| '3d'` | `'plain'` | Visual style variant |
| `iconColor` | `string \| null` | `null` | Color for action icons |
| `data` | `any` | - | Data passed to action callbacks |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Main content area of the card |
| `header-bar` | Custom header content (overrides title) |
| `action-bar` | Custom action bar (used when no actions array provided) |

## CardAction Interface

```typescript
interface CardAction {
  /**
   * Icon font class name
   */
  icon?: string;

  /**
   * Direct image source
   */
  img?: string;

  /**
   * Tooltip text on hover
   */
  hint?: string;

  /**
   * Whether the action is disabled
   */
  disabled?: boolean;

  /**
   * Action callback function
   */
  callback: ActionCallback;
}

type ActionCallback = (data: any) => void;
```

## Usage Examples

### Basic Card with Title

```svelte
<script lang="ts">
  import Card from '@ticatec/uniface-element/Card';
</script>

<Card title="User Information">
  <div class="user-info">
    <p><strong>Name:</strong> John Doe</p>
    <p><strong>Email:</strong> john@example.com</p>
    <p><strong>Role:</strong> Developer</p>
  </div>
</Card>
```

### Card with Actions

```svelte
<script lang="ts">
  import Card from '@ticatec/uniface-element/Card';
  import type { CardAction } from '@ticatec/uniface-element/Card';

  let userData = { id: 1, name: 'John Doe' };

  let actions: CardAction[] = [
    {
      icon: 'edit',
      hint: 'Edit user',
      callback: (data) => console.log('Edit', data)
    },
    {
      icon: 'delete',
      hint: 'Delete user',
      callback: (data) => console.log('Delete', data)
    },
    {
      icon: 'share',
      hint: 'Share user profile',
      disabled: false,
      callback: (data) => console.log('Share', data)
    }
  ];
</script>

<Card title="User Card" {actions} data={userData}>
  <div class="user-profile">
    <p>User profile content goes here...</p>
  </div>
</Card>
```

### 3D Style Card

```svelte
<script lang="ts">
  import Card from '@ticatec/uniface-element/Card';
</script>

<Card title="3D Card" variant="3d">
  <p>This card has a 3D shadow effect for enhanced visual appeal.</p>
</Card>
```

### Card with Custom Header

```svelte
<script lang="ts">
  import Card from '@ticatec/uniface-element/Card';
</script>

<Card>
  <div slot="header-bar" class="custom-header">
    <h3>Custom Header</h3>
    <span class="status-badge">Active</span>
  </div>
  
  <div class="card-body">
    <p>Content with custom header styling.</p>
  </div>
</Card>
```

### Card with Custom Action Bar

```svelte
<script lang="ts">
  import Card from '@ticatec/uniface-element/Card';
</script>

<Card title="Custom Actions">
  <p>Card content goes here.</p>
  
  <div slot="action-bar" class="custom-actions">
    <button class="btn-primary">Save</button>
    <button class="btn-secondary">Cancel</button>
  </div>
</Card>
```

### Advanced Card with All Features

```svelte
<script lang="ts">
  import Card from '@ticatec/uniface-element/Card';
  import type { CardAction } from '@ticatec/uniface-element/Card';

  let projectData = {
    id: 'proj-123',
    name: 'Website Redesign',
    status: 'In Progress'
  };

  let projectActions: CardAction[] = [
    {
      icon: 'visibility',
      hint: 'View project details',
      callback: (data) => viewProject(data)
    },
    {
      icon: 'edit',
      hint: 'Edit project',
      callback: (data) => editProject(data)
    },
    {
      icon: 'share',
      hint: 'Share project',
      callback: (data) => shareProject(data)
    },
    {
      icon: 'archive',
      hint: 'Archive project',
      disabled: projectData.status === 'Archived',
      callback: (data) => archiveProject(data)
    }
  ];

  function viewProject(data: any) {
    console.log('Viewing project:', data);
  }

  function editProject(data: any) {
    console.log('Editing project:', data);
  }

  function shareProject(data: any) {
    console.log('Sharing project:', data);
  }

  function archiveProject(data: any) {
    console.log('Archiving project:', data);
  }
</script>

<Card
  title="Project: {projectData.name}"
  variant="3d"
  actions={projectActions}
  data={projectData}
  iconColor="#007bff"
  style="max-width: 400px; margin: 20px;"
>
  <div class="project-details">
    <div class="status-row">
      <span class="label">Status:</span>
      <span class="status status-{projectData.status.toLowerCase().replace(' ', '-')}">
        {projectData.status}
      </span>
    </div>
    <div class="description">
      <p>Complete redesign of the company website with modern UI/UX principles.</p>
    </div>
    <div class="progress">
      <div class="progress-bar">
        <div class="progress-fill" style="width: 65%"></div>
      </div>
      <span class="progress-text">65% Complete</span>
    </div>
  </div>
</Card>

<style>
  .project-details {
    padding: 16px 0;
  }
  
  .status-row {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }
  
  .label {
    font-weight: 600;
    margin-right: 8px;
  }
  
  .status {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.875rem;
    font-weight: 500;
  }
  
  .status-in-progress {
    background-color: #fff3cd;
    color: #856404;
  }
  
  .description {
    margin-bottom: 16px;
  }
  
  .progress {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .progress-bar {
    flex: 1;
    height: 8px;
    background-color: #e9ecef;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .progress-fill {
    height: 100%;
    background-color: #007bff;
    transition: width 0.3s ease;
  }
  
  .progress-text {
    font-size: 0.875rem;
    color: #6c757d;
    white-space: nowrap;
  }
</style>
```

## Styling

The Card component uses the following CSS classes:

```css
.uniface-card {
  /* Base card container */
}

.uniface-card.shadowBox {
  /* 3D variant with shadow */
}

.card-header {
  /* Header container */
}

.card-header.simple {
  /* Simple title header */
}

.card-content {
  /* Main content area */
}

.card-action-bar {
  /* Action bar container */
}
```

## API Reference

### CardAction Interface

```typescript
interface CardAction {
  /**
   * Icon font class name (e.g., 'edit', 'delete')
   */
  icon?: string;

  /**
   * Direct image source URL
   */
  img?: string;

  /**
   * Tooltip text shown on hover
   */
  hint?: string;

  /**
   * Whether the action button is disabled
   */
  disabled?: boolean;

  /**
   * Callback function executed when action is clicked
   */
  callback: ActionCallback;
}
```

### Type Definitions

```typescript
/**
 * Action callback function
 */
export type ActionCallback = (data: any) => void;
```

## Best Practices

1. **Use descriptive titles** - Keep card titles concise but informative
2. **Limit actions** - Don't overwhelm users with too many action buttons
3. **Provide hints** - Always include helpful tooltip text for actions
4. **Handle disabled states** - Disable actions when they're not applicable
5. **Consistent styling** - Use the same variant across similar cards
6. **Responsive design** - Consider how cards will look on different screen sizes