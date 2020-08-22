<template>
  <div id="app">
    <!--    判断有没有状态-->
    <keep-alive>
      <router-view v-if="$route.meta.keepalive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepalive"/>

  </div>
</template>
<style>
/*引入重置css*/
@import "assets/less/reset.less";
/*引入字体图标*/
@import "assets/style.css";
</style>
