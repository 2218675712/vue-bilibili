<template>
  <div class="commentParent">
    <div v-for="(item,index) in commentList" :key="index">
      <div class="commentItem">
        <div class="userImg">
          <img v-if="item.userinfo&&item.userinfo.user_img" :src="item.userinfo.user_img" alt="">
          <img v-else src="@/assets/img/default_img.jpg" alt="">
        </div>
        <div class="commentContent">
          <p>
            <span v-if="item.userinfo">{{ item.userinfo.name }}</span>
            <span v-else>此用户暂未设置</span>
            <span>{{ item.comment_date }}</span>
          </p>
          <div>
            {{ item.comment_content }}
            <span class="publishs" @click="publishClick(item.comment_id)">回复</span>
          </div>
        </div>
      </div>
      <div style="padding-left: 30px;">
        <comment-item :commentChild="item.child"></comment-item>
      </div>
    </div>

  </div>
</template>

<script>
import CommentItem from "@/components/article/commentItem";

export default {
  name: "comment",
  components: {CommentItem},
  data() {
    return {
      commentList: null
    }
  },
  methods: {
    /**
     * 获取评论数据
     * @returns {Promise<void>}
     */
    async commentData() {
      const res = await this.$http.get('/comment/' + this.$route.params.id)
      // 向父组件传递数据
      if(res.data){
        this.$emit('lengthselect',res.data.length)
      }
      this.commentList = this.changeCommentData(res.data)
    },
    /**
     * 利用递归改造数据
     */
    changeCommentData(data) {
      function fn(temp) {
        let arr1 = []
        for (let i = 0; i < data.length; i++) {
          if (data[i].parent_id == temp) {
            arr1.push(data[i])
            data[i].child = fn(data[i].comment_id)
          }
        }
        return arr1
      }
      return fn(null)
    },
    publishClick(id){
      this.$emit('publishClick',id)
    }

  },
  created() {
    this.commentData()
  }
}
</script>

<style lang="less">
.commentParent {
  padding: 20px 10px;
  background-color: #fff;

  > div {
    border-bottom: 1px solid #e7e7e7;

  }

  .commentItem {
    padding: 10px 0;
    display: flex;

    .userImg {
      margin-right: 10px;

      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }
    }

    .commentContent {
      flex: 1;
      position: relative;
      p {
        display: flex;
        justify-content: left;
        align-items: center;
        color: #999999;
        margin-bottom: 5px;
      }

      div {
        font-size: 13px;
        color: #212121;
      }
      .publishs{
        position: absolute;
        right: 0;
        color: #fb7299;
      }
    }

  }


}
</style>
