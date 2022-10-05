/*
 * @Author: darkgoldenrod(暮秋)
 * @Date: 2022-03-31 09:01:58
 * @LastEditTime: 2022-04-22 17:17:16
 * @LastEditors: darkgoldenrod(暮秋)
 * @Description: 
 * @FilePath: \vue_咸鱼\spuertalkl\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as echarts from "echarts";

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.echarts = echarts

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
