# Accordion Component

A collapsible content container component that allows organizing multiple sections of content in a space-efficient expandable/collapsible format.

## Overview

The Accordion component provides an elegant way to display multiple sections of content where users can expand and collapse individual sections. It supports both exclusive (only one section open at a time) and multi-open modes, making it perfect for FAQs, navigation menus, content organization, and dashboard sections.

## Installation

```typescript
import Accordion from '@ticatec/uniface-element/Accordion';
import type { AccordionItem } from '@ticatec/uniface-element/Accordion';
```

## Basic Usage

```svelte
<script lang="ts">
  import Accordion from '@ticatec/uniface-element/Accordion';
  import type { AccordionItem } from '@ticatec/uniface-element/Accordion';
  
  // Import your components
  import UserProfile from './UserProfile.svelte';
  import Settings from './Settings.svelte';
  import Reports from './Reports.svelte';

  let accordionItems: AccordionItem[] = [
    {
      title: 'User Profile',
      component: UserProfile,
      params: { userId: 123 }
    },
    {
      title: 'Settings',
      component: Settings
    },
    {
      title: 'Reports',
      component: Reports,
      params: { type: 'monthly' }
    }
  ];
</script>

<Accordion accordions={accordionItems} />
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `style` | `string` | `''` | Custom CSS styles for the accordion container |
| `class` | `string` | `''` | Additional CSS class names |
| `compact` | `boolean` | `false` | Use compact styling with reduced padding |
| `accordions` | `Array<AccordionItem>` | `[]` | Array of accordion items to display |
| `exclusive` | `boolean` | `false` | Only allow one accordion to be open at a time |
| `activeItem` | `AccordionItem` | `null` | Currently active item (used with exclusive mode) |

## AccordionItem Interface

```typescript
interface AccordionItem {
  /**
   * Display title for the accordion section
   */
  title: string;

  /**
   * Svelte component to render in the accordion content
   */
  component: any;

  /**
   * Parameters/props to pass to the component
   */
  params?: any;
}
```

## Usage Examples

### Basic Accordion

```svelte
<script lang="ts">
  import Accordion from '@ticatec/uniface-element/Accordion';
  import type { AccordionItem } from '@ticatec/uniface-element/Accordion';

  // Simple text components for demo
  let TextSection = (text: string) => `<div class="section-content"><p>${text}</p></div>`;

  let items: AccordionItem[] = [
    {
      title: 'Getting Started',
      component: TextSection,
      params: { text: 'Welcome to our platform! Here you\'ll find everything you need to get started.' }
    },
    {
      title: 'Features',
      component: TextSection,
      params: { text: 'Explore the powerful features available in our application.' }
    },
    {
      title: 'Support',
      component: TextSection,
      params: { text: 'Need help? Contact our support team for assistance.' }
    }
  ];
</script>

<Accordion accordions={items} />
```

### Exclusive Mode Accordion

```svelte
<script lang="ts">
  import Accordion from '@ticatec/uniface-element/Accordion';
  import type { AccordionItem } from '@ticatec/uniface-element/Accordion';
  
  import DashboardPanel from './DashboardPanel.svelte';
  import AnalyticsPanel from './AnalyticsPanel.svelte';
  import SettingsPanel from './SettingsPanel.svelte';

  let dashboardItems: AccordionItem[] = [
    {
      title: 'Dashboard Overview',
      component: DashboardPanel,
      params: { view: 'overview' }
    },
    {
      title: 'Analytics',
      component: AnalyticsPanel,
      params: { period: '30d' }
    },
    {
      title: 'Settings',
      component: SettingsPanel
    }
  ];

  let activeItem: AccordionItem = dashboardItems[0];
</script>

<Accordion 
  accordions={dashboardItems} 
  exclusive={true}
  bind:activeItem
/>
```

### Compact Accordion

```svelte
<script lang="ts">
  import Accordion from '@ticatec/uniface-element/Accordion';
  import type { AccordionItem } from '@ticatec/uniface-element/Accordion';
  
  import QuickAction from './QuickAction.svelte';

  let quickActions: AccordionItem[] = [
    {
      title: 'Quick Actions',
      component: QuickAction,
      params: { actions: ['create', 'edit', 'delete'] }
    },
    {
      title: 'Recent Items',
      component: QuickAction,
      params: { type: 'recent', limit: 5 }
    },
    {
      title: 'Favorites',
      component: QuickAction,
      params: { type: 'favorites' }
    }
  ];
</script>

<Accordion 
  accordions={quickActions} 
  compact={true}
  class="sidebar-accordion"
  style="max-width: 300px;"
/>
```

### Dynamic Accordion with Real Components

```svelte
<script lang="ts">
  import Accordion from '@ticatec/uniface-element/Accordion';
  import type { AccordionItem } from '@ticatec/uniface-element/Accordion';
  
  // Import actual components
  import UserListComponent from './components/UserListComponent.svelte';
  import ProductCatalog from './components/ProductCatalog.svelte';
  import OrderHistory from './components/OrderHistory.svelte';
  import SystemLogs from './components/SystemLogs.svelte';

  let currentUser = { id: 1, role: 'admin' };
  
  let adminSections: AccordionItem[] = [
    {
      title: 'User Management',
      component: UserListComponent,
      params: { 
        editable: true,
        filters: ['active', 'pending'],
        currentUser: currentUser
      }
    },
    {
      title: 'Product Catalog',
      component: ProductCatalog,
      params: {
        mode: 'admin',
        showHidden: true,
        allowEdit: true
      }
    },
    {
      title: 'Order History',
      component: OrderHistory,
      params: {
        dateRange: '30d',
        status: 'all',
        exportEnabled: true
      }
    },
    {
      title: 'System Logs',
      component: SystemLogs,
      params: {
        level: 'info',
        realTime: true,
        maxLines: 1000
      }
    }
  ];

  // Handle dynamic updates
  function refreshAccordion() {
    adminSections = [...adminSections];
  }
</script>

<div class="admin-dashboard">
  <h2>Admin Dashboard</h2>
  
  <Accordion 
    accordions={adminSections}
    style="border: 1px solid #e0e0e0; border-radius: 8px;"
    class="admin-accordion"
  />
  
  <button on:click={refreshAccordion} class="refresh-btn">
    Refresh Data
  </button>
</div>

<style>
  .admin-dashboard {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .refresh-btn {
    margin-top: 20px;
    padding: 10px 20px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .refresh-btn:hover {
    background: #0056b3;
  }
  
  :global(.admin-accordion) {
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
</style>
```

### FAQ Accordion

```svelte
<script lang="ts">
  import Accordion from '@ticatec/uniface-element/Accordion';
  import type { AccordionItem } from '@ticatec/uniface-element/Accordion';
  
  // Create a simple FAQ content component
  const FAQContent = (content: string) => {
    return `<div class="faq-content">${content}</div>`;
  };

  let faqItems: AccordionItem[] = [
    {
      title: 'What is this platform?',
      component: FAQContent,
      params: 'Our platform is a comprehensive solution for managing your business operations, including user management, analytics, and reporting tools.'
    },
    {
      title: 'How do I get started?',
      component: FAQContent,
      params: 'Getting started is easy! Sign up for an account, complete your profile, and follow our step-by-step onboarding guide.'
    },
    {
      title: 'What are the pricing options?',
      component: FAQContent,
      params: 'We offer flexible pricing plans including a free tier, professional plan at $29/month, and enterprise solutions. Contact our sales team for custom pricing.'
    },
    {
      title: 'How can I contact support?',
      component: FAQContent,
      params: 'You can reach our support team 24/7 through the chat widget, email us at support@company.com, or call our hotline at 1-800-SUPPORT.'
    },
    {
      title: 'Is my data secure?',
      component: FAQContent,
      params: 'Absolutely! We use enterprise-grade encryption, regular security audits, and comply with GDPR, SOC 2, and other security standards.'
    }
  ];
</script>

<div class="faq-section">
  <h2>Frequently Asked Questions</h2>
  <p class="faq-subtitle">Find answers to common questions about our platform</p>
  
  <Accordion 
    accordions={faqItems}
    class="faq-accordion"
    style="margin-top: 30px;"
  />
</div>

<style>
  .faq-section {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 20px;
  }
  
  .faq-section h2 {
    text-align: center;
    color: #333;
    margin-bottom: 10px;
  }
  
  .faq-subtitle {
    text-align: center;
    color: #666;
    margin-bottom: 0;
  }
  
  :global(.faq-content) {
    padding: 16px;
    line-height: 1.6;
    color: #555;
  }
  
  :global(.faq-accordion .uniface-accordion-panel) {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    margin-bottom: 12px;
  }
</style>
```

### Nested Content Accordion

```svelte
<script lang="ts">
  import Accordion from '@ticatec/uniface-element/Accordion';
  import type { AccordionItem } from '@ticatec/uniface-element/Accordion';
  
  // Complex nested component example
  import ProjectDetails from './ProjectDetails.svelte';
  import TaskManager from './TaskManager.svelte';
  import TeamOverview from './TeamOverview.svelte';
  import FileManager from './FileManager.svelte';

  let projectId = 'proj-123';
  let projectData = {
    name: 'Website Redesign',
    status: 'active',
    deadline: '2024-06-30'
  };

  let projectSections: AccordionItem[] = [
    {
      title: `Project Details - ${projectData.name}`,
      component: ProjectDetails,
      params: {
        projectId,
        projectData,
        editable: true,
        showTimeline: true
      }
    },
    {
      title: 'Task Management',
      component: TaskManager,
      params: {
        projectId,
        view: 'kanban',
        allowAssignment: true,
        filters: ['all', 'assigned', 'completed']
      }
    },
    {
      title: 'Team & Collaboration',
      component: TeamOverview,
      params: {
        projectId,
        showActivity: true,
        allowInvite: true,
        roles: ['admin', 'member', 'viewer']
      }
    },
    {
      title: 'Files & Documents',
      component: FileManager,
      params: {
        projectId,
        allowUpload: true,
        maxFileSize: '10MB',
        allowedTypes: ['.pdf', '.doc', '.jpg', '.png']
      }
    }
  ];

  // Auto-select first item
  let activeSection = projectSections[0];
</script>

<div class="project-workspace">
  <div class="project-header">
    <h1>{projectData.name}</h1>
    <span class="status-badge status-{projectData.status}">
      {projectData.status.toUpperCase()}
    </span>
  </div>
  
  <Accordion 
    accordions={projectSections}
    exclusive={true}
    bind:activeItem={activeSection}
    class="project-accordion"
    style="margin-top: 20px;"
  />
</div>

<style>
  .project-workspace {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .project-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
  }
  
  .project-header h1 {
    margin: 0;
    color: #333;
  }
  
  .status-badge {
    padding: 4px 12px;
    border-radius: 16px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
  }
  
  .status-active {
    background: #d4edda;
    color: #155724;
  }
  
  :global(.project-accordion) {
    border: 1px solid #dee2e6;
    border-radius: 8px;
    overflow: hidden;
  }
</style>
```

## Styling

The Accordion component uses the following CSS classes:

```css
.uniface-accordion-panel {
  /* Main accordion container */
}

.uniface-accordion-panel.compact {
  /* Compact variant with reduced padding */
}

/* Individual accordion items are styled by the AccordionItemView component */
```

## Advanced Usage

### Programmatic Control

```svelte
<script lang="ts">
  import Accordion from '@ticatec/uniface-element/Accordion';
  import type { AccordionItem } from '@ticatec/uniface-element/Accordion';
  
  let accordionRef: Accordion;
  let items: AccordionItem[] = [...];
  let activeItem: AccordionItem;

  function openSpecificSection(index: number) {
    if (items[index]) {
      activeItem = items[index];
    }
  }

  function addNewSection() {
    const newItem: AccordionItem = {
      title: `New Section ${items.length + 1}`,
      component: SomeComponent,
      params: { id: Date.now() }
    };
    items = [...items, newItem];
  }

  function removeSection(index: number) {
    items = items.filter((_, i) => i !== index);
  }
</script>

<div class="controls">
  <button on:click={() => openSpecificSection(0)}>Open First</button>
  <button on:click={addNewSection}>Add Section</button>
</div>

<Accordion 
  bind:this={accordionRef}
  accordions={items}
  bind:activeItem
  exclusive={true}
/>
```

## API Reference

### Accordion Component Props

```typescript
interface AccordionProps {
  style?: string;                   // Custom CSS styles
  class?: string;                   // Additional CSS classes
  compact?: boolean;                // Use compact styling
  accordions: Array<AccordionItem>; // Accordion items array
  exclusive?: boolean;              // Only one open at a time
  activeItem?: AccordionItem;       // Currently active item
}
```

### AccordionItem Interface

```typescript
interface AccordionItem {
  /**
   * Display title for the accordion section
   */
  title: string;

  /**
   * Svelte component to render in accordion content
   */
  component: any;

  /**
   * Parameters/props to pass to the component
   */
  params?: any;
}
```

## Best Practices

1. **Meaningful Titles** - Use clear, descriptive titles that indicate what content the section contains
2. **Component Organization** - Keep accordion content components focused and self-contained
3. **Performance** - Consider lazy loading for heavy content components
4. **Exclusive Mode** - Use exclusive mode for navigation-style accordions, multi-open for content organization
5. **Responsive Design** - Ensure accordion content works well on mobile devices
6. **Loading States** - Handle loading states gracefully when accordion content requires data fetching
7. **Keyboard Navigation** - Ensure accordion sections are keyboard accessible
8. **Visual Hierarchy** - Use consistent styling to maintain visual hierarchy within accordion content

## Accessibility

The Accordion component follows accessibility best practices:

- Proper ARIA attributes for screen readers
- Keyboard navigation support
- Focus management when expanding/collapsing
- Semantic HTML structure

## Performance Considerations

- Components are only instantiated when their accordion section is opened
- Use the `params` prop to pass only necessary data to components
- Consider implementing lazy loading for data-heavy components
- Avoid deeply nested accordion structures for better performance