<template>
  <el-header style="text-align: right; font-size: 12px;">
    <el-dropdown @command="handleCommand">
      <i class="el-icon-setting" style="margin-right: 15px;cursor:pointer;"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="home">首页</el-dropdown-item>
        <el-dropdown-item command="signout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <span style="font-size:14px">戴子藤</span>
  </el-header>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleCommand(command) {
      console.log(command);
      if (command == "signout") {
        console.log(localStorage);
        localStorage.removeItem("Authorization");
        this.$router.push("/");
      } else if (command == "home") {
        this.$router.push("/manage");
      }
    }
  }
};
</script>
<style scoped>
.el-header {
  position: sticky;
  top: 0px;
  z-index: 999;
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
</style>