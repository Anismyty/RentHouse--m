<template>
  <div>
    <button @click="fn">测试按钮</button>
  </div>
</template>

<script>
export default {
  name: 'news',
  methods: {
    fn() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '房源发布成功！',
          confirmButtonText: '继续发布',
          confirmButtonColor: '#255a1a',
          cancelButtonText: '去查看！',
          cancelButtonColor: '#bed6ff',
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          this.$router.push({ path: '/search' })
        })
    },
  },
}
</script>

<style lang="less" scoped></style>
