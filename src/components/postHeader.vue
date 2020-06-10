<template>
  <div id="post-header">
    <div class="posts-title">{{item.title||""}}</div>
    <div class="posts-info">
      <div class="posts-info-item">
        <div class="posts-data">
          <i class="el-icon-date"></i>
          {{item.date|dateFilter}}
        </div>
      </div>
      <div class="posts-info-item">|</div>
      <div class="posts-info-item" v-if="item.category">
        <div class="posts-cate">
          <i class="el-icon-folder"></i>
          {{item.category}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "common/utils";
export default {
  name: "postHeader",
  props: {
    item: {
      type: Object,
      defalut() {
        return {};
      }
    }
  },
  filters: {
    dateFilter(val) {
      if (!val) return null;
      let res = new Date(val);
      return formatDate(res, "yyyy-MM-dd");
    }
  }
};
</script>

<style>
.posts-title {
  font-size: 18px;
  padding: 30px 0;
}

.posts-info {
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}

.posts-info-item {
  font-size: 13px;
  padding: 0 5px;
  line-height: 13px;
}
.posts-info-item .posts-data {
  border-bottom: 1px dashed rgba(0, 0, 0, 0.5);
}
.posts-info-item .posts-cate {
  /* border-left: 2px solid rgba(0, 0, 0, 0.5); */
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}
</style>