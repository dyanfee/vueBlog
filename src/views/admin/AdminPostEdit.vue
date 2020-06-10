<template>
  <div class="create-post shadow-box main-bgc">
    <el-row>
      <div class="post-title">
        <el-input size="small" placeholder="请输入标题" v-model="post.title">
          <span slot="prepend">标题</span>
        </el-input>
      </div>
    </el-row>
    <el-row>
      <div class="post-category">
        <el-input size="small" placeholder="请输入分类" v-model="post.category">
          <span slot="prepend">分类</span>
        </el-input>
      </div>
    </el-row>
    <el-row>
      <div class="post-author">
        <el-autocomplete
          size="small"
          :fetch-suggestions="querySearch"
          placeholder="请输入作者"
          v-model="post.author"
        >
          <span slot="prepend">作者</span>
        </el-autocomplete>
      </div>
    </el-row>
    <el-row>
      <div class="post-tags">
        <span>标签：</span>
        <el-tag
          v-for="item in post.tags"
          :disable-transitions="false"
          @close="handleClose(item)"
          :key="item"
          closable
        >{{item}}</el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        ></el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
      </div>
    </el-row>
    <el-row>
      <div class="post-sign">文章内容:</div>
      <div class="post-body">
        <div class="input-area">
          <el-input
            type="textarea"
            :autosize="{minRows: 7}"
            placeholder="请输入内容"
            @input="update"
            v-model="post.body"
          ></el-input>
        </div>
        <div class="show-area" v-html="compiledMarkdown"></div>
      </div>
    </el-row>
    <el-row class="post-commit">
      <el-button @click="handleClick" type="primary">提交</el-button>
    </el-row>
  </div>
</template>

<script>
import marked from "marked";
import highlight from "highlight.js";
import "assets/css/atom-one-light.css";

import { debounce, notiMsg } from "common/utils";
import { postEdit, postCreate } from "network/admin";

marked.setOptions({
  hightlight: function(code) {
    return hightlight.hightlightAuto(code).value;
  }
});
export default {
  data() {
    return {
      post: {
        title: "",
        author: "",
        category: "",
        tags: ["python", "js", "lua"],
        body: ""
      },
      inputVisible: false,
      inputValue: ""
    };
  },
  created() {
    if (this.$route.params._id) {
      let post = this.$route.params;
      this.post.title = post.title;
      this.post.author = post.author;
      this.post.category = post.category;
      this.post.tags = post.tags;
      this.post.body = post.body;
    }
  },
  methods: {
    handleClose(tag) {
      this.post.tags.splice(this.post.tags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.post.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    update: debounce(function(e) {
      this.body = e;
    }, 300),
    querySearch(queryString, cb) {
      var list = [{ value: "admin" }];
      const res = queryString
        ? list.filter(
            item =>
              item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
          )
        : list;
      cb(res);
    },
    handleClick() {
      if (this.post.title.length == 0) return notiMsg("请输入标题!");
      if (this.post.author.length == 0) return notiMsg("请输入作者!");
      if (this.post.body.length == 0) return notiMsg("请输入内容!");
      // 带有文章ID编辑文章
      this.$confirm("确认提交吗", "提示", {}).then(() => {
        if (this.$route.params._id) {
          this.post._id = this.$route.params._id;
          postEdit(this.post)
            .then(res => {
              if (res.code == 200) {
                this.$notify({
                  title: "成功",
                  message: "更新成功",
                  type: "success"
                });
                setTimeout(() => {
                  this.$router.push({ path: "/admin" });
                }, 500);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          postCreate(this.post)
            .then(res => {
              if (res.code == 200) {
                this.$notify({
                  title: "成功",
                  message: res.message,
                  type: "success"
                });
              } else {
                this.$notify({
                  title: "失败",
                  message: res.message,
                  type: "error"
                });
                setTimeout(() => {
                  this.$router.push({ path: "login" });
                }, 500);
                return;
              }
              setTimeout(() => {
                this.$router.push({ path: "/admin" });
              }, 500);
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  },
  computed: {
    compiledMarkdown() {
      return marked(this.post.body);
    }
  }
};
</script>

<style>
.create-post {
  margin-top: 20px;
  width: 100%;
  font-size: 16px;
  color: #666;
  display: inline-block;
  clear: both;
}
.post-title,
.post-category,
.post-author,
.post-tags,
.post-sign {
  margin-top: 30px;
  margin-left: 20px;
}
.post-title,
.post-category {
  width: 300px;
}
.post-tags {
  float: left;
}

.post-body {
  float: left;
  display: flex;
  width: 100%;
}
.input-area,
.show-area {
  flex: 1;
  margin: 10px 20px 0;
}
.show-area {
  text-align: justify;
  background-color: #f2f2f2;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
}
.post-commit {
  text-align: center;
  margin: 30px;
}
</style>