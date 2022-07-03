<template>
  <div class="search">
    <!-- 顶部搜索 -->
    <div class="top">
      <van-icon name="arrow-left" @click="$router.go(-1)" />
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        background="#4ab641"
      >
        <div
          slot="left-icon"
          class="icon"
          @click="$router.push({ path: '/city' })"
        >
          <span
            v-text="city === null ? $store.state.city.label : city.label"
          ></span>
          <i class="iconfont icon-xiangxiajiantoushixin"></i>
          <van-icon name="search" />
        </div>
      </van-search>
      <i
        class="iconfont icon-ditu1"
        @click="$router.push({ path: '/map' })"
      ></i>
    </div>
    <!-- 顶部搜索 -->

    <!-- 下拉选框 -->
    <van-dropdown-menu :class="{ fixedNavbar: isfixTab }" id="testNavBar">
      <!-- 区域 -->
      <van-dropdown-item title="区域" ref="area">
        <van-picker
          show-toolbar
          toolbar-position="bottom"
          :columns="ConditionOne"
          @confirm="onConfirm"
          @cancel="onCancel1"
        />
      </van-dropdown-item>

      <!-- 方式 -->
      <van-dropdown-item title="方式" ref="way">
        <van-picker
          show-toolbar
          toolbar-position="bottom"
          :columns="ConditionTwo"
          @confirm="onConfirm2"
          @cancel="onCancel2"
        />
      </van-dropdown-item>

      <!-- 租金 -->
      <van-dropdown-item title="租金" ref="rentPrice">
        <van-picker
          show-toolbar
          toolbar-position="bottom"
          :columns="ConditionThree"
          @confirm="onConfirm3"
          @cancel="onCancel3"
        />
      </van-dropdown-item>

      <!-- 筛选 -->
      <van-dropdown-item title="筛选" ref="other">
        <van-popup
          v-model="show"
          position="left"
          :style="{ height: '100%', width: '80%' }"
          :overlay="false"
        >
          <van-form @submit="onSubmit">
            <van-field
              v-for="(e, i) in otherCondition"
              :key="i"
              name="checkboxGroup"
              :label="e.name"
            >
              <template #input>
                <van-checkbox-group
                  v-model="groupChecked"
                  direction="horizontal"
                >
                  <!-- name属性是表单提交的数据 -->
                  <van-checkbox
                    v-for="(el, index) in e.list"
                    :key="index"
                    :name="el.value"
                    shape="square"
                    :class="{
                      active:
                        groupChecked.every((e) => {
                          return e !== el.value
                        }) === false
                          ? true
                          : false,
                    }"
                    >{{ el.text }}</van-checkbox
                  >
                </van-checkbox-group>
              </template>
            </van-field>
            <div class="btns">
              <van-button type="danger" @click="clearChose">清除</van-button>
              <van-button type="primary" native-type="submit">
                提交
              </van-button>
            </div>
          </van-form>
        </van-popup>
      </van-dropdown-item>
    </van-dropdown-menu>
    <!-- 下拉选框 -->

    <!-- 房屋列表 -->
    <div class="houseList" ref="scrollDom">
      <ItemList
        :area="areaCondition"
        :subway="subwayCondition"
        :rentType="wayCondition === '' ? rentTypes : wayCondition"
        :price="priceCondition"
        :more="more"
      />
    </div>
    <!-- 房屋列表 -->
  </div>
</template>

<script>
import { getItem } from '@/utils/storage'
import { cityConditions } from '@/api/home'
import ItemList from './components/itemList.vue'
export default {
  name: 'search',
  components: { ItemList },
  props: {
    rentTypes: {
      type: Boolean,
      default: true,
    },
  },
  
  data() {
    return {
      //顶部搜索框
      value: '',
      show: true,
      city: getItem('CHOSECITY'),
      //吸顶配置
      isfixTab: false,
      //渲染列表的数据
      allConditions: [],
      ConditionOne: [],
      ConditionTwo: [],
      ConditionThree: [],
      otherCondition: [
        {
          name: '户型',
          list: [],
        },
        {
          name: '朝向',
          list: [],
        },
        {
          name: '楼层',
          list: [],
        },
        {
          name: '房屋亮点',
          list: [],
        },
      ],
      //传递给组件的数据
      //区域
      areaCondition: '',
      //地铁
      subwayCondition: '',
      //租房类型
      wayCondition: '',
      //租金
      priceCondition: '',
      //筛选条件
      groupChecked: [],
      more: '',
    }
  },
  methods: {
    //获得所有条件
    async getCityConditions(city) {
      try {
        const { data } = await cityConditions(city)
        this.allConditions = data.body
        //把数值的属性名label全部换成text
        const all = JSON.parse(
          JSON.stringify(data.body).replace(/label/g, 'text')
        )
        //给第一个不限的属性添加第二个不限标签
        const b = [
          {
            text: '不限',
          },
        ]
        //处理数据
        all.area.children[0]['children'] = b
        all.subway.children[0]['children'] = b
        this.ConditionOne.push(all.area, all.subway)
        this.ConditionTwo.push(...all.rentType)
        this.ConditionThree.push(...all.price)
        this.otherCondition[0].list.push(...all.roomType)
        this.otherCondition[1].list.push(...all.oriented)
        this.otherCondition[2].list.push(...all.floor)
        this.otherCondition[3].list.push(...all.characteristic)
      } catch (err) {
        this.$toast('获取信息失败！')
      }
    },

    //第一个选择框
    onConfirm(value, index) {
      //条件判断拿到选择的区域id
      if (index[0] === 0) {
        if (value[1] === '不限') {
          this.areaCondition = this.city.value
        } else if (value[2] === '不限') {
          this.areaCondition =
            this.ConditionOne[index[0]].children[index[1]].value
        } else {
          this.areaCondition =
            this.ConditionOne[index[0]].children[index[1]].children[
              index[2]
            ].value
        }
      } else {
        if (value[1] === '不限') {
          this.subwayCondition = ''
        } else if (value[2] === '不限') {
          this.subwayCondition = value[1]
        } else {
          this.subwayCondition =
            this.ConditionOne[index[0]].children[index[1]].children[
              index[2]
            ].value
        }
      }

      this.$refs.area.toggle()
    },

    //第二个选择框
    onConfirm2(value) {
      this.wayCondition = value.value
      this.$refs.way.toggle()
    },

    //第三个选择框
    onConfirm3(value) {
      this.priceCondition = value.value
      this.$refs.rentPrice.toggle()
    },

    //取消
    onCancel1() {
      this.$refs.area.toggle()
    },
    onCancel2() {
      this.$refs.way.toggle()
    },
    onCancel3() {
      this.$refs.rentPrice.toggle()
    },

    //吸顶效果
    handleTabFix() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      var offsetTop = document.querySelector('#testNavBar').offsetTop
      scrollTop > offsetTop ? (this.isfixTab = true) : (this.isfixTab = false)
    },

    // 激活后重新设置滚动条【记住滚动条位置】
    activateScroll() {
      this.$nextTick(() => {
        setTimeout(() => {
          let scrollDom = this.$refs.scrollDom
          scrollDom.scrollTop = this.tableScrollTop
        }, 13)
      })
    },

    //提交筛选条件
    onSubmit() {
      this.more = this.groupChecked.toString()
      this.$refs.other.toggle()
    },

    //清除筛选选中的条件
    clearChose() {
      this.groupChecked = []
    },
  },

  created() {
    this.getCityConditions({
      id: this.$store.state.city.value,
    })
  },

  //在mounted中监听页面滚动事件,并调用handleTabFix() 方法【如果开了缓存，这个钩子不执行】
  mounted() {
    // window.addEventListener('scroll', this.handleTabFix, true)
    //监听滚动条位置
    this.$refs.scrollDom.addEventListener(
      'scroll',
      (res) => {
        const height = res.target
        this.tableScrollTop = height.scrollTop
      },
      false
    )
  },

  //配合缓存吸顶
  activated() {
    window.addEventListener('scroll', this.handleTabFix, true)
    this.activateScroll()
  },

  beforeRouteLeave(to, from, next) {
    window.removeEventListener('scroll', this.handleTabFix, true)
    next()
  },

  beforeDestroy() {
    // 移除监听滚动条事件
    this.$refs.scrollDom.removeEventListener(
      'scroll',
      (res) => {
        const height = res.target
        this.scrollTop = height.scrollTop
      },
      false
    )
  },
}
</script>

<style lang="less" scoped>
.search {
  height: 93vh;
}
.top {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #4ab641;
  padding-bottom: 0;
  .icon-ditu1 {
    margin-right: 30px;
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
.icon {
  display: flex;
  align-items: center;
  .van-icon {
    margin-top: 5px;
    border-left: 1px solid #8d8d8d;
    padding-left: 10px;
    padding-right: 10px;
  }
  i {
    margin-left: 15px;
  }
}
/deep/.van-dropdown-menu__bar--opened {
  z-index: 10;
}
/* .van-popup--left {
  display: block !important;
} */
.fixedNavbar {
  position: fixed;
  width: 100%;
  z-index: 2032;
  top: 0;
  left: 0;
  padding-bottom: 10px;
}
/deep/.van-picker__toolbar {
  .van-picker__cancel {
    flex: 1;
    background-color: #8e928b;
    color: black;
    font-weight: bold;
    font-size: 30px;
    letter-spacing: 10px;
  }
  .van-picker__confirm {
    flex: 2;
    background-color: #377e01;
    color: white;
    font-weight: bold;
    font-size: 30px;
    letter-spacing: 10px;
  }
}
//这个设置了直接让吸顶无效了……
.houseList {
  height: 77vh;
  overflow-y: auto;
}

/deep/.van-form {
  .van-cell {
    .van-cell__title {
      width: 112px;
    }
    .van-checkbox {
      margin-bottom: 10px;
      position: relative;
      background-color: #89ff9a;
      border: 1px solid #076815;
      border-radius: 10px;
      .van-checkbox__icon {
        position: absolute;
        top: 0;
        left: 16px;
        visibility: hidden;
      }
      .van-checkbox__label {
        width: 140px;
        height: 60px;
        padding: 10px;
        text-align: center;
        line-height: 60px;
        margin: 0;
      }
    }
    .active {
      background-color: #ffc6fc !important;
      border: 1px solid #82387e !important;
    }
  }
  .btns {
    width: 100%;
    display: flex;
    .van-button {
      flex: 1;
    }
    .van-button__text {
      font-size: 40px;
      letter-spacing: 5px;
    }
  }
  .van-button--primary {
    background-color: #076815;
    flex: 2 !important;
  }
}
</style>
