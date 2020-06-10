<template>
  <el-form class="sign" :rules="rules" ref="rform" :model="form" label-width="28%">
    <div class="top">
      <h2>后台管理</h2>
    </div>
    <div class="center">
      <el-form-item label="用户名" prop="name">
        <el-input placeholder="请输入用户名" size="medium" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input placeholder="请输入密码" size="medium" v-model="form.password" show-password></el-input>
      </el-form-item>
    </div>
    <el-form-item class="bottom">
      <el-button type="primary" @click="onSubmit('rform')">登录</el-button>
      <el-button @click="resetForm('rform')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        password: ""
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch("userLogin", this.form).then(res => {
            this.$router.replace("/admin");
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.sign {
  width: 300px;
  margin: 200px auto;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.top {
  text-align: center;
  margin: 15px 0;
}
.top h1 {
  display: inline-block;
}
.center {
  width: 80%;
  margin: 0 auto;
}
.bottom {
  width: 100%;
}
</style>