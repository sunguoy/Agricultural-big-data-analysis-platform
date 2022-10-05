/*
 * @Author: darkgoldenrod(暮秋)
 * @Date: 2022-04-18 17:43:33
 * @LastEditTime: 2022-04-22 17:01:01
 * @LastEditors: darkgoldenrod(暮秋)
 * @Description: 
 * @FilePath: \vue_咸鱼\spuertalkl\src\api\echartapi.js
 */
import { post } from "../utils/requests"

export function topRight(data = {}) {
    return post("/topright/", data)
}
export function topMiddle(data = {}) {
    return post("/topmiddle/", data)
}
export function topLeft(data = {}) {
    return post("/topleft/", data)
}
export function bottonRight(data = {}) {
    return post("/bottonright/", data)
}
export function buttonMiddle(data = {}) {
    return post("/bottonmiddle/", data)
}
export function buttonLeft(data = {}) {
    return post("/bottonleft/", data)
}

export function lowestLeft(data = {}) {
    return post("/lowestleft/", data)
}

export function lowestMiddle(data = {}) {
    return post("/lowestmiddle/", data)
}

export function lowestRight(data = {}) {
    return post("/lowestright/", data)
}
export function bestLeft(data = {}) {
    return post("/bestleft/", data)
}