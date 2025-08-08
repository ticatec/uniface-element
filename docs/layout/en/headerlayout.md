# HeaderLayout

The HeaderLayout component provides a flexible T-shaped layout with a header at the top and main content area below. The main area can optionally include a sidebar that can be dynamically resized, and the layout adapts based on provided properties.

## Features

- **T-Shaped Layout**: Header spans the full width at the top with content below
- **Optional Sidebar**: Main content area can include a resizable sidebar
- **Flexible Configuration**: Configurable header height and sidebar dimensions
- **Split Panel Integration**: Uses Split component for smooth sidebar resizing
- **Responsive Design**: Adapts to different screen sizes and configurations

## Import

```typescript
import { HeaderLayout } from '@ticatec/uniface-element/app-layout/HeaderLayout';
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

- **header**: The content to be displayed in the header (spans full width)
- **sidebar**: The content to be displayed in the sidebar (optional)
- **Default Slot**: The main content to be displayed in the content area

## Basic Usage

```svelte
<script lang="ts">
  import { HeaderLayout } from '@ticatec/uniface-element/app-layout/HeaderLayout';
</script>

<HeaderLayout 
  sidebarResize={true} 
  headerHeight="60px"
  sidebarWidth="250px" 
  sidebarMaxWidth="400px" 
  sidebarMinWidth="200px"
>
  <div slot="header">
    <h1>Application Header</h1>
  </div>
  
  <div slot="sidebar">
    <p>Sidebar content</p>
  </div>

  <div>
    <p>Main content area</p>
  </div>
</HeaderLayout>
```

## Advanced Examples

### Application with Navigation Header

```svelte
<script lang="ts">
  import { HeaderLayout } from '@ticatec/uniface-element/app-layout/HeaderLayout';
  import { NavigatorMenu } from '@ticatec/uniface-element/NavigatorMenu';
  import { Button } from '@ticatec/uniface-element/Button';
  import { Breadcrumbs } from '@ticatec/uniface-element/Breadcrumbs';
  
  let menuItems = [
    { id: 1, text: 'Dashboard', icon: 'dashboard' },
    { id: 2, text: 'Projects', icon: 'folder' },
    { id: 3, text: 'Team', icon: 'people' },
    { id: 4, text: 'Settings', icon: 'settings' }
  ];
  
  let breadcrumbItems = [
    { text: 'Home', href: '#' },
    { text: 'Projects', href: '#' },
    { text: 'Current Project' }
  ];
  
  let currentUser = { name: 'John Doe', role: 'Admin' };
</script>

<HeaderLayout 
  sidebarResize={true}
  headerHeight="80px"
  sidebarWidth="280px"
  sidebarMaxWidth="400px"
  sidebarMinWidth="200px"
>
  <div slot="header" class="app-header">
    <div class="header-brand">
      <img src="/logo.png" alt="Logo" class="logo" />
      <h1>Project Manager</h1>
    </div>
    
    <div class="header-nav">
      <Breadcrumbs items={breadcrumbItems} />
    </div>
    
    <div class="header-user">
      <span class="user-info">
        {currentUser.name} ({currentUser.role})
      </span>
      <Button variant="outlined" size="small">Profile</Button>
      <Button type="primary" size="small">Logout</Button>
    </div>
  </div>

  <div slot="sidebar" class="app-sidebar">
    <NavigatorMenu items={menuItems} />
  </div>

  <main class="app-content">
    <div class="content-header">
      <h2>Welcome to Dashboard</h2>
      <p>Manage your projects and team from here</p>
    </div>
    
    <div class="content-body">
      <div class="stats-grid">
        <div class="stat-card">
          <h3>Active Projects</h3>
          <div class="stat-value">12</div>
        </div>
        <div class="stat-card">
          <h3>Team Members</h3>
          <div class="stat-value">8</div>
        </div>
        <div class="stat-card">
          <h3>Completed Tasks</h3>
          <div class="stat-value">145</div>
        </div>
      </div>
    </div>
  </main>
</HeaderLayout>

<style>
  .app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  .header-brand {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  
  .logo {
    width: 40px;
    height: 40px;
  }
  
  .header-nav {
    flex: 1;
    display: flex;
    justify-content: center;
  }
  
  .header-user {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  
  .user-info {
    font-size: 0.9em;
  }
  
  .app-sidebar {
    background: #f8f9fa;
    border-right: 1px solid #e9ecef;
    padding: 20px 0;
  }
  
  .app-content {
    padding: 30px;
    background: #ffffff;
  }
  
  .content-header {
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e9ecef;
  }
  
  .content-header h2 {
    margin: 0 0 5px 0;
    color: #2c3e50;
  }
  
  .content-header p {
    margin: 0;
    color: #6c757d;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }
  
  .stat-card {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    text-align: center;
  }
  
  .stat-card h3 {
    margin: 0 0 10px 0;
    font-size: 0.9em;
    color: #6c757d;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .stat-value {
    font-size: 2.5em;
    font-weight: bold;
    color: #2c3e50;
  }
</style>
```

### Document Editor Layout

```svelte
<script lang="ts">
  import { HeaderLayout } from '@ticatec/uniface-element/app-layout/HeaderLayout';
  import { Button } from '@ticatec/uniface-element/Button';
  import { IconButton } from '@ticatec/uniface-element/IconButton';
  
  let documentTitle = 'Untitled Document';
  let lastSaved = new Date().toLocaleTimeString();
  let wordCount = 1247;
</script>

<HeaderLayout 
  sidebarResize={true}
  headerHeight="70px"
  sidebarWidth="250px"
  sidebarMaxWidth="350px"
  sidebarMinWidth="200px"
>
  <div slot="header" class="editor-header">
    <div class="header-left">
      <IconButton icon="menu" title="File menu" />
      <div class="document-info">
        <input 
          bind:value={documentTitle} 
          class="document-title"
          placeholder="Untitled Document"
        />
        <small class="last-saved">Last saved: {lastSaved}</small>
      </div>
    </div>
    
    <div class="header-center">
      <div class="toolbar">
        <IconButton icon="undo" title="Undo" />
        <IconButton icon="redo" title="Redo" />
        <div class="divider"></div>
        <IconButton icon="format_bold" title="Bold" />
        <IconButton icon="format_italic" title="Italic" />
        <IconButton icon="format_underlined" title="Underline" />
      </div>
    </div>
    
    <div class="header-right">
      <Button variant="outlined" size="small">Share</Button>
      <Button type="primary" size="small">Save</Button>
    </div>
  </div>

  <div slot="sidebar" class="document-sidebar">
    <div class="sidebar-section">
      <h3>Document Outline</h3>
      <ul class="outline-list">
        <li><a href="#intro">Introduction</a></li>
        <li><a href="#chapter1">Chapter 1</a></li>
        <li><a href="#chapter2">Chapter 2</a></li>
        <li><a href="#conclusion">Conclusion</a></li>
      </ul>
    </div>
    
    <div class="sidebar-section">
      <h3>Statistics</h3>
      <div class="doc-stats">
        <div class="stat-item">
          <label>Words:</label>
          <span>{wordCount}</span>
        </div>
        <div class="stat-item">
          <label>Characters:</label>
          <span>{wordCount * 5}</span>
        </div>
        <div class="stat-item">
          <label>Pages:</label>
          <span>{Math.ceil(wordCount / 250)}</span>
        </div>
      </div>
    </div>
  </div>

  <div class="editor-content">
    <div class="document-editor">
      <div class="editor-paper">
        <h1>Document Title</h1>
        <p>Start writing your document here...</p>
        <p>The editor content would go in this area. You can add any rich text editing component or simple textarea.</p>
      </div>
    </div>
  </div>
</HeaderLayout>

<style>
  .editor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    background: white;
    border-bottom: 1px solid #e0e0e0;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  
  .header-left {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  
  .document-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  
  .document-title {
    border: none;
    font-size: 1.1em;
    font-weight: 500;
    padding: 2px 4px;
    border-radius: 3px;
    background: transparent;
  }
  
  .document-title:focus {
    background: #f5f5f5;
    outline: none;
  }
  
  .last-saved {
    color: #666;
    font-size: 0.8em;
  }
  
  .header-center {
    flex: 1;
    display: flex;
    justify-content: center;
  }
  
  .toolbar {
    display: flex;
    align-items: center;
    gap: 5px;
    background: #f8f9fa;
    padding: 5px 10px;
    border-radius: 6px;
  }
  
  .divider {
    width: 1px;
    height: 20px;
    background: #dee2e6;
    margin: 0 5px;
  }
  
  .header-right {
    display: flex;
    gap: 10px;
  }
  
  .document-sidebar {
    background: #fafafa;
    border-right: 1px solid #e0e0e0;
    padding: 20px 0;
  }
  
  .sidebar-section {
    padding: 0 20px;
    margin-bottom: 30px;
  }
  
  .sidebar-section h3 {
    margin: 0 0 15px 0;
    font-size: 0.9em;
    color: #495057;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .outline-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .outline-list li {
    margin-bottom: 8px;
  }
  
  .outline-list a {
    text-decoration: none;
    color: #6c757d;
    padding: 4px 8px;
    display: block;
    border-radius: 4px;
    transition: all 0.2s;
  }
  
  .outline-list a:hover {
    background: #e9ecef;
    color: #495057;
  }
  
  .doc-stats {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9em;
  }
  
  .stat-item label {
    color: #6c757d;
  }
  
  .stat-item span {
    font-weight: 500;
    color: #495057;
  }
  
  .editor-content {
    background: #f8f9fa;
    padding: 20px;
  }
  
  .document-editor {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .editor-paper {
    background: white;
    padding: 40px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    min-height: 600px;
  }
  
  .editor-paper h1 {
    margin-top: 0;
    color: #2c3e50;
  }
  
  .editor-paper p {
    line-height: 1.6;
    color: #495057;
  }
</style>
```

## Best Practices

1. **Header Content**: Use the header for global navigation, branding, and user actions
2. **Layout Hierarchy**: Ensure clear visual hierarchy between header, sidebar, and main content
3. **Responsive Behavior**: Consider how the layout behaves on different screen sizes
4. **Performance**: Keep header content lightweight for consistent performance
5. **Accessibility**: Use semantic HTML and proper focus management
6. **Content Organization**: Use the sidebar for contextual navigation and tools

## Accessibility Considerations

- Use proper heading hierarchy (h1 in header, h2+ in content areas)
- Ensure keyboard navigation works across all layout sections
- Provide skip links for screen reader users
- Maintain proper focus management when sections are resized
- Use semantic HTML elements within slots (header, nav, main)

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- Resize functionality requires pointer events support
- Layout works in all browsers supporting CSS Grid

## Notes

- The component uses the Split component internally for sidebar resize functionality
- Header spans the full width and remains fixed at the top
- Sidebar is optional - the layout works with just header and main content
- You can specify minimum and maximum widths for the sidebar when resizing
- All dimensions can be specified in any valid CSS unit (px, %, rem, etc.)
- The layout automatically adapts to the provided slot content