<template>
  <div class="tags shadow-box main-bgc">
    <div class="tags-title">所有标签</div>
    <div class="tags-show-area">
      <span
        v-for="item in tags"
        :key="item.tag"
        @click="handleClick(item.tag)"
      >{{item.tag}}({{len(item.posts)}})</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tags",
  data() {
    return {
      tags: []
    };
  },
  mounted() {
    this.$store.dispatch("getAllTags").then(res => {
      this.tags = res;
    });
  },
  methods: {
    len(val) {
      return val.length;
    },
    handleClick(c) {
      this.$router.push("/tags/" + c);
    }
  }
};
</script>

<style scoped>
.tags {
  height: 700px;
  width: 100%;
}
.tags-title {
  font-size: 26px;
  padding: 40px;
}
.tags-show-area {
  margin: 100px;
  display: flex;
  justify-content: space-around;
}
.tags-show-area span {
  border-bottom: 1px dashed rgba(0, 0, 0, 0.5);
}
</style>