# DateRange 日期范围组件

一个日期范围选择器组件，允许用户通过直观的双日历界面选择起始和结束日期，通常用于按日期周期过滤数据，如报告范围、预订周期或事件计划。

## 概述

DateRange 组件通过双日历显示、灵活的日期格式化和强大的验证功能提供全面的日期选择体验。它具有只读输入字段，打开带有并排日历的弹出框，便于范围选择。该组件支持各种日期格式、最小/最大日期约束，并与表单验证系统无缝集成。

## 安装

```typescript
import DateRange from '@ticatec/uniface-element/DateRange';
import type { UniDate } from '@ticatec/uniface-element/DateRange';
```

## 基本用法

```svelte
<script lang="ts">
  import DateRange from '@ticatec/uniface-element/DateRange';
  import type { UniDate } from '@ticatec/uniface-element/DateRange';

  let fromDate: UniDate = null;
  let toDate: UniDate = null;
</script>

<DateRange 
  bind:fromValue={fromDate} 
  bind:toValue={toDate} 
  variant="outlined"
/>
```

## 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | 视觉样式变体 |
| `compact` | `boolean` | `false` | 启用紧凑布局以适应密集表单 |
| `class` | `string` | `''` | 额外的 CSS 类名 |
| `style` | `string` | `''` | 自定义内联样式 |
| `fromValue` | `UniDate` | `null` | 起始日期（可绑定） |
| `toValue` | `UniDate` | `null` | 结束日期（可绑定） |
| `format` | `string` | `"YYYY-MM-DD"` | 日期显示格式（dayjs 格式） |
| `min` | `string \| Date \| null` | `null` | 最小可选日期 |
| `max` | `string \| Date \| null` | `null` | 最大可选日期 |

## 类型定义

```typescript
/**
 * 支持多种格式的灵活日期类型
 */
type UniDate = dayjs.Dayjs | Date | string | null;
```

## 功能特性

- **双日历界面**：并排日历视图用于直观的范围选择
- **灵活的日期类型**：支持 Date 对象、字符串和 dayjs 实例
- **自定义格式化**：使用 dayjs 模式的可配置日期显示格式
- **范围验证**：自动验证确保起始日期 ≤ 结束日期
- **最小/最大约束**：可选的日期边界来限制选择
- **弹出日历**：带集成日期选择器的清洁日历弹出框
- **清除功能**：选择日期时的内置清除操作
- **只读输入**：防止手动输入以保持一致的日期格式

## 使用示例

### 报告日期范围选择器

```svelte
<script lang="ts">
  import DateRange from '@ticatec/uniface-element/DateRange';
  import type { UniDate } from '@ticatec/uniface-element/DateRange';
  import dayjs from 'dayjs';

  let reportFrom: UniDate = dayjs().subtract(30, 'day');
  let reportTo: UniDate = dayjs();

  // 演示用销售数据
  let salesData = [
    { date: '2024-03-01', sales: 12500, orders: 45 },
    { date: '2024-03-02', sales: 8900, orders: 32 },
    { date: '2024-03-03', sales: 15600, orders: 58 },
    { date: '2024-03-04', sales: 11200, orders: 41 },
    { date: '2024-03-05', sales: 9800, orders: 35 }
  ];

  let filteredData = [];
  let totalSales = 0;
  let totalOrders = 0;

  // 基于选定日期范围过滤数据
  function filterSalesData() {
    if (!reportFrom || !reportTo) {
      filteredData = salesData;
    } else {
      const fromDate = dayjs(reportFrom);
      const toDate = dayjs(reportTo);
      
      filteredData = salesData.filter(item => {
        const itemDate = dayjs(item.date);
        return itemDate.isBetween(fromDate, toDate, 'day', '[]');
      });
    }

    // 计算总计
    totalSales = filteredData.reduce((sum, item) => sum + item.sales, 0);
    totalOrders = filteredData.reduce((sum, item) => sum + item.orders, 0);
  }

  // 响应式过滤
  $: {
    reportFrom, reportTo;
    filterSalesData();
  }

  // 快速日期范围预设
  function setDateRange(days: number) {
    reportFrom = dayjs().subtract(days, 'day');
    reportTo = dayjs();
  }

  function setThisMonth() {
    reportFrom = dayjs().startOf('month');
    reportTo = dayjs().endOf('month');
  }

  function setLastMonth() {
    reportFrom = dayjs().subtract(1, 'month').startOf('month');
    reportTo = dayjs().subtract(1, 'month').endOf('month');
  }
</script>

<div class="sales-report">
  <header class="report-header">
    <h2>销售报告仪表板</h2>
    <p>选择日期范围以查看销售分析</p>
  </header>

  <div class="date-controls">
    <div class="date-range-section">
      <label>报告周期：</label>
      <DateRange
        bind:fromValue={reportFrom}
        bind:toValue={reportTo}
        variant="outlined"
        format="YYYY年MM月DD日"
        style="width: 320px;"
      />
    </div>

    <div class="quick-presets">
      <label>快速预设：</label>
      <div class="preset-buttons">
        <button class="preset-btn" on:click={() => setDateRange(7)}>最近7天</button>
        <button class="preset-btn" on:click={() => setDateRange(30)}>最近30天</button>
        <button class="preset-btn" on:click={setThisMonth}>本月</button>
        <button class="preset-btn" on:click={setLastMonth}>上月</button>
      </div>
    </div>
  </div>

  <div class="report-summary">
    <div class="summary-card">
      <h3>总销售额</h3>
      <div class="metric-value">¥{totalSales.toLocaleString()}</div>
    </div>
    <div class="summary-card">
      <h3>总订单数</h3>
      <div class="metric-value">{totalOrders}</div>
    </div>
    <div class="summary-card">
      <h3>平均订单</h3>
      <div class="metric-value">
        ¥{totalOrders > 0 ? (totalSales / totalOrders).toFixed(2) : '0.00'}
      </div>
    </div>
  </div>

  <div class="data-table">
    <h3>每日明细 ({filteredData.length} 天)</h3>
    {#if filteredData.length > 0}
      <table>
        <thead>
          <tr>
            <th>日期</th>
            <th>销售额</th>
            <th>订单数</th>
            <th>平均订单</th>
          </tr>
        </thead>
        <tbody>
          {#each filteredData as item}
            <tr>
              <td>{dayjs(item.date).format('YYYY年MM月DD日')}</td>
              <td>¥{item.sales.toLocaleString()}</td>
              <td>{item.orders}</td>
              <td>¥{(item.sales / item.orders).toFixed(2)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    {:else}
      <div class="no-data">
        <p>所选日期范围内没有销售数据。</p>
      </div>
    {/if}
  </div>
</div>

<style>
  .sales-report {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
  }

  .report-header {
    text-align: center;
    margin-bottom: 30px;
  }

  .report-header h2 {
    color: #333;
    margin: 0 0 8px 0;
  }

  .report-header p {
    color: #666;
    margin: 0;
  }

  .date-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    align-items: flex-end;
    margin-bottom: 30px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
  }

  .date-range-section,
  .quick-presets {
    flex: 1;
    min-width: 280px;
  }

  .date-range-section label,
  .quick-presets label {
    display: block;
    font-weight: 500;
    margin-bottom: 8px;
    color: #333;
  }

  .preset-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .preset-btn {
    padding: 6px 12px;
    background: #e9ecef;
    border: 1px solid #ced4da;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.2s;
  }

  .preset-btn:hover {
    background: #007bff;
    color: white;
    border-color: #007bff;
  }

  .report-summary {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }

  .summary-card {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    text-align: center;
  }

  .summary-card h3 {
    margin: 0 0 12px 0;
    color: #666;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .metric-value {
    font-size: 2rem;
    font-weight: 700;
    color: #007bff;
  }

  .data-table {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    overflow: hidden;
  }

  .data-table h3 {
    margin: 0;
    padding: 20px;
    background: #f8f9fa;
    border-bottom: 1px solid #dee2e6;
    color: #333;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    text-align: left;
    padding: 12px 20px;
    border-bottom: 1px solid #dee2e6;
  }

  th {
    font-weight: 600;
    color: #333;
    background: #f8f9fa;
  }

  .no-data {
    padding: 60px 20px;
    text-align: center;
    color: #666;
  }

  @media (max-width: 768px) {
    .date-controls {
      flex-direction: column;
      align-items: stretch;
    }
    
    .preset-buttons {
      justify-content: center;
    }
    
    .report-summary {
      grid-template-columns: 1fr;
    }
    
    table {
      font-size: 0.875rem;
    }
  }
</style>
```

### 活动预订日期范围

```svelte
<script lang="ts">
  import DateRange from '@ticatec/uniface-element/DateRange';
  import type { UniDate } from '@ticatec/uniface-element/DateRange';
  import dayjs from 'dayjs';

  let checkInDate: UniDate = null;
  let checkOutDate: UniDate = null;

  // 酒店预订数据
  let availableRooms = [
    { id: 1, type: '标准房', price: 120, available: true },
    { id: 2, type: '豪华房', price: 180, available: true },
    { id: 3, type: '套房', price: 320, available: false },
    { id: 4, type: '行政房', price: 220, available: true }
  ];

  let selectedRoom = null;
  let totalNights = 0;
  let totalCost = 0;

  // 计算住宿时长和费用
  function calculateStay() {
    if (checkInDate && checkOutDate) {
      const checkin = dayjs(checkInDate);
      const checkout = dayjs(checkOutDate);
      totalNights = checkout.diff(checkin, 'day');
      
      if (selectedRoom) {
        totalCost = totalNights * selectedRoom.price;
      }
    } else {
      totalNights = 0;
      totalCost = 0;
    }
  }

  // 响应式计算
  $: {
    checkInDate, checkOutDate, selectedRoom;
    calculateStay();
  }

  function selectRoom(room) {
    selectedRoom = room;
  }

  function bookRoom() {
    if (selectedRoom && checkInDate && checkOutDate) {
      alert(`预订确认！\n房型：${selectedRoom.type}\n入住：${dayjs(checkInDate).format('YYYY年MM月DD日')}\n退房：${dayjs(checkOutDate).format('YYYY年MM月DD日')}\n总计：¥${totalCost}`);
    }
  }
</script>

<div class="booking-system">
  <header class="booking-header">
    <h2>酒店客房预订</h2>
    <p>选择您的住宿日期并选择房间</p>
  </header>

  <div class="booking-form">
    <div class="date-selection">
      <h3>选择您的住宿日期</h3>
      <DateRange
        bind:fromValue={checkInDate}
        bind:toValue={checkOutDate}
        variant="outlined"
        format="YYYY年MM月DD日"
        min={dayjs().format('YYYY-MM-DD')}
        max={dayjs().add(1, 'year').format('YYYY-MM-DD')}
        style="width: 350px;"
      />
      
      {#if totalNights > 0}
        <div class="stay-info">
          <p><strong>{totalNights}</strong> 晚住宿</p>
          <p>入住：{dayjs(checkInDate).format('YYYY年MM月DD日 dddd')}</p>
          <p>退房：{dayjs(checkOutDate).format('YYYY年MM月DD日 dddd')}</p>
        </div>
      {/if}
    </div>

    {#if checkInDate && checkOutDate && totalNights > 0}
      <div class="room-selection">
        <h3>可用房间</h3>
        <div class="rooms-grid">
          {#each availableRooms as room}
            <div 
              class="room-card" 
              class:selected={selectedRoom?.id === room.id}
              class:unavailable={!room.available}
              on:click={() => room.available && selectRoom(room)}
            >
              <div class="room-type">{room.type}</div>
              <div class="room-price">¥{room.price}/晚</div>
              <div class="room-total">
                {#if room.available}
                  总计：¥{room.price * totalNights}（{totalNights}晚）
                {:else}
                  <span class="unavailable-text">暂不可用</span>
                {/if}
              </div>
              {#if selectedRoom?.id === room.id}
                <div class="selected-indicator">✓ 已选择</div>
              {/if}
            </div>
          {/each}
        </div>
      </div>

      {#if selectedRoom}
        <div class="booking-summary">
          <h3>预订摘要</h3>
          <div class="summary-details">
            <div class="detail-row">
              <span>房型：</span>
              <span>{selectedRoom.type}</span>
            </div>
            <div class="detail-row">
              <span>入住日期：</span>
              <span>{dayjs(checkInDate).format('YYYY年MM月DD日')}</span>
            </div>
            <div class="detail-row">
              <span>退房日期：</span>
              <span>{dayjs(checkOutDate).format('YYYY年MM月DD日')}</span>
            </div>
            <div class="detail-row">
              <span>住宿晚数：</span>
              <span>{totalNights}</span>
            </div>
            <div class="detail-row">
              <span>每晚价格：</span>
              <span>¥{selectedRoom.price}</span>
            </div>
            <div class="detail-row total">
              <span>总费用：</span>
              <span>¥{totalCost}</span>
            </div>
          </div>
          
          <button class="book-btn" on:click={bookRoom}>
            预订房间 - ¥{totalCost}
          </button>
        </div>
      {/if}
    {/if}
  </div>
</div>

<style>
  .booking-system {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }

  .booking-header {
    text-align: center;
    margin-bottom: 30px;
  }

  .booking-header h2 {
    color: #333;
    margin: 0 0 8px 0;
  }

  .booking-header p {
    color: #666;
    margin: 0;
  }

  .booking-form {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .date-selection {
    background: white;
    padding: 25px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .date-selection h3 {
    margin: 0 0 20px 0;
    color: #333;
  }

  .stay-info {
    margin-top: 20px;
    padding: 16px;
    background: #e3f2fd;
    border-radius: 6px;
  }

  .stay-info p {
    margin: 4px 0;
    color: #1976d2;
  }

  .room-selection {
    background: white;
    padding: 25px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .room-selection h3 {
    margin: 0 0 20px 0;
    color: #333;
  }

  .rooms-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
  }

  .room-card {
    padding: 20px;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
  }

  .room-card:hover:not(.unavailable) {
    border-color: #007bff;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,123,255,0.15);
  }

  .room-card.selected {
    border-color: #007bff;
    background: #f0f8ff;
  }

  .room-card.unavailable {
    opacity: 0.5;
    cursor: not-allowed;
    background: #f8f9fa;
  }

  .room-type {
    font-size: 1.2rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
  }

  .room-price {
    font-size: 1.1rem;
    font-weight: 500;
    color: #007bff;
    margin-bottom: 8px;
  }

  .room-total {
    font-size: 0.9rem;
    color: #666;
  }

  .unavailable-text {
    color: #dc3545;
    font-weight: 500;
  }

  .selected-indicator {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #28a745;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .booking-summary {
    background: white;
    padding: 25px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .booking-summary h3 {
    margin: 0 0 20px 0;
    color: #333;
  }

  .summary-details {
    margin-bottom: 20px;
  }

  .detail-row {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #f0f0f0;
  }

  .detail-row.total {
    font-weight: 600;
    font-size: 1.1rem;
    color: #333;
    border-bottom: 2px solid #007bff;
    margin-top: 10px;
  }

  .book-btn {
    width: 100%;
    padding: 12px 24px;
    background: #28a745;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .book-btn:hover {
    background: #218838;
  }

  @media (max-width: 768px) {
    .rooms-grid {
      grid-template-columns: 1fr;
    }
    
    .detail-row {
      font-size: 0.9rem;
    }
  }
</style>
```

### 高级搜索过滤器

```svelte
<script lang="ts">
  import DateRange from '@ticatec/uniface-element/DateRange';
  import type { UniDate } from '@ticatec/uniface-element/DateRange';
  import dayjs from 'dayjs';

  // 搜索条件
  let createdFrom: UniDate = null;
  let createdTo: UniDate = null;
  let modifiedFrom: UniDate = null;
  let modifiedTo: UniDate = null;

  // 模拟文档数据
  let allDocuments = [
    { id: 1, title: '项目提案', type: '文档', created: '2024-02-15', modified: '2024-03-01', status: '草稿' },
    { id: 2, title: '预算报告', type: '电子表格', created: '2024-02-20', modified: '2024-02-28', status: '最终版' },
    { id: 3, title: '会议纪要', type: '文档', created: '2024-03-01', modified: '2024-03-05', status: '草稿' },
    { id: 4, title: '合同模板', type: '模板', created: '2024-01-10', modified: '2024-02-15', status: '最终版' },
    { id: 5, title: '营销计划', type: '演示文稿', created: '2024-03-05', modified: '2024-03-10', status: '审核中' }
  ];

  let filteredDocuments = [];

  // 基于日期范围过滤文档
  function filterDocuments() {
    filteredDocuments = allDocuments.filter(doc => {
      let matchesCreated = true;
      let matchesModified = true;

      // 检查创建日期范围
      if (createdFrom || createdTo) {
        const createdDate = dayjs(doc.created);
        if (createdFrom && createdDate.isBefore(dayjs(createdFrom))) {
          matchesCreated = false;
        }
        if (createdTo && createdDate.isAfter(dayjs(createdTo))) {
          matchesCreated = false;
        }
      }

      // 检查修改日期范围
      if (modifiedFrom || modifiedTo) {
        const modifiedDate = dayjs(doc.modified);
        if (modifiedFrom && modifiedDate.isBefore(dayjs(modifiedFrom))) {
          matchesModified = false;
        }
        if (modifiedTo && modifiedDate.isAfter(dayjs(modifiedTo))) {
          matchesModified = false;
        }
      }

      return matchesCreated && matchesModified;
    });
  }

  // 响应式过滤
  $: {
    createdFrom, createdTo, modifiedFrom, modifiedTo;
    filterDocuments();
  }

  function clearAllFilters() {
    createdFrom = null;
    createdTo = null;
    modifiedFrom = null;
    modifiedTo = null;
  }

  function setRecentFilter() {
    createdFrom = dayjs().subtract(30, 'day');
    createdTo = dayjs();
  }

  function exportResults() {
    console.log('导出的文档:', filteredDocuments);
    alert(`导出了 ${filteredDocuments.length} 个文档`);
  }
</script>

<div class="advanced-search">
  <header class="search-header">
    <h2>文档搜索与过滤</h2>
    <p>使用日期范围按创建和修改日期查找文档</p>
  </header>

  <div class="filter-panel">
    <div class="filter-section">
      <h3>创建日期范围</h3>
      <DateRange
        bind:fromValue={createdFrom}
        bind:toValue={createdTo}
        variant="outlined"
        format="YYYY年MM月DD日"
        compact={true}
        style="width: 300px;"
      />
    </div>

    <div class="filter-section">
      <h3>修改日期范围</h3>
      <DateRange
        bind:fromValue={modifiedFrom}
        bind:toValue={modifiedTo}
        variant="outlined"
        format="YYYY年MM月DD日"
        compact={true}
        style="width: 300px;"
      />
    </div>

    <div class="filter-actions">
      <button class="action-btn secondary" on:click={setRecentFilter}>最近30天</button>
      <button class="action-btn secondary" on:click={clearAllFilters}>清除所有</button>
      {#if filteredDocuments.length > 0}
        <button class="action-btn primary" on:click={exportResults}>导出 ({filteredDocuments.length})</button>
      {/if}
    </div>
  </div>

  <div class="results-section">
    <div class="results-header">
      <h3>搜索结果</h3>
      <span class="result-count">{filteredDocuments.length} / {allDocuments.length} 个文档</span>
    </div>

    <div class="documents-list">
      {#if filteredDocuments.length > 0}
        {#each filteredDocuments as doc}
          <div class="document-card">
            <div class="doc-header">
              <div class="doc-title">{doc.title}</div>
              <div class="doc-type">{doc.type}</div>
            </div>
            <div class="doc-dates">
              <div class="date-info">
                <span class="date-label">创建：</span>
                <span class="date-value">{dayjs(doc.created).format('YYYY年MM月DD日')}</span>
              </div>
              <div class="date-info">
                <span class="date-label">修改：</span>
                <span class="date-value">{dayjs(doc.modified).format('YYYY年MM月DD日')}</span>
              </div>
            </div>
            <div class="doc-status">
              <span class="status-badge status-{doc.status.replace('版', '').replace('中', '')}">{doc.status}</span>
            </div>
          </div>
        {/each}
      {:else}
        <div class="no-results">
          <h4>未找到文档</h4>
          <p>尝试调整您的日期范围过滤器或清除所有过滤器以查看更多结果。</p>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .advanced-search {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
  }

  .search-header {
    text-align: center;
    margin-bottom: 30px;
  }

  .search-header h2 {
    color: #333;
    margin: 0 0 8px 0;
  }

  .search-header p {
    color: #666;
    margin: 0;
  }

  .filter-panel {
    background: #f8f9fa;
    padding: 25px;
    border-radius: 8px;
    margin-bottom: 30px;
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
    align-items: flex-end;
  }

  .filter-section {
    flex: 1;
    min-width: 280px;
  }

  .filter-section h3 {
    margin: 0 0 12px 0;
    color: #333;
    font-size: 1rem;
  }

  .filter-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
  }

  .action-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s;
  }

  .action-btn.primary {
    background: #007bff;
    color: white;
  }

  .action-btn.primary:hover {
    background: #0056b3;
  }

  .action-btn.secondary {
    background: #6c757d;
    color: white;
  }

  .action-btn.secondary:hover {
    background: #5a6268;
  }

  .results-section {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    overflow: hidden;
  }

  .results-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 25px;
    background: #f8f9fa;
    border-bottom: 1px solid #dee2e6;
  }

  .results-header h3 {
    margin: 0;
    color: #333;
  }

  .result-count {
    color: #666;
    font-size: 0.9rem;
  }

  .documents-list {
    padding: 20px;
  }

  .document-card {
    border: 1px solid #e9ecef;
    border-radius: 6px;
    padding: 16px;
    margin-bottom: 12px;
    transition: all 0.2s;
  }

  .document-card:hover {
    border-color: #007bff;
    box-shadow: 0 2px 4px rgba(0,123,255,0.15);
  }

  .doc-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .doc-title {
    font-weight: 600;
    color: #333;
    font-size: 1.1rem;
  }

  .doc-type {
    background: #e9ecef;
    color: #495057;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .doc-dates {
    display: flex;
    gap: 20px;
    margin-bottom: 12px;
  }

  .date-info {
    font-size: 0.875rem;
  }

  .date-label {
    color: #666;
    margin-right: 6px;
  }

  .date-value {
    color: #333;
    font-weight: 500;
  }

  .status-badge {
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .status-草稿 {
    background: #fff3cd;
    color: #856404;
  }

  .status-最终 {
    background: #d4edda;
    color: #155724;
  }

  .status-审核 {
    background: #cce5ff;
    color: #004085;
  }

  .no-results {
    text-align: center;
    padding: 60px 20px;
    color: #666;
  }

  .no-results h4 {
    margin: 0 0 12px 0;
    color: #333;
  }

  @media (max-width: 768px) {
    .filter-panel {
      flex-direction: column;
      align-items: stretch;
    }
    
    .filter-actions {
      justify-content: center;
    }
    
    .doc-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
    
    .doc-dates {
      flex-direction: column;
      gap: 4px;
    }
  }
</style>
```

## 样式

DateRange 组件使用以下 CSS 类：

```css
.uniface-range-editor {
  /* 主要范围容器 */
  display: flex;
  align-items: center;
  gap: 8px;
}

.uniface-range-editor .calendar-icon {
  /* 日历触发图标 */
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.uniface-range-editor .calendar-icon:hover {
  opacity: 1;
}

/* 日历弹出框样式 */
.calendar-popover {
  /* 日历弹出容器 */
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 16px;
}
```

## API 参考

### DateRange 组件属性

```typescript
interface DateRangeProps {
  variant?: '' | 'plain' | 'outlined' | 'filled';  // 视觉样式变体
  compact?: boolean;                                // 紧凑布局模式
  class?: string;                                   // CSS 类名
  style?: string;                                   // 自定义内联样式
  fromValue: UniDate;                               // 起始日期值
  toValue: UniDate;                                 // 结束日期值
  format?: string;                                  // 日期显示格式
  min?: string | Date | null;                       // 最小可选日期
  max?: string | Date | null;                       // 最大可选日期
}
```

## 最佳实践

1. **日期验证** - 始终验证起始日期在结束日期之前或等于结束日期
2. **格式一致性** - 在应用程序中使用一致的日期格式
3. **最小/最大边界** - 为您的用例设置适当的日期边界
4. **用户反馈** - 为选定的日期范围提供清晰的视觉反馈
5. **移动支持** - 在触摸设备上测试日历交互
6. **可访问性** - 确保日历导航支持键盘操作
7. **时区处理** - 在应用程序中明确时区处理方式
8. **清除功能** - 允许用户轻松清除日期选择
9. **性能** - 对依赖于日期范围的过滤操作进行防抖处理
10. **本地化** - 考虑国际用户的日期格式偏好