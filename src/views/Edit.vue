<template>
  <div class="editViews">
    <div style="margin-bottom: 12px;">
      <nav-bar :userinfo="model"></nav-bar>
    </div>
    <div class="uploadFile">
      <van-uploader class="uploadImg" preview-size="100vw" :after-read="afterRead"/>
      <edit-banner left="头像">
        <template slot="right">
          <img v-if="model.user_img" :src="model.user_img" alt="">
          <img v-else src="@/assets/img/default_img.jpg" alt="">
        </template>
      </edit-banner>
    </div>

    <edit-banner left="昵称" @bannerClick="nameShow=true">
      <template slot="right">
        <a href="javascript:">{{ model.name }}</a>
      </template>
    </edit-banner>
    <edit-banner left="UID">
      <template slot="right">
        <a href="javascript:">{{ model.id }}</a>
      </template>
    </edit-banner>
    <edit-banner left="性别" @bannerClick="genderShow=true">
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
    <edit-banner left="个性签名" @bannerClick="textShow=true">
      <template slot="right">
        <a href="javascript:">{{ model.user_desc }}</a>
      </template>
    </edit-banner>
    <div class="editBack" @click="$router.back()">返回空间</div>
    <!--弹出框-->
    <van-dialog
      v-model="nameShow"
      title="昵称"
      show-cancel-button
      @confirm="nameChangeClick"
      @cancel="content = ''">
      <van-field v-model="content" autofocus placeholder="请输入昵称"/>
    </van-dialog>
    <van-dialog
      v-model="textShow"
      title="个性签名"
      show-cancel-button
      @confirm="textChangeClick"
      @cancel="content = ''">
      <van-field v-model="content" type="textarea" autofocus placeholder="请输入个性签名"/>
    </van-dialog>
    <!--性别修改-->
    <van-action-sheet v-model="genderShow" cancel-text="取消" :actions="actions" @select="onSelect"/>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar";
import EditBanner from "@/components/common/editBanner";
import {Toast} from "vant";

export default {
  name: "Edit",
  components: {EditBanner, NavBar},
  data() {
    return {
      model: '',
      nameShow: false,
      textShow: false,
      genderShow: false,
      actions: [
        {name: '男', val: 1},
        {name: '女', val: 0}
      ],
      content: ''
    }
  },
  methods: {
    /**
     * 展示用户数据
     * @returns {Promise<void>}
     */
    async selectUser() {
      const res = await this.$http.get('/user/' + localStorage.getItem('id'))
      this.model = res.data[0]
    },
    /**
     * 图片上传
     * @param file  图片
     * @returns {Promise<void>}
     */
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      const fromdata = new FormData()
      fromdata.append('file', file.file)
      // 上传到文件服务器
      const res = await this.$http.post('/upload', fromdata)
      // 重新获取图片
      this.model.user_img = res.data.url
      this.userUpdate()
    },
    /**
     * 上传全部数据,让后台数据修改
     * @returns {Promise<void>}
     */
    async userUpdate() {
      const res = await this.$http.post('/update/' + localStorage.getItem('id'), this.model)
      if (res.status === 200) {
        Toast.success('修改成功');
      }
    },
    /**
     * 修改昵称
     */
    nameChangeClick() {
      this.model.name = this.content
      this.userUpdate()
      this.content = ''
      // this.nameShow = false
    },
    /**
     * 修改个性签名
     */
    textChangeClick() {
      this.model.user_desc = this.content
      this.userUpdate()
      this.content = ''
      // this.textShow = false
    },
    /**
     * 修改性别
     * @param data  传递参数
     */
    onSelect(data) {
      this.model.gender = data.val
      this.userUpdate()
      this.genderShow = false
    }
  },
  created() {
    this.selectUser()
  }
}
</script>

<style scoped lang="less">
.editViews {
  a {
    color: #999999;
  }

  img {
    width: 45px;
    height: 45px;
  }

  .uploadFile {
    position: relative;
    overflow: hidden;

    .uploadImg {
      position: absolute;
      opacity: 0;
    }
  }

  .editBack {
    margin-top: 20px;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #505050;
    padding: 10px;
    font-size: 14px;
  }
}
</style>
