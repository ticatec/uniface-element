# ConciseDataTable 简洁数据表格组件

一个轻量级、功能丰富的数据表格组件，具有自动滚动功能、灵活的列配置和可定制样式，用于高效显示表格数据。

## 概述

ConciseDataTable 组件为以表格格式显示结构化数据提供了简化的解决方案。它具有大数据集的自动滚动功能、具有固定和比例宽度的灵活列定义、自定义数据格式化和全面的主题选项。非常适合仪表板、数据监控系统和需要连续数据显示的应用程序。

## 安装

```typescript
import ConciseDataTable from '@ticatec/uniface-element/ConciseDataTable';
import type { Column, TableOptions, RowClickHandler } from '@ticatec/uniface-element/ConciseDataTable';
```

## 基本用法

```svelte
<script lang="ts">
  import ConciseDataTable from '@ticatec/uniface-element/ConciseDataTable';
  import type { Column, TableOptions } from '@ticatec/uniface-element/ConciseDataTable';

  let data = [
    { id: 1, name: '张三', department: '工程部', salary: 75000, joinDate: '2023-01-15' },
    { id: 2, name: '李四', department: '市场部', salary: 68000, joinDate: '2023-02-20' },
    { id: 3, name: '王五', department: '销售部', salary: 72000, joinDate: '2023-03-10' }
  ];

  const columns: Column[] = [
    { title: '姓名', field: 'name', width: 150 },
    { title: '部门', field: 'department', width: 120 },
    { title: '薪资', field: 'salary', width: 100, align: 'right' },
    { title: '入职日期', field: 'joinDate', width: 120, align: 'center' }
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

## 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `list` | `Array<any>` | - | 要显示的数据对象数组 |
| `columns` | `Array<Column>` | - | 表格的列定义 |
| `autoScroll` | `boolean` | `false` | 启用自动滚动 |
| `scrollInterval` | `number` | `2000` | 滚动步骤之间的毫秒数 |
| `rowClickHandler` | `RowClickHandler \| null` | `null` | 行点击的处理函数 |
| `options` | `TableOptions` | `{}` | 表格样式和行为选项 |

## 类型定义

```typescript
/**
 * 列配置接口
 */
interface Column {
  title: string;                           // 列标题的显示文本
  field: string;                           // 数据对象中的字段名
  width: number;                           // 以像素为单位的宽度
  align?: "left" | "center" | "right";    // 文本对齐方式（默认: "left"）
  weight?: number;                         // 弹性权重（0 = 固定，>0 = 比例）
  formatter?: (value: any) => string;     // 自定义格式化函数
  escapeHTML?: boolean;                    // 允许 HTML 内容（默认: false）
}

/**
 * 表格样式和行为选项
 */
interface TableOptions {
  backgroundColor?: string;                // 表格背景色
  color?: string;                          // 表格文字颜色
  headerHeight?: number;                   // 标题行高度（默认: 36px）
  headerBackgroundColor?: string;          // 标题背景色
  headerColor?: string;                    // 标题文字颜色
  alternativeBackgroundColor?: string;     // 交替行背景色
  alternativeColor?: string;               // 交替行文字颜色
  rowHeight?: number;                      // 数据行高度（默认: 32px）
}

/**
 * 行点击处理函数
 */
type RowClickHandler = (row: any) => (event: MouseEvent) => void;
```

## 使用示例

### 自动滚动表格

```svelte
<script lang="ts">
  import ConciseDataTable from '@ticatec/uniface-element/ConciseDataTable';
  import type { Column, TableOptions } from '@ticatec/uniface-element/ConciseDataTable';

  // 监控用的实时数据示例
  let serverStats = [
    { server: 'Web-01', cpu: '45%', memory: '68%', disk: '32%', status: '在线' },
    { server: 'Web-02', cpu: '62%', memory: '71%', disk: '28%', status: '在线' },
    { server: 'DB-01', cpu: '78%', memory: '85%', disk: '65%', status: '警告' },
    { server: 'Cache-01', cpu: '23%', memory: '34%', disk: '12%', status: '在线' },
    { server: 'API-01', cpu: '56%', memory: '67%', disk: '45%', status: '在线' },
    { server: 'API-02', cpu: '89%', memory: '92%', disk: '78%', status: '严重' },
    { server: 'Load-01', cpu: '34%', memory: '45%', disk: '23%', status: '在线' },
    { server: 'Monitor-01', cpu: '12%', memory: '28%', disk: '15%', status: '在线' }
  ];

  const columns: Column[] = [
    {
      title: '服务器',
      field: 'server',
      width: 120,
      align: 'center'
    },
    {
      title: 'CPU使用率',
      field: 'cpu',
      width: 100,
      align: 'center'
    },
    {
      title: '内存',
      field: 'memory',
      width: 100,
      align: 'center'
    },
    {
      title: '磁盘',
      field: 'disk',
      width: 100,
      align: 'center'
    },
    {
      title: '状态',
      field: 'status',
      width: 120,
      align: 'center',
      formatter: (status) => {
        const colors = {
          '在线': '#10b981',
          '警告': '#f59e0b',
          '严重': '#ef4444'
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

  // 模拟数据更新
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
  <h2>服务器监控仪表板</h2>
  
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

### 带格式化器的金融数据表格

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
    { symbol: 'AAPL', company: '苹果公司', price: 182.52, change: 2.34, changePercent: 1.30, volume: 45678912, marketCap: 2847000000000 },
    { symbol: 'MSFT', company: '微软公司', price: 378.85, change: -1.23, changePercent: -0.32, volume: 23456789, marketCap: 2817000000000 },
    { symbol: 'GOOGL', company: '谷歌公司', price: 142.56, change: 0.87, changePercent: 0.61, volume: 34567890, marketCap: 1798000000000 },
    { symbol: 'AMZN', company: '亚马逊公司', price: 151.23, change: -2.45, changePercent: -1.59, volume: 56789012, marketCap: 1567000000000 }
  ];

  const columns: Column[] = [
    {
      title: '代码',
      field: 'symbol',
      width: 80,
      align: 'center'
    },
    {
      title: '公司',
      field: 'company',
      width: 200,
      weight: 1  // 此列将扩展以填充可用空间
    },
    {
      title: '价格',
      field: 'price',
      width: 100,
      align: 'right',
      formatter: (value) => `$${value.toFixed(2)}`
    },
    {
      title: '涨跌',
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
      title: '涨跌幅%',
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
      title: '成交量',
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
      title: '市值',
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
    console.log(`点击了 ${stock.symbol} - ${stock.company}`);
    alert(`股票详情：\n${stock.company} (${stock.symbol})\n价格: $${stock.price.toFixed(2)}`);
  };

  // 模拟实时价格更新
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
  <h2>股票价格跟踪器</h2>
  
  <ConciseDataTable 
    list={stockData} 
    {columns} 
    {options}
    rowClickHandler={handleRowClick}
  />
  
  <div class="disclaimer">
    <p><em>点击任意行查看股票详情。价格每2秒更新一次。</em></p>
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

### 带交互功能的员工目录

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
    status: '在职' | '请假' | '远程';
  }

  let employees: Employee[] = [
    { id: 1, name: '张三', email: 'zhangsan@company.com', department: '工程部', position: '高级开发工程师', salary: 95000, joinDate: '2022-01-15', status: '在职' },
    { id: 2, name: '李四', email: 'lisi@company.com', department: '市场部', position: '市场经理', salary: 78000, joinDate: '2021-11-20', status: '在职' },
    { id: 3, name: '王五', email: 'wangwu@company.com', department: '销售部', position: '销售代表', salary: 65000, joinDate: '2023-03-10', status: '远程' },
    { id: 4, name: '赵六', email: 'zhaoliu@company.com', department: '人事部', position: '人事专员', salary: 58000, joinDate: '2022-07-08', status: '请假' },
    { id: 5, name: '钱七', email: 'qianqi@company.com', department: '工程部', position: '技术主管', salary: 110000, joinDate: '2020-05-12', status: '在职' }
  ];

  const columns: Column[] = [
    {
      title: 'ID',
      field: 'id',
      width: 60,
      align: 'center'
    },
    {
      title: '姓名',
      field: 'name',
      width: 140,
      align: 'left'
    },
    {
      title: '邮箱',
      field: 'email',
      width: 200,
      weight: 1,
      formatter: (email) => `<a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>`,
      escapeHTML: true
    },
    {
      title: '部门',
      field: 'department',
      width: 120,
      align: 'center'
    },
    {
      title: '职位',
      field: 'position',
      width: 150,
      align: 'left'
    },
    {
      title: '薪资',
      field: 'salary',
      width: 100,
      align: 'right',
      formatter: (value) => `¥${value.toLocaleString()}`
    },
    {
      title: '入职日期',
      field: 'joinDate',
      width: 110,
      align: 'center',
      formatter: (date) => new Date(date).toLocaleDateString()
    },
    {
      title: '状态',
      field: 'status',
      width: 100,
      align: 'center',
      formatter: (status) => {
        const statusConfig = {
          '在职': { color: '#10b981', bg: '#ecfdf5' },
          '远程': { color: '#3b82f6', bg: '#eff6ff' },
          '请假': { color: '#f59e0b', bg: '#fffbeb' }
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
    console.log('点击了员工:', employee);
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
  <h2>员工目录</h2>
  <p class="subtitle">点击任意员工行查看详细信息</p>
  
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
        <h3>员工详情</h3>
        <button class="close-btn" on:click={closeModal}>&times;</button>
      </div>
      <div class="modal-content">
        <div class="employee-info">
          <div class="info-row">
            <span class="label">姓名：</span>
            <span class="value">{selectedEmployee.name}</span>
          </div>
          <div class="info-row">
            <span class="label">员工编号：</span>
            <span class="value">#{selectedEmployee.id.toString().padStart(4, '0')}</span>
          </div>
          <div class="info-row">
            <span class="label">邮箱：</span>
            <span class="value">{selectedEmployee.email}</span>
          </div>
          <div class="info-row">
            <span class="label">部门：</span>
            <span class="value">{selectedEmployee.department}</span>
          </div>
          <div class="info-row">
            <span class="label">职位：</span>
            <span class="value">{selectedEmployee.position}</span>
          </div>
          <div class="info-row">
            <span class="label">年薪：</span>
            <span class="value">¥{selectedEmployee.salary.toLocaleString()}</span>
          </div>
          <div class="info-row">
            <span class="label">入职日期：</span>
            <span class="value">{new Date(selectedEmployee.joinDate).toLocaleDateString()}</span>
          </div>
          <div class="info-row">
            <span class="label">状态：</span>
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
  
  .value.status-在职 {
    color: #10b981;
    font-weight: 500;
  }
  
  .value.status-远程 {
    color: #3b82f6;
    font-weight: 500;
  }
  
  .value.status-请假 {
    color: #f59e0b;
    font-weight: 500;
  }
</style>
```

## 样式

ConciseDataTable 组件使用以下 CSS 类和自定义属性：

```css
.uniface-concise-table {
  /* 主要表格容器 */
}

.concise-table-header {
  /* 标题行样式 */
}

.concise-table-row {
  /* 数据行样式 */
}

.concise-table-cell {
  /* 单个单元格样式 */
}

/* 主题化的 CSS 自定义属性 */
:root {
  --uniface-concise-table-primary-color: #374151;
  --uniface-concise-table-primary-background-color: #ffffff;
  --uniface-concise-table-header-background: #f8fafc;
  --uniface-concise-table-header-color: #374151;
  --uniface-concise-table-row-alter-bg: #f9fafb;
  --uniface-concise-table-row-alter-color: #374151;
}
```

## API 参考

### ConciseDataTable 组件属性

```typescript
interface ConciseDataTableProps {
  list: Array<any>;                        // 要显示的数据数组
  columns: Array<Column>;                  // 列定义
  autoScroll?: boolean;                    // 启用自动滚动
  scrollInterval?: number;                 // 滚动间隔（毫秒）
  rowClickHandler?: RowClickHandler;       // 行点击处理器
  options?: TableOptions;                  // 样式选项
}
```

## 最佳实践

1. **性能优化** - 对于大数据集，谨慎使用自动滚动以避免性能问题
2. **列设计** - 使用 `weight` 属性平衡固定宽度和弹性列
3. **数据格式化** - 使用格式化器实现一致的数据呈现（货币、日期、百分比）
4. **可访问性** - 确保足够的颜色对比度和有意义的行点击行为
5. **移动响应** - 对于包含多列的表格，考虑水平滚动
6. **错误处理** - 在传递给组件之前验证数据结构
7. **内存管理** - 对于自动滚动表格，监控大数据集的内存使用情况
8. **用户反馈** - 为可点击行等交互元素提供清晰的视觉反馈