<template>
  <div>
    <div>
      <van-nav-bar
        fixed
        title="城市列表"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </div>
    <div class="listCity">
      <van-index-bar :sticky-offset-top="43" :index-list="rightList">
        <div v-for="(e, i) in cityListSort" :key="i">
          <van-index-anchor :index="e.letter" />
          <van-cell
            v-for="(val, index) in e.city"
            :key="index"
            :title="val.label"
            @click="show(val.label, val)"
          />
        </div>
      </van-index-bar>
    </div>
  </div>
</template>

<script>
import { getCity, getHotCity } from '@/api/home'
import { getItem } from '@/utils/storage'
export default {
  name: 'CityList',
  data() {
    return {
      cityListSort: [],
      rightList: [
        '#',
        '热',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
      ],
      city: getItem('CHOSECITY'),
    }
  },
  methods: {
    //获取全部城市信息
    async geCityList() {
      try {
        const { data } = await getCity({ level: 1 })
        let list = data.body
        //把城市按照字母分组
        let cityList = []
        list.map((e) => {
          let letter = e.short.substring(0, 1).toUpperCase()
          const flog = cityList.some((item) => item.letter === letter)
          if (!flog) {
            cityList.push({
              letter,
              city: [e],
            })
          } else {
            cityList.map((item, i) => {
              if (item.letter === letter) {
                cityList[i].city.push(e)
              }
            })
          }
        })

        //把缺少的字母补上
        let letterList = [
          'A',
          'B',
          'C',
          'D',
          'E',
          'F',
          'G',
          'H',
          'I',
          'J',
          'K',
          'L',
          'M',
          'N',
          'O',
          'P',
          'Q',
          'R',
          'S',
          'T',
          'U',
          'V',
          'W',
          'X',
          'Y',
          'Z',
        ]
        letterList.forEach((e) => {
          let flog = cityList.some((item) => item.letter === e)
          if (!flog) {
            cityList.push({
              letter: e,
              city: [
                {
                  label: '暂无城市',
                },
              ],
            })
          }
        })

        //对数组的letter字段继续排序
        this.cityListSort = cityList.sort((a, b) => {
          return a.letter.charCodeAt(0) - b.letter.charCodeAt(0)
        })
        //把热门城市加进去
        this.getHotCity()
      } catch (err) {
        this.$toast('获取城市列表失败，请稍后重试！')
      }
    },
    //获取热门城市
    async getHotCity() {
      try {
        const { data } = await getHotCity()
        const hotList = data.body
        this.cityListSort.unshift(
          {
            letter: '当前城市',
            city: [
              {
                label:
                  this.city === null
                    ? this.$store.state.city.label
                    : this.city.label,
              },
            ],
          },
          {
            letter: '热门城市',
            city: hotList,
          }
        )
      } catch (err) {
        this.$toast('获取热门城市失败，请稍后重试！')
      }
    },
    //选择城市
    show(city, e) {
      if (city === '暂无城市') {
        this.$toast('暂无城市')
        return
      }
      //随便设置的 = =
      if (city.length > 2) {
        this.$toast('该城市暂无房源')
        return
      }
      //把第一个点击的城市换成这个
      this.cityListSort[0].city[0].label = city
      //把城市信息存到vux
      this.$store.commit('setCity', e)
      this.$router.back()
    },
  },
  created() {
    this.geCityList()
  },
}
</script>

<style lang="less" scoped>
/deep/.van-nav-bar {
  background-color: #bee6a9;
  z-index: 99;
  .van-nav-bar__title {
    color: #208835;
    letter-spacing: 10px;
    font-weight: bold;
  }
}
/deep/.listCity {
  margin-top: 92px;
  .van-index-anchor {
    height: 92px;
    line-height: 92px;
    background-color: #629c43;
    font-size: 40px;
    color: white;
  }
  //侧边栏的字母列表
  .van-index-bar__sidebar {
    top: 55%;
    .van-index-bar__index {
      font-size: 20px !important;
      height: 40px;
      margin-bottom: 3px;
      color: #34e858;
    }
    .van-index-bar__index--active {
      color: #0e4c1a;
      font-weight: bold;
    }
  }
}
</style>
