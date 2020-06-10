<template>
  <div id="list-posts-item">
    <post-header :item="item"></post-header>
    <div class="posts-desc">{{item.body|postFilter}}</div>
    <div class="goto-post">
      <button @click="clickHandler">
        阅读全文
        <i class="el-icon-d-arrow-right el-icon--right"></i>
      </button>
    </div>
    <div class="posts-end"></div>
  </div>
</template>

<script>
import postHeader from "./postHeader";

export default {
  name: "ListPostsItem",
  props: {
    item: {
      type: Object,
      defalut() {
        return {};
      }
    }
  },
  components: {
    postHeader
  },
  filters: {
   
    /** 裁剪固定长度字符串，后面多出部分显示... */
    postFilter(val) {
      if (val.length < 80) return val;
      var cutStr = val.substr(0, 80);
      return cutStr + "...";
    }
  },
  methods: {
    clickHandler() {
      // 直接传参
      this.$router.push("/post/" + this.item._id);
    }
  }
};
</script>

<style>
#list-posts-item {
  line-height: 20px;
  background-color: #fff;
  color: var(--color-text);
}



.posts-desc {
  line-height: 30px;
  font-size: 14px;
  padding: 0 30px;
  margin-top: 50px;
  /* overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; */
  text-align: justify;
}
.goto-post {
  margin-top: 50px;
  font-size: 14px;
  color: #666;
}
.goto-post button {
  border: 2px solid rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  background-color: #fff;
  text-decoration: none;
  padding: 6px 18px;
  color: #666;
}
.goto-post button:hover {
  background-color: #222;
  color: #fff;
  transition: 0.3s;
}
.goto-post button:focus {
  outline: 0;
}
.posts-end {
  width: 50px;
  height: 1px;
  background-color: #a3a3a5;
  margin: 60px auto 0;
}
</style>