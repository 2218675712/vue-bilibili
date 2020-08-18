<template>
  <div class="btnparent">
    <div class="loginBtn">{{ btntext }}</div>
  </div>
</template>

<script>
export default {
  name: "LoginBtn",
  props:['btntext']
}
</script>

<style scoped>
.btnparent{
  padding: 15px 10px;
}
.loginBtn {
  height: 45px;
  background-color: #ff9db5;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 22.5px;
  font-size: 16px;
}
</style>
