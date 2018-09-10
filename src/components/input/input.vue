<template lang="html">
  <input type="text" name="input" :value="inputValue">
</template>

<script>
export default {
  name: 'jy-input',
  data () {
    return{
      inputValue: '输入框组件测试按需引入'
    }
  }
}
</script>

<style lang="css">
input{
  border: 1px solid red;
  color: #333;
}
</style>
