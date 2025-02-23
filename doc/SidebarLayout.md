# SidebarLayout

This component provides a flexible layout with a sidebar, header, and main content area. The sidebar can be resized dynamically, and the layout adapts based on provided properties.

## Usage

To use the sidebar layout component, include it in your Svelte app like this:

```svelte
import {SidebarLayout} from "@ticatec/uniface-web/app-layout"
```

## Properties
•	**sidebarResize** (boolean): If set to true, enables the sidebar resizing feature. Default is false.  
•	**headerHeight** (string): Sets the height of the header. Default is "48px".  
•	**sidebarWidth** (string): Sets the initial width of the sidebar. Default is "300px".  
•	**sidebarMaxWidth** (string | null): Sets the maximum width for the sidebar when resizing. Default is null.  
•	**sidebarMinWidth** (string | null): Sets the minimum width for the sidebar when resizing. Default is null.  

## Slots
•	**sidebar**: The content to be displayed in the sidebar.  
•	**header**: The content to be displayed in the header (optional).  
•	**Default** Slot: The main content to be displayed in the main area.  

## Example

```sveltehtml
<script lang="ts>
  import {SidebarLayout} from "@ticatec/uniface-web/app-layout"
</script>

<SidebarLayout 
  sidebarResize={true} 
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

## Notes

•	You can specify the minimum and maximum widths for the sidebar when resizing.  
•	The layout will adapt to the provided dimensions and slots.  

This component uses the Split component for enabling the resize functionality of the sidebar.