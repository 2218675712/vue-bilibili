<template>
  <div class="comment">
    <p class="comment-title">
      <span>评论</span>
      <span>({{ dataLength }})</span>
    </p>
    <div class="commentMyInfo">
      <img v-if="myUser.user_img" :src="myUser.user_img" alt="">
      <img v-else src="@/assets/img/default_img.jpg" alt="">
      <input type="text" v-model="comContent" placeholder="说点什么吧">
      <button @click="commentPublish">发表</button>
    </div>
  </div>
</template>

<script>
import {Toast} from "vant";

export default {
  name: "commentTitle",
  props: ['dataLength'],
  data() {
    return {
      myUser: {},
      comContent: ''
    }
  },
  methods: {
    /**
     * 获取用户信息
     * @returns {Promise<void>}
     */
    async myUserInfo() {
      const res = await this.$http.get('/user/' + localStorage.getItem('id'))
      this.myUser = res.data[0]
    },
    /**
     * 发表评论
     */
    commentPublish() {
      if (!localStorage.getItem('id') && !localStorage.getItem('token')) {
        Toast.fail('请先登录');
        setTimeout(() => {
          this.$router.push('/login')
        }, 1000)
        return
      }
      // 让父组件发布评论
      this.$emit('Postcomment', this.comContent)
    }
  },
  created() {
    /**
     * 如果登录了在获取用户数据
     */
    if (localStorage.getItem('token') && localStorage.getItem('id')) {
      this.myUserInfo()
    }
  }
}
</script>

<style scoped lang="less">
.comment {
  padding: 30px 10px 0;
  background-color: #fff;

  .comment-title {
    span:nth-child(2) {
      color: #aaaaaa;
      margin-left: 10px;
    }
  }

  .commentMyInfo {
    padding: 10px 0;
    display: flex;

    img {
      width: 25px;
      height: 25px;
      border-radius: 50%;
    }

    input {
      border: 0;
      background-color: #f4f4f4;
      border-radius: 13px;
      font-size: 12px;
      padding: 0 20px 0 15px;
      margin: 0 10px;

    }

    button {
      outline: none;
      border: 0;
      border-radius: 12px;
      background-color: #fb7299;
      color: #ffffff;
      font-size: 12px;
      padding: 0 15px;
    }
  }
}
</style>
