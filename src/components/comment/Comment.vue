<template>
  <div class="comment">
    <!-- 评论输入模块 -->
    <div class="input-comment">
      <comment-input :isShowAvator="true" :post="post"></comment-input>
    </div>
    <!-- 评论展示模块 -->
    <div class="show-comment" v-if="comments.length">
      <div class="commet-header">
        全部评论
        <span>({{comments.length}})</span>
      </div>
      <comment-item v-for="item in comments" :key="item.date" :comment="item">
        <comment-item
          v-for="replay in item.replay"
          :key="replay.date"
          :comment="replay"
          :isToLandlord="replay.touser==item.user"
        ></comment-item>
      </comment-item>
    </div>
  </div>
</template>

<script>
import CommentItem from "./CommentItem";
import CommentInput from "./CommentInput";
export default {
  name: "Comment",
  props: {
    comments: {
      type: Array,
      defalut() {
        return [];
      }
    },
    post: {
      type: String,
      defalut: ""
    }
  },
  components: {
    CommentItem,
    CommentInput
  }
};
</script>

<style scoped>
.comment {
  padding-bottom: 40px;
  width: 100%;
}
.input-comment {
  margin: 30px 40px;
}

.commet-header {
  border-left: 3px solid rgba(0, 0, 0, 0.5);
  text-align: left;
  margin-left: 20px;
  margin-top: 30px;
  padding-left: 10px;
  font-size: 18px;
  line-height: 18px;
}
.commet-header > span {
  font-size: 16px;
  margin-left: 5px;
}
</style>