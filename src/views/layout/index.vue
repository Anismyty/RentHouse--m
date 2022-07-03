<template>
  <div>
    <!-- 页面跳转 -->
    <keep-alive :include="['search']">
      <router-view />
    </keep-alive>

    <!-- 底部导航栏 -->
    <van-tabbar class="buttom" route>
      <van-tabbar-item :to="{ name: 'home' }">
        <i slot="icon" class="iconfont icon-shouye"></i>
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item :to="{ path: '/search' }">
        <i slot="icon" class="iconfont icon-chazhaofangyuan"></i>
        <span>找房</span>
      </van-tabbar-item>
      <van-tabbar-item :to="{ path: '/news' }">
        <i slot="icon" class="iconfont icon-zixunhuoke"></i>
        <span>资讯</span>
      </van-tabbar-item>
      <van-tabbar-item :to="{ path: '/my' }">
        <i slot="icon" class="iconfont icon-wodexiao"></i>
        <span>我的</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayOut',
  data() {
    return {}
  },
}
</script>
<style lang="less" scoped>
/deep/.buttom {
  .iconfont {
    font-size: 40px;
  }
  .icon-chazhaofangyuan,
  .icon-zixunhuoke {
    font-size: 50px;
  }
  .van-tabbar-item {
    color: #325e1e;
    background-color: #e7ffdf !important;
  }
  .van-tabbar-item--active {
    color: #089236;
  }
}
.top {
  padding-bottom: 100px;
}
</style>
