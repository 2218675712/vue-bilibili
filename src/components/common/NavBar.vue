<template>
  <div class="navbar">
    <div class="logo">
      <img src="@/assets/img/logo.png" alt="">
    </div>
    <div>
      <p>
        <van-icon name="search" class="ipt-icon" />
        请输入文字
      </p>
    </div>
    <div>
      <img src="@/assets/img/default_img.jpg" alt="">
     <p>下载app</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped lang="less">
.navbar {
  height: 45px;
  background-color: #ffffff;
display: flex;
  .logo {
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width: 80%;
    }
  }
  div:nth-child(2){
    flex: 1;
    display: flex;
    align-items: center;
    margin: 0 5px;
    p{
      font-size: 12px;
      line-height: 26px;
      background-color: #f4f4f4;
      position: relative;
      padding-left: 30px;
      width: 100%;
      height: 23px;
      border-radius: 12px;
      color: #aaaaaa;
      .ipt-icon{
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translate(0,-40%);
        color: #aaaaaa;
      }
    }
  }
  div:nth-child(3){
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width: 24px;
      height: 24px;
    }
    p{
      padding: 4px 10px;
      margin: 0 8px;
      background-color: #fb7299;
      color: #ffffff;
      font-size: 12px;
      border-radius: 2px;
    }
  }

}
</style>
