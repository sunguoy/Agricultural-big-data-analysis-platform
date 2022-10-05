/*
 * @Author: darkgoldenrod(暮秋)
 * @Date: 2022-03-31 09:01:58
 * @LastEditTime: 2022-04-22 14:56:50
 * @LastEditors: darkgoldenrod(暮秋)
 * @Description: 
 * @FilePath: \vue_咸鱼\spuertalkl\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/login/login.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [

      {
        path: "supertopic",
        name: "supertopic",
        component: () => import("../views/dataShow/supertopic.vue"),
        meta: {
          title: "数据分析",
          isShow: true
        }
      },
      {
        path: "forecast",
        name: "forecast",
        component: () => import("../views/forecast/forecast.vue"),
        meta: {
          title: "数据预测",
          isShow: true
        }
      },
    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
