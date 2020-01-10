<template>
  <div class="register_page fillcontain">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" v-show="showLogin">
        <div class="manage_tip">
          <p>系统注册界面</p>
        </div>
        <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="80px">
          <el-form-item prop="username" label="用户名">
            <el-input v-model="registerForm.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱">
            <el-input placeholder="输入注册的qq邮箱" v-model="registerForm.email"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input
              type="password"
              placeholder="密码"
              v-model="registerForm.password"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="checkpassword" label="确认密码">
            <el-input
              type="password"
              placeholder="确认密码"
              v-model="registerForm.checkpassword"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
            <el-button @click="resetForm('registerForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </section>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.checkpassword !== "") {
          this.$refs.registerForm.validateField("checkpassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        username: "",
        email: "",
        password: "",
        checkpassword: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" }
        ],

        password: [
          { required: true, validator: validatePass, trigger: "blur" },
          {
            min: 6,
            max: 14,
            message: "密码长度在6-14个字符之间",
            trigger: "blur"
          }
        ],
        checkpassword: [
          { required: true, trigger: "blur", message: "请再次输入密码" },
          { validator: validatePass2, trigger: "blur" }
        ]
      },
      showLogin: false
    };
  },
  mounted() {
    this.showLogin = true;
  },
  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.$axios.post("api/register", this.registerForm).then(res => {
            this.$message.success("注册成功");
          });
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang='less' scoped>
@import "../style/mixin";
.register_page {
  background-color: #324057;
  background-image: url("../assets/bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.manage_tip {
  position: absolute;
  width: 100%;
  top: -100px;
  left: 0;
  p {
    font-size: 34px;
    color: #fff;
  }
}
.form_contianer {
  .wh(320px, 310px);
  .ctp(320px, 300px);
  padding: 25px;
  border-radius: 5px;
  text-align: center;
  background-color: #fff;
  .submit_btn {
    width: 100%;
    font-size: 16px;
  }
}
.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 1s;
}
.form-fade-enter,
.form-fade-leave-active {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}
</style>



