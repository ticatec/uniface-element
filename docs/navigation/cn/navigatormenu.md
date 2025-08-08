# NavigatorMenu 导航菜单组件

NavigatorMenu 组件提供分层菜单系统，支持可展开/折叠的树形导航，具有嵌套菜单结构和流畅的动画效果。

## 功能特性

- **分层导航**：多级树形菜单结构
- **可展开项目**：带有子导航的可折叠菜单项
- **流畅动画**：展开/折叠的滑动过渡效果
- **灵活的数据结构**：支持任何菜单项数据格式
- **自定义文本字段**：可配置从菜单项提取文本的方式
- **点击处理**：菜单操作的自定义点击处理器
- **递归渲染**：自动处理嵌套菜单层级

## 导入

```typescript
import { NavigatorMenu, MenuItem } from '@ticatec/uniface-element/NavigatorMenu';
```

## 基本用法

### 简单菜单

```svelte
<script>
  import { NavigatorMenu } from '@ticatec/uniface-element/NavigatorMenu';
  
  const menuItems = [
    {
      item: { name: "仪表板", route: "/dashboard" },
      expand: false,
      children: null
    },
    {
      item: { name: "用户", route: "/users" },
      expand: false,
      children: [
        {
          item: { name: "所有用户", route: "/users/list" },
          expand: false,
          children: null
        },
        {
          item: { name: "添加用户", route: "/users/add" },
          expand: false,
          children: null
        }
      ]
    },
    {
      item: { name: "设置", route: "/settings" },
      expand: false,
      children: null
    }
  ];
  
  const handleMenuClick = (menuItem) => {
    console.log('菜单点击:', menuItem.item.name);
    console.log('导航到:', menuItem.item.route);
  };
</script>

<NavigatorMenu 
  menuItems={menuItems}
  textField="name"
  onItemClick={handleMenuClick}
/>
```

### 自定义文本提取的菜单

```svelte
<script>
  import { NavigatorMenu } from '@ticatec/uniface-element/NavigatorMenu';
  
  const navigationMenu = [
    {
      item: { title: "首页", icon: "home", path: "/" },
      expand: false,
      children: null
    },
    {
      item: { title: "产品", icon: "products", path: "/products" },
      expand: true, // 初始展开
      children: [
        {
          item: { title: "电子产品", path: "/products/electronics" },
          expand: false,
          children: [
            {
              item: { title: "电脑", path: "/products/electronics/computers" },
              expand: false,
              children: null
            },
            {
              item: { title: "手机", path: "/products/electronics/phones" },
              expand: false,
              children: null
            }
          ]
        },
        {
          item: { title: "服装", path: "/products/clothing" },
          expand: false,
          children: null
        }
      ]
    }
  ];
  
  // 从菜单项提取文本的自定义函数
  const getMenuText = (item) => {
    return `${item.icon ? '📁 ' : '📄 '}${item.title}`;
  };
  
  const handleItemClick = (menuItem) => {
    console.log('点击:', menuItem.item.title);
  };
</script>

<NavigatorMenu 
  menuItems={navigationMenu}
  textField={getMenuText}
  onItemClick={handleItemClick}
  style="width: 300px; border: 1px solid #e0e0e0; border-radius: 4px;"
/>
```

## API 参考

### 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `menuItems` | `Array<MenuItem>` | 必需 | 菜单项对象数组 |
| `style` | `string` | `''` | 附加CSS样式 |
| `textField` | `string \| GetText<MenuItem>` | 必需 | 提取文本的字段名或函数 |
| `onItemClick` | `OnMenuClick` | 必需 | 菜单项的点击处理器 |

### MenuItem 接口

```typescript
interface MenuItem {
  [key: string]: any;  // 灵活的项目数据结构
}

interface MenuNode extends TreeNode<MenuItem> {
  item: MenuItem;      // 实际的菜单数据
  expand: boolean;     // 此节点是否展开
  children: MenuNode[] | null; // 子菜单项
}
```

### 类型定义

```typescript
type OnMenuClick = (item: MenuItem) => void;
type GetText<T> = (item: T) => string;
```

## 高级示例

### 带图标的应用导航

```svelte
<script>
  import { NavigatorMenu } from '@ticatec/uniface-element/NavigatorMenu';
  
  let appNavigation = [
    {
      item: { 
        id: 'dashboard',
        label: "仪表板", 
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
        label: "管理", 
        icon: "⚙️",
        permissions: ["admin"]
      },
      expand: false,
      children: [
        {
          item: { 
            id: 'users',
            label: "用户管理", 
            route: "/admin/users",
            permissions: ["admin", "user_management"]
          },
          expand: false,
          children: [
            {
              item: { 
                id: 'user_list',
                label: "查看用户", 
                route: "/admin/users/list" 
              },
              expand: false,
              children: null
            },
            {
              item: { 
                id: 'user_create',
                label: "创建用户", 
                route: "/admin/users/create" 
              },
              expand: false,
              children: null
            },
            {
              item: { 
                id: 'user_roles',
                label: "管理角色", 
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
            label: "系统设置", 
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
        label: "报告", 
        icon: "📈",
        route: "/reports" 
      },
      expand: false,
      children: [
        {
          item: { 
            id: 'sales_reports',
            label: "销售报告", 
            route: "/reports/sales" 
          },
          expand: false,
          children: null
        },
        {
          item: { 
            id: 'user_reports',
            label: "用户报告", 
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
      console.log(`导航到: ${item.route}`);
      // 在这里处理实际导航
    } else {
      console.log(`菜单部分: ${item.label}`);
    }
  };
</script>

<div class="app-navigation">
  <h3>应用菜单</h3>
  <NavigatorMenu 
    menuItems={appNavigation}
    textField={formatMenuText}
    onItemClick={handleNavigation}
    style="background: #f8f9fa; border-radius: 8px; padding: 10px;"
  />
</div>
```

### 文件系统资源管理器菜单

```svelte
<script>
  import { NavigatorMenu } from '@ticatec/uniface-element/NavigatorMenu';
  
  let fileSystemMenu = [
    {
      item: { 
        name: "文档",
        type: "folder",
        path: "/documents",
        size: null
      },
      expand: true,
      children: [
        {
          item: { 
            name: "项目",
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
            name: "简历.pdf",
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
        name: "下载",
        type: "folder",
        path: "/downloads"
      },
      expand: false,
      children: [
        {
          item: { 
            name: "安装程序.exe",
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
      console.log(`打开文件: ${file.path}`);
    } else {
      console.log(`访问文件夹: ${file.path}`);
    }
  };
</script>

<div class="file-explorer">
  <h3>文件资源管理器</h3>
  <NavigatorMenu 
    menuItems={fileSystemMenu}
    textField={getFileDisplayText}
    onItemClick={handleFileClick}
    style="font-family: 'Courier New', monospace; border: 1px solid #ccc; max-height: 400px; overflow-y: auto;"
  />
</div>
```

### 带状态管理的动态菜单

```svelte
<script>
  import { NavigatorMenu } from '@ticatec/uniface-element/NavigatorMenu';
  
  let dynamicMenu = [
    {
      item: { id: 1, title: "主要部分", active: false },
      expand: false,
      children: [
        {
          item: { id: 11, title: "子部分 A", active: false },
          expand: false,
          children: null
        },
        {
          item: { id: 12, title: "子部分 B", active: true },
          expand: false,
          children: null
        }
      ]
    },
    {
      item: { id: 2, title: "次要部分", active: false },
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
    
    // 更新激活状态
    activeItemId = item.id;
    console.log(`选择: ${item.title} (ID: ${item.id})`);
    
    // 通过触发响应式更新强制菜单刷新
    dynamicMenu = [...dynamicMenu];
  };
  
  const addMenuItem = () => {
    const newId = Date.now();
    dynamicMenu[0].children.push({
      item: { id: newId, title: `新项目 ${newId}`, active: false },
      expand: false,
      children: null
    });
    
    dynamicMenu = [...dynamicMenu]; // 触发响应式更新
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
    添加新菜单项
  </button>
</div>
```

## 最佳实践

1. **清晰的层次结构**：设计反映应用程序组织的菜单结构
2. **适当的嵌套**：避免过多嵌套层级（最多3-4级）
3. **一致的文本**：在菜单项中使用一致的命名约定
4. **性能优化**：对于非常大的菜单结构考虑延迟加载
5. **状态管理**：适当地跟踪展开/折叠状态
6. **无障碍访问**：确保菜单项的键盘导航支持
7. **视觉反馈**：为可展开项目和当前选择提供清晰的指示器

## 样式说明

- 组件使用`<ul>`和`<li>`元素构建语义化菜单结构
- 可展开项目有独特的样式类
- 滑动过渡提供流畅的展开/折叠动画
- 自定义CSS可以通过`style`属性应用

## 集成提示

- 与路由库结合使用进行导航处理
- 考虑菜单展开状态的状态持久化
- 为大型菜单实现搜索/筛选功能
- 为常见菜单操作添加键盘快捷键
- 使用各种数据结构进行测试以确保灵活性