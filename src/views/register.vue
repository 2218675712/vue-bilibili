<template>
  <div class="register">
    <login-top middle-top="注册bilibili"></login-top>
    <login-text
        label="姓名"
        style="margin: 15px 0"
        placeholder="请输入姓名"
        rule="^.{6,16}$"
        @inputChange="res=>name=res"
    ></login-text>
    <login-text
        label="账号"
        placeholder="请输入账号"
        @inputChange="res=>username=res"
    ></login-text>
    <login-text
        label="密码"
        type="password"
        placeholder="请输入密码"
        @inputChange="res=>password=res"
    ></login-text>
    <login-btn btntext="注册"></login-btn>
  </div>
</template>

<script>
import LoginTop from '@/components/common/LoginTop'
import LoginText from '@/components/common/LoginText'
import LoginBtn from "@/components/common/LoginBtn";

export default {
  name: 'register',
  data() {
    return {
      name: '',
      username: '',
      password: ''
    }
  },
  components: {
    LoginBtn,
    LoginText,
    LoginTop
  }
}
</script>

<style scoped>

</style>
