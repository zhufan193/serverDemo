import request from '@/utils/request'
// 修改密码
export function updatePassword(params) {
  return request({
    url: 'web/admin/updatePassword',
    method: 'get',
    params
  })
}

// 查询邀请规则配置
export function getqueryInvateRule(params) {
  return request({
    url: 'web/invateRule/queryInvateRule',
    method: 'get',
    params
  })
}

// 修改邀请规则配置
export function updateInvateRule(params) {
  return request({
    url: 'web/invateRule/updateInvateRule',
    method: 'get',
    params
  })
}

// 操作日志
export function getoperateLog(params) {
  return request({
    url: 'web/admin/operateLog',
    method: 'get',
    params
  })
}

// 批量删除
export function deleteOperateLog(params) {
  return request({
    url: 'web/admin/deleteOperateLog',
    method: 'post',
    params
  })
}
