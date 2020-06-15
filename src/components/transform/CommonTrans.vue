<template>
  <transition
    name="slide-in-out"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <slot></slot>
  </transition>
</template>

<script>
import Velocity from "velocity-animate";
export default {
  name: "CommonTrans",
  props: {
    transHeight: {
      type: Number,
      default: 10
    },
    duringTime: {
      type: Number,
      default: 0.2
    }
  },
  data() {
    return {
      offsetHeight: 0
    };
  },
  mounted() {},
  methods: {
    // --------
    // 进入中
    // --------

    beforeEnter: function(el) {
      el.style.opacity = 0;
      el.style.height = "0px";
    },
    // 当与 CSS 结合使用时
    // 回调函数 done 是可选的
    enter: function(el, done) {
      Velocity(
        el,
        { opacity: 1, height: this.transHeight + "px" },
        { duration: 200, complete: done }
      );
    },
    afterEnter: function(el) {
      
    },

    // --------
    // 离开时
    // --------

    beforeLeave: function(el) {
      //   console.log(this.offsetHeight, "-------", el);
      // ...
    },
    // 当与 CSS 结合使用时
    // 回调函数 done 是可选的
    leave: function(el, done) {
      Velocity(
        el,
        { opacity: 0, height: "0px" },
        { duration: 200, complete: done }
      );
    },
    afterLeave: function(el) {
      // ...
    }
  }
};
</script>

<style scoped>

</style>