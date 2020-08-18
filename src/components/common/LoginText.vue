<template>
  <div>
    <van-field
      v-model="content"
      :label="label"
      :type="type"
      :placeholder="placeholder"
      :rule="rule"
    />

  </div>
</template>

<script>
export default {
  name: 'LoginText',
  props: ['label', 'type', 'placeholder', 'rule'],
  data() {
    return {
      content: ''
    }
  },
  methods: {
    /**
     * 判断正则
     */
    handleRule() {
      // 转换正则
      const rule = new RegExp(this.rule)
      if (rule.test(this.content)) {
        // 向父组件发送事件
        this.$emit('inputChange', this.content)
      }
    }
  },
  watch: {
    content() {
      this.handleRule()
    }
  }
}
</script>

<style scoped>

</style>
