# Switch Component

Switch component providing visual toggle for boolean values.

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | Appearance variant |
| `disabled` | `boolean` | `false` | Whether disabled |
| `readonly` | `boolean` | `false` | Whether read-only |
| `value` | `boolean` | `false` | Switch state |
| `label` | `string` | `''` | Label text |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Switch size |
| `displayMode` | `DisplayMode` | `DisplayMode.Edit` | Display mode |
| `style` | `string` | `''` | Custom styles |
| `onChange` | `OnChangeHandler<boolean>` | - | Value change callback |

## Usage Examples

```svelte
<script lang="ts">
  import Switch from '@ticatec/uniface-element/Switch';
  
  let darkMode: boolean = false;
  let notifications: boolean = true;
  let autoSave: boolean = false;
  
  const handleDarkModeChange = (enabled: boolean): void => {
    darkMode = enabled;
    // Apply dark theme logic
    document.body.classList.toggle('dark-theme', enabled);
  };
  
  const handleNotificationChange = (enabled: boolean): void => {
    notifications = enabled;
    console.log('Notification setting:', enabled);
  };
  
  const handleAutoSaveChange = (enabled: boolean): void => {
    autoSave = enabled;
    console.log('Auto-save:', enabled);
  };
</script>

<!-- Dark mode switch -->
<Switch 
  label="Dark Mode"
  bind:value={darkMode}
  onChange={handleDarkModeChange}
/>

<!-- Notification switch (large size) -->
<Switch 
  label="Push Notifications"
  size="large"
  bind:value={notifications}
  onChange={handleNotificationChange}
/>

<!-- Auto-save switch (small size) -->
<Switch 
  label="Auto Save"
  size="small"
  bind:value={autoSave}
  onChange={handleAutoSaveChange}
/>
```

## Advanced Usage

### Settings Panel
```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  
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
  
  // Restore settings on page load
  onMount(() => {
    const savedSettings = localStorage.getItem('app-settings');
    if (savedSettings) {
      settings = { ...settings, ...JSON.parse(savedSettings) };
    }
  });
</script>

<div class="settings-panel">
  <h3>Application Settings</h3>
  
  <div class="setting-group">
    <Switch 
      label="Dark Mode"
      bind:value={settings.darkMode}
      onChange={updateSetting('darkMode')}
    />
    <p class="setting-description">Enable dark theme to reduce eye strain</p>
  </div>
  
  <div class="setting-group">
    <Switch 
      label="Desktop Notifications"
      bind:value={settings.notifications}
      onChange={updateSetting('notifications')}
    />
    <p class="setting-description">Allow desktop notifications</p>
  </div>
  
  <div class="setting-group">
    <Switch 
      label="Auto Save"
      size="small"
      bind:value={settings.autoSave}
      onChange={updateSetting('autoSave')}
    />
    <p class="setting-description">Automatically save your work</p>
  </div>
</div>
```

## Best Practices

### 1. Provide Immediate Feedback
```svelte
<script lang="ts">
  let isOnline: boolean = true;
  
  const toggleOnlineStatus = (status: boolean): void => {
    isOnline = status;
    
    // Show status change notification
    const message = status ? 'Online' : 'Offline';
    showToast(message);
  };
</script>

<Switch 
  label={`Status: ${isOnline ? 'Online' : 'Offline'}`}
  bind:value={isOnline}
  onChange={toggleOnlineStatus}
/>
```

### 2. Conditional Disabling
```svelte
<script lang="ts">
  let isPremiumUser: boolean = false;
  let advancedFeatures: boolean = false;
  
  $: canUseAdvancedFeatures = isPremiumUser;
</script>

<Switch 
  label="Advanced Features"
  disabled={!canUseAdvancedFeatures}
  bind:value={advancedFeatures}
/>
{#if !canUseAdvancedFeatures}
  <p class="upgrade-hint">Upgrade to premium to use this feature</p>
{/if}
```