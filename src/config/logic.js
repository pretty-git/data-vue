import { get, post } from './api';
export function getLogin( params) {
    return post('/gcs/v1/login', params)
    
}

/**
 * 
 * @param {*} path 
 * @param {*} params 
 * @returns 获取泊位信息列表
 */
export function getBerList( params) {
    return get('/gcs/v1/getBerchList', params)
}

/**
 * 
 * @param {*} path 
 * @param {*} params 
 * @returns 获取泊位详情信息
 */
export function getBerDetail( params) {
    return post('/gcs/v1/getBerchDetails', params)
}
/**
 * 
 * @param {*} params 
 * @returns 获取垃圾重量统计数据
 */
export function getGarbage(params) {
    return post('/gcs/v1/getWeigthStatistics', params)

}
/**
 * 
 * @param {*} params 
 * @returns 获取车次数据
 */
export function getCar(params) {
    return post('/gcs/v1/getTransStatistics', params)

}