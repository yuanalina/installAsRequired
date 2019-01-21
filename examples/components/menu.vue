<template lang="html">
  <div class="menu-model">
    <el-menu
      default-active="1"
      :unique-opened="true"
      :default-openeds="['1', '2', '3']"
      :default-active="defaultActive"
      :router="true"
    >
      <el-submenu index="1">
        <template slot="title">
          <span>开发指南</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/guide/install">安装</el-menu-item>
          <el-menu-item index="/guide/quikeStart">快速上手</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <span>通用模块</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/input">Input</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/button">Button</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      defaultActive: '/guide/install'
    }
  },
  created () {
    const path = this.$route.fullPath
    this.defaultActive = path == '/' ? '/guide/install' : path
  },
  methods: {
  }
}
</script>

<style lang="css">
</style>
