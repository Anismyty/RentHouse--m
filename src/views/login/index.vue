<template>
  <div>
    <van-nav-bar title="登录" left-arrow @click-left="$router.back()" />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="user.username"
          name="username"
          label="账号"
          placeholder="账号"
          :rules="userFormRules.username"
        />
        <van-field
          v-model="user.password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="userFormRules.code"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'LogIn',
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
            pattern: /^[A-Za-z0-9]{5,8}/,
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
    async onSubmit(e) {
      try {
        const { data } = await login(e)
        this.$store.commit('setUser', data.body)
        this.$toast.success('登录成功')
        this.$router.back()
      } catch (err) {
        this.$toast.fail('登录失败,请稍后重试')
      }
    },
  },
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  background-color: #b7ffb2;
}
.van-form {
  margin-top: 20px;
  background-color: #b7ffb2;
  padding: 10px;
}
</style>
