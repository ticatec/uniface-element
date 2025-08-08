# ConciseDataTable Component

A lightweight, feature-rich data table component with auto-scrolling capabilities, flexible column configuration, and customizable styling for displaying tabular data efficiently.

## Overview

The ConciseDataTable component provides a streamlined solution for displaying structured data in a table format. It features automatic scrolling for large datasets, flexible column definitions with fixed and proportional widths, custom data formatting, and comprehensive theming options. Perfect for dashboards, data monitoring systems, and applications requiring continuous data display.

## Installation

```typescript
import ConciseDataTable from '@ticatec/uniface-element/ConciseDataTable';
import type { Column, TableOptions, RowClickHandler } from '@ticatec/uniface-element/ConciseDataTable';
```

## Basic Usage

```svelte
<script lang="ts">
  import ConciseDataTable from '@ticatec/uniface-element/ConciseDataTable';
  import type { Column, TableOptions } from '@ticatec/uniface-element/ConciseDataTable';

  let data = [
    { id: 1, name: 'John Doe', department: 'Engineering', salary: 75000, joinDate: '2023-01-15' },
    { id: 2, name: 'Jane Smith', department: 'Marketing', salary: 68000, joinDate: '2023-02-20' },
    { id: 3, name: 'Mike Johnson', department: 'Sales', salary: 72000, joinDate: '2023-03-10' }
  ];

  const columns: Column[] = [
    { title: 'Name', field: 'name', width: 150 },
    { title: 'Department', field: 'department', width: 120 },
    { title: 'Salary', field: 'salary', width: 100, align: 'right' },
    { title: 'Join Date', field: 'joinDate', width: 120, align: 'center' }
  ];

  const options: TableOptions = {
    headerHeight: 40,
    rowHeight: 35
  };
</script>

<ConciseDataTable 
  list={data} 
  {columns} 
  {options} 
/>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `list` | `Array<any>` | - | Array of data objects to display |
| `columns` | `Array<Column>` | - | Column definitions for the table |
| `autoScroll` | `boolean` | `false` | Enable automatic scrolling |
| `scrollInterval` | `number` | `2000` | Milliseconds between scroll steps |
| `rowClickHandler` | `RowClickHandler \| null` | `null` | Handler function for row clicks |
| `options` | `TableOptions` | `{}` | Table styling and behavior options |

## Type Definitions

```typescript
/**
 * Column configuration interface
 */
interface Column {
  title: string;                           // Display title for column header
  field: string;                           // Field name in data object
  width: number;                           // Width in pixels
  align?: "left" | "center" | "right";    // Text alignment (default: "left")
  weight?: number;                         // Flex weight (0 = fixed, >0 = proportional)
  formatter?: (value: any) => string;     // Custom formatter function
  escapeHTML?: boolean;                    // Allow HTML content (default: false)
}

/**
 * Table styling and behavior options
 */
interface TableOptions {
  backgroundColor?: string;                // Table background color
  color?: string;                          // Table text color
  headerHeight?: number;                   // Header row height (default: 36px)
  headerBackgroundColor?: string;          // Header background color
  headerColor?: string;                    // Header text color
  alternativeBackgroundColor?: string;     // Alternating row background color
  alternativeColor?: string;               // Alternating row text color
  rowHeight?: number;                      // Data row height (default: 32px)
}

/**
 * Row click handler function
 */
type RowClickHandler = (row: any) => (event: MouseEvent) => void;
```

## Usage Examples

### Auto-Scrolling Table

```svelte
<script lang="ts">
  import ConciseDataTable from '@ticatec/uniface-element/ConciseDataTable';
  import type { Column, TableOptions } from '@ticatec/uniface-element/ConciseDataTable';

  // Sample real-time data for monitoring
  let serverStats = [
    { server: 'Web-01', cpu: '45%', memory: '68%', disk: '32%', status: 'Online' },
    { server: 'Web-02', cpu: '62%', memory: '71%', disk: '28%', status: 'Online' },
    { server: 'DB-01', cpu: '78%', memory: '85%', disk: '65%', status: 'Warning' },
    { server: 'Cache-01', cpu: '23%', memory: '34%', disk: '12%', status: 'Online' },
    { server: 'API-01', cpu: '56%', memory: '67%', disk: '45%', status: 'Online' },
    { server: 'API-02', cpu: '89%', memory: '92%', disk: '78%', status: 'Critical' },
    { server: 'Load-01', cpu: '34%', memory: '45%', disk: '23%', status: 'Online' },
    { server: 'Monitor-01', cpu: '12%', memory: '28%', disk: '15%', status: 'Online' }
  ];

  const columns: Column[] = [
    {
      title: 'Server',
      field: 'server',
      width: 120,
      align: 'center'
    },
    {
      title: 'CPU Usage',
      field: 'cpu',
      width: 100,
      align: 'center'
    },
    {
      title: 'Memory',
      field: 'memory',
      width: 100,
      align: 'center'
    },
    {
      title: 'Disk',
      field: 'disk',
      width: 100,
      align: 'center'
    },
    {
      title: 'Status',
      field: 'status',
      width: 120,
      align: 'center',
      formatter: (status) => {
        const colors = {
          'Online': '#10b981',
          'Warning': '#f59e0b',
          'Critical': '#ef4444'
        };
        return `<span style="color: ${colors[status] || '#6b7280'}; font-weight: 500;">${status}</span>`;
      },
      escapeHTML: true
    }
  ];

  const options: TableOptions = {
    headerHeight: 40,
    rowHeight: 36,
    headerBackgroundColor: '#1f2937',
    headerColor: '#f9fafb',
    backgroundColor: '#ffffff',
    alternativeBackgroundColor: '#f8fafc'
  };

  // Simulate data updates
  setInterval(() => {
    serverStats = serverStats.map(server => ({
      ...server,
      cpu: Math.floor(Math.random() * 100) + '%',
      memory: Math.floor(Math.random() * 100) + '%',
      disk: Math.floor(Math.random() * 100) + '%'
    }));
  }, 3000);
</script>

<div class="monitoring-dashboard">
  <h2>Server Monitoring Dashboard</h2>
  
  <ConciseDataTable 
    list={serverStats} 
    {columns} 
    {options}
    autoScroll={true}
    scrollInterval={4000}
  />
</div>

<style>
  .monitoring-dashboard {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
  }
  
  h2 {
    color: #1f2937;
    margin-bottom: 20px;
    text-align: center;
  }
</style>
```

### Financial Data Table with Formatters

```svelte
<script lang="ts">
  import ConciseDataTable from '@ticatec/uniface-element/ConciseDataTable';
  import type { Column, TableOptions, RowClickHandler } from '@ticatec/uniface-element/ConciseDataTable';

  interface StockData {
    symbol: string;
    company: string;
    price: number;
    change: number;
    changePercent: number;
    volume: number;
    marketCap: number;
  }

  let stockData: StockData[] = [
    { symbol: 'AAPL', company: 'Apple Inc.', price: 182.52, change: 2.34, changePercent: 1.30, volume: 45678912, marketCap: 2847000000000 },
    { symbol: 'MSFT', company: 'Microsoft Corp.', price: 378.85, change: -1.23, changePercent: -0.32, volume: 23456789, marketCap: 2817000000000 },
    { symbol: 'GOOGL', company: 'Alphabet Inc.', price: 142.56, change: 0.87, changePercent: 0.61, volume: 34567890, marketCap: 1798000000000 },
    { symbol: 'AMZN', company: 'Amazon.com Inc.', price: 151.23, change: -2.45, changePercent: -1.59, volume: 56789012, marketCap: 1567000000000 }
  ];

  const columns: Column[] = [
    {
      title: 'Symbol',
      field: 'symbol',
      width: 80,
      align: 'center'
    },
    {
      title: 'Company',
      field: 'company',
      width: 200,
      weight: 1  // This column will expand to fill available space
    },
    {
      title: 'Price',
      field: 'price',
      width: 100,
      align: 'right',
      formatter: (value) => `$${value.toFixed(2)}`
    },
    {
      title: 'Change',
      field: 'change',
      width: 100,
      align: 'right',
      formatter: (value) => {
        const sign = value >= 0 ? '+' : '';
        const color = value >= 0 ? '#10b981' : '#ef4444';
        return `<span style="color: ${color}; font-weight: 500;">${sign}${value.toFixed(2)}</span>`;
      },
      escapeHTML: true
    },
    {
      title: 'Change %',
      field: 'changePercent',
      width: 100,
      align: 'right',
      formatter: (value) => {
        const sign = value >= 0 ? '+' : '';
        const color = value >= 0 ? '#10b981' : '#ef4444';
        return `<span style="color: ${color}; font-weight: 500;">${sign}${value.toFixed(2)}%</span>`;
      },
      escapeHTML: true
    },
    {
      title: 'Volume',
      field: 'volume',
      width: 120,
      align: 'right',
      formatter: (value) => {
        if (value >= 1000000) {
          return `${(value / 1000000).toFixed(1)}M`;
        } else if (value >= 1000) {
          return `${(value / 1000).toFixed(1)}K`;
        }
        return value.toString();
      }
    },
    {
      title: 'Market Cap',
      field: 'marketCap',
      width: 120,
      align: 'right',
      formatter: (value) => {
        if (value >= 1000000000000) {
          return `$${(value / 1000000000000).toFixed(2)}T`;
        } else if (value >= 1000000000) {
          return `$${(value / 1000000000).toFixed(2)}B`;
        }
        return `$${(value / 1000000).toFixed(2)}M`;
      }
    }
  ];

  const options: TableOptions = {
    headerHeight: 45,
    rowHeight: 40,
    headerBackgroundColor: '#0f172a',
    headerColor: '#f1f5f9',
    backgroundColor: '#ffffff',
    alternativeBackgroundColor: '#f8fafc',
    color: '#334155'
  };

  const handleRowClick: RowClickHandler = (stock) => (event) => {
    console.log(`Clicked on ${stock.symbol} - ${stock.company}`);
    // Could open detailed view, navigate to stock page, etc.
    alert(`Stock Details:\n${stock.company} (${stock.symbol})\nPrice: $${stock.price.toFixed(2)}`);
  };

  // Simulate real-time price updates
  setInterval(() => {
    stockData = stockData.map(stock => ({
      ...stock,
      price: stock.price + (Math.random() - 0.5) * 5,
      change: (Math.random() - 0.5) * 4,
      changePercent: (Math.random() - 0.5) * 3,
      volume: Math.floor(Math.random() * 100000000)
    }));
  }, 2000);
</script>

<div class="stock-tracker">
  <h2>Stock Price Tracker</h2>
  
  <ConciseDataTable 
    list={stockData} 
    {columns} 
    {options}
    rowClickHandler={handleRowClick}
  />
  
  <div class="disclaimer">
    <p><em>Click on any row to view stock details. Prices update every 2 seconds.</em></p>
  </div>
</div>

<style>
  .stock-tracker {
    padding: 20px;
    max-width: 1000px;
    margin: 0 auto;
  }
  
  h2 {
    color: #0f172a;
    margin-bottom: 20px;
    text-align: center;
    font-size: 1.8rem;
  }
  
  .disclaimer {
    margin-top: 16px;
    text-align: center;
    color: #64748b;
    font-size: 0.875rem;
  }
</style>
```

### Employee Directory with Interactive Features

```svelte
<script lang="ts">
  import ConciseDataTable from '@ticatec/uniface-element/ConciseDataTable';
  import type { Column, TableOptions, RowClickHandler } from '@ticatec/uniface-element/ConciseDataTable';

  interface Employee {
    id: number;
    name: string;
    email: string;
    department: string;
    position: string;
    salary: number;
    joinDate: string;
    status: 'Active' | 'On Leave' | 'Remote';
  }

  let employees: Employee[] = [
    { id: 1, name: 'John Doe', email: 'john.doe@company.com', department: 'Engineering', position: 'Senior Developer', salary: 95000, joinDate: '2022-01-15', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@company.com', department: 'Marketing', position: 'Marketing Manager', salary: 78000, joinDate: '2021-11-20', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike.johnson@company.com', department: 'Sales', position: 'Sales Representative', salary: 65000, joinDate: '2023-03-10', status: 'Remote' },
    { id: 4, name: 'Sarah Williams', email: 'sarah.williams@company.com', department: 'HR', position: 'HR Specialist', salary: 58000, joinDate: '2022-07-08', status: 'On Leave' },
    { id: 5, name: 'David Brown', email: 'david.brown@company.com', department: 'Engineering', position: 'Tech Lead', salary: 110000, joinDate: '2020-05-12', status: 'Active' }
  ];

  const columns: Column[] = [
    {
      title: 'ID',
      field: 'id',
      width: 60,
      align: 'center'
    },
    {
      title: 'Name',
      field: 'name',
      width: 140,
      align: 'left'
    },
    {
      title: 'Email',
      field: 'email',
      width: 200,
      weight: 1,
      formatter: (email) => `<a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>`,
      escapeHTML: true
    },
    {
      title: 'Department',
      field: 'department',
      width: 120,
      align: 'center'
    },
    {
      title: 'Position',
      field: 'position',
      width: 150,
      align: 'left'
    },
    {
      title: 'Salary',
      field: 'salary',
      width: 100,
      align: 'right',
      formatter: (value) => `$${value.toLocaleString()}`
    },
    {
      title: 'Join Date',
      field: 'joinDate',
      width: 110,
      align: 'center',
      formatter: (date) => new Date(date).toLocaleDateString()
    },
    {
      title: 'Status',
      field: 'status',
      width: 100,
      align: 'center',
      formatter: (status) => {
        const statusConfig = {
          'Active': { color: '#10b981', bg: '#ecfdf5' },
          'Remote': { color: '#3b82f6', bg: '#eff6ff' },
          'On Leave': { color: '#f59e0b', bg: '#fffbeb' }
        };
        const config = statusConfig[status] || { color: '#6b7280', bg: '#f9fafb' };
        return `<span style="background: ${config.bg}; color: ${config.color}; padding: 4px 8px; border-radius: 12px; font-size: 0.75rem; font-weight: 500;">${status}</span>`;
      },
      escapeHTML: true
    }
  ];

  const options: TableOptions = {
    headerHeight: 48,
    rowHeight: 44,
    headerBackgroundColor: '#f8fafc',
    headerColor: '#374151',
    backgroundColor: '#ffffff',
    alternativeBackgroundColor: '#f9fafb',
    color: '#374151'
  };

  const handleEmployeeClick: RowClickHandler = (employee) => (event) => {
    console.log('Employee clicked:', employee);
    showEmployeeDetails(employee);
  };

  let selectedEmployee: Employee | null = null;
  let showModal = false;

  function showEmployeeDetails(employee: Employee) {
    selectedEmployee = employee;
    showModal = true;
  }

  function closeModal() {
    showModal = false;
    selectedEmployee = null;
  }
</script>

<div class="employee-directory">
  <h2>Employee Directory</h2>
  <p class="subtitle">Click on any employee row to view detailed information</p>
  
  <ConciseDataTable 
    list={employees} 
    {columns} 
    {options}
    rowClickHandler={handleEmployeeClick}
  />
</div>

{#if showModal && selectedEmployee}
  <div class="modal-overlay" on:click={closeModal}>
    <div class="modal" on:click|stopPropagation>
      <div class="modal-header">
        <h3>Employee Details</h3>
        <button class="close-btn" on:click={closeModal}>&times;</button>
      </div>
      <div class="modal-content">
        <div class="employee-info">
          <div class="info-row">
            <span class="label">Full Name:</span>
            <span class="value">{selectedEmployee.name}</span>
          </div>
          <div class="info-row">
            <span class="label">Employee ID:</span>
            <span class="value">#{selectedEmployee.id.toString().padStart(4, '0')}</span>
          </div>
          <div class="info-row">
            <span class="label">Email:</span>
            <span class="value">{selectedEmployee.email}</span>
          </div>
          <div class="info-row">
            <span class="label">Department:</span>
            <span class="value">{selectedEmployee.department}</span>
          </div>
          <div class="info-row">
            <span class="label">Position:</span>
            <span class="value">{selectedEmployee.position}</span>
          </div>
          <div class="info-row">
            <span class="label">Annual Salary:</span>
            <span class="value">${selectedEmployee.salary.toLocaleString()}</span>
          </div>
          <div class="info-row">
            <span class="label">Join Date:</span>
            <span class="value">{new Date(selectedEmployee.joinDate).toLocaleDateString()}</span>
          </div>
          <div class="info-row">
            <span class="label">Status:</span>
            <span class="value status-{selectedEmployee.status.toLowerCase().replace(' ', '-')}">{selectedEmployee.status}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .employee-directory {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  h2 {
    color: #111827;
    margin-bottom: 8px;
    text-align: center;
    font-size: 2rem;
  }
  
  .subtitle {
    color: #6b7280;
    text-align: center;
    margin-bottom: 24px;
    font-style: italic;
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .modal {
    background: white;
    border-radius: 12px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow: hidden;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .modal-header h3 {
    margin: 0;
    color: #1f2937;
    font-size: 1.25rem;
  }
  
  .close-btn {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #6b7280;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.2s;
  }
  
  .close-btn:hover {
    background: #e5e7eb;
    color: #374151;
  }
  
  .modal-content {
    padding: 24px;
  }
  
  .employee-info {
    display: grid;
    gap: 16px;
  }
  
  .info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #f3f4f6;
  }
  
  .info-row:last-child {
    border-bottom: none;
  }
  
  .label {
    font-weight: 500;
    color: #374151;
  }
  
  .value {
    color: #111827;
  }
  
  .value.status-active {
    color: #10b981;
    font-weight: 500;
  }
  
  .value.status-remote {
    color: #3b82f6;
    font-weight: 500;
  }
  
  .value.status-on-leave {
    color: #f59e0b;
    font-weight: 500;
  }
</style>
```

## Styling

The ConciseDataTable component uses the following CSS classes and custom properties:

```css
.uniface-concise-table {
  /* Main table container */
}

.concise-table-header {
  /* Header row styling */
}

.concise-table-row {
  /* Data row styling */
}

.concise-table-cell {
  /* Individual cell styling */
}

/* CSS Custom Properties for Theming */
:root {
  --uniface-concise-table-primary-color: #374151;
  --uniface-concise-table-primary-background-color: #ffffff;
  --uniface-concise-table-header-background: #f8fafc;
  --uniface-concise-table-header-color: #374151;
  --uniface-concise-table-row-alter-bg: #f9fafb;
  --uniface-concise-table-row-alter-color: #374151;
}
```

## API Reference

### ConciseDataTable Component Props

```typescript
interface ConciseDataTableProps {
  list: Array<any>;                        // Data array to display
  columns: Array<Column>;                  // Column definitions
  autoScroll?: boolean;                    // Enable auto-scrolling
  scrollInterval?: number;                 // Scroll interval in ms
  rowClickHandler?: RowClickHandler;       // Row click handler
  options?: TableOptions;                  // Styling options
}
```

## Best Practices

1. **Performance** - Use auto-scroll judiciously for large datasets to avoid performance issues
2. **Column Design** - Balance fixed-width and flexible columns using the `weight` property
3. **Data Formatting** - Use formatters for consistent data presentation (currency, dates, percentages)
4. **Accessibility** - Ensure adequate color contrast and meaningful row click behaviors
5. **Mobile Responsiveness** - Consider horizontal scrolling for tables with many columns
6. **Error Handling** - Validate data structure before passing to the component
7. **Memory Management** - For auto-scrolling tables, monitor memory usage with large datasets
8. **User Feedback** - Provide clear visual feedback for interactive elements like clickable rows