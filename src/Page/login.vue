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
          <el-checkbox v-model="checked" style="float:left">记住密码</el-checkbox>

          <br />
          <br />
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
          </el-form-item>
        </el-form>
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
      checked: false,
      loginForm: {
        username: "",
        password: "",
        email: ""
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

    this.getCookie();
  },
  methods: {
    ...mapMutations(["changeLogin"]),
    async submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const self = this;
          if (self.checked == true) {
            self.setCookie(self.loginForm.username, self.loginForm.password, 7);
          } else {
            self.clearCookie();
          }
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
              const code = res.data.status;
              //res是返回结果
              if (code == "200") {
                this.userToken = "Bearer" + res.data.token;
                this.changeLogin({ Authorization: this.userToken });
                this.$router.push("manage");
              } else {
                const msg = res.data.msg;
                this.$message.error(msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    //设置cookie
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    //读取cookie
    getCookie: function() {
      if (document.cookie.length > 0) {
        this.checked = true;
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] == "userName") {
            this.loginForm.username = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == "userPwd") {
            this.loginForm.password = arr2[1];
          }
        }
      }
    },
    //清除cookie
    clearCookie: function() {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
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

