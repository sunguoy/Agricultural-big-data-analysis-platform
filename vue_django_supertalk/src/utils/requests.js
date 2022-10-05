/*
 * @Author: darkgoldenrod(暮秋)
 * @Date: 2022-03-31 17:10:21
 * @LastEditTime: 2022-04-25 16:06:40
 * @LastEditors: darkgoldenrod(暮秋)
 * @Description: 
 * @FilePath: \vue_咸鱼\spuertalkl\src\utils\requests.js
 */
import axios from "axios"
import retry from "axios-retry"
// import 
var requests = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 20000
})

requests.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/*超时或者失败重试三次 */
retry(requests, { retries: 3 })

/* 对请求做处理 */
requests.interceptors.request.use((config) => {
    // console.log("请求拦截:", config)
    // if (config.url != "/user/login") {
    //     config.headers["Authorization"] = localStorage.getItem("token")
    // }
    return config
}, (error) => {
    return Promise.reject(error)
})

/*对响应数据进行处理*/
requests.interceptors.response.use((response) => {
    return Promise.resolve(response.data)
}, (error) => {
    return Promise.reject(error)
})




export var post = (url, options = {}) => {

    return requests.post(url, options,{

    })
}

export var get = (url, options = {}) => {
    return requests.get(url, options)
}
