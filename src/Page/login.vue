  <template>
  <div class="login_page fillcontain">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" v-show="showLogin">
        <div class="manage_tip">
          <p>后台管理系统</p>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="用户名">
              <span>dsfsf</span>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
          </el-form-item>
        </el-form>
        <!-- <p class="tip">温馨提示：</p> -->
        <p class="tip">未登录过的新用户，自动注册</p>
        <p class="tip">注册过的用户可凭账号密码登录</p>
      </section>
    </transition>
  </div>
</template>
<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      userToken: "",
      // changeLogin:'',

      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      showLogin: false
    };
  },
  mounted() {
    this.showLogin = true;
  },
  methods: {
    ...mapMutations(["changeLogin"]),
    // ...mapMutations(["setToken"]),
    async submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        const user_name = this.loginForm.username; //获取用户输入用户名
        const password = this.loginForm.password; //获取用户输入密码
        this.$axios
          .get("api/login", {
            params: {
              username: user_name,
              password: password
            },
            headers: {
              Authorization: ""
            }
          })
          .then(res => {
            console.log(res);
            //res是返回结果
            this.userToken = "Bearer" + res.data.token;
            this.changeLogin({ Authorization: this.userToken });
            // console.log(this.userToken, this.changeLogin);

            this.$router.push("manage");
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../style/mixin";
.login_page {
  background-color: #324057;
  background-image: url("../assets/bg_2.jpg");
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
  .wh(320px, 210px);
  .ctp(320px, 210px);
  padding: 25px;
  border-radius: 5px;
  text-align: center;
  background-color: #fff;
  .submit_btn {
    width: 100%;
    font-size: 16px;
  }
}
.tip {
  font-size: 12px;
  color: red;
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