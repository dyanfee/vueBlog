<template>
  <div id="cards">
    <div class="card-name">YF</div>
    <div class="card-sign">千里之行，始于足下</div>
    <div class="card-statistics">
      <div class="stat-item" @click="clickPost">
        <div class="item-num">{{statistics.post}}</div>
        <div class="item-name">日志</div>
      </div>
      <div class="stat-item stat-center" @click="clickCate">
        <div class="item-num">{{statistics.cate}}</div>
        <div class="item-name">分类</div>
      </div>
      <div class="stat-item" @click="clickTags">
        <div class="item-num">{{statistics.tags}}</div>
        <div class="item-name">标签</div>
      </div>
    </div>
    <div class="card-contact">
      <div class="item-contact">
        <a :href="github" :title="githubTitle">
          <i class="el-icon-toilet-paper"></i>
          <span>GitHub</span>
        </a>
      </div>
      <div class="item-contact">
        <a :href="mail" :title="mailTitle">
          <i class="el-icon-message"></i>
          <span>E-Mail</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { getPostStat } from "network/home";
export default {
  name: "Cards",
  data() {
    return {};
  },
  created() {
    this._getPostStat();
  },
  methods: {
    _getPostStat() {
      getPostStat().then(res => {
        console.log('----------',res);
        this.$store.commit("addPostStat", res);
      });
    },
    clickPost() {
      if (this.$route.path != "/") this.$router.replace("/");
    },
    clickCate() {
      if (this.$route.path != "/categories")
        this.$router.replace("/categories");
    },
    clickTags() {
      if (this.$route.path != "/tags") this.$router.replace("/tags");
    }
  },
  computed: {
    statistics() {
      console.log(this.$store.getters.postStatData);

      return this.$store.getters.postStatData;
    },
    mail() {
      return "mailto:dyanfee@gmail.com";
    },
    mailTitle() {
      return "mail -> dyanfee@gmail.com";
    },
    github() {
      return "http://github.com/dyanfee";
    },
    githubTitle() {
      return "github -> github.com/dyanfee";
    }
  }
};
</script>

<style>
#cards {
  margin-left: 20px;
  margin-top: 20px;
  font-size: 14px;
  color: var(--color-text);
  line-height: 20px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.card-name {
  padding: 20px 0 10px;
}
.item-num,
.card-name {
  font-weight: 700;
  font-size: 16px;
}
.card-statistics {
  margin: 15px auto;
  display: flex;
  width: 150px;
}
.stat-item {
  flex: 1;
}
.card-contact {
  display: flex;
}
.item-contact {
  flex: 1;
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 15px;
}
.item-contact span {
  padding-left: 5px;
}
.stat-center {
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}
</style>