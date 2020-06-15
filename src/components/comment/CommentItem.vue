<template>
  <div class="commnet-item">
    <div class="comment-head">
      <img src="~/assets/img/defaultavator.png" alt />
      <div>
        <span class="comment-name">{{comment.user||comment.fromuser}}</span>
        <div class="comment-info">{{timeInfo}}</div>
      </div>
    </div>
    <div class="comment-content">
      <!-- <span v-if="replayUser">
        回复 
        <span class="comment-name">{{comment.touser}}:</span>
      </span>-->
      <a href="#" v-if="replayUser">@{{comment.touser}}</a>
      {{comment.content}}
    </div>
    <slot />
  </div>
</template>

<script>
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
    }
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
      return this.comment.touser && !this.isToLandlord;
    }
  }
};
</script>

<style scoped>
.commnet-item {
  margin: 30px 0 30px 20px;
}
.comment-head {
  display: flex;
  text-align: left;
}        

.comment-head > div {
  margin-left: 5px;
  vertical-align: center;
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
  margin-left: 50px;
  margin-right: 50px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.comment-content a {
  text-decoration: none;
  color: blue;
}
</style>