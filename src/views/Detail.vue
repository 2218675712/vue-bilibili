<template>
  <div @click="$router.push(`/article/${detailItem.id}`)">
    <div class="detailItem" @click="$router.push(`/detail/${detailItem.id}`)">
      <div class="imgParent">
        <img :src="detailItem.img" alt="">
        <div class="bottomShadow">
          <div class="left">
            <span class="icon-play2"></span>
            <span class="video">1233</span>
          </div>
          <div class="right">
            <span class="icon-file-text"></span>
            <span class="comment">66</span>
          </div>
        </div>
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
.imgParent {
  position: relative;

  img {
    width: 100%;
    height: 100%;
  }

  .bottomShadow {
    width: 100%;
    height: 16px;

    .video, .comment, .icon-play2, .icon-file-text {
      font-size: 12px;
      color: white;
      font-weight: 100;
    }

    .icon-play2, .icon-file-text {
      padding-right: 5px;
    }

    .left {
      position: absolute;
      left: 5px;
      bottom: 5px;
    }

    .right {
      position: absolute;
      right: 5px;
      bottom: 5px;
    }

    background: linear-gradient(0deg, rgba(0, 0, 0, .85), transparent);
  }
}

p {
  font-size: 12px;
}
</style>
