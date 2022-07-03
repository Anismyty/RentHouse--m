<template>
  <div>
    <van-nav-bar
      title="我的收藏"
      fixed
      left-arrow
      @click-left="$router.go(-1)"
    />

    <ItemList :list="list" v-if="list.length > 0" />
    <van-empty :style='{paddingTop:"100px"}' description="暂无收藏" v-else />
  </div>
</template>

<script>
import ItemList from '@/components/itemList'
import { getUserLike } from '@/api/user'
export default {
  name: 'Favorite',
  components: { ItemList },
  data() {
    return {
      list: [],
    }
  },
  methods: {
    async getUserLike() {
      this.$toast.loading({
        message: '获取列表...',
        forbidClick: true,
        duration: '0',
      })
      try {
        const { data } = await getUserLike()
        this.list = data.body
        this.$toast('收藏列表获取成功')
      } catch (err) {
        this.$toast('获取用户收藏信息失败')
      }
    },
  },
  created() {
    this.getUserLike()
  },
}
</script>

<style lang="less" scoped></style>
