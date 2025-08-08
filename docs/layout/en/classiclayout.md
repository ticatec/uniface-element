# ClassicLayout

The ClassicLayout component provides a comprehensive full-screen layout with header, footer, sidebar, right sidebar, and main content area. This classic application layout is ideal for complex applications that need multiple content zones and navigation areas.

## Features

- **Full-Screen Layout**: Covers the entire viewport with header, content, and optional footer
- **Dual Sidebars**: Left sidebar for navigation and optional right sidebar for tools/info
- **Resizable Panels**: Both sidebars can be independently resized
- **Header and Footer**: Fixed header and optional status/footer bar
- **Flexible Configuration**: All areas are optional and highly configurable
- **Split Panel Integration**: Uses Split component for smooth panel resizing

## Import

```typescript
import { ClassicLayout } from '@ticatec/uniface-element/app-layout/ClassicLayout';
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `headerHeight` | `string` | `"48px"` | Sets the height of the header |
| `statusHeight` | `string` | `"22px"` | Sets the height of the status/footer bar |
| `sidebarWidth` | `string` | `"300px"` | Sets the initial width of the left sidebar |
| `sidebarResize` | `boolean` | `false` | Enables left sidebar resizing |
| `sidebarMaxWidth` | `string \| null` | `null` | Maximum width for the left sidebar |
| `sidebarMinWidth` | `string \| null` | `null` | Minimum width for the left sidebar |
| `rightBarWidth` | `string` | `"240px"` | Sets the initial width of the right sidebar |
| `rightBarResize` | `boolean` | `false` | Enables right sidebar resizing |
| `rightBarMaxWidth` | `string \| null` | `null` | Maximum width for the right sidebar |
| `rightBarMinWidth` | `string \| null` | `null` | Minimum width for the right sidebar |

## Slots

- **header**: Content displayed in the header area (spans full width)
- **sidebar**: Content for the left sidebar (optional)
- **right-sidebar**: Content for the right sidebar (optional)
- **bottom**: Content for the footer/status bar (optional)
- **Default Slot**: Main content displayed in the center area

## Basic Usage

```svelte
<script lang="ts">
  import { ClassicLayout } from '@ticatec/uniface-element/app-layout/ClassicLayout';
</script>

<ClassicLayout 
  headerHeight="60px"
  statusHeight="25px"
  sidebarWidth="280px"
  rightBarWidth="250px"
  sidebarResize={true}
  rightBarResize={true}
>
  <div slot="header" class="app-header">
    <h1>Application Title</h1>
  </div>
  
  <div slot="sidebar" class="main-sidebar">
    <p>Left sidebar content</p>
  </div>
  
  <div slot="right-sidebar" class="right-panel">
    <p>Right sidebar content</p>
  </div>
  
  <div slot="bottom" class="status-bar">
    <p>Status bar content</p>
  </div>
  
  <main class="main-content">
    <p>Main application content</p>
  </main>
</ClassicLayout>
```

## Advanced Examples

### IDE-Style Application Layout

```svelte
<script lang="ts">
  import { ClassicLayout } from '@ticatec/uniface-element/app-layout/ClassicLayout';
  import { NavigatorMenu } from '@ticatec/uniface-element/NavigatorMenu';
  import { Button } from '@ticatec/uniface-element/Button';
  import { Tabs } from '@ticatec/uniface-element/Tabs';
  
  let menuItems = [
    { id: 1, text: 'Explorer', icon: 'folder_open' },
    { id: 2, text: 'Search', icon: 'search' },
    { id: 3, text: 'Source Control', icon: 'source' },
    { id: 4, text: 'Extensions', icon: 'extension' }
  ];
  
  let openTabs = [
    { id: 1, title: 'App.svelte', modified: true },
    { id: 2, title: 'main.ts', modified: false },
    { id: 3, title: 'styles.css', modified: true }
  ];
  
  let activeTab = 1;
  let projectStats = {
    files: 127,
    lines: 5420,
    characters: 98234
  };
</script>

<ClassicLayout 
  headerHeight="40px"
  statusHeight="22px"
  sidebarWidth="300px"
  rightBarWidth="280px"
  sidebarResize={true}
  rightBarResize={true}
  sidebarMinWidth="200px"
  sidebarMaxWidth="500px"
  rightBarMinWidth="200px"
  rightBarMaxWidth="400px"
>
  <div slot="header" class="ide-header">
    <div class="header-section">
      <span class="app-title">Code Editor</span>
    </div>
    <div class="header-section header-center">
      <div class="search-box">
        <input type="text" placeholder="Search files..." />
      </div>
    </div>
    <div class="header-section">
      <Button size="small" variant="outlined">Run</Button>
      <Button size="small" type="primary">Debug</Button>
    </div>
  </div>
  
  <div slot="sidebar" class="ide-sidebar">
    <div class="sidebar-header">
      <h3>Explorer</h3>
    </div>
    <NavigatorMenu items={menuItems} />
    
    <div class="file-tree">
      <div class="tree-item">📁 src</div>
      <div class="tree-item tree-nested">📄 App.svelte</div>
      <div class="tree-item tree-nested">📄 main.ts</div>
      <div class="tree-item">📁 public</div>
      <div class="tree-item">📄 package.json</div>
    </div>
  </div>
  
  <div slot="right-sidebar" class="ide-right-panel">
    <div class="panel-header">
      <h3>Properties</h3>
    </div>
    
    <div class="properties-section">
      <h4>Project Statistics</h4>
      <div class="stat-grid">
        <div class="stat-item">
          <label>Files:</label>
          <span>{projectStats.files}</span>
        </div>
        <div class="stat-item">
          <label>Lines:</label>
          <span>{projectStats.lines}</span>
        </div>
        <div class="stat-item">
          <label>Characters:</label>
          <span>{projectStats.characters}</span>
        </div>
      </div>
    </div>
    
    <div class="properties-section">
      <h4>Problems</h4>
      <div class="problem-list">
        <div class="problem-item warning">
          <span class="problem-icon">⚠️</span>
          <span>Unused variable 'temp'</span>
        </div>
        <div class="problem-item error">
          <span class="problem-icon">❌</span>
          <span>Missing semicolon</span>
        </div>
      </div>
    </div>
  </div>
  
  <div slot="bottom" class="ide-status">
    <div class="status-left">
      <span>Ready</span>
      <span class="separator">|</span>
      <span>Line 45, Column 12</span>
    </div>
    <div class="status-right">
      <span>TypeScript</span>
      <span class="separator">|</span>
      <span>UTF-8</span>
      <span class="separator">|</span>
      <span>LF</span>
    </div>
  </div>
  
  <div class="ide-main">
    <div class="tabs-container">
      <Tabs items={openTabs} bind:activeTab />
    </div>
    
    <div class="editor-container">
      <div class="line-numbers">
        {#each Array(20) as _, i}
          <div class="line-number">{i + 1}</div>
        {/each}
      </div>
      
      <div class="code-editor">
        <pre><code>
&lt;script lang="ts"&gt;
  import &#123; Button &#125; from '@ticatec/uniface-element/Button';
  
  let count = 0;
  
  const increment = () => &#123;
    count += 1;
  &#125;;
&lt;/script&gt;

&lt;div class="app"&gt;
  &lt;h1&gt;Welcome to Svelte&lt;/h1&gt;
  &lt;Button on:click=&#123;increment&#125;&gt;
    Count: &#123;count&#125;
  &lt;/Button&gt;
&lt;/div&gt;
        </code></pre>
      </div>
    </div>
  </div>
</ClassicLayout>

<style>
  .ide-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    background: #2d2d30;
    color: #cccccc;
    border-bottom: 1px solid #3e3e42;
  }
  
  .header-section {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .header-center {
    flex: 1;
    justify-content: center;
  }
  
  .app-title {
    font-weight: 500;
    font-size: 0.9em;
  }
  
  .search-box input {
    background: #3c3c3c;
    border: 1px solid #464647;
    color: #cccccc;
    padding: 4px 8px;
    border-radius: 3px;
    width: 200px;
  }
  
  .ide-sidebar {
    background: #252526;
    color: #cccccc;
    padding: 0;
    border-right: 1px solid #3e3e42;
  }
  
  .sidebar-header {
    padding: 10px 15px;
    background: #2d2d30;
    border-bottom: 1px solid #3e3e42;
  }
  
  .sidebar-header h3 {
    margin: 0;
    font-size: 0.85em;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .file-tree {
    padding: 10px 0;
  }
  
  .tree-item {
    padding: 4px 15px;
    cursor: pointer;
    font-size: 0.9em;
  }
  
  .tree-item:hover {
    background: #2a2d2e;
  }
  
  .tree-nested {
    padding-left: 30px;
  }
  
  .ide-right-panel {
    background: #252526;
    color: #cccccc;
    border-left: 1px solid #3e3e42;
  }
  
  .panel-header {
    padding: 10px 15px;
    background: #2d2d30;
    border-bottom: 1px solid #3e3e42;
  }
  
  .panel-header h3 {
    margin: 0;
    font-size: 0.85em;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .properties-section {
    padding: 15px;
    border-bottom: 1px solid #3e3e42;
  }
  
  .properties-section h4 {
    margin: 0 0 10px 0;
    font-size: 0.8em;
    color: #cccccc;
  }
  
  .stat-grid {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  .stat-item {
    display: flex;
    justify-content: space-between;
    font-size: 0.85em;
  }
  
  .stat-item label {
    color: #969696;
  }
  
  .problem-list {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  .problem-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85em;
    padding: 3px 0;
  }
  
  .problem-item.warning {
    color: #ffcc02;
  }
  
  .problem-item.error {
    color: #f48771;
  }
  
  .problem-icon {
    font-size: 0.9em;
  }
  
  .ide-status {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    background: #007acc;
    color: white;
    font-size: 0.8em;
  }
  
  .status-left, .status-right {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .separator {
    opacity: 0.7;
  }
  
  .ide-main {
    background: #1e1e1e;
    color: #cccccc;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .tabs-container {
    background: #2d2d30;
    border-bottom: 1px solid #3e3e42;
  }
  
  .editor-container {
    display: flex;
    flex: 1;
    height: 100%;
  }
  
  .line-numbers {
    background: #1e1e1e;
    color: #858585;
    padding: 10px 5px;
    font-family: 'Courier New', monospace;
    font-size: 0.85em;
    line-height: 1.4;
    text-align: right;
    border-right: 1px solid #3e3e42;
    user-select: none;
  }
  
  .line-number {
    padding: 0 8px;
  }
  
  .code-editor {
    flex: 1;
    padding: 10px;
    font-family: 'Courier New', monospace;
    font-size: 0.85em;
    line-height: 1.4;
    overflow: auto;
  }
  
  .code-editor pre {
    margin: 0;
    color: #cccccc;
  }
  
  .code-editor code {
    color: inherit;
  }
</style>
```

### Dashboard Application Layout

```svelte
<script lang="ts">
  import { ClassicLayout } from '@ticatec/uniface-element/app-layout/ClassicLayout';
  import { NavigatorMenu } from '@ticatec/uniface-element/NavigatorMenu';
  import { Button } from '@ticatec/uniface-element/Button';
  import { Card } from '@ticatec/uniface-element/Card';
  
  let navigationItems = [
    { id: 1, text: 'Dashboard', icon: 'dashboard', active: true },
    { id: 2, text: 'Analytics', icon: 'analytics' },
    { id: 3, text: 'Reports', icon: 'assessment' },
    { id: 4, text: 'Users', icon: 'people' },
    { id: 5, text: 'Settings', icon: 'settings' }
  ];
  
  let currentUser = {
    name: 'John Doe',
    role: 'Administrator',
    avatar: '/avatar.jpg'
  };
  
  let notifications = [
    { id: 1, text: 'New user registered', time: '2 min ago', type: 'info' },
    { id: 2, text: 'Server maintenance scheduled', time: '1 hour ago', type: 'warning' },
    { id: 3, text: 'Backup completed', time: '3 hours ago', type: 'success' }
  ];
  
  let systemStats = {
    uptime: '15 days, 4 hours',
    memory: '68%',
    cpu: '23%',
    storage: '45%'
  };
</script>

<ClassicLayout 
  headerHeight="65px"
  statusHeight="28px"
  sidebarWidth="260px"
  rightBarWidth="300px"
  sidebarResize={true}
  rightBarResize={true}
>
  <div slot="header" class="dashboard-header">
    <div class="header-brand">
      <img src="/logo.png" alt="Company Logo" class="logo" />
      <div class="brand-info">
        <h1>Admin Dashboard</h1>
        <span class="version">v2.1.0</span>
      </div>
    </div>
    
    <div class="header-actions">
      <Button variant="outlined" size="small">
        📊 Export Data
      </Button>
      <div class="user-menu">
        <img src={currentUser.avatar} alt="User Avatar" class="user-avatar" />
        <div class="user-info">
          <span class="user-name">{currentUser.name}</span>
          <small class="user-role">{currentUser.role}</small>
        </div>
      </div>
    </div>
  </div>
  
  <div slot="sidebar" class="dashboard-sidebar">
    <div class="sidebar-content">
      <NavigatorMenu items={navigationItems} />
      
      <div class="sidebar-section">
        <h3>Quick Actions</h3>
        <div class="quick-actions">
          <Button size="small" style="width: 100%; margin-bottom: 8px;">
            + New User
          </Button>
          <Button size="small" variant="outlined" style="width: 100%; margin-bottom: 8px;">
            📈 Generate Report
          </Button>
          <Button size="small" variant="outlined" style="width: 100%;">
            🔧 System Maintenance
          </Button>
        </div>
      </div>
    </div>
  </div>
  
  <div slot="right-sidebar" class="dashboard-rightbar">
    <div class="rightbar-section">
      <h3>Notifications</h3>
      <div class="notifications-list">
        {#each notifications as notification}
          <div class="notification-item {notification.type}">
            <div class="notification-content">
              <p>{notification.text}</p>
              <small>{notification.time}</small>
            </div>
          </div>
        {/each}
      </div>
    </div>
    
    <div class="rightbar-section">
      <h3>System Status</h3>
      <div class="system-stats">
        <div class="stat-row">
          <label>Uptime:</label>
          <span>{systemStats.uptime}</span>
        </div>
        <div class="stat-row">
          <label>Memory:</label>
          <span class="stat-value">{systemStats.memory}</span>
        </div>
        <div class="stat-row">
          <label>CPU:</label>
          <span class="stat-value">{systemStats.cpu}</span>
        </div>
        <div class="stat-row">
          <label>Storage:</label>
          <span class="stat-value">{systemStats.storage}</span>
        </div>
      </div>
    </div>
  </div>
  
  <div slot="bottom" class="dashboard-status">
    <div class="status-info">
      <span>🟢 All systems operational</span>
      <span class="separator">•</span>
      <span>Last updated: {new Date().toLocaleTimeString()}</span>
    </div>
    <div class="status-actions">
      <span>Connected users: 1,247</span>
    </div>
  </div>
  
  <div class="dashboard-main">
    <div class="main-header">
      <h2>Welcome back, {currentUser.name}</h2>
      <p>Here's what's happening with your system today.</p>
    </div>
    
    <div class="dashboard-grid">
      <Card title="Total Users" style="grid-area: users;">
        <div class="metric-card">
          <div class="metric-value">12,486</div>
          <div class="metric-change positive">+5.2%</div>
        </div>
      </Card>
      
      <Card title="Revenue" style="grid-area: revenue;">
        <div class="metric-card">
          <div class="metric-value">$48,392</div>
          <div class="metric-change positive">+12.1%</div>
        </div>
      </Card>
      
      <Card title="Active Sessions" style="grid-area: sessions;">
        <div class="metric-card">
          <div class="metric-value">1,247</div>
          <div class="metric-change negative">-2.8%</div>
        </div>
      </Card>
      
      <Card title="Performance" style="grid-area: performance;">
        <div class="metric-card">
          <div class="metric-value">98.2%</div>
          <div class="metric-change positive">+0.5%</div>
        </div>
      </Card>
      
      <Card title="Recent Activity" style="grid-area: activity;">
        <div class="activity-list">
          <div class="activity-item">User login from IP 192.168.1.1</div>
          <div class="activity-item">Database backup completed</div>
          <div class="activity-item">New report generated</div>
        </div>
      </Card>
    </div>
  </div>
</ClassicLayout>

<style>
  /* Dashboard Header */
  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  }
  
  .header-brand {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  
  .logo {
    width: 40px;
    height: 40px;
    border-radius: 8px;
  }
  
  .brand-info h1 {
    margin: 0;
    font-size: 1.3em;
    font-weight: 600;
  }
  
  .version {
    font-size: 0.7em;
    opacity: 0.8;
  }
  
  .header-actions {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  
  .user-menu {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .user-avatar {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.3);
  }
  
  .user-info {
    display: flex;
    flex-direction: column;
  }
  
  .user-name {
    font-weight: 500;
    font-size: 0.9em;
  }
  
  .user-role {
    font-size: 0.75em;
    opacity: 0.8;
  }
  
  /* Sidebar */
  .dashboard-sidebar {
    background: #f8f9fa;
    border-right: 1px solid #e9ecef;
    padding: 0;
  }
  
  .sidebar-content {
    padding: 20px 0;
  }
  
  .sidebar-section {
    padding: 20px;
    border-top: 1px solid #e9ecef;
  }
  
  .sidebar-section h3 {
    margin: 0 0 15px 0;
    font-size: 0.9em;
    color: #495057;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .quick-actions {
    display: flex;
    flex-direction: column;
  }
  
  /* Right Sidebar */
  .dashboard-rightbar {
    background: #f8f9fa;
    border-left: 1px solid #e9ecef;
    padding: 20px 0;
  }
  
  .rightbar-section {
    padding: 0 20px;
    margin-bottom: 30px;
  }
  
  .rightbar-section h3 {
    margin: 0 0 15px 0;
    font-size: 0.9em;
    color: #495057;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .notifications-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .notification-item {
    padding: 12px;
    border-radius: 6px;
    border-left: 3px solid;
  }
  
  .notification-item.info {
    background: #e7f3ff;
    border-left-color: #2196f3;
  }
  
  .notification-item.warning {
    background: #fff8e1;
    border-left-color: #ff9800;
  }
  
  .notification-item.success {
    background: #e8f5e8;
    border-left-color: #4caf50;
  }
  
  .notification-content p {
    margin: 0 0 4px 0;
    font-size: 0.85em;
  }
  
  .notification-content small {
    color: #666;
    font-size: 0.75em;
  }
  
  .system-stats {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .stat-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9em;
  }
  
  .stat-row label {
    color: #6c757d;
  }
  
  .stat-value {
    font-weight: 500;
    color: #495057;
  }
  
  /* Status Bar */
  .dashboard-status {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    background: #28a745;
    color: white;
    font-size: 0.8em;
  }
  
  .status-info {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .separator {
    opacity: 0.7;
  }
  
  /* Main Content */
  .dashboard-main {
    padding: 30px;
    background: #ffffff;
    height: 100%;
    overflow-y: auto;
  }
  
  .main-header {
    margin-bottom: 30px;
  }
  
  .main-header h2 {
    margin: 0 0 5px 0;
    color: #2c3e50;
  }
  
  .main-header p {
    margin: 0;
    color: #6c757d;
  }
  
  .dashboard-grid {
    display: grid;
    grid-template-areas: 
      "users revenue sessions performance"
      "activity activity activity activity";
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
    height: calc(100% - 100px);
  }
  
  .metric-card {
    text-align: center;
    padding: 20px;
  }
  
  .metric-value {
    font-size: 2.5em;
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 8px;
  }
  
  .metric-change {
    font-size: 0.9em;
    font-weight: 500;
  }
  
  .metric-change.positive {
    color: #28a745;
  }
  
  .metric-change.negative {
    color: #dc3545;
  }
  
  .activity-list {
    padding: 15px;
  }
  
  .activity-item {
    padding: 8px 0;
    border-bottom: 1px solid #f1f1f1;
    font-size: 0.9em;
    color: #495057;
  }
  
  .activity-item:last-child {
    border-bottom: none;
  }
</style>
```

## Best Practices

1. **Layout Planning**: Plan your layout zones carefully - header for branding/navigation, sidebars for tools/navigation, main for content
2. **Responsive Design**: Consider how the layout adapts on different screen sizes
3. **Content Hierarchy**: Use the header for primary navigation, sidebars for secondary tools
4. **Performance**: Keep sidebar content lightweight to maintain smooth resizing
5. **User Experience**: Provide clear visual separation between different areas
6. **Accessibility**: Use semantic HTML within slots and maintain proper focus management

## Accessibility Considerations

- Use proper heading hierarchy across all layout areas
- Ensure keyboard navigation works smoothly between panels
- Provide skip links for screen reader users to jump between major sections
- Use semantic HTML elements (header, nav, main, aside, footer) within appropriate slots
- Maintain proper focus management when panels are resized
- Ensure color contrast meets accessibility standards in all areas

## Browser Support

- Modern browsers with CSS Flexbox support
- Resize functionality requires pointer events support
- Layout works in all browsers supporting modern CSS

## Notes

- The component uses Split component internally for panel resize functionality
- All slots are optional - you can use any combination of header, sidebars, main content, and footer
- You can specify minimum and maximum widths for both sidebars independently
- Header and footer heights can be customized with any valid CSS unit
- The layout covers the full viewport and is ideal for application interfaces
- Both left and right sidebars can be resized independently when enabled