<template>
  <div id="admin">
    <el-container>
      <el-container class="main-container">
        <el-aside width="230px">
          <div class="admin-header">
            <span>后台管理</span>
          </div>
          <el-menu
            background-color="#00152a"
            text-color="#fff"
            :default-openeds="['1','2']"
            :default-active="menuSelect"
            router
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-message"></i>文章管理
              </template>
              <el-menu-item index="/admin/posts">文章列表</el-menu-item>
              <el-menu-item index="/admin/postEdit">新建博客</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i>网站信息
              </template>
              <el-menu-item index="/admin/profile">个人信息</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <el-row class="admin-banner">
            <el-col :span="2">
              <div style="{height:40px; font-size:26px;}">
                <i class="el-icon-set-up"></i>
              </div>
            </el-col>
            <el-col :span="18">
              <div class="admin-breadcrumb">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                  <el-breadcrumb-item v-for="item in pathList" :key="item.path">{{item.name}}</el-breadcrumb-item>
                </el-breadcrumb>
              </div>
            </el-col>
            <el-col class="admin-login-out" @click.native="adminLoginOut" :span="4">
              <i class="el-icon-s-custom"></i>
              退出登录
            </el-col>
          </el-row>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pathList: [],
      menuSelect: ""
    };
  },
  mounted() {
    this.menuSelect = this.$route.path;
  },
  methods: {
    adminLoginOut() {
      this.$confirm("确定退出登录吗", "提示", {}).then(() => {
        this.$store.dispatch("userLogout").then(res => {
          this.$router.push("/login");
        });
      });
    }
  },
  computed: {
    clientHeight() {
      return window.screen.availHeight;
    }
  },
  watch: {
    $route(to, from) {
      let matched = this.$route.matched.filter(item => item.name);
      this.pathList = matched;
      this.menuSelect = to.path;
    }
  }
};
</script>

<style>
.el-footer {
  color: #333;
  text-align: center;
}
.main-container {
  height: 100vh;
}
.el-aside {
  color: #333;
  background-color: #00152a;
  height: 100%;
}

.el-main {
  background-color: #f5f7f9;
  color: #333;
}
.admin-header {
  text-align: center;
  margin: 30px;
}
.admin-header span {
  font-size: 24px;
  font-weight: 700;
  line-height: 24px;
  color: #fff;

  background-color: #20a0ff;
  padding: 5px 10px;
  border-radius: 10px;
}
.admin-banner {
  height: 48px;
  background-color: #fff;
  line-height: 48px;
  font-size: 16px;
}
.admin-breadcrumb {
  padding: 18px 0;
}
.admin-login-out {
  font-size: 14px;
}
.el-menu {
  border-right: none;
}
</style>