<template lang="html">
  <input 
    class="button" 
    type="button" 
    :name="name" 
    :value="value"
    @click="buttonClick"
    @mouseenter="buttonEnter"/>
</template>

<script>
export default {
  name: 'jy-button',
  data () {
    return{
    }
  },
  props: {
    value: {
      type: String,
      default: '按钮'
    },
    name: {
      type: String,
      default: 'button'
    }
  },
  methods: {
    buttonClick (ev) {
      this.$emit('click', 1)
    },
    buttonEnter (ev) {
      this.$emit('enter', 1)
    }
  }
}
</script>

<style lang="css">
.button{
  border: 1px solid #000;
  background: none;
  padding: 4px 8px;
  cursor: pointer;
  outline: none;
}
</style>
