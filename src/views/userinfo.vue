<template>
  <div class="userinfo">
    <nav-bar></nav-bar>
    <img src="@/assets/img/bannerTop_new.png" alt="" class="backImg">
    <user-detail :userinfo="modal"></user-detail>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar";
import UserDetail from "@/components/userComponent/userDetail";

export default {
  name: "userinfo",
  components: {UserDetail, NavBar},
  data() {
    return {
      modal: {}
    }
  },

  methods: {
    async userinfoData() {
      const res = await this.$http.get('/user/' + localStorage.getItem('id'))
      this.modal = res.data[0]
    }
  },
  created() {
    this.userinfoData()
  }
}
</script>

<style scoped lang="less">
.userinfo {
  .backImg {
    width: 100%;
    height: 90px;
  }
}
</style>
