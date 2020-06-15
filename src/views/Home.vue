<template>
  <div id="home">
    <el-container>
      <el-header height="115px">
        <header-menu :is-show-menu="!isShowSilder"></header-menu>
      </el-header>
      <div class="main-content" ref="mainContent">
        <el-container>
          <el-aside v-show="isShowSilder" width="260px">
            <nav-menu></nav-menu>
            <cards ref="cards" :class="{isfixed:isCardShow}" />
          </el-aside>
          <el-container>
            <el-main>
              <back-top></back-top>
              <router-view v-if="isRouterAlive" />
            </el-main>
            <el-footer>
              <footer-info></footer-info>
            </el-footer>
          </el-container>
        </el-container>
      </div>
    </el-container>
  </div>
</template>

<script>
import NavMenu from "components/NavMenu";
import Cards from "components/Cards";
import FooterInfo from "components/FooterInfo";
import BackTop from "components/BackTop";
import HeaderMenu from "components/HeaderMenu";
export default {
  name: "Home",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      cardsOffset: 0,
      isCardShow: false,
      screenWidth: "",
      screenHeight: "",
      isShowSilder: true,
      isRouterAlive: true
    };
  },

  components: {
    NavMenu,
    Cards,
    FooterInfo,
    BackTop,
    HeaderMenu
  },
  mounted() {
    this.cardsOffset = this.$refs.cards.$el.offsetTop;
    this.resizeHandler();
    // 窗口滚动
    this.scrollWindow();
    // 窗口大小变化
    this.resizeWindow();
  },
  methods: {
    scrollWindow() {
      window.addEventListener("scroll", this.scrollHander);
    },
    scrollHander(e) {
      let py = document.documentElement.scrollTop || document.body.scrollTop;
      this.isCardShow = this.cardsOffset < py + 20;
    },
    resizeWindow() {
      // 窗口变化
      window.onresize = () => {
        return (() => {
          this.resizeHandler();
        })();
      };
    },
    resizeHandler() {
      this.screenWidth = document.body.clientWidth;
      this.screenHeight = document.body.clientHeight;
      if (this.screenWidth > 1280) {
        this.$refs.mainContent.style &&
          (this.$refs.mainContent.style.width = "1280 px");
      } else {
        this.$refs.mainContent.style &&
          (this.$refs.mainContent.style.width = this.screenWidth + "px");
      }
      if (this.screenWidth < 978) {
        this.isShowSilder = false;
      } else {
        this.isShowSilder = true;
      }
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>

<style scoped>
.home {
  height: 100%;
}
.el-header {
  background-color: #222222;
  color: #fff;
  text-align: center;
  line-height: 30px;
  overflow: visible;
}
.el-footer {
  color: var(--color-text);
  text-align: center;
}
.el-aside {
  color: #333;
  text-align: center;
  line-height: 20px;
}

.el-main {
  color: #333;
  text-align: center;
  line-height: none;
}

body > .el-container {
  margin-bottom: 40px;
}

.isfixed {
  position: fixed;
  z-index: 9;
  top: 0px;
  width: 240px;
}
.main-content {
  width: 1280px;
  margin: 0 auto;
}
</style>
