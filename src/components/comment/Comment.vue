<template>
  <div class="comment">
    <!-- 评论输入模块 -->
    <div class="input-comment">
      <comment-input :isShowAvator="isShowAvator" :post="post"></comment-input>
    </div>
    <!-- 评论展示模块 -->
    <div class="show-comment" v-if="comments.length">
      <div class="commet-header">
        全部评论
        <span>({{ comments.length }})</span>
      </div>
      <comment-item
        class="comment-ist"
        v-for="item in comments"
        @clickReply="clickReply(item._id, '')"
        :key="item.date"
        :comment="item"
      >
        <comment-item
          class="comment-scd"
          v-for="replay in item.replay"
          @clickReply="clickReply(item._id, replay.fromuser)"
          :key="replay.date"
          :comment="replay"
          :isToLandlord="replay.touser == item.user"
          :isReplay="true"
        ></comment-item>
        <comment-input
          v-if="showReply(item._id)"
          :commentId="item._id"
          :key="touser"
          :touser="touser"
        ></comment-input>
      </comment-item>
    </div>
  </div>
</template>

<script>
import CommentItem from "./CommentItem";
import CommentInput from "./CommentInput";
import CommonTrans from "components/transform/CommonTrans";
export default {
  name: "Comment",
  props: {
    comments: {
      type: Array,
      defalut() {
        return [];
      },
    },
    post: {
      type: String,
      defalut: "",
    },
  },
  data() {
    return {
      cid: "",
      touser: "",
      isShowAvator: true,
    };
  },
  components: {
    CommentItem,
    CommentInput,
    CommonTrans,
  },
  mounted() {
    this.checkWidth();
  },
  methods: {
    checkWidth() {
      if (document.body.clientWidth < 978) {
        this.isShowAvator = false;
      }
    },
    clickReply(id, user) {
      this.cid = id;
      this.touser = user;
    },
    showReply(id) {
      if (id == this.cid) {
        return true;
      }
      return false;
    },
  },
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
.comment-ist {
  margin: 30px 0 20px 20px;
}
.comment-scd {
  margin-top: 10px;
}
.commet-header > span {
  font-size: 16px;
  margin-left: 5px;
}
</style>