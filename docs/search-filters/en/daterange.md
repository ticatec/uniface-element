# DateRange Component

A date range selector component that allows users to select a start and end date through an intuitive dual calendar interface, commonly used for filtering data by date periods such as reporting ranges, booking periods, or event schedules.

## Overview

The DateRange component provides a comprehensive date selection experience with dual calendar displays, flexible date formatting, and robust validation. It features readonly input fields that open a popover with side-by-side calendars for easy range selection. The component supports various date formats, minimum/maximum date constraints, and seamless integration with form validation systems.

## Installation

```typescript
import DateRange from '@ticatec/uniface-element/DateRange';
import type { UniDate } from '@ticatec/uniface-element/DateRange';
```

## Basic Usage

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

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | Visual styling variant |
| `compact` | `boolean` | `false` | Enable compact layout for dense forms |
| `class` | `string` | `''` | Additional CSS class names |
| `style` | `string` | `''` | Custom inline styles |
| `fromValue` | `UniDate` | `null` | Start date (bindable) |
| `toValue` | `UniDate` | `null` | End date (bindable) |
| `format` | `string` | `"YYYY-MM-DD"` | Date display format (dayjs format) |
| `min` | `string \| Date \| null` | `null` | Minimum selectable date |
| `max` | `string \| Date \| null` | `null` | Maximum selectable date |

## Type Definitions

```typescript
/**
 * Flexible date type supporting multiple formats
 */
type UniDate = dayjs.Dayjs | Date | string | null;
```

## Features

- **Dual Calendar Interface**: Side-by-side calendar view for intuitive range selection
- **Flexible Date Types**: Supports Date objects, strings, and dayjs instances
- **Custom Formatting**: Configurable date display format using dayjs patterns
- **Range Validation**: Automatic validation ensuring from date ≤ to date
- **Min/Max Constraints**: Optional date boundaries to restrict selection
- **Popover Calendar**: Clean calendar popup with integrated date picker
- **Clear Functionality**: Built-in clear action when dates are selected
- **Readonly Inputs**: Prevents manual typing for consistent date format

## Usage Examples

### Reporting Date Range Selector

```svelte
<script lang="ts">
  import DateRange from '@ticatec/uniface-element/DateRange';
  import type { UniDate } from '@ticatec/uniface-element/DateRange';
  import dayjs from 'dayjs';

  let reportFrom: UniDate = dayjs().subtract(30, 'day');
  let reportTo: UniDate = dayjs();

  // Sales data for demo
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

  // Filter data based on selected date range
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

    // Calculate totals
    totalSales = filteredData.reduce((sum, item) => sum + item.sales, 0);
    totalOrders = filteredData.reduce((sum, item) => sum + item.orders, 0);
  }

  // Reactive filtering
  $: {
    reportFrom, reportTo;
    filterSalesData();
  }

  // Quick date range presets
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
    <h2>Sales Report Dashboard</h2>
    <p>Select a date range to view sales analytics</p>
  </header>

  <div class="date-controls">
    <div class="date-range-section">
      <label>Report Period:</label>
      <DateRange
        bind:fromValue={reportFrom}
        bind:toValue={reportTo}
        variant="outlined"
        format="MMM DD, YYYY"
        style="width: 320px;"
      />
    </div>

    <div class="quick-presets">
      <label>Quick Presets:</label>
      <div class="preset-buttons">
        <button class="preset-btn" on:click={() => setDateRange(7)}>Last 7 days</button>
        <button class="preset-btn" on:click={() => setDateRange(30)}>Last 30 days</button>
        <button class="preset-btn" on:click={setThisMonth}>This Month</button>
        <button class="preset-btn" on:click={setLastMonth}>Last Month</button>
      </div>
    </div>
  </div>

  <div class="report-summary">
    <div class="summary-card">
      <h3>Total Sales</h3>
      <div class="metric-value">${totalSales.toLocaleString()}</div>
    </div>
    <div class="summary-card">
      <h3>Total Orders</h3>
      <div class="metric-value">{totalOrders}</div>
    </div>
    <div class="summary-card">
      <h3>Average Order</h3>
      <div class="metric-value">
        ${totalOrders > 0 ? (totalSales / totalOrders).toFixed(2) : '0.00'}
      </div>
    </div>
  </div>

  <div class="data-table">
    <h3>Daily Breakdown ({filteredData.length} days)</h3>
    {#if filteredData.length > 0}
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Sales</th>
            <th>Orders</th>
            <th>Avg Order</th>
          </tr>
        </thead>
        <tbody>
          {#each filteredData as item}
            <tr>
              <td>{dayjs(item.date).format('MMM DD, YYYY')}</td>
              <td>${item.sales.toLocaleString()}</td>
              <td>{item.orders}</td>
              <td>${(item.sales / item.orders).toFixed(2)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    {:else}
      <div class="no-data">
        <p>No sales data available for the selected date range.</p>
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

### Event Booking Date Range

```svelte
<script lang="ts">
  import DateRange from '@ticatec/uniface-element/DateRange';
  import type { UniDate } from '@ticatec/uniface-element/DateRange';
  import dayjs from 'dayjs';

  let checkInDate: UniDate = null;
  let checkOutDate: UniDate = null;

  // Hotel booking data
  let availableRooms = [
    { id: 1, type: 'Standard Room', price: 120, available: true },
    { id: 2, type: 'Deluxe Room', price: 180, available: true },
    { id: 3, type: 'Suite', price: 320, available: false },
    { id: 4, type: 'Executive Room', price: 220, available: true }
  ];

  let selectedRoom = null;
  let totalNights = 0;
  let totalCost = 0;

  // Calculate stay duration and cost
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

  // Reactive calculations
  $: {
    checkInDate, checkOutDate, selectedRoom;
    calculateStay();
  }

  function selectRoom(room) {
    selectedRoom = room;
  }

  function bookRoom() {
    if (selectedRoom && checkInDate && checkOutDate) {
      alert(`Booking confirmed!\nRoom: ${selectedRoom.type}\nCheck-in: ${dayjs(checkInDate).format('MMM DD, YYYY')}\nCheck-out: ${dayjs(checkOutDate).format('MMM DD, YYYY')}\nTotal: $${totalCost}`);
    }
  }
</script>

<div class="booking-system">
  <header class="booking-header">
    <h2>Hotel Room Booking</h2>
    <p>Select your stay dates and choose a room</p>
  </header>

  <div class="booking-form">
    <div class="date-selection">
      <h3>Select Your Stay Dates</h3>
      <DateRange
        bind:fromValue={checkInDate}
        bind:toValue={checkOutDate}
        variant="outlined"
        format="MMM DD, YYYY"
        min={dayjs().format('YYYY-MM-DD')}
        max={dayjs().add(1, 'year').format('YYYY-MM-DD')}
        style="width: 350px;"
      />
      
      {#if totalNights > 0}
        <div class="stay-info">
          <p><strong>{totalNights}</strong> night{totalNights === 1 ? '' : 's'} stay</p>
          <p>Check-in: {dayjs(checkInDate).format('dddd, MMM DD, YYYY')}</p>
          <p>Check-out: {dayjs(checkOutDate).format('dddd, MMM DD, YYYY')}</p>
        </div>
      {/if}
    </div>

    {#if checkInDate && checkOutDate && totalNights > 0}
      <div class="room-selection">
        <h3>Available Rooms</h3>
        <div class="rooms-grid">
          {#each availableRooms as room}
            <div 
              class="room-card" 
              class:selected={selectedRoom?.id === room.id}
              class:unavailable={!room.available}
              on:click={() => room.available && selectRoom(room)}
            >
              <div class="room-type">{room.type}</div>
              <div class="room-price">${room.price}/night</div>
              <div class="room-total">
                {#if room.available}
                  Total: ${room.price * totalNights} for {totalNights} nights
                {:else}
                  <span class="unavailable-text">Not Available</span>
                {/if}
              </div>
              {#if selectedRoom?.id === room.id}
                <div class="selected-indicator">✓ Selected</div>
              {/if}
            </div>
          {/each}
        </div>
      </div>

      {#if selectedRoom}
        <div class="booking-summary">
          <h3>Booking Summary</h3>
          <div class="summary-details">
            <div class="detail-row">
              <span>Room Type:</span>
              <span>{selectedRoom.type}</span>
            </div>
            <div class="detail-row">
              <span>Check-in Date:</span>
              <span>{dayjs(checkInDate).format('MMM DD, YYYY')}</span>
            </div>
            <div class="detail-row">
              <span>Check-out Date:</span>
              <span>{dayjs(checkOutDate).format('MMM DD, YYYY')}</span>
            </div>
            <div class="detail-row">
              <span>Number of Nights:</span>
              <span>{totalNights}</span>
            </div>
            <div class="detail-row">
              <span>Rate per Night:</span>
              <span>${selectedRoom.price}</span>
            </div>
            <div class="detail-row total">
              <span>Total Cost:</span>
              <span>${totalCost}</span>
            </div>
          </div>
          
          <button class="book-btn" on:click={bookRoom}>
            Book Room - ${totalCost}
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

### Advanced Search Filters

```svelte
<script lang="ts">
  import DateRange from '@ticatec/uniface-element/DateRange';
  import type { UniDate } from '@ticatec/uniface-element/DateRange';
  import dayjs from 'dayjs';

  // Search criteria
  let createdFrom: UniDate = null;
  let createdTo: UniDate = null;
  let modifiedFrom: UniDate = null;
  let modifiedTo: UniDate = null;

  // Mock document data
  let allDocuments = [
    { id: 1, title: 'Project Proposal', type: 'Document', created: '2024-02-15', modified: '2024-03-01', status: 'Draft' },
    { id: 2, title: 'Budget Report', type: 'Spreadsheet', created: '2024-02-20', modified: '2024-02-28', status: 'Final' },
    { id: 3, title: 'Meeting Notes', type: 'Document', created: '2024-03-01', modified: '2024-03-05', status: 'Draft' },
    { id: 4, title: 'Contract Template', type: 'Template', created: '2024-01-10', modified: '2024-02-15', status: 'Final' },
    { id: 5, title: 'Marketing Plan', type: 'Presentation', created: '2024-03-05', modified: '2024-03-10', status: 'Review' }
  ];

  let filteredDocuments = [];

  // Filter documents based on date ranges
  function filterDocuments() {
    filteredDocuments = allDocuments.filter(doc => {
      let matchesCreated = true;
      let matchesModified = true;

      // Check created date range
      if (createdFrom || createdTo) {
        const createdDate = dayjs(doc.created);
        if (createdFrom && createdDate.isBefore(dayjs(createdFrom))) {
          matchesCreated = false;
        }
        if (createdTo && createdDate.isAfter(dayjs(createdTo))) {
          matchesCreated = false;
        }
      }

      // Check modified date range
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

  // Reactive filtering
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
    console.log('Exported documents:', filteredDocuments);
    alert(`Exported ${filteredDocuments.length} documents`);
  }
</script>

<div class="advanced-search">
  <header class="search-header">
    <h2>Document Search & Filter</h2>
    <p>Use date ranges to find documents by creation and modification dates</p>
  </header>

  <div class="filter-panel">
    <div class="filter-section">
      <h3>Creation Date Range</h3>
      <DateRange
        bind:fromValue={createdFrom}
        bind:toValue={createdTo}
        variant="outlined"
        format="MMM DD, YYYY"
        compact={true}
        style="width: 300px;"
      />
    </div>

    <div class="filter-section">
      <h3>Modification Date Range</h3>
      <DateRange
        bind:fromValue={modifiedFrom}
        bind:toValue={modifiedTo}
        variant="outlined"
        format="MMM DD, YYYY"
        compact={true}
        style="width: 300px;"
      />
    </div>

    <div class="filter-actions">
      <button class="action-btn secondary" on:click={setRecentFilter}>Last 30 Days</button>
      <button class="action-btn secondary" on:click={clearAllFilters}>Clear All</button>
      {#if filteredDocuments.length > 0}
        <button class="action-btn primary" on:click={exportResults}>Export ({filteredDocuments.length})</button>
      {/if}
    </div>
  </div>

  <div class="results-section">
    <div class="results-header">
      <h3>Search Results</h3>
      <span class="result-count">{filteredDocuments.length} of {allDocuments.length} documents</span>
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
                <span class="date-label">Created:</span>
                <span class="date-value">{dayjs(doc.created).format('MMM DD, YYYY')}</span>
              </div>
              <div class="date-info">
                <span class="date-label">Modified:</span>
                <span class="date-value">{dayjs(doc.modified).format('MMM DD, YYYY')}</span>
              </div>
            </div>
            <div class="doc-status">
              <span class="status-badge status-{doc.status.toLowerCase()}">{doc.status}</span>
            </div>
          </div>
        {/each}
      {:else}
        <div class="no-results">
          <h4>No documents found</h4>
          <p>Try adjusting your date range filters or clear all filters to see more results.</p>
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

  .status-draft {
    background: #fff3cd;
    color: #856404;
  }

  .status-final {
    background: #d4edda;
    color: #155724;
  }

  .status-review {
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

## Styling

The DateRange component uses the following CSS classes:

```css
.uniface-range-editor {
  /* Main range container */
  display: flex;
  align-items: center;
  gap: 8px;
}

.uniface-range-editor .calendar-icon {
  /* Calendar trigger icon */
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.uniface-range-editor .calendar-icon:hover {
  opacity: 1;
}

/* Calendar popover styling */
.calendar-popover {
  /* Calendar popup container */
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 16px;
}
```

## API Reference

### DateRange Component Props

```typescript
interface DateRangeProps {
  variant?: '' | 'plain' | 'outlined' | 'filled';  // Visual styling variant
  compact?: boolean;                                // Compact layout mode
  class?: string;                                   // CSS class names
  style?: string;                                   // Custom inline styles
  fromValue: UniDate;                               // Start date value
  toValue: UniDate;                                 // End date value
  format?: string;                                  // Date display format
  min?: string | Date | null;                       // Minimum selectable date
  max?: string | Date | null;                       // Maximum selectable date
}
```

## Best Practices

1. **Date Validation** - Always validate that the from date is before or equal to the to date
2. **Format Consistency** - Use consistent date formats throughout your application
3. **Min/Max Bounds** - Set appropriate date boundaries for your use case
4. **User Feedback** - Provide clear visual feedback for selected date ranges
5. **Mobile Support** - Test calendar interaction on touch devices
6. **Accessibility** - Ensure calendar navigation works with keyboard
7. **Timezone Handling** - Be explicit about timezone handling in your application
8. **Clear Functionality** - Allow users to easily clear date selections
9. **Performance** - Debounce filtering operations that depend on date ranges
10. **Localization** - Consider date format preferences for international users