<template>
  <div class="userinfo">
    <nav-bar></nav-bar>
    <img src="@/assets/img/bannerTop_new.png" alt="" class="backImg">
    <user-detail></user-detail>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar";
import UserDetail from "@/components/userComponent/userDetail";

export default {
  name: "userinfo",
  components: {UserDetail, NavBar}
}
</script>

<style scoped lang="less">
.userinfo{
.backImg{
  width: 100%;
  height: 90px;
}
}
</style>
