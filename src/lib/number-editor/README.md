# NumberEditor

## 使用方法

```sveltehtml
<NumberEditor filled max={500} suffix="KG" compact/>
```

## 属性
| 属性            | 描述               | 类型              |
|---|------------------|-----------------|
| disabled      | 当前的数字输入框是否可用     | true / false    |
| readonly      | 当前的数字输入框为只读或者可编辑 | true / false    |
| outlined      | 当前的是否带边框         | true / false    |
| filled        | 当前输入框是否填充        | true / false    |
| compact       | 按照紧凑格式显示         | true / false    |
| style         | 自定义style         | 字符串             |
| value         | 值                | true / false    |
| precision     | 精度               | 整数              |
| suffix        | 后缀               | 字符              |
| prefix        | 前缀               | 字符              |
| allowNegative | 是否可以是负数          | true / false    |
| displayMode   | 最小值              | 0(格式显示) / 1（正常） |
| max           | 最大值              | 数字              |


