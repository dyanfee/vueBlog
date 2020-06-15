<template>
  <div class="category shadow-box main-bgc">
    <div class="category-title">所有分类</div>
    <div class="category-show-area">
      <span
        v-for="item in categories"
        :key="item.category"
        @click="handleClick(item.category)"
      >{{item.category}} ({{len(item.posts)}})</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Category",
  data() {
    return {
      categories: []
    };
  },
  mounted() {
    this.$store.dispatch("getAllCategories").then(res => {
      this.categories = res;
    });
  },
  methods: {
    len(val) {
      return val.length;
    },
    handleClick(c) {
      this.$router.push("/categories/" + c);
    }
  },
  create() {}
};
</script>

<style scoped>
.category {
  height: 700px;
  width: 100%;
}
.category-title {
  font-size: 26px;
  padding: 40px;
}
.category-show-area {
  margin: 100px auto;
  /* display: flex;
  justify-content: space-around; */
}
.category-show-area span {
  /* border-bottom: 1px dashed rgba(0, 0, 0, 0.5); */
  display: inline-block;
  padding: 0.3em;
}
</style>