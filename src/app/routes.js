export default [{
  path: '/',
  getComponent: () => System.import('./home'),
  exact: true,
  meta: {
    auth: false,
    title: '首页',
    name: 'home',
    level: ''
  }
}, {
  path: '/count',
  getComponent: () => System.import('./count'),
  exact: true,
  meta: {
    auth: false,
    title: '实例',
    name: 'count',
    level: ''
  }
}, {
  path: '/error',
  getComponent: () => System.import('./error'),
  meta: {
    auth: false,
    title: '错误',
    name: 'error',
    level: ''
  }
}]
