# Box Component

A simple and flexible container component that provides a structured layout with optional header, content, and footer sections.

## Overview

The Box component is a versatile container that provides a clean, organized way to display content with optional header and footer sections. It's perfect for creating content sections, information panels, and structured layouts with consistent styling.

## Installation

```typescript
import Box from '@ticatec/uniface-element/Box';
```

## Basic Usage

```svelte
<script lang="ts">
  import Box from '@ticatec/uniface-element/Box';
</script>

<Box title="Basic Box">
  <p>This is the main content area of the box component.</p>
</Box>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `style` | `string \| null` | `null` | Custom CSS styles for the box container |
| `title` | `string` | `null` | Box title (creates simple header) |
| `round` | `boolean` | `false` | Apply rounded corners to the box |
| `content$style` | `string \| null` | `null` | Custom styles for the content area |
| `header$style` | `string \| null` | `null` | Custom styles for the header area |
| `footer$style` | `string \| null` | `null` | Custom styles for the footer area |
| `class` | `string` | `null` | Additional CSS class names |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Main content area of the box |
| `header` | Custom header content (overrides title) |
| `footer` | Footer content area |

## Usage Examples

### Basic Box with Title

```svelte
<script lang="ts">
  import Box from '@ticatec/uniface-element/Box';
</script>

<Box title="User Profile">
  <div class="profile-content">
    <p><strong>Name:</strong> John Doe</p>
    <p><strong>Department:</strong> Engineering</p>
    <p><strong>Location:</strong> New York</p>
  </div>
</Box>
```

### Rounded Box

```svelte
<script lang="ts">
  import Box from '@ticatec/uniface-element/Box';
</script>

<Box title="Rounded Container" round={true}>
  <p>This box has rounded corners for a softer appearance.</p>
</Box>
```

### Box with Custom Header

```svelte
<script lang="ts">
  import Box from '@ticatec/uniface-element/Box';
</script>

<Box>
  <div slot="header" class="custom-header">
    <h3>Custom Header</h3>
    <span class="status-indicator">Active</span>
  </div>
  
  <div class="content">
    <p>Content with a custom header layout.</p>
  </div>
</Box>

<style>
  .custom-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .status-indicator {
    background-color: #28a745;
    color: white;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 0.75rem;
  }
</style>
```

### Box with Footer

```svelte
<script lang="ts">
  import Box from '@ticatec/uniface-element/Box';
</script>

<Box title="Article">
  <div class="article-content">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  </div>
  
  <div slot="footer" class="article-footer">
    <span class="author">By: Jane Smith</span>
    <span class="date">March 15, 2024</span>
  </div>
</Box>

<style>
  .article-footer {
    display: flex;
    justify-content: space-between;
    color: #666;
    font-size: 0.875rem;
    border-top: 1px solid #eee;
    padding-top: 8px;
  }
</style>
```

### Styled Box with Custom Areas

```svelte
<script lang="ts">
  import Box from '@ticatec/uniface-element/Box';
</script>

<Box
  title="Dashboard Stats"
  round={true}
  style="border: 2px solid #007bff; max-width: 400px;"
  header$style="background-color: #007bff; color: white; padding: 12px 16px;"
  content$style="padding: 20px;"
  footer$style="background-color: #f8f9fa; padding: 8px 16px;"
>
  <div class="stats-grid">
    <div class="stat-item">
      <div class="stat-value">1,234</div>
      <div class="stat-label">Total Users</div>
    </div>
    <div class="stat-item">
      <div class="stat-value">98.5%</div>
      <div class="stat-label">Uptime</div>
    </div>
  </div>
  
  <div slot="footer">
    <small>Last updated: 5 minutes ago</small>
  </div>
</Box>

<style>
  .stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  
  .stat-item {
    text-align: center;
  }
  
  .stat-value {
    font-size: 2rem;
    font-weight: bold;
    color: #007bff;
  }
  
  .stat-label {
    font-size: 0.875rem;
    color: #666;
    margin-top: 4px;
  }
</style>
```

### Multiple Boxes Layout

```svelte
<script lang="ts">
  import Box from '@ticatec/uniface-element/Box';
</script>

<div class="box-grid">
  <Box title="Quick Stats" class="stat-box">
    <div class="quick-stats">
      <div class="stat">
        <span class="number">156</span>
        <span class="label">Orders</span>
      </div>
      <div class="stat">
        <span class="number">$12,450</span>
        <span class="label">Revenue</span>
      </div>
    </div>
  </Box>

  <Box title="Recent Activity" class="activity-box">
    <ul class="activity-list">
      <li>User John registered</li>
      <li>Order #1234 completed</li>
      <li>Payment received</li>
    </ul>
  </Box>

  <Box title="System Status" round={true} class="status-box">
    <div class="status-items">
      <div class="status-item">
        <span class="indicator green"></span>
        <span>Database: Online</span>
      </div>
      <div class="status-item">
        <span class="indicator green"></span>
        <span>API: Healthy</span>
      </div>
      <div class="status-item">
        <span class="indicator yellow"></span>
        <span>Cache: Warning</span>
      </div>
    </div>
  </Box>
</div>

<style>
  .box-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin: 20px 0;
  }
  
  .quick-stats {
    display: flex;
    justify-content: space-around;
    text-align: center;
  }
  
  .stat .number {
    display: block;
    font-size: 1.5rem;
    font-weight: bold;
    color: #007bff;
  }
  
  .stat .label {
    font-size: 0.875rem;
    color: #666;
  }
  
  .activity-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .activity-list li {
    padding: 8px 0;
    border-bottom: 1px solid #eee;
  }
  
  .activity-list li:last-child {
    border-bottom: none;
  }
  
  .status-items {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .status-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
  
  .indicator.green {
    background-color: #28a745;
  }
  
  .indicator.yellow {
    background-color: #ffc107;
  }
</style>
```

## Styling

The Box component uses the following CSS classes:

```css
.uniface-box {
  /* Base box container */
}

.uniface-box.round {
  /* Rounded corners variant */
}

.box-header {
  /* Header container */
}

.box-header .title {
  /* Title within header */
}

.box-content {
  /* Main content area */
}

.box-footer {
  /* Footer container */
}

.flex-container {
  /* Applied to header and footer for flexible layout */
}
```

## Advanced Usage

### Box with Dynamic Content

```svelte
<script lang="ts">
  import Box from '@ticatec/uniface-element/Box';
  
  let showAdvanced = false;
  let userCount = 1250;
  
  function toggleAdvanced() {
    showAdvanced = !showAdvanced;
  }
</script>

<Box 
  title="User Management" 
  round={true}
  content$style="min-height: 200px;"
>
  <div class="user-stats">
    <p>Total Users: <strong>{userCount}</strong></p>
    
    {#if showAdvanced}
      <div class="advanced-stats">
        <p>Active Today: <strong>{Math.floor(userCount * 0.15)}</strong></p>
        <p>New This Week: <strong>{Math.floor(userCount * 0.05)}</strong></p>
        <p>Premium Users: <strong>{Math.floor(userCount * 0.12)}</strong></p>
      </div>
    {/if}
  </div>
  
  <div slot="footer" class="actions">
    <button on:click={toggleAdvanced}>
      {showAdvanced ? 'Hide' : 'Show'} Advanced Stats
    </button>
  </div>
</Box>

<style>
  .user-stats {
    padding: 8px 0;
  }
  
  .advanced-stats {
    margin-top: 16px;
    padding: 16px;
    background-color: #f8f9fa;
    border-radius: 4px;
  }
  
  .actions {
    text-align: right;
  }
  
  .actions button {
    padding: 6px 12px;
    border: 1px solid #007bff;
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .actions button:hover {
    background-color: #0056b3;
  }
</style>
```

## Best Practices

1. **Use descriptive titles** - Keep titles clear and informative
2. **Consistent spacing** - Use the style properties to maintain consistent padding and margins
3. **Semantic structure** - Use appropriate slots for different types of content
4. **Responsive design** - Consider how boxes will stack and resize on different screen sizes
5. **Visual hierarchy** - Use headers and footers to create clear content separation
6. **Accessibility** - Ensure proper heading structure and color contrast

## Comparison with Card Component

While both Box and Card components serve as containers, they have different purposes:

- **Box**: Simple, structural container focused on layout and organization
- **Card**: Feature-rich container with built-in action buttons and interactive elements

Choose Box for:
- Simple content organization
- Custom styling needs
- Minimal overhead
- Flexible layout requirements

Choose Card for:
- Interactive content
- Built-in action buttons
- Consistent card-based designs
- 3D visual effects