<template>
  <div>
    <div class="editBanner" @click="bannerClick">
      <span>{{ left }}</span>
      <span><slot name="right"></slot></span>
    </div>
  </div>

</template>

<script>
export default {
  name: "editBanner",
  props: ['left', 'right'],
  methods: {
    bannerClick() {
      this.$emit('bannerClick')
    }
  }
}
</script>

<style scoped lang="less">
.editBanner {
  background-color: #ffffff;
  padding: 10px 12px;
  border-bottom: 1px solid #eeeeee;
  font-size: 14px;
  color: #505050;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
