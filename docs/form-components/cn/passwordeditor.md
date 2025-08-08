# PasswordEditor 密码编辑器组件

PasswordEditor 组件提供安全的密码输入字段，内置可见性切换功能，允许用户显示/隐藏密码内容，在保持安全性的同时提供更好的可用性。

## 功能特性

- **安全密码输入**：带有掩码输入的标准密码字段
- **可见性切换**：眼睛图标用于显示/隐藏密码文本
- **CommonEditor 集成**：基于统一的 CommonEditor 组件构建
- **变体支持**：多种样式变体（plain、outlined、filled）
- **状态管理**：适当处理只读和禁用状态
- **事件转发**：转发标准输入事件（blur、focus）
- **紧凑模式**：可选的紧凑显示模式

## 导入

```typescript
import PasswordEditor from '@ticatec/uniface-element/PasswordEditor';
```

## 基本用法

### 简单密码字段

```svelte
<script>
  import PasswordEditor from '@ticatec/uniface-element/PasswordEditor';
  
  let password = '';
</script>

<PasswordEditor 
  bind:value={password}
  placeholder="请输入密码"
/>
```

### 样式化密码字段

```svelte
<script>
  import PasswordEditor from '@ticatec/uniface-element/PasswordEditor';
  
  let userPassword = '';
</script>

<PasswordEditor 
  bind:value={userPassword}
  variant="outlined"
  placeholder="密码"
  style="width: 300px;"
/>
```

### 紧凑密码字段

```svelte
<script>
  import PasswordEditor from '@ticatec/uniface-element/PasswordEditor';
  
  let pin = '';
</script>

<PasswordEditor 
  bind:value={pin}
  compact={true}
  variant="filled"
  placeholder="PIN码"
/>
```

## API 参考

### 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `value` | `string` | `''` | 密码值 |
| `disabled` | `boolean` | `false` | 输入框是否禁用 |
| `readonly` | `boolean` | `false` | 输入框是否只读 |
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | 视觉变体 |
| `compact` | `boolean` | `false` | 紧凑显示模式 |
| `style` | `string` | `''` | 附加CSS样式 |

### 事件

- `on:blur` - 输入框失去焦点时触发
- `on:focus` - 输入框获得焦点时触发

## 高级示例

### 登录表单

```svelte
<script>
  import PasswordEditor from '@ticatec/uniface-element/PasswordEditor';
  
  let credentials = {
    username: '',
    password: ''
  };
  
  let loginError = '';
  let isLoading = false;
  
  const handleLogin = async () => {
    if (!credentials.username || !credentials.password) {
      loginError = '请输入用户名和密码';
      return;
    }
    
    isLoading = true;
    loginError = '';
    
    try {
      // 模拟登录 API 调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟成功登录
      if (credentials.username === 'admin' && credentials.password === 'password123') {
        alert('登录成功！');
        credentials = { username: '', password: '' };
      } else {
        loginError = '用户名或密码错误';
      }
    } catch (error) {
      loginError = '登录失败，请重试';
    } finally {
      isLoading = false;
    }
  };
  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !isLoading) {
      handleLogin();
    }
  };
</script>

<div class="login-form" style="max-width: 400px; margin: 50px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
  <h2 style="text-align: center; margin-bottom: 30px;">登录</h2>
  
  <div class="form-field" style="margin-bottom: 20px;">
    <label for="username" style="display: block; margin-bottom: 5px; font-weight: bold;">用户名</label>
    <input 
      id="username"
      type="text" 
      bind:value={credentials.username}
      placeholder="请输入用户名"
      disabled={isLoading}
      on:keydown={handleKeyDown}
      style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px;"
    />
  </div>
  
  <div class="form-field" style="margin-bottom: 20px;">
    <label for="password" style="display: block; margin-bottom: 5px; font-weight: bold;">密码</label>
    <PasswordEditor 
      bind:value={credentials.password}
      variant="outlined"
      disabled={isLoading}
      placeholder="请输入密码"
      style="width: 100%;"
      on:keydown={handleKeyDown}
    />
  </div>
  
  {#if loginError}
    <div class="error-message" style="color: #d32f2f; margin-bottom: 15px; font-size: 0.875em;">
      {loginError}
    </div>
  {/if}
  
  <button 
    on:click={handleLogin}
    disabled={isLoading}
    style="width: 100%; padding: 12px; background: #1976d2; color: white; border: none; border-radius: 4px; cursor: {isLoading ? 'not-allowed' : 'pointer'};"
  >
    {isLoading ? '登录中...' : '登录'}
  </button>
</div>
```

### 密码修改表单

```svelte
<script>
  import PasswordEditor from '@ticatec/uniface-element/PasswordEditor';
  
  let passwordForm = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  
  let errors = {};
  let showSuccess = false;
  
  const validatePassword = (password) => {
    if (password.length < 8) return '密码长度至少需要8个字符';
    if (!/(?=.*[a-z])/.test(password)) return '密码必须包含至少一个小写字母';
    if (!/(?=.*[A-Z])/.test(password)) return '密码必须包含至少一个大写字母';
    if (!/(?=.*\d)/.test(password)) return '密码必须包含至少一个数字';
    if (!/(?=.*[@$!%*?&])/.test(password)) return '密码必须包含至少一个特殊字符';
    return '';
  };
  
  const validateForm = () => {
    errors = {};
    
    if (!passwordForm.currentPassword) {
      errors.currentPassword = '当前密码是必填项';
    }
    
    if (!passwordForm.newPassword) {
      errors.newPassword = '新密码是必填项';
    } else {
      const passwordError = validatePassword(passwordForm.newPassword);
      if (passwordError) errors.newPassword = passwordError;
    }
    
    if (!passwordForm.confirmPassword) {
      errors.confirmPassword = '密码确认是必填项';
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errors.confirmPassword = '密码不匹配';
    }
    
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = () => {
    if (validateForm()) {
      // 模拟 API 调用
      setTimeout(() => {
        showSuccess = true;
        passwordForm = { currentPassword: '', newPassword: '', confirmPassword: '' };
        setTimeout(() => showSuccess = false, 3000);
      }, 500);
    }
  };
  
  const handleFieldBlur = (field) => () => {
    if (field === 'newPassword' && passwordForm.newPassword) {
      const error = validatePassword(passwordForm.newPassword);
      if (error) errors.newPassword = error;
      else delete errors.newPassword;
      errors = {...errors};
    }
    
    if (field === 'confirmPassword' && passwordForm.confirmPassword && passwordForm.newPassword) {
      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        errors.confirmPassword = '密码不匹配';
      } else {
        delete errors.confirmPassword;
      }
      errors = {...errors};
    }
  };
</script>

<div class="password-change-form" style="max-width: 500px; margin: 50px auto; padding: 30px; border: 1px solid #e0e0e0; border-radius: 8px; background: #fafafa;">
  <h2 style="text-align: center; margin-bottom: 30px; color: #333;">修改密码</h2>
  
  {#if showSuccess}
    <div class="success-message" style="background: #d4edda; color: #155724; padding: 10px; border-radius: 4px; margin-bottom: 20px; text-align: center;">
      密码修改成功！
    </div>
  {/if}
  
  <div class="form-field" style="margin-bottom: 25px;">
    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #555;">当前密码</label>
    <PasswordEditor 
      bind:value={passwordForm.currentPassword}
      variant="outlined"
      placeholder="请输入当前密码"
      style="width: 100%;"
    />
    {#if errors.currentPassword}
      <div class="field-error" style="color: #d32f2f; font-size: 0.875em; margin-top: 5px;">
        {errors.currentPassword}
      </div>
    {/if}
  </div>
  
  <div class="form-field" style="margin-bottom: 25px;">
    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #555;">新密码</label>
    <PasswordEditor 
      bind:value={passwordForm.newPassword}
      variant="outlined"
      placeholder="请输入新密码"
      style="width: 100%;"
      on:blur={handleFieldBlur('newPassword')}
    />
    {#if errors.newPassword}
      <div class="field-error" style="color: #d32f2f; font-size: 0.875em; margin-top: 5px;">
        {errors.newPassword}
      </div>
    {:else if passwordForm.newPassword}
      <div class="password-requirements" style="font-size: 0.75em; color: #666; margin-top: 5px;">
        密码要求：8个以上字符，包含大写字母、小写字母、数字、特殊字符
      </div>
    {/if}
  </div>
  
  <div class="form-field" style="margin-bottom: 30px;">
    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #555;">确认新密码</label>
    <PasswordEditor 
      bind:value={passwordForm.confirmPassword}
      variant="outlined"
      placeholder="请确认新密码"
      style="width: 100%;"
      on:blur={handleFieldBlur('confirmPassword')}
    />
    {#if errors.confirmPassword}
      <div class="field-error" style="color: #d32f2f; font-size: 0.875em; margin-top: 5px;">
        {errors.confirmPassword}
      </div>
    {/if}
  </div>
  
  <div class="form-actions" style="display: flex; gap: 10px;">
    <button 
      type="button"
      on:click={() => passwordForm = { currentPassword: '', newPassword: '', confirmPassword: '' }}
      style="flex: 1; padding: 12px; background: #f5f5f5; color: #333; border: 1px solid #ddd; border-radius: 4px; cursor: pointer;"
    >
      取消
    </button>
    <button 
      type="button"
      on:click={handleSubmit}
      style="flex: 2; padding: 12px; background: #1976d2; color: white; border: none; border-radius: 4px; cursor: pointer;"
    >
      修改密码
    </button>
  </div>
</div>
```

### 注册表单密码确认

```svelte
<script>
  import PasswordEditor from '@ticatec/uniface-element/PasswordEditor';
  
  let registrationForm = {
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  };
  
  let fieldErrors = {};
  let passwordStrength = '';
  
  $: {
    // 实时密码强度计算
    if (registrationForm.password) {
      let strength = 0;
      if (registrationForm.password.length >= 8) strength++;
      if (/[A-Z]/.test(registrationForm.password)) strength++;
      if (/[a-z]/.test(registrationForm.password)) strength++;
      if (/\d/.test(registrationForm.password)) strength++;
      if (/[@$!%*?&]/.test(registrationForm.password)) strength++;
      
      switch (strength) {
        case 0:
        case 1: passwordStrength = '非常弱'; break;
        case 2: passwordStrength = '弱'; break;
        case 3: passwordStrength = '一般'; break;
        case 4: passwordStrength = '良好'; break;
        case 5: passwordStrength = '强'; break;
      }
    } else {
      passwordStrength = '';
    }
  }
  
  const getStrengthColor = (strength) => {
    switch (strength) {
      case '非常弱': return '#d32f2f';
      case '弱': return '#f57c00';
      case '一般': return '#fbc02d';
      case '良好': return '#388e3c';
      case '强': return '#1976d2';
      default: return '#666';
    }
  };
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const handleSubmit = () => {
    fieldErrors = {};
    
    if (!registrationForm.email) {
      fieldErrors.email = '邮箱是必填项';
    } else if (!validateEmail(registrationForm.email)) {
      fieldErrors.email = '请输入有效的邮箱地址';
    }
    
    if (!registrationForm.password) {
      fieldErrors.password = '密码是必填项';
    } else if (passwordStrength === '非常弱' || passwordStrength === '弱') {
      fieldErrors.password = '密码强度太弱';
    }
    
    if (!registrationForm.confirmPassword) {
      fieldErrors.confirmPassword = '密码确认是必填项';
    } else if (registrationForm.password !== registrationForm.confirmPassword) {
      fieldErrors.confirmPassword = '密码不匹配';
    }
    
    if (!registrationForm.acceptTerms) {
      fieldErrors.terms = '您必须同意条款和条件';
    }
    
    if (Object.keys(fieldErrors).length === 0) {
      alert('注册成功！');
      registrationForm = { email: '', password: '', confirmPassword: '', acceptTerms: false };
    }
    
    fieldErrors = {...fieldErrors};
  };
</script>

<div class="registration-form" style="max-width: 450px; margin: 50px auto; padding: 30px; border: 1px solid #e0e0e0; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
  <h2 style="text-align: center; margin-bottom: 30px; color: #1976d2;">创建账户</h2>
  
  <div class="form-field" style="margin-bottom: 20px;">
    <label style="display: block; margin-bottom: 8px; font-weight: 600;">邮箱地址</label>
    <input 
      type="email"
      bind:value={registrationForm.email}
      placeholder="your.email@example.com"
      style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;"
      class:error={fieldErrors.email}
    />
    {#if fieldErrors.email}
      <div class="error" style="color: #d32f2f; font-size: 0.875em; margin-top: 4px;">
        {fieldErrors.email}
      </div>
    {/if}
  </div>
  
  <div class="form-field" style="margin-bottom: 20px;">
    <label style="display: block; margin-bottom: 8px; font-weight: 600;">密码</label>
    <PasswordEditor 
      bind:value={registrationForm.password}
      variant="outlined"
      placeholder="创建强密码"
      style="width: 100%;"
    />
    {#if passwordStrength}
      <div class="password-strength" style="margin-top: 5px; font-size: 0.875em;">
        强度: <span style="color: {getStrengthColor(passwordStrength)}; font-weight: bold;">{passwordStrength}</span>
      </div>
    {/if}
    {#if fieldErrors.password}
      <div class="error" style="color: #d32f2f; font-size: 0.875em; margin-top: 4px;">
        {fieldErrors.password}
      </div>
    {/if}
  </div>
  
  <div class="form-field" style="margin-bottom: 25px;">
    <label style="display: block; margin-bottom: 8px; font-weight: 600;">确认密码</label>
    <PasswordEditor 
      bind:value={registrationForm.confirmPassword}
      variant="outlined"
      placeholder="确认您的密码"
      style="width: 100%;"
    />
    {#if fieldErrors.confirmPassword}
      <div class="error" style="color: #d32f2f; font-size: 0.875em; margin-top: 4px;">
        {fieldErrors.confirmPassword}
      </div>
    {/if}
  </div>
  
  <div class="form-field" style="margin-bottom: 25px;">
    <label style="display: flex; align-items: center; font-size: 0.9em; color: #555;">
      <input 
        type="checkbox" 
        bind:checked={registrationForm.acceptTerms}
        style="margin-right: 8px;"
      />
      我同意 <a href="#" style="color: #1976d2; text-decoration: none;">条款和条件</a>
    </label>
    {#if fieldErrors.terms}
      <div class="error" style="color: #d32f2f; font-size: 0.875em; margin-top: 4px;">
        {fieldErrors.terms}
      </div>
    {/if}
  </div>
  
  <button 
    type="button"
    on:click={handleSubmit}
    style="width: 100%; padding: 14px; background: #1976d2; color: white; border: none; border-radius: 6px; font-size: 16px; font-weight: 600; cursor: pointer;"
  >
    创建账户
  </button>
</div>
```

## 最佳实践

1. **安全第一**：永远不要以明文形式存储或传输密码
2. **可见性切换**：眼睛图标帮助用户验证密码输入
3. **验证**：实施适当的密码强度验证
4. **无障碍访问**：提供清晰的标签和适当的ARIA属性
5. **确认字段**：在注册表单中始终包含密码确认
6. **只读状态**：适当处理只读状态，防止在不可编辑时切换
7. **表单集成**：与适当的表单验证和提交处理一起使用

## 样式说明

- 组件继承 CommonEditor 的样式
- 眼睛图标根据当前可见性状态变化（眼睛/眼睛关闭）
- 支持所有 CommonEditor 变体和样式选项
- 自定义样式可以通过`style`属性应用

## 安全注意事项

- 密码掩码自动处理
- 只读模式下禁用可见性切换
- 组件不存储密码历史或实现自动完成
- 生产环境中使用HTTPS进行安全传输

## 无障碍访问功能

- 在"password"和"text"输入类型之间适当切换
- 可见性切换期间保持焦点管理
- 与标准输入行为兼容的屏幕阅读器
- 交互元素的清晰视觉指示器