<template>
  <van-swipe :autoplay="3000" lazy-render>
    <van-swipe-item v-for="e in imgUrl" :key="e.id">
      <img :src="baseURL + e.imgSrc" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import { getBanner } from '@/api/home'
import { baseURL } from '@/utils/request'
export default {
  data() {
    return {
      imgUrl: [],
      baseURL,
    }
  },
  methods: {
    //请求图片数据
    async getBanner() {
      try {
        const { data } = await getBanner()
        this.imgUrl.push(...data.body)
      } catch (err) {
        this.$toast.fail('获取轮播图失败,请稍后尝试')
      }
    },
  },
  created() {
    this.getBanner()
  },
}
</script>
<style lang="less" scoped>
img {
  max-width: 100%;
}
</style>
