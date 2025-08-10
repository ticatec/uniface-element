# SidebarLayout

The SidebarLayout component provides a flexible layout with a sidebar, header, and main content area. The sidebar can be resized dynamically, and the layout adapts based on provided properties.

## Features

- **Flexible Sidebar**: Resizable sidebar with configurable minimum and maximum widths
- **Header Support**: Optional header area for navigation or branding
- **Responsive Design**: Adapts to different screen sizes and configurations
- **Split Panel Integration**: Uses Split component for smooth resizing functionality
- **Customizable Dimensions**: Configurable heights and widths for all areas

## Import

```typescript
import SidebarLayout from '@ticatec/uniface-element/app-layout/SidebarLayout';
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `sidebarResize` | `boolean` | `false` | If set to true, enables the sidebar resizing feature |
| `headerHeight` | `string` | `"48px"` | Sets the height of the header |
| `sidebarWidth` | `string` | `"300px"` | Sets the initial width of the sidebar |
| `sidebarMaxWidth` | `string \| null` | `null` | Sets the maximum width for the sidebar when resizing |
| `sidebarMinWidth` | `string \| null` | `null` | Sets the minimum width for the sidebar when resizing |

## Slots

- **sidebar**: The content to be displayed in the sidebar
- **header**: The content to be displayed in the header (optional)
- **Default Slot**: The main content to be displayed in the main area

## Basic Usage

```svelte
<script lang="ts">
  import SidebarLayout from '@ticatec/uniface-element/app-layout/SidebarLayout';
</script>

<SidebarLayout 
  sidebarResize={true} 
  sidebarWidth="250px" 
  sidebarMaxWidth="400px" 
  sidebarMinWidth="200px"
>
  <div slot="sidebar">
    <p>Sidebar content</p>
  </div>

  <div slot="header">
    <h1>Header content</h1>
  </div>

  <div>
    <p>Main content area</p>
  </div>
</SidebarLayout>
```

## Advanced Examples

### Application Layout with Navigation

```svelte
<script lang="ts">
  import SidebarLayout from '@ticatec/uniface-element/app-layout/SidebarLayout';
  import NavigatorMenu from '@ticatec/uniface-element/NavigatorMenu';
  import Button from '@ticatec/uniface-element/Button';
  
  let menuItems = [
    { id: 1, text: 'Dashboard', icon: 'dashboard' },
    { id: 2, text: 'Users', icon: 'people' },
    { id: 3, text: 'Settings', icon: 'settings' }
  ];
  
  let currentPage = 'Dashboard';
</script>

<SidebarLayout 
  sidebarResize={true}
  headerHeight="60px"
  sidebarWidth="280px"
  sidebarMaxWidth="400px"
  sidebarMinWidth="200px"
>
  <div slot="header" class="app-header">
    <div class="header-left">
      <h1>My Application</h1>
    </div>
    <div class="header-right">
      <Button variant="outlined">Profile</Button>
      <Button type="primary">Logout</Button>
    </div>
  </div>

  <div slot="sidebar" class="app-sidebar">
    <NavigatorMenu 
      items={menuItems}
      on:select={(e) => currentPage = e.detail.text}
    />
  </div>

  <main class="app-content">
    <h2>{currentPage}</h2>
    <p>Content for {currentPage} page goes here...</p>
  </main>
</SidebarLayout>

<style>
  .app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    background: #f5f5f5;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .header-right {
    display: flex;
    gap: 10px;
  }
  
  .app-sidebar {
    padding: 20px 0;
    background: #fafafa;
  }
  
  .app-content {
    padding: 20px;
  }
</style>
```

### Collapsible Sidebar Layout

```svelte
<script lang="ts">
  import SidebarLayout from '@ticatec/uniface-element/app-layout/SidebarLayout';
  import IconButton from '@ticatec/uniface-element/IconButton';
  
  let sidebarCollapsed = false;
  let sidebarWidth = sidebarCollapsed ? '60px' : '250px';
  
  const toggleSidebar = () => {
    sidebarCollapsed = !sidebarCollapsed;
    sidebarWidth = sidebarCollapsed ? '60px' : '250px';
  };
</script>

<SidebarLayout 
  sidebarResize={false}
  {sidebarWidth}
  headerHeight="50px"
>
  <div slot="header" class="header-with-toggle">
    <IconButton 
      icon="menu" 
      on:click={toggleSidebar}
      title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
    />
    <h1>Dashboard</h1>
  </div>

  <div slot="sidebar" class="collapsible-sidebar">
    {#if sidebarCollapsed}
      <div class="sidebar-icons">
        <IconButton icon="dashboard" title="Dashboard" />
        <IconButton icon="people" title="Users" />
        <IconButton icon="settings" title="Settings" />
      </div>
    {:else}
      <nav class="sidebar-nav">
        <a href="#dashboard">Dashboard</a>
        <a href="#users">Users</a>
        <a href="#settings">Settings</a>
      </nav>
    {/if}
  </div>

  <div class="main-content">
    <p>Main application content</p>
  </div>
</SidebarLayout>

<style>
  .header-with-toggle {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 0 20px;
    background: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  
  .collapsible-sidebar {
    background: #2c3e50;
    color: white;
    transition: all 0.3s ease;
  }
  
  .sidebar-icons {
    display: flex;
    flex-direction: column;
    padding: 20px 5px;
    gap: 10px;
  }
  
  .sidebar-nav {
    padding: 20px 0;
  }
  
  .sidebar-nav a {
    display: block;
    padding: 12px 20px;
    color: white;
    text-decoration: none;
    transition: background-color 0.2s;
  }
  
  .sidebar-nav a:hover {
    background-color: rgba(255,255,255,0.1);
  }
  
  .main-content {
    padding: 30px;
  }
</style>
```

## Best Practices

1. **Sidebar Content**: Keep sidebar content organized and easily scannable
2. **Responsive Design**: Consider how the layout behaves on smaller screens
3. **Resize Limits**: Set appropriate minimum and maximum widths for the sidebar
4. **Header Usage**: Use the header slot for consistent navigation across pages
5. **Content Hierarchy**: Organize main content with proper heading structure
6. **Performance**: Avoid heavy components in the sidebar that might affect resize performance

## Accessibility Considerations

- Ensure keyboard navigation works properly across all sections
- Provide appropriate ARIA labels for resize handles and navigation elements
- Maintain focus management when sidebar is collapsed/expanded
- Use semantic HTML elements (nav, main, header) within slots
- Ensure color contrast meets accessibility standards

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- Resize functionality requires pointer events support
- Smooth animations work in browsers supporting CSS transitions

## Notes

- The component uses the Split component internally for resize functionality
- You can specify minimum and maximum widths for the sidebar when resizing
- The layout automatically adapts to the provided dimensions and slot content
- Header slot is optional - the layout works without it
- All dimensions can be specified in any valid CSS unit (px, %, rem, etc.)