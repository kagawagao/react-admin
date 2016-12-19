export default [{
  pattern: '/',
  component: require('./home'),
  exactly: true,
  meta: {
    auth: false,
    title: '首页',
    name: 'home',
    level: ''
  }
}, {
  pattern: '/error',
  component: require('./error'),
  exactly: true,
  meta: {
    auth: false,
    title: '错误',
    name: 'error',
    level: ''
  }
}]
