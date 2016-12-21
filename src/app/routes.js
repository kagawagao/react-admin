export default [{
  pattern: '/',
  getComponent: () => System.import('./home'),
  exactly: true,
  meta: {
    auth: false,
    title: '首页',
    name: 'home',
    level: ''
  }
}, {
  pattern: '/error',
  getComponent: () => System.import('./error'),
  meta: {
    auth: false,
    title: '错误',
    name: 'error',
    level: ''
  }
}]
