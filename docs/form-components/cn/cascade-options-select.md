# CascadeOptionsSelect 组件

级联选择器组件，支持多级联动选择。

## 类型定义

```typescript
type OnSelectOption = (item: any) => Promise<Array<any>>;
type IsLeafDetermine = (item: any) => boolean;
```

## 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | 外观变体 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `readonly` | `boolean` | `false` | 是否只读 |
| `compact` | `boolean` | `false` | 是否紧凑模式 |
| `mandatory` | `boolean` | `false` | 是否必填 |
| `value` | `any` | `null` | 选中的值 |
| `keyField` | `string` | `'code'` | 值字段名 |
| `textField` | `string` | `'text'` | 显示字段名 |
| `abbrField` | `string` | `'abbr'` | 缩写字段名 |
| `childrenField` | `string` | `'children'` | 子节点字段名 |
| `placeholder` | `string` | `''` | 占位符文本 |
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | 显示模式 |
| `emptyText` | `string \| null` | `null` | 空值显示文本 |
| `checkLeaf` | `IsLeafDetermine \| null` | `null` | 叶子节点判断函数 |
| `text` | `string` | `''` | 显示文本 |
| `nodes` | `Array<any>` | `[]` | 根节点数组 |
| `menu$height` | `number` | `150` | 下拉菜单高度 |
| `onSelect` | `OnSelectOption` | - | 选项选择回调（异步加载子节点） |
| `box$style` | `string` | `''` | 选项框样式 |
| `style` | `string` | `''` | 自定义样式 |
| `onChange` | `OnChangeHandler<any>` | - | 值变化回调 |

## 使用示例

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
  
  // 地区级联数据
  const regions: CascadeNode[] = [
    {
      code: 'beijing',
      text: '北京市',
      abbr: '京',
      children: [
        { code: 'dongcheng', text: '东城区', abbr: '东城' },
        { code: 'xicheng', text: '西城区', abbr: '西城' },
        { code: 'chaoyang', text: '朝阳区', abbr: '朝阳' }
      ]
    },
    {
      code: 'shanghai',
      text: '上海市',
      abbr: '沪',
      children: [
        { code: 'huangpu', text: '黄浦区', abbr: '黄浦' },
        { code: 'xuhui', text: '徐汇区', abbr: '徐汇' },
        { code: 'changning', text: '长宁区', abbr: '长宁' }
      ]
    }
  ];
  
  // 商品分类数据（异步加载）
  const categories: CascadeNode[] = [
    { code: 'electronics', text: '电子产品', abbr: '电子' },
    { code: 'clothing', text: '服装服饰', abbr: '服装' },
    { code: 'books', text: '图书文化', abbr: '图书' }
  ];
  
  // 异步加载子分类
  const loadSubCategories: OnSelectOption = async (item: CascadeNode): Promise<CascadeNode[]> => {
    // 模拟API调用
    await new Promise<void>(resolve => setTimeout(resolve, 500));
    
    const subcategories: Record<string, CascadeNode[]> = {
      'electronics': [
        { code: 'phone', text: '手机通讯', abbr: '手机', level: 2 },
        { code: 'computer', text: '电脑办公', abbr: '电脑', level: 2 },
        { code: 'camera', text: '摄影摄像', abbr: '摄像', level: 2 }
      ],
      'clothing': [
        { code: 'men', text: '男装', abbr: '男装', level: 2 },
        { code: 'women', text: '女装', abbr: '女装', level: 2 },
        { code: 'shoes', text: '鞋靴', abbr: '鞋靴', level: 2 }
      ],
      'books': [
        { code: 'literature', text: '文学小说', abbr: '文学', level: 2 },
        { code: 'technical', text: '科技图书', abbr: '科技', level: 2 },
        { code: 'education', text: '教育考试', abbr: '教育', level: 2 }
      ]
    };
    
    return subcategories[item.code] || [];
  };
  
  // 判断是否为叶子节点
  const isLeafNode: IsLeafDetermine = (item: CascadeNode): boolean => {
    // 如果是第三级节点，则为叶子节点
    return item.level === 3;
  };
  
  const handleRegionChange = (value: string): void => {
    selectedRegion = value;
    console.log('选择的地区：', value);
  };
  
  const handleCategoryChange = (value: string): void => {
    selectedCategory = value;
    console.log('选择的分类：', value);
  };
</script>

<!-- 地区级联选择 -->
<CascadeOptionsSelect 
  placeholder="请选择地区"
  nodes={regions}
  keyField="code"
  textField="text"
  abbrField="abbr"
  bind:value={selectedRegion}
  onChange={handleRegionChange}
/>

<!-- 商品分类级联选择（异步加载） -->
<CascadeOptionsSelect 
  placeholder="请选择商品分类"
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

## 高级用法

### 组织架构选择
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
      name: 'TechCorp 科技公司',
      abbr: 'TechCorp',
      type: 'company',
      children: [
        {
          id: 'dept-1',
          name: '研发部',
          abbr: 'R&D',
          type: 'department',
          children: [
            { id: 'team-1', name: '前端团队', abbr: '前端', type: 'team' },
            { id: 'team-2', name: '后端团队', abbr: '后端', type: 'team' },
            { id: 'team-3', name: '测试团队', abbr: '测试', type: 'team' }
          ]
        },
        {
          id: 'dept-2',
          name: '产品部',
          abbr: 'Product',
          type: 'department',
          children: [
            { id: 'team-4', name: '产品设计', abbr: '设计', type: 'team' },
            { id: 'team-5', name: '用户研究', abbr: '用研', type: 'team' }
          ]
        }
      ]
    }
  ];
  
  // 动态加载子部门（模拟从API获取）
  const loadSubOrgs: OnSelectOption = async (item: OrgNode): Promise<OrgNode[]> => {
    console.log('加载子部门：', item);
    
    // 如果已有子节点，直接返回
    if (item.children) {
      return item.children;
    }
    
    // 模拟API调用
    await new Promise<void>(resolve => setTimeout(resolve, 800));
    
    // 根据不同类型返回不同的子节点
    if (item.type === 'company') {
      return [
        { id: `dept-${Date.now()}`, name: '新部门', abbr: '新部门', type: 'department' as const }
      ];
    } else if (item.type === 'department') {
      return [
        { id: `team-${Date.now()}`, name: '新团队', abbr: '新团队', type: 'team' as const }
      ];
    }
    
    return [];
  };
  
  // 判断是否为最终可选节点
  const isSelectableNode: IsLeafDetermine = (item: OrgNode): boolean => {
    return item.type === 'team'; // 只有团队级别才能被选择
  };
  
  const handleOrgChange = (value: string): void => {
    selectedOrg = value;
    console.log('选择的组织：', value);
  };
</script>

<CascadeOptionsSelect 
  placeholder="请选择组织架构"
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

### 地理位置三级联动
```svelte
<script lang="ts">
  interface LocationNode {
    code: string;
    name: string;
    level: number;
  }
  
  let selectedLocation: string | null = null;
  
  const provinces: LocationNode[] = [
    { code: '110000', name: '北京市', level: 1 },
    { code: '310000', name: '上海市', level: 1 },
    { code: '440000', name: '广东省', level: 1 },
    { code: '320000', name: '江苏省', level: 1 }
  ];
  
  // 模拟地理位置API
  const loadLocationChildren: OnSelectOption = async (item: LocationNode): Promise<LocationNode[]> => {
    const response: Response = await fetch(`/api/locations/${item.code}/children`);
    const children: LocationNode[] = await response.json() as LocationNode[];
    
    return children.map((child: LocationNode): LocationNode => ({
      code: child.code,
      name: child.name,
      level: item.level + 1
    }));
  };
  
  // 区县级别为最终选择
  const isCountyLevel: IsLeafDetermine = (item: LocationNode): boolean => {
    return item.level === 3;
  };
  
  const handleLocationChange = (value: string): void => {
    selectedLocation = value;
    console.log('选择的地区代码：', value);
  };
</script>

<CascadeOptionsSelect 
  placeholder="请选择省/市/区"
  nodes={provinces}
  keyField="code"
  textField="name"
  onSelect={loadLocationChildren}
  checkLeaf={isCountyLevel}
  bind:value={selectedLocation}
  onChange={handleLocationChange}
/>
```

## 最佳实践

### 1. 异步加载优化
```typescript
// 使用缓存避免重复请求
interface CacheItem {
  code: string;
  [key: string]: any;
}

const cache = new Map<string, CacheItem[]>();

const cachedLoader: OnSelectOption = async (item: CacheItem): Promise<CacheItem[]> => {
  const cacheKey: string = item.code;
  
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!;
  }
  
  const children: CacheItem[] = await fetchChildren(item.code);
  cache.set(cacheKey, children);
  
  return children;
};

const fetchChildren = async (code: string): Promise<CacheItem[]> => {
  // 实现异步获取子节点逻辑
  const response = await fetch(`/api/children/${code}`);
  return await response.json() as CacheItem[];
};
```

### 2. 错误处理
```typescript
interface ApiItem {
  code: string;
  [key: string]: any;
}

const robustLoader: OnSelectOption = async (item: ApiItem): Promise<ApiItem[]> => {
  try {
    const response: Response = await fetch(`/api/cascade/${item.code}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json() as ApiItem[];
  } catch (error: unknown) {
    console.error('加载子节点失败：', error);
    return []; // 返回空数组而不是抛出错误
  }
};
```

### 3. 显示加载状态
组件内部已经有加载状态指示，当异步加载子节点时会显示加载动画。

### 4. 合理设置菜单高度
```svelte
<!-- 根据层级数量调整高度 -->
<CascadeOptionsSelect 
  menu$height={200} // 2-3级
  nodes={shallowData}
/>

<CascadeOptionsSelect 
  menu$height={300} // 4-5级
  nodes={deepData}
/>
```