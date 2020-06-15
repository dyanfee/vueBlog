<template>
  <div id="nav-menu">
    <el-menu
      class="menu-item"
      default-active="1"
      background-color="#fff"
      text-color="#555555"
      active-text-color="#000"
      router
    >
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <!-- 路由跳转默认为index 可以用route指定路径 -->
      <el-menu-item index="2" route="/about">
        <i class="el-icon-user-solid"></i>
        <span slot="title">关于</span>
      </el-menu-item>
      <el-menu-item index="/tags">
        <i class="el-icon-s-claim"></i>
        <span slot="title">标签</span>
      </el-menu-item>
      <el-menu-item index="/categories">
        <i class="el-icon-s-grid"></i>
        <span slot="title">分类</span>
      </el-menu-item>
      <el-menu-item index="/archives">
        <i class="el-icon-s-cooperation"></i>
        <span slot="title">归档</span>
      </el-menu-item>
      <!-- <el-menu-item index="/admin">
        <i class="el-icon-s-cooperation"></i>
        <span slot="title">管理</span>
      </el-menu-item> -->
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "NavMenu",
  methods: {}
};
</script>

<style >
#nav-menu {
  margin-left: 20px;
}

.el-menu-item {
  width: 100%;
}
.el-menu {
  border-right: none;
}
.menu-item {
  margin: 20px 0;
  /* border: 1px solid rgba(0, 0, 0, 0.1); */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  text-align: left;
}
</style>