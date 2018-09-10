<!--
注意：具有交互功能的说明文档，需要有<script></script>标签，在标签元素中定义需要导出的vue实例。
在:::demo ::: 代码块中定义的模版<template></template>会作为导出的vue实例的模版，但是在代码块中的<script></script>中的内容仅作为展示，需注意。
-->
<script>
export default {
  data () {
    return {
      value: '测试测试'
    }
  }
}
</script>
## Input
介绍Input的使用
:::demo
``` html
<template>
  <jy-input
    :value="value"
  ></jy-input>
</template>
<script>
export default {
  data () {
    return {
      value: '测试测试'
    }
  }
}
</script>
```
:::
