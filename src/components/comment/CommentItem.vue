<template>
  <div class="commnet-item">
    <div class="comment-head">
      <img src="~/assets/img/defaultavator.png" alt />
      <div>
        <span class="comment-name">{{comment.user||comment.fromuser}}</span>
        <div class="comment-info">{{timeInfo}}</div>
      </div>
    </div>
    <div :class="{'commnet-body':!isReplay}">
      <div class="comment-content">
        <a href="#" v-if="replayUser">@{{comment.touser}}</a>
        {{comment.content}}
        <div class="comment-fanv">
          <div>
            <!-- <svg class="svg">
            <use xlink:href="#good" />
          </svg>
            {{30}}-->
          </div>
          <div class="reply-div" @click="clickReply">
            <svg class="svg">
              <use xlink:href="#comment" />
            </svg>
            回复
          </div>
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
import CommentInput from "./CommentInput";

import { formatDate } from "common/utils";
export default {
  name: "CommentItem",
  props: {
    comment: {
      type: Object,
      default() {
        return {};
      }
    },
    isToLandlord: {
      type: Boolean,
      default: false
    },
    isReplay: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShowInput: false
    };
  },
  components: {
    CommentInput
  },
  computed: {
    timeInfo() {
      let date = new Date(this.comment.date);
      let fmt = "MM.dd hh:mm";
      if (date.getFullYear() != new Date().getFullYear()) {
        fmt = "yyyy." + fmt;
      }

      return formatDate(date, fmt);
    },
    replayUser() {
      return !!this.comment.touser;
    }
  },
  methods: {
    clickReply(e) {
      this.$emit("clickReply");
    }
  }
};
</script>

<style scoped>
.comment-head {
  display: flex;
  text-align: left;
}

.comment-head > div {
  margin-left: 5px;
  vertical-align: center;
}
.commnet-body {
  margin-left: 50px;
  margin-right: 50px;
}
.comment-name {
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;
}
.comment-info {
  font-size: 12px;
  line-height: 12px;
}
.comment-head img {
  width: 50px;
  height: 50px;
}
.comment-content {
  text-align: left;
  /* margin-left: 50px;
  margin-right: 50px; */
  padding: 10px 0 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.replay {
  margin-left: 50px;
}
.comment-content a {
  text-decoration: none;
  color: blue;
}
.comment-fanv {
  font-size: 16px;
  color: #999;
  text-align: left;
  display: flex;
  padding-top: 5px;
}
.comment-fanv svg {
  width: 1em;
  height: 1em;
}
.reply-div {
  margin-left: 10px;
  vertical-align: center;
}
</style>