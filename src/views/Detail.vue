<template>
  <div>
    <div class="detailItem" @click="$router.push(`/detail/${detailItem.id}`)">
      <div class="imgParent">
      <img :src="detailItem.img" alt="">
        <span class="video">1233</span>
        <span class="comment">66</span>
      </div>
     <p> {{ detailItem.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Detail",
  props: ['detailItem']
}
</script>

<style scoped lang="less">
.imgParent{
  position: relative;
  img{
    width: 100%;
    height: 100%;
  }
  .video{
    position: absolute;
    left: 5px;
   bottom: 5px;
  }
  .comment{
    position: absolute;
    right: 5px;
   bottom: 5px;
  }
}
p{
  font-size: 12px;
}
</style>
