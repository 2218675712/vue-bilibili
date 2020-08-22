<template>
  <!--  让有数据在渲染-->
  <div v-if="model">
    <nav-bar :userinfo="model.userinfo"></nav-bar>
    <div class="detailInfo">
      <div class="video">
        <video :src="model.content" controls></video>
      </div>
      <div class="detailInfoText">
        <div>
          <span>{{ model.category.title }}</span>
          <span>{{ model.name }}</span>
        </div>
        <div>
          <span>{{ model.userinfo.name }}</span>
          <span>164W观看</span>
          <span>5281弹幕</span>
          <span>{{ model.userinfo.date }}</span>
        </div>
        <div>
          <div>
            <span class="icon-star-full"></span>
            <span>收藏</span>
          </div>
          <div>
            <span class="icon-box-add"></span>
            <span>缓存</span>
          </div>
          <div>
            <span class="icon-redo2"></span>
            <span>分享</span>
          </div>
        </div>
      </div>
    </div>
    <div class="detailParent">
      <detail
        v-for="(item,index) in commendList"
        :key="index"
        :detail-item="item"
        class="detailItem"></detail>
    </div>
    <div>
      <comment></comment>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar";
import Detail from "@/views/Detail";
import Comment from "@/components/article/commentTitle";

export default {
  name: "Article",
  components: {Comment, Detail, NavBar},
  data() {
    return {
      model: null,
      commendList: null,
    }
  },
  methods: {
    /*
    * 获取用户数据
    * */
    async articleItemData() {
      const res = await this.$http.get(`/article/${this.$route.params.id}`)
      this.model = res.data[0]
    },
    /**
     * 推荐数据
     * @returns {Promise<void>}
     */
    async commendData() {
      const res = await this.$http.get('/commend')
      this.commendList = res.data
    }
  },
  created() {
    this.articleItemData()
    this.commendData()
  },
  watch: {
    /**
     * 监听路由变化重新渲染
     */
    $route() {
      this.articleItemData()
      this.commendData()
    }
  }

}
</script>

<style scoped lang="less">
.detailInfo {
  width: 100%;
  background-color: #ffffff;

  video {
    width: 100%;
  }

  .detailInfoText {
    padding: 15px;


    > div:nth-child(1) {
      position: relative;

      span:nth-child(1) {
        position: relative;
        padding: 3px 5px;
        font-size: 12px;
        color: #fb7299;
        border-radius: 10px;
        background-color: #f4f4f4;
        top: -2px;
        margin-right: 10px;
      }
    }

    > div:nth-child(2) {
      margin: 15px 0;

      span {
        color: #999999;
        margin-right: 8px;
        vertical-align: middle;
        font-size: 12px;
      }

      span:nth-child(1) {
        color: #212121;
        font-size: 13px;
      }
    }

    > div:nth-child(3) {
      display: flex;
      justify-content: left;
      align-items: center;
      margin: 20px 0;

      > div {
        margin-right: 10px;
      }

      span:nth-child(1) {
        margin-right: 5px;
        font-size: 18px;
        color: #757575;
        vertical-align: middle;
      }

      span:nth-child(2) {
        color: #999999;
        margin-right: 8px;
        vertical-align: middle;
        font-size: 11px;
      }
    }
  }
}

.detailParent {

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: #fff;

  .detailItem {
    margin: 5px 0;
    width: 45%;
  }

}
</style>
