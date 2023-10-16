import { get, post } from './api';


export function handleLogin(params) {
    return post('/v1/login', params)

}
/**
 * 
 * @param {*} path 
 * @param {*} params 
 * @returns 获取泊位信息列表
 */
export function getBerList( params) {
    return get('/v1/getBerchList', params)
}

/**
 * 
 * @param {*} path 
 * @param {*} params 
 * @returns 获取泊位详情信息
 */
export function getBerDetail( params) {
    return post('/v1/getBerchDetails', params)
}
/**
 * 
 * @param {*} params 
 * @returns 获取垃圾重量统计数据
 */
export function getGarbage(params) {
    return post('/v1/getWeigthStatistics', params)

}
/**
 * 
 * @param {*} params 
 * @returns 获取车次数据
 */
export function getCar(params) {
    return post('/v1/getTransStatistics', params)

}