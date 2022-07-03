// 用户相关请求模块
import request from '@/utils/request'

//获取轮播图
export const getBanner = () => {
  return request({
    url: '/home/swiper',
    method: 'get',
  })
}

//获取所有城市
export const getCity = (params) => {
  return request({
    url: 'area/city',
    method: 'get',
    params,
  })
}

//获取热门城市
export const getHotCity = () => {
  return request({
    url: '/area/hot',
    method: 'get',
  })
}

//获取热门城市【不太能用】
export const getCityInfo = (params) => {
  return request({
    url: '/area/info',
    method: 'get',
    params,
  })
}

//租房小组
export const rentGroup = (params) => {
  return request({
    url: '/home/groups',
    method: 'get',
    params,
  })
}

//根据城市获取当前地区房屋信息
export const houseInfo = (params) => {
  return request({
    url: '/area/map',
    method: 'get',
    params,
  })
}

//根据相关条件查询房屋
export const houseDetail = (params) => {
  return request({
    url: '/houses',
    method: 'get',
    params,
  })
}

//获取子级城市
export const cityChildren = (params) => {
  return request({
    url: '/area',
    method: 'get',
    params,
  })
}

//查询小区
export const findCommunity = (params) => {
  return request({
    url: '/area/community',
    method: 'get',
    params,
  })
}

//获得地铁
export const cityConditions = (params) => {
  return request({
    url: `/houses/condition`,
    method: 'get',
    params,
  })
}

//根据一系列特点查询房屋
export const findHouse = (params) => {
  return request({
    url: '/houses',
    method: 'get',
    params,
  })
}

//获取房屋具体详情
export const getHouseDetail = (id) => {
  return request({
    method: 'GET',
    url: `/houses/${id}`,
  })
}

//发布房屋
export const postHouse = (data) => {
  return request({
    method: 'Post',
    url: '/user/houses',
    data,
  })
}


//发布房屋图片

export const postHousePic = (data) => {
  return request({
    method: 'Post',
    url: '/houses/image',
    data,
  })
}