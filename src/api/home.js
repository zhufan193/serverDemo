import request from '@/utils/request'
// 数据统计
export function getIndexCount(params) {
  return request({
    url: 'web/user/getIndexCount',
    method: 'get',
    params
  })
}
