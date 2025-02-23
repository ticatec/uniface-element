# 侧边栏布局 SidebarLayout

该组件提供了一个灵活的布局，包含侧边栏、头部和主要内容区域。侧边栏可以动态调整大小，并且布局会根据提供的属性进行适配。

## 用法

要在你的 Svelte 应用中使用侧边栏布局组件，像这样引入它：

```svelte
import {SidebarLayout} from "@ticatec/uniface-web/app-layout"
```

## 属性
• **sidebarResize** (布尔值): 如果设置为 true，则启用侧边栏调整大小功能。默认为 false。  
• **headerHeight** (字符串): 设置头部的高度。默认为 "48px"。  
• **sidebarWidth** (字符串): 设置侧边栏的初始宽度。默认为 "300px"。  
• **sidebarMaxWidth** (字符串 | null): 设置调整大小时侧边栏的最大宽度。默认为 null。  
• **sidebarMinWidth** (字符串 | null): 设置调整大小时侧边栏的最小宽度。默认为 null。  

## 插槽
•	**sidebar**: 要在侧边栏中显示的内容。  
•	**header**: 要在头部中显示的内容（可选）。  
•	**Default Slot**: 要在主要区域显示的主要内容。  

## 示例

```sveltehtml
<script lang="ts">
    import {SidebarLayout} from "@ticatec/uniface-web/app-layout"
</script>
<SidebarLayout 
  sidebarResize={true}
  headerHeight="60px"
  sidebarWidth="250px" 
  sidebarMaxWidth="400px" 
  sidebarMinWidth="200px">
  
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

## 注意事项

•	你可以指定调整大小时侧边栏的最小和最大宽度。   
•	布局将适配提供的尺寸和插槽  

该组件使用 Split 组件来启用侧边栏的调整大小功能。