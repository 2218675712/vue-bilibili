<template>
  <div>
    <nav-bar :userinfo="model"></nav-bar>
    <van-divider dashed :style="{ color: '#1a73e8', borderColor: '#1a73e8', padding: '0 16px' }">现有栏目</van-divider>
    <div class="new-category newcategory">
      <p @click="handleCategoryClick(index)" v-for="(item,index) in newCat" :key="index">{{ item.title }}</p>
    </div>
    <van-divider dashed :style="{ color: '#ee0a24', borderColor: '#ee0a24', padding: '0 16px' }">已删除栏目</van-divider>
    <div class="new-category delcategory">
      <p @click="deleteCategoryClick(index)" v-for="(item,index) in delCat" :key="index">{{ item.title }}</p>

    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar";
import {Toast} from "vant";

export default {
  name: "EditCategory",
  components: {NavBar},
  data() {
    return {
      model: [],
      newCat: [],
      delCat: []
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
     * 获取新栏目
     * @returns {Promise<void>}
     */
    async selectCategory() {
      const res = await this.$http.get('/category')
      this.newCat = res.data
    },
    /**
     * 删除栏目
     * @param index 栏目索引
     */
    handleCategoryClick(index) {
      if (this.newCat.length<4){
        Toast.fail('栏目不能小于3')
        return
      }
      // 将删除的数组添加到删除元素
      this.delCat.push(this.newCat[index])
      // 删除数组方法
      this.newCat.splice(index, 1)

    },
    /**
     * 添加栏目
     * @param index 栏目索引
     */
    deleteCategoryClick(index) {
      // 将删除的数组添加到删除元素
      this.newCat.push(this.delCat[index])
      // 删除数组方法
      this.delCat.splice(index, 1)

    }
  },
  created() {
    this.selectUser()

    if (localStorage.getItem('newCat') && localStorage.getItem('delCat')) {
      this.newCat=JSON.parse(localStorage.getItem('newCat'))
      this.delCat=JSON.parse(localStorage.getItem('delCat'))
      return
    }
    this.selectCategory()

  },
  watch: {
    newCat() {
      localStorage.setItem('newCat', JSON.stringify(this.newCat))
      localStorage.setItem('delCat', JSON.stringify(this.delCat))
    }

  }
}
</script>

<style scoped lang="less">
.new-category {
  padding: 0 2.778vw;
  display: flex;
  flex-wrap: wrap;

  p {
    width: 20%;
    text-align: center;
    margin: 1.389vw 1.944vw;
    padding: 1.944vw 0vw;
  }
}

.newcategory {
  p {
    color: #1a73e8;
    border: 0.278vw solid #1a73e8;
  }
}

.delcategory {
  p {
    color: #ee0a24;
    border: 0.278vw solid #ee0a24;
  }
}
</style>
