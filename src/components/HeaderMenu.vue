<template>
  <div id="header-menu">
    <div class="menu-panel" v-show="isShowMenu">
      <el-dropdown placement="bottom-end" @command="handleCommand">
        <span class="el-dropdown-link">
          <div class="header-icon">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="30"
              height="30"
              viewBox="0 0 512 512"
            >
              <g />
              <path d="M32 96h448v96h-448zM32 224h448v96h-448zM32 352h448v96h-448z" fill="#fff" />
            </svg>
          </div>
        </span>
        <el-dropdown-menu slot="dropdown" class="header-dropdown">
          <el-dropdown-item icon="el-icon-s-home" command="/">首页</el-dropdown-item>
          <el-dropdown-item icon="el-icon-user-solid" command="/about">关于</el-dropdown-item>
          <el-dropdown-item icon="el-icon-s-grid" command="/categories">分类</el-dropdown-item>
          <el-dropdown-item icon="el-icon-s-claim" command="/tags">标签</el-dropdown-item>
          <el-dropdown-item icon="el-icon-s-cooperation" command="/archives">归档</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <div class="header-sign">
      <div class="header-banner">Yanfei</div>
      <div class="header-desc">我要认真</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShowMenu: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
    handleCommand(e) {
      if (this.$route.path != e) this.$router.push(e);
    }
  }
};
</script>

<style >
.header-icon {
  float: left;
  margin-top: 40px;
}
.header-banner {
  font-size: 24px;
  padding-top: 30px;
}
.header-desc {
  font-size: 10px;
  color: #bbb;
  margin-top: 10px;
}
.menu-panel {
  margin-left: 30px;
  position: absolute;
}
.header-dropdown .el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: #f5f7f9;
  color: #000;
}
</style>