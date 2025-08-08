# PasswordEditor Component

The PasswordEditor component provides a secure password input field with built-in visibility toggle functionality, allowing users to show/hide password content for better usability while maintaining security.

## Features

- **Secure Password Input**: Standard password field with masked input
- **Visibility Toggle**: Eye icon to show/hide password text
- **CommonEditor Integration**: Built on the unified CommonEditor component
- **Variant Support**: Multiple styling variants (plain, outlined, filled)
- **State Management**: Handles readonly and disabled states appropriately
- **Event Forwarding**: Standard input events (blur, focus) are forwarded
- **Compact Mode**: Optional compact display mode

## Import

```typescript
import { PasswordEditor } from '@ticatec/uniface-element/PasswordEditor';
```

## Basic Usage

### Simple Password Field

```svelte
<script>
  import { PasswordEditor } from '@ticatec/uniface-element/PasswordEditor';
  
  let password = '';
</script>

<PasswordEditor 
  bind:value={password}
  placeholder="Enter your password"
/>
```

### Styled Password Field

```svelte
<script>
  import { PasswordEditor } from '@ticatec/uniface-element/PasswordEditor';
  
  let userPassword = '';
</script>

<PasswordEditor 
  bind:value={userPassword}
  variant="outlined"
  placeholder="Password"
  style="width: 300px;"
/>
```

### Compact Password Field

```svelte
<script>
  import { PasswordEditor } from '@ticatec/uniface-element/PasswordEditor';
  
  let pin = '';
</script>

<PasswordEditor 
  bind:value={pin}
  compact={true}
  variant="filled"
  placeholder="PIN"
/>
```

## API Reference

### Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `string` | `''` | The password value |
| `disabled` | `boolean` | `false` | Whether the input is disabled |
| `readonly` | `boolean` | `false` | Whether the input is read-only |
| `variant` | `'' \| 'plain' \| 'outlined' \| 'filled'` | `''` | Visual variant |
| `compact` | `boolean` | `false` | Compact display mode |
| `style` | `string` | `''` | Additional CSS styles |

### Events

- `on:blur` - Fired when input loses focus
- `on:focus` - Fired when input gains focus

## Advanced Examples

### Login Form

```svelte
<script>
  import { PasswordEditor } from '@ticatec/uniface-element/PasswordEditor';
  
  let credentials = {
    username: '',
    password: ''
  };
  
  let loginError = '';
  let isLoading = false;
  
  const handleLogin = async () => {
    if (!credentials.username || !credentials.password) {
      loginError = 'Please enter both username and password';
      return;
    }
    
    isLoading = true;
    loginError = '';
    
    try {
      // Simulate login API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      if (credentials.username === 'admin' && credentials.password === 'password123') {
        alert('Login successful!');
        credentials = { username: '', password: '' };
      } else {
        loginError = 'Invalid username or password';
      }
    } catch (error) {
      loginError = 'Login failed. Please try again.';
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
  <h2 style="text-align: center; margin-bottom: 30px;">Login</h2>
  
  <div class="form-field" style="margin-bottom: 20px;">
    <label for="username" style="display: block; margin-bottom: 5px; font-weight: bold;">Username</label>
    <input 
      id="username"
      type="text" 
      bind:value={credentials.username}
      placeholder="Enter username"
      disabled={isLoading}
      on:keydown={handleKeyDown}
      style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px;"
    />
  </div>
  
  <div class="form-field" style="margin-bottom: 20px;">
    <label for="password" style="display: block; margin-bottom: 5px; font-weight: bold;">Password</label>
    <PasswordEditor 
      bind:value={credentials.password}
      variant="outlined"
      disabled={isLoading}
      placeholder="Enter password"
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
    {isLoading ? 'Logging in...' : 'Login'}
  </button>
</div>
```

### Password Change Form

```svelte
<script>
  import { PasswordEditor } from '@ticatec/uniface-element/PasswordEditor';
  
  let passwordForm = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  
  let errors = {};
  let showSuccess = false;
  
  const validatePassword = (password) => {
    if (password.length < 8) return 'Password must be at least 8 characters long';
    if (!/(?=.*[a-z])/.test(password)) return 'Password must contain at least one lowercase letter';
    if (!/(?=.*[A-Z])/.test(password)) return 'Password must contain at least one uppercase letter';
    if (!/(?=.*\d)/.test(password)) return 'Password must contain at least one number';
    if (!/(?=.*[@$!%*?&])/.test(password)) return 'Password must contain at least one special character';
    return '';
  };
  
  const validateForm = () => {
    errors = {};
    
    if (!passwordForm.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }
    
    if (!passwordForm.newPassword) {
      errors.newPassword = 'New password is required';
    } else {
      const passwordError = validatePassword(passwordForm.newPassword);
      if (passwordError) errors.newPassword = passwordError;
    }
    
    if (!passwordForm.confirmPassword) {
      errors.confirmPassword = 'Password confirmation is required';
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = () => {
    if (validateForm()) {
      // Simulate API call
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
        errors.confirmPassword = 'Passwords do not match';
      } else {
        delete errors.confirmPassword;
      }
      errors = {...errors};
    }
  };
</script>

<div class="password-change-form" style="max-width: 500px; margin: 50px auto; padding: 30px; border: 1px solid #e0e0e0; border-radius: 8px; background: #fafafa;">
  <h2 style="text-align: center; margin-bottom: 30px; color: #333;">Change Password</h2>
  
  {#if showSuccess}
    <div class="success-message" style="background: #d4edda; color: #155724; padding: 10px; border-radius: 4px; margin-bottom: 20px; text-align: center;">
      Password changed successfully!
    </div>
  {/if}
  
  <div class="form-field" style="margin-bottom: 25px;">
    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #555;">Current Password</label>
    <PasswordEditor 
      bind:value={passwordForm.currentPassword}
      variant="outlined"
      placeholder="Enter current password"
      style="width: 100%;"
    />
    {#if errors.currentPassword}
      <div class="field-error" style="color: #d32f2f; font-size: 0.875em; margin-top: 5px;">
        {errors.currentPassword}
      </div>
    {/if}
  </div>
  
  <div class="form-field" style="margin-bottom: 25px;">
    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #555;">New Password</label>
    <PasswordEditor 
      bind:value={passwordForm.newPassword}
      variant="outlined"
      placeholder="Enter new password"
      style="width: 100%;"
      on:blur={handleFieldBlur('newPassword')}
    />
    {#if errors.newPassword}
      <div class="field-error" style="color: #d32f2f; font-size: 0.875em; margin-top: 5px;">
        {errors.newPassword}
      </div>
    {:else if passwordForm.newPassword}
      <div class="password-requirements" style="font-size: 0.75em; color: #666; margin-top: 5px;">
        Password must contain: 8+ characters, uppercase, lowercase, number, special character
      </div>
    {/if}
  </div>
  
  <div class="form-field" style="margin-bottom: 30px;">
    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #555;">Confirm New Password</label>
    <PasswordEditor 
      bind:value={passwordForm.confirmPassword}
      variant="outlined"
      placeholder="Confirm new password"
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
      Cancel
    </button>
    <button 
      type="button"
      on:click={handleSubmit}
      style="flex: 2; padding: 12px; background: #1976d2; color: white; border: none; border-radius: 4px; cursor: pointer;"
    >
      Change Password
    </button>
  </div>
</div>
```

### Registration Form with Password Confirmation

```svelte
<script>
  import { PasswordEditor } from '@ticatec/uniface-element/PasswordEditor';
  
  let registrationForm = {
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  };
  
  let fieldErrors = {};
  let passwordStrength = '';
  
  $: {
    // Real-time password strength calculation
    if (registrationForm.password) {
      let strength = 0;
      if (registrationForm.password.length >= 8) strength++;
      if (/[A-Z]/.test(registrationForm.password)) strength++;
      if (/[a-z]/.test(registrationForm.password)) strength++;
      if (/\d/.test(registrationForm.password)) strength++;
      if (/[@$!%*?&]/.test(registrationForm.password)) strength++;
      
      switch (strength) {
        case 0:
        case 1: passwordStrength = 'Very Weak'; break;
        case 2: passwordStrength = 'Weak'; break;
        case 3: passwordStrength = 'Fair'; break;
        case 4: passwordStrength = 'Good'; break;
        case 5: passwordStrength = 'Strong'; break;
      }
    } else {
      passwordStrength = '';
    }
  }
  
  const getStrengthColor = (strength) => {
    switch (strength) {
      case 'Very Weak': return '#d32f2f';
      case 'Weak': return '#f57c00';
      case 'Fair': return '#fbc02d';
      case 'Good': return '#388e3c';
      case 'Strong': return '#1976d2';
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
      fieldErrors.email = 'Email is required';
    } else if (!validateEmail(registrationForm.email)) {
      fieldErrors.email = 'Please enter a valid email address';
    }
    
    if (!registrationForm.password) {
      fieldErrors.password = 'Password is required';
    } else if (passwordStrength === 'Very Weak' || passwordStrength === 'Weak') {
      fieldErrors.password = 'Password is too weak';
    }
    
    if (!registrationForm.confirmPassword) {
      fieldErrors.confirmPassword = 'Password confirmation is required';
    } else if (registrationForm.password !== registrationForm.confirmPassword) {
      fieldErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!registrationForm.acceptTerms) {
      fieldErrors.terms = 'You must accept the terms and conditions';
    }
    
    if (Object.keys(fieldErrors).length === 0) {
      alert('Registration successful!');
      registrationForm = { email: '', password: '', confirmPassword: '', acceptTerms: false };
    }
    
    fieldErrors = {...fieldErrors};
  };
</script>

<div class="registration-form" style="max-width: 450px; margin: 50px auto; padding: 30px; border: 1px solid #e0e0e0; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
  <h2 style="text-align: center; margin-bottom: 30px; color: #1976d2;">Create Account</h2>
  
  <div class="form-field" style="margin-bottom: 20px;">
    <label style="display: block; margin-bottom: 8px; font-weight: 600;">Email Address</label>
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
    <label style="display: block; margin-bottom: 8px; font-weight: 600;">Password</label>
    <PasswordEditor 
      bind:value={registrationForm.password}
      variant="outlined"
      placeholder="Create a strong password"
      style="width: 100%;"
    />
    {#if passwordStrength}
      <div class="password-strength" style="margin-top: 5px; font-size: 0.875em;">
        Strength: <span style="color: {getStrengthColor(passwordStrength)}; font-weight: bold;">{passwordStrength}</span>
      </div>
    {/if}
    {#if fieldErrors.password}
      <div class="error" style="color: #d32f2f; font-size: 0.875em; margin-top: 4px;">
        {fieldErrors.password}
      </div>
    {/if}
  </div>
  
  <div class="form-field" style="margin-bottom: 25px;">
    <label style="display: block; margin-bottom: 8px; font-weight: 600;">Confirm Password</label>
    <PasswordEditor 
      bind:value={registrationForm.confirmPassword}
      variant="outlined"
      placeholder="Confirm your password"
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
      I agree to the <a href="#" style="color: #1976d2; text-decoration: none;">Terms and Conditions</a>
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
    Create Account
  </button>
</div>
```

## Best Practices

1. **Security First**: Never store or transmit passwords in plain text
2. **Visibility Toggle**: The eye icon helps users verify their password entry
3. **Validation**: Implement proper password strength validation
4. **Accessibility**: Provide clear labels and appropriate ARIA attributes
5. **Confirmation Fields**: Always include password confirmation in registration forms
6. **Readonly States**: Handle readonly state appropriately to prevent toggle when not editable
7. **Form Integration**: Use with proper form validation and submission handling

## Styling Notes

- The component inherits styling from CommonEditor
- Eye icon changes based on current visibility state (eye/eye-off)
- Supports all CommonEditor variants and styling options
- Custom styles can be applied via the `style` prop

## Security Considerations

- Password masking is handled automatically
- Visibility toggle is disabled in readonly mode
- Component doesn't store password history or implement auto-complete
- Use HTTPS in production for secure transmission

## Accessibility Features

- Proper input type switching between "password" and "text"
- Focus management preserved during visibility toggle
- Screen reader compatible with standard input behaviors
- Clear visual indicators for interactive elements