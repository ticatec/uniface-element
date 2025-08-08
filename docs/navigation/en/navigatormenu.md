# NavigatorMenu Component

The NavigatorMenu component provides a hierarchical menu system with expandable/collapsible tree-like navigation, supporting nested menu structures with smooth animations.

## Features

- **Hierarchical Navigation**: Multi-level tree menu structure
- **Expandable Items**: Collapsible menu items with child navigation
- **Smooth Animations**: Slide transitions for expanding/collapsing
- **Flexible Data Structure**: Support for any menu item data format
- **Custom Text Fields**: Configurable text extraction from menu items
- **Click Handling**: Custom click handlers for menu actions
- **Recursive Rendering**: Automatically handles nested menu levels

## Import

```typescript
import { NavigatorMenu, MenuItem } from '@ticatec/uniface-element/NavigatorMenu';
```

## Basic Usage

### Simple Menu

```svelte
<script>
  import { NavigatorMenu } from '@ticatec/uniface-element/NavigatorMenu';
  
  const menuItems = [
    {
      item: { name: "Dashboard", route: "/dashboard" },
      expand: false,
      children: null
    },
    {
      item: { name: "Users", route: "/users" },
      expand: false,
      children: [
        {
          item: { name: "All Users", route: "/users/list" },
          expand: false,
          children: null
        },
        {
          item: { name: "Add User", route: "/users/add" },
          expand: false,
          children: null
        }
      ]
    },
    {
      item: { name: "Settings", route: "/settings" },
      expand: false,
      children: null
    }
  ];
  
  const handleMenuClick = (menuItem) => {
    console.log('Menu clicked:', menuItem.item.name);
    console.log('Navigate to:', menuItem.item.route);
  };
</script>

<NavigatorMenu 
  menuItems={menuItems}
  textField="name"
  onItemClick={handleMenuClick}
/>
```

### Menu with Custom Text Extraction

```svelte
<script>
  import { NavigatorMenu } from '@ticatec/uniface-element/NavigatorMenu';
  
  const navigationMenu = [
    {
      item: { title: "Home", icon: "home", path: "/" },
      expand: false,
      children: null
    },
    {
      item: { title: "Products", icon: "products", path: "/products" },
      expand: true, // Initially expanded
      children: [
        {
          item: { title: "Electronics", path: "/products/electronics" },
          expand: false,
          children: [
            {
              item: { title: "Computers", path: "/products/electronics/computers" },
              expand: false,
              children: null
            },
            {
              item: { title: "Phones", path: "/products/electronics/phones" },
              expand: false,
              children: null
            }
          ]
        },
        {
          item: { title: "Clothing", path: "/products/clothing" },
          expand: false,
          children: null
        }
      ]
    }
  ];
  
  // Custom function to extract text from menu items
  const getMenuText = (item) => {
    return `${item.icon ? '📁 ' : '📄 '}${item.title}`;
  };
  
  const handleItemClick = (menuItem) => {
    console.log('Clicked:', menuItem.item.title);
  };
</script>

<NavigatorMenu 
  menuItems={navigationMenu}
  textField={getMenuText}
  onItemClick={handleItemClick}
  style="width: 300px; border: 1px solid #e0e0e0; border-radius: 4px;"
/>
```

## API Reference

### Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `menuItems` | `Array<MenuItem>` | required | Array of menu item objects |
| `style` | `string` | `''` | Additional CSS styles |
| `textField` | `string \| GetText<MenuItem>` | required | Field name or function to extract text |
| `onItemClick` | `OnMenuClick` | required | Click handler for menu items |

### MenuItem Interface

```typescript
interface MenuItem {
  [key: string]: any;  // Flexible item data structure
}

interface MenuNode extends TreeNode<MenuItem> {
  item: MenuItem;      // The actual menu data
  expand: boolean;     // Whether this node is expanded
  children: MenuNode[] | null; // Child menu items
}
```

### Types

```typescript
type OnMenuClick = (item: MenuItem) => void;
type GetText<T> = (item: T) => string;
```

## Advanced Examples

### Application Navigation with Icons

```svelte
<script>
  import { NavigatorMenu } from '@ticatec/uniface-element/NavigatorMenu';
  
  let appNavigation = [
    {
      item: { 
        id: 'dashboard',
        label: "Dashboard", 
        icon: "📊",
        route: "/dashboard",
        permissions: ["read"]
      },
      expand: false,
      children: null
    },
    {
      item: { 
        id: 'admin',
        label: "Administration", 
        icon: "⚙️",
        permissions: ["admin"]
      },
      expand: false,
      children: [
        {
          item: { 
            id: 'users',
            label: "User Management", 
            route: "/admin/users",
            permissions: ["admin", "user_management"]
          },
          expand: false,
          children: [
            {
              item: { 
                id: 'user_list',
                label: "View Users", 
                route: "/admin/users/list" 
              },
              expand: false,
              children: null
            },
            {
              item: { 
                id: 'user_create',
                label: "Create User", 
                route: "/admin/users/create" 
              },
              expand: false,
              children: null
            },
            {
              item: { 
                id: 'user_roles',
                label: "Manage Roles", 
                route: "/admin/users/roles" 
              },
              expand: false,
              children: null
            }
          ]
        },
        {
          item: { 
            id: 'system',
            label: "System Settings", 
            route: "/admin/system" 
          },
          expand: false,
          children: null
        }
      ]
    },
    {
      item: { 
        id: 'reports',
        label: "Reports", 
        icon: "📈",
        route: "/reports" 
      },
      expand: false,
      children: [
        {
          item: { 
            id: 'sales_reports',
            label: "Sales Reports", 
            route: "/reports/sales" 
          },
          expand: false,
          children: null
        },
        {
          item: { 
            id: 'user_reports',
            label: "User Reports", 
            route: "/reports/users" 
          },
          expand: false,
          children: null
        }
      ]
    }
  ];
  
  const formatMenuText = (item) => {
    return `${item.icon || '📄'} ${item.label}`;
  };
  
  const handleNavigation = (menuNode) => {
    const item = menuNode.item;
    
    if (item.route) {
      console.log(`Navigating to: ${item.route}`);
      // Handle actual navigation here
    } else {
      console.log(`Menu section: ${item.label}`);
    }
  };
</script>

<div class="app-navigation">
  <h3>Application Menu</h3>
  <NavigatorMenu 
    menuItems={appNavigation}
    textField={formatMenuText}
    onItemClick={handleNavigation}
    style="background: #f8f9fa; border-radius: 8px; padding: 10px;"
  />
</div>
```

### File System Explorer Menu

```svelte
<script>
  import { NavigatorMenu } from '@ticatec/uniface-element/NavigatorMenu';
  
  let fileSystemMenu = [
    {
      item: { 
        name: "Documents",
        type: "folder",
        path: "/documents",
        size: null
      },
      expand: true,
      children: [
        {
          item: { 
            name: "Projects",
            type: "folder",
            path: "/documents/projects"
          },
          expand: false,
          children: [
            {
              item: { 
                name: "webapp",
                type: "folder",
                path: "/documents/projects/webapp"
              },
              expand: false,
              children: [
                {
                  item: { 
                    name: "src",
                    type: "folder",
                    path: "/documents/projects/webapp/src"
                  },
                  expand: false,
                  children: null
                },
                {
                  item: { 
                    name: "package.json",
                    type: "file",
                    path: "/documents/projects/webapp/package.json",
                    size: "2.1 KB"
                  },
                  expand: false,
                  children: null
                }
              ]
            }
          ]
        },
        {
          item: { 
            name: "resume.pdf",
            type: "file",
            path: "/documents/resume.pdf",
            size: "145 KB"
          },
          expand: false,
          children: null
        }
      ]
    },
    {
      item: { 
        name: "Downloads",
        type: "folder",
        path: "/downloads"
      },
      expand: false,
      children: [
        {
          item: { 
            name: "installer.exe",
            type: "file",
            path: "/downloads/installer.exe",
            size: "12.3 MB"
          },
          expand: false,
          children: null
        }
      ]
    }
  ];
  
  const getFileDisplayText = (item) => {
    const icon = item.type === 'folder' ? '📁' : '📄';
    const sizeText = item.size ? ` (${item.size})` : '';
    return `${icon} ${item.name}${sizeText}`;
  };
  
  const handleFileClick = (menuNode) => {
    const file = menuNode.item;
    
    if (file.type === 'file') {
      console.log(`Opening file: ${file.path}`);
    } else {
      console.log(`Accessing folder: ${file.path}`);
    }
  };
</script>

<div class="file-explorer">
  <h3>File Explorer</h3>
  <NavigatorMenu 
    menuItems={fileSystemMenu}
    textField={getFileDisplayText}
    onItemClick={handleFileClick}
    style="font-family: 'Courier New', monospace; border: 1px solid #ccc; max-height: 400px; overflow-y: auto;"
  />
</div>
```

### Dynamic Menu with State Management

```svelte
<script>
  import { NavigatorMenu } from '@ticatec/uniface-element/NavigatorMenu';
  
  let dynamicMenu = [
    {
      item: { id: 1, title: "Main Section", active: false },
      expand: false,
      children: [
        {
          item: { id: 11, title: "Subsection A", active: false },
          expand: false,
          children: null
        },
        {
          item: { id: 12, title: "Subsection B", active: true },
          expand: false,
          children: null
        }
      ]
    },
    {
      item: { id: 2, title: "Secondary Section", active: false },
      expand: false,
      children: null
    }
  ];
  
  let activeItemId = 12;
  
  const getMenuText = (item) => {
    const activeIndicator = item.id === activeItemId ? '▶ ' : '';
    return `${activeIndicator}${item.title}`;
  };
  
  const handleMenuSelection = (menuNode) => {
    const item = menuNode.item;
    
    // Update active state
    activeItemId = item.id;
    console.log(`Selected: ${item.title} (ID: ${item.id})`);
    
    // Force menu refresh by triggering reactivity
    dynamicMenu = [...dynamicMenu];
  };
  
  const addMenuItem = () => {
    const newId = Date.now();
    dynamicMenu[0].children.push({
      item: { id: newId, title: `New Item ${newId}`, active: false },
      expand: false,
      children: null
    });
    
    dynamicMenu = [...dynamicMenu]; // Trigger reactivity
  };
</script>

<div class="dynamic-menu">
  <NavigatorMenu 
    menuItems={dynamicMenu}
    textField={getMenuText}
    onItemClick={handleMenuSelection}
    style="border: 2px solid #007acc; border-radius: 6px; padding: 8px;"
  />
  
  <button on:click={addMenuItem} style="margin-top: 10px;">
    Add New Menu Item
  </button>
</div>
```

## Best Practices

1. **Clear Hierarchy**: Design menu structure that reflects your application's organization
2. **Appropriate Nesting**: Avoid too many nested levels (3-4 levels maximum)
3. **Consistent Text**: Use consistent naming conventions across menu items
4. **Performance**: Consider lazy loading for very large menu structures
5. **State Management**: Keep track of expanded/collapsed states appropriately
6. **Accessibility**: Ensure keyboard navigation support for menu items
7. **Visual Feedback**: Provide clear indicators for expandable items and current selection

## Styling Notes

- The component uses `<ul>` and `<li>` elements for semantic menu structure
- Expandable items have distinct styling classes
- Slide transitions provide smooth expand/collapse animations
- Custom CSS can be applied via the `style` prop

## Integration Tips

- Use with routing libraries for navigation handling
- Consider state persistence for menu expansion states
- Implement search/filter functionality for large menus
- Add keyboard shortcuts for common menu actions
- Test with various data structures to ensure flexibility