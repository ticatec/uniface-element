# Switch 组件

开关组件，提供布尔值的可视化切换。

## 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | 外观变体 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `readonly` | `boolean` | `false` | 是否只读 |
| `value` | `boolean` | `false` | 开关状态 |
| `label` | `string` | `''` | 标签文本 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 开关大小 |
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | 显示模式 |
| `style` | `string` | `''` | 自定义样式 |
| `onChange` | `OnChangeHandler<boolean>` | - | 值变化回调 |

## 使用示例

```svelte
<script lang="ts">
  import Switch from '@ticatec/uniface-element/Switch';
  
  let darkMode: boolean = false;
  let notifications: boolean = true;
  let autoSave: boolean = false;
  
  const handleDarkModeChange = (enabled: boolean): void => {
    darkMode = enabled;
    // 应用深色主题逻辑
    document.body.classList.toggle('dark-theme', enabled);
  };
  
  const handleNotificationChange = (enabled: boolean): void => {
    notifications = enabled;
    console.log('通知设置：', enabled);
  };
  
  const handleAutoSaveChange = (enabled: boolean): void => {
    autoSave = enabled;
    console.log('自动保存：', enabled);
  };
</script>

<!-- 深色模式开关 -->
<Switch 
  label="深色模式"
  bind:value={darkMode}
  onChange={handleDarkModeChange}
/>

<!-- 通知开关（大尺寸） -->
<Switch 
  label="推送通知"
  size="large"
  bind:value={notifications}
  onChange={handleNotificationChange}
/>

<!-- 自动保存开关（小尺寸） -->
<Switch 
  label="自动保存"
  size="small"
  bind:value={autoSave}
  onChange={handleAutoSaveChange}
/>
```

## 高级用法

### 设置面板
```svelte
<script lang="ts">
  interface AppSettings {
    darkMode: boolean;
    notifications: boolean;
    autoSave: boolean;
    showPreview: boolean;
    enableShortcuts: boolean;
  }
  
  let settings: AppSettings = {
    darkMode: false,
    notifications: true,
    autoSave: true,
    showPreview: true,
    enableShortcuts: true
  };
  
  const updateSetting = (key: keyof AppSettings) => (value: boolean): void => {
    settings = { ...settings, [key]: value };
    localStorage.setItem('app-settings', JSON.stringify(settings));
  };
  
  // 页面加载时恢复设置
  onMount(() => {
    const savedSettings = localStorage.getItem('app-settings');
    if (savedSettings) {
      settings = { ...settings, ...JSON.parse(savedSettings) };
    }
  });
</script>

<div class="settings-panel">
  <h3>应用设置</h3>
  
  <div class="setting-group">
    <Switch 
      label="深色模式"
      bind:value={settings.darkMode}
      onChange={updateSetting('darkMode')}
    />
    <p class="setting-description">启用深色主题以减少眼部疲劳</p>
  </div>
  
  <div class="setting-group">
    <Switch 
      label="桌面通知"
      bind:value={settings.notifications}
      onChange={updateSetting('notifications')}
    />
    <p class="setting-description">允许显示桌面通知</p>
  </div>
  
  <div class="setting-group">
    <Switch 
      label="自动保存"
      size="small"
      bind:value={settings.autoSave}
      onChange={updateSetting('autoSave')}
    />
    <p class="setting-description">自动保存您的工作</p>
  </div>
</div>
```

## 最佳实践

### 1. 提供即时反馈
```svelte
<script lang="ts">
  let isOnline: boolean = true;
  
  const toggleOnlineStatus = (status: boolean): void => {
    isOnline = status;
    
    // 显示状态变化提示
    const message = status ? '已上线' : '已离线';
    showToast(message);
  };
</script>

<Switch 
  label={`状态: ${isOnline ? '在线' : '离线'}`}
  bind:value={isOnline}
  onChange={toggleOnlineStatus}
/>
```

### 2. 条件禁用
```svelte
<script lang="ts">
  let isPremiumUser: boolean = false;
  let advancedFeatures: boolean = false;
  
  $: canUseAdvancedFeatures = isPremiumUser;
</script>

<Switch 
  label="高级功能"
  disabled={!canUseAdvancedFeatures}
  bind:value={advancedFeatures}
/>
{#if !canUseAdvancedFeatures}
  <p class="upgrade-hint">升级到高级版以使用此功能</p>
{/if}
```