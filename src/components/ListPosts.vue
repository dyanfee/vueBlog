<template>
  <div id="list-posts">
    <div class="no-content" v-show="list.length==0">
      <p>暂无内容</p>
    </div>
    <list-posts-item v-for="(item,index) in list " :key="index" :item="item" />
    <div class="posts-pagination">
      <el-pagination
        @current-change="pageChange"
        background
        layout="prev, pager, next"
        hide-on-single-page
        :total="postTotal"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import ListPostsItem from "./ListPostsItem";

import { getPostsByPage, getCate, getTag } from "network/home";
// import { fetchPostMixin } from "common/mixin";
export default {
  name: "ListPosts",
  // mixins: [fetchPostMixin],
  data() {
    return {
      currentPage: 1,
      list: [],
      limit: 10
    };
  },
  props: {
    dataName: {
      type: String,
      default: "home"
    }
  },
  components: {
    ListPostsItem
  },
  methods: {
    _getPosts(val = 1) {
      getPostsByPage({
        page: val,
        limit: this.limit
      }).then(res => {
        this.list = [...res.posts].reverse();
        setTimeout(() => {}, 500);
      });
    },
    _getCate() {
      getCate({ category: this.$route.params.id }).then(res => {
        if (res.code == 200) this.list = [...res.posts];
      });
    },
    _getTag() {
      getTag({ tag: this.$route.params.id }).then(res => {
        if (res.code == 200) this.list = [...res.posts];
      });
    },
    pageChange(index) {
      this.currentPage = index;
      if (this.isHome) this._getPosts(index);
    }
  },
  computed: {
    postTotal() {
      return this.$store.getters.postStatData.post;
    }
  },
  mounted() {
    // 对比路由值来获取内容
    if (this.dataName == "home") {
      this._getPosts();
    } else if (this.dataName == "tag") {
      this._getTag();
    } else {
      this._getCate();
    }
  },
  watch: {}
};
</script>

<style>
#list-posts {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.no-content {
  background-color: #fff;
  font-size: 18px;
  color: #aaa;
  padding: 30px;
  height: 400px;
}
.posts-pagination {
  background-color: #fff;
  padding: 20px 0 10px;
}
.el-pagination.is-background .el-pager li:not(.disabled):hover {
  background-color: #999;
  color: #fff;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #666;
}
</style>