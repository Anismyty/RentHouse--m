<template>
  <div>
    <div class="top">
      <img class="banner" :src="bannerUrl2" alt="" v-if="user" />
      <img class="banner" :src="bannerUrl" v-else />

      <!-- 登录 -->
      <div class="userpanner" v-if="user">
        <van-image
          width="80px"
          height="80px"
          fit="cover"
          round
          :src="baseURL + userinfo.avatar"
        />
        <div class="box">
          <span class="text" v-text="userinfo.nickname"></span>
          <van-button type="success" @click="logout" class="success"
            >退出</van-button
          >
        </div>
      </div>

      <!-- 未登录 -->
      <div class="userpanner" v-else>
        <van-image
          width="80px"
          height="80px"
          fit="cover"
          round
          :src="manUrl2"
        />
        <div class="box">
          <span class="text">游客</span>
          <van-button type="success" :to="{ path: '/login' }"
            >去登录</van-button
          >
        </div>
        <span class="zhuce" @click="$router.push({ path: '/registe' })">
          如果没有账号，点击注册
          <van-icon name="exchange" />
        </span>
      </div>

      <div class="userList"><ListIndex></ListIndex></div>

      <div class="buttom">
        <van-swipe style="height: 200px" vertical :autoplay="3000">
          <van-swipe-item><img :src="guanggao" alt="" /></van-swipe-item>
          <van-swipe-item><img :src="guanggao2" alt="" /></van-swipe-item>
          <van-swipe-item><img :src="guanggao3" alt="" /></van-swipe-item>
          <van-swipe-item><img :src="guanggao4" alt="" /></van-swipe-item>
        </van-swipe>
      </div>
    </div>
  </div>
</template>

<script>
//引入图片
import bannerUrl from '@/assets/banner.png'
import bannerUrl2 from '@/assets/6.jpg'

import guanggao from '@/assets/guangao.png'
import manUrl2 from '@/assets/man2.png'
import guanggao2 from '@/assets/4.jpg'
import guanggao3 from '@/assets/2.jpeg'
import guanggao4 from '@/assets/5.jpg'

import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
import { baseURL } from '@/utils/request'
import ListIndex from './components/ListIndex.vue'

export default {
  name: 'My',
  components: {
    ListIndex,
  },
  data() {
    return {
      bannerUrl,
      bannerUrl2,
      manUrl2,
      userinfo: [],
      baseURL,
      guanggao,
      guanggao2,
      guanggao3,
      guanggao4,
    }
  },
  methods: {
    async logout() {
      this.$dialog
        .confirm({
          title: '确认退出么？',
        })
        .then(() => {
          //确认的操作【清除登陆状态】,把状态修改未null即可
          this.$store.commit('setUser', null)
          this.$store.commit('setUserInfo', null)
          // removeItem(TOUTIAO_USER)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    //获取用户信息
    async getUserInfo() {
      //只有登录才能获取用户信息
      if (this.user) {
        try {
          const { data } = await getUserInfo()
          //登陆后token失效
          if (data.status === 400) {
            return this.$dialog
              .confirm({
                title: '好客租房',
                message: '您还未登录或者登陆失效，请问是否跳转登录页面',
              })
              .then(() => {
                // on confirm
                this.$router.push({ path: '/login' })
              })
              .catch(() => {})
          }
          this.userinfo = data.body
          this.$store.commit('setUserInfo', data.body)
        } catch (err) {
          this.$toast('获取信息失败')
        }
      }
    },
  },
  computed: {
    ...mapState(['user']), //如果只用到一次可以直接作为表达式插入，如果多次就写到这里
  },
  created() {
    this.getUserInfo()
  },
}
</script>
<style lang="less" scoped>
.top {
  position: relative;
  width: 100%;
  height: 50vh;
  .banner {
    width: 100%;
    height: 400px;
  }
  .userpanner {
    position: absolute;
    top: 40%;
    left: 50%;
    width: 90%;
    height: 60%;
    transform: translateX(-50%);
    background-color: white;
    box-shadow: 6px 7px 11px 3px rgba(19, 255, 58, 0.2);
    .van-image {
      position: absolute;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      border: 10px solid white;
      background-color: #fff;
    }
    .box {
      width: 100%;
      margin-top: 100px;
      height: 250px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      .van-button {
        background-color: #1a7d01;
        color: white;
        border-radius: 20px;
      }
      .text {
        font-size: 30px;
        letter-spacing: 10px;
      }
      i {
        margin-top: 30px;
        margin-bottom: 30px;
        font-size: 30px;
      }
    }
    .zhuce {
      position: absolute;
      right: 0;
      margin-right: 10px;
      font-size: 10px;
      .van-icon {
        color: red;
        font-size: 30px;
      }
    }
  }
}
.success {
  height: 50px;
}
.userList {
  margin-top: 300px;
  margin-left: 10px;
  margin-right: 10px;
  border: #1a7d01 5px dashed;
  background-color: #fff;
}
.buttom {
  padding-bottom: 90px;
  margin-top: 30px;
  img {
    width: 100%;
    height: 360px;
  }
}
</style>
