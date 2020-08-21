<template>
  <div class="home">
    <nav-bar :userinfo="model"></nav-bar>
    <van-tabs v-model="active" sticky swipeable>
      <van-tab v-for="(item,index) in category" :title="item.title" :key="index">
        <van-list
          v-model="item.loading"
          :finished="item.finished"
          finished-text="我也是有底线的"
          @load="onLoad"
          :immediate-check=false>
          <div class="detailParent">
            <detail
              class="detailItem"
              :detailItem="categoryItem"
              v-for="(categoryItem,categoryIndex) in item.list"
              :key="categoryIndex"></detail>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>

</template>

<script>
import NavBar from "@/components/common/NavBar";
import Detail from "@/views/Detail";

export default {
  name: "Home",
  components: {Detail, NavBar},
  data() {
    return {
      model: [],
      category: [],
      active: 0,
      list: [],

    }
  },
  methods: {
    /**
     * 获取用户头像
     * @returns {Promise<void>}
     */
    async selectUser() {
      const res = await this.$http.get('/user/' + localStorage.getItem('id'))
      this.model = res.data[0]
    },
    /**
     * 拿到导航栏
     * @returns {Promise<void>}
     */
    async selectCategory() {
      const res = await this.$http.get('/category')
      this.changeCategory(res.data)
    },
    /**
     * 改造数据
     * @param data  数据
     */
    changeCategory(data) {
      this.category = data.map((item, index) => {
        item.list = []
        item.page = 0
        item.pagesize = 10
        item.finished = false
        item.loading = false

        return item
      })
      this.selectArticle()
    },
    /**
     * 查询内容数据
     * @returns {Promise<void>}
     */
    async selectArticle() {
      const categoryItem = this.categoryItem()
      const res = await this.$http.get(`detail/${categoryItem._id}`, {
        params: {
          page: categoryItem.page,
          pagesize: categoryItem.pagesize
        }
      })
      // 添加元数据到变量,加载新一轮数据
      categoryItem.list.push(...res.data)
      categoryItem.loading = false
      // 判断是否加载完成全部内容
      if (res.data.length < categoryItem.pagesize) {
        categoryItem.finished = true
      }
    },
    onLoad() {
      const categoryItem = this.categoryItem()
      setTimeout(() => {
        categoryItem.page += 1
        this.selectArticle()
      }, 1000)

    },
    /**
     * 获取当前的tab内容
     * @returns {*}
     */
    categoryItem() {
      return this.category[this.active]
    }
  },
  created() {
    this.selectCategory()
    this.selectUser()
  },
  watch: {
    /**
     * 监听active变化
     * @returns {Promise<void>}
     */
    active() {
      return this.selectArticle()
    }
  }
}
</script>

<style scoped lang="less">
.home {
  background-color: #ffffff;

  .detailParent {

    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .detailItem {
      margin: 5px 0;
      width: 45%;
    }

  }
}

</style>
