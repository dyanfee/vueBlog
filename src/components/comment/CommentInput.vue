<template>
  <div class="comment-input">
    <el-row class="input-area">
      <el-col :span="2" v-if="isShowAvator">
        <img src="~/assets/img/defaultavator.png" alt />
      </el-col>
      <el-col :span="22">
        <el-row class="input-row">
          <el-col :span="8">
            <el-input v-model="name" placeholder="请输入名称..."></el-input>
          </el-col>
          <el-col :span="12"></el-col>
        </el-row>
        <el-row>
          <el-input
            type="textarea"
            :autosize="{ minRows: 3,maxRows:3}"
            resize="none"
            placeholder="请输入评论内容..."
            v-model="content"
            @keyup.ctrl.enter.native="handleSubmit"
            @focus="handleFocus"
          ></el-input>
        </el-row>
        <common-trans :transHeight="tansHeight">
          <el-row v-if="isOpen" class="commit-area">
            <el-col class="left" :span="12">Ctrl + Enter 发表</el-col>
            <el-col class="right" :span="12">
              <el-button
                size="small"
                :disabled="isCanSubmit"
                @click="handleSubmit"
                key="submit"
                type="danger"
                round
              >发布</el-button>
              <el-button size="small" @click="clickCancel" key="cancel" round>取消</el-button>
            </el-col>
          </el-row>
          <!-- <div v-if="isOpen" class="commit-area" ref="actionArea"> -->
          <!-- </div> -->
        </common-trans>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CommonTrans from "components/transform/CommonTrans";

import { sendComment } from "network/home";
import { alertMsg } from "common/utils";

export default {
  name: "CommentInput",
  data() {
    return {
      name: "",
      content: "",
      isOpen: false,
      areaHeight: 0
    };
  },
  inject: ["reload"],
  props: {
    isShowAvator: {
      type: Boolean,
      default: false
    },
    post: {
      type: String,
      defalut: ""
    }
  },
  components: {
    CommonTrans
  },
  mounted() {
    setTimeout(() => {
      this.handDom();
    }, 200);
  },
  methods: {
    handleFocus(e) {
      if (!this.isOpen) {
        this.isOpen = true;
      }
    },
    handleSubmit(e) {
      // 按下ctrl + enter 发布 点击发布
      if (!this.name) this.name = `游客` + Math.floor(Math.random() * 1000000);
      if (!this.content) return alertMsg("请输入评论内容!");
      sendComment({
        post: this.post,
        user: this.name,
        content: this.content
      }).then(res => {
        if (res.code == 200) {
          alertMsg("评论成功", "success");
          this.reload();
        }
      });
    },
    clickCancel() {
      this.isOpen = false;
    },
    handDom: function() {
      if (this.$refs.actionArea)
        this.areaHeight = this.$refs.actionArea.offsetHeight;
      else this.areaHeight = 32;
    }
  },
  computed: {
    isCanSubmit() {
      return this.content == "";
    },
    tansHeight() {
      return this.areaHeight;
    }
  }
};
</script>

<style scoped>
.comment-input {
  width: 100%;
  vertical-align: center;
}
.input-area {
  display: flex;
}
.comment-input img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.commit-area {
  margin: 15px 0;
  display: block;
}
.commit-area .left {
  text-align: left;
  font-size: 14px;
  color: #aaa;
}
.commit-area .right {
  text-align: right;
}
.input-row {
  margin-bottom: 5px;
}
</style>