<template>
  <div class="userdetail">
    <div>
      <div class="user_img">
        <img src="@/assets/img/default_img.jpg" alt="">
      </div>
      <div class="user_edit">
        <div>
          <p>
            <span>0</span>
            <span class="user_text">粉丝</span>
          </p>
          <p>
            <span>0</span>
            <span class="user_text">关注</span>
          </p>
          <p>
            <span>0</span>
            <span class="user_text">获赞</span>
          </p>
        </div>
        <div @click="$router.push('/edit')">
          <div class="user_editBtn">
            编辑资料
          </div>
        </div>
      </div>
    </div>
    <div>
      <h2>{{ userinfo.name }}</h2>
      <p>这个人很神秘，什么都没有写</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "userDetail",
  props:['userinfo']
}
</script>

<style scoped lang="less">
.userdetail {
  background-color: #ffffff;
  padding: 8px 12px;

  > div:nth-child(1) {
    display: flex;

    .user_img {
      margin-right: 20px;

      img {
        height: 85px;
        width: 85px;
        border-radius: 50%;
      }
    }

    .user_edit {
      flex: 1;

      div:nth-child(1) {
        display: flex;

        p {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          font-size: 13px;
          position: relative;

          .user_text {
            color: #aaaaaa;
          }

          &:not(:last-child)::after {
            position: absolute;
            content: '';
            width: 1px;
            height: 16px;
            border-right: 1px solid #cccccc;
            right: 0;

          }
        }
      }

      div:nth-child(2) {
        padding: 5px 10px;

        .user_editBtn {
          background: #fff;
          border: 1px solid #fb7299;
          color: #fb7299;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 3px;
          padding: 3px;
          font-size: 13px;
        }
      }
    }
  }

  > div:nth-child(2) {
    h2 {
      margin: 10px 0 3px 0;
      font-size: 18px;
      font-weight: 500;
    }

    p {
      padding: 0;
      margin: 10px 0;
      font-size: 12px;
      color: #999999;
    }
  }

}
</style>
