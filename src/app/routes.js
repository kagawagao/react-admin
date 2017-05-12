export default [{
  path: '/',
  getComponent: () => import('./home'),
  exact: true,
  meta: {
    auth: false,
    title: '首页',
    name: 'home',
    level: ''
  }
}, {
  path: '/count',
  getComponent: () => import('./count'),
  exact: true,
  meta: {
    auth: false,
    title: '实例',
    name: 'count',
    level: ''
  }
}, {
  path: '/todo',
  getComponent: () => import('./todo'),
  exact: true,
  meta: {
    auth: false,
    title: '实例',
    name: 'todo',
    level: ''
  }
}, {
  path: '/error',
  getComponent: () => import('./error'),
  meta: {
    auth: false,
    title: '错误',
    name: 'error',
    level: ''
  }
}]
