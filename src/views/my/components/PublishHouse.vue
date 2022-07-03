<template>
  <div>
    <!-- @click-left="
        () => {
          this.$store.commit('setAdmin', true)
          this.$router.go(-1)
        }
      " -->
    <!-- 头部区域 -->
    <van-nav-bar
      title="发布房源"
      left-arrow
      fixed
      @click-left="$router.go(-1)"
    />

    <div class="info">
      <h5>房源信息</h5>

      <!-- 表单区域 -->
      <van-form @submit="onSubmit">
        <!-- 小区 -->
        <!-- :placeholder="{$store.state.searchChose === null?'请选择小区':$store.state.searchChose.communityName}" -->

        <van-field
          v-model="community"
          is-link
          readonly
          input-align="right"
          name="community"
          label="小区名称"
          @click="$router.push({ path: '/MyRent/Search' })"
          placeholder="请选择小区"
        />
        <!-- 租金 -->
        <van-field
          v-model="rentPrice"
          name="price"
          label="租金"
          placeholder="请输入租金/月"
        >
          <template #right-icon>
            <span>￥/月</span>
          </template>
        </van-field>

        <!-- 建筑面积 -->
        <van-field
          v-model="placeArea"
          name="size"
          label="建筑面积"
          placeholder="请输入建筑面积"
        >
          <template #right-icon>
            <span>m²</span>
          </template>
        </van-field>

        <!-- 户型 -->
        <van-field
          v-model="roomTypeValue"
          is-link
          readonly
          name="roomType"
          label="户型"
          placeholder="请选择"
          input-align="right"
          @click="showRoomType = true"
        />
        <van-popup v-model="showRoomType" position="bottom">
          <van-picker
            :columns="roomType"
            @confirm="onConfirmRoomType"
            @cancel="showPicker = false"
            :show-toolbar="true"
            toolbar-position="top"
            :allow-html="true"
          />
        </van-popup>

        <!-- 所在楼层 -->
        <van-field
          v-model="floorValue"
          is-link
          readonly
          name="floor"
          label="所在楼层"
          placeholder="请选择"
          input-align="right"
          @click="showFloor = true"
        />
        <van-popup v-model="showFloor" position="bottom">
          <van-picker
            :columns="floor"
            @confirm="onConfirmFloor"
            @cancel="showPicker = false"
            :show-toolbar="true"
            toolbar-position="top"
          />
        </van-popup>

        <!-- 朝向 -->
        <van-field
          v-model="orientedValue"
          is-link
          readonly
          name="oriented"
          label="朝向"
          placeholder="请选择"
          input-align="right"
          @click="showOriented = true"
        />
        <van-popup v-model="showOriented" position="bottom">
          <van-picker
            :columns="oriented"
            @confirm="onConfirmOriented"
            @cancel="showOriented = false"
            :show-toolbar="true"
            toolbar-position="top"
          />
        </van-popup>

        <!-- 房屋标题 -->
        <div class="title">
          <van-cell title="房屋标题" />
          <van-field
            v-model="titleValue"
            name="title"
            placeholder="请输入标题（例如：整租 小区名 2室 5000元）"
          />
        </div>

        <!-- 房屋图像 -->
        <div class="img">
          <van-cell title="房屋图像" />
          <van-cell>
            <van-uploader
              v-model="fileList"
              :max-count="5"
              :after-read="afterRead"
            />
          </van-cell>
        </div>

        <!-- 房屋配置 -->
        <div class="support">
          <van-cell title="房屋配置" />
          <van-grid :column-num="5">
            <van-grid-item
              v-for="(e, i) in supportIcon"
              :key="i"
              :text="e.name"
              :class="{
                active:
                  choseSupportList.every((el) => {
                    return el !== e.name
                  }) === false
                    ? true
                    : false,
              }"
              @click="choseSupport(e.name)"
            >
              <span slot="icon" :class="e.className"></span>
            </van-grid-item>
          </van-grid>
        </div>

        <!-- 房屋描述 -->
        <div class="description">
          <van-cell title="房屋描述" />
          <van-field
            v-model="message"
            rows="2"
            autosize
            type="textarea"
            name="description"
            maxlength="50"
            placeholder="请输入房屋描述"
            show-word-limit
          />
        </div>

        <!-- 提交按钮 -->
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { cityConditions, postHouse, postHousePic } from '@/api/home'

//给原型加上方法，删除某个元素
Array.prototype.choseIndexOf = function (val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i
  }
  return -1
}
Array.prototype.removeChose = function (val) {
  var index = this.choseIndexOf(val)
  if (index > -1) {
    this.splice(index, 1)
  }
}

export default {
  name: 'PublishHouse',
  data() {
    return {
      community:
        this.$store.state.searchChose === null
          ? ''
          : this.$store.state.searchChose.communityName,
      rentPrice: '',
      placeArea: '',
      //筛选条件
      roomType: [],
      showRoomType: false,
      roomTypeValue: '',

      floor: [],
      showFloor: false,
      floorValue: '',

      oriented: [],
      showOriented: false,
      orientedValue: '',

      titleValue: '',

      fileList: [],
      fileInfo: [],

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
      choseSupportList: [],

      message: '',

      trans: '',
    }
  },
  methods: {
    Fn() {
      this.$store.commit('setAdmin', true)
      this.$router.go(-1)
    },

    //获取条件
    async getCondition(city) {
      try {
        const { data } = await cityConditions(city)
        let all = JSON.parse(
          JSON.stringify(data.body).replace(/label/g, 'text')
        )
        this.roomType.push(...all.roomType)
        this.floor.push(...all.floor)
        this.oriented.push(...all.oriented)
      } catch (err) {
        this.$toast('信息获取失败！')
      }
    },

    onConfirmRoomType(val) {
      this.roomTypeValue = val.text
      this.showRoomType = false
    },

    onConfirmFloor(val) {
      this.floorValue = val.text
      this.showFloor = false
    },
    onConfirmOriented(val) {
      this.orientedValue = val.text
      this.showOriented = false
    },

    //上传房子封面
    async afterRead(file) {
      /* formData.append('file', file.file)
      try {
        const res = await postHousePic(formData)
        console.log(res)
      } catch (err) {
        this.$toast('上传失败！')
      } */
      this.fileInfo.push(file.file)
    },

    //选择配置，把配置的选项存到数组里
    choseSupport(name) {
      let a = this.choseSupportList.every((e) => {
        return e !== name
      })
      if (a) {
        this.choseSupportList.push(name)
      } else {
        this.choseSupportList.removeChose(name)
      }
    },

    async onSubmit(val) {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '提交数据中',
      })

      let submitList = val
      //转换为小区的id
      submitList.community = this.$store.state.searchChose.community
      //添加房屋配置
      submitList.supporting = this.choseSupportList.join('|')
      //转换户型、楼层、朝向为value值
      this.formatParams(val.floor, this.floor)
      submitList.floor = this.trans
      this.formatParams(val.oriented, this.oriented)
      submitList.oriented = this.trans
      this.formatParams(val.roomType, this.roomType)
      submitList.roomType = this.trans
      //1.先发布图片的得到图片返回的路径
      const formData = new FormData()
      this.fileInfo.forEach((e) => {
        formData.append('file', e)
      })
      try {
        const { data } = await postHousePic(formData)
        const ALLPic = data.body
        submitList.houseImg = ALLPic.join('|')
        this.publishHouse(submitList)
      } catch (err) {
        this.$toast('上传失败！')
      }
    },

    //把户型等内容转成需要的参数
    formatParams(val, obj) {
      obj.forEach((e) => {
        if (e.text === val) {
          this.trans = e.value
          //   console.log(e.value)
        }
      })
    },

    //发布房屋的总信息
    async publishHouse(item) {
      try {
        await postHouse(item)
        this.$toast('发布成功！')
        //成功后弹出的框
        this.$dialog
          .confirm({
            title: '提示',
            message: '房源发布成功！',
            confirmButtonText: '继续发布',
            confirmButtonColor: '#255a1a',
            cancelButtonText: '去查看！',
            cancelButtonColor: '#bed6ff',
          })
          .then(() => {
            // on confirm
          })
          .catch(() => {
            this.$router.push({ path: '/search' })
          })
      } catch (err) {
        this.$toast('房屋发布失败！')
      }
    },
  },
  created() {
    this.getCondition({
      id: this.$store.state.city.value,
    })
  },
  // 组件内路由钩子
  beforeRouteLeave(to, from, next) {
    if (to.path !== '/MyRent/Search') {
      setTimeout(() => {
        this.$store.commit('setAdmin', true)
        next()
      }, 300)
    } else {
      next()
    }
  },
}
</script>

<style lang="less" scoped>
.info {
  padding-top: 100px;
  h5 {
    margin: 0;
    background-color: #fff;
    padding-left: 30px;
    padding-top: 30px;
    padding-bottom: 20px;
    color: #1c5311;
    border-bottom: 1px solid #ececec;
  }
  .iconfont {
    font-size: 60px;
  }
  /deep/.active {
    color: #226515 !important;
    font-weight: bold;
    .van-grid-item__text {
      color: #1e9a05;
    }
  }

  .title {
    margin-top: 10px;
  }

  .img {
    margin-top: 10px;
  }
  .description {
    margin-top: 10px;
  }
  .support {
    margin-top: 10px;
  }
}
</style>
