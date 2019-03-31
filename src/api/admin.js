import request from '@/utils/request'
// 管理员账户列表
export function getAdminList(params) {
  return request({
    url: 'web/admin/getAdminList',
    method: 'get',
    params
  })
}

// 管理员角色列表
export function getCharacterList(params) {
  return request({
    url: 'web/admin/getCharacterList',
    method: 'get',
    params
  })
}

// 新增管理员
export function getaddAdmin(params) {
  return request({
    url: 'web/admin/addAdmin',
    method: 'get',
    params
  })
}
// 修改管理员信息
export function updateAdmin(params) {
  return request({
    url: 'web/admin/updateAdmin',
    method: 'get',
    params
  })
}
