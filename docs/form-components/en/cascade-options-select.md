# CascadeOptionsSelect Component

Cascade selector component supporting multi-level cascading selection.

## Type Definitions

```typescript
type OnSelectOption = (item: any) => Promise<Array<any>>;
type IsLeafDetermine = (item: any) => boolean;
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | Appearance variant |
| `disabled` | `boolean` | `false` | Whether disabled |
| `readonly` | `boolean` | `false` | Whether read-only |
| `compact` | `boolean` | `false` | Whether compact mode |
| `mandatory` | `boolean` | `false` | Whether required |
| `value` | `any` | `null` | Selected value |
| `keyField` | `string` | `'code'` | Value field name |
| `textField` | `string` | `'text'` | Display field name |
| `abbrField` | `string` | `'abbr'` | Abbreviation field name |
| `childrenField` | `string` | `'children'` | Children field name |
| `placeholder` | `string` | `''` | Placeholder text |
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | Display mode |
| `emptyText` | `string \| null` | `null` | Empty value display text |
| `checkLeaf` | `IsLeafDetermine \| null` | `null` | Leaf node determination function |
| `text` | `string` | `''` | Display text |
| `nodes` | `Array<any>` | `[]` | Root nodes array |
| `menu$height` | `number` | `150` | Dropdown menu height |
| `onSelect` | `OnSelectOption` | - | Option selection callback (async load children) |
| `box$style` | `string` | `''` | Option box style |
| `style` | `string` | `''` | Custom styles |
| `onChange` | `OnChangeHandler<any>` | - | Value change callback |

## Usage Examples

```svelte
<script lang="ts">
  import { CascadeOptionsSelect, type OnSelectOption, type IsLeafDetermine } from '@ticatec/uniface-element';
  
  interface CascadeNode {
    code: string;
    text: string;
    abbr: string;
    children?: CascadeNode[];
    level?: number;
  }
  
  let selectedRegion: string | null = null;
  let selectedCategory: string | null = null;
  
  // Regional cascade data
  const regions: CascadeNode[] = [
    {
      code: 'ny',
      text: 'New York',
      abbr: 'NY',
      children: [
        { code: 'manhattan', text: 'Manhattan', abbr: 'Manhattan' },
        { code: 'brooklyn', text: 'Brooklyn', abbr: 'Brooklyn' },
        { code: 'queens', text: 'Queens', abbr: 'Queens' }
      ]
    },
    {
      code: 'ca',
      text: 'California',
      abbr: 'CA',
      children: [
        { code: 'la', text: 'Los Angeles', abbr: 'LA' },
        { code: 'sf', text: 'San Francisco', abbr: 'SF' },
        { code: 'sd', text: 'San Diego', abbr: 'SD' }
      ]
    }
  ];
  
  // Product category data (async loading)
  const categories: CascadeNode[] = [
    { code: 'electronics', text: 'Electronics', abbr: 'Elec' },
    { code: 'clothing', text: 'Clothing', abbr: 'Cloth' },
    { code: 'books', text: 'Books', abbr: 'Books' }
  ];
  
  // Async load subcategories
  const loadSubCategories: OnSelectOption = async (item: CascadeNode) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const subcategories: Record<string, CascadeNode[]> = {
      'electronics': [
        { code: 'phone', text: 'Mobile Phones', abbr: 'Phone', level: 2 },
        { code: 'computer', text: 'Computers', abbr: 'PC', level: 2 },
        { code: 'camera', text: 'Cameras', abbr: 'Camera', level: 2 }
      ],
      'clothing': [
        { code: 'men', text: 'Men\'s Wear', abbr: 'Men', level: 2 },
        { code: 'women', text: 'Women\'s Wear', abbr: 'Women', level: 2 },
        { code: 'shoes', text: 'Shoes', abbr: 'Shoes', level: 2 }
      ],
      'books': [
        { code: 'fiction', text: 'Fiction', abbr: 'Fiction', level: 2 },
        { code: 'technical', text: 'Technical Books', abbr: 'Tech', level: 2 },
        { code: 'education', text: 'Education', abbr: 'Edu', level: 2 }
      ]
    };
    
    return subcategories[item.code] || [];
  };
  
  // Determine if it's a leaf node
  const isLeafNode: IsLeafDetermine = (item: CascadeNode) => {
    // If it's a third-level node, it's a leaf node
    return item.level === 3;
  };
  
  const handleRegionChange = (value: string): void => {
    selectedRegion = value;
    console.log('Selected region:', value);
  };
  
  const handleCategoryChange = (value: string): void => {
    selectedCategory = value;
    console.log('Selected category:', value);
  };
</script>

<!-- Regional cascade selection -->
<CascadeOptionsSelect 
  placeholder="Please select region"
  nodes={regions}
  keyField="code"
  textField="text"
  abbrField="abbr"
  bind:value={selectedRegion}
  onChange={handleRegionChange}
/>

<!-- Product category cascade selection (async loading) -->
<CascadeOptionsSelect 
  placeholder="Please select product category"
  nodes={categories}
  keyField="code"
  textField="text"
  abbrField="abbr"
  onSelect={loadSubCategories}
  checkLeaf={isLeafNode}
  menu$height={200}
  bind:value={selectedCategory}
  onChange={handleCategoryChange}
/>
```

## Advanced Usage

### Organization Structure Selection
```svelte
<script lang="ts">
  interface OrgNode {
    id: string;
    name: string;
    abbr: string;
    type: 'company' | 'department' | 'team';
    children?: OrgNode[];
  }
  
  let selectedOrg: string | null = null;
  
  const orgStructure: OrgNode[] = [
    {
      id: 'company-1',
      name: 'TechCorp Inc.',
      abbr: 'TechCorp',
      type: 'company',
      children: [
        {
          id: 'dept-1',
          name: 'Engineering',
          abbr: 'Eng',
          type: 'department',
          children: [
            { id: 'team-1', name: 'Frontend Team', abbr: 'FE', type: 'team' },
            { id: 'team-2', name: 'Backend Team', abbr: 'BE', type: 'team' },
            { id: 'team-3', name: 'QA Team', abbr: 'QA', type: 'team' }
          ]
        },
        {
          id: 'dept-2',
          name: 'Product',
          abbr: 'Product',
          type: 'department',
          children: [
            { id: 'team-4', name: 'Design Team', abbr: 'Design', type: 'team' },
            { id: 'team-5', name: 'Research Team', abbr: 'Research', type: 'team' }
          ]
        }
      ]
    }
  ];
  
  // Dynamic loading of sub-organizations (simulate API fetch)
  const loadSubOrgs: OnSelectOption = async (item: OrgNode) => {
    console.log('Loading sub-organizations:', item);
    
    // If already has children, return directly
    if (item.children) {
      return item.children;
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return different children based on type
    if (item.type === 'company') {
      return [
        { id: `dept-${Date.now()}`, name: 'New Department', abbr: 'New Dept', type: 'department' }
      ];
    } else if (item.type === 'department') {
      return [
        { id: `team-${Date.now()}`, name: 'New Team', abbr: 'New Team', type: 'team' }
      ];
    }
    
    return [];
  };
  
  // Determine if it's a selectable final node
  const isSelectableNode: IsLeafDetermine = (item: OrgNode) => {
    return item.type === 'team'; // Only team level can be selected
  };
  
  const handleOrgChange = (value: string): void => {
    selectedOrg = value;
    console.log('Selected organization:', value);
  };
</script>

<CascadeOptionsSelect 
  placeholder="Please select organization"
  nodes={orgStructure}
  keyField="id"
  textField="name"
  abbrField="abbr"
  onSelect={loadSubOrgs}
  checkLeaf={isSelectableNode}
  menu$height={250}
  bind:value={selectedOrg}
  onChange={handleOrgChange}
/>
```

### Geographic Location Three-level Cascade
```svelte
<script lang="ts">
  interface LocationNode {
    code: string;
    name: string;
    level: number;
  }
  
  let selectedLocation: string | null = null;
  
  const states: LocationNode[] = [
    { code: 'NY', name: 'New York', level: 1 },
    { code: 'CA', name: 'California', level: 1 },
    { code: 'TX', name: 'Texas', level: 1 },
    { code: 'FL', name: 'Florida', level: 1 }
  ];
  
  // Simulate geographic location API
  const loadLocationChildren: OnSelectOption = async (item: LocationNode) => {
    const response = await fetch(`/api/locations/${item.code}/children`);
    const children = await response.json();
    
    return children.map((child: any) => ({
      code: child.code,
      name: child.name,
      level: item.level + 1
    }));
  };
  
  // County level is final selection
  const isCountyLevel: IsLeafDetermine = (item: LocationNode) => {
    return item.level === 3;
  };
  
  const handleLocationChange = (value: string): void => {
    selectedLocation = value;
    console.log('Selected location code:', value);
  };
</script>

<CascadeOptionsSelect 
  placeholder="Please select State/City/County"
  nodes={states}
  keyField="code"
  textField="name"
  onSelect={loadLocationChildren}
  checkLeaf={isCountyLevel}
  bind:value={selectedLocation}
  onChange={handleLocationChange}
/>
```

## Best Practices

### 1. Async Loading Optimization
```typescript
// Use caching to avoid duplicate requests
const cache = new Map<string, any[]>();

const cachedLoader: OnSelectOption = async (item: any) => {
  const cacheKey = item.code;
  
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!;
  }
  
  const children = await fetchChildren(item.code);
  cache.set(cacheKey, children);
  
  return children;
};
```

### 2. Error Handling
```typescript
const robustLoader: OnSelectOption = async (item: any) => {
  try {
    const response = await fetch(`/api/cascade/${item.code}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to load children:', error);
    return []; // Return empty array instead of throwing error
  }
};
```

### 3. Display Loading State
The component internally has loading state indication, showing loading animation when async loading children.

### 4. Set Appropriate Menu Height
```svelte
<!-- Adjust height based on number of levels -->
<CascadeOptionsSelect 
  menu$height={200} // 2-3 levels
  nodes={shallowData}
/>

<CascadeOptionsSelect 
  menu$height={300} // 4-5 levels
  nodes={deepData}
/>
```