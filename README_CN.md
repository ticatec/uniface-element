# Uniface Web UI 组件

Uniface Web UI是一套基于svelte 5.0的组件，本套框架可以普通的web网站页面，也可用于web应用的开发；尤其是针对web开发做了更多的优化，是的web应用开发更加简单。
如果想提高web应用的开发，建议配合Uniface App Templates组件库一起使用。

## 页面全局组件

页面全局组件是直接加载在body上的，各个组件使用的时候不需要单独加载引入，并通过全局方法直接使用。当前包括以下组件

通常这一组控件在系统主页面直接加载，示例如下：

```sveltehtml
<script lang="ts">
    
    import ToastBoard from "@ticatec/uniface-web/toast";
    import {DialogBoard} from "@ticatec/uniface-web/dialog";
    import IndicatorBoard from "@ticatec/uniface-web/indicator";
    import MessageBoxBoard from "@ticatec/uniface-web/message-box";
    
</script>

<div>
    <!-- 主页面 -->
</div>

<IndicatorBoard/>
<DialogBoard/>
<ToastBoard/>
<MessageBoxBoard/>
```
### 异步操作指示器 `Indicator`

通常做异步操作的时候，用于遮罩当前的页面，并显示操作信息，避免用户的异常操作。

#### 使用方法

```ts
try {
    window.Indicator.show('Loading data...');
    //异步调用 await service.search();
} finally {
    window.Indicator.hide();
}
```

### 弹出消息 `Toast`

通常用于显示操作结果，比如创建用户返回的异常信息。

#### 使用方法

```ts
type ShowToast = (msg: string, type: "error" | "info" | "success" = "error", duration: number = 3) => void;

window.Toast.show("Can't delete an active user", "error", 2);
```
参数说明：
* `msg`: 待显示的信息
* `type`: 信息的类别，可以显示不同的颜色，包括三种类型，错误，信息提示和成功，如果参数为空，默认为错误
* `duration`: 信息展示的时长，单位为秒，如果没有传，默认为3秒

### 消息提示框 `MessageBox`

#### 使用方法

##### 接口定义

```ts
/**
 * @param message 提示的信息
 * @param title 标题
 * @param escapeHTML 是否转义HTML
 */
type ShowFun = (message: string, title?: string, escapeHTML?:boolean) => Promise<void>;

/**
 * @param message 提示的信息
 * @param title 标题
 * @param escapeHTML 是否转义HTML
 * @type 类型 info或者warning
 */
type ShowConfirmFun = (message: string, title?: string | null, escapeHTML?:boolean, type?: 'info' | 'warning') => Promise<any>;;

/**
 * 触发的按钮，用于showConfirm的返回结果
 */
enum ModuleResult {
    MR_OK= 1,
    MR_CANCEL= 2,
    MR_CLOSE= 3
}

export default interface IMessageBox {
    showInfo: ShowFun;
    showConfirm: ShowConfirmFun;
}
```
##### 示例

```ts
import {ModuleResult} from "./IMessageBox";

const closeConfirm = async (user: any) => {
    if (await window.MessageBox.showConfirm(`确定要删除当前用户[${user.name}]吗？`) == ModuleResult.MR_OK) {
        //调用删除接口
    }
}

```

### 对话框窗口 `Dialog`

## 布局组件

组件库中提供三种布局方式可以简单实现多种布局形式。

### 左右两栏布局 `SidebarLayout`

可以实现左右两栏布局，通常左边sidebar实现导航，右边为内容。根据需要，右边可以实现上下分割，上面为顶部状态栏，下面为内容栏。  
具体使用方法参考[左右两栏布局详细](./doc/SidebarLayout_CN.md)

### T型布局 `HeaderLayout`

用于实现上下布局，通常顶部为页眉栏，下面内容区，内容区可以根据需要，在左边建立sidebar用于导航栏。  
具体的使用方法参考[T型布局](./doc/HeaderLayout_CN.md)

### 经典布局 'ClassicLayout'

经典布局为全节布局，包括顶部页眉栏，下部状态栏和中间的内容区，内容区根据需要可以包含左边的导航栏和右边的注解栏。  
具体的方法参考[经典布局](./doc/ClassicLayout_CN.md)


