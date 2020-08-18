<template>
  <div class="LoginTop">
    <div>1</div>
    <div>{{ middleTop }}</div>
    <div>1</div>
  </div>
</template>

<script>
export default {
  name: 'LoginTop',
  props: ['middleTop']
}
</script>

<style scoped lang="less">
.LoginTop {
  height: 45px;
  background-color: #ffffff;
  display: flex;

  div {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
  }
}
</style>
