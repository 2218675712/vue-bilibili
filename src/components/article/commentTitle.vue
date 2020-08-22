<template>
  <div class="comment">
    <p class="comment-title">
      <span>评论</span>
      <span>(4070)</span>
    </p>
    <div class="commentMyInfo">
      <img v-if="myUser.user_img" :src="myUser.user_img" alt="">
      <img v-else src="@/assets/img/default_img.jpg" alt="">
      <input type="text" placeholder="说点什么吧">
      <button @click="commentPublish">发表</button>
    </div>
  </div>
</template>

<script>
import {Toast} from "vant";

export default {
  name: "comment",
  data() {
    return {
      myUser: {}
    }
  },
  methods: {
    async myUserInfo() {
      const res = await this.$http.get('/user/' + localStorage.getItem('id'))
      this.myUser = res.data[0]
    },
    commentPublish(event) {
      if (!localStorage.getItem('id') && !localStorage.getItem('token')) {
        Toast.fail('请先登录');
        setTimeout(() => {
          this.$router.push('/login')
        }, 1000)
        console.log(event)
      }
    }
  },
  created() {
    if (localStorage.getItem('token') && localStorage.getItem('id')) {
      this.myUserInfo()
    }
  }
}
</script>

<style scoped lang="less">
.comment {
  padding: 30px 10px;
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
