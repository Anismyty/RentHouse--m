<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <!-- , params: { id: article.art_id } -->
    <van-cell
      v-for="(e, i) in list"
      :key="i"
      :to="{ name: 'HousePage', params: { id: e.houseCode } }"
    >
      <template #icon>
        <img slot="icon" :src="baseURL + e.houseImg" alt="" />
      </template>
      <template #title>
        <h3>{{ e.title }}</h3>
        <span class="desc">{{ e.desc }}</span>
        <div class="tag">
          <i v-for="(e, i) in e.tags" :key="i">{{ e }}</i>
        </div>
        <span class="price">{{ e.price }}元/月</span>
      </template>
    </van-cell>
  </van-list>
</template>

<script>
import img from '@/assets/1.jpeg'
import { baseURL } from '@/utils/request'
import { findHouse } from '@/api/home'

export default {
  name: 'ItemList',
  props: {
    area: {
      type: String,
    },
    subway: {
      type: String,
    },
    rentType: {
      type: [String, Boolean, null],
      default: null,
    },
    price: {
      type: String,
      default: null,
    },
    more: {
      type: String,
    },
  },
  data() {
    return {
      img,
      baseURL,
      list: [],
      loading: false,
      finished: false,
      start: 1,
      end: 10,
    }
  },
  methods: {
    async onLoad() {
      this.getHouseLists()
    },
    async getHouseLists() {
      this.$toast.loading({
        message: '获取信息...',
        forbidClick: true,
        duration: '0',
      })
      try {
        const { data } = await findHouse({
          cityId: this.$store.state.city.value,
          start: this.start,
          end: this.end,
          area: this.area,
          rentType: this.rentType,
          price: this.price,
          subway: this.subway,
          more: this.more,
        })
        const { list } = data.body
        this.list.push(...list)
        this.loading = false
        if (list.length > 0) {
          this.start = this.end + 1
          this.end = this.end + 10
        } else {
          this.finished = true
        }
        this.$toast('信息获取成功')
      } catch (err) {
        this.$toast('获取房屋信息失败，请稍后重试')
      }
    },
  },
  watch: {
    area: function (n) {
      this.list = []
      this.start = 1
      this.end = 10
      this.getHouseLists()
    },
    subway: function (n) {
      this.list = []
      this.start = 1
      this.end = 10
      this.getHouseLists()
    },
    rentType: function (n) {
      this.list = []
      this.start = 1
      this.end = 10
      this.getHouseLists()
    },
    price: function (n) {
      this.list = []
      this.start = 1
      this.end = 10
      this.getHouseLists()
    },
    more: function (n) {
      this.list = []
      this.start = 1
      this.end = 10
      this.getHouseLists()
    },
  },
}
</script>

<style lang="less" scoped>
img {
  width: 250px;
}
.van-cell__title {
  margin-left: 10px;
  width: 700px;
  overflow: hidden;
  h3 {
    width: 100%;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .desc {
    color: #777777;
    letter-spacing: 5px;
  }
  .tag {
    margin-bottom: 20px;
    i {
      display: inline-block;
      margin-bottom: 5px;
      font-style: normal;
      background-color: #83da85;
      color: #204911;
      padding: 2px 5px;
      margin-right: 10px;
    }
  }
  .price {
    color: red;
    font-weight: bold;
    font-size: 40px;
  }
}
</style>
