# GroupRadioBox 组件

单选按钮组组件，将多个单选按钮选项组织在一起，用于从多个选项中选择一个值。比单独使用多个RadioButton更加方便和语义化。

## 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | 外观变体 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `readonly` | `boolean` | `false` | 是否只读 |
| `compact` | `boolean` | `false` | 是否紧凑模式 |
| `value` | `string | number` | - | 选中的值 |
| `options` | `Array<OptionItem>` | - | 选项数组 |
| `keyField` | `string` | `'code'` | 值字段名 |
| `textField` | `string` | `'text'` | 显示字段名 |
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | 显示模式 |
| `item$style` | `string` | `''` | 单个单选按钮的样式 |
| `disabledOptions` | `Array<string>` | `[]` | 禁用的选项值 |
| `style` | `string` | `''` | 自定义样式 |
| `onChange` | `OnChangeHandler<string | number>` | - | 值变化回调 |

## 使用示例

```svelte
<script lang="ts">
  import type { OptionItem } from '@ticatec/uniface-element/types';
  import GroupRadioBox from '@ticatec/uniface-element/GroupRadioBox';
  
  // 性别选项
  const genderOptions: OptionItem[] = [
    { code: 'male', text: '男' },
    { code: 'female', text: '女' },
    { code: 'other', text: '其他' }
  ];
  
  // 用户级别选项
  const userLevels: OptionItem[] = [
    { code: 'basic', text: '基础用户' },
    { code: 'premium', text: '高级用户' },
    { code: 'vip', text: 'VIP用户' },
    { code: 'enterprise', text: '企业用户' }
  ];
  
  // 通知频率选项
  const notificationFrequency: OptionItem[] = [
    { code: 'realtime', text: '实时通知' },
    { code: 'daily', text: '每日摘要' },
    { code: 'weekly', text: '每周摘要' },
    { code: 'never', text: '从不通知' }
  ];
  
  let selectedGender: string = 'male';
  let userLevel: string = 'basic';
  let notifyFreq: string = 'daily';
  let subscriptionPlan: string = 'free';
  
  const handleGenderChange = (value: string): void => {
    selectedGender = value;
    console.log('选择的性别：', value);
  };
  
  const handleLevelChange = (value: string): void => {
    userLevel = value;
    console.log('用户级别：', value);
  };
  
  const handleNotificationChange = (value: string): void => {
    notifyFreq = value;
    console.log('通知频率：', value);
  };
</script>

<!-- 性别选择 -->
<div class="form-group">
  <label>性别：</label>
  <GroupRadioBox 
    options={genderOptions}
    keyField="code"
    textField="text"
    bind:value={selectedGender}
    onChange={handleGenderChange}
  />
</div>

<!-- 用户级别选择 -->
<div class="form-group">
  <label>用户级别：</label>
  <GroupRadioBox 
    options={userLevels}
    keyField="code"
    textField="text"
    bind:value={userLevel}
    onChange={handleLevelChange}
  />
</div>

<!-- 通知频率选择（紧凑模式） -->
<div class="form-group">
  <label>通知频率：</label>
  <GroupRadioBox 
    options={notificationFrequency}
    keyField="code"
    textField="text"
    compact={true}
    item$style="margin-right: 16px;"
    bind:value={notifyFreq}
    onChange={handleNotificationChange}
  />
</div>

<!-- 带禁用选项的单选组 -->
<div class="form-group">
  <label>订阅计划：</label>
  <GroupRadioBox 
    options={[
      { code: 'free', text: '免费版' },
      { code: 'pro', text: '专业版' },
      { code: 'enterprise', text: '企业版' },
      { code: 'custom', text: '定制版' }
    ]}
    keyField="code"
    textField="text"
    disabledOptions={['custom']}
    bind:value={subscriptionPlan}
  />
</div>
```

## 高级用法

### 动态选项和条件禁用
```svelte
<script lang="ts">
  import type { OptionItem } from '@ticatec/uniface-element/types';
  import { onMount } from 'svelte';
  
  interface PaymentMethod extends OptionItem {
    available: boolean;
  }
  
  type UserLocation = 'CN' | 'US' | 'OTHER';
  
  const paymentMethods: PaymentMethod[] = [
    { code: 'credit_card', text: '信用卡支付', available: true },
    { code: 'paypal', text: 'PayPal', available: true },
    { code: 'alipay', text: '支付宝', available: true },
    { code: 'wechat', text: '微信支付', available: true },
    { code: 'bitcoin', text: '比特币', available: false }
  ];
  
  let selectedPayment: string = 'credit_card';
  let userLocation: UserLocation = 'CN'; // 用户位置
  
  // 根据用户位置动态设置可用的支付方式
  $: availablePaymentMethods = paymentMethods.filter((method: PaymentMethod): boolean => {
    if (userLocation === 'CN') {
      // 中国用户可以使用支付宝和微信
      return ['credit_card', 'alipay', 'wechat'].includes(method.code);
    } else if (userLocation === 'US') {
      // 美国用户可以使用信用卡和PayPal
      return ['credit_card', 'paypal'].includes(method.code);
    }
    return method.available;
  });
  
  // 动态设置禁用选项
  $: disabledOptions: string[] = paymentMethods
    .filter((method: PaymentMethod): boolean => !method.available)
    .map((method: PaymentMethod): string => method.code);
  
  const handlePaymentChange = (value: string): void => {
    selectedPayment = value;
    // 根据支付方式显示相应的表单
    showPaymentForm(value);
  };
  
  const showPaymentForm = (paymentMethod: string): void => {
    console.log(`显示${paymentMethod}支付表单`);
  };
</script>

<div class="form-group">
  <label>用户位置：</label>
  <select bind:value={userLocation}>
    <option value="CN">中国</option>
    <option value="US">美国</option>
    <option value="OTHER">其他</option>
  </select>
</div>

<div class="form-group">
  <label>支付方式：</label>
  <GroupRadioBox 
    options={availablePaymentMethods}
    keyField="code"
    textField="text"
    {disabledOptions}
    bind:value={selectedPayment}
    onChange={handlePaymentChange}
  />
</div>
```

### 带描述信息的选项
```svelte
<script lang="ts">
  import type { OptionItem } from '@ticatec/uniface-element/types';
  
  interface SubscriptionPlan extends OptionItem {
    description: string;
    price: string;
  }
  
  const subscriptionPlans: SubscriptionPlan[] = [
    { 
      code: 'free', 
      text: '免费版', 
      description: '基础功能，适合个人使用',
      price: '¥0/月'
    },
    { 
      code: 'pro', 
      text: '专业版', 
      description: '完整功能，适合小团队',
      price: '¥99/月'
    },
    { 
      code: 'enterprise', 
      text: '企业版', 
      description: '高级功能，适合大型团队',
      price: '¥299/月'
    }
  ];
  
  let selectedPlan: string = 'free';
  
  const handlePlanChange = (value: string): void => {
    selectedPlan = value;
    const plan: SubscriptionPlan | undefined = subscriptionPlans.find(p => p.code === value);
    if (plan) {
      console.log(`选择了${plan.text}计划`);
    }
  };
</script>

<div class="form-group">
  <label>选择订阅计划：</label>
  <div class="plan-options">
    <GroupRadioBox 
      options={subscriptionPlans}
      keyField="code"
      textField="text"
      bind:value={selectedPlan}
      onChange={handlePlanChange}
    />
  </div>
  
  <!-- 显示选中计划的详细信息 -->
  {#each subscriptionPlans as plan}
    {#if plan.code === selectedPlan}
      <div class="plan-details">
        <h4>{plan.text}</h4>
        <p>{plan.description}</p>
        <div class="price">{plan.price}</div>
      </div>
    {/if}
  {/each}
</div>
```

### 分组单选框
```svelte
<script lang="ts">
  import type { OptionItem } from '@ticatec/uniface-element/types';
  
  interface ThemeOptions {
    light: OptionItem[];
    dark: OptionItem[];
  }
  
  const themes: ThemeOptions = {
    light: [
      { code: 'default_light', text: '默认浅色' },
      { code: 'blue_light', text: '蓝色浅色' },
      { code: 'green_light', text: '绿色浅色' }
    ],
    dark: [
      { code: 'default_dark', text: '默认深色' },
      { code: 'blue_dark', text: '蓝色深色' },
      { code: 'green_dark', text: '绿色深色' }
    ]
  };
  
  let selectedTheme: string = 'default_light';
  
  const handleThemeChange = (value: string): void => {
    selectedTheme = value;
    applyTheme(value);
  };
  
  const applyTheme = (themeCode: string): void => {
    console.log(`应用主题：${themeCode}`);
    // 应用主题逻辑
  };
</script>

<div class="theme-selector">
  <div class="theme-group">
    <h4>浅色主题</h4>
    <GroupRadioBox 
      options={themes.light}
      keyField="code"
      textField="text"
      compact={true}
      bind:value={selectedTheme}
      onChange={handleThemeChange}
    />
  </div>
  
  <div class="theme-group">
    <h4>深色主题</h4>
    <GroupRadioBox 
      options={themes.dark}
      keyField="code"
      textField="text"
      compact={true}
      bind:value={selectedTheme}
      onChange={handleThemeChange}
    />
  </div>
</div>
```

### 表单验证
```svelte
<script lang="ts">
  import type { OptionItem } from '@ticatec/uniface-element/types';
  
  const satisfactionLevels: OptionItem[] = [
    { code: 'very_unsatisfied', text: '非常不满意' },
    { code: 'unsatisfied', text: '不满意' },
    { code: 'neutral', text: '一般' },
    { code: 'satisfied', text: '满意' },
    { code: 'very_satisfied', text: '非常满意' }
  ];
  
  let satisfaction: string | null = null;
  let satisfactionError: string = '';
  
  const validateSatisfaction = (value: string | null): void => {
    if (!value) {
      satisfactionError = '请选择您的满意度';
    } else {
      satisfactionError = '';
    }
  };
  
  const handleSatisfactionChange = (value: string): void => {
    satisfaction = value;
    validateSatisfaction(value);
  };
  
  const handleSubmit = (): void => {
    validateSatisfaction(satisfaction);
    if (!satisfactionError) {
      console.log('提交满意度调查：', satisfaction);
    }
  };
</script>

<div class="form-group">
  <label>您对我们的服务满意度如何？*</label>
  <GroupRadioBox 
    options={satisfactionLevels}
    keyField="code"
    textField="text"
    bind:value={satisfaction}
    onChange={handleSatisfactionChange}
  />
  {#if satisfactionError}
    <div class="error-message">{satisfactionError}</div>
  {/if}
</div>

<button on:click={handleSubmit} disabled={!!satisfactionError}>
  提交调查
</button>
```

## 样式定制

```css
.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  margin-bottom: 12px;
  font-weight: 600;
  color: #333;
}

.plan-options {
  margin-bottom: 16px;
}

.plan-details {
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #007bff;
}

.plan-details h4 {
  margin: 0 0 8px 0;
  color: #007bff;
}

.plan-details p {
  margin: 0 0 12px 0;
  color: #6c757d;
}

.price {
  font-size: 18px;
  font-weight: 700;
  color: #28a745;
}

.theme-selector {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.theme-group {
  padding: 16px;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
}

.theme-group h4 {
  margin: 0 0 12px 0;
  color: #495057;
}

.error-message {
  color: #dc3545;
  font-size: 14px;
  margin-top: 6px;
}

/* 自定义单选按钮样式 */
.custom-radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.custom-radio-group .radio-option {
  flex: 1;
  min-width: 120px;
}
```

## 组件优势

**相比单独使用RadioButton的优势：**

1. **统一管理**：所有相关选项集中在一个组件中管理
2. **数据绑定简化**：只需绑定一个值，而不是多个独立的值
3. **样式一致性**：所有选项具有统一的样式和间距
4. **选项动态管理**：可以轻松地显示/隐藏、启用/禁用特定选项
5. **更好的语义化**：明确表达了选项之间的互斥关系
6. **易于维护**：选项的增删改都在一个地方处理

## 最佳实践

### 1. 提供合理的默认值
```svelte
<!-- 推荐：设置合理的默认值 -->
<GroupRadioBox 
  options={genderOptions}
  bind:value={selectedGender}
  defaultValue="other"
/>

<!-- 避免：让用户必须选择 -->
<GroupRadioBox 
  options={genderOptions}
  bind:value={selectedGender}
/>
```

### 2. 限制选项数量
```svelte
<!-- 推荐：选项数量适中（3-7个） -->
<GroupRadioBox options={satisfactionLevels} /> <!-- 5个选项 -->

<!-- 避免：选项过多时使用下拉选择 -->
<OptionsSelect options={countryList} /> <!-- 200+国家 -->
```

### 3. 提供清晰的标签
```svelte
<!-- 推荐：清晰的描述 -->
<label>请选择您的年龄段：</label>
<GroupRadioBox options={ageRanges} />

<!-- 避免：模糊的标签 -->
<label>选择：</label>
<GroupRadioBox options={someOptions} />
```

### 4. 合理使用禁用状态
```svelte
<!-- 推荐：明确原因 -->
<GroupRadioBox 
  options={premiumFeatures}
  disabledOptions={nonPremiumUser ? ['advanced', 'pro'] : []}
/>
<div class="help-text">升级到高级版以解锁更多功能</div>
```