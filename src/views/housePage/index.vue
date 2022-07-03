<template>
  <div>
    <van-nav-bar
      fixed
      :title="list.community"
      left-arrow
      @click-left="$router.go(-1)"
    />

    <div class="center">
      <!-- 轮播图 -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(e, i) in list.houseImg" :key="i">
          <img :src="baseURL + e" alt="" />
        </van-swipe-item>
      </van-swipe>
      <!-- 轮播图 -->

      <!-- 信息面板 -->
      <div class="infoPanel">
        <!-- 标题 -->
        <p class="title">{{ list.title }}</p>
        <!-- 标签 -->
        <!-- :style="{ backgroundColor: randonColor }" -->
        <div class="tags">
          <i v-for="(e, i) in list.tags" :key="i">{{ e }}</i>
        </div>
        <!-- 介绍1 -->
        <div class="houseInfo1">
          <div>
            <span>{{ list.price }}/月</span>
            <i>租金</i>
          </div>
          <div>
            <span>{{ list.roomType }}</span>
            <i>房型</i>
          </div>
          <div>
            <span>{{ list.size }}平米</span>
            <i>面积</i>
          </div>
        </div>
        <!-- 介绍2 -->
        <van-row>
          <van-col span="12">
            <span>装修：</span>
            <i>精装</i>
          </van-col>
          <van-col span="12">
            <span>朝向：</span>
            <i>{{ orienred }}</i>
          </van-col>
          <van-col span="12">
            <span>楼层：</span>
            <i>{{ list.floor }}</i>
          </van-col>
          <van-col span="12">
            <span>类型：</span>
            <i>普通住宅</i>
          </van-col>
        </van-row>
      </div>
      <!-- 信息面板 -->

      <!-- 地图 -->
      <div class="map">
        <p>小区：{{ list.community }}</p>
        <SmallMap :center="housePosition" :title="list.community" />
      </div>
      <!-- 地图 -->

      <!-- 房屋配套设施 -->
      <div class="supporting">
        <p>房屋配套设施</p>
        <van-row v-if="houseSupport.length > 0">
          <van-col span="6" v-for="(e, i) in houseSupport" :key="i">
            <span :class="e.className"></span>
            <i>{{ e.name }}</i>
          </van-col>
        </van-row>
        <van-empty image="error" description="暂无信息" v-else />
      </div>
      <!-- 房屋配套设施 -->

      <!-- 房源概况 -->
      <div class="houser">
        <h5>房源概况</h5>
        <van-cell title="XX房主" label="认证……">
          <template #icon>
            <van-image
              width="50px"
              height="50px"
              fit="cover"
              round
              src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            />
          </template>
          <template #right-icon>
            <van-button size="small" color="#038a08">发消息</van-button>
          </template>
        </van-cell>
        <p>{{ list.description !== '' ? list.description : text }}</p>
      </div>
      <!-- 房源概况 -->

      <!-- 猜你喜欢 -->
      <div class="like">
        <h5>猜你喜欢</h5>
        <ul>
          <li>占位</li>
          <li>占位</li>
          <li>占位</li>
          <li>占位</li>
          <li>占位</li>
        </ul>
      </div>
      <!-- 猜你喜欢 -->
    </div>

    <footer>
      <div class="box1">
        <em :class="{ like2: liking }" v-if="loading" @click="clickLike">
          <i class="iconfont icon-shoucang"></i>
          <span>收藏</span>
        </em>
        <van-loading type="spinner" color="#0094ff" v-else>加载中</van-loading>
      </div>
      <div class="box2">
        <i class="iconfont icon-zaixiankefu"></i>
        <span>在线咨询</span>
      </div>
      <div class="box3">
        <i class="iconfont icon-24gf-telephone2"></i>
        <span>电话预约</span>
      </div>
    </footer>
  </div>
</template>

<script>
import { baseURL } from '@/utils/request'
import { getHouseDetail } from '@/api/home'
import { getUserLike, addLike, delLike } from '@/api/user'
import { mapState } from 'vuex'

import SmallMap from './components/map.vue'
export default {
  name: 'HouseDetail',
  components: {
    SmallMap,
  },
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      list: [],
      likeList: [],
      liking: false,
      baseURL,
      orienred: '',
      housePosition: {},
      supportIcon: [
        {
          name: '沙发',
          className: 'iconfont icon-shafa',
        },
        {
          name: '衣柜',
          className: 'iconfont icon-yigui',
        },
        {
          name: '冰箱',
          className: 'iconfont icon-bingxiang',
        },
        {
          name: '暖气',
          className: 'iconfont icon-nuanqi',
        },
        {
          name: '洗衣机',
          className: 'iconfont icon-xiyiji',
        },
        {
          name: '网络',
          className: 'iconfont icon-wifi',
        },
        {
          name: '电视',
          className: 'iconfont icon-dianshi',
        },
        {
          name: '天然气',
          className: 'iconfont icon-meiqitianranqi',
        },
        {
          name: '热水器',
          className: 'iconfont icon-reshuiqianzhuang',
        },
        {
          name: '空调',
          className: 'iconfont icon-kongdiao',
        },
      ],
      houseSupport: [],
      text: '1.住宅不是炫耀的标签，生活是用来享受的 品质生活在于细节 看看自然淳翠的绿，听听半山天籁之音; 2.繁华一展王侯笑，富贵不让帝王家 观山、观水、观天下!福天、福地、福人居! 大奢于心、小奢于墅',
      loading: true,
    }
  },
  methods: {
    //获取文章信息
    async getHouseDetail() {
      this.$toast.loading({
        message: '获取信息...',
        forbidClick: true,
        duration: '0',
      })
      try {
        const { data } = await getHouseDetail(this.id)
        this.list = data.body
        this.orienred = data.body.oriented.join('、')
        this.housePosition = {
          lng: Number(data.body.coord.longitude),
          lat: Number(data.body.coord.latitude),
        }
        if (data.body.supporting.length > 0) {
          data.body.supporting.forEach((item) => {
            this.supportIcon.forEach((e) => {
              if (item === e.name) {
                this.houseSupport.push(e)
              }
            })
          })
        }
        this.getUserLike()
      } catch (err) {
        this.$toast('信息获取失败，请稍后重试')
      }
    },

    //渲染收藏
    async getUserLike() {
      if (this.user) {
        try {
          const { data } = await getUserLike()
          this.likeList = data.body
          this.liking =
            this.likeList.every((e) => {
              return e.houseCode !== this.list.houseCode
            }) === false
              ? true
              : false
          this.$toast('信息获取成功')
        } catch (err) {
          this.$toast('获取用户收藏信息失败')
        }
      } else {
        this.$toast('信息获取成功')
      }
    },

    clickLike() {
      if (this.liking) {
        this.delLike()
      } else {
        this.addLike()
      }
    },

    //收藏
    async addLike() {
      if (this.user) {
        this.loading = false
        try {
          await addLike(this.list.houseCode)
          setTimeout(() => {
            this.$toast.success('收藏成功')
            this.loading = true
            this.liking = true
          }, 3000)
        } catch (err) {
          this.$toast('收藏房源失败，请稍后重试！')
        }
      } else {
        this.$dialog
          .confirm({
            title: '好客租房',
            message: '您还未登录，请问是否跳转登录页面',
          })
          .then(() => {
            // on confirm
            this.$router.push({ path: '/login' })
          })
          .catch(() => {
            // on cancel
          })
      }
    },

    //取消收藏
    async delLike() {
      this.loading = false
      try {
        await delLike(this.list.houseCode)
        setTimeout(() => {
          this.loading = true
          this.liking = false
          this.$toast.fail('取消收藏')
        }, 3000)
      } catch (err) {
        this.$toast('取消收藏房源失败，请稍后重试！')
      }
    },
  },
  computed: {
    ...mapState(['user']),
  },
  created() {
    this.getHouseDetail()
  },
}
</script>

<style lang="less" scoped>
/deep/.van-nav-bar {
  background-color: #056512;
  .van-nav-bar__title {
    font-size: 30px;
    color: white;
    letter-spacing: 10px;
  }
  .van-icon {
    color: white;
  }
}
//标签背景动画
@keyframes mymove {
  50% {
    background-color: #007ad1;
  }
  100% {
    background-color: #004e8a;
  }
}

/deep/.center {
  padding-top: 90px;
  padding-bottom: 100px;
  .my-swipe {
    height: 520px;
    background-color: #ffffff;
    img {
      width: 100%;
      height: 450px;
    }
    .van-swipe__indicator {
      width: 20px;
      height: 20px;
      background-color: #3b3b3b;
    }
    .van-swipe__indicator--active {
      background-color: #303030 !important;
    }
  }
  .infoPanel {
    margin-top: 30px;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #fff;
    .title {
      padding-top: 30px;
      font-size: 30px;
      margin: 0;
      padding-bottom: 20px;
    }
    .tags {
      padding-bottom: 20px;
      border-bottom: 1px solid #a4a4a4;
      i {
        display: inline-block;
        padding: 5px 10px;
        font-size: 10px;
        font-style: normal;
        margin-right: 30px;
        background-color: #004e8a;
        -webkit-animation: mymove 2s infinite; /* Chrome, Safari, Opera */
        animation: mymove 2s infinite;
        color: #a1f68a;
      }
    }
    .houseInfo1 {
      padding-top: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #a4a4a4;
      display: flex;
      justify-content: space-around;
      align-items: center;
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        span {
          color: #a80000;
          font-size: 40px;
          font-weight: bold;
        }
        i {
          margin-top: 10px;
          font-style: normal;
          font-size: 30px;
        }
      }
    }
    .van-row {
      padding-top: 30px;
      padding-bottom: 30px;
      .van-col {
        span {
          font-size: 30px;
          color: #989898;
        }
        i {
          font-size: 35px;
          font-style: normal;
          font-family: '楷体';
        }
      }
    }
  }
  .map {
    margin-top: 30px;
    width: 100vw;
    background-color: #fff;
    p {
      padding-left: 30px;
      margin: 0;
      padding-top: 30px;
      font-size: 30px;
    }
  }
  .supporting {
    margin-top: 30px;
    padding-left: 30px;
    padding-right: 30px;
    background-color: #fff;
    padding-bottom: 20px;
    p {
      padding-top: 30px;
      margin: 0;
      padding-bottom: 20px;
      border-bottom: 1px solid #a4a4a4;
      font-size: 30px;
      font-weight: bold;
    }
    .van-row {
      padding-top: 10px;
      .van-col {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        span {
          font-size: 50px;
          color: #757575;
        }
        i {
          font-style: normal;
          font-size: 30px;
        }
      }
    }
  }
  .houser {
    margin-top: 30px;
    padding-left: 30px;
    padding-right: 30px;
    background-color: #fff;
    h5 {
      padding-top: 30px;
      margin: 0;
      padding-bottom: 20px;
      border-bottom: 1px solid #a4a4a4;
      font-size: 30px;
    }
    .van-cell {
      padding: 0;
      padding-top: 30px;
      .van-image {
        margin-right: 20px;
      }
    }
    p {
      font-size: 30px;
      margin: 0;
      padding: 30px 0;
      line-height: 50px;
    }
  }
  .like {
    margin-top: 30px;
    padding-left: 30px;
    padding-right: 30px;
    background-color: #fff;
    h5 {
      padding-top: 30px;
      margin: 0;
      padding-bottom: 20px;
      border-bottom: 1px solid #a4a4a4;
      font-size: 30px;
    }
  }
}
footer {
  height: 100px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-top: 1px solid #2c2c2c;
  div {
    flex: 1;
    text-align: center;
    height: 100%;
    line-height: 100px;
    font-size: 40px;
    font-family: '楷体';
  }
  i {
    font-size: 40px;
    margin-right: 10px;
  }
  .box1 {
    background-color: #d7d7d7;
    i {
      font-size: 50px;
    }
    span {
      color: black;
      font-style: normal;
    }
  }
  .box2 {
    background-color: #f5f5f5;
    border-right: 1px solid #2c2c2c;
    border-left: 1px solid #2c2c2c;
  }
  .box3 {
    background-color: #1e6103;
    color: white;
    i {
      color: #b5ffe5;
    }
  }
}
.like2 {
  color: red !important;
}
</style>
