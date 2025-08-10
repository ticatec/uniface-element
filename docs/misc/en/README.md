# Miscellaneous Components

The Uniface Element library provides a collection of utility and layout components for building modern Svelte applications. These components handle common UI patterns and provide flexible layouts.

## Table of Contents

- [Split Component](#split-component)
- [Drawer Component](#drawer-component)
- [Tag Component](#tag-component)
- [Card Component](#card-component)
- [Best Practices](#best-practices)

## Split Component

The Split component provides resizable dividers for creating split-pane layouts with draggable separators.

### Features

- **Horizontal and Vertical**: Support for both horizontal and vertical splitting
- **Draggable Resizing**: Interactive resize handles with mouse drag support
- **Reversible Direction**: Control resize direction with reverse property
- **Panel Binding**: Bind to specific panels for controlled resizing
- **Fixed Mode**: Optionally disable resizing for static layouts

### Basic Usage

```svelte
<script lang="ts">
  import Split from '@ticatec/uniface-element/Split';
  
  let leftPanel;
  let topPanel;
</script>

<!-- Vertical split (left/right panels) -->
<div class="split-container">
  <div class="left-panel" bind:this={leftPanel}>
    Left Panel Content
  </div>
  
  <Split 
    direction="vertical" 
    width={4} 
    bindingPanel={leftPanel}
  />
  
  <div class="right-panel">
    Right Panel Content
  </div>
</div>

<!-- Horizontal split (top/bottom panels) -->
<div class="split-container horizontal">
  <div class="top-panel" bind:this={topPanel}>
    Top Panel Content
  </div>
  
  <Split 
    direction="horizontal" 
    width={4} 
    bindingPanel={topPanel}
  />
  
  <div class="bottom-panel">
    Bottom Panel Content
  </div>
</div>

<style>
  .split-container {
    display: flex;
    height: 400px;
    width: 100%;
    border: 1px solid #ddd;
  }
  
  .split-container.horizontal {
    flex-direction: column;
  }
  
  .left-panel, .right-panel {
    flex: 1;
    padding: 16px;
    overflow: auto;
  }
  
  .top-panel, .bottom-panel {
    flex: 1;
    padding: 16px;
    overflow: auto;
  }
  
  .left-panel {
    background: #f8f9fa;
    min-width: 150px;
  }
  
  .right-panel {
    background: #fff;
  }
  
  .top-panel {
    background: #f8f9fa;
    min-height: 100px;
  }
  
  .bottom-panel {
    background: #fff;
  }
</style>
```

### Advanced Layout

```svelte
<script lang="ts">
  import Split from '@ticatec/uniface-element/Split';
  
  let sidebar;
  let contentLeft;
  let contentTop;
</script>

<!-- Complex split layout: sidebar + main content with nested splits -->
<div class="app-layout">
  <!-- Sidebar -->
  <div class="sidebar" bind:this={sidebar}>
    <h3>Navigation</h3>
    <nav>
      <ul>
        <li>Dashboard</li>
        <li>Projects</li>
        <li>Settings</li>
      </ul>
    </nav>
  </div>
  
  <!-- Vertical splitter -->
  <Split 
    direction="vertical" 
    width={3} 
    bindingPanel={sidebar}
  />
  
  <!-- Main content area -->
  <div class="main-content">
    <!-- Top content area -->
    <div class="content-top" bind:this={contentTop}>
      <h2>Main Content</h2>
      <p>This is the main content area that can be resized.</p>
    </div>
    
    <!-- Horizontal splitter -->
    <Split 
      direction="horizontal" 
      width={3} 
      bindingPanel={contentTop}
      reverse={true}
    />
    
    <!-- Bottom content area -->
    <div class="content-bottom">
      <h3>Details Panel</h3>
      <p>Additional details and information.</p>
    </div>
  </div>
</div>

<style>
  .app-layout {
    display: flex;
    height: 500px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .sidebar {
    width: 200px;
    min-width: 150px;
    background: #2c3e50;
    color: white;
    padding: 16px;
  }
  
  .sidebar h3 {
    margin: 0 0 16px 0;
    color: #ecf0f1;
  }
  
  .sidebar nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .sidebar nav li {
    padding: 8px 0;
    cursor: pointer;
    transition: color 0.2s;
  }
  
  .sidebar nav li:hover {
    color: #3498db;
  }
  
  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .content-top {
    flex: 1;
    min-height: 200px;
    padding: 16px;
    background: #fff;
  }
  
  .content-bottom {
    height: 150px;
    min-height: 100px;
    padding: 16px;
    background: #f8f9fa;
    border-top: 1px solid #dee2e6;
  }
</style>
```

### Split Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `direction` | `'horizontal' \| 'vertical'` | `'vertical'` | Split orientation |
| `width` | `number` | `2` | Splitter thickness in pixels |
| `bindingPanel` | `HTMLElement \| null` | `null` | Panel element to resize |
| `reverse` | `boolean` | `false` | Reverse resize direction |

## Drawer Component

The Drawer component provides a slide-out panel that can be positioned on the left or right side of the screen.

### Features

- **Side Positioning**: Left or right side positioning
- **Smooth Animations**: Fly-in/fly-out transitions with configurable duration
- **Customizable Width**: Adjustable drawer width
- **Backdrop Interaction**: Click outside to close
- **Slot Support**: Flexible content through slots

### Basic Usage

```svelte
<script lang="ts">
  import Drawer from '@ticatec/uniface-element/Drawer';
  
  let leftDrawerVisible = false;
  let rightDrawerVisible = false;
  
  const toggleLeftDrawer = () => {
    leftDrawerVisible = !leftDrawerVisible;
  };
  
  const toggleRightDrawer = () => {
    rightDrawerVisible = !rightDrawerVisible;
  };
</script>

<div class="drawer-demo">
  <h2>Drawer Component Demo</h2>
  
  <div class="buttons">
    <button on:click={toggleLeftDrawer}>
      Toggle Left Drawer
    </button>
    
    <button on:click={toggleRightDrawer}>
      Toggle Right Drawer
    </button>
  </div>
  
  <p>Click the buttons above to open/close drawers.</p>
</div>

<!-- Left Drawer -->
<Drawer bind:visible={leftDrawerVisible} position="left" width={300}>
  <div class="drawer-content">
    <h3>Left Navigation</h3>
    <nav>
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#services">Services</a>
      <a href="#contact">Contact</a>
    </nav>
  </div>
</Drawer>

<!-- Right Drawer -->
<Drawer bind:visible={rightDrawerVisible} position="right" width={350}>
  <div class="drawer-content">
    <h3>Settings Panel</h3>
    <div class="settings">
      <label>
        <input type="checkbox" /> Dark Mode
      </label>
      <label>
        <input type="checkbox" checked /> Notifications
      </label>
      <label>
        <input type="checkbox" /> Auto Save
      </label>
    </div>
  </div>
</Drawer>

<style>
  .drawer-demo {
    padding: 40px;
    text-align: center;
  }
  
  .buttons {
    margin: 20px 0;
    display: flex;
    gap: 16px;
    justify-content: center;
  }
  
  .buttons button {
    padding: 10px 20px;
    border: 1px solid #007bff;
    background: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .buttons button:hover {
    background: #0056b3;
  }
  
  .drawer-content {
    padding: 20px;
    height: 100%;
  }
  
  .drawer-content h3 {
    margin: 0 0 20px 0;
    color: #333;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }
  
  .drawer-content nav {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .drawer-content nav a {
    padding: 8px 12px;
    color: #007bff;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.2s;
  }
  
  .drawer-content nav a:hover {
    background: #f8f9fa;
  }
  
  .settings {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .settings label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }
</style>
```

### Mobile Menu Example

```svelte
<script lang="ts">
  import Drawer from '@ticatec/uniface-element/Drawer';
  
  let menuVisible = false;
  
  const toggleMenu = () => {
    menuVisible = !menuVisible;
  };
  
  const closeMenu = () => {
    menuVisible = false;
  };
</script>

<!-- Mobile Header -->
<header class="mobile-header">
  <button class="menu-button" on:click={toggleMenu}>
    <span class="hamburger">☰</span>
  </button>
  <h1>My App</h1>
  <div class="header-actions">
    <!-- Header actions -->
  </div>
</header>

<!-- Mobile Navigation Drawer -->
<Drawer bind:visible={menuVisible} position="left" width={280}>
  <div class="mobile-menu">
    <div class="menu-header">
      <h2>Menu</h2>
      <button class="close-button" on:click={closeMenu}>×</button>
    </div>
    
    <nav class="menu-nav">
      <a href="#dashboard" on:click={closeMenu}>Dashboard</a>
      <a href="#projects" on:click={closeMenu}>Projects</a>
      <a href="#team" on:click={closeMenu}>Team</a>
      <a href="#settings" on:click={closeMenu}>Settings</a>
      
      <div class="menu-divider"></div>
      
      <a href="#help" on:click={closeMenu}>Help & Support</a>
      <a href="#logout" on:click={closeMenu}>Logout</a>
    </nav>
  </div>
</Drawer>

<style>
  .mobile-header {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    background: #fff;
    border-bottom: 1px solid #eee;
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .menu-button {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    padding: 8px;
    margin-right: 12px;
  }
  
  .mobile-header h1 {
    flex: 1;
    margin: 0;
    font-size: 1.2em;
    color: #333;
  }
  
  .mobile-menu {
    height: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
  }
  
  .menu-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid #eee;
  }
  
  .menu-header h2 {
    margin: 0;
    color: #333;
  }
  
  .close-button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .menu-nav {
    flex: 1;
    padding: 16px 0;
    display: flex;
    flex-direction: column;
  }
  
  .menu-nav a {
    padding: 12px 20px;
    color: #333;
    text-decoration: none;
    border-bottom: 1px solid #f5f5f5;
    transition: background-color 0.2s;
  }
  
  .menu-nav a:hover {
    background: #f8f9fa;
  }
  
  .menu-divider {
    height: 1px;
    background: #ddd;
    margin: 8px 20px;
  }
</style>
```

### Drawer Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `visible` | `boolean` | `false` | Controls drawer visibility |
| `width` | `number` | `300` | Drawer width in pixels |
| `position` | `'left' \| 'right'` | `'left'` | Drawer position |

## Tag Component

The Tag component displays labeled information with optional remove functionality.

### Features

- **Multiple Sizes**: Big, middle, and small size variants
- **Style Variants**: Borderless, border, and round styles
- **Removable**: Optional remove button with custom handlers
- **Color Support**: Customizable colors and color classes
- **Flexible Text**: Display any text content

### Basic Usage

```svelte
<script lang="ts">
  import Tag from '@ticatec/uniface-element/Tag';
  
  let tags = [
    { id: 1, text: 'JavaScript', color: 'blue' },
    { id: 2, text: 'TypeScript', color: 'blue' },
    { id: 3, text: 'Svelte', color: 'orange' },
    { id: 4, text: 'CSS', color: 'green' }
  ];
  
  const removeTag = (tagId: number) => {
    tags = tags.filter(tag => tag.id !== tagId);
  };
</script>

<div class="tag-demo">
  <h3>Default Tags</h3>
  <div class="tag-group">
    {#each tags as tag}
      <Tag 
        text={tag.text}
        removable={true}
        removeHandler={() => removeTag(tag.id)}
      />
    {/each}
  </div>
  
  <h3>Size Variants</h3>
  <div class="tag-group">
    <Tag text="Small Tag" size="small" />
    <Tag text="Middle Tag" size="middle" />
    <Tag text="Big Tag" size="big" />
  </div>
  
  <h3>Style Variants</h3>
  <div class="tag-group">
    <Tag text="Borderless" variant="borderless" />
    <Tag text="Border" variant="border" />
    <Tag text="Round" variant="round" />
  </div>
  
  <h3>Non-removable Tags</h3>
  <div class="tag-group">
    <Tag text="Status: Active" removable={false} color="green" />
    <Tag text="Priority: High" removable={false} color="red" />
    <Tag text="Type: Bug" removable={false} color="orange" />
  </div>
</div>

<style>
  .tag-demo {
    padding: 20px;
  }
  
  .tag-group {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 12px 0 24px 0;
  }
  
  .tag-demo h3 {
    margin: 20px 0 8px 0;
    color: #333;
    font-size: 1.1em;
  }
</style>
```

### Dynamic Tag Management

```svelte
<script lang="ts">
  import Tag from '@ticatec/uniface-element/Tag';
  
  let newTagText = '';
  let tags = [
    { id: 1, text: 'Frontend', color: 'blue' },
    { id: 2, text: 'Backend', color: 'green' },
    { id: 3, text: 'Database', color: 'purple' }
  ];
  let nextId = 4;
  
  const addTag = () => {
    if (newTagText.trim()) {
      tags = [...tags, { 
        id: nextId++, 
        text: newTagText.trim(),
        color: getRandomColor()
      }];
      newTagText = '';
    }
  };
  
  const removeTag = (tagId: number) => {
    tags = tags.filter(tag => tag.id !== tagId);
  };
  
  const getRandomColor = () => {
    const colors = ['blue', 'green', 'red', 'orange', 'purple', 'pink'];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      addTag();
    }
  };
</script>

<div class="tag-manager">
  <h3>Skill Tags Manager</h3>
  
  <!-- Add new tag -->
  <div class="add-tag-form">
    <input 
      type="text" 
      bind:value={newTagText}
      placeholder="Enter a skill..."
      on:keypress={handleKeyPress}
    />
    <button on:click={addTag} disabled={!newTagText.trim()}>
      Add Tag
    </button>
  </div>
  
  <!-- Tag list -->
  <div class="tag-list">
    {#each tags as tag (tag.id)}
      <Tag 
        text={tag.text}
        color={tag.color}
        variant="round"
        removable={true}
        removeHandler={() => removeTag(tag.id)}
      />
    {/each}
    
    {#if tags.length === 0}
      <p class="empty-state">No tags yet. Add some skills above!</p>
    {/if}
  </div>
  
  <!-- Tag count -->
  <div class="tag-stats">
    <small>Total skills: {tags.length}</small>
  </div>
</div>

<style>
  .tag-manager {
    max-width: 500px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #fff;
  }
  
  .add-tag-form {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
  }
  
  .add-tag-form input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }
  
  .add-tag-form button {
    padding: 8px 16px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;
  }
  
  .add-tag-form button:hover:not(:disabled) {
    background: #0056b3;
  }
  
  .add-tag-form button:disabled {
    background: #6c757d;
    cursor: not-allowed;
  }
  
  .tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    min-height: 40px;
    margin-bottom: 12px;
  }
  
  .empty-state {
    color: #666;
    font-style: italic;
    margin: 0;
  }
  
  .tag-stats {
    text-align: right;
    color: #666;
  }
</style>
```

### Tag Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `size` | `'big' \| 'middle' \| 'small'` | `'middle'` | Tag size variant |
| `variant` | `'borderless' \| 'border' \| 'round'` | `'border'` | Visual style variant |
| `removable` | `boolean` | `true` | Show remove button |
| `text` | `string` | `''` | Tag text content |
| `style` | `string` | `''` | Custom CSS styles |
| `class` | `string` | `''` | CSS class name |
| `removeHandler` | `MouseClickHandler` | - | Remove button click handler |
| `color` | `string` | - | Color class identifier |

## Card Component

The Card component provides a container with optional header, content, and action areas.

### Features

- **Flexible Layout**: Header, content, and action sections
- **Style Variants**: Plain and 3D shadow variants  
- **Action Support**: Built-in action bar with configurable actions
- **Slot System**: Flexible content through named slots
- **Data Binding**: Pass data context to actions

### Basic Usage

```svelte
<script lang="ts">
  import Card from '@ticatec/uniface-element/Card';
  import type { CardAction } from '@ticatec/uniface-element';
  
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/avatars/john.jpg'
  };
  
  const cardActions: CardAction[] = [
    {
      icon: 'icon_google_edit',
      hint: 'Edit Profile',
      callback: (data) => {
        console.log('Edit user:', data);
      }
    },
    {
      icon: 'icon_google_delete',
      hint: 'Delete User',
      callback: (data) => {
        console.log('Delete user:', data);
      }
    }
  ];
</script>

<div class="card-demo">
  <!-- Simple card with title -->
  <Card title="User Profile" variant="plain">
    <div class="profile-content">
      <img src={user.avatar} alt={user.name} class="avatar" />
      <div class="user-info">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
    </div>
  </Card>
  
  <!-- Card with actions -->
  <Card 
    title="User Management" 
    variant="3d"
    actions={cardActions}
    data={user}
  >
    <div class="user-details">
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Status:</strong> Active</p>
    </div>
  </Card>
  
  <!-- Card with custom header -->
  <Card variant="plain">
    <div slot="header-bar" class="custom-header">
      <h3>Custom Header</h3>
      <span class="status-badge">Online</span>
    </div>
    
    <div class="card-body">
      <p>This card has a custom header with additional elements.</p>
    </div>
    
    <div slot="action-bar" class="custom-actions">
      <button class="btn-primary">Save</button>
      <button class="btn-secondary">Cancel</button>
    </div>
  </Card>
</div>

<style>
  .card-demo {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    padding: 20px;
  }
  
  .profile-content {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
  }
  
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .user-info h3 {
    margin: 0 0 4px 0;
    color: #333;
  }
  
  .user-info p {
    margin: 0;
    color: #666;
    font-size: 0.9em;
  }
  
  .user-details {
    padding: 16px;
  }
  
  .user-details p {
    margin: 8px 0;
  }
  
  .custom-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
  }
  
  .custom-header h3 {
    margin: 0;
    color: #333;
  }
  
  .status-badge {
    background: #28a745;
    color: white;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.8em;
  }
  
  .card-body {
    padding: 16px;
  }
  
  .custom-actions {
    display: flex;
    gap: 8px;
    padding: 12px 16px;
    background: #f8f9fa;
  }
  
  .btn-primary, .btn-secondary {
    padding: 6px 12px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    font-size: 0.9em;
  }
  
  .btn-primary {
    background: #007bff;
    color: white;
  }
  
  .btn-secondary {
    background: #6c757d;
    color: white;
  }
</style>
```

### Card Grid Layout

```svelte
<script lang="ts">
  import Card from '@ticatec/uniface-element/Card';
  
  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'Modern online shopping platform with React and Node.js',
      status: 'In Progress',
      progress: 75
    },
    {
      id: 2,
      title: 'Mobile Banking App',
      description: 'Secure mobile banking application for iOS and Android',
      status: 'Completed',
      progress: 100
    },
    {
      id: 3,
      title: 'Data Analytics Dashboard',
      description: 'Real-time analytics dashboard with interactive charts',
      status: 'Planning',
      progress: 25
    }
  ];
  
  const getProjectActions = (project) => [
    {
      icon: 'icon_google_visibility',
      hint: 'View Project',
      callback: (data) => console.log('View project:', data.title)
    },
    {
      icon: 'icon_google_edit',
      hint: 'Edit Project',
      callback: (data) => console.log('Edit project:', data.title)
    },
    {
      icon: 'icon_google_more_vert',
      hint: 'More Options',
      callback: (data) => console.log('More options:', data.title)
    }
  ];
</script>

<div class="project-grid">
  <h2>Project Dashboard</h2>
  
  <div class="grid">
    {#each projects as project}
      <Card 
        title={project.title}
        variant="3d"
        actions={getProjectActions(project)}
        data={project}
      >
        <div class="project-card-content">
          <p class="description">{project.description}</p>
          
          <div class="project-meta">
            <div class="status">
              <span class="status-label">Status:</span>
              <span class="status-value status-{project.status.toLowerCase().replace(' ', '-')}">
                {project.status}
              </span>
            </div>
            
            <div class="progress">
              <span class="progress-label">Progress:</span>
              <div class="progress-bar">
                <div 
                  class="progress-fill" 
                  style="width: {project.progress}%"
                ></div>
              </div>
              <span class="progress-text">{project.progress}%</span>
            </div>
          </div>
        </div>
      </Card>
    {/each}
  </div>
</div>

<style>
  .project-grid {
    padding: 20px;
  }
  
  .project-grid h2 {
    margin: 0 0 24px 0;
    color: #333;
  }
  
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 20px;
  }
  
  .project-card-content {
    padding: 16px;
  }
  
  .description {
    color: #666;
    line-height: 1.5;
    margin: 0 0 16px 0;
  }
  
  .project-meta {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .status, .progress {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9em;
  }
  
  .status-label, .progress-label {
    font-weight: 500;
    color: #333;
    min-width: 60px;
  }
  
  .status-value {
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 0.8em;
    font-weight: 500;
  }
  
  .status-completed {
    background: #d4edda;
    color: #155724;
  }
  
  .status-in-progress {
    background: #d1ecf1;
    color: #0c5460;
  }
  
  .status-planning {
    background: #fff3cd;
    color: #856404;
  }
  
  .progress-bar {
    flex: 1;
    height: 6px;
    background: #e9ecef;
    border-radius: 3px;
    overflow: hidden;
  }
  
  .progress-fill {
    height: 100%;
    background: #007bff;
    transition: width 0.3s ease;
  }
  
  .progress-text {
    min-width: 35px;
    text-align: right;
    font-size: 0.8em;
    color: #666;
  }
</style>
```

### Card Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `style` | `string` | `''` | Custom CSS styles |
| `title` | `string` | - | Card title text |
| `actions` | `CardAction[]` | `[]` | Action button configurations |
| `variant` | `'plain' \| '3d'` | `'plain'` | Visual style variant |
| `iconColor` | `string \| null` | `null` | Action icon color |
| `data` | `any` | - | Data passed to action handlers |

### CardAction Interface

```typescript
interface CardAction {
  icon?: string;        // Icon class name
  img?: string;         // Image source URL
  hint?: string;        // Tooltip text
  disabled?: boolean;   // Disable action
  callback: (data: any) => void;  // Click handler
}
```

## Best Practices

### 1. Split Component Usage

```svelte
<!-- Provide minimum sizes for panels -->
<style>
  .resizable-panel {
    min-width: 200px;
    min-height: 150px;
  }
</style>

<!-- Use appropriate binding -->
<Split bindingPanel={panelElement} direction="vertical" />
```

### 2. Drawer Accessibility

```svelte
<!-- Add proper ARIA labels and keyboard support -->
<Drawer bind:visible={drawerOpen} position="left">
  <div role="navigation" aria-label="Main navigation">
    <!-- Navigation content -->
  </div>
</Drawer>
```

### 3. Tag Management

```svelte
<!-- Provide clear visual feedback for removable tags -->
<Tag 
  text="Removable Tag"
  removable={true}
  removeHandler={() => handleRemove()}
  aria-label="Remove tag"
/>
```

### 4. Card Organization

```svelte
<!-- Use consistent card layouts in grids -->
<div class="card-grid">
  {#each items as item}
    <Card title={item.title} variant="3d">
      <!-- Consistent content structure -->
    </Card>
  {/each}
</div>

<style>
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }
</style>
```

These miscellaneous components provide essential UI patterns for modern applications, offering flexibility and consistent design while maintaining usability and accessibility standards.