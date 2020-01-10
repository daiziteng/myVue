<template>
  <el-aside width="200px" style="background-color:rgb(238,241,246)">
    <el-scrollbar style="height:100%">
      <el-menu :default-openeds="['1']" :default-active="defaultActive" router>
        <el-menu-item index="manage">
          <i class="el-icon-menu"></i>首页
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>
            导航一
          </template>
          <el-menu-item-group>
            <el-menu-item index="table">表格操作</el-menu-item>
            <el-menu-item index="echarts">图表展示</el-menu-item>
            <el-menu-item index="1-3">选项三</el-menu-item>
            <el-menu-item index="orderList">订单列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            导航二
          </template>
          <el-menu-item index="2-1">选项一</el-menu-item>
          <el-menu-item index="2-2">选项二</el-menu-item>
          <el-menu-item index="2-3">选项三</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>
            导航三
          </template>
          <el-menu-item index="3-1">选项一</el-menu-item>
          <el-menu-item index="3-2">选项二</el-menu-item>
          <el-menu-item index="3-3">选项三</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    defaultActive: function() {
      return this.$route.path.replace("/", "");
    }
  }
};
</script>


<style scoped>
.el-aside {
  background-color: #d3dce6;
  color: #333;
}
</style>