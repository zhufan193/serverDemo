import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '/', component: () => import('@/views/login/index'), hidden: true },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   name: 'Dashboard',
  //   hidden: true,
  //   children: [{
  //     path: 'dashboard',
  //     component: () => import('@/views/dashboard/index')
  //   }]
  // },
  {
    path: '/home',
    component: Layout,
    redirect: '/home/index',
    children: [
      {
        path: 'index',
        name: 'home',
        component: () => import('@/views/home/index'),
        meta: { title: '首页', icon: 'table' }
      },
      {
        path: 'loginSuccess',
        name: 'home',
        hidden: true,
        component: () => import('@/views/home/loginSuccess'),
        meta: { title: '首页', icon: 'table' }
      }
    ]
  },
  {
    path: '/userManagement',
    component: Layout,
    redirect: '/userManagement',
    name: 'userManagement',
    meta: {
      title: '用户管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'viewLists',
        component: () => import('@/views/userManagement/viewLists'), // Parent router-view
        name: 'viewLists',
        meta: { title: '用户列表' }
      },
      {
        path: 'userDetailC',
        component: () => import('@/views/userManagement/userDetailC'),
        name: 'userDetailC',
        hidden: true,
        meta: { title: '用户详情C' }
      },
      {
        path: 'userDetailD',
        component: () => import('@/views/userManagement/userDetailD'),
        name: 'userDetailD',
        hidden: true,
        meta: { title: '用户详情D' }
      },
      {
        path: 'viewDetail',
        component: () => import('@/views/userManagement/viewDetail'),
        name: 'viewDetail',
        hidden: true,
        meta: { title: '用户详情' }
      },
      {
        path: 'Income',
        component: () => import('@/views/userManagement/Income'),
        name: 'Income',
        hidden: true,
        meta: { title: '收益明细' }
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    component: Layout,
    redirect: '/admin',
    meta: { title: '管理员管理', icon: 'table' },
    children: [
      {
        path: 'adminList',
        name: 'adminList',
        component: () => import('@/views/admin/adminList'),
        meta: { title: '管理员列表', icon: 'table' }
      },
      {
        path: 'adminRole',
        name: 'adminRole',
        component: () => import('@/views/admin/adminRole'),
        meta: { title: '管理员角色设置', icon: 'table' }
      }
    ]
  },
  {
    path: '/basicSet',
    name: 'basicSet',
    component: Layout,
    redirect: '/basicSet',
    meta: { title: '基础参数配置', icon: 'table' },
    children: [
      {
        path: 'invitation',
        name: 'invitation',
        component: () => import('@/views/basicSet/invitation'),
        meta: { title: '邀请规则设置', icon: 'table' }
      },
      {
        path: 'choice',
        name: 'choice',
        component: () => import('@/views/basicSet/choice'),
        meta: { title: '严选规则设置', icon: 'table' }
      }
    ]
  },
  {
    path: '/System',
    name: 'System',
    component: Layout,
    redirect: '/System',
    meta: { title: '系统设置', icon: 'table' },
    children: [
      {
        path: 'password',
        name: 'System',
        hidden: true,
        component: () => import('@/views/System/password'),
        meta: { title: '修改密码', icon: 'table' }
      },
      {
        path: 'Journal',
        name: 'System',
        component: () => import('@/views/System/Journal'),
        meta: { title: '操作日志', icon: 'table' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
