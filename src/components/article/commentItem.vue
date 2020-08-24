<template>
  <div class="commentItems">
    <div class="commentItem" v-for="(item,index) in  commentChild" :key="index">
      <div class="userImg">
        <img v-if="item.userinfo&&item.userinfo.user_img" :src="item.userinfo.user_img" alt="">
        <img v-else src="@/assets/img/default_img.jpg" alt="">
        <p>
          <span v-if="item.userinfo">{{ item.userinfo.name }}</span>
          <span v-else>此用户暂未设置</span>
          <span>{{ item.comment_date }}</span>
        </p>
      </div>
      <div class="commentContent">
        <div>
          <div v-if="!temp">
            {{ item.comment_content }}
            <span class="publish">回复</span>
          </div>
          <div v-else>
            <span>回复</span>
            <span  style="color: #5090cc">{{ item.parent_user_info.name }}</span>
            <span>:{{ item.comment_content }}</span>
          </div>
        </div>
        <comment-item :commentChild="item.child" :temp="true"></comment-item>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "commentItem",
  props: ['commentChild', 'temp']
}
</script>

<style scoped lang="less">
.commentItems {
  //padding: 0 40px;
  .commentItem {
    display: flex;
    flex-direction: column;

    .userImg {
      display: flex;

      img {
        margin: 0 5px 10px;
      }

      p {
        display: flex;
        flex: 1;
        justify-content: space-between;
        align-items: center;
        color: #999999;
        margin-bottom: 5px;
      }
    }

    .commentContent {
      position: relative;
      > div:nth-child(1) {
        margin-left: 50px;
      }
      .publish{
        position: absolute;
        right: 15px;
        color: #fb7299;
      }
    }
  }


}
</style>
