<template>
  <div>
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.go(-1)" />
    <van-cell-group>
      <van-cell title="昵称" :value="userInfo.nickname" />
      <van-cell title="头像">
        <template #right-icon>
          <van-image
            width="50px"
            height="50px"
            fit="cover"
            round=""
            :src="baseURL + userInfo.avatar"
          />
        </template>
      </van-cell>
      <van-cell title="性别" :value="userInfo.gender === '1' ? '女' : '男'" />
      <van-cell
        title="手机号"
        :value="userInfo.phone === null ? '不可更改' : 'userInfo.phone'"
      />
    </van-cell-group>
    <van-button type="primary" @click="show = !show">编辑资料</van-button>

    <van-popup
      v-model="show"
      position="right"
      :style="{ height: '100%', width: '100%' }"
    >
      <van-nav-bar title="编辑个人资料" />

      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <!-- 昵称 -->
          <van-field
            v-model="username"
            name="nickname"
            label="昵称"
            :placeholder="userInfo.nickname"
          />
          <!-- 性别 -->
          <van-field name="gender" label="性别">
            <template #input>
              <van-radio-group v-model="userInfo.gender" direction="horizontal">
                <van-radio name="0">男</van-radio>
                <van-radio name="1">女</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <!-- 手机号 -->
          <!-- 不能修改 -->
          <!-- 头像 -->
          <!-- 不能更新 -->
        </van-cell-group>

        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </van-popup>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { baseURL } from '@/utils/request'
import { upDateUserInfo, getUserInfo } from '@/api/user'
export default {
  name: 'Profile',
  data() {
    return {
      baseURL,
      show: false,
      username: '',
    }
  },
  methods: {
    //获取用户信息
    async getUserInfo() {
      try {
        const { data } = await getUserInfo()
        this.userinfo = data.body
        this.$store.commit('setUserInfo', data.body)
      } catch (err) {
        this.$toast('获取信息失败')
      }
    },
    async updateInfo(info) {
      try {
        await upDateUserInfo(info)
      } catch (err) {
        this.$toast('更新失败，请稍后重试')
      }
    },
    onSubmit(i) {
      const info = {
        ...i,
        avatar: '',
        phone: '',
      }
      this.userInfo.gender = i.gender
      this.userInfo.nickname = i.nickname
      this.updateInfo(info)
      this.updateInfo()

      this.show = !this.show
    },
  },
  computed: {
    ...mapState(['userInfo']),
  },
}
</script>

<style lang="less" scoped>
/deep/.van-nav-bar {
  background-color: #82ec80;
  margin-bottom: 10px;
  .van-icon {
    color: #0b3b0b;
  }
  .van-nav-bar__title {
    font-size: 40px;
    letter-spacing: 10px;
    color: #0a7d0a;
  }
}
.van-cell {
  align-items: center;
  .van-cell__value {
    font-size: 30px;
    color: black;
  }
}
.van-button {
  width: 80vw;
  margin-top: 30px;
  margin-left: 10vw;
}
</style>
