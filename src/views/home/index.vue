<template>
  <div>
    <!-- 顶部搜索栏 -->
    <div class="top">
      <div class="place" @click="$router.push({ path: '/city' })">
        <span
          v-text="city === null ? $store.state.city.label : city.label"
        ></span>
        <i class="iconfont icon-xiangxiajiantoushixin"></i>
      </div>
      <van-icon name="search" />
      <input type="text" placeholder="请输入小区或地址" />
      <i
        class="iconfont icon-ditu1"
        @click="$router.push({ path: '/map' })"
      ></i>
    </div>
    <!-- 顶部搜索栏 -->

    <!-- 轮播图 -->
    <RotationChart></RotationChart>
    <!-- 轮播图 -->

    <!-- 选项卡 -->
    <div class="tablist">
      <div
        @click="$router.push({ name: 'search', params: { rentTypes: true } })"
      >
        <i class="iconfont icon-pinzhizhengzu"></i>
        <span>整租</span>
      </div>
      <div
        @click="$router.push({ name: 'search', params: { rentTypes: false } })"
      >
        <i class="iconfont icon-haoyoutuijie"></i>
        <span>合租</span>
      </div>
      <div @click="$router.push({ path: '/map' })">
        <i class="iconfont icon-ditu"></i>
        <span>地图找房</span>
      </div>
      <div @click="goRent">
        <i class="iconfont icon-fangwuchuzu"></i>
        <span>去出租</span>
      </div>
    </div>
    <!-- 选项卡 -->

    <!-- 租房小组 -->
    <div class="rental-group">
      <van-cell title="租房小组" value="更多">
        <template #icon>
          <i class="iconfont icon-xiaozu"></i>
        </template>
      </van-cell>
      <div class="content">
        <ul>
          <li v-for="(e, i) in groupList" :key="i">
            <van-image
              width="50px"
              height="50px"
              fit="cover"
              round
              :src="baseURL + e.imgSrc"
            />
            <div>
              <span>{{ e.title }}</span>
              <em>{{ e.desc }}</em>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 租房小组 -->
  </div>
</template>

<script>
/* eslint-disable */
import RotationChart from './components/RotationChart.vue'
import { getItem } from '@/utils/storage'
import { rentGroup } from '@/api/home'
import { baseURL } from '@/utils/request'

export default {
  name: 'Home',
  components: {
    RotationChart,
  },
  data() {
    return {
      show: false,
      city: getItem('CHOSECITY'),
      groupList: [],
      baseURL,
    }
  },
  methods: {
    //根据城市获得小组
    async getRentGroup() {
      try {
        const area =
          this.city === null ? this.$store.state.city.value : this.city.value
        const { data } = await rentGroup({ area })
        this.groupList = data.body
      } catch (err) {
        this.$toast('获取租房小组失败')
      }
    },
    goRent() {
      this.$store.commit('setAdmin', false)
      this.$router.push({ path: '/MyRent/PublishHouse' })
    },
  },
  created() {
    this.getRentGroup()
  },
}
</script>

<style lang="less" scoped>
.top {
  width: 100%;
  background-color: transparent;
  position: fixed;
  top: 50px;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  .place {
    position: absolute;
    left: 60px;
    top: 4px;
    border-right: 1px solid #8d8d8d;
    display: flex;
    align-items: center;
    margin-top: 13px;
    padding-right: 20px;
    span {
      font-size: 25px;
    }
    i {
      margin-top: 5px;
      color: #a9a9a9;
      margin-left: 5px;
    }
  }
  .van-icon {
    position: absolute;
    left: 175px;
    top: 15px;
    font-size: 40px;
    color: #9b9b9b;
  }
  input {
    border: none;
    height: 65px;
    border-radius: 10px;
    padding-left: 190px;
    width: 400px;
    font-size: 25px;
  }
  .icon-ditu1 {
    margin-left: 30px;
    font-size: 45px;
    color: white;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    border-radius: 50px;
    border: 5px solid white;
  }
}
.tablist {
  display: flex;
  align-items: center;
  width: 100%;
  height: 250px;
  background-color: #fff;
  div {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
      font-size: 30px;
      margin-top: 20px;
      //把字体设置为楷体
      font-family: '楷体';
      font-weight: bold;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    i {
      font-size: 70px;
      color: #096513;
      width: 100px;
      height: 100px;
      text-align: center;
      line-height: 100px;
      background-color: #e1ffe5;
      border-radius: 100px;
    }
  }
}
/deep/ .rental-group {
  //标题
  .van-cell {
    margin-top: 30px;
    i {
      font-size: 30px;
      margin-right: 10px;
      color: #65976b;
    }
    .van-cell__title {
      font-size: 30px;
      font-weight: bold;
      letter-spacing: 5px;
    }
  }
  //内容
  .content {
    background-color: #fff;
    padding-bottom: 20px;
    ul {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      li {
        width: 48%;
        background-color: #a7c4ab;
        margin-top: 10px;
        display: flex;
        align-items: center;
        border-radius: 20px;
        .van-image {
          margin-left: 10px !important;
          margin-right: 20px;
        }
        div {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          span {
            font-size: 40px;
            font-family: '华文新魏';
          }
          em {
            margin-top: 10px;
            font-size: 20px;
            color: #8a0707;
            //设置字体为华文彩云
            font-family: '华文琥珀';
            letter-spacing: 10px;
          }
        }
      }
    }
  }
}
</style>
