<template>
  <div>
    <van-nav-bar title="地图找房" left-arrow @click-left="$router.go(-1)" />
    <baidu-map class="bm-view" :center="city" :zoom="zoom">
      <bm-scale anchor="BMAP_ANCHOR_BUTTON_LEFT" ofset="100"></bm-scale>
      <bm-navigation anchor="BMAP_ANCHOR_BUTTON_RIGHT"></bm-navigation>
      <i v-for="(e, i) in cityList" :key="i">
        <!-- 地图上的小点点 -->
        <bm-label
          v-if="count < 2"
          :position="{ lng: e.coord.longitude, lat: e.coord.latitude }"
          :content="e.label + '<br>' + e.count + '套'"
          :labelStyle="{
            backgroundColor: '#157e05',
            width: '50px',
            height: '40px',
            borderRadius: '50px',
            textAlign: 'center',
            color: 'white',
            border: '2px solid white',
            paddingTop: '10px',
          }"
          @click="deepOne(e.value, e.coord)"
        />
        <bm-label
          v-else
          :position="{ lng: e.coord.longitude, lat: e.coord.latitude }"
          :content="e.label + '  ' + e.count + '套'"
          :labelStyle="{
            backgroundColor: '#157e05',
            width: '100px',
            height: '25px',
            textAlign: 'center',
            color: 'white',
            border: '0px solid white',
            paddingTop: '10px',
          }"
          @click="deepOne(e.value, e.coord)"
        />
      </i>
    </baidu-map>

    <!-- 弹出层，还是不封装成组件了，东西也不多 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
      <van-cell title="房屋列表" class="title" :to="{ path: '/search' }">
        <template #right-icon>
          <i>更多房源</i>
        </template>
      </van-cell>
      <van-cell-group>
        <!-- :to="{ name: 'HousePage', params: { id: e.houseCode } } -->
        <van-cell
          v-for="(e, i) in detailList"
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
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script>
import { houseInfo, houseDetail } from '@/api/home'
import { getItem } from '@/utils/storage'
import { baseURL } from '@/utils/request'
export default {
  data() {
    return {
      city: this.$store.state.city.label,
      cityList: [],
      zoom: 11,
      count: 0,
      show: false,
      detailList: [],
      baseURL,
    }
  },
  methods: {
    //获取地区房源信息
    async getHouseInfo(params) {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: '0',
      })
      try {
        const { data } = await houseInfo(params)
        this.cityList = data.body
        this.$toast.success('获取房屋信息成功')
      } catch (err) {
        this.$toast('获取房屋信息失败')
      }
    },

    //获取房屋具体信息
    async getHouseDetails(params) {
      this.$toast.loading({
        message: '获取房屋信息中...',
        forbidClick: true,
        duration: '0',
      })
      try {
        const { data } = await houseDetail(params)
        this.detailList = data.body.list
        this.$toast('获取成功')
      } catch (err) {
        this.$toast('获取失败')
      }
    },
    deepOne(id, position) {
      if (this.count < 2) {
        this.city = { lng: position.longitude, lat: position.latitude }
        this.cityList = []
        this.zoom = this.zoom + 2 + this.count
        this.count++
        this.getHouseInfo({ id })
      } else {
        this.detailList = []
        this.getHouseDetails({ cityId: id })
        setTimeout(() => {
          this.show = !this.show
        }, 3000)
      }
    },
  },
  created() {
    this.getHouseInfo({ id: this.$store.state.city.value })
  },
}
</script>

<style lang="less" scoped>
.bm-view {
  width: 100%;
  height: 93vh;
}
/deep/.van-nav-bar {
  background-color: #235902;
  height: 7vh;
  .van-nav-bar__title {
    color: white;
    font-size: 40px;
    letter-spacing: 10px;
  }
  .van-icon {
    color: white;
  }
}
.title {
  height: 120px;
  background-color: #317439;
  align-items: center;
  .van-cell__title {
    font-size: 40px;
    color: black;
    font-weight: bold;
  }
}
.van-cell {
  img {
    width: 240px;
    height: 200px;
  }
  .van-cell__title {
    margin-left: 10px;
    h3 {
      width: 70%;
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
        font-style: normal;
        background-color: #83da85;
        color: #204911;
        padding: 8px;
        margin-right: 10px;
      }
    }
    .price {
      color: red;
      font-weight: bold;
      font-size: 40px;
    }
  }
}
</style>
