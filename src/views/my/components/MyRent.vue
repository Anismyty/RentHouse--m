<template>
  <div>
    <div v-if="$store.state.admin">
      <!-- 没有发布房源的展示区 -->
      <div class="noHouse" v-if="PublishList.length === 0">
        <van-nav-bar fixed title="房屋管理" left-arrow @click-left="$router.go(-1)" />
        <van-empty image="search" description="暂无房源" />
        <div class="text">
          您还没有房源，<span @click="Fn">去发布房源</span>吧！
        </div>
      </div>

      <!-- 有发布房源的展示区 -->
      <div class="hadHouse" v-else>
        <van-nav-bar fixed title="房屋管理" left-arrow @click-left="$router.go(-1)">
          <template #right>
            <van-icon name="add-o" />
            <span @click="Fn">继续<br />发布</span>
          </template>
        </van-nav-bar>
        <ItemList :list="PublishList" />
      </div>
    </div>

    <router-view />
  </div>
</template>

<script>
import { getPublishHouse } from '@/api/user'
import ItemList from '@/components/itemList'
export default {
  name: 'MyRent',
  components: { ItemList },
  data() {
    return {
      admin: true,
      PublishList: [],
    }
  },
  methods: {
    Fn() {
      this.$store.commit('setAdmin', false)
      this.$router.push({ path: '/MyRent/PublishHouse' })
    },
    async getUserPublish() {
      this.$toast.loading({
        message: '获取列表...',
        forbidClick: true,
        duration: '0',
      })
      try {
        const { data } = await getPublishHouse()
        this.PublishList = data.body
        this.$toast('列表获取成功')
      } catch (err) {
        this.$toast('获取信息失败！')
      }
    },
  },
  created() {
    this.getUserPublish()
  },
}
</script>

<style lang="less" scoped>
.noHouse {
  .text {
    width: 100%;
    font-size: 30px;
    text-align: center;
    span {
      color: #07570b;
      font-weight: bold;
      letter-spacing: 5px;
      font-style: italic;
      margin-right: 10px;
      border-bottom: 1px solid #07570b;
    }
  }
}
.van-nav-bar__right {
  .van-icon {
    font-size: 40px;
    margin-right: 10px;
  }
  span {
    color: #abffaf;
    line-height: 28px;
  }
}
</style>
