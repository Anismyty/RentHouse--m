import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)
const TOKEN_KEY = 'TOUTIAO_USER'
const USER_INFO = 'USER_INFO'
const defaultCity = {
  label: '北京',
  pinyin: 'beijing',
  short: 'bj',
  value: 'AREA|88cff55c-aaa4-e2e0',
}

export default new Vuex.Store({
  state: {
    user: getItem(TOKEN_KEY),
    city: getItem('CHOSECITY') === null ? defaultCity : getItem('CHOSECITY'),
    userInfo: getItem(USER_INFO),
    admin: getItem('ADMINSTATE') === null ? true : getItem('ADMINSTATE'),
    searchChose: null,
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      setItem(TOKEN_KEY, state.user)
    },
    setCity(state, city) {
      state.city = city
      setItem('CHOSECITY', city)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
      setItem(USER_INFO, userInfo)
    },
    setAdmin(state, changeState) {
      state.admin = changeState
      setItem('ADMINSTATE', changeState)
    },
    setSearchChose(state, community) {
      state.searchChose = community

    },
  },
  actions: {},
  modules: {},
})
