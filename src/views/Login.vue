<template>
  <div class="login">
    <login-top middle-top="登录bilibili">
      <div slot="right" @click="$router.push('/register')">
        注册
      </div>
    </login-top>
    <login-text
      label="账号"
      style="margin: 15px 0"
      placeholder="请输入账号"
      rule="^.{6,16}$"
      @inputChange="res=>model.username=res"
    ></login-text>
    <login-text
      label="密码"
      type="password"
      placeholder="请输入密码"
      rule="^.{6,16}$"
      @inputChange="res=>model.password=res"
    ></login-text>
    <login-btn btntext="登录" @registerSubmit="registerSubmit"></login-btn>
  </div>
</template>

<script>
import LoginBtn from "@/components/common/LoginBtn";
import LoginText from "@/components/common/LoginText";
import LoginTop from "@/components/common/LoginTop";
import {Toast} from "vant";

export default {
  name: "Login",
  data() {
    return {
      model: {
        username: '',
        password: ''
      }
    }
  },
  components: {
    LoginBtn,
    LoginText,
    LoginTop
  },
  methods: {
    async registerSubmit() {
      let rule = /^.{6,16}$/
      if (rule.test(this.model.username) && rule.test(this.model.password)) {
        const res = await this.$http.post('/login', this.model)
        Toast(res.data.msg)
        if (res.data.code === 301 || res.data.code === 302) {
          return
        }
        localStorage.setItem('id', res.data.id)
        localStorage.setItem('token', res.data.token)
          setTimeout(() => {
            this.$router.push('/userinfo')
          }, 1000)
      } else {
        Toast('格式不正确,请检查')
      }
    }
  }
}
</script>

<style scoped>

</style>
