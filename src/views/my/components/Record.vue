<template>
  <div>
    <van-nav-bar title="看房记录" left-arrow @click-left="$router.go(-1)" />
    <van-empty image="error" description="功能待开发" />
  </div>
</template>

<script>
export default {
  name: 'Favorite',
}
</script>

<style lang="less" scoped></style>
