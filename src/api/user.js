// 用户相关请求模块
import request from '@/utils/request'

//登录
export const login = (data) => {
  return request({
    url: '/user/login',
    method: 'post',
    data,
  })
}

//退出登录
export const logout = () => {
  return request({
    url: '/user/logout',
    method: 'post',
  })
}

//用户注册
export const userRegiste = (data) => {
  return request({
    url: '/user/registered',
    method: 'POST',
    data,
  })
}

//获取用户个人信息
export const getUserInfo = () => {
  return request({
    url: '/user',
    method: 'get',
  })
}

//更新用户信息
export const upDateUserInfo = (data) => {
  return request({
    url: '/user',
    method: 'PATCH',
    data,
  })
}

//获取用户收藏文章信息
export const getUserLike = () => {
  return request({
    url: '/user/favorites',
    method: 'GET',
  })
}

//收藏文章
export const addLike = (id) => {
  return request({
    url: `/user/favorites/${id}`,
    method: 'POST',
  })
}
//取消收藏
export const delLike = (id) => {
  return request({
    url: `/user/favorites/${id}`,
    method: 'DELETE',
  })
}

export const getPublishHouse = () => {
  return request({
    url: '/user/houses',
    method: 'GET',
  })
}
