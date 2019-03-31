import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: 'web/admin/login',
    method: 'post',
    params: { username,
      password }
  })
}

export function getAdminInfo() {
  return request({
    url: 'web/admin/getAdminInfo',
    method: 'get'
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
