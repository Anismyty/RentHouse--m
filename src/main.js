import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant' //vant组件库
import 'vant/lib/index.css' //vant组件库样式
import 'amfe-flexible' //动态加载REM基准值
import './styles/index.less' //全局样式
import BaiduMap from 'vue-baidu-map' //引入百度地图

Vue.use(BaiduMap, {
  ak: 'rQXNkkT1TzDsjCLk5mzKea8qnxiUwMoR',
})

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
