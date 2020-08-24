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
          <div @click="collectionClick">
            <span class="icon-star-full" :class="{'activeColor':collectionActive}"></span>
            <span :class="{'activeColor':collectionActive}">收藏</span>
          </div>
          <div @click="subscriptClick">
            <span class="icon-bubble" :class="{'activeColor':subscriptionActive}"></span>
            <span :class="{'activeColor':subscriptionActive}">关注</span>
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
      <comment-title
        :dataLength="lens"
        @Postcomment="PostSuccess"
        ref="commentIpt">
      </comment-title>
      <comment
        @lengthselect="len=>lens=len"
        @publishClick="PostChildClick"
        ref="commentPublish">
      </comment>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar";
import Detail from "@/views/Detail";
import CommentTitle from "@/components/article/commentTitle";
import Comment from "@/components/article/comment";
import {Toast} from "vant";


export default {
  name: "Article",
  components: {Comment, CommentTitle, Detail, NavBar},
  data() {
    return {
      model: null,
      commendList: null,
      lens: null,
      Postcom: {
        comment_content: '',
        comment_date: '',
        parent_id: null,
        article_id: null
      },
      collectionActive: null,
      subscriptionActive: null
    }
  },
  methods: {
    /*
    * 获取用户数据
    * */
    async articleItemData() {
      const res = await this.$http.get(`/article/${this.$route.params.id}`)
      this.model = res.data[0]
      if (this.model) {
        this.subscriptionInit()
      }
    },
    /**
     * 推荐数据
     * @returns {Promise<void>}
     */
    async commendData() {
      const res = await this.$http.get('/commend')
      this.commendList = res.data
    },
    /*
    * 发送评论
    * */
    async PostSuccess(res) {
      // 获取日期
      const date = new Date()
      let m = date.getMonth() + 1
      let d = date.getDate()
      if (m < 10) {
        m = '0' + m
      }
      m = m.toString()
      if (d < 10) {
        d = '0' + d
      }
      d = d.toString()
      let str = `${m}-${d}`

      this.Postcom.comment_content = res
      this.Postcom.comment_date = str
      this.Postcom.article_id = this.$route.params.id
      const result = await this.$http.post('/comment_post/' + localStorage.getItem('id'), this.Postcom)

      this.$refs.commentPublish.commentData()
      this.Postcom.parent_id = null
      if (result.status === 200) {
        Toast.success('评论发布成功')
      }

    },
    /*
    * 让鼠标获取焦点
    * */
    PostChildClick(id) {
      this.Postcom.parent_id = id
      this.$refs.commentIpt.focusIpt()
    },
    /*
    * 点击收藏文章
    * */
    async collectionClick() {
      const res = await this.$http.post('/collection/' + localStorage.getItem('id'), {article_id: this.$route.params.id})
      if (res.data.msg === '收藏成功') {
        this.collectionActive = true
      } else {
        this.collectionActive = false
      }

      Toast.success(res.data.msg)
    },
    /*
    * 进入页面获取收藏
    * */
    async collectionInit() {
      if (localStorage.getItem('token') && localStorage.getItem('id')) {
        const res = await this.$http.get('/collection/' + localStorage.getItem('id'), {
          params: {
            article_id: this.$route.params.id
          }
        })
        this.collectionActive = res.data.success
      }
    },
    /*
    * 点击关注用户
    * */
    async subscriptClick() {
      const res = await this.$http.post('/sub_scription/' + localStorage.getItem('id'), {sub_id: this.model.userinfo.id})
      if (res.data.msg === '关注成功') {
        this.subscriptionActive = true
      } else {
        this.subscriptionActive = false
      }

      Toast.success(res.data.msg)
    },
    /*
    * 进入页面获取关注
    * */
    async subscriptionInit() {
      if (localStorage.getItem('token') && localStorage.getItem('id')) {
        const res = await this.$http.get('/sub_scription/' + localStorage.getItem('id'), {
          params: {
            sub_id: this.model.userinfo.id
          }
        })
        this.subscriptionActive = res.data.success
      }
    }
  },
  created() {
    this.articleItemData()
    this.commendData()
    this.collectionInit()
  },
  watch: {
    /**
     * 监听路由变化重新渲染
     */
    $route() {
      this.articleItemData()
      this.commendData()
      this.collectionInit()
      this.subscriptionInit()
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

      .activeColor {
        color: #fb7299 !important;
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
