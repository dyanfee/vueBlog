<template>
  <div class="post-detail shadow-box main-bgc">
    <post-header :item="post"></post-header>
    <div class="post-content" v-html="mdParse"></div>
    <div class="post-tags">
      <div v-for="tag in post.tags" :key="tag" @click="handerClick(tag)"># {{tag}}</div>
    </div>
  </div>
</template>

<script>
import postHeader from "./postHeader";
import { getPostDetail } from "network/home";
import marked from "marked";
import hljs from "highlight.js";
import "assets/css/arta.css";
// import "assets/css/atom-one-light.css";
// import "highlight.js/styles/atom-one-dark.css";

// Set options
marked.setOptions({
  renderer: new marked.Renderer(),
  pedantic: false,
  gfm: true,
  breaks: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
  highlight: function(code, language) {
    const validLanguage = hljs.getLanguage(language) ? language : "bash";
    return hljs.highlight(validLanguage, code).value;
  }
  // highlight: function(code) {
  //   console.log(code);
  //   console.log("---------------------");
  //   console.log(hljs.highlightAuto(code));
  //   console.log('==========================');
  //   return hljs.highlightAuto(code).value;
  // }
});

export default {
  name: "PostDetail",
  data() {
    return {
      post: {}
    };
  },
  components: {
    postHeader
  },
  created() {
    this._getPostDetail(this.$route.params.id);
  },
  methods: {
    _getPostDetail(id) {
      getPostDetail(id).then(res => {
        this.post = res.post;
      });
    },
    handerClick(tag) {
      this.$router.push("/tags/" + tag);
    }
  },
  computed: {
    mdParse() {
      // console.log(marked(this.post.body || ""));
      return marked(this.post.body || "");
    }
  }
};
</script>

<style>
.post-detail {
  line-height: 30px;
  width: 100%;
  word-wrap: break-word;
}
.post-content {
  margin: 50px 40px;
  padding-bottom: 50px;
  font-size: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  text-align: left;
  /* width: calc(100% - 80px); */
}
.post-tags {
  display: flex;
  justify-content: center;
}
.post-tags div {
  margin: 0 10px 40px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  font-size: 13px;
}
</style>