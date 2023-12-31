import {
    get,
    post
} from './api';


export function handleLogin(params) {
    return post('/gcs/v1/login', params)

}
/**
 * 
 * @param {*} path 
 * @param {*} params 
 * @returns 获取泊位信息列表
 */
export function getBerList(params) {
    return get('/gcs/v1/getBerchList', params)
}

/**
 * 
 * @param {*} path 
 * @param {*} params 
 * @returns 获取泊位详情信息
 */
export function getBerDetail(params) {
    return post('/gcs/v1/getBerchDetails', params)
}
/**
 * 
 * @param {*} params 
 * @returns 获取垃圾重量统计数据
 */
export function getGarbage(params) {
    return post('/gcs/v1/getWeightStatistics', params)

}
/**
 * 
 * @param {*} params 
 * @returns 获取车次数据
 */
export function getCar(params) {
    return post('/gcs/v1/getTransStatistics', params)

}

// 控制api

export function sendControlCmd(params) {

    return post('/gcs/v1/sendControlCmd', params)
}

// 进出车辆

export function getRecordList(params) {
    return post('/gcs/v1/getRecordList', params)
}

// 修改密码
export function changePassword(params) {
    return post('/gcs/v1/changePwd', params)
}
// 登录控制中心
export function loginControl(params) {
    return post('/gcs/v1/loginControl', params)
}
//获取告警状态
export function getAlarmList(params) {
    return get('/gcs/v1/getAlarmList', params)
}
//取消告警
export function clearAlarm(params) {
    return post('/gcs/v1/clearAlarm', params)
}
export function deleteRecord(params) {
    return post('/gcs/v1/deleteRecord', params)
}
