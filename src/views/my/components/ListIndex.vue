<template>
  <van-row gutter="20">
    <van-col span="8" v-for="e in list" :key="e.id" @click="Fn(e.name)">
      <i :class="e.className"></i>
      <span>{{ e.title }}</span>
    </van-col>
  </van-row>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ListIndex',
  data() {
    return {
      list: [
        {
          id: 1,
          title: '我的收藏',
          name: 'Favorite',
          className: 'iconfont icon-tongbushoucang',
        },
        {
          id: 2,
          title: '我的出租',
          name: 'MyRent',
          className: 'iconfont icon-shouye1',
        },
        {
          id: 3,
          title: '看房记录',
          name: 'Record',
          className: 'iconfont icon-jilu',
        },
        {
          id: 4,
          title: '成为房主',
          name: 'BeHouser',
          className: 'iconfont icon-bg-file',
        },
        {
          id: 5,
          title: '个人资料',
          name: 'Profile',
          className: 'iconfont icon-gerenziliao',
        },
        {
          id: 6,
          title: '联系我们',
          name: 'AutoServe',
          className: 'iconfont icon-lianxikefu',
        },
      ],
    }
  },
  methods: {
    Fn(name) {
      if (this.user) {
        this.$router.push({ path: `/${name}` })
      } else {
        this.$router.push({ path: '/login' })
      }
    },
  },
  computed: {
    ...mapState(['user']), //如果只用到一次可以直接作为表达式插入，如果多次就写到这里
  },
}
</script>

<style lang="less" scoped>
.van-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 30px;
  i {
    font-size: 60px;
    color: #444444;
  }
  span {
    margin-top: 20px;
    font-size: 30px;
    color: #0c4107;
    font-weight: bold;
  }
}
</style>
