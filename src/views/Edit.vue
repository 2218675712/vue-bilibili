<template>
  <div class="editViews">
    <div style="margin-bottom: 12px;">
      <nav-bar></nav-bar>
    </div>
    <edit-banner left="头像">
      <template slot="right">
        <img v-if="model.user_img" :src="model.user_img" alt="">
        <img v-else src="@/assets/img/default_img.jpg" alt="">
      </template>
    </edit-banner>
    <edit-banner left="昵称">
      <template slot="right">
        <a href="javascript:">{{ model.name }}</a>
      </template>
    </edit-banner>
    <edit-banner left="UID">
      <template slot="right">
        <a href="javascript:">{{ model.id }}</a>
      </template>
    </edit-banner>
    <edit-banner left="性别">
      <template slot="right">
        <a v-if="model.gender===0" href="javascript:">女</a>
        <a v-else href="javascript:">男</a>
      </template>
    </edit-banner>
    <edit-banner left="出生日期">
      <template slot="right">
        <a href="javascript:">保密</a>
      </template>
    </edit-banner>
    <edit-banner left="个性签名">
      <template slot="right">
        <a href="javascript:">{{ model.user_desc }}</a>
      </template></edit-banner>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar";
import EditBanner from "@/components/common/editBanner";

export default {
  name: "Edit",
  components: {EditBanner, NavBar},
  data() {
    return {
      model: ''
    }
  },
  methods: {
    async selectUser() {
      const res = await this.$http.get('/user/' + localStorage.getItem('id'))
      this.model = res.data[0]
    }
  },
  created() {
    this.selectUser()
  }
}
</script>

<style scoped lang="less">
.editViews{
  a{
    color: #999999;
  }
  img{
    width: 45px;
    height: 45px;
  }
}
</style>
