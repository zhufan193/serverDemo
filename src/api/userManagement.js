import request from '@/utils/request'
// 用户管理列表
export function getUserList(params) {
  return request({
    url: 'web/user/getUserList',
    method: 'get',
    params
  })
}
// 用户角色列表
export function getuserRoleList(params) {
  return request({
    url: 'web/user/userRoleList',
    method: 'get',
    params
  })
}
// 用户徒弟列表
export function getqueryInvateList(params) {
  return request({
    url: 'web/invateRule/queryInvateList',
    method: 'get',
    params
  })
}

// 查询某人邀请人数
export function getqueryCountInvate(params) {
  return request({
    url: 'web/invateRule/queryCountInvate',
    method: 'get',
    params
  })
}

// 查询用户账单
export function getqueryAccountList(params) {
  return request({
    url: 'web/account/queryAccountList',
    method: 'get',
    params
  })
}

// 获取短信验证码
export function getSms(params) {
  return request({
    url: 'web/util/getSms',
    method: 'get',
    params
  })
}
