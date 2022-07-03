<template>
  <div>
    <van-nav-bar title="欢迎注册" left-arrow @click-left="$router.go(-1)" />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="user.username"
          name="username"
          label="用户名"
          placeholder="请设置用户名"
          :rules="userFormRules.username"
        />
        <van-field
          v-model="user.password"
          type="password"
          name="password"
          label="密码"
          placeholder="请设置登陆密码"
          :rules="userFormRules.code"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          注册
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { userRegiste } from '@/api/user'
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      //验证规则
      userFormRules: {
        username: [
          {
            required: true,
            message: '账号不能为空',
          },
          {
            pattern: /^[A-Za-z0-9]{5,8}$/,
            message: '账号格式为5-8位数字或字母',
          },
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空',
          },
          {
            pattern: /^\d{6}$/,
            message: '密码为6位数字',
          },
        ],
      },
    }
  },
  methods: {
    async userRegiste(info) {
      try {
        const { data } = await userRegiste(info)
        if (data.status === 400) {
          return this.$toast(data.description)
        } else {
          this.$toast('注册成功！')
          this.$store.commit('setUser', data.body)
          this.$router.back()
        }
      } catch (err) {
        this.$toast('注册失败，请稍后再注册')
      }
    },
    onSubmit(val) {
      this.userRegiste(val)
    },
  },
}
</script>

<style lang="less" scoped>
.van-form {
  margin-top: 30px;
}
</style>
