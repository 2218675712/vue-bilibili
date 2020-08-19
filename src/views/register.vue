<template>
  <div class="register">
    <login-top middle-top="注册bilibili">
      <div slot="right" @click="$router.push('/login')">
        登录
      </div>
    </login-top>
    <login-text
      label="姓名"
      style="margin: 15px 0"
      placeholder="请输入姓名"
      rule="^.{6,16}$"
      @inputChange="res=>model.name=res"
    ></login-text>
    <login-text
      label="账号"
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
    <login-btn btntext="注册" @registerSubmit="registerSubmit"></login-btn>
  </div>
</template>

<script>
import LoginTop from '@/components/common/LoginTop'
import LoginText from '@/components/common/LoginText'
import LoginBtn from "@/components/common/LoginBtn";
import {Toast} from "vant";

export default {
  name: 'register',
  data() {
    return {
      model: {
        name: '',
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
      if (rule.test(this.model.name) && rule.test(this.model.username) && rule.test(this.model.password)) {
        const res = await this.$http.post('/register', this.model)
        Toast(res.data.msg)
        localStorage.setItem('id', res.data.id)
        localStorage.setItem('token', res.data.objtoken)
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
