<template>
  <div id="app">
    <router-view />
    <icon />
  </div>
</template>

<script>
// 载入svg Icon
import Icon from "components/icon/Icon";

export default {
  name: "app",
  components: {
    Icon
  }
};
</script>

<style>
@import url("~assets/css/base.css");
</style>
